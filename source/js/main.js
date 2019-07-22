(function() {
  const openFormButton = document.querySelector('.arrow-down');
  const form = document.querySelector('.form');
  const nav = document.querySelector('.nav');

  if (openFormButton) {
    openFormButton.addEventListener('click', e => {
      e.preventDefault();

      I.form.open();
    })
  }

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      if (I.form.isValid()) {
        console.log('All good.')
      } else {
        console.log('Is not valid.')
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