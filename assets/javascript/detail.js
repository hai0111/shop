import data from "./data.js";
import { toThousand } from "./extensions.js";

const renderDetail = () => {
    const id = window.location.search.replace("?", "")
    const currData = data.product[+id]
    document.querySelector(".detail__img").src = currData.img
    document.querySelector(".detail__name").textContent = currData.name
    document.querySelector("#detail__rate").outerHTML = `
    <span id="detail__rate" class="product__rate" style="background: linear-gradient(90deg, #ffd000 ${currData.rating / 5 * 100}%, #999 ${currData.rating / 5 * 100}%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;">★★★★★</span>
    `
    document.querySelector("#detail__price").textContent = toThousand(currData.price) + "VNĐ"
    document.querySelector("#detail__origin").textContent = currData.origin
}



    ; (() => {
        renderDetail()
    })()