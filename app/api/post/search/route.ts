import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
    try {
        // Extract query parameters from the URL
        const searchParams = req.nextUrl.searchParams;

        // Megadható paraméterek
        const searchTerm = searchParams.get('query')?.toLowerCase() || undefined;
        const category = searchParams.get('category')?.toLowerCase() || undefined;
        // const order = searchParams.get('order')?.toLowerCase() || 'desc';
        const count = parseInt(searchParams.get('count') || '10');
        const page = parseInt(searchParams.get('page') || '1');
        const skip = count * (page - 1)

        // Query the database with Prisma
        const posts = await prisma.post.findMany({
            skip: skip,
            take: count,
            where: {
                OR: [
                    { title: { contains: searchTerm } },
                    { text: { contains: searchTerm } },
                    { Category: { name: { contains: searchTerm } } }
                ],
                Category: {
                    name: { contains: category },
                },
            },
            include: {
                User: true,
                Comment: true,
            },
            orderBy: { created_at: 'desc' }
        });

        // Flatten the structure and create a new array
        const flattenedPosts = posts.map(post => ({
            id: post.id,
            title: post.title,
            text: post.text,
            user: post.User, // Include user information
            comments: post.Comment, // Include comments
            created_at: post.created_at,
            updated_at: post.updated_at,
        }));

        // Return the results as a JSON response
        return NextResponse.json(flattenedPosts, { status: 200 });
    } catch (error) {
        // Log and handle errors
        console.error('Error searching posts:', error);



        // Return an error response with the error message
        return NextResponse.json("Hiba a posztok keresése közben", { status: 500 });
    }
}
