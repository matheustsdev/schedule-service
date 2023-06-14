const choices = document.getElementById("choices-user");
const date = document.getElementById("date");

date.min = new Date().toISOString().split("T")[0];

const today = new Date();
today.setDate(today.getDate() + 30);
date.max = today.toISOString().split("T")[0];

date.addEventListener('input', () => {

    const dateValue = date.value;
    console.log(dateValue);

})


const button = document.getElementById("button-schedule");

button.onclick = (e) => {

    e.preventDefault();
    validationInputs();
    validandoData();
}

const error = (e, message) => {
    const divInput = e.parentElement;
    const errorInterface = divInput.querySelector('.error');

    errorInterface.innerText = message;

    divInput.classList.add('error');
    divInput.classList.remove('sucess');
}

const success = (e) => {
    const divInput = e.parentElement;
    const errorInterface = divInput.querySelector('.error');

    errorInterface.innerText = '';

    divInput.classList.add('sucess');
    divInput.classList.remove('error');
}

const validationInputs = () => {

    const staff = document.getElementsByName("staff-name");
    const hour = document.getElementsByName("hour-name");
    const dateValue = date.value;

    for (let i = 0; i < staff.length; i++) {

        if(staff[i].checked){
            var a = 1;
        }  
    }
    for (let i = 0; i < hour.length; i++) {
        if(hour[i].checked){
            var b = 1;
        }  
    }
    if(a != 1 && b != 1) {
        error(choices, '* Selecione as opções acima.');
    }
    else if (dateValue === ''){
        error(choices, '* Selecione uma data.');
    } else {
        success(choices);
    }
}             