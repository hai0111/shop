import data from "./data.js"
import { toSlug, toThousand } from './extensions.js'

const renderCate = () => {
    const cates = document.querySelector(".cates")
    const html = [...new Set(data.product.map(a => a.cate))]
        .map(a => `<div class="cate py-3 ps-3" data-cate="${a}"><i class="fa-solid fa-check me-4"></i>${a}</div>`).join("")
    cates.innerHTML = `
    <div class="cate active py-3 ps-3" data-cate=""><i class="fa-solid fa-check me-4"></i>Tất cả</div> 
    ${html}`
};

const handleSort = (a) => {
    switch (a) {
        case "Z - A":
            return [...data.product].sort((b, c) => {
                const b1 = toSlug(b.name[0])
                const c1 = toSlug(c.name[0])
                return b1 > c1 ? -1 : b1 === c1 ? 0 : 1
            })
        case "Giá tăng":
            return [...data.product].sort((b, c) => {
                const b1 = b.price
                const c1 = c.price
                return b1 > c1 ? 1 : b1 === c1 ? 0 : -1
            })
        case "Giá giảm":
            return [...data.product].sort((b, c) => {
                const b1 = b.price
                const c1 = c.price
                return b1 > c1 ? -1 : b1 === c1 ? 0 : 1
            })
        case "Phổ biến":
            return [...data.product].sort((b, c) => {
                const b1 = b.bought
                const c1 = c.bought
                return b1 > c1 ? -1 : b1 === c1 ? 0 : 1
            })
        default:
            return [...data.product].sort((b, c) => {
                const b1 = toSlug(b.name[0])
                const c1 = toSlug(c.name[0])
                return b1 > c1 ? 1 : b1 === c1 ? 0 : -1
            })
    }
}

const renderProfucts = (z, x = "", v = "", p = "price1") => {
    const products = document.querySelector(".shop__products")
    const html = handleSort(z)
        .filter(a => x !== "" ? a.cate === x : true)
        .filter(a => toSlug(a.name).includes(toSlug(v)))
        .filter(a => {
            switch (p) {
                case "price2":
                    return a.price <= 200000
                case "price3":
                    return a.price >= 200000 && a.price <= 500000
                case "price4":
                    return a.price >= 500000
                default:
                    return true
            }
        })
        .map(a =>
            `<div class="product">
    <a href="/detail.html?${data.product.indexOf(a)}" class="w-100 d-block product__img" style="background-image: url('${a.img}')">
        ${a.tag && a.tag !== "" ? '<span class="product__tag px-3">' + a.tag + '</span>' : ""}
    </a >
    <div class="product__info p-4">
        <p class="product__name">
            ${a.name}
        </p>
        <p class="product__price m-0">
            ${toThousand(a.price)}VNĐ
        </p>
        <span
            class="product__rate mt-5"
            style="background: linear-gradient(90deg, rgb(255, 208, 0) ${a.rating / 5 * 100}%, #999 ${a.rating / 5 * 100}%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;">★★★★★</span>
        <p class="product__bought">Đã mua: ${a.bought}</p>
        <p class="product__origin my-4">
            ${a.origin}
        </p>
        <button class="product__add py-3 w-100" data-id="${a.id}">
            Thêm vào giỏ hàng
        </button></div>
    </div > `).join("")
    products.innerHTML = html
};

const handleFilter = () => {
    const options = document.querySelector(".sort__options")
    const cates = document.querySelectorAll(".cate")
    const searchInput = document.querySelector(".filter__input")
    const priceInputs = document.querySelectorAll('input[name="price"]')
    let cate
    let price
    options.addEventListener("change", e => {
        renderProfucts(e.target.value, cate, searchInput.value, price)
    })
    cates.forEach(a => a.addEventListener("click", e => {
        cate = e.target.dataset.cate
        renderProfucts(options.value, cate, searchInput.value, price)
        document.querySelector(".active.cate").classList.remove("active")
        e.target.classList.add("active")
    }))
    searchInput.addEventListener("input", e => {
        renderProfucts(options.value, cate, e.target.value, price)
    })
    priceInputs.forEach(a => {
        a.addEventListener("change", e => {
            price = e.target.id
            renderProfucts(options.value, cate, searchInput.value, price)
        })
    })
}

const search = () => {
    const searchList = document.querySelector(".search__list")
    const html = data.product.map((a, i) => `<a href="/detail.html?${i}" data-search="${toSlug(a.name)}" class="search__item d-block p-3">
    ${a.name}
</a>`).join("")
    searchList.innerHTML = html
    const searchInput = document.querySelector(".search__input")
    const searchBtn = document.querySelector(".search__btn")
    const items = document.querySelectorAll(`.search__item`)
    let id
    const handleFocus = id => {
        const actives = document.querySelectorAll(".search__item.active")
        const currActive = document.querySelector(".search__item.focus")
        if (currActive) currActive.classList.remove("focus")
        if (actives.length > 0) {
            actives[id].classList.add("focus")
            return actives[id]
        }
    }
    searchInput.addEventListener("input", e => {
        id = 0
        const key = toSlug(e.target.value)
        if (key.length > 0) {
            items.forEach(a => {
                const check = a.dataset.search.includes(key)
                a.classList.toggle("active", check)
            })
            handleFocus(id)
        } else {
            items.forEach(a => {
                a.classList.remove("active")
            })
        }
    })
    items.forEach(a => {
        a.addEventListener("click", () => {
            searchInput.value = ""
        })
    })
    searchInput.addEventListener("keypress", e => {
        if (e.keyCode === 13) {
            const item = document.querySelector(".search__item.active")
            if (item) {
                item.click()
            }
        }
    })
    searchInput.addEventListener("keydown", e => {
        switch (e.keyCode) {
            case 40:
                console.log("down")
                break
        }
    })
    searchBtn.addEventListener("click", () => {
        const item = document.querySelector(".search__item.active")
        if (item) {
            item.click()
        }
    })
}

(() => {
    renderCate()
    handleSort()
    renderProfucts()
    handleFilter()
    search()
})()