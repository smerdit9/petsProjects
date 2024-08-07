let elDay = document.getElementById('electricity-day');
let elNight = document.getElementById('electricity-night');
let waterHot = document.getElementById('water-hot');
let waterCold = document.getElementById('water-cold');
let heating = document.getElementById('heating');
let form = document.getElementById('form');

let elDayPre = document.getElementById('electricity-day-pre');
let elNightPre = document.getElementById('electricity-night-pre');
let waterHotPre = document.getElementById('water-hot-pre');
let waterColdPre = document.getElementById('water-cold-pre');

let resultText = document.getElementById('result');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    
   let light = (elDay.value - elDayPre.value) * 6.16 + (elNight.value - elNightPre.value) * 2.43;
   let water = (waterCold.value - waterColdPre.value) * 30.80 + ((waterHot.value - waterHotPre.value) * 0.06029 * 1940.43 + ((waterHot.value - waterHotPre.value) * 30.80));
   let drainage = ((waterCold.value - waterColdPre.value) + (waterHot.value - waterHotPre.value)) * 42.84;

   let result = light + water + drainage + Number(heating.value);

    resultText.textContent = result;
});
