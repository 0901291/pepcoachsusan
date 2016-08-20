export default function typeWriter(block = false) {
  const logo = document.querySelector('.slogan-logo');

  if(block) { // Don't perform type writer animation, but show text
    logo.classList.add('slogan-on');
    return;
  }

  const $logo = $(logo);
  const text = $logo.text();

  const length = text.length;
  let timeOut;
  let character = 0;
  showTypeWriter();

  function showTypeWriter() {
    timeOut = setTimeout(function () {
      logo.classList.add('slogan-on');
      character++;
      const type = text.substring(0, character);
      $logo.text(type);
      showTypeWriter();

      if (character == length) {
        clearTimeout(timeOut);
      }
    }, 25);
  };
};
