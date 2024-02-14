'use client';

function KiszallitIdo() {
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();
  const currentDay = new Date().getDay();
  var perc = ""

  if (currentMinute < 10) {
    perc = '0' + currentMinute.toString();
  }
  if (currentMinute >= 10) {
    perc =  currentMinute.toString();
  }

  if (currentHour >= 10 && currentHour < 22 && currentDay <= 5) {
    return <span>{currentHour + 1}:{perc}</span>;
  }
  if (currentHour >= 22 || (currentHour < 10 && currentDay <= 5)) {
    return <span className=" text-red-600 font-bold">Zárva vagyunk!</span>;
  }

  if (currentHour >= 11 && currentHour < 23 && currentDay > 5) {
    return <span>{currentHour + 1}:{perc}</span>;
  }

  if (currentHour >= 23 || (currentHour < 11 && currentDay > 5)) {
    return <span className=" text-red-600 font-bold">Zárva vagyunk!</span>;
  }
}

export default KiszallitIdo;
