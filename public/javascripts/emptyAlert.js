document.addEventListener('DOMContentLoaded', () => {
  const alertEmpty = document.querySelector(".emptyAlert")
  alertEmpty.style.display = 'none';
  // eslint-disable-next-line node/no-unsupported-features/node-builtins
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('error');
  if(myParam == "Enter_Email") {
    alertEmpty.style.display = 'block';
  }
})