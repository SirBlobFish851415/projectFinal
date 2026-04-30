let holdTimer;
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");

document.querySelectorAll(".interactive").forEach(item => {
    item.addEventListener("mousedown", () => {
        holdTimer = setTimeout(() => {
            popupText.textContent = item.dataset.info;
            popup.classList.remove("hidden");
        }, 3000); 
    });

    item.addEventListener("mouseup", () => clearTimeout(holdTimer));
    item.addEventListener("mouseleave", () => clearTimeout(holdTimer));
});

popup.addEventListener("click", () => {
    popup.classList.add("hidden");
});
