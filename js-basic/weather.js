const weather = document.querySelector(".js-weather");

const API_KEY = "c17c24a90517e61e3312a10c5525e17e"; //컴끼리 소통하려고 만든 것
const COORDS = "coords";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  ) //따옴표가 아니라 ``를 사용해야함
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature} @ ${place}`;
    }); // then은 데이터가 완전히 들어온 후에 함수 호출함
} //메일이 새로고침없이 데이터 들어오는 것은 얘때문

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  }; //이름이 같으면 이렇게 적어도 됨
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
} //handleGeoSucces는 local storage에 좌표값이 없으면 getWeather함수가 실행됨

function handleGeoError() {
  console.log("Cant access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords == null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
