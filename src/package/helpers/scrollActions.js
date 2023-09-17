export function disableScroll() {
  const body = document.querySelector("body");

  body.style.overflow = "hidden";
  body.style.position = "fixed";
  body.style.width = "100%";
  body.style.height = "100vh";
}

export function activeScroll() {
  const body = document.querySelector("body");

  body.style.removeProperty("overflow");
  body.style.removeProperty("position");
  body.style.removeProperty("width");
  body.style.removeProperty("height");
}
