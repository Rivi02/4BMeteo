// @doc https://webdesign.tutsplus.com/tutorials/build-a-simple-weather-app-with-vanilla-javascript--cms-33893

const weatherForm = document.getElementById("weatherForm");
const input = document.querySelector(".header-section input");
const cities = document.querySelector(".ajax-section .card-wrapper");
const message = document.querySelector(".msg");

const apiKey = "4d8fb5b93d4af21d66a2948710284366";

weatherForm.addEventListener("submit", e => {
    e.preventDefault();

    let inputVal = input.value;

    const listItems = cities.querySelectorAll(".ajax-section .card");
    const listItemsArray = Array.from(listItems);

    if (listItemsArray.length > 0) {
        
        const filteredArray = listItemsArray.filter(el => {
            let content = "";

            if (inputVal.includes(",")) {
                
                if (inputVal.split(",")[1].length > 2) {
                    inputVal = inputVal.split(",")[0];
                    content = el
                    .querySelector(".card__name span")
                    .textContent.toLowerCase();
                } else {
                    content = el.querySelector(".card__name").dataset.name.toLowerCase();
                }

            } else {
                content = el.querySelector(".card__name span").textContent.toLowerCase();
            }
            return content == inputVal.toLowerCase();
        });

        if (filteredArray.length > 0) {
            
            message.textContent = `Hai già cercato questa città "${
                filteredArray[0].querySelector(".card__name span").textContent
            }"`;
            
            weatherForm.reset();
            input.focus();
            return;
        }
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&lang=it&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            const { main, name, sys, weather, id } = data;

            const svgIcon = weather[0]["icon"];
            const icon = `https://openweathermap.org/img/wn/${  weather[0]["icon"]}@2x.png`;
            const description = weather[0]["description"];
            const li = document.createElement("li");
            li.classList.add("card");

            li.dataset.identity = id;
            
            var temp = "__temp";

            if (main.temp <= 5) {
              temp = "__temp--cold";
            } else if (main.temp >= 25) {
              temp = "__temp--hot";
            }

            const cardTemplate = `
                <h2  class="card__name">
                    <span>${name}</span>
                    <sup>${sys.country}</sup>
                </h2>
                <div class="card__temp">
                    <span>${Math.round(main.temp)}</span>
                    <sup>°C</sup>
                </div>
                <figure class="card__figure">
                    <img class="card__icon" src="${icon}" alt="${description}">
                    <figcaption>${description}</figcaption>
                    <div class='close' onclick='rimuovi(this)'>
                        <p>x</p>
                    </div>
                </figure>

            `;

            li.innerHTML = cardTemplate;
            cities.appendChild(li);
            
        })
        .catch(() => {
            message.textContent = 'Città inesistente, ritenta sarai più fortunato';
            input.classList.add('error');
        })

        input.classList.remove('error');
        message.textContent = '';
        weatherForm.reset();
        return;
});
function rimuovi(el){
    el.parentNode.parentNode.remove();
  }

/**
 * 
 * TODO
 * 
 * Permettere all'utente di scegliere se unità di misura in metrico/imperiale
 *      select
 *      chiedendo la lingua impostata sul browser
 *      NB se cambia unità di misura, aggiornare anche le varie particelle di testo es. "C"
 * 
 * Permettere di ottenere il meteo della posizione geografica in cui si trova l'utente
 * 
 * Controllare che non vengano richiesti più volte gli stessi dati
 *  
 * LO STILE, liberi di impostare lo stile che desiderato
 * 
 * Reset di tutti gli elementi aggiunti nella DOM
 * 
 * Se possibile scrivere in linea i file SVG
 * 
 */

const a = $('.el');
console.log(a);