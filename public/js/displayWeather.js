import { setWeather, getWeather, getAPI } from './fetch/getWeather.js';
import { errAlert } from './errAlert.js';

//variables to display weather
let weather,
  temp,
  humidity,
  city = '';

//element
const info = document.querySelector('.info');
const frame = document.querySelector('.frame');

//frame for User who doesn't have Weather Data
const frame1 = `<div class="info-txt"><i class="fas fa-plus emoji-plus "></i> GET<br/> Weather</div>`;
//frame of form to get Weather
const frame2 = `
        <form class="place-form">
          <input class="placeInput" type="text" placeholder="Name of City" name="city" required=""/>
          <button type="submit">Submit</button>
        </form>
        `;
//frame for User who has Weather Data
const frame3 = () => `
        <div class="weather" >
          <div>${weather}, ${temp}&#8451;<br/>${humidity}&#37; Humidity</div>
          <div>at ${city}</div>
        </div>`;

const init = async () => {
  frame.innerHTML = frame1; //when User doesn't have Weather Data
  frame.firstChild.addEventListener('click', formVisible);
  try {
    const cityData = await getWeather();
    if (cityData.errMsg) {
      errAlert(cityData.errMsg, 3500);
      return;
    } else if (cityData.city) {
      getWeatherAPI(cityData.city); //when User has Weather Data
    }
  } catch (err) {
    console.log(err);
  }
};

//funnction when Mouse is on the Weather div
const hover = () => {
  const divExist = frame.querySelector('.change-btn');
  if (divExist) {
    divExist.classList.remove('dp-none');
    return;
  }
  const div = document.createElement('div');
  div.innerText = 'Change';
  div.classList.add('change-btn');
  div.addEventListener('click', formVisible);
  frame.append(div);
};

const hoverOut = () => {
  const divExist = frame.querySelector('.change-btn');

  if (divExist) {
    divExist.classList.add('dp-none');
  }
};

const formVisible = () => {
  frame.innerHTML = frame2;
  //Event at Line 117
  info.removeEventListener('mouseenter', hover);
  info.removeEventListener('mouseleave', hoverOut);

  const weatherForm = document.querySelector('.place-form');
  weatherForm.addEventListener('submit', onSubmit);
};

const onSubmit = (e) => {
  e.preventDefault();
  let input = document.querySelector('.placeInput').value;
  getWeatherAPI(input);
  input = '';
};

const getWeatherAPI = async (value) => {
  try {
    const res = await getAPI(value);
    const { error = '', current = '', location = '' } = res;

    if (error) {
      errAlert(error.info, 3500);
      return;
    }

    const data = {
      temp: current.temperature,
      weather: current.weather_descriptions[0],
      humidity: current.humidity,
      city: location.name + ', ' + location.country,
    };

    const errData = await setWeather(value); //set City of User Data in firestore.
    if (errData.errMsg) {
      errAlert(errData.errMsg, 3500);
      return;
    }
    weather = data.weather;
    temp = data.temp;
    humidity = data.humidity;
    city = data.city;

    frame.innerHTML = frame3();

    //If mouse is entered, display turns into Change Button
    info.addEventListener('mouseenter', hover);
    info.addEventListener('mouseleave', hoverOut);
  } catch (err) {
    console.log(err);
  }
};

window.addEventListener('DOMContentLoaded', init);
