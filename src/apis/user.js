import axios from 'axios';

const USER_URL = 'https://mechaku-server.zaerodev.my.id/api/user';
const AUTH_URL = 'https://mechaku-server.zaerodev.my.id/auth/sign-in';

export async function setSignIn(data) {
  try {
    const response = await axios({
      method: 'post',
      url: AUTH_URL,
      data,
    });

    return response.data;
  } catch (err) {
    if (err.response.status === 401) {
      throw err.response.data;
    }
    throw err.message;
  }
}

export async function getAllUser() {
  try {
    const response = await axios.get(USER_URL);

    return response.data;
  } catch (err) {
    throw err.message;
  }
}

export async function getUserById(id) {
  try {
    const response = await axios.get(`${USER_URL}/${id}`);

    return response.data;
  } catch (err) {
    throw err.message;
  }
}

export async function postUserData(data) {
  try {
    const response = await axios({
      method: 'post',
      url: USER_URL,
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (err) {
    throw err.message;
  }
}

export async function putUserData(id, data) {
  try {
    const response = await axios({
      method: 'put',
      url: `${USER_URL}/${id}`,
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (err) {
    throw err.message;
  }
}
