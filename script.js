document.addEventListener("DOMContentLoaded", () => {
    const faqSection = document.querySelector(".faq-section");
    const faqItems = document.querySelectorAll(".faq-item");
  
    // Função para verificar se o elemento está visível na viewport
    const isInViewport = (element) => {
      const rect = element.getBoundingClientRect();
      return rect.top <= window.innerHeight && rect.bottom >= 0;
    };
  
    // Função para animar a seção FAQ quando entrar na viewport
    const animateFaqSection = () => {
      if (isInViewport(faqSection) && !faqSection.classList.contains("fade-in")) {
        faqSection.classList.add("fade-in"); // Anima a seção principal
        faqItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("fade-in"); // Anima cada item com atraso
          }, index * 400); // Incremento de atraso (150ms por item)
        });
      }
    };
  
    // Chamar animação no carregamento e no scroll
    window.addEventListener("scroll", animateFaqSection);
    animateFaqSection(); // Garante a animação inicial caso já esteja na viewport
  });

  document.addEventListener("DOMContentLoaded", () => {
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach((question) => {
        question.addEventListener("click", () => {
            const expanded = question.getAttribute("aria-expanded") === "true";
            question.setAttribute("aria-expanded", !expanded);

            const answer = question.nextElementSibling;
            if (!expanded) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = "0px";
            }
        });
    });
});


// ==================== CARROSSEL DE IMAGENS ====================
function initImageCarousel() {
  let index = 0;
  const slides = document.querySelector(".carrossel-container");
  const botoes = document.querySelectorAll(".botao");

  let isDragging = false;
  let startPosX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID;

  function mudarSlide(n) {
      index = n;
      updateCarousel();
  }

  function updateCarousel() {
      currentTranslate = -index * 100;
      slides.style.transform = `translateX(${currentTranslate}%)`;

      botoes.forEach(botao => botao.classList.remove("ativo"));
      botoes[index].classList.add("ativo");
  }

  function touchStart(event) {
      isDragging = true;
      startPosX = event.touches[0].clientX;
      animationID = requestAnimationFrame(animation);
      slides.style.transition = "none";
  }

  function touchMove(event) {
      if (!isDragging) return;
      const currentPosX = event.touches[0].clientX;
      const deltaX = currentPosX - startPosX;
      currentTranslate = prevTranslate + (deltaX / window.innerWidth) * 100;
  }

  function touchEnd() {
      isDragging = false;
      cancelAnimationFrame(animationID);

      const movedBy = currentTranslate - prevTranslate;
      if (movedBy < -10 && index < botoes.length - 1) {
          index++;
      } else if (movedBy > 10 && index > 0) {
          index--;
      }

      updateCarousel();
      slides.style.transition = "transform 0.3s ease-in-out";
      prevTranslate = currentTranslate;
  }

  function animation() {
      slides.style.transform = `translateX(${currentTranslate}%)`;
      if (isDragging) requestAnimationFrame(animation);
  }

  slides.addEventListener("touchstart", touchStart);
  slides.addEventListener("touchend", touchEnd);
  slides.addEventListener("touchmove", touchMove);
}

// ==================== CARROSSEL DE VÍDEOS ====================
function initVideoCarousel() {
  let indexvideos = 0;
  const slidesvideos = document.querySelector(".carousel-container");
  const dotsvideos = document.querySelectorAll(".carousel-dot");

  let isDragging = false;
  let startPosX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID;

  function changeSlide(n) {
      indexvideos = n;
      updateCarousel();
  }

  function updateCarousel() {
      currentTranslate = -indexvideos * 100;
      slidesvideos.style.transform = `translateX(${currentTranslate}%)`;

      dotsvideos.forEach(dot => dot.classList.remove("active"));
      dotsvideos[indexvideos].classList.add("active");
  }

  function touchStart(event) {
      isDragging = true;
      startPosX = event.touches[0].clientX;
      animationID = requestAnimationFrame(animation);
      slidesvideos.style.transition = "none";
  }

  function touchMove(event) {
      if (!isDragging) return;
      const currentPosX = event.touches[0].clientX;
      const deltaX = currentPosX - startPosX;
      currentTranslate = prevTranslate + (deltaX / window.innerWidth) * 100;
  }

  function touchEnd() {
      isDragging = false;
      cancelAnimationFrame(animationID);

      const movedBy = currentTranslate - prevTranslate;
      if (movedBy < -10 && indexvideos < dotsvideos.length - 1) {
          indexvideos++;
      } else if (movedBy > 10 && indexvideos > 0) {
          indexvideos--;
      }

      updateCarousel();
      slidesvideos.style.transition = "transform 0.3s ease-in-out";
      prevTranslate = currentTranslate;
  }

  function animation() {
      slidesvideos.style.transform = `translateX(${currentTranslate}%)`;
      if (isDragging) requestAnimationFrame(animation);
  }

  slidesvideos.addEventListener("touchstart", touchStart);
  slidesvideos.addEventListener("touchend", touchEnd);
  slidesvideos.addEventListener("touchmove", touchMove);
}

// ==================== FAQ INTERATIVO ====================
function initFAQ() {
  document.querySelectorAll(".faq-question").forEach((button) => {
      button.addEventListener("click", () => {
          const faqItem = button.parentElement;
          
          // Fecha todas as outras perguntas
          document.querySelectorAll(".faq-item").forEach((item) => {
              if (item !== faqItem) {
                  item.classList.remove("active");
              }
          });

          // Alterna a pergunta clicada
          faqItem.classList.toggle("active");
      });
  });
}

// ==================== INICIALIZANDO OS ELEMENTOS ====================
document.addEventListener("DOMContentLoaded", () => {
  initImageCarousel();
  initVideoCarousel();
  initFAQ();
});


// Define o tempo final da oferta (exemplo: 3 dias a partir de agora)
const ofertaFinal = new Date();
ofertaFinal.setDate(ofertaFinal.getDate() + 3); // Oferta válida por 3 dias

function atualizarContagem() {
    const agora = new Date();
    const diferenca = ofertaFinal - agora;

    if (diferenca > 0) {
        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = dias.toString().padStart(2, "0");
        document.getElementById("hours").textContent = horas.toString().padStart(2, "0");
        document.getElementById("minutes").textContent = minutos.toString().padStart(2, "0");
        document.getElementById("seconds").textContent = segundos.toString().padStart(2, "0");
    } else {
        document.getElementById("timer").textContent = "Oferta Expirada!";
    }
}

// Atualiza a contagem a cada segundo
setInterval(atualizarContagem, 1000);
atualizarContagem();


function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);

    if (section) {
        window.scrollTo({
            top: section.offsetTop - 50, // Ajuste para evitar sobreposição com headers fixos
            behavior: "smooth" // Rolagem suave
        });
    }
}