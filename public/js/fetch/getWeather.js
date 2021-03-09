export const setWeather = async (city) => {
  const url = '/data/weather/' + city;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getWeather = async () => {
  const url = '/data/get/weather/';
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const weatherAPI = async (value) => {
  const url =
    'https://api.weatherstack.com/current?access_key=bd459e9c00f721c07d47a7debfbbe4ff&query=$' +
    value;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
