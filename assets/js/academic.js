const navigationLinks = [...document.querySelectorAll(".navigation a")];
const sections = navigationLinks.map((link) =>
  document.querySelector(link.getAttribute("href"))
);

function updateNavigation() {
  let currentSection = sections[0];

  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 160) {
      currentSection = section;
    }
  }

  if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
    currentSection = sections[sections.length - 1];
  }

  for (const link of navigationLinks) {
    if (link.getAttribute("href") === `#${currentSection.id}`) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  }
}

let updatePending = false;
window.addEventListener("scroll", () => {
  if (!updatePending) {
    updatePending = true;
    window.requestAnimationFrame(() => {
      updateNavigation();
      updatePending = false;
    });
  }
}, { passive: true });
window.addEventListener("resize", updateNavigation);
updateNavigation();

const figureDialog = document.querySelector("#architecture-dialog");
document.querySelector(".publication-figure").addEventListener("click", () => {
  figureDialog.showModal();
});
document.querySelector(".dialog-close").addEventListener("click", () => {
  figureDialog.close();
});
figureDialog.addEventListener("click", (event) => {
  if (event.target === figureDialog) {
    const bounds = figureDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) {
      figureDialog.close();
    }
  }
});
