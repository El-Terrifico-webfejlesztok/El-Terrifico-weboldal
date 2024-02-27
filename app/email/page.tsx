import { sendMail } from "@/lib/mail";

export default function EmailProba() {
  const send = async () => {
    "use server";
    await sendMail({
      to: "barni.nagy2004@gmail.com",
      name: "Barni",
      subject: "Test Email",
      body: `<h1>Hellotok</h1>`,
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
