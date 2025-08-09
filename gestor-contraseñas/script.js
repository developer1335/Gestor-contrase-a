const form = document.getElementById('passwordForm');
const list = document.getElementById('passwordList');
const search = document.getElementById('search');

let passwords = JSON.parse(localStorage.getItem('passwords')) || [];

function renderPasswords(filter = '') {
    list.innerHTML = '';
    passwords
        .filter(p => p.service.toLowerCase().includes(filter.toLowerCase()))
        .forEach((p, index) => {
            const li = document.createElement('li');
            li.className = 'password-item';
            li.innerHTML = `
                <span>${p.service} - ${p.username}</span>
                <div>
                    <button onclick="copyPassword('${p.password}')">📋 Copiar</button>
                    <button onclick="deletePassword(${index})">🗑 Eliminar</button>
                </div>
            `;
            list.appendChild(li);
        });
}

function copyPassword(pass) {
    navigator.clipboard.writeText(pass);
    alert('Contraseña copiada al portapapeles');
}

function deletePassword(index) {
    passwords.splice(index, 1);
    localStorage.setItem('passwords', JSON.stringify(passwords));
    renderPasswords(search.value);
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const service = document.getElementById('service').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    passwords.push({ service, username, password });
    localStorage.setItem('passwords', JSON.stringify(passwords));

    form.reset();
    renderPasswords();
});

search.addEventListener('input', e => renderPasswords(e.target.value));

renderPasswords();
