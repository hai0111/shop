import data from "./data.js";
import { toThousand } from "./extensions.js";

const renerHightlight = (() => {
    const highLightBox = document.querySelector("#highlight__products > div")
    const jsx = [...data.product]
        .sort((a, b) => b.bought - a.bought)
        .slice(0, 5)
        .map(a => `<a href="./detail.html?${data.product.indexOf(a)}" class="txt-main position-relative hover hover-shadow-fade radius-10 mb-5 box-shadow hover__introduce index-1">
        ${a.tag && a.tag !== "" ? '<span class="product__tag px-3 index-1">' + a.tag + '</span>' : ""}
        <img src="${a.img}"
            alt="member1" class="w-100 radius-10 obj-fit-cover" height="300">
        <div
            class="bg-eee radius-10 hover-active-opacity p-4 position-absolute inset-0 d-flex flex-column justify-content-center">
            <p class="fz-2d5r fw-600 limit-text-2">${a.name}</p>
            <p class="fz-2r">${toThousand(a.price)}VNĐ</p>
            <span class="product__rate mt-2 fz-2d5r width-min" style="background: linear-gradient(90deg, rgb(255, 208, 0) ${a.rating / 5 * 100}%, #999 ${a.rating / 5 * 100}%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;">★★★★★</span>
            <p class="mt-2 fz-1d3r">Đã mua: ${a.bought}</p>
            <p class="fz-1d3r mt-3">
                ${a.origin}
            </p>
        </div>
    </a>`)
        .join("")
    highLightBox.innerHTML = jsx
})()

const renerSale = (() => {
    const highLightBox = document.querySelector("#sale__products > div")
    const jsx = [...data.product]
        .filter(a => a.sale !== undefined && a.sale !== "")
        .slice(0, 5)
        .map(a => `<a href="./detail.html?${data.product.indexOf(a)}"
        class="txt-main position-relative hover hover-shadow-fade radius-10 mb-5 box-shadow hover__introduce index-1">
        <span class="product__tag px-3 index-1">hot</span>
        <div class="position-absolute top-0 end-0 index-1" style="width: 40px;">
            <img src="./assets/images/sale__tag.png" alt="" class="obj-fit-cover w-100 shadow-eee">
            <span class="position-absolute top-50 start-50 translate-middle fw-600 txt-fff">${a.sale}%</span>
        </div>
        <img src="${a.img}"
            alt="member1" class="w-100 radius-10 obj-fit-cover" height="300">
        <div
            class="bg-eee radius-10 hover-active-opacity p-4 position-absolute inset-0 d-flex flex-column justify-content-center">
            <p class="fz-2d5r fw-600 limit-text-2 mb-3">${a.name}</p>
            <p class="fz-2r line-though mb-0">${toThousand(a.price)}VNĐ</p>
            <p class="fz-2r mb-0">${toThousand(a.price * (1 - a.sale / 100))}VNĐ</p>
            <span class="product__rate fz-2d5r width-min" style="background: linear-gradient(90deg, rgb(255, 208, 0) ${a.rating / 5 * 100}%, #999 ${a.rating / 5 * 100}%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;">★★★★★</span>
            <p class="fz-1d3r">Đã mua: ${a.bought}</p>
            <p class="fz-1d3r">
                ${a.origin}
            </p>
        </div>
    </a>`)
        .join("")
    highLightBox.innerHTML = jsx
})()

const handleHover = (() => {
    const saleItems = document.querySelectorAll("#sale__products > div > a")
    saleItems.forEach(a => {
        a.addEventListener("mouseenter", e => {
            const tag = e.target.querySelector(".position-absolute.top-0.end-0.index-1")
            tag.animate([
                {
                    transform: "rotate(20deg)",
                    transformOrigin: "top center",
                },
                {
                    transform: "rotate(-20deg)",
                    transformOrigin: "top center",
                },
                {
                    transform: "rotate(20deg)",
                    transformOrigin: "top center",
                },
                {
                    transform: "rotate(-20deg)",
                    transformOrigin: "top center",
                },
                {
                    transform: "rotate(20deg)",
                    transformOrigin: "top center",
                },
                {
                    transform: "rotate(-20deg)",
                    transformOrigin: "top center",
                },
                {
                    transform: "rotateY(0)",
                    transformOrigin: "top center",
                }
            ], {
                easing: "ease-in-out",
                duration: 2000,
            })
        })
    })
})()