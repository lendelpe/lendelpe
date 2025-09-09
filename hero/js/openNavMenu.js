const hamButton = document.querySelector('.ham-button');
const hamburger = hamButton.querySelector('.ham');
const navMenu = document.querySelector('.nav__menu');

function openMenu() {
  // 1) Make the element renderable
  navMenu.removeAttribute('hidden');

  // 2) Force a reflow so the browser registers the "before" state.
  //    This prevents the "pop-in" / skipped transition problem.
  //    Any of these would work:
  //    void navMenu.offsetWidth;
  //    navMenu.getBoundingClientRect();
  //    or use requestAnimationFrame twice (below)
  void navMenu.offsetWidth;

  // 3) Now add the class that triggers the CSS transition
  navMenu.classList.add('open');
}

function closeMenu() {
  // Add the transitionend listener BEFORE removing the class so we don't miss it.
  const onTransitionEnd = (e) => {
    // Make sure the event is for the nav element and a property we care about
    if (
      e.target === navMenu &&
      (e.propertyName === 'opacity' || e.propertyName === 'margin-top')
    ) {
      navMenu.setAttribute('hidden', '');
    }
  };

  navMenu.addEventListener('transitionend', onTransitionEnd, { once: true });

  // Start the closing animation
  navMenu.classList.remove('open');
}

hamButton.addEventListener('click', () => {
  const isOpen = hamButton.getAttribute('aria-expanded') === 'true';

  // accessibility attributes
  hamButton.setAttribute('aria-expanded', String(!isOpen));
  hamButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');

  if (!isOpen) {
    openMenu();
  } else {
    closeMenu();
  }

  // animate the svg hamburger
  hamburger.classList.toggle('active', !isOpen);
});
