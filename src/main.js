'use strict'

// Main
{
    CreateNavigation();

}

// Function

// Create Navigation when user scroll down under header
function CreateNavigation () {
    const header =document.querySelector('.header');
    const headerHeight = header.clientHeight;
    console.log(headerHeight);
    document.addEventListener('scroll',onScroll,{passive:true});
    
    function onScroll () {
        const scrollPosition = pageYOffset;
        if (headerHeight<scrollPosition){
            header.classList.add('fix');
        }

        else {
            header.classList.remove('fix');
        }
    }
}

// Mobile


