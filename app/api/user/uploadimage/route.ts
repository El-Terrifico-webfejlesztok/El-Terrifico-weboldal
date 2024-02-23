import prisma from "@/prisma/client";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth";
import { v4 as uuidv4 } from 'uuid';

// A maximum fájlméret MB-ben megadva
const MAX_FILE_SIZE_MB = 5; 

export async function POST(req: NextRequest) {
  try {
    // Get the user's session
    const session = await getServerSession(authOptions);

    // If the user is not authenticated, return an unauthorized response
    if (!session) {
      return NextResponse.json('Be kell jelentkezned profilkép feltöltéséhez', { status: 401 });
    }

    const formData = await req.formData();

    const userID = parseInt(session.user!.id);
    const file = formData.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json('Nincs kép a kérésben', { status: 400 });
    }

    // Ennek soha nem kellene hogy bekövetkezzen, de jobb félni mint megilyedni
    if (userID === null) {
      return NextResponse.json('Hiba történt (Valami nagyon nem jó, de tényleg)', { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return NextResponse.json(`A kép túllépi a ${MAX_FILE_SIZE_MB}MB képméret határt`, { status: 400 });
    }

    // Generate a short UUID
    const shortUuid = uuidv4().slice(0, 8);
    const filePath = `public/profile_images/${shortUuid}_${file.name}`;

    // Valami buffer vagy valami, nem tudom (még mindig)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(filePath, buffer);

    const imageUpload = await prisma.user.update({
      where: {
        id: userID
      },
      
      data: {
        image: filePath
      }
    });

    return NextResponse.json(`${process.env.URL}/${filePath}`, { status: 201 });
  } catch (error) {
    console.error('Hiba profilképfeltöltés közben:', error);
    return NextResponse.json('Hiba a profilkép feltöltése közben', { status: 500 });
  }
}
