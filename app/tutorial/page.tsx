"use client";
import styles from "./tutorial.module.css";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

function Tutorial() {
  const { data: session, status, update } = useSession();
  // Session update oldal betöltéskor
  useEffect(() => {
    update();
  }, []);
  return (
    <div>
      <p className="text-3xl font-bold uppercase p-6">Útmutató a weboldalhoz</p>
      <div className="mx-auto sm:w-5/6 w-1/1 bg-base-300 p-3 rounded-xl">
        <p className="text-xl font-semibold p-2">Szöveges útmutató</p>

        <div className="collapse bordered border-4 border-base-100 my-4">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            Regisztráció/Belépés
          </div>
          <div className="collapse-content">
            <p className="mb-4">
              Ez a rész csak akkor érvényes, ha nem vagy bejelentkezve!!{" "}
            </p>
            <p className="mb-4">
              {" "}
              Az oldal megnyitása után kattints a{" "}
              <b>képernyő jobb felső sarkában</b> lévő ember alakú ikonra. Ekkor
              megjelenik a bejelentkezés oldal. Ha van már fiókod, akkor írd be
              az e-mail címed, illetve a jelszót, amit megadtál a regisztráció
              során és kattints a <b>Bejelentkezés gomb</b>ra.{" "}
            </p>
            <p>
              Ha nincs még fiókod, akkor a Bejelentkezés gomb alatti{" "}
              <b>Regisztrálj!</b> -ra menj rá. Ekkor megjelenik a regisztrációs
              oldal. Ezt töltsd ki a saját e-mail címeddel, felhasználóneveddel
              és egy <b>legalább 8 karakter hosszú jelszó</b>val. A{" "}
              <b>Regisztrálás gomb</b>ra kattintva sikeres regisztráció után egy
              e.mailt fogsz kapni, és visszadob a bejelentkezés oldalra, ahol
              már be tudsz jelentkezni a regisztrálás során megadott adatokkal.
            </p>
          </div>
        </div>

        <div className="collapse bordered border-4 border-base-100 my-4">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">Főoldal</div>
          <div className="collapse-content">
            <p>
              A weboldal megnyitásakor a főoldal jelenik meg, mely különböző
              szekciókra bomlik. Ezek a következők:
            </p>
            <ul className=" list-disc ml-7 line">
              <li className="my-1">
                Rövid <b>köszöntő</b>
              </li>
              <li className="my-1">
                A <b>Magamról</b> részben egy kis rövid történetet lehet olvasni
                Franco séfről.
              </li>
              <li className="my-1">
                A <b>videó</b>ban megnézheted az étterem történetét és magát az
                éttermet.
              </li>
              <li className="my-1">
                Aztán néhány <b>információ</b>t találhatsz a{" "}
                <b>kiszállításról</b>.
              </li>
              <li className="my-1">
                <b>Ajánlataink</b> részben a kártyákra rákattintva megkapod az
                összes adott kategóriában létező termékünket.
              </li>
              <li className="my-1">
                Az <b>étterem történeté</b>ről és
              </li>
              <li className="my-1">
                a híres <b>taco</b> <b>történeté</b>ről olvashatsz egy kicsit.
              </li>
              <li className="my-1">
                Végül néhány <b>videó</b> található az utolsó részben az étterem
                vezetőséféről <b>Francoról</b>.
              </li>
            </ul>
          </div>
        </div>

        <div className="collapse bordered border-4 border-base-100 my-4">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">Vásárlás</div>
          <div className="collapse-content">
            <div className="collapse bg-base-100 my-3">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                Keresés a termékek között
              </div>
              <div className="collapse-content">
                <p>
                  A <b>Termékek oldalon</b> a cím alatt található keresővel
                  könnyedén lehet <b>névre</b> vagy <b>leírásra</b> keresni. A
                  Részletes keresés gombbal további lehetőségeket lehet
                  megjeleníteni. Itt az Árak részben a <b>minimum</b> és/vagy a{" "}
                  <b>maximum ár</b>, illetve a Kategóriák részben{" "}
                  <b>kategóriák alapján</b> lehet szűrni a keresést. Az Árak
                  részben a Minimum ár (HUF), illetve a Maximum ár (HUF) alatti
                  mezőkbe lehet beírni a kívánt összeget. A Kategóriák részben
                  pedig a kategóriákra rákattintva lehet kiválasztani.
                </p>
              </div>
            </div>
            <div className="collapse bg-base-100 my-3">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">Rendelés</div>
              <div className="collapse-content">
                <p className="mb-4">
                  Miután megtaláltad a kívánt terméket a <b>kosár gomb</b>ra
                  kattintva bele teheted azt a kosaradba. Ha többet szeretnél
                  belőle, akkor a megjelenő "+", illetve "-" gombokkal tudod
                  növelni, valamint csökkenteni a termék mennyiségét. Miután ezt
                  megtetted az összes terméknél, amit meg szeretnél vásárolni,
                  akkor a <b>képernyő jobb felső sarkában</b> a profilkép
                  melletti <b>kosár gomb</b>ra kattintva láthatod, hogy mely
                  termékeket választottad ki. Ezután kattints rá a{" "}
                  <b>rendelés gomb</b>ra.
                </p>
                <p className="mb-4">
                  A megjelenő oldalon még egyszer ellenőrizd a kiválasztott
                  termékeket, illetve a vásárlás végösszegét. A{" "}
                  <b>Tovább gomb</b>ra kattintva, ha nem vagy még bejelentkezve,
                  akkor a bejelentkezés oldalra visz. (A bejelentkezésről,
                  illetve a regisztrációról egy másik részben van szó). Ha igen,
                  akkor megkapod a <b>Szállítási adatok oldal</b>t, ahol ki
                  lehet választani a Mentett adatok alatt a korábban használt és
                  mentett szállítási címeidet. Ezenkívül lehetőség van egy új
                  cím mentésére, illetve használatára a Mentett adatok feletti
                  részben. Miután ezeket megtetted az <b>Összegzés oldal</b>on
                  még egyszer utoljára leellenőrizheted a kiválasztott
                  termékeket, a végösszeget és a megadott szállítási adatokat.{" "}
                </p>{" "}
                <p>
                  {" "}
                  A <b>Megrendelem gomb</b>ra kattintva sikeres a rendelés után
                  a Sikeres Rendelés! című oldalt kapod meg. A rendelésről egy
                  értesítést is fogsz kapni e-mailban.
                </p>
              </div>
            </div>
            <div className="collapse bg-base-100 my-3">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                Rendelés után
              </div>
              <div className="collapse-content">
                <p>
                  A rendelés után ellenőrizd az <b>e-mail</b> fiókodat, hogy
                  kaptál-e levelet a rendeléssel kapcsolatban. Ezután az oldalon
                  a <b>profilképedre</b>, aztán a <b>Beállítások</b> menüpontra
                  kattints. A megjelenő oldalon a <b>Rendelések</b> cím alatt
                  láthatod a rendelésedet, illetve a korábbiakat a vásárlás
                  ideje alapján rendezve. A rendelés státusza mellett a vásárlás
                  ideje, illetve a rendelés teljes ára található. A{" "}
                  <b>Részletek gomb</b>ra kattintva, további adatokat találhatsz
                  a rendelésről. Ha valami nem működik, akkor olvassa el a Hiba
                  a weboldal használata közben című részt.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="collapse bordered border-4 border-base-100 my-4">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            Fórum használata
          </div>
          <div className="collapse-content">
            <div className="collapse bg-base-100 my-3">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                Poszt létrehozása
              </div>
              <div className="collapse-content">
                <p>hello</p>
              </div>
            </div>
            <div className="collapse bg-base-100 my-3">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                Hozzászólás létrehozása
              </div>
              <div className="collapse-content">
                <p>hello</p>
              </div>
            </div>
            <div className="collapse bg-base-100 my-3">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                Keresés a posztok között
              </div>
              <div className="collapse-content">
                <p>hello</p>
              </div>
            </div>
          </div>
        </div>

        <div className="collapse bordered border-4 border-base-100 my-4">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            Hiba a weboldal használata közben
          </div>
          <div className="collapse-content">
            <p>
              Ha valami hibát észlelsz rendelés után (például: nem kapsz email-t
              vagy nem tudsz bejelentkezni), akkor hívd az oldal alján, illetve
              a főoldalon a Kiszállítással kapcsolatos információk részben
              található telefonszámot. A lehető leggyorsabban megpróbáljuk
              megoldani a problémát.
            </p>
          </div>
        </div>

        {session?.user?.role === "admin" ? (
          <>
            <div className="collapse bordered border-4 border-base-100 my-4">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">Admin</div>
              <div className="collapse-content">
                <div className="collapse bg-base-100 my-3">
                  <input type="checkbox" />
                  <div className="collapse-title text-xl font-medium">
                    Termékfeltöltés
                  </div>
                  <div className="collapse-content">
                    <p className="mb-4">
                      Az oldal megnyitása után kattints a{" "}
                      <b>képernyő jobb felső sarkában</b> lévő admin
                      profilképre. A lenyíló listában válaszd ki az{" "}
                      <b>Admin felület</b> opciót. A képernyő baloldalán lévő
                      menüsorból válaszd ki a <b>termékfeltöltés</b> részt, ha
                      nincs még megnyitva. Ekkor megjelenik egy űrlap, ahol fel
                      lehet tölteni a terméket.{" "}
                    </p>{" "}
                    <p>
                      A <b>termék nevét, leirását, árát, mennyiségét</b>,
                      illetve <b>kategóriáit</b> tudod megadni. Új kategóriát
                      lehet hozzáadni ( a Hozzáadás gomb melletti mezőbe beírva
                      a kívánt kategóriát és a gombra rányomva), de a már
                      meglévő kategóriákból is lehet választani. Ezek mellett
                      képet vagy <b>képeket</b> is lehet feltölteni a termékhez
                      a Képek hozzáadása nevű gombbal. Végül ha mindent
                      kitöltöttél akkor a <b>Termék feltöltése</b> című gombbal
                      fel tudod tölteni a terméket.
                    </p>
                  </div>
                </div>
                <div className="collapse bg-base-100 my-3">
                  <input type="checkbox" />
                  <div className="collapse-title text-xl font-medium">
                    Rendelések és státuszainak változatása
                  </div>
                  <div className="collapse-content">
                    <p className="mb-4">
                      Az oldal megnyitása után kattints a{" "}
                      <b>képernyő jobb felső sarkában</b> lévő admin
                      profilképre. A lenyíló listában válaszd ki az{" "}
                      <b>Admin felület</b> opciót.{" "}
                    </p>
                    <p>
                      {" "}
                      A képernyő baloldalán lévő menüsorból válaszd ki a{" "}
                      <b>Rendelések</b> részt, ha nincs még megnyitva. Itt
                      ötösével láthatod az összes beérkező rendeléseket ötösével
                      vásárlás ideje alapján rendezve. Az alattuk lévő{" "}
                      <b>Előző és Következő</b> gombokkal tudsz lépdelni a
                      rendelések között (ötösével). A rendeléseknél a státusza,
                      a vásárlás ideje, a teljes ára jelenik meg, de a{" "}
                      <b>Részletek gombra</b> kattintva további adatok jelennek
                      meg. A rendelés <b>státuszát</b> meg tudod{" "}
                      <b>változtatni</b>, ha a státusz melletti lenyíló listából
                      kiválasztod azt.
                    </p>
                  </div>
                </div>
                <div className="collapse bg-base-100 my-3">
                  <input type="checkbox" />
                  <div className="collapse-title text-xl font-medium">
                    Hiba az oldalon
                  </div>
                  <div className="collapse-content">
                    <p>
                      Hiba esetén hívja a szerződésben megadott telefonszámot!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="mx-auto w-5/6 mt-10 bg-base-300 p-3 rounded-xl">
        <div className="md:flex">
          <div className="md:w-2/5 flex items-center justify-center">
            <h1 className="text-3xl font-semibold p-2 text-center mt-12 mb-12 lg:mb-40 lg:mt-40 md:mb-32 md:mt-32">
              Útmutató videó:
            </h1>
          </div>
          <div className="md:w-3/5">
            <iframe
              className={styles.youtube}
              src={`https://www.youtube.com/embed/SIsgpllRsEM`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Tutorial;
