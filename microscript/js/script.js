const menuItems = document.querySelectorAll(".menu__item--has-subitem"),
menuSubitems = document.querySelectorAll(".menu__subitems"),
header = document.querySelector('header');

for (let i =0; i<menuItems.length; i++) {
    menuItems[i].addEventListener("click", function (event) {
        event.preventDefault()
    })
    menuItems[i].addEventListener("mouseenter", function () {
        for (let j=0; j<menuItems.length; j++) {
            menuItems[j].classList.remove("active")
            
        }
        this.classList.add("active")
        console.log(menuSubitems);
       for (let k=0; k  < menuSubitems.length; k++) {
        menuSubitems[k].style.display = "none";
       
       }
        this.parentNode.querySelector(".menu__subitems").style.display="flex"
      });
    
}

header.addEventListener("mouseleave", function() {
    for (let i = 0; i<menuItems.length; i++) {
        menuItems[i].classList.remove("active")
       for (let j = 0; j<menuSubitems.length; j++)  {
            menuSubitems[j].style.display = "none";
    }}
})