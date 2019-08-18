


const sendForm = () => {
    event.preventDefault();
    const form = document.forms.formAdd;

    let formElements = {};

    for (let i = 0; i < form.length; i++) {
        if (i === 7) { continue; }
        const key = form[i].name;
        const value = form[i].value;

        formElements = {
            ...formElements,
            [key]: value
        }
    }
    console.log(formElements);
    formValidation(form, formElements);

}

const formValidation = (form, formElements) => {
    const { name, lastname, date, time, typeAnimal, nameAnimal, observation } = formElements;
    let countValidation = 0;

    clearErrors();

    if (!name && !lastname && !date && !time && !typeAnimal && !nameAnimal && !observation) {
        document.getElementsByClassName('general-error')[0].innerHTML = "Todos los campos son obligatorios";
        return;
    }

    inputValidation(name, form.name, 'error-name') ? countValidation++ : null;
    inputValidation(lastname, form.lastname, 'error-lastname') ? countValidation++ : null;
    inputValidation(date, form.date, 'error-date') ? countValidation++ : null;
    inputValidation(time, form.time, 'error-time') ? countValidation++ : null;
    inputValidation(typeAnimal, form.typeAnimal, 'error-typeAnimal') ? countValidation++ : null;
    inputValidation(nameAnimal, form.nameAnimal, 'error-nameAnimal') ? countValidation++ : null;
    inputValidation(observation, form.observation, 'error-observation') ? countValidation++ : null;

    countValidation === 7 ? addVisit(formElements) : null;
}

const addVisit = (formElements) => {
    const { name, lastname, date, time, typeAnimal, nameAnimal, observation } = formElements;

    const htmlText =
        `<div class="card">
        <div class="card-body">
            <h5 class="card-title">
                ${name} ${lastname}
                <span class="date">${date} - ${time}</span>
            </h5>
            <p class="card-text">
                <span class="bold">Tipo del Animal: </span> ${typeAnimal}
            </p>
            <p class="card-text">
                <span class="bold">Nombre del Animal: </span> ${nameAnimal}
            </p>
            <p class="card-text">
                <span class="bold">Sintomas</span>
                <br />
                ${observation}
            </p>
            <button class="btn btn-danger btn-delete" onclick="removeVisit(event)">Eliminar Cita</button>
        </div>
    </div>`;

    let allVisits = localStorage.getItem(KEY_VISITS);
    if (allVisits == null) {
        allVisits = htmlText;
    } else {
        allVisits = allVisits + htmlText;
    }
    localStorage.setItem(KEY_VISITS, allVisits);

    document.getElementsByClassName('list-cards')[0].innerHTML = localStorage.getItem(KEY_VISITS);
    clearForm();
}


const inputValidation = (inputValue, inputName, inputErrorClass) => {
    inputName.classList.remove('is-invalid', 'is-valid');
    document.getElementsByClassName(inputErrorClass)[0].style.display = "none";

    if (inputValue) {
        inputName.classList.add('is-valid');
        return true;
    } else {
        inputName.classList.add('is-invalid');
        document.getElementsByClassName(inputErrorClass)[0].style.display = "block";
        return false;
    }
}


const clearErrors = () => {
    document.getElementsByClassName('general-error')[0].innerHTML = "";
}