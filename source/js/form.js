(function() {
  const me = {};
  const form = document.querySelector('.form-container');
  const formValidation = document.querySelector('.form__validation');
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

  me.valid = () => {
    const requiredFields = document.querySelectorAll('[data-valid="required"]');
    const emailValue = document.querySelector('[data-email]').value;
    const numberValue = document.querySelector('[data-number]').value;

    if (!me.isAllCompleted(requiredFields)) {
      return { error: true, message: 'Please fill in all required fields.'};
    } else if(!I.validation.isEmail(emailValue)) {
      return { error: true, message: 'Email is not valid.'};
    } else if(!I.validation.isNumber(numberValue)) {
      return { error: true, message: 'Number is not valid.'};
    }

    formValidation.classList.add('form__validation--success');

    return { error: false, message: 'Correct!'};
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
