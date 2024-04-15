/*Ez az email küldés tesztje és kiindulópontja */

import { compileRegisterTemplate, sendMail } from "@/lib/mail";

export default function EmailProba() {
  const send = async () => {
    "use server";
    await sendMail({
      to: "solet.tamas@students.jedlik.eu",
      name: "Söli",
      subject: "Szopd ki Söli",
      body: compileRegisterTemplate("Söli", "solet.tamas@students.jedlik.eu", "Cím", "Szöveg"),
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
