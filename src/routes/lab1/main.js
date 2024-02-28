// чистый js, то что поидее надо было делать по заданию
addEventListener("DOMContentLoaded", (event) => {
    console.log('DOM Загрузились!')

    if (sessionStorage.getItem("usr_login") !== null) {
        let login_field = document.getElementById("login_field") 
        let psw_field = document.getElementById("psw_field")
        let check_box = document.getElementById("remember_me_checkbox")

        console.log(sessionStorage.getItem("usr_login"), sessionStorage.getItem("usr_psw"))

        login_field.value = sessionStorage.getItem("usr_login")
        psw_field.value = sessionStorage.getItem("usr_psw")
        check_box.checked = true
    }

    let cnt = 0

    hello_btn = document.getElementById('hello_btn')
    cnt_out = document.getElementById('couter')
    hello_btn.addEventListener('click', function(e) {
        cnt += 1
        cnt_out.textContent = cnt
    })

    login_form = document.getElementById('login_form')

    login_form.addEventListener('submit', function(e) {
        e.preventDefault()
        let formData = new FormData(e.target)
        console.log("Try submit!")

        let pairs = Array.from(formData.entries())

        usr_login = pairs[0][1]
        usr_psw = pairs[1][1]
        remember_me = false
        if (pairs.length > 2) {
            remember_me = pairs[2][1]
        }
        if (usr_login === 'admin' && usr_psw === 'admin') {
            alert("Успех!")
            if(remember_me) {
                sessionStorage.setItem("usr_login", usr_login);
                sessionStorage.setItem("usr_psw", usr_psw)
            }
        } else {
            alert("Попробуйте снова!")
        }
    })

    document.getElementById('reset_form_btn').addEventListener('click', function(e){
        sessionStorage.clear()
        login_form.reset()
    })
});