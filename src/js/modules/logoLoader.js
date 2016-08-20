export default function logoLoader($circle) {
  const fromHidden = -90;

  function topAlign(degrees) {
    return degrees - 45;
  }

  function rotate(el, degrees) {
    const d = topAlign(degrees || 0);
    el.css(
      'transform', `rotate(${d}deg)`,
      '-webkit-transform', `rotate(${d}deg)`,
      '-moz-transform', `rotate(${d}deg)`,
      '-ms-transform', `rotate(${d}deg)`,
      '-o-transform', `rotate(${d}deg)`
    );
  }

  function circle(el, normalisedValue) {
    const degrees = normalisedValue * 360;
    let counter = 1;
    el.find('.arc__q').each((k, v) => {
      const angle = Math.min(counter * 90, degrees);
      rotate($(v), fromHidden + angle);
      counter++;
    });
    if(degrees > 90) {
      el.find('.arc__cover').css('display', 'none');
    }
  }

  function animate(el, normalisedValue, current) {
    current = current || 0;
    circle(el, current);
    if(current < normalisedValue) {
      current += 0.004;
      setTimeout(() => { animate(el, normalisedValue, current); }, 1);
    }
  }

  animate($circle, 1);
  $circle.addClass('init');
};