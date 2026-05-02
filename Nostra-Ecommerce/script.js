var sidenav = document.querySelector(".side-navbar")

function showNavbar() {
    /*sidenav.style.left = "0"*/
    sidenav.style.transform = "translateX(0)";
}

function closeNavbar() {
    sidenav.style.transform = "translateX(-100%)";
}