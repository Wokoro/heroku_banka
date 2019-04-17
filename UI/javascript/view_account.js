window.addEventListener('DOMContentLoaded', () => {
  const tr = document.querySelectorAll('.form-holder table tbody tr');
  const infoDisplay = document.querySelector('.response .message');

  informationDisplay(infoDisplay, 'Click any record row to view details');

  tr.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      window.location = './account_record.html';
    });
  });

  function informationDisplay(display, responseMsg) {
    setTimeout((event) => {
      display.textContent = responseMsg;
      display.parentElement.classList.remove('hide');
    }, 1000);
    setTimeout((event) => {
      display.parentElement.classList.add('hide');
    }, 6000);
  }
});
