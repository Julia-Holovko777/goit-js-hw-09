import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;

  let inputDelay = Number(delay.value);
  let inputStep = Number(step.value);
  let inputAmount = Number(amount.value);

  if (inputDelay < 0 || inputStep < 0 || inputAmount < 0) {
    Notiflix.Notify.warning(`Enter a number greater than 0`);
  } else {
    for (let i = 0; i < inputAmount; i++) {
      createPromise(1 + i, inputDelay + i * inputStep)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        });
    }
  }
  form.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
