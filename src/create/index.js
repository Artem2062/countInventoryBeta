toMain.addEventListener('click', function () {
    window.location.href = "../main/main.html"
})
createNewItem.addEventListener('click', function () {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=0f429c12c8f75592d3a7077ee70e9b0e', true);
    xhr.send();
    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let usersArr = JSON.parse(xhr.responseText)
            let newItem={
                url:'',
                name:'',
                condition:'',
                count:'',
                id:1
            }
            newItem.url=image.value
            newItem.name=nam.value
            newItem.condition=condition.value
            newItem.count=count.value
            if(usersArr.length!=0){
                newItem.id=usersArr[usersArr.length-1].id+1
            }
            usersArr.push(newItem)
            let xhrSender = new XMLHttpRequest();
            xhrSender.open('PUT', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=0f429c12c8f75592d3a7077ee70e9b0e', true)
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
        }
    })
})
