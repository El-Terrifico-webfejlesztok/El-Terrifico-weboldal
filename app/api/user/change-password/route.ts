import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/auth';
import { hash } from 'bcrypt';
import prisma from '@/prisma/client';
import { compare } from 'bcrypt';
import { z } from 'zod';
import { compileRegisterTemplate, sendMail } from "@/lib/mail";

// define the request payload schema
const passwordChangeSchema = z.object({
  currentPassword: z.string(),
  newPassword: z
    .string()
    .min(8, 'A jelszónak legalább 8 karakter hosszúnak kell lennie')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
      message: 'A jelszónake meg kell felelnie az alábbi regex követelményeknek: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$',
    }),
});

export async function POST(req: NextRequest) {
  try {
    // Get the user's session
    const session = await getServerSession(authOptions);

    // If the user is not authenticated, return an unauthorized response
    if (!session) {
      return NextResponse.json('Be kell jelentkezned a jelszóváltoztatáshoz', { status: 401 });
    }

    const formData = await req.json();

    // Validate the request payload
    const validation = passwordChangeSchema.safeParse(formData);
    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const userID = parseInt(session.user!.id);
    const { currentPassword, newPassword } = validation.data;

    const user = await prisma.user.findUnique({
      where: { id: userID },
      select: { password: true },
    });

    if (!user) {
      return NextResponse.json('Felhasználó nem található', { status: 404 });
    }

    // Verify the current password using bcrypt's compare function
    const currentPasswordCorrect = await compare(currentPassword, user.password);

    if (!currentPasswordCorrect) {
      return NextResponse.json('A jelenlegi jelszó helytelen', { status: 401 });
    }

    let hashedPassword = await hash(newPassword, 10);
    
    // Update the user's password
    const updatePassword = await prisma.user.update({
      where: { id: userID },
      data: { password: hashedPassword },
    });

    // Email sending
    const name = session.user!.name as string
    const mail = session.user!.email as string
    await sendMail({
      to: mail,
      name: name,
      subject: "Jelszómódosítás",
      body: compileRegisterTemplate(name, mail, "Sikeres jelszómódosítás", "Sikeresen módosította jelszavát az El Terrifco webáruházban ezzel email címmel! </span><span>Köszönjük, hogy minket választott és reméljük, hogy a legmegfelelőbb ételekkel tudjuk Önt szolgálni. Az oldalra visszatérhet a <em>Vissza az oldalra</em> gombbal."),
    });

    return NextResponse.json(updatePassword.username, { status: 200 });
  } catch (error) {
    console.error('Error during password change:', error);
    return NextResponse.json('Error during password change', { status: 500 });
  }
}
