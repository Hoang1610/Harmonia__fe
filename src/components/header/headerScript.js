function setupAvatarDropdown() {
  const userAvatar = document.querySelector(".user-avatar");
  const dropdown = userAvatar?.querySelector(".dropdown");

  if (userAvatar && dropdown) {
    dropdown.style.display = "none";

    // Toggle dropdown khi click vào avatar
    userAvatar.addEventListener("click", function (e) {
      e.stopPropagation();
      dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    });

    // Ẩn dropdown khi click ra ngoài
    document.addEventListener("click", function () {
      dropdown.style.display = "none";
    });

    // Ngăn dropdown bị ẩn khi click vào bên trong
    dropdown.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }
}
export default setupAvatarDropdown;
