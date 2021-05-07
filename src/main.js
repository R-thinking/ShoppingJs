'use strict';

// Main
{
    CreateNavigation();
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
        const scrollPosition = pageYOffset;
        position=scrollPosition;
        if (headerHeight<scrollPosition){
            if(header.className==='fix'){
                return;
            }
            header.classList.add('fix');
        }
        else if (window.outerWidth > 1100) {
            header.classList.remove('fix');
        }
    }
    // if browser width is smaller than 1100px
    function onresize () {
        if (window.outerWidth<=1100){
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

// Mobile


