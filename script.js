const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.16 }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
}

const bubbleArea = document.querySelector("[data-bubbles]");

if (bubbleArea && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const bubbleLabels = ["Akü", "Triger", "Oto Cam", "Kapı Kilidi", "Dinamo", "Kriko", "Antifriz"];
    const safeZones = [
        { minLeft: 4, maxLeft: 24, minTop: 66, maxTop: 86 },
        { minLeft: 76, maxLeft: 96, minTop: 66, maxTop: 86 },
        { minLeft: 22, maxLeft: 78, minTop: 78, maxTop: 92 }
    ];
    let labelIndex = Math.floor(Math.random() * bubbleLabels.length);

    const randomBetween = (min, max) => Math.random() * (max - min) + min;

    const pickLabel = () => {
        const label = bubbleLabels[labelIndex % bubbleLabels.length];
        labelIndex += Math.floor(Math.random() * 3) + 1;
        return label;
    };

    const createBubble = () => {
        const activeBubbles = bubbleArea.querySelectorAll(".service-bubble");

        if (activeBubbles.length >= 2) {
            return;
        }

        const zone = safeZones[Math.floor(Math.random() * safeZones.length)];
        const bubble = document.createElement("span");
        const size = Math.round(randomBetween(56, 82));
        const drift = Math.round(randomBetween(-24, 24));
        const duration = randomBetween(2.6, 3.4).toFixed(2);

        bubble.className = "service-bubble";
        bubble.textContent = pickLabel();
        bubble.style.setProperty("--bubble-left", `${randomBetween(zone.minLeft, zone.maxLeft).toFixed(1)}%`);
        bubble.style.setProperty("--bubble-top", `${randomBetween(zone.minTop, zone.maxTop).toFixed(1)}%`);
        bubble.style.setProperty("--bubble-size", `${size}px`);
        bubble.style.setProperty("--bubble-drift", `${drift}px`);
        bubble.style.setProperty("--bubble-duration", `${duration}s`);

        bubbleArea.appendChild(bubble);
        bubble.addEventListener("animationend", () => bubble.remove(), { once: true });
    };

    bubbleArea.replaceChildren();
    createBubble();
    window.setInterval(() => {
        createBubble();

        if (Math.random() > 0.68) {
            window.setTimeout(createBubble, 320);
        }
    }, 1150);
}
