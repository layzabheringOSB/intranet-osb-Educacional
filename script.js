document.addEventListener("DOMContentLoaded", () => {
  // === 1. LÓGICA DO CARROSSEL ===
  const track = document.getElementById("carouselTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const cards = document.querySelectorAll(".course-card");

  let currentIndex = 0;

  // Retorna a quantidade de cards visíveis por tela
  function getVisibleCardsCount() {
    const width = window.innerWidth;
    if (width <= 600) return 1;
    if (width <= 900) return 2;
    return 3;
  }

  // Atualiza a posição do carrossel
  function updateCarousel() {
    if (!track || cards.length === 0) return;

    const visibleCards = getVisibleCardsCount();
    const maxIndex = cards.length - visibleCards;

    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    const cardWidth = cards[0].offsetWidth;
    const gap = 20;
    const amountToMove = (cardWidth + gap) * currentIndex;

    track.style.transform = `translateX(-${amountToMove}px)`;
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      const visibleCards = getVisibleCardsCount();
      const maxIndex = cards.length - visibleCards;

      if (currentIndex < maxIndex) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        const visibleCards = getVisibleCardsCount();
        currentIndex = cards.length - visibleCards;
      }
      updateCarousel();
    });

    window.addEventListener("resize", updateCarousel);
  }

  // === 2. LÓGICA DO MODAL DE VÍDEO (REPRODUÇÃO POP-UP) ===
  const playButtons = document.querySelectorAll(".play-video-btn");
  const videoModal = document.getElementById("videoModal");
  const youtubeIframe = document.getElementById("youtubeIframe");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modalOverlay = document.getElementById("modalOverlay");

  function openVideoModal(videoId) {
    if (youtubeIframe && videoModal) {
      // Configura o embed com autoplay
      youtubeIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      videoModal.classList.add("active");
    }
  }

  function closeVideoModal() {
    if (youtubeIframe && videoModal) {
      youtubeIframe.src = ""; // Limpa a URL para parar o áudio/vídeo
      videoModal.classList.remove("active");
    }
  }

  // Atribui evento de clique para todos os botões de assistir vídeo
  playButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const videoId = btn.getAttribute("data-video-id");
      openVideoModal(videoId);
    });
  });

  if (closeModalBtn) closeModalBtn.addEventListener("click", closeVideoModal);
  if (modalOverlay) modalOverlay.addEventListener("click", closeVideoModal);

  // Fechar o modal com a tecla 'ESC'
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && videoModal && videoModal.classList.contains("active")) {
      closeVideoModal();
    }
  });
});