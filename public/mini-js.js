window.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("scroll", showArrowUp);

    function showArrowUp() {
        const elementArrow = document.querySelector("button.button-up");
        if(window.scrollY > 400) {
            if(elementArrow)
                elementArrow.style.display = "block";
        } else {
            if(elementArrow)
                elementArrow.style.display = "";
        }
    }
})