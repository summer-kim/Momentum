export const setWeather = async (city) => {
  const url = '/data/weather/' + city;

  try {
    await fetch(url);
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
