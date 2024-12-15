'use strict'
let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=30fcc2b1e9f760390bd12570386d21e9', true);
xhr.send();

function register() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        let usersArr = JSON.parse(xhr.responseText)
        let user = {
            login: '',
            password: '',
            status: 'user',
            entered: '0'
        }
        if (login.value == "" || password.value == "") {
            alert("Все поля должны быть заполнены")
        } if (login.value.includes(" ")){
            alert("Логин не должен содержать пробелов")
        } else {
            let flag1 = true
            for (let i in usersArr) {
                if (usersArr[i].login == login.value) {
                    flag1 = false
                    alert("Данный логин уже занят")
                    break
                }
            }
            if (flag1 == true) {
                if (passwordcheck.value == password.value) {
                    user.login = login.value
                    user.password = password.value
                    nickname.value = ""
                    login.value = ""
                    password.value = ""
                    passwordcheck.value = ""
                    usersArr.push(user)
                    let xhrSender = new XMLHttpRequest();
                    xhrSender.open('PUT', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=30fcc2b1e9f760390bd12570386d21e9', true)
                    xhrSender.setRequestHeader("Content-type", "application/json");
                    xhrSender.send(JSON.stringify(usersArr));
                    xhrSender.addEventListener('readystatechange', function () {
                        if (xhrSender.readyState == 4) {
                            if (xhrSender.status == 200) {
                                alert('Пользователь успешно зарегестрирован!');
                            } else {
                                alert('Ошибка отправки. Попробуйте еще раз.');
                            }
                        }
                    })
                } else {
                    alert("Пароли не совпадают")
                }
            }
        }
    }
}

registrationButton.addEventListener('click', function () {
    let templateCode = `
        <button class="exitGameButton" id="exitGameButton">Выйти</button>
    `
    let template = Handlebars.compile(templateCode);
    let head = document.querySelector('#header');
    head.innerHTML = '';
    head.innerHTML = template()
    register()
})