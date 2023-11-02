if (window.location.search) {
  const links = document.querySelectorAll(".js-ref");
  links.forEach((item) => {
    item.setAttribute(
      "href",
      `${item.getAttribute("href")}${window.location.search}`
    );
  });
}
