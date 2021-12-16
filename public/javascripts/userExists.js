document.addEventListener('DOMContentLoaded', () => {
  const alertLogin = document.querySelector(".loginAlert")
  alertLogin.style.display = 'none';
  // eslint-disable-next-line node/no-unsupported-features/node-builtins
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('error');
  if(myParam == "Already_Exists") {
    alertLogin.style.display = 'block';
  }
})