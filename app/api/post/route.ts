import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth";
import { z } from "zod";

const postschema = z.object({
  title: z.string()
    .min(4, { message: 'A címnek legalább 4 karakternek kell lennie' })
    .max(250, { message: 'A cím maximum 250 karakter hoszzú lehet' }),
  text: z.string()
    .min(1, { message: 'Posztnak kell hogy legyen valami tartalma' })
    .max(30000, { message: 'A maximális posztméret 30000 karakter' }),
  category: z.string()
});

export async function POST(req: NextRequest) {

  try {
    // Validate if the user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json('A posztoláshoz be kell jelentkeznie', { status: 401 });
    }

    // eltároljuk a post tartalmát
    const body = await req.json();
    // validáljuk a regisztrációs adatokat
    const validation = postschema.safeParse(body);

    // ha sikertelen elküldjük az okot (vagy okokat)
    if (!validation.success) {
      return NextResponse.json(validation.error.errors[0].message, { status: 400 });
    }

    // felbontjuk a requestet
    const { title, text, category } = body;

    // Find the category ID based on the provided category name
    const categoryID = await prisma.postCategory.findUnique({
      where: {
        name: category,
      },
    });

    if (!categoryID) {
      return NextResponse.json('Nincs ilyen posztkategória', { status: 404 });
    }

    // Create a new post in the database
    const newPost = await prisma.post.create({
      data: {
        title,
        text,
        user_id: parseInt(session.user!.id),
        category_id: categoryID.id,
      },
    });

    // Return the created post as a JSON response
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);

    // Return an error response with the error message
    return NextResponse.json('Hiba a poszt létrehozása közben', { status: 500 });
  }
}


export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const postID = parseInt(searchParams.get('id')?.toLowerCase() || '');

    if (isNaN(postID)) {
      return NextResponse.json('Nem létező vagy hibás poszt azonosító a kérésben', { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postID
      },
      include: {
        Category: {
          select: {
            name: true
          }
        },
        User: {
          select: {
            id: true,
            username: true,
            image: true,
          }
        },
        Comment: {
          select: {
            id: true,
            text: true,
            User: {
              select: {
                id: true,
                username: true,
                image: true,
              }
            },
            created_at: true,
            updated_at: true
          }
        },
      },
    });

    if (!post) {
      return NextResponse.json('Nem található ilyen poszt', { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('Error retrieving post:', error);
    return NextResponse.json('Hiba a poszt lekérése közben', { status: 500 });
  }
}
