// js/feedback-display.js

document.addEventListener("DOMContentLoaded", function() {
    const feedbackList = document.getElementById("feedbackList");

    if (!feedbackList) return;

    let currentIndex = 0;

    // Funktion ein Feedback anzuzeigen
    function showFeedback(index) {
        const fb = feedbacks[index];
        // Clear previous
        feedbackList.innerHTML = '';

        const li = document.createElement("li");
        li.classList.add("feedback-item", "fade-in"); 
        li.innerHTML = `
            <p class="feedback-text">"${fb.text}"</p>
            <p class="feedback-author"><b>${fb.name}</b> </p>
            <p class="feedback-date">${fb.date} </p>
        `;
        feedbackList.appendChild(li);

        // Animation einblenden
        setTimeout(() => {
            li.classList.add("visible");
        }, 50);
    }

    // Funktion für nächsten Feedback
    function nextFeedback() {
        currentIndex = (currentIndex + 1) % feedbacks.length;
        const li = feedbackList.querySelector(".feedback-item");
        if (!li) return;

        // Fade-out Animation
        li.classList.remove("visible");
        li.classList.add("fade-out");

        // Nach 0,8s fade-out, nächsten Feedback einblenden
        setTimeout(() => {
            li.classList.remove("fade-out");
            showFeedback(currentIndex);
        }, 800);
    }

    // Initial anzeigen
    showFeedback(currentIndex);

    // Alle 20 Sekunden wechseln
    setInterval(nextFeedback, 20000);
});
