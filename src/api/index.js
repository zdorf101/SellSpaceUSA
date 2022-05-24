export const BASE_URL = 'https://strangers-things.herokuapp.com/api/';
export const COHORT_NAME = '2202-ftb-pt-web-pt';
export const API_URL = BASE_URL + COHORT_NAME;

export const api = async ({ url, method, token, body }) => {
  try {
    const options = {
      method: method ? method.toUpperCase() : 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    const res = await fetch(API_URL + url, options);
    const data = await res.json();
    if (data.error) throw data.error;
    return data;
  } catch (error) {
    console.error({ error });
  }
};
