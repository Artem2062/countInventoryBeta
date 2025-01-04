

if (localStorage.getItem('status') == "user") {
    let templateCode =
        `
        <button id="exitButton">exit</button>
        <img src="img/cart25.png" id="items">
    `
    let template = Handlebars.compile(templateCode)
    let fieldul = document.querySelector('#header');
    fieldul.innerHTML = '';
    fieldul.innerHTML = template()
    items.addEventListener('click', function () {
        window.location.href = "../application/main.html"
    })
}
if (localStorage.getItem('status') == "admin") {
    let templateCode =
        `
        <button id="exitButton">exit</button>
        <h2 id="applications">заявки</h2>
        <h2 id="addItem">Добавление инвентаря</h2>
    `
    let template = Handlebars.compile(templateCode)
    let fieldul = document.querySelector('#header');
    fieldul.innerHTML = '';
    fieldul.innerHTML = template()
    addItem.addEventListener('click', function () {
        window.location.href = "../create/main.html"
    })
    applications.addEventListener('click', function () {
        window.location.href = "../application/main.html"
    })
}
exitButton.addEventListener('click', function () {
    let xhr2 = new XMLHttpRequest();
    xhr2.open('GET', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=dae33d6a3b6c140e2272c568fb0383aa', true);
    xhr2.send();
    xhr2.addEventListener('readystatechange', function () {
        if (xhr2.readyState == 4 && xhr2.status == 200) {
            let usersArr = JSON.parse(xhr2.responseText)
            let flag1 = true
            for (let i in usersArr) {
                if (usersArr[i].login == localStorage.getItem('login')) {
                    usersArr[i].entered = 0
                    let xhrSender2 = new XMLHttpRequest();
                    xhrSender2.open('PUT', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=dae33d6a3b6c140e2272c568fb0383aa', true)
                    xhrSender2.setRequestHeader("Content-type", "application/json");
                    xhrSender2.send(JSON.stringify(usersArr));
                    xhrSender2.addEventListener('readystatechange', function () {
                        if (xhrSender2.readyState == 4) {
                            if (xhrSender2.status == 200) {
                                localStorage.clear()
                                localStorage.setItem('entered', 0)
                                window.location.href = "../auth/enter.html"
                            }
                        }
                    })
                }
            }
        }
    })
})
let xhr3 = new XMLHttpRequest();
xhr3.open('GET', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=0f429c12c8f75592d3a7077ee70e9b0e', true);
xhr3.send();
xhr3.addEventListener('readystatechange', function () {
    if (xhr3.readyState == 4 && xhr3.status == 200) {
        let usersArr2 = JSON.parse(xhr3.responseText)
        let templateCode2 = `
            <li class="card">
            <img class="cardImage" src="{{url}}">
            <h3 style="margin: 10px;">{{name}}</h3>
            <p style="color: rgb(87, 87, 87);">{{count}} шт</p>
            <div style="display: flex;">
                <p>Состояние:</p>
                <p style="color: rgb(87, 87, 87); margin-left: 5px;">{{condition}}</p>
            </div>
            <button id="addToApplication" class="addToApplicationButton">В заявку</button>
        </li>
            `
        let template = Handlebars.compile(templateCode2)
        let fieldul2 = document.querySelector('#cards');
        fieldul2.innerHTML = '';
        for (let elem of usersArr2) {
            fieldul2.innerHTML+=template(elem)
        }
    }
})