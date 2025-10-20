import { getPokemons } from "./api.js";

getPokemons();

const filterMenu = document.querySelector('.filterMenu');
const filterBtn = document.getElementById('filterBtn');
const closeFiltersBtn = document.getElementById('close-filters');
const resetFiltersBtn = document.getElementById('reset-filters');


resetFiltersBtn.addEventListener('click', () => {
    const checkboxes = filterMenu.querySelectorAll('input[type="checkbox"]');
    const radioButtons = filterMenu.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
    });
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
});
closeFiltersBtn.addEventListener('click', () => {
    filterMenu.classList.toggle('active');
});
// when mouse leaves
filterMenu.addEventListener('mouseleave', () => {
    filterMenu.classList.remove('active');
});

filterBtn.addEventListener('click', () => {
    filterMenu.classList.toggle('active');
});