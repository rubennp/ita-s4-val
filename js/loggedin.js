let user;

window.addEventListener('load', () => {
    user = sessionStorage.getItem('loggedInUser');
    document.getElementById("resposta").innerHTML = `Hola, ${user}!`;
});

document.querySelector('form').addEventListener('submit', () => {
    sessionStorage.removeItem('loggedInUser');
});