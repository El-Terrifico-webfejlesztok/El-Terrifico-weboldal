import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Extract query parameters from the URL
    const searchParams = req.nextUrl.searchParams;

    // Megadható paraméterek
    const searchTerm = searchParams.get('name')?.toLowerCase() || '';
    const parsedMinPrice = parseInt(searchParams.get('minprice') || '0');
    const parsedMaxPrice = parseInt(searchParams.get('maxprice') || '999999999');
    const parsedMinRating = parseInt(searchParams.get('minrating') || '0')
    const parsedMaxRating = parseInt(searchParams.get('maxrating') || '10')
    const parsedCategories = (searchParams.get('categories') || undefined)?.split(',');
    const productId = parseInt(searchParams.get('id') || '0');

    // Define the type explicitly for the where clause
    type ProductWhere = {
      OR?: {
        name?: {
          contains: string;
        };
        description?: {
          contains: string;
        };
      }[];
      price?: {
        gte: number;
        lte: number;
      };
      ProductCategoryLink?: {
        some: {
          Category: {
            name: {
              in: string[];
            };
          };
        };
      };
      id?: number; // Added for optional ID filtering
    };

    // Query the database with Prisma, including categories in the response
    const productsWithCategories = await prisma.product.findMany({
      // 25 terméket adunk vissza
      take: 25,
      where: {
        AND: [
          searchTerm && {
            OR: [
              {
                name: {
                  contains: searchTerm,
                },
              },
              {
                description: {
                  contains: searchTerm,
                },
              },
            ],
          },
          {
            price: {
              gte: parsedMinPrice,
              lte: parsedMaxPrice,
            },
          },
          parsedCategories && {
            // Use 'some' filter to check if at least one category matches
            ProductCategoryLink: {
              some: {
                Category: {
                  name: {
                    in: parsedCategories,
                  },
                },
              },
            },
          },
          productId && { id: productId }, // Apply ID filtering if the 'id' query parameter is present
        ].filter(Boolean) as ProductWhere[], // Remove undefined filters and cast to the defined type
      },
      // Include the related fields
      include: {
        ProductCategoryLink: {
          select: {
            Category: {
              select: {
                name: true,
              },
            },
          },
        },
        ProductImage: {
          select: {
            image_path: true
          }
        }
      },
    });
    
    // Flatten the structure and create a new array with categories
    const flattenedProducts = productsWithCategories.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      created_at: product.created_at,
      updated_at: product.updated_at,
      categories: product.ProductCategoryLink.map(link => link.Category.name),
      images: product.ProductImage.map(link => `${process.env.URL}/${link.image_path}`)
    }));

    // Return the results as a JSON response
    return NextResponse.json(flattenedProducts, { status: 200 });
  } catch (error) {
    // Log and handle errors
    console.error('A keresés közben hiba történt', error);

    // Explicitly cast error to Error type and get the error message
    const errorMessage = (error as Error).message;

    // Return an error response with the error message
    return NextResponse.json({ error: 'A keresés közben hiba történt', message: errorMessage }, { status: 500 });
  }
}
