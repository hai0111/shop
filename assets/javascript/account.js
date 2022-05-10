import { checkInput } from "./extensions.js"

const boxContent = document.querySelector(".form__user")
const renderUser = async () => {
    const name = await getUsers(window.localStorage.getItem("uid")).then(data => data.name)
    boxContent.innerHTML =
        `
        <p class="greeting my-0">
        Chào mừng
        </p>
        <p class="user__name mb-5">
            ${name}
        </p >
    <a href="#" class="to__cart d-block px-5 py-3">Tới giỏ hàng</a>
    <a href="#login" class="mt-5" id="logout" style="font-size: 1.5rem">Đăng xuất</a>
`
    const logout = document.querySelector("#logout")
    logout.addEventListener("click", () => {
        localStorage.removeItem("uid")
    })
}
const renderLogin = () => {
    boxContent.innerHTML =
        `<p class="form__title text-center mb-5" >
    Đăng nhập
        </p >
        <div class="input__wrap d-flex w-100 align-items-center mt-4">
            <label class="col-4 pe-3 text-end form__label" for="user__login">Tài khoản: </label>
            <input type="text" class="form__input py-2 px-3 col" id="user__login">
        </div>
        <div class="input__wrap d-flex w-100 align-items-center mt-4">
            <label class="col-4 pe-3 text-end form__label" for="pass__login">Mật khẩu: </label>
            <input type="password" class="form__input py-2 px-3 col" id="pass__login">
        </div>
        <div class="input__wrap d-flex w-100 align-items-center">
            <button class="mx-auto form__btn login px-5 py-3 mt-5">Đăng nhập</button>
        </div>
        <a href="#register" class="text-end mt-5">Bạn chưa có tài khoản?Đăng ký ngay.</a>`
    const loginBtn = document.querySelector(".form__btn.login")
    const userInput = document.querySelector("#user__login")
    const passInput = document.querySelector("#pass__login")
    loginBtn.addEventListener("click", e => {
        e.preventDefault()
        handleLogin(userInput.value, passInput.value)
    })
    passInput.addEventListener("keypress", e => {
        if (e.keyCode === 13) {
            handleLogin(userInput.value, passInput.value)
        }
    })
}

const handleLogin = async (user, pass) => {
    const data = await getUsers().then(data => data)
    const main = data.find(a => a.user === user && a.pass === pass)
    if (main) {
        localStorage.setItem("uid", main?.id)
    }
    checkUser()
}

const renderRegister = () => {
    boxContent.innerHTML =
        `<p class="form__title text-center mb-5" >
    Đăng ký
        </p >
        <div class="input__wrap d-flex w-100 align-items-center mt-4 flex-wrap">
            <label class="col-4 pe-3 text-end form__label" for="name__register">Tên đầy đủ: </label>
            <input type="text" class="form__input py-2 px-3 col-8" id="name__register">
            <div class="col-4"></div>
            <p class="toast__error col m-0 mt-1" style="color: red; font-size: 1.3rem"></p>
        </div>
        <div class="input__wrap d-flex w-100 align-items-center mt-4 flex-wrap">
            <label class="col-4 pe-3 text-end form__label" for="user__register">Tài khoản: </label>
            <input type="text" class="form__input check py-2 px-3 col" id="user__register">
           <div class="col-4"></div>
            <p class="toast__error col m-0 mt-1" style="color: red; font-size: 1.3rem"></p>
        </div>
        <div class="input__wrap d-flex w-100 align-items-center mt-4 flex-wrap">
            <label class="col-4 pe-3 text-end form__label" for="pass__register">Mật khẩu: </label>
            <input type="password" class="form__input check py-2 px-3 col" id="pass__register">
           <div class="col-4"></div>
            <p class="toast__error col m-0 mt-1" style="color: red; font-size: 1.3rem"></p>
        </div>
        <div class="input__wrap d-flex w-100 align-items-center">
            <button class="mx-auto form__btn register px-5 py-3 mt-5">Đăng ký</button>
        </div>
        <a href="#login" class="text-end mt-5">Bạn đã có tài khoản?</a>`
    const registerBtn = document.querySelector(".form__btn.register")
    const nameInput = document.querySelector("#name__register")
    const userInput = document.querySelector("#user__register")
    const passInput = document.querySelector("#pass__register")
    const handleRegister = async () => {
        const inputs = document.querySelectorAll(".form__input.check")
        let check = true
        inputs.forEach(a => {
            if (!checkInput(a, a.value, ".toast__error")) {
                check = false
            }
        })
        const data = await getUsers()
        const duplicate = data.every(a => a.user !== userInput.value)
        if (!duplicate) {
            userInput.parentElement.querySelector(".toast__error").innerText = "*Tài khoản đã tồn tại"
        }
        const checkName = nameInput.value.trim() !== ""
        if (!checkName) {
            nameInput.parentElement.querySelector(".toast__error").innerText = "*Vui lòng điền tên"
        }
        if (check && duplicate && checkName) {
            const data = {
                name: nameInput.value,
                user: userInput.value,
                pass: passInput.value
            }
            postUser(data)
            nameInput.value = ""
            userInput.value = ""
            passInput.value = ""
            window.location.hash = "#login"
        }
    }
    registerBtn.addEventListener("click", handleRegister)
    nameInput.addEventListener("keypress", e => {
        if (e.keyCode === 13) {
            handleRegister()
        }
    })
    userInput.addEventListener("keypress", e => {
        if (e.keyCode === 13) {
            handleRegister()
        }
    })
    passInput.addEventListener("keypress", e => {
        if (e.keyCode === 13) {
            handleRegister()
        }
    })
}

const renderError = () => {
    boxContent.innerHTML = `
    <img src="https://www.iconpacks.net/icons/2/free-sad-face-icon-2691-thumb.png" style="width: 50px" alt="" >
        <h3 class="mt-5">Có lỗi xảy ra! Vui lòng tải lại trang</h3>
`
}

const checkHash = () => {
    if (boxContent) {
        const hash = window.location.hash
        switch (hash) {
            case "#login":
                renderLogin()
                break
            case "#" + localStorage.getItem("uid"):
                renderUser()
                break
            case "#register":
                renderRegister()
                break
            default:
                renderError()
        }
    }
}

const checkUser = () => {
    const uid = localStorage.getItem("uid")
    if (uid) {
        window.location.hash = uid
    } else {
        window.location.hash = "login"
    }
    checkHash()
}

window.addEventListener("load", checkUser)

window.addEventListener("popstate", checkHash)


// ========================= HANDLE API =========================
export const getUsers = async (id = "") => {
    return fetch("https://627639a1bc9e46be1a1462ea.mockapi.io/shop/users/" + id).then(json => json.json())
}

const postUser = async (data) => {
    await fetch("https://627639a1bc9e46be1a1462ea.mockapi.io/shop/users", {
        method: 'POST',
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...data,
            products: [

            ],
        })
    })
}