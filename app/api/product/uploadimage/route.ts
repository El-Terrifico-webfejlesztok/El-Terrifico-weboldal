import prisma from "@/prisma/client";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth";

// A maximum fájlméret MB-ben megadva
const MAX_FILE_SIZE_MB = 10;

export async function POST(req: NextRequest) {
  try {
    // Get the user's session
    const session = await getServerSession(authOptions);

    // If the user is not authenticated or not an admin, return an unauthorized response
    if (!session || session.user!.role !== 'admin') {
      return NextResponse.json('Unauthorized', { status: 401 });
    }

    const formData = await req.formData();

    const product_id = formData.get('product_id');
    const file = formData.get('file') as unknown as File;

    if (!file || product_id === null) {
      return NextResponse.json('Product ID vagy kép hiányzik a requestből', { status: 400 });
    }

    // Generate a short UUID to append to the filename
    const uuid = Math.random().toString(36).substring(2, 10);
    const filePath = `public/product_images/${uuid}_${file.name}`;

    // Check file size
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return NextResponse.json(`A kép túllépi a ${MAX_FILE_SIZE_MB}MB képméret határt`, { status: 400 });
    }

    // Read the file buffer and write it to the specified path
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Create a database record for the uploaded image
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
