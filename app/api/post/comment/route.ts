import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "../../auth/[...nextauth]/auth";

const commentSchema = z.object({
  text: z.string()
    .min(1, { message: 'A hozzászólásnak legalább 1 karakternek kell lennie' })
    .max(3000, { message: 'A maximális hozzászólás méret 3000 karakter' }),
  postId: z.number(),
});

export async function POST(req: NextRequest) {
  try {
    // Validate if the user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json('A hozzászóláshoz be kell jelentkeznie', { status: 401 });
    }

    // Parse the request body
    const body = await req.json();

    // Validate the comment data
    const validation = commentSchema.safeParse(body);

    // If validation fails, return the error message
    if (!validation.success) {
      return NextResponse.json(validation.error.errors[0].message, { status: 400 });
    }

    // Destructure the validated comment data
    const { text, postId } = body;

    // Check if the specified post exists
    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!existingPost) {
      return NextResponse.json('A megadott poszt nem található', { status: 404 });
    }

    // Create a new comment in the database
    const newComment = await prisma.comment.create({
      data: {
        text,
        user_id: parseInt(session.user!.id),
        post_id: postId,
      },
    });

    // Return the entire comment object as a JSON response
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);

    // Return an error response with the error message
    return NextResponse.json('Hiba a hozzászólás létrehozása közben', { status: 500 });
  }
}
