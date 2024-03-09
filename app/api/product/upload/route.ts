import prisma from "@/prisma/client";
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth";

const uploadProductSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(255),
  description: z.string().min(1),
  price: z.number(),
  stock: z.number(),
  categories: z.array(z.string().min(1)), // New field for categories
});

export async function POST(req: NextRequest) {
  try {
    // Get the user's session
    const session = await getServerSession(authOptions);

    // If the user is not authenticated, return an unauthorized response
    if (session?.user?.role !== 'admin') {
      return NextResponse.json('Nincs jogosultsága a termékek módisításához', { status: 401 });
    }

    const body = await req.json();

    const validation = uploadProductSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.errors[0].message, { status: 400 });
    }

    // Fetch or create categories and store them in an array
    const categories = await Promise.all(
      body.categories.map(async (categoryName: string) => {
        const existingCategory = await prisma.category.findUnique({
          where: { name: categoryName },
          select: {
            id: true
          }
        });
        if (existingCategory) {
          return existingCategory;
        }

        // Create new category if it doesn't exist
        return prisma.category.create({
          data: { name: categoryName },
          select: {
            id: true
          }
        });
      })
    );

    // duplikált kategóriák szűrése (chatgpt nem jött rá > én írtam > undorító kód)

    // get the IDs out of the objects that prisma returns
    const categoriesmapped: number[] = categories.map(category => category.id)
    // convert to set to filter (disgusting but what can you do)
    const helperset = new Set(categoriesmapped);
    // convert back to array
    const uniqueCategoryIds = Array.from(helperset);

    // Check if an ID is provided
    if (body.id) {
      const existingProduct = await prisma.product.findUnique({
        where: { id: body.id },
      })
      if (!existingProduct) {
        return NextResponse.json("Nem létezik a frissítendő termék", { status: 200 });
      }

      // Delete existing associations
      await prisma.productCategoryLink.deleteMany({
        where: { product_id: body.id },
      });

      // Update the existing product with the specified ID
      const updatedProduct = await prisma.product.update({
        where: { id: body.id },
        data: {
          name: body.name,
          description: body.description,
          price: body.price,
          stock: body.stock,
          ProductCategoryLink: {
            create: uniqueCategoryIds.map((category) => ({
              category_id: category,
            })),
          },
        },
      });

      // Cleanup: Delete categories with no associations
      await prisma.category.deleteMany({
        where: {
          ProductCategoryLink: { none: {} },
        },
      });

      console.log('Termék sikeresen frissítve');
      return NextResponse.json(updatedProduct, { status: 200 });
    } else {
      // Create a new product
      const newProduct = await prisma.product.create({
        data: {
          name: body.name,
          description: body.description,
          price: body.price,
          stock: body.stock,
          ProductCategoryLink: {
            create: uniqueCategoryIds.map((category) => ({
              category_id: category,
            })),
          },
        },
      });

      console.log('Termék sikeresen létrehozva');
      return NextResponse.json(newProduct, { status: 201 });
    }
  } catch (error) {
    console.error('Error during product upload:', error);
    return NextResponse.json(`Hiba a termék feltöltése közben`, { status: 500 });
  }
}
