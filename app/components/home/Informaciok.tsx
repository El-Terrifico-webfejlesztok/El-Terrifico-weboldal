import dynamic from 'next/dynamic';

const Nyitva = dynamic(() => import('./Nyitva'));

function Informaciok() {
  return (
    <div id="tabla" className="reszek">
      <h1 className="text-4xl text-error font-bold text-center mb-4 mt-4">
        Kiszállítással kapcsolatos információk:
      </h1>
      <table className="table-lg mx-auto">
        <tbody>
          <tr aria-rowspan={2}>
            <th rowSpan={2}>
              Kiszállítás: <Nyitva />
            </th>
            <td>Hétfő-Péntek: 10:00-22:00</td>
          </tr>
          <tr>
            <td>Szombat-Vasárnap: 11:00-23:00</td>
          </tr>
          <tr>
            <th>Minimum rendelés:</th>
            <td>2000 Ft</td>
          </tr>
          <tr>
            <th>Ingyenes kiszállítás:</th>
            <td>4000 Ft-tól</td>
          </tr>
          <tr>
            <th>Várható kiszállítás:</th>
            <td>60 perc</td>
          </tr>
          <tr>
            <th>Telefonszám:</th>
            <td>+36 30 548 7729</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default Informaciok;
