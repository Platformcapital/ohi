const galleryContainer = document.getElementById("gallery");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-image");
const closeBtn = document.getElementById("close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const pageNumber = document.getElementById("page-number");
const prevImageBtn = document.getElementById("prev-image");
const nextImageBtn = document.getElementById("next-image");

const IMAGES_PER_PAGE = 21;
const TOTAL_IMAGES = 366;
const TOTAL_PAGES = Math.ceil(TOTAL_IMAGES / IMAGES_PER_PAGE);
let currentPage = 1;
let currentImageIndex = 0;
let currentImages = [];

function loadGallery(page) {
  galleryContainer.innerHTML = "";
  const start = (page - 1) * IMAGES_PER_PAGE + 1;
  const end = Math.min(start + IMAGES_PER_PAGE - 1, TOTAL_IMAGES);
  currentImages = [];

  for (let i = start; i <= end; i++) {
    const img = document.createElement("img");
    img.src = `./img/gallery/${i}.jpg`;
    img.alt = `Gallery image ${i}`;
    img.dataset.index = i - start;
    galleryContainer.appendChild(img);
    currentImages.push(`./img/gallery/${i}.jpg`);
  }

  pageNumber.textContent = `Page ${page} of ${TOTAL_PAGES}`;
}

function openModal(index) {
  currentImageIndex = index;
  modalImg.src = currentImages[index];
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
  modalImg.src = currentImages[currentImageIndex];
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % currentImages.length;
  modalImg.src = currentImages[currentImageIndex];
}

// Event Listeners
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadGallery(currentPage);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < TOTAL_PAGES) {
    currentPage++;
    loadGallery(currentPage);
  }
});

closeBtn.addEventListener("click", closeModal);
prevImageBtn.addEventListener("click", showPrevImage);
nextImageBtn.addEventListener("click", showNextImage);

window.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

galleryContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    const index = parseInt(e.target.dataset.index);
    openModal(index);
  }
});

// Initial load
loadGallery(currentPage);
