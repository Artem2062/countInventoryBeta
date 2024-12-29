'use strict'
localStorage.setItem('swaped', 0)
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
        } if (login.value.includes(" ")) {
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

function enter() {
    let xhr2 = new XMLHttpRequest();
    xhr2.open('GET', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=30fcc2b1e9f760390bd12570386d21e9', true);
    xhr2.send();
    xhr2.addEventListener('readystatechange', function () {
        if (xhr2.readyState == 4 && xhr2.status == 200) {
            let usersArr = JSON.parse(xhr2.responseText)
            let flag1 = true
            for (let i in usersArr) {
                if (usersArr[i].login == loginEnter.value && usersArr[i].password != passwordEnter.value) {
                    flag1 = false
                    alert("Неверный пароль")
                    break
                }
                if (usersArr[i].login == loginEnter.value && usersArr[i].password == passwordEnter.value) {
                    if (usersArr[i].entered == 0) {
                        usersArr[i].entered = 1
                        let xhrSender2 = new XMLHttpRequest();
                        xhrSender2.open('PUT', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=30fcc2b1e9f760390bd12570386d21e9', true)
                        xhrSender2.setRequestHeader("Content-type", "application/json");
                        xhrSender2.send(JSON.stringify(usersArr));
                        xhrSender2.addEventListener('readystatechange', function () {
                            if (xhrSender2.readyState == 4) {
                                if (xhrSender2.status == 200) {
                                    flag1 = false
                                    localStorage.setItem('status', usersArr[i].status)
                                    localStorage.setItem('entered', 1)
                                    localStorage.setItem('login', usersArr[i].login)
                                    window.location.href = "../main/main.html"
                                }
                            }
                        })
                        break
                    }
                    if (usersArr[i].entered == 1) {
                        flag1 = false
                        alert("В аккаунт уже зашли")
                    }
                }
            }
            setTimeout(function () {
                if (flag1 == true) {
                    alert("Такого аккаунта не существует")
                }
            }, 800)
        }
    })
}
if (document.title == "Регистрация") {
    registrationButton.addEventListener('click', function () { register() })
    changeButton.addEventListener('click', function () {
        window.location.href = "enter.html"
    })
}
if (document.title == "Вход") {
    enterButton.addEventListener('click', function () { enter() })
    changeButton2.addEventListener('click', function () {
        window.location.href = "registration.html"
    })
}
