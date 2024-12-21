exitButton.addEventListener('click', function () {
    let xhr2 = new XMLHttpRequest();
    xhr2.open('GET', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=30fcc2b1e9f760390bd12570386d21e9', true);
    xhr2.send();
    xhr2.addEventListener('readystatechange', function () {
        if (xhr2.readyState == 4 && xhr2.status == 200) {
            let usersArr = JSON.parse(xhr2.responseText)
            let flag1 = true
            for (let i in usersArr) {
                if (usersArr[i].login == localStorage.getItem('login')) {
                    usersArr[i].entered = 0
                    let xhrSender2 = new XMLHttpRequest();
                    xhrSender2.open('PUT', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=30fcc2b1e9f760390bd12570386d21e9', true)
                    xhrSender2.setRequestHeader("Content-type", "application/json");
                    xhrSender2.send(JSON.stringify(usersArr));
                    xhrSender2.addEventListener('readystatechange', function () {
                        if (xhrSender2.readyState == 4) {
                            if (xhrSender2.status == 200) {
                                localStorage.clear()
                                localStorage.setItem('entered', 0)
                                window.location.href="../auth/enter.html"
                            }
                        }
                    })
                }
            }
        }
    })
})