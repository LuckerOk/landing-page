(function() {
  const me = {};
  const form = document.querySelector('.form-container');
  let closeButton = null;

  const onClose = () => {
    me.close();
    closeButton.removeEventListener('click', onClose);
  };

  me.open = () => {
    form.classList.remove('is-hidden');

    closeButton = document.querySelector('.form__close-button');
    closeButton.addEventListener('click', onClose);
  };

  me.close = () => {
    form.classList.add('is-hidden');
  };

  me.isValid = () => {
    const requiredFields = document.querySelectorAll('[data-valid="required"]');
    const emailValue = document.querySelector('[data-email]').value;
    const numberValue = document.querySelector('[data-number]').value;

    if (!me.isAllCompleted(requiredFields)) {
      console.log('Please fill in all required fields.');

      return false;
    } else if(!I.validation.isEmail(emailValue)) {
      console.log('Email is not valid.');

      return false;
    } else if(!I.validation.isNumber(numberValue)) {
      console.log('Number is not valid.');

      return false;
    }

    return true
  };

  me.isAllCompleted = data => {
    let result = true;

    data.forEach(item => {
      if (!I.validation.isNotEmpty(item.value)) {
        result = false;
      }
    });

    return result;
  };

  I.form = me;
}());
