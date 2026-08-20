document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".mobile-menu-toggle");
  const menu = document.querySelector(".mobile-nav");

  if (!button || !menu) return;

  const setMenuState = (isOpen) => {
    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute("aria-label", isOpen ? "关闭导航菜单" : "打开导航菜单");
    menu.hidden = !isOpen;
    document.body.classList.toggle("mobile-menu-open", isOpen);
  };

  setMenuState(false);

  const closeMenu = () => setMenuState(false);

  const toggleMenu = () => {
    setMenuState(button.getAttribute("aria-expanded") !== "true");
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
