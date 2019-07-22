(function() {
  const openFormButton = document.querySelector('.arrow-down');
  const form = document.querySelector('.form');
  const nav = document.querySelector('.nav');
  const formValidation = document.querySelector('.form__validation');

  if (openFormButton) {
    openFormButton.addEventListener('click', e => {
      e.preventDefault();

      I.form.open();
    })
  }

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const { error, message } = I.form.valid();

      if (error) {
        formValidation.innerText = message;
      } else {
        formValidation.innerText = message;
      }
    });
  }

  if (nav) {
    nav.addEventListener('click', e => {
      const target = e.target;

      if (target.tagName.toLowerCase() !== 'a') {
        return;
      }

      e.preventDefault();

      I.navigation.toggleToActiveLink(target);
    });
  }
}());