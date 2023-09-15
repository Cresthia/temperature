let weatherData = 0;
let displayParagraph = document.getElementById("display");
let f = false;

async function fetchData() {
    let lat = document.getElementById("lat").value;
    let log = document.getElementById("lon").value;
    
    await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=0fafc910f42efc804de1f9579f634119`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.main) {
          weatherData = data.main;
          weatherData.temp -= 273.15;
          if (f === true){
            weatherData.temp = (weatherData.temp * (9 / 5)) + 32;
          }
          let temperature = weatherData.temp.toFixed(2);
          if (f === false){
            displayParagraph.textContent = `Temperature: ${temperature}°C`;
          }
          if (f === true){
            displayParagraph.textContent = `Temperature: ${temperature}°F`;
            f = false;
          }
        } else {
          displayParagraph.textContent = `Location Not Found.`;
        }
      })
      .catch(error => {
        displayParagraph.textContent = "Error fetching data";
      });
}
function convert(){
    f = true;
    fetchData();
}
function celsius(){
    f = false;
    fetchData();
}