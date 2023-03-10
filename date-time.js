const dateTimeElement = document.getElementById("date-time");

function updateTime() {
  const now = new Date();
  const date = now.toDateString();
  const time = now.toLocaleTimeString();
  dateTimeElement.textContent = `${date} ${time}`;
}

updateTime();
setInterval(updateTime, 1000);
