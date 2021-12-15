document.addEventListener('DOMContentLoaded', () => {
  const alertSignin = document.querySelector(".signinAlert");
  alertSignin.style.display = 'none';
  // eslint-disable-next-line node/no-unsupported-features/node-builtins
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('error');
  if(myParam == "Password_Username_Incorrect") {
    alertSignin.style.display = 'block';
  }
})