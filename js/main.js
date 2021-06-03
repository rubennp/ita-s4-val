let users = [{}], user, newUser = {};
let action = {
    login: false,
    register: false,
};

window.addEventListener('load', function() {
    if (localStorage.getItem('users') === null) localStorage.setItem('users', JSON.stringify(users));
    else users = JSON.parse(localStorage.getItem('users'));
    action.login = action.register = false;
});

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
    action.register = false;
    action.login = true;
    let valid = true;

    valid = validaMail(document.getElementById("loginEmail"));
    valid = valid && validaPassword(document.getElementById("loginPassword")); 
    
    valid ? sessionStorage.setItem('loggedInUser', user.mail) : event.preventDefault();
});

// onsubmit registreForm:
document.getElementById("registreForm").addEventListener('submit', (event) => {
    action.login= false;
    action.register = true;
    let valid = true;

    valid = validaProvincia();
    valid = valid && validaMail(document.getElementById("registreEmail"));
    valid = valid && validaPassword(document.getElementById("registrePassword"));
    valid = valid && validaPassword2(valid);
    
    if (valid) {    //registra
        users = [...users, newUser];
        localStorage.setItem('users', JSON.stringify(users));
    } else {
        event.preventDefault();
    }
});

// onsubmit cercaForm:
document.getElementById("cercaForm").addEventListener('submit', (event) => {
    let valid = validaCerca();
    if (!valid) event.preventDefault();
});

/*
 * errorMsg(): mostra missatge error sota el camp.
 */
const errorMsg = (el, msg = "El camp email és obligatori") => document.getElementById(`error-${el.id}`).innerHTML = msg;

/*
 * validaMail(): valida camp d'email.
 */
function validaMail(el) {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (el.value === "") {
        errorMsg(el);
        return isInvalid(el);
    } else if (!regex.test(el.value)) {
        errorMsg(el, "Has d'introduïr un email vàlid (ex: mail@mail.com)");
        return isInvalid(el);
    } else {
        if (action.login) {
            user = users.find(user => user.mail === el.value);
            // busca si l'usuari existeix
            if (user === undefined) {
                errorMsg(el, "L'usuari no existeix!");
                return isInvalid(el);
            }
        } else if (action.register) {
            // busca si l'usuari existeix
            if (users.find(user => user.mail === el.value) !== undefined) {
                errorMsg(el, "L'usuari ja existeix!");
                return isInvalid(el);
            } else {
                newUser.mail = el.value;
            }
        }
        return isValid(el);
    }
}

/*
 * validaPassword(): valida camp de contrasenya: mínim una majúscula, un número i 8 caràcters.
 */
function validaPassword(el) {
    let regex = /^(?=\w+\d)(?=\w*[A-Z])\S{8,}$/;
    if (el.value === "") {
        errorMsg(el);
        return isInvalid(el);
    } else if (action.register && !regex.test(el.value)) {
        errorMsg(el, "Mínim: 8 caràcters, una Majúscula i un número");
        return isInvalid(el);
    } else if (action.login && user.pass !== el.value) {
        errorMsg(el, "La contrasenya no coincideix per aquest usuari");
        return isInvalid(el);
    } else {
        return isValid(el);
    }
}

/*
 * validaPassword2(): valida el camp de repetició de password. Que sigui igual a primer.
 */
function validaPassword2(validPassword1) {
    let inputs = document.querySelectorAll("input[id^='registrePassword']");
    if (inputs[1].value === "") {
        errorMsg(input[0]);
        return isInvalid(inputs[1]);
    } else if (inputs[0].value !== inputs[1].value) {
        errorMsg(inputs[0], "Les contrasenyes han de coincidir!");
        return isInvalid(inputs[1]);
    } else {
        if (action.register) newUser.pass = inputs[0].value;
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
    if (inpProv.value !== "" && !provincies.searchIn(inpProv.value)) {
        return isInvalid(inpProv);
    } else {
        newUser.prov = inpProv.value;
        return isValid(inpProv);
    }
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