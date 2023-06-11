const form = document.getElementById("signup-form");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const username = document.getElementById("name");
const phone = document.getElementById("telefone");
const email = document.getElementById("email");

const eyePassword = document.getElementById("eye-password");
const eyeConfirmPassword = document.getElementById("eye-confirm-password");

// show/hide password
eyePassword.addEventListener("click", function () {
    this.classList.toggle("fa-eye-slash");
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
})
eyeConfirmPassword.addEventListener("click", function () {
    this.classList.toggle("fa-eye-slash");
    const type = confirmPassword.getAttribute("type") === "password" ? "text" : "password";
    confirmPassword.setAttribute("type", type);
})

//  phone's mask 
phone.addEventListener('input', function (e) {
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,5})(\d{0,4})/)
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
})

form.addEventListener("submit", (e) => {

    e.preventDefault();
    validationForm();
})

const error = (e, message) => {
    const formItem = e.parentElement;
    const errorInterface = formItem.querySelector('.error');

    errorInterface.innerText = message;

    formItem.classList.add('error');
    formItem.classList.remove('sucess');
}

const success = (e) => {
    const formItem = e.parentElement;
    const errorInterface = formItem.querySelector('.error');
    errorInterface.innerText = '';

    formItem.classList.add('sucess');
    formItem.classList.remove('error');
}

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const blankSpace = (inputValue) => {
    if (inputValue === '' || inputValue == null) {
        return true;
    }
}

const validationForm = () => {

    const nameValue = username.value.trim();
    const phoneValue = phone.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    if (blankSpace(nameValue)) {
        error(username, '* Nome é um campo obrigatório');
    } else{ success(username) };
        

    if (blankSpace(emailValue)) {
        error(email, '* E-mail é um campo obrigatório');
    } else if (!isValidEmail(emailValue)){
        error(email, '* Digite um e-mail válido');
    } else {
        success(email)};

    if (blankSpace(passwordValue)) {
        error(password, '* Senha é um campo obrigatório');
    } else if (passwordValue.length < 6){
        error(password, '* Senha deve conter no mínimo 6 caracteres');
    } else {
        success(password)};

    if (blankSpace(confirmPasswordValue)) {
        error(confirmPassword, '* Confirmar senha é um campo obrigatório');
    } 
    else if(password.value !== confirmPassword.value){
        error(confirmPassword, '* Senhas não combinam');
    } else {
        success(confirmPassword);
    }


    if (phoneValue.length !== 16 && phoneValue !== ''){
        error(phone, '* Coloque o número no formato correto');
    }
    else{
        success(phone);
    } 
        

}
