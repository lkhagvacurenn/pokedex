export const backgroundColors = {
    fire: '#eb6c6c',
    bug:'#91ac22',
    water: '#009acb',
    flying:"#2299ee",
    poison:'#7e00cb',
    normal:'#b6b6b6',
    rock:"#857d57",
    ground:'#a77437',
    fighting:'#ba114e',
    ghost:'#6b2bf1',
    psychic:'#c4484a',
    ice:'#3a9d90',
    dragon:'#1268b8',
    fairy:'#c01a8d',
    electric:'#b7b117',
    steel:'#448f85',
    grass:"#1eba11",
};
export const abilityColors = {
    fire: '#ff6464',
    bug: '#c9ff84',
    water: '#9ff3ff',
    flying:"#cbe9ff",
    poison:'#d89cfd',
    normal:'#cbcbcb',
    rock:"#cfc06f",
    ground:'#ffbf72',
    fighting:'#ff699f',
    ghost:'#b592ff',
    psychic:'#ff5e60',
    ice:'#aefff4',
    dragon:'#87c5ff',
    fairy:'#ffa2e3',
    electric:'#fffa86',
    steel:'#a4ffe9',
    grass:"#80e177",
};
export function getBackgroundColor(name) {
  return backgroundColors[name] || backgroundColors['normal'];
};
export function getAbilityColor(name) {
  return abilityColors[name] || abilityColors['normal'];
};
