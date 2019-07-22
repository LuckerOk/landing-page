(function() {
  const me = {};

  me.isEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  };

  me.isNumber= number => {
    const re = /^\d+$/;

    return re.test(number);
  };

  me.isNotEmpty = str => {
    return Boolean(str);
  };

  I.validation = me;
}());