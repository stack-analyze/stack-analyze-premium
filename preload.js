// events
document.addEventListener('keypress', (e) => {
  if (e.code === "Enter" && e.code === "NumpadEnter") {
    e.preventDefault();
    return false;
  }
});
