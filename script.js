const menuItems = Array.from(document.getElementsByClassName('menu__item'));   
const contentCards = Array.from(document.getElementsByClassName('content__card'));   
const contentList = document.querySelector('.content__list');
const windowWidth = window.innerWidth;
const contentBackground = document.querySelector('.content');

let menuActiveItemIndex = 0;
let totalContentListShift = 0;

const backgroundFilters = [
  'invert(39%) sepia(75%) saturate(601%) hue-rotate(199deg) brightness(88%) contrast(87%)',
  'invert(45%) sepia(26%) saturate(4565%) hue-rotate(201deg) brightness(104%) contrast(97%)',
  'invert(46%) sepia(25%) saturate(236%) hue-rotate(96deg) brightness(90%) contrast(93%)',
  'invert(100%) sepia(31%) saturate(4883%) hue-rotate(312deg) brightness(107%) contrast(95%)',
  'invert(48%) sepia(47%) saturate(598%) hue-rotate(323deg) brightness(96%) contrast(87%)',
];

contentBackground.style.setProperty('--filter', backgroundFilters[menuActiveItemIndex]);

const activeMenuItem = menuItems[menuActiveItemIndex];
contentCards[menuActiveItemIndex].style.display = "block";

activeMenuItem.classList.add('menu__item--active');

menuItems.forEach((menuItem, i) => {
  menuItem.addEventListener('click', () => {
    menuItem.classList.add('menu__item--active');

    const prevIndex = menuActiveItemIndex;
    menuActiveItemIndex = i;

    contentBackground.style.setProperty('--filter', backgroundFilters[menuActiveItemIndex]);

    menuItems.forEach((menuItem, i) => {
      if (menuActiveItemIndex !== i) {
        menuItem.classList.remove('menu__item--active')
      }
    })

    let contentListShift = 0;

    const start = prevIndex < menuActiveItemIndex ? prevIndex : menuActiveItemIndex;
    const end = prevIndex < menuActiveItemIndex ? menuActiveItemIndex : prevIndex;

    if (windowWidth > 1000) {
      for (let j = start; j < end; j++) {
        const cardMargin = parseInt(window.getComputedStyle(contentCards[j]).marginBottom);
        contentListShift += contentCards[j].clientHeight + cardMargin;
      }
  
      if (prevIndex > menuActiveItemIndex) {
        contentListShift = -contentListShift;
      }
  
      totalContentListShift += contentListShift;
  
      contentList.style.transform = `translateY(-${totalContentListShift}px)`
    } else {
      contentCards[prevIndex].style.display = "none";
      contentCards[menuActiveItemIndex].style.display = "block";
    }  
  })
})

