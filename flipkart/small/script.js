
// update buttons when page is loaded 
document.addEventListener('DOMContentLoaded', () => {

    // give each card container in the document initial position with left = 0px in inline css 
    const cardsContainer = document.querySelectorAll('.fk-cards');
    cardsContainer.forEach(cardContainer => {
        cardContainer.style.left = "0px";
    });

    // on content load insert the buttons to the slider 
    const sliders = document.querySelectorAll('.fk-slider');
    const iconWrapper = document.createElement('span');
    const icon = document.createElement('img');

    const leftBtn = document.createElement('div');
    const rightBtn = document.createElement('div');

    icon.setAttribute('src', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTEiIHZpZXdCb3g9IjAgMCAxNCAxMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZF80OTc0Xzc1OTY5KSI+CjxwYXRoIGQ9Ik0zIDJMNyA2TDExIDIiIHN0cm9rZT0iIzExMTExMiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L2c+CjxkZWZzPgo8ZmlsdGVyIGlkPSJmaWx0ZXIwX2RfNDk3NF83NTk2OSIgeD0iMC4yNSIgeT0iMC4yNSIgd2lkdGg9IjEzLjUiIGhlaWdodD0iOS44MTI1IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPgo8ZmVPZmZzZXQgZHk9IjEiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMSIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4xNiAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93XzQ5NzRfNzU5NjkiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3dfNDk3NF83NTk2OSIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPC9kZWZzPgo8L3N2Zz4K');
    iconWrapper.appendChild(icon);

    
    leftBtn.classList.add('fk-nav', 'left');
    rightBtn.classList.add('fk-nav', 'right');

    leftBtn.appendChild(iconWrapper.cloneNode(true));
    rightBtn.appendChild(iconWrapper.cloneNode(true));

    sliders.forEach(slider => {
        slider.appendChild(document.createComment('slider navigation buttons'));
        slider.appendChild(leftBtn);
        slider.appendChild(rightBtn);
    });

    document.querySelectorAll('.fk-nav').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('left')) {
                slideToLeft(btn);
            } else if (btn.classList.contains('right')) {
                slideToRight(btn);
            }
            updateBtn(btn.parentElement);
        });
        updateBtn(btn.parentElement);
    });
});


function slideToLeft(btn) {

    const slider = btn.parentElement;
    const cardsContainer = slider.querySelector('.fk-cards');
    const cardCount = cardsContainer.children.length;
    const left = cardsContainer.style.left;

    const cardWrapperWidth = (cardsContainer.scrollWidth - slider.offsetWidth) / cardCount * 2;
    const scrollAmount = toNum(left);
    const newScrollAmount = scrollAmount + cardWrapperWidth;

    console.log(newScrollAmount, "newScrollAmount");

    cardsContainer.style.left = newScrollAmount + 'px';
}

function slideToRight(btn) {

    const slider = btn.parentElement;
    const cardsContainer = slider.querySelector('.fk-cards');
    const cardCount = cardsContainer.children.length;
    const left = cardsContainer.style.left;

    const cardWrapperWidth = (cardsContainer.offsetWidth - slider.offsetWidth) / cardCount * 2;
    const scrollAmount = (left == '' ? '0px' : toNum(left));
    const newScrollAmount = -scrollAmount + cardWrapperWidth;

    console.log(newScrollAmount, "newScrollAmount");

    cardsContainer.style.left = -newScrollAmount + 'px';
}

function updateBtn(slider) {
    
    const rightBtn = slider.querySelector('.fk-nav.right');
    const leftBtn = slider.querySelector('.fk-nav.left')
    const cardsContainer = slider.querySelector('.fk-cards');

    // if cardsContainer's total width - cardContainer's visible width === cardContainer's hidden width then hide the right button
    if (cardsContainer.offsetWidth - slider.offsetWidth === Math.abs(toNum(cardsContainer.style.left))) {
        rightBtn.classList.add('hidden');
        console.log("hide right btn");
    } else {
        rightBtn.classList.remove('hidden');
    }

    // if cardContainer's hidden width === 0 then hide the left button
    if (cardsContainer.style.left === '0px') {
        leftBtn.classList.add('hidden');
        console.log("hide left btn");
    } else {
        leftBtn.classList.remove('hidden');
    }
}


// function to remove px from the css value and convert it into floating number
function toNum(str) {
    return parseFloat(str.replace('px', ''), 10);
}