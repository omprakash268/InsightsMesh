import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secure-key'; // 🔒 Use a strong key in real apps

export const encryptData = (data) => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  return ciphertext;
};

export const decryptData = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decrypted;
  } catch (e) {
    console.error("Decryption failed", e);
    return null;
  }
};
