import prisma from "@/prisma/client";
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

const uploadProductSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1),
  price: z.number(),
  stock: z.number(),
});

export async function GET(req: NextRequest) {
  try {

    const body = await req.json();

    const validation = uploadProductSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        stock: body.stock,
      }
    });

    console.log('Product upload successful');
    return NextResponse.json(newProduct, { status: 201 })
  }
  catch (error) {
    console.error('Error during product upload:', error);
    return NextResponse.json('Hiba a feltöltés közben: ${error}', { status: 500 });
  }
};

