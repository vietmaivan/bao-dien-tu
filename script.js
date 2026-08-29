document.addEventListener("DOMContentLoaded", function () {
    // 1. Xử lý mở/đóng menu chính trên Mobile (Hamburger menu)
    const mobileToggle = document.getElementById("mobile-menu");
    const navElement = document.querySelector("nav");

    if (mobileToggle) {
        mobileToggle.addEventListener("click", function () {
            navElement.classList.toggle("active");
        });
    }

    // 2. Xử lý đóng/mở tự động mượt mà cho các cấp Menu (Hỗ trợ nhấp cảm ứng/chuột)
    const dropdownTriggers = document.querySelectorAll(".has-dropdown > a, .has-submenu > a");

    dropdownTriggers.forEach(function (trigger) {
        trigger.addEventListener("click", function (e) {
            const nextMenu = this.nextElementSibling;
            if (nextMenu && (nextMenu.classList.contains("dropdown") || nextMenu.classList.contains("submenu"))) {
                e.preventDefault();
                e.stopPropagation();

                // Đóng các menu cùng cấp khác để tránh bị tràn chồng chéo
                const parentContainer = this.parentElement.parentElement;
                parentContainer.querySelectorAll(":scope > li > .dropdown, :scope > li > .submenu").forEach(function (sub) {
                    if (sub !== nextMenu) {
                        sub.classList.remove("show");
                    }
                });

                // Bật/tắt trạng thái hiển thị của menu được click
                nextMenu.classList.toggle("show");
            }
        });
    });

    // 3. Click ra ngoài vùng menu sẽ tự động thu gọn tất cả các menu đang mở
    document.addEventListener("click", function (e) {
        if (!e.target.closest("nav") && !e.target.closest("#mobile-menu")) {
            document.querySelectorAll(".dropdown, .submenu").forEach(function (sub) {
                sub.classList.remove("show");
            });
            if (navElement) {
                navElement.classList.remove("active");
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll(".nav-list > li");
    const dropdownItems = document.querySelectorAll(".dropdown li.has-submenu");

    // Xử lý menu cấp 1 (khi rê chuột vào mục chính)
    navItems.forEach(item => {
        const dropdown = item.querySelector(".dropdown");
        if (dropdown) {
            item.addEventListener("mouseenter", () => {
                dropdown.classList.add("show");
            });
            item.addEventListener("mouseleave", () => {
                dropdown.classList.remove("show");
                // Ẩn luôn các menu cấp 3 bên trong nếu có khi rời khỏi cấp 1
                dropdown.querySelectorAll(".submenu").forEach(sub => sub.classList.remove("show"));
            });
        }
    });

    // Xử lý menu cấp 2 và cấp 3 (khi rê chuột vào mục con có submenu)
    dropdownItems.forEach(item => {
        const submenu = item.querySelector(".submenu");
        if (submenu) {
            item.addEventListener("mouseenter", () => {
                submenu.classList.add("show");
            });
            item.addEventListener("mouseleave", () => {
                submenu.classList.remove("show");
            });
        }
    });
});