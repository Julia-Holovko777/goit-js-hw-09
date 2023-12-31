import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateInput = document.querySelector('#datetime-picker');
const spans = document.querySelectorAll('.value');
const btn = document.querySelector('[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');

let timerId = null;

btn.disabled = true;
const TIMER_DELAY = 1000;

flatpickr(dateInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      btn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      btn.disabled = false;
      Notiflix.Notify.success('The countdown has started');
    }
  },
});

btn.addEventListener('click', btnStartClick);

function btnStartClick() {
  spans.forEach(item => item.classList.toggle('end'));
  btn.disabled = true;
  dateInput.disabled = true;
  timerId = setInterval(() => {
    const futureDate = new Date(dateInput.value);
    const finishTime = futureDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(finishTime);

    day.textContent = addLeadingZero(days);
    hour.textContent = addLeadingZero(hours);
    minute.textContent = addLeadingZero(minutes);
    second.textContent = addLeadingZero(seconds);

    if (finishTime < 1000) {
      spans.forEach(item => item.classList.toggle('end'));
      clearInterval(timerId);
      dateInput.disabled = false;
    }
  }, TIMER_DELAY);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}
