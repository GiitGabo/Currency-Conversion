document.addEventListener("DOMContentLoaded", () => {
//Monedas y cantidades
const monedaEl_one = document.getElementById('moneda-uno');
const monedaEl_two = document.getElementById('moneda-dos');
const cantidadEl_one = document.getElementById('cantidad-uno');
const cambioEl = document.getElementById('cambio');

//Banderas
const bandera_uno = document.getElementById('banderaUno');
const bandera_dos = document.getElementById('banderaDos');

//API
const apiKey = 'e14da996b7e7cd08ff40e3a9';
const apiURL = 'https://v6.exchangerate-api.com/v6/e14da996b7e7cd08ff40e3a9/latest/USD';


//API URL y Key
//Seleccion de las opciones para la moneda a elegir 1 y 2
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.conversion_rates);
            currencies.forEach(currency => {
                const option1 = document.createElement("option");
                option1.value = currency;
                option1.textContent = currency;
                monedaEl_one.appendChild(option1);

                const option2 = document.createElement("option");
                option2.value = currency;
                option2.textContent = currency;
                monedaEl_two.appendChild(option2);
            });
        });
    

        //Conversion de la moneda y seleccion de Bandera
        document.getElementById("convertir").addEventListener("click", () => {
            const from = monedaEl_one.value;
            const to = monedaEl_two.value;
            const amountValue = cantidadEl_one.value;
            fetch(apiURL)
                    .then(response => response.json())
                    .then(data => {
                        const conversionDolar1 = data.conversion_rates[from];
                        const conversionDolar2 = data.conversion_rates[to];
                        const convertedValue = ((amountValue / conversionDolar1) * conversionDolar2).toFixed(2);
                        cambioEl.innerHTML = `${amountValue} ${from} = ${convertedValue} ${to}`;

                        const lBandera_uno = from.slice(0,-1);
                        const lBandera_dos = to.slice(0,-1);

                        bandera_uno.src=`https://flagsapi.com/${lBandera_uno}/flat/64.png`;
                        bandera_dos.src=`https://flagsapi.com/${lBandera_dos}/flat/64.png`;
                    })
                    .catch(error => {
                        console.error("Error al realizar la conversion:", error);
                        cambioEl.textContent = "Hubo un error al obtener la tasa de cambio.";
                    });
            });
            
});