'use client'
/*Ez az email küldés tesztje és kiindulópontja */

import { useEffect, useState } from "react";
import { send } from "./sendmail";

export default function EmailProba() {
  const [email, setEmail] = useState<string>("solet.tamas@students.jedlik.eu")
  const [name, setName] = useState<string | undefined>("Söli")
  const [subject, setSubject] = useState<string>("Szia Söli")

  useEffect(() => {
    // Prevent the useEffect from ruining the surprise
    if (email === "solet.tamas@students.jedlik.eu") {return}

    const match = email.match(/^([^@]+)/)
    if (match) {
      const name = match[0]
      setName(name);
      setSubject(`Szia ${name}`)
    }
  }, [email])


  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-4">
      <form className="join">
        <input className="input input-bordered join-item w-72 max-w-[90vw]" type="text" placeholder="Ha üres akkor is megy valahova..." onChange={(e) => setEmail(e.target.value)}></input>
        <button formAction={() => send(email, name, subject,)} className="btn join-item">
          Test
        </button>
      </form>
      <div>{email === "solet.tamas@students.jedlik.eu" ? "???????????@students.jedlik.eu" : email}</div>
    </main>
  );
}
