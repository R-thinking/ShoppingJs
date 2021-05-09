'use strict';

// Main
{
    CreateNavigation();
    AppearCategoryBar();
    DisappearCategoryBar();
    ControlSearchBar();
}

// Function

// Create Navigation when user scroll down under header 
// or browser width is smaller than 1100px
function CreateNavigation () {
    const header =document.querySelector('.header');
    const headerHeight = header.clientHeight;
    const membershipIcon = document.querySelectorAll('.header .membership i');

    let position =pageYOffset;
    document.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onresize);

    // listener
    // If user scroll down under the header
    function onScroll () {
        const clientWidth = document.body.clientWidth;
        const scrollPosition = pageYOffset;
        position=scrollPosition;

        if (headerHeight<scrollPosition){
            if(header.className==='fix'){
                return;
            }
            header.classList.add('fix');
        }
        else if (clientWidth > 1100) {
            header.classList.remove('fix');
        }
    }
    // if browser width is smaller than 1100px
    function onresize () {
        const clientWidth = document.body.clientWidth;

        if (clientWidth<=1100){
            membershipIcon.forEach((icon)=>{
                icon.classList.remove('fa-2x');
            })
            if(header.className==='fix'){
                return;
            }
            header.classList.add('fix');
        }
        else if(headerHeight>position) {
            membershipIcon.forEach((icon)=>{
                icon.classList.add('fa-2x');
            })
            header.classList.remove('fix');
        }
        else {
            membershipIcon.forEach((icon)=>{
                icon.classList.add('fa-2x');
            })
        }
    }
}

// Appear CategoryBar
function AppearCategoryBar() {
    const menuBtn=document.querySelector('.header .menu .moreBtn');
    const categoryBar=document.querySelector('.categoryBar');
    menuBtn.addEventListener('click',()=> {
        categoryBar.classList.remove('disappear');
        categoryBar.classList.add('appear');
    });
    
}

// Disappear CategoryBar
function DisappearCategoryBar() {
    const EscBtn = document.querySelector('.categoryBar .inner .categoryHeader .escBtn');
    const categoryBar=document.querySelector('.categoryBar');
    EscBtn.addEventListener('click',()=> {
        categoryBar.classList.add('disappear');
        setTimeout(()=>categoryBar.classList.remove('appear'),690);
    });

}

// Control SearchBar
function ControlSearchBar() {
    const searchBtn = document.querySelector('.header .menu .searchBtn');
    const searchBar = document.querySelector('.searchBar');
    const escBtn = document.querySelector('.searchBar .escBtn');

    // listener
    // Search button click
    searchBtn.addEventListener('click',()=> {
        // Appear SearchBar
        if(searchBar.classList.contains('disappear')){
            searchBar.classList.remove('disappear');
            searchBar.classList.add('appear');
        }
        // Disappear SearchBar
        else if(searchBar.classList.contains('appear')){
            searchBar.classList.add('disappear');
            setTimeout(()=>searchBar.classList.remove('appear'),390);
        }
        // Appear SearchBar at first
        else {
            searchBar.classList.add('appear');
        }
    });

    // Client width resizing (smaller than  720px)
    window.addEventListener('resize',() => {
        const clientWidth = document.body.clientWidth;
        if(clientWidth>720){
            searchBar.classList.add('disappear');
            setTimeout(()=>searchBar.classList.remove('appear'),390);
        }
    });

    // Esc button click
    escBtn.addEventListener('click',()=> {
        searchBar.classList.add('disappear');
        setTimeout(()=>searchBar.classList.remove('appear'),390);
    });

}
