import { getUsers } from "./account.js"
import data from "./data.js"
import { toThousand } from "./extensions.js"

window.addEventListener("load", async () => {
    const main = document.querySelector("#cart > div")
    const uid = localStorage.getItem("uid")
    let html = ""
    if (uid) {
        html = `<div class="grid cart-template">
        <div class="fade-background radius-3 text-center py-3 fz13">
            Tên
        </div>
        <div class="fade-background radius-3 text-center py-3 fz13">
            Giá
        </div>
        <div class="fade-background radius-3 text-center py-3 fz13">
            Số lượng
        </div>
    </div>
    <div class="cart__list">
        ${await renderCart(uid)}
    </div>
    <div class="grid cart-template mt-4 mb-5">
        <div
            class="fade-background d-flex align-items-center justify-content-center radius-3 text-center py-3 fz13">
            Tổng:
        </div>
        <div
            class="fade-background d-flex align-items-center justify-content-center radius-3 text-center py-3 fz13">
            1000,000VND
        </div>
        <button class="radius-3 text-center py-3 fz13 fw500 bg-primary-mine fff">
            Thanh toán
        </button>
    </div>`
    } else {
        html = renderError()
    }
    main.innerHTML = html
})

// ============================= METHOD =============================
const renderError = () => {
    return `<div class="d-flex flex-column align-items-center py-5">
    <img src="https://www.pinclipart.com/picdir/big/383-3836579_designing-and-building-websites-set-web-page-design.png"
        alt="" class="w-50">
    <a href="./account.html" class="fz2 fw-500 mt-5 bg-primary-mine fff px-5 py-3"
        style="border-radius: 50px; transition: .2s;">Vui lòng
        đăng nhập</a>
</div>`
}

const renderCart = async uid => {
    const dataUser = await getUsers(uid)
    const keys = dataUser.products
        .reduce((a, b) => {
            if (a[b]) {
                a[b]++
            } else {
                a[b] = 1
            }
            return a
        }, {})
    const products = []
    for (const key in keys) {
        const curr = data.product[key]
        products.push({
            name: curr.name,
            price: curr.price,
            quantity: keys[key]
        })
    }
    const html = products.map(a => `<div class="grid height-60 cart-template">
    <div class="shadow-cart d-flex flex-column justify-content-center px-5 radius-3 py-3 fz13">
        <p class="limit-text-1 fz13 m-0">
            ${a.name}
        </p>
        <span class="fz2 min-content" style="background: linear-gradient(90deg, rgb(255, 208, 0) 50%, #999 50%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;">★★★★★</span>
    </div>
    <div class="shadow-cart d-flex align-items-center justify-content-center radius-3 py-3 fz13">
        ${toThousand(a.price)}VNĐ
    </div>
    <div class="shadow-cart d-flex align-items-center justify-content-center radius-3 py-3 fz13">
        <span class="me-3">${a.quantity}</span>
        <button class="me-2 px-3 radius-3 fw-500 py-1">
            <i class="fa-solid fa-minus"></i>
        </button>
        <button class="px-3 radius-3 fw-500 py-1 bg-primary-mine">
            <i class="fa-solid fa-plus"></i>
        </button>
    </div>
</div>`).join("")
    return html
}