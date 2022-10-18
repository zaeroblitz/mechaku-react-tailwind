import axios from 'axios';

const TRANSACTION_API = 'https://mechaku-server.zaerodev.my.id/api/transaction';

export async function postTransactionData(data) {
  try {
    const response = await axios.post(TRANSACTION_API, data);

    return response.data;
  } catch (err) {
    throw err.message;
  }
}

export async function getTransactionDataByUser(userId) {
  try {
    const response = await axios.get(`${TRANSACTION_API}/user/${userId}`);
    return response.data;
  } catch (err) {
    throw err.message;
  }
}

export async function getTransactionDataById(id) {
  try {
    const response = await axios.get(`${TRANSACTION_API}/${id}`);
    return response.data;
  } catch (err) {
    throw err.message;
  }
}
