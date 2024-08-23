const BASE_URL = 'https://spacez.onrender.com';

export const getURL = {
  getIDTServerList: `${BASE_URL}/GET_TblITSList`
}

export const postURL = {
  getPersonalDetails: `${BASE_URL}/getpersonaldatails`,
  login: `${BASE_URL}/login`
}

export const fatchedGetRequest = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'GET'
    })
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    return await response.json()
  }
  catch (e) {
    throw new Error(`Error fetching data: ${e.message}`);
  }
}

export const fatchedPostRequest = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}
