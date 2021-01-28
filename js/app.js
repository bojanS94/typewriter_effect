//ES6 Class

class typeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }
    type() {
        //Word index
        const current = this.wordIndex % this.words.length;
        //Get full text of current word
        const fullTxt = this.words[current];
        //Check if deleting
        if (this.isDeleting) {
            //Remove character
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        }
        else {
            //Add character
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        //Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
        //Initial Type speed
        let typeSpeed = 300;
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        //Check if word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            //Make pause at end
            typeSpeed = this.wait;
            //Set delete to true
            this.isDeleting = true;
        }
        else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            //Move to the next word
            this.wordIndex++;
            //Pause before start typing
            typeSpeed = 500;
        }
        setTimeout(() => this.type(), typeSpeed);
    }
}

//init on DOM load

document.addEventListener('DOMContentLoaded', init);

//App init

function init() {

    const txtEl = document.querySelector('.txt-type');
    const words = JSON.parse(txtEl.getAttribute('data-words'));
    const wait = txtEl.getAttribute('data-wait');
    //Typewriter initi

    new typeWriter(txtEl, words, wait);

}