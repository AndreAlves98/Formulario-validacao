const form = document.getElementById("form");

const EMAIL_REGEX = new RegExp(
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/,
);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  checkForm();
});

//validação de usuário
function checkInputUsername() {
  const username = document.getElementById("username");
  const { value } = username;

  if (value === "") {
    errorInput(username, "Preencha seu usuário");
  } else {
    removeError(username);
  }
}

function checkInputEmail() {
  const email = document.getElementById("email");
  const { value } = email;

  if (value === "") {
    errorInput(email, "Preencha seu Email");
    return;
  }

  if (!isEmailValid(value)) {
    errorInput(email, "Email inválido");
    return;
  }

  removeError(email);
}

function isEmailValid(email) {
  return EMAIL_REGEX.test(email);
}

// validação de senha
function checkInputPassword() {
  const password = document.getElementById("password");
  const { value } = password;

  if (value === "") {
    errorInput(password, "Preencha sua Senha");
  } else if (value.length < 8) {
    errorInput(password, "A senha precisa ter no mínimo 8 digitos");
  } else {
    checkInputPasswordConfirm(value);

    removeError(password);
  }
}

function checkInputPasswordConfirm(passwordValue) {
  const confirmationInput = document.getElementById("password-confirmation");
  const { value: passwordConfirmValue } = confirmationInput;

  if (passwordConfirmValue === "") {
    errorInput(confirmationInput, "Por favor confirme sua senha");
  } else if (passwordConfirmValue !== passwordValue) {
    errorInput(confirmationInput, "As senhas não são iguais!");
  } else {
    removeError(confirmationInput);
  }
}

//validação do formulário
function checkForm() {
  checkInputUsername();
  checkInputEmail();
  checkInputPassword();

  const formItems = form.querySelectorAll(".form-content");
  const isValid = [...formItems].every((item) => {
    return item.className === "form-content";
  });
  if (isValid) {
    alert("Cadastrado com Sucesso!!");
  }
}

function errorInput(input, message) {
  const formItem = input.parentElement;
  let errorElement = formItem.querySelector("span");

  if (errorElement) {
    errorElement.innerText = message;
  } else {
    const errorElement = document.createElement("span");
    errorElement.innerText = message;
    formItem.appendChild(errorElement);
  }

  formItem.className = "form-content error";
}

function removeError(input) {
  const formItem = input.parentElement;
  const errorElement = formItem.querySelector("span");

  if (errorElement) {
    formItem.removeChild(errorElement);
  }

  formItem.className = "form-content";
}

// tirar o foco do erro após ajustado
email.addEventListener("blur", () => {
  checkInputEmail();
});

username.addEventListener("blur", () => {
  checkInputUsername();
});
