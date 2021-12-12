'use strict';

// Main
{
    createNavigation();
    appearCategoryBar();
    disappearCategoryBar();
    controlSearchBar();

    loadItems()
    .then(items => {
        displayItems(items);
        setEventListeners(items);
    })
    .catch(console.log);

}

// Function

// Create Navigation when user scroll down under header 
// or browser width is smaller than 1100px
function createNavigation () {
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
function appearCategoryBar() {
    const menuBtn=document.querySelector('.header .menu .moreBtn');
    const categoryBar=document.querySelector('.categoryBar');
    menuBtn.addEventListener('click',()=> {
        categoryBar.classList.remove('disappear');
        categoryBar.classList.add('appear');
    });
    
}

// Disappear CategoryBar
function disappearCategoryBar() {
    const EscBtn = document.querySelector('.categoryBar .inner .categoryHeader .escBtn');
    const categoryBar=document.querySelector('.categoryBar');
    EscBtn.addEventListener('click',()=> {
        categoryBar.classList.add('disappear');
        setTimeout(()=>categoryBar.classList.remove('appear'),650);
    });

}

// Control SearchBar
function controlSearchBar() {
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
            setTimeout(()=>searchBar.classList.remove('appear'),350);
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
            setTimeout(()=>searchBar.classList.remove('appear'),350);
        }
    });

    // Esc button click
    escBtn.addEventListener('click',()=> {
        searchBar.classList.add('disappear');
        setTimeout(()=>searchBar.classList.remove('appear'),350);
    });

}

// *load and display Shopping List Items*

// Fetch the items from the Json file
function loadItems() {
    return fetch('data/data.json')
        .then(response => response.json())
        .then(json => json.items);
}

// 
function displayItems (items) {
    const container = document.querySelector('.shoppingList .items');
    container.innerHTML = items.map(item => createHTMLString(item)).join(' ');
}

// 
function createHTMLString(item) {
    return `
    <li class="item">
        <a href="">
            <!-- thumbNail -->
            <div class="thumbNail">
                <img src="${item.image}" alt="${item.type}"  class="item_thumbNail">
                <button class="likeBtn"><i class="far fa-heart "></i></button>
            </div>
            <div class="metadata">
                <p class="title" data-dummytext="-w1-s1">${item.brand}</p>
                <p class="description" data-dummytext="-w10-s10">${item.description}</p>
                <div class="priceTag">
                    <strong class="price" >${item.price}$</strong>
                    <p class="discount" >${item.discount}%</p>
                </div>
                <div class="preference">
                    <div class="starRating">
                        <i class="fas fa-star"></i>
                        <p class="starNum">${item.starNum}</p>
                    </div>
                    <div class="like">
                        <i class="fas fa-heart"></i>
                        <p class="likeNum">${item.likeNum}</p>
                    </div>
                </div>
            </div>
        </a>
    </li>
    `;
}

function onItemClick(event, items) {
    const dataset =  event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    const lookingFor = document.querySelector('.shoppingList .lookingFor p');

    if(key == null || value ==null) {
        return;
    }

    else if(value === "all") {
        lookingFor.innerHTML = `${value}`;
        displayItems(items);
        return;
    }
    
    lookingFor.innerHTML = `${value}`;
    displayItems(items.filter(items => items[key] === value));
}

function onGenderCheck(event, items) {
    const checked = event.target.checked;
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value =dataset.value;

    if(!checked) {
        displayItems(items);
        return;
    }

    displayItems(items.filter(item => item[key] === value));
}

function setEventListeners(items) {
    const logo = document.querySelector('.logo');
    const choiceBtn = document.querySelector('.choice .clothes');
    const hiddenCategory = document.querySelector('.categoryBar .clothes');
    const genderCheck = document.querySelector('.category .choice .sex');

    logo.addEventListener('click', () => displayItems(items));
    choiceBtn.addEventListener('click', event => onItemClick(event, items));
    hiddenCategory.addEventListener('click', event => {
        const categoryBar = document.querySelector('.categoryBar');
        onItemClick(event, items);
        categoryBar.classList.add('disappear');
        setTimeout(()=>categoryBar.classList.remove('appear'),650);
    });
    genderCheck.addEventListener('input', event => onGenderCheck(event,items));
}

