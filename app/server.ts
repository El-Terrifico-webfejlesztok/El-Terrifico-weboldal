'use server'

import prisma from "@/prisma/client";

export async function getPostCategories() {
    const prismareturn = await prisma.postCategory.findMany({
        select: {
            name: true,
        }
    })
    const categories: string[] = prismareturn.map(item => item.name);
    return categories;
  }
  