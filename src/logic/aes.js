import CryptoJS from "crypto-js/crypto-js";

const KEY = CryptoJS.enc.Utf8.parse("1234567890ABCDEF");
const IV = CryptoJS.enc.Utf8.parse("123456");

export function Encrypt(str, keyStr, ivStr) {
  let key = KEY;
  let iv = IV;

  if (keyStr && ivStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr);
    iv = CryptoJS.enc.Utf8.parse(ivStr);
  }

  let srcs = CryptoJS.enc.Utf8.parse(str);
  var encrypt = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Base64.stringify(encrypt.ciphertext);
}

export function Decrypt(str, keyStr, ivStr) {
  let key = KEY;
  let iv = IV;

  if (keyStr && ivStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr);
    iv = CryptoJS.enc.Utf8.parse(ivStr);
  }

  let base64 = CryptoJS.enc.Base64.parse(str);
  let src = CryptoJS.enc.Base64.stringify(base64);

  var decrypt = CryptoJS.AES.decrypt(src, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}
