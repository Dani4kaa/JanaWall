document.addEventListener('DOMContentLoaded', () => {
  // ===================== EMAIL OBFSUCATION =====================
  const formEncoded = "ZGFuaVdhMTIzNEB3ZWIuZGU="; // atob -> Email
  const footerEncoded = "SmFuYVdhbGxARm90b2dyYXBoaWUuZGU="; // atob -> Email Fooster

  try {
    const decodedFormMail = atob(formEncoded);
    const decodedFooterMail = atob(footerEncoded);

    // Formular-Ziel-E-Mail setzen
    const encryptedMailInput = document.getElementById('encryptedMail');
    if (encryptedMailInput) {
      encryptedMailInput.value = decodedFormMail;
    }

    // Footer-Mail setzen
    const footerEmailAnchor = document.getElementById('footerEmail');
    if (footerEmailAnchor) {
      footerEmailAnchor.href = 'mailto:' + decodedFooterMail;
      footerEmailAnchor.textContent = decodedFooterMail;
    }
  } catch (e) {
    console.error("Fehler beim Dekodieren der E-Mail:", e);
  }

  // ===================== GALERIE DYNAMISCH =====================
  const bilder = [
    'assets/bilder/arbeit1.jpg',
    'assets/bilder/arbeit2.jpg',
    'assets/bilder/arbeit3.jpg',
    'assets/bilder/arbeit4.jpg',
    'assets/bilder/arbeit5.jpg',
    'assets/bilder/arbeit6.jpg'
  ];

  const carouselInner = document.getElementById('carouselInner');
  if (carouselInner) {
    const chunkSize = 3;
    for (let i = 0; i < bilder.length; i += chunkSize) {
      const chunk = bilder.slice(i, i + chunkSize);
      const carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item');
      if (i === 0) carouselItem.classList.add('active');

      const row = document.createElement('div');
      row.className = 'row';

      chunk.forEach(src => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        const img = document.createElement('img');
        img.src = src;
        img.alt = "Galerie Bild";
        img.className = 'gallery-img';
        col.appendChild(img);
        row.appendChild(col);
      });

      carouselItem.appendChild(row);
      carouselInner.appendChild(carouselItem);
    }
  }

  // ===================== NAVBAR ANIMATION =====================
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const standardPadding = 16;
    const maxPadding = 26;
    const minPadding = 10;
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY) {
        let newPadding = standardPadding + (currentScroll / 20);
        if (newPadding > maxPadding) newPadding = maxPadding;
        navbar.style.padding = newPadding + "px 0";
      } else {
        let newPadding = standardPadding - ((standardPadding - minPadding) * (currentScroll / 50));
        if (newPadding < minPadding) newPadding = minPadding;
        navbar.style.padding = newPadding + "px 0";
      }

      clearTimeout(window.navbarTimeout);
      window.navbarTimeout = setTimeout(() => {
        navbar.style.padding = standardPadding + "px 0";
      }, 250);

      lastScrollY = currentScroll;
    });
  }

   // ======================================PORTFOLIO==============================================================
  const portfolioImages = [
    { src: "assets/bilder/Portfolio/ana+rory.jpeg", name: "Ana + Rory", text: "ALGARVE, PORTUGAL", date: "APRIL 2023" },
    { src: "assets/bilder/Portfolio/ana+rory.jpeg", name: "Test + Test", text: "SYKE, GERMANY", date: "AUGUST 2025" },
    { src: "assets/bilder/Portfolio/ana+rory.jpeg", name: "Emma + Luca", text: "BREMEN, GERMANY", date: "DECEMBER 2025" }
  ];

  let currentIndex = 0;

  const imgEl = document.querySelector(".portfolio-img");
  const nameEl = document.querySelector(".portfolio-name");
  const captionEl = document.querySelector(".portfolio-caption");
  const dateEl = document.querySelector(".portfolio-date");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  // Initial load
  updatePortfolio();

  function updatePortfolio() {
    imgEl.src = portfolioImages[currentIndex].src;
    nameEl.textContent = portfolioImages[currentIndex].name;
    captionEl.textContent = portfolioImages[currentIndex].text;
    dateEl.textContent = portfolioImages[currentIndex].date;
  }

  function slideImage(direction) {
    let offset = direction === "next" ? 100 : -100;

    const elements = [imgEl, nameEl, captionEl, dateEl];

    // slide out
    elements.forEach(el => {
      el.style.transform = `translateX(${-offset}%)`;
      el.style.opacity = 0;
    });

    setTimeout(() => {
      currentIndex = direction === "next"
        ? (currentIndex + 1) % portfolioImages.length
        : (currentIndex - 1 + portfolioImages.length) % portfolioImages.length;

      updatePortfolio();

      // start new position
      elements.forEach(el => {
        el.style.transform = `translateX(${offset}%)`;
      });

      setTimeout(() => {
        elements.forEach(el => {
          el.style.transform = "translateX(0)";
          el.style.opacity = 1;
        });
      }, 50);
    }, 500);
  }

  prevBtn.addEventListener("click", () => slideImage("next"));
  nextBtn.addEventListener("click", () => slideImage("prev"));


  // ===================== KONTAKTFORMULAR AJAX + RESET =====================
  const kontaktForm = document.getElementById('kontaktForm');
  if (kontaktForm) {
    kontaktForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Normales Absenden verhindern

      const formData = new FormData(kontaktForm);

      try {
        const response = await fetch('https://formsubmit.co/ajax/' + formData.get('_to'), {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          alert("Vielen Danke! Deine Nachricht wurde gesendet. Ich melde mich in kürze bei euch");
          kontaktForm.reset(); // Felder leeren
        } else {
          alert("Oops! Etwas ist schiefgelaufen.");
        }
      } catch (err) {
        alert("Fehler beim Senden der Nachricht.");
        console.error(err);
      }
    });
  }

  // ===================== SCROLL RESTORATION =====================
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
});

// Navbar Bürger script schließen
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        // Bootstrap Collapse API
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: true
        });
      }
    });
  });
});


// ===================== Instagram Feed ======================
document.addEventListener("DOMContentLoaded", async () => {
  const tokenData = await fetch("token.json").then(res => res.json());
  const accessToken = tokenData.access_token;
  const userId = tokenData.user_id;

  const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_url,permalink,media_type&access_token=${accessToken}`;
  const response = await fetch(url);
  const posts = await response.json();

  const container = document.getElementById("insta-container");
  posts.data.forEach(post => {
    if (post.media_type === "IMAGE" || post.media_type === "CAROUSEL_ALBUM") {
      const a = document.createElement("a");
      a.href = post.permalink;
      a.target = "_blank";

      const img = document.createElement("img");
      img.src = post.media_url;
      img.alt = post.caption || "Instagram Bild";

      a.appendChild(img);
      container.appendChild(a);
    }
  });
});



// FEEDBACK SLIDER
const feedbackItems = document.querySelectorAll('#feedbackList .feedback-item');
let currentIndex = 0;

function showNextFeedback() {
  currentIndex++;
  if (currentIndex >= feedbackItems.length) currentIndex = 0;
  const offset = -currentIndex * 120; // Höhe der einzelnen Items
  document.getElementById('feedbackList').style.transform = `translateY(${offset}px)`;
}

// Automatisch alle 4 Sekunden wechseln
setInterval(showNextFeedback, 3000); // 20 Sekunden


