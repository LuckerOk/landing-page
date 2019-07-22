(function() {
  const me = {};

  me.toggleToActiveLink = target => {
    const links = document.querySelectorAll('.nav__link');
    const showedSection = target.dataset.link;

    links.forEach(link => {
      if (link.classList.contains('nav__link--active')) {
        link.classList.remove('nav__link--active');
      }
    });

    target.classList.add('nav__link--active');
    scrollToActiveSection(showedSection);
  };

  const scrollToActiveSection = showedSection => {
    const section = document.querySelector('.' + showedSection);
    const coords = section.getBoundingClientRect();
    const animateTime = 0.4;

    const timerId = setInterval(() => {
      if (document.documentElement.scrollTop < coords.top) {
        window.scrollBy(0, 10);
      } else {
        clearInterval(timerId);
      }
    }, animateTime || 0.5);
  };

  I.navigation = me;
}());
