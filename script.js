document.querySelectorAll('.icon').forEach((icon, index) => {
    let holdTimer;

    icon.addEventListener('mousedown', () => {
        holdTimer = setTimeout(() => {

            const info = icon.getAttribute("data-info");
            document.getElementById("popup-text").textContent = info;
            document.getElementById("popup").classList.remove("hidden");

            explodeIcon(icon);

        }, 3000);
    });

    icon.addEventListener('mouseup', () => clearTimeout(holdTimer));
    icon.addEventListener('mouseleave', () => clearTimeout(holdTimer));
});

function explodeIcon(icon) {
    const rect = icon.getBoundingClientRect();

    const container = document.createElement("div");
    container.classList.add("explosion-container");
    container.style.left = rect.left + "px";
    container.style.top = rect.top + "px";
    document.body.appendChild(container);

    const smoke = document.createElement("div");
    smoke.classList.add("smoke");
    smoke.style.left = "55px";
    smoke.style.top = "55px";
    container.appendChild(smoke);

    for (let i = 0; i < 12; i++) {
        const p = document.createElement("div");
        p.classList.add("particle");

        const dx = (Math.random() - 0.5) * 200 + "px";
        const dy = (Math.random() - 0.5) * 200 + "px";

        p.style.setProperty("--dx", dx);
        p.style.setProperty("--dy", dy);

        p.style.left = "70px";
        p.style.top = "70px";

        container.appendChild(p);
    }

    icon.style.opacity = "0";
    icon.style.pointerEvents = "none";

    setTimeout(() => {
        icon.style.display = "none";
        container.remove();
    }, 800);
}


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
