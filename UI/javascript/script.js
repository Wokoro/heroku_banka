window.addEventListener("DOMContentLoaded", ()=>{

    //Responsive menu funtionality
    let mobileMenu = document.querySelector("#menu"),
    headerNav = document.querySelector("#header-nav");
    mobileMenu.addEventListener("click", (event)=>{headerNav.classList.toggle("hide")})
})