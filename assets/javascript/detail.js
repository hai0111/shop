import { getUsers } from "./account.js";
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
    const btnAdd = document.querySelector(".product__add.py-3.w-100")
    btnAdd.addEventListener("click", async () => {
        await addProduct(id)
    })
}

const addProduct = async data => {
    const uid = localStorage.getItem("uid")
    if (uid) {
        const thanks = document.querySelector("#thanksForBuy")
        thanks.style.display = "block"
        setTimeout(() => {
            thanks.style.display = "none"
        }, 2000)
        const userData = await getUsers(uid)
        await fetch("https://627639a1bc9e46be1a1462ea.mockapi.io/shop/users/" + uid,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    products: [
                        ...userData.products,
                        data
                    ]
                })
            })
    } else {
        window.location = "./account.html"
    }
}



    ; (() => {
        renderDetail()
    })()