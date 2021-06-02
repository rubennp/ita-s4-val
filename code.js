const provincies = ['A Coruña', 'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona', 'Burgos', 'Cáceres',
    'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba', 'Cuenca', 'Girona', 'Granada', 'Guadalajara',
    'Guipúzcoa', 'Huelva', 'Huesca', 'Islas Baleares', 'Jaén', 'León', 'Lleida', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra',
    'Ourense', 'Palencia', 'Las Palmas', 'Pontevedra', 'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona',
    'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'
];

// Omple opcions de datalist provincies
provincies.forEach(p => {
    let option = document.createElement("option");
    option.value = p;
    document.getElementById("provinciesLlista").appendChild(option);
});

// onsubmit loginForm:
document.getElementById("loginForm").addEventListener('submit', (event) => {
    let valid = true;
    valid = validaMail(document.getElementById("loginEmail"));
    valid = valid && validaPassword(document.getElementById("loginPassword"));
    if (!valid) event.preventDefault();
});

// onsubmit registreForm:
document.getElementById("registreForm").addEventListener('submit', (event) => {
    let valid = true;
    valid = validaProvincia();
    valid = valid && validaMail(document.getElementById("registreEmail"));
    valid = valid && validaPassword(document.getElementById("registrePassword"));
    valid = valid && validaPassword2(valid);
    if (!valid) event.preventDefault();
});

// onsubmit cercaForm:
document.getElementById("cercaForm").addEventListener('submit', (event) => {
    let valid = validaCerca();
    if (!valid) event.preventDefault();
});

/*
 * validaMail(): valida camp d'email.
 */
function validaMail(el) {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (el.value === "") {
        document.getElementById(`error-${el.id}`).innerHTML = "El camp email és obligatori";
        return isInvalid(el);
    } else if (!regex.test(el.value)) {
        document.getElementById(`error-${el.id}`).innerHTML = "Has d'introduïr un email vàlid (ex: mail@mail.com)";
        return isInvalid(el);
    } else {
        return isValid(el);
    }
}

/*
 * validaPassword(): valida camp de contrasenya. Ara només valida que no estigui buit
 */
function validaPassword(el) {
    // mínim una majúscula, mínim un número, mínim 8 caràcters
    let regex = /^(?=\w+\d)(?=\w*[A-Z])\S{8,}$/;
    return (el.value === "" || !regex.test(el.value)) ? isInvalid(el) : isValid(el);
}

/*
 * validaPassword2(): valida el camp de repetició de password. Que sigui igual a primer.
 */
function validaPassword2(validPassword1) {
    let inputs = document.querySelectorAll("input[id^='registrePassword']");
    if (inputs[1].value === "") {
        return isInvalid(inputs[1]);
    } else if (inputs[0].value !== inputs[1].value && !validPassword1) {
        return isInvalid(inputs[1]);
    } else if (inputs[0].value !== inputs[1].value) {
        return isInvalid(inputs[1]);
    } else {
        return isValid(inputs[1]);
    }
}

/*
 * validaCerca(): valida el camp de cerca. Que tingui 3 o més caràcters
 */
function validaCerca() {
    let inpCerca = document.getElementById("inputCerca");
    return (inpCerca.value.length < 3) ? isInvalid(inpCerca) : isValid(inpCerca);
}

/*
 * validaProvincia(): Valida el camp de província. Com que no és obligatori, només retorna false si s'ha
 *                    introduït una província de fora del llistat.
 */
function validaProvincia() {
    let inpProv = document.getElementById("registreProvincia");
    return (inpProv.value !== "" && !provincies.searchIn(inpProv.value)) ? isInvalid(inpProv) : isValid(inpProv);
}

/*
 * isValid(): Canvia classes de camp a vàlid i retorn true
 */
function isValid(el) {
    if (el.classList.contains('is-invalid')) el.classList.remove('is-invalid');
    el.classList.add('is-valid');
    return true;
}

/*
 * isInvalid(): Canvia classes de camp a invàlid i retorna false
 */
function isInvalid(el) {
    if (el.classList.contains('is-valid')) el.classList.remove('is-valid');
    el.classList.add('is-invalid');
    return false;
}

/*
 * [Array].searchIn(): Busca un string dins d'un array
 */
Array.prototype.searchIn = function (s) {
    for (let el of this) if (el === s) return true;
    return false;
};