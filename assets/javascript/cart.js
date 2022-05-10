import data from "./data.js"
import { toThousand } from "./extensions.js"

window.addEventListener("load", async () => {
    const main = document.querySelector("#cart > div")
    const uid = localStorage.getItem("uid")
    let jsx = ""
    if (uid) {
        const then = renderCart(uid)
        const { html, ids } = await then
        jsx = `<div class="grid cart-template">
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
        ${html}
    </div>
    <div class="grid cart-template mt-4 mb-5">
        <div
            class="fade-background d-flex align-items-center justify-content-center radius-3 text-center py-3 fz13">
            Tổng:
        </div>
        <div
            class="fade-background d-flex align-items-center justify-content-center radius-3 text-center py-3 fz13" id="total">
        </div>
        <button class="radius-3 text-center py-3 fz13 fw500 bg-primary-mine fff">
            Thanh toán
        </button>
    </div>`
        const calculate = () => {
            const totalElement = document.querySelector("#total")
            const items = document.querySelectorAll(".height-60.cart-template")
            if (items.length > 0) {
                let total = 0
                items.forEach(a => {
                    const price = a.querySelector(".price__cart").textContent
                    const quantity = a.querySelector(".quantity").textContent
                    total += (price.replace(/\D/g, "") * quantity)
                })
                totalElement.textContent = toThousand(total) + "VNĐ"
            } else {
                totalElement.textContent = "0 VNĐ"
            }
        }
        then.then(calculate)
            .then(() => {
                const increase = document.querySelectorAll(".increase")
                const decrease = document.querySelectorAll(".decrease")
                decrease.forEach(a => {
                    a.addEventListener("click", e => {
                        const quantity = e.target.closest(".shadow-cart").querySelector(".quantity")
                        const cartItem = quantity.closest(".height-60.cart-template")
                        const key = cartItem.dataset.id
                        ids.splice(ids.indexOf(key), 1)
                        quantity.textContent--
                        if (quantity.textContent <= 0) {
                            cartItem.remove()
                        }
                        calculate()
                        updateCart(uid, ids)
                    })
                })
                increase.forEach(a => {
                    a.addEventListener("click", e => {
                        const quantity = e.target.closest(".shadow-cart").querySelector(".quantity")
                        const cartItem = quantity.closest(".height-60.cart-template")
                        const key = cartItem.dataset.id
                        ids.push(key)
                        quantity.textContent++
                        calculate()
                        updateCart(uid, ids)
                    })
                })
            })
    } else {
        jsx = renderError()
    }
    main.innerHTML = jsx
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
    const dataUser = await fetch("https://627639a1bc9e46be1a1462ea.mockapi.io/shop/users/" + uid).then(json => json.json())
    const ids = dataUser.products
    const keys = ids
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
            id: key,
            name: curr.name,
            price: curr.price,
            quantity: keys[key]
        })
    }
    const html = products.map(a => `<div class="grid height-60 cart-template" data-id="${a.id}">
    <div class="shadow-cart d-flex flex-column justify-content-center px-5 radius-3 py-3 fz13">
        <p class="limit-text-1 fz13 m-0">
            ${a.name}
        </p>
        <span class="fz2 min-content" style="background: linear-gradient(90deg, rgb(255, 208, 0) 50%, #999 50%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;">★★★★★</span>
    </div>
    <div class="shadow-cart d-flex align-items-center justify-content-center radius-3 py-3 fz13 price__cart">
        ${toThousand(a.price)}VNĐ
    </div>
    <div class="shadow-cart d-flex align-items-center justify-content-center radius-3 py-3 fz13">
        <span class="me-3 quantity">${a.quantity}</span>
        <button class="me-2 px-3 radius-3 fw-500 py-1 decrease">
            <i class="fa-solid fa-minus"></i>
        </button>
        <button class="px-3 radius-3 fw-500 py-1 bg-primary-mine increase">
            <i class="fa-solid fa-plus"></i>
        </button>
    </div>
</div>`).join("")
    return {
        html,
        ids
    }
}

const updateCart = async (uid, data) => {
    await fetch("https://627639a1bc9e46be1a1462ea.mockapi.io/shop/users/" + uid, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            products: data
        })
    })
}