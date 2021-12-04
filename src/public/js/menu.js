const harmburger = document.querySelector ('.hamburger');
const menu = document.querySelector ('.menu-navegacion');

console.log(menu)
console.log(harmburger)

harmburger.addEventListener('click', ()=>{
   menu.classList.toggle("spread")
})

window.addEventListener('click', e=>{
    if(menu.classList.contains('spread')
        && e.target != menu  && e.target != harmburger ){
            menu.classList.toggle("spread")
    }
})