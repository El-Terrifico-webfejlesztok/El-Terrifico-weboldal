import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const categories = await prisma.category.findMany({
            select: { name: true },
        });

        const categoryNames = categories.map((category) => category.name);

        return NextResponse.json(categoryNames);
    } catch (error) {
        console.error('Hiba a kategóriák lekérése közben:', error);
        return NextResponse.json('Hiba a kategóriák lekérése közben', { status: 500 });
    }
}
