"use client";

function Nyitva() {
  const currentHour = new Date().getHours();
  const currentDay = new Date().getDay();
  if (currentHour >= 10 && currentHour < 22 && currentDay <= 5) {
    return <span className="badge badge-success">Nyitva</span>;
  }

  if (currentHour >= 22 || (currentHour < 10 && currentDay <= 5)) {
    return <span className="badge badge-error">Zárva</span>;
  }

  if (currentHour >= 11 && currentHour < 23 && currentDay > 5) {
    return <span className="badge badge-success">Nyitva</span>;
  }

  if (currentHour >= 23 || (currentHour < 11 && currentDay > 5)) {
    return <span className="badge badge-error">Zárva</span>;
  }
}
export default Nyitva;
