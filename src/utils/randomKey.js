export function randomKey() {
  let charsetAll = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
  let size = 20;

  let pass = '';
  for(let i = 0, n = charsetAll.length; i < size; i++){
    pass += charsetAll.charAt(Math.floor(Math.random() * n))
  };

  return pass;
};