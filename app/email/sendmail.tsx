'use server'
import { compileRegisterTemplate, sendMail } from "@/lib/mail";

export const send = async (to: string, name?: string, subject?: string) => {
    await sendMail({
        to:  to ,
        name: name || "Unkown Name",
        subject: subject || "Unset Subject",
        body: compileRegisterTemplate(name || 'Unknown Name', to, "Cím", "Szöveg"),
    });
};