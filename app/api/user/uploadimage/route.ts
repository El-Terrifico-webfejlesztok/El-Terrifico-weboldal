import prisma from "@/prisma/client";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth";

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
        if (!file || userID === null) {
            return NextResponse.json('Nincs kép a kérésben', { status: 400 });
        }

        // Generate a short UUID
        const uuid = Math.random().toString(36).substring(2, 10);
        const filePath = `public/profile_images/${uuid}_${file.name}`;

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

        return NextResponse.json(imageUpload, { status: 201 });
    } catch (error) {
        console.error('Error during image upload:', error);
        return NextResponse.json('Error during image upload', { status: 500 });
    }
}
