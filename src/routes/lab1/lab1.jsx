import React, { useState, useEffect } from 'react';
import './lab1.css';

function lab1() {
  // кнопка и форма в одном месте, ну так уж получилось
  const [count, setCounter] = useState(0) // счетчик
  

  const [login, setLogin] = useState("") // логин
  const [password, setPassword] = useState("") // пароль
  const [remember_me, setRememberMe] = useState(false) // запомнить меня

  function increase_counter() {
    setCounter(count => count + 1)
  }

  useEffect(() => {
    if (sessionStorage.getItem("remember_me")) {
      setLogin(sessionStorage.getItem('usr_login'));
      setPassword(sessionStorage.getItem('usr_psw'));
      setRememberMe(true);
    }
  })

  function form_submit(e) {
    e.preventDefault()
    console.log(remember_me)
    console.log("Try submit!")

    if (login === 'admin' && password === 'admin') {
        alert("Успех!")
        if(remember_me) {
            sessionStorage.setItem("usr_login", login);
            sessionStorage.setItem("usr_psw", password);
            sessionStorage.setItem("remember_me", true);
        }
    } else {
        alert("Попробуйте снова!")
    }
  }

  function form_reset(e) {
    e.preventDefault()
    setLogin("")
    setPassword("")
    setRememberMe(false)
    sessionStorage.clear()
  }

  return (
        <div>
            <h1>Лабораторная работа №1</h1>
            <h2>Якимов Борис Борисович</h2>
            <button id="hello_btn" onClick={increase_counter}>Нажми меня!</button>
            <p>Нажата раз:<span id="couter">{count}</span></p>
            <hr></hr>
            <form id="login_form" onSubmit={form_submit}>
              <div>
                <label htmlFor="login">Логин: </label>
                <input type="text" name="login" value={login} onChange={(e) => setLogin(e.target.value)} id="login_field" />
              </div>
              <div>
                <label htmlFor="login" >Пароль: </label>
                <input type="password" name="psw" value={password} onChange={(e) => setPassword(e.target.value)} id="psw_field" />
              </div>
              <div>
                <label>Запомнить меня</label>
                <input type="checkbox" id="remember_me_checkbox" name="remember_me" onChange={(e) => setRememberMe(e.target.value)} />
              </div>
              <button type="submit" id="auth_form_sent">Авторизироваться!</button>
              <button type="reset" id="reset_form_btn" onClick={form_reset}>Очистить форму</button>
            </form>
        </div>
    )
  }

export default lab1