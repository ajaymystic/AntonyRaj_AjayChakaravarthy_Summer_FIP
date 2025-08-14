console.log('SqueezeIt JS loaded');


const navToggleButton = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#navMenu');
const factsMobileHost = document.querySelector('#facts-accordion');


const factsData = [
  { title: 'Packed With Real Fruit Flavour', body: 'Every can bursts with flavour inspired by real fruits — no boring sips here!' },
  { title: '100% Recyclable Cans', body: 'Our cans are fully recyclable, so you can enjoy your drink and help the planet.' },
  { title: 'Flavours For Every Mood', body: 'From zesty Lemon Burst to sweet Peach Pop, we’ve got a flavour for every vibe.' },
  { title: 'Designed To Stand Out', body: 'Our colourful cans aren’t just drinks — they’re your accessory for fun days out.' },
  { title: 'Made For Sharing', body: 'SqueezeIt was created for friends, parties, and spontaneous adventures.' },
  { title: 'A Splash of Play in Every Sip', body: 'Our splash-style logo and bright colours match the energy you feel when you crack one open.' }
];


function isMobileView() {
  return window.matchMedia('(max-width: 767px)').matches;
}

/* ===== Nav (burger) ===== */
function handleNavToggleClick() {
  if (!navMenu || !navToggleButton) { return; }
  const isOpen = navMenu.classList.toggle('is-open');
  navToggleButton.classList.toggle('is-active', isOpen);
  navToggleButton.setAttribute('aria-expanded', String(isOpen));
}
function handleNavLinkClick(event) {
  const link = event.target.closest('a');
  if (!link || !isMobileView() || !navMenu || !navToggleButton) { return; }
  navMenu.classList.remove('is-open');
  navToggleButton.classList.remove('is-active');
  navToggleButton.setAttribute('aria-expanded', 'false');
}
function handleEscapeKey(event) {
  if (event.key !== 'Escape' || !navMenu || !navToggleButton) { return; }
  if (navMenu.classList.contains('is-open')) {
    navMenu.classList.remove('is-open');
    navToggleButton.classList.remove('is-active');
    navToggleButton.setAttribute('aria-expanded', 'false');
  }
}

/* ===== Facts (mobile-only from array) ===== */
function createFactDetailsHTML(item) {
  // I template one accordion
  return [
    '<details class="fact-acc" data-generated="true">',
      `<summary>${item.title}</summary>`,
      '<div class="fact-acc__body"><p>',
        item.body,
      '</p></div>',
    '</details>'
  ].join('');
}

function attachAccordionBehavior(scope) {
  // I keep one open at a time
  const accordions = scope.querySelectorAll('.fact-acc');
  function closeOthers(current) {
    accordions.forEach(function (d) { if (d !== current) { d.open = false; } });
  }
  function handleToggle() {
    if (!isMobileView()) { return; }
    if (this.open) { closeOthers(this); }
  }
  accordions.forEach(function (d) { d.addEventListener('toggle', handleToggle); });
}

function renderFactsIfNeeded() {
  if (!factsMobileHost) { return; }
  const hasChildren = factsMobileHost.children.length > 0;
  if (isMobileView() && !hasChildren) {
    // I render from the array
    const html = factsData.map(createFactDetailsHTML).join('');
    factsMobileHost.innerHTML = html;
    attachAccordionBehavior(factsMobileHost);
  }
  // I clean up generated items when leaving mobile
  if (!isMobileView() && hasChildren) {
    const generated = factsMobileHost.querySelectorAll('[data-generated="true"]');
    if (generated.length === factsMobileHost.children.length) {
      factsMobileHost.innerHTML = '';
    }
  }
}

function handleResize() {
  renderFactsIfNeeded();
}

/* ===== listeners (named) ===== */
if (navToggleButton) { navToggleButton.addEventListener('click', handleNavToggleClick); }
if (navMenu) { navMenu.addEventListener('click', handleNavLinkClick); }
document.addEventListener('keydown', handleEscapeKey);
window.addEventListener('resize', handleResize);


renderFactsIfNeeded();
