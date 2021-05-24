class UserService {
    //  var username;
    //  var password; Лишние переменные, как и геттеры для username и password.

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    // get username() {
    //     return UserService.username;
    // }
    // get password() {
    //     throw "You are not allowed to get password"
    // }

    authenticate_user() { //Так как метод был статичен, могу добраться до него только внутри класса. Сделал обычным методом класса, получил возможность
        //использовать с экземпляром класса.
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://examples.com/api/user/authenticate&username=' + this.username + '$password=' + this.password, true);//UserService.username и UserService.password заменил на this.username и this.password, получил доступ к переменным экземляра класса.
        xhr.responseType = 'json';
        let result = false;
        xhr.onload = function () {
            if (xhr.status !== 200) {
                result = xhr.response
            } else {
                result = true
            }
        }
        xhr.send(); //Отправил запрос.
        return result;
    }
}

$('form #login').click(() => {
        let username = $('#username').val();//Добавил Jquery метод val() Для получений логина и пароля.
        let password = $('#password').val();
        let res = new UserService(username, password).authenticate_user();//Создал экземпляр класса.
        if (res === true) {
            document.location = '/home'
        } else {
            alert(res)
        }
    }
)
