import {ToastAndroid} from 'react-native';
const sendRequest = async (url, method, body) => {
  try {
    const response = await fetch(url, {
      method,
      body: body && JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
      },
    });
    if (!response.ok) throw Error();
    return await response.json();
  } catch (err) {
    ToastAndroid.show('Please connect to network!', 3000);
  }
};

export default sendRequest;
