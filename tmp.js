export default (model) => {
  let errors = {},
      reg = {
        email: (arg) => /.+@.+\..+/i.test(arg.email),
        passLen: (arg) => arg.pass.length > 7 && arg.pass.length < 30,
        passEmp: (arg) => /^\s*$/.test(arg.password),
        repassEmp: (arg) => /^\s*$/.test(arg.repassword),
        passDiff: (arg) => arg.password === arg.repassword
      },
      msg = {
        email: 'Неверный формат почты',
        passLen: 'Длина пароля не менее 6 символов и не более 50',
        passEmp: 'Поле пароль не заполнено',
        repassEmp: 'Поле re-password не заполнено',
        passDiff: 'Пароли не совпадают'
      };

  function Valid(arg) {  
    for (key in arg) {
      if (reg[key](arg) === false) {
        errors[key] = msg[key]
      };
    };
  };

  Valid(model);

  return {
    errors,
    isValid: JSON.stringify(errors) === "{}"
  };
};