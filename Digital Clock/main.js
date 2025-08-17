function digitalClock() {
  const display = document.getElementById("time");
  const day = document.getElementById("date");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  let month = months[today.getMonth()];
  let date = today.getDate();
  let year = today.getFullYear();

  m = checkTime(m);
  s = checkTime(s);

  display.innerHTML = `${h}:${m}:${s}`;
  day.innerHTML = `${month} : ${date} : ${year}`;
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + 1;
  }
  return i;
}
setInterval(digitalClock, 1000);
