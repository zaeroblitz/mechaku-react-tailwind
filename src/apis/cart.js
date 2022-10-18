import axios from 'axios';

const CART_API = 'https://mechaku-server.zaerodev.my.id/api/carts';

export async function addCartItem(token, data) {
  try {
    const response = await axios({
      method: 'post',
      url: CART_API,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    throw err.message;
  }
}

export async function getCartItemByUser(token, userId) {
  try {
    const response = await axios({
      method: 'get',
      url: `${CART_API}/user/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    throw err.message;
  }
}

export async function incrementCartItem(token, itemId) {
  try {
    const response = await axios({
      method: 'put',
      url: `${CART_API}/inc/${itemId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    throw err.message;
  }
}

export async function decrementCartItem(token, itemId) {
  try {
    const response = await axios({
      method: 'put',
      url: `${CART_API}/dec/${itemId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    throw err.message;
  }
}

export async function removeCartItem(token, userId, data) {
  try {
    const response = await axios({
      method: 'put',
      url: `${CART_API}/${userId}`,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    throw err.message;
  }
}
