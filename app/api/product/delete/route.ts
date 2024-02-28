import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export const dynamic = 'force-dynamic';

export async function DELETE(req: NextRequest) {
    try {


        return NextResponse.json("Under construction", {status: 200});
    } catch (error) {
        console.error('Hiba a kategóriák lekérése közben:', error);
        return NextResponse.json('Hiba a kategóriák lekérése közben', { status: 500 });
    }
}
