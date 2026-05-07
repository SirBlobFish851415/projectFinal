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

function placeIconsRandomly() {
    const icons = document.querySelectorAll('.icon');

    const rows = 3;
    const cols = 8;
    const safeZoneHeight = 200;
    const iconSize = 125;

    const sideSafeZone = 100;

    const slots = [];

    const gridWidth = cols * iconSize;

    const availableWidth = window.innerWidth - sideSafeZone * 2;

    const centerOffset = sideSafeZone + (availableWidth - gridWidth) / 2;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const x = centerOffset + c * iconSize;
            const y = safeZoneHeight + r * iconSize;
            slots.push({ x, y });
        }
    }

    for (let i = slots.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [slots[i], slots[j]] = [slots[j], slots[i]];
    }

    icons.forEach((icon, index) => {
        if (slots[index]) {
            icon.style.left = slots[index].x + "px";
            icon.style.top = slots[index].y + "px";
        }
    });
}

window.onload = placeIconsRandomly;
