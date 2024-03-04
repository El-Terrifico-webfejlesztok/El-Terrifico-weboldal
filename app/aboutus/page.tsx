import React from 'react';
import Section from '../components/aboutus/section';
import TeamMemberCard from '../components/aboutus/teamCard';
import "./aboutus.css"
import Footer from '../components/footer/Footer';

const AboutUs: React.FC = () => {
  return (
    <>
      <div className="rolunk mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <h1 className="sections cim py-3 px-24 text-7xl font-bold mb-4">
            Rólunk
          </h1>
        </div>
        <div className="sections p-2">
          <Section
            title="Feladatunk és a csapat"
            par1='Szervusz amigo! Mi az El Terrifico étterem IT csapata vagyunk. Feladatunk a cég online ügyeinek intézése, valamint bármifále szoftveres hiba kiküszöbölése, ami a céget érint.'
            par2='Ez a weboldal azért készült, hogy éttermünk versenyt tudjon tartani a mai trendekkel, hiszen az emberek nagyrésze napjainkban már csak házhoz rendel ételt. A mi célunk e weboldal megalkotásával, hogy a világon mindenkinek az életét megkönnyítsük: így csak pár gombnyomásra vagy attól, hogy világhírű étkeinket megízlelhesd!'
            par3='Eleinte csapatunknak három tagja volt, de végül nagylelkű befektetőnk, a Horribili kft.™, elküldte hozzánk egyik legjobb programozóját, így mi négyen alkottuk meg ezt az oldalt, csak önnek! Csapatunk tagjait ezeken a kártyákon találja! Ha többet meg szeretne tudni rólunk, kattintson az adott kártyán a "Több..." gombra extra információért.' />
          <div className="flex flex-col justify-evenly sm:flex-row">
            <div className="flex-1 m-2">
              <TeamMemberCard
                name="Fülöp"
                name2="Krisztián"
                position="Backend fejlesztő"
                imageUrl="/Krisz.png"
                description='A Horribili Kft.™ egyik elit programozója, tapasztalatai megosztásával csapatunk hatalmas mennyiségű új tudásra tett szert. Ezek mellett a weboldal backend részét neki köszönhetjük.'
                contributions="Főbb tevékenységei: "
                contr1="A backend megalkotása"
                contr2="A frontend stílus meghatározása" />
            </div>
            <div className="flex-1 m-2">
              <TeamMemberCard
                name="Tóth"
                name2="Barnabás"
                position="Frontend fejlesztő"
                imageUrl="/Toth_Barni.jpg"
                description="Csapatunk lelkes vezetője. Bár a cég ügyeivel gyakran elfoglalt, mindent megtesz azért, hogy csapata sikert arasson. Csapattársaitól szívesen vesz át tudást, hogy minél hatékonyabban tudja segíteni őket."
                contributions='Főbb tevékenységei: '
                contr1='Feladatok leosztása, valamint frontend'
                contr2='Bemutatók, munkatér karbantartása' />
            </div>
            <div className="flex-1 m-2">
              <TeamMemberCard
                name="Nagy"
                name2="Barnabás"
                position="Frontend fejlesztő"
                imageUrl="/Nagy_Barni.jpg"
                description="Csapatunk fő frontend programozója. Az itt dolgozott évei során összebarátkozott az étterem fő séfével, Sergio Francoval, így az étteremben gyakran ő a mulatság lelke. Ezt a tulajdonsága munka közben is előjön, csapattagjainkat mindig felvidítja."
                contributions='Főbb tevékenységei: '
                contr1='Több rész frontendje'
                contr2='Videók készítése, beszerzése' />
            </div>
            <div className="flex-1 m-2">
              <TeamMemberCard
                name="Molnár"
                name2="Zalán"
                position="Frontend fejlesztő"
                imageUrl="/placeholder.png"
                description="Csapatunk legújabb tagja. Nemrég frontend fejlesztőként került be csapatunkba. Tapasztalatlansága ellenére mindent megtesz, hogy csapatunk értékes tagjává tudjon válni."
                contributions='Főbb tevékenységei: '
                contr1='Frontend fejlesztések'
                contr2='Árubeszerzés' />
            </div>
          </div>
        </div>
        <div className="sections p-2">
          <Section
            title="Az étterem története"
            par1="Az étterem az 1900-as években alapult, szerény körülmények között. A kis Sergio Franco ezzel az étteremmel együtt nőtt fel. Apja, az étterem tulajdonosa, zseniális séf volt, fiának mindent megtanított ahhoz, hogyha felnő, magától tudja vezetni az éttermet. Az akkoriban kis színvonalú étterem nem teljesített túl jól, de hozamaiból a család meg tudott élni."
            par2="Apja halála után Franconak egyedül kellet megbírkóznia az étterem vezetésével azok alapján, amit apja tanított neki, de ez az étterem állapota miatt nehéznek bizonyult. Bővítette a menüt, hátha így több ember látogat el éttermébe, de a szűk körű hírneve miatt ez sajnos nem segített. Franco tudta, hogy ennél sokkal többre vihetné, és ezt meg is látta benne egy nagyvállalat. A Horribili Kft.™ meglátta a potenciált Francoban és éttermében, ezért az egészet felvásárolta, így megmentette séfünket az anyagi csődtől. Az anyagi problémáktól megszabadult Franconak támadt egy ötlete, hogy éttermét híressé tegye: úgy döntött, részt vesz a 2012-es konyhafőnök műsorban, amit végül diadalmasan meg is nyert."
            par3="Azóta az étterem neve vilegszerte elterjedt Franco győzelme hatására. Napjainkban az El Terrifico az egyik legsikeresebb mexikói étterem a világon. Franco még azóta is széles mosollyal készíti el kedvenc ételeinket ennyi év után is." />
        </div>

      </div><Footer></Footer>
    </>
  );
};

export default AboutUs;