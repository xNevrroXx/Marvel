window.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("scroll", showArrowUp);

    function showArrowUp() {
        const elementArrow = document.querySelector("button.button-up");
        if(window.scrollY > 400) {
            if(elementArrow)
                elementArrow.classList.add("visible")
        } else {
            if(elementArrow)
                elementArrow.classList.remove("visible")
        }
    }
})