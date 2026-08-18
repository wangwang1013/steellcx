document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".mobile-menu-toggle");
  const menu = document.querySelector(".mobile-nav");

  if (!button || !menu) return;

  const closeMenu = () => {
    button.setAttribute("aria-expanded", "false");
    menu.hidden = true;
  };

  const toggleMenu = () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    menu.hidden = isOpen;
  };

  button.addEventListener("click", toggleMenu);
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  window.matchMedia("(min-width: 770px)").addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });
});
