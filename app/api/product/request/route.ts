import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Extract query parameters from the URL
    const searchParams = req.nextUrl.searchParams;

    // Parse query parameters
    const searchTerm = searchParams.get('name')?.toLowerCase() || '';
    const parsedMinPrice = parseInt(searchParams.get('minprice') || '0');
    const parsedMaxPrice = parseInt(searchParams.get('maxprice') || '999999999');
    const parsedCategories = (searchParams.get('categories') || undefined)?.split(',');

    // Log parsed query parameters
    console.log('Search Term:', searchTerm);
    console.log('Parsed Min Price:', parsedMinPrice);
    console.log('Parsed Max Price:', parsedMaxPrice);
    console.log('Parsed Categories:', parsedCategories);

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
    };

    // Query the database with Prisma
    const newProduct = await prisma.product.findMany({
      take: 10,
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
        ].filter(Boolean) as ProductWhere[], // Remove undefined filters and cast to the defined type
      },
    });

    // Log successful query and results
    console.log('Product query successful');
    console.log(newProduct);

    // Return the results as a JSON response
    return NextResponse.json(newProduct, { status: 200 });
  } catch (error) {
    // Log and handle errors
    console.error('Error during search', error);

    // Explicitly cast error to Error type and get the error message
    const errorMessage = (error as Error).message;

    // Return an error response with the error message
    return NextResponse.json({ error: 'Error during search', message: errorMessage }, { status: 500 });
  }
}
