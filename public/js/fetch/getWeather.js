export const setWeather = async (city) => {
  const url = '/weather/setCity/' + city;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getWeather = async () => {
  const url = '/weather/getCity';
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getAPI = async (value) => {
  const url = '/weather/getApi/' + value;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
