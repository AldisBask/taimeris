document.addEventListener("DOMContentLoaded", function () {
  updateTimer(); // Update timer immediately on page load
  setInterval(updateTimer, 1000); // Update timer every second
});

function updateTimer() {
  const now = new Date();
  const startOfWorkday = getNextWorkday(now);
  const endOfWorkday = new Date(startOfWorkday);
  endOfWorkday.setHours(17, 0, 0, 0);

  let remainingTime;

  if (now < startOfWorkday) {
      remainingTime = getTimeDifference(now, startOfWorkday);
  } else if (now < endOfWorkday) {
      remainingTime = getTimeDifference(now, endOfWorkday);
  } else {
      // If it's past 17:00, calculate time until the next workday at 8:00
      const nextDay = getNextWorkday(now);
      remainingTime = getTimeDifference(now, nextDay);
  }

  displayTime(remainingTime);
}

function getNextWorkday(now) {
  const nextDay = new Date(now);
  nextDay.setDate(nextDay.getDate() + 1);
  nextDay.setHours(8, 0, 0, 0);

  // Check if the next day is a weekend (Saturday or Sunday)
  while (nextDay.getDay() === 0 || nextDay.getDay() === 6) {
      nextDay.setDate(nextDay.getDate() + 1);
  }

  return nextDay;
}

function getTimeDifference(start, end) {
  const difference = end - start;
  const hours = Math.floor(difference / 3600000);
  const minutes = Math.floor((difference % 3600000) / 60000);
  const seconds = Math.floor((difference % 60000) / 1000);

  return { hours, minutes, seconds };
}

function displayTime(remainingTime) {
  const timerElement = document.getElementById("timer");
  timerElement.textContent = `Atlikušais laiks: ${formatTime(remainingTime.hours)}:${formatTime(remainingTime.minutes)}:${formatTime(remainingTime.seconds)}`;
}

function formatTime(value) {
  return value < 10 ? `0${value}` : value;
}
