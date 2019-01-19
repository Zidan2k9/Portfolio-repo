/*jshint esversion: 6 */


// Select DOM Items
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuNav = document.querySelector('.menu-nav');
const menuBranding = document.querySelector('.menu-branding');
const navItems = document.querySelectorAll('.nav-item');

// Set Initial State Of Menu
let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    menuBtn.classList.add('close');
    menu.classList.add('show');
    menuNav.classList.add('show');
    menuBranding.classList.add('show');
    navItems.forEach(item => item.classList.add('show'));

    // Set Menu State
    showMenu = true;
  } else {
    menuBtn.classList.remove('close');
    menu.classList.remove('show');
    menuNav.classList.remove('show');
    menuBranding.classList.remove('show');
    navItems.forEach(item => item.classList.remove('show'));

    // Set Menu State
    showMenu = false;
  }
}

const TypeWriter = function (txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;

}

let speed = 50;

//Type method
TypeWriter.prototype.type = function () {
    // console.log('testing...');

    //Current index of word


    const current = this.wordIndex % this.words.length;

    //Get full tex of current word

    const fullText = this.words[current];

    //console.log(fullText);

    //check if deleteing...

    if (this.isDeleting) {
        //remove char

        this.txt = fullText.substring(0,this.txt.length - 1);
    } else {
        //add char

        this.txt = fullText.substring(0,this.txt.length + 1);

    }

    //Insert text into element

    this.txtElement.innerHTML = `<span class ="txt">${this.txt}</span`;
    //Type Speed
    let typeSpeed = speed;
    if(this.isDeleting){
        typeSpeed /= 2;
    }
    // if word is complete
    if(!this.isDeleting && this.txt === fullText){
        //pauses at end
        typeSpeed = this.wait;
        //set delete to true
        this.isDeleting = true;
    }
    else if(this.isDeleting && this.txt === ''){

        this.isDeleting = false;
        //Move to next word
        this.wordIndex++;
        //Pause before starting to type
        typeSpeed = speed;

    }
    setTimeout(() => this.type(),typeSpeed)
}
//Init on DOM Load
document.addEventListener('DOMContentLoaded', init);
//Init app
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    //Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}
