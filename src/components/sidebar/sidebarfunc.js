export function sidebarfunc() {
  document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector(".sidebar-toggle");
    const sidebar = document.querySelector(".main-sidebar");
    const toggleIcon = document.getElementById("toggle-icon");

    // Kiểm tra nếu các phần tử tồn tại
    if (toggleBtn && sidebar && toggleIcon) {
      toggleBtn.addEventListener("click", function () {
        sidebar.classList.toggle("hidden-sidebar");

        // Đổi icon giữa fa-book-open và fa-book
        if (sidebar.classList.contains("hidden-sidebar")) {
          toggleIcon.classList.remove("fa-book-open");
          toggleIcon.classList.add("fa-book");
        } else {
          toggleIcon.classList.remove("fa-book");
          toggleIcon.classList.add("fa-book-open");
        }
      });
    } else {
      console.log("Không tìm thấy phần tử toggle hoặc sidebar.");
    }
  });
}
