function deleteCard(card) {
    card.remove();
}

function creatCardRepository(text) {
    const card = document.createElement('div');
    card.classList.add('repository');
    card.flexDirection = 'row';

    const info = document.createElement('p');
    info.classList.add('info');
    info.textContent = `Name: ${text.name}\nOwner: ${text.owner.login}\nStars: ${text.stargazers_count}`;
    const btn = document.createElement('button');
    btn.classList.add('delete-repository');
    const icon = document.createElement('img');
    icon.classList.add('icon-delete');
    icon.setAttribute('src', 'https://cdn-icons-png.freepik.com/512/1828/1828665.png');
    icon.setAttribute('alt', 'delete repository');
    icon.style.height = '42px';
    icon.style.width = '42px';
    btn.appendChild(icon);
    btn.addEventListener('click', e => {
        deleteCard(btn.closest('.repository'));
    });

    card.appendChild(info);
    card.appendChild(btn);

    return card;
}

function addRepository(text) {
    const card = creatCardRepository(text);
    const container = document.querySelector('.container');
    container.appendChild(card);
    document.querySelector('input').value = '';
}


function creatAvroComplete(arr) {
    if (document.querySelector('.repositorys')) {
        document.querySelector('.repositorys').remove();
    }

    const div = document.createElement('div');
    div.classList.add('repositorys');

    for (let i = 0; i < arr.length; i++) {
        const repo = document.createElement('p');
        repo.classList.add('name');
        repo.textContent = arr[i].name;
        repo.addEventListener('click', e => {
            div.remove();
            addRepository(arr[i]);
        });
        div.append(repo);
    }
    const form = document.querySelector('.search');
    form.appendChild(div);
}


function makeRequest() {
    const listRepo = document.querySelector('.search');
    if (document.querySelector('input').value === '') return;
    const url = `https://api.github.com/search/repositories?q=${document.querySelector('input').value}&type=repositories&per_page=5`;
    fetch(url)
        .then(response => response.json())
        .then(repositories => creatAvroComplete(repositories.items));
}


const debounce = (fn, debounceTime) => {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, arguments), debounceTime);
    };
};

const debouncedFn = debounce(makeRequest, 500);

const input = document.querySelector('.search-input');
input.addEventListener('input', () => debouncedFn());