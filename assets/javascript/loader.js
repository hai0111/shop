export default () => {
    const load = document.querySelector(".modal__load")
    window.addEventListener("load", () => {
        load.classList.add("hidden")
    })
}