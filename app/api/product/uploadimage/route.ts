import prisma from "@/prisma/client";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  try {
    // Get the user's session
    const session = await getServerSession();

    // If the user is not authenticated, return an unauthorized response
    if (session?.user?.role !== 'admin') {
      return NextResponse.json('Unauthorized', { status: 401 });
    }

    const formData = await req.formData();

    const product_id = formData.get('product_id');
    const file = formData.get('file') as unknown as File;
    console.log(file)
    console.log(formData)
    console.log(product_id)

    if (!file || product_id === null) {
      return NextResponse.json('Product ID or file is not present in the form data', { status: 400 });
    }

    const filePath = `public/product_images/${file.name}`;

    // Valami buffer vagy valami, nem tudom
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(filePath, buffer);

    const imageUpload = await prisma.productImage.create({
      data: {
        product_id: Number(product_id),
        image_path: filePath,
      }
    });

    return NextResponse.json(imageUpload, { status: 201 });
  } catch (error) {
    console.error('Error during image upload:', error);
    return NextResponse.json('Error during image upload', { status: 500 });
  }
}


// Usage with a single image:

/*

const formData = new FormData();
formData.append('product_id', responseBody.id);
formData.append('file', image);

const imageResponse = await fetch('/api/product/uploadimage', {
  method: 'POST',
  body: formData,
});

*/