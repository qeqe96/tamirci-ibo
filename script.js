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
        { rootMargin: "0px 0px -8% 0px", threshold: 0.04 }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
}

const typewriterElement = document.querySelector("[data-typewriter]");

if (typewriterElement && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const typewriterText = typewriterElement.dataset.typewriter || typewriterElement.textContent;
    typewriterElement.textContent = "";
    typewriterElement.classList.add("is-typing");

    [...typewriterText].forEach((character, index) => {
        window.setTimeout(() => {
            typewriterElement.textContent += character;

            if (index === typewriterText.length - 1) {
                window.setTimeout(() => typewriterElement.classList.remove("is-typing"), 650);
            }
        }, 70 * index + 280);
    });
}

const bubbleArea = document.querySelector("[data-bubbles]");

if (bubbleArea && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const bubbleLabels = ["Akü", "Triger", "Oto Cam", "Kapı Kilidi", "Dinamo", "Kriko", "Antifriz", "Yol Yardım"];
    let labelIndex = Math.floor(Math.random() * bubbleLabels.length);

    const randomBetween = (min, max) => Math.random() * (max - min) + min;

    const pickLabel = () => {
        const label = bubbleLabels[labelIndex % bubbleLabels.length];
        labelIndex += Math.floor(Math.random() * 3) + 1;
        return label;
    };

    const createBubble = () => {
        const activeBubbles = bubbleArea.querySelectorAll(".service-bubble");

        if (activeBubbles.length >= 4) {
            return;
        }

        const bubble = document.createElement("span");
        const size = Math.round(randomBetween(54, 92));
        const drift = Math.round(randomBetween(-46, 46));
        const rotate = Math.round(randomBetween(-10, 10));
        const duration = randomBetween(4.2, 5.8).toFixed(2);

        bubble.className = "service-bubble";
        bubble.textContent = pickLabel();
        bubble.style.setProperty("--bubble-left", `${randomBetween(4, 96).toFixed(1)}%`);
        bubble.style.setProperty("--bubble-top", `${randomBetween(58, 96).toFixed(1)}%`);
        bubble.style.setProperty("--bubble-size", `${size}px`);
        bubble.style.setProperty("--bubble-drift", `${drift}px`);
        bubble.style.setProperty("--bubble-duration", `${duration}s`);
        bubble.style.setProperty("--bubble-rotate", `${rotate}deg`);

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
    }, 720);
}
