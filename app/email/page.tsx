/*Ez az email küldés tesztje és kiindulópontja */

import { compileRegisterTemplate, sendMail } from "@/lib/mail";

export default function EmailProba() {
  const send = async () => {
    "use server";
    await sendMail({
      to: "barni.nagy2004@gmail.com",
      name: "Barni",
      subject: "Test Email",
      body: compileRegisterTemplate("Barni", "barni.nagy2004@gmail.com", "Cím", "Szöveg"),
    });
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-4">
      <form>
        <button formAction={send} className="btn">
          Test
        </button>
      </form>
    </main>
  );
}
