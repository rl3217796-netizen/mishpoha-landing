/* Adds the hand-made pieces of the "game night on the table" design. Purchase flow untouched. */
(function () {
  var hero = document.querySelector('.lp3-hero'); if (!hero) return;
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; }

  /* hero: text column + the table */
  var text = el('div', 'cr-hero-text'); while (hero.firstChild) text.appendChild(hero.firstChild); hero.appendChild(text);
  var mark = text.querySelector('.lp3-hero__mark'); if (mark) { var st = el('span', 'cr-sticker'); mark.parentNode.insertBefore(st, mark); st.appendChild(mark); }
  var tag = text.querySelector('.lp3-hero__tagline');
  if (tag && tag.textContent.indexOf('המשפחה') > -1) tag.innerHTML = tag.textContent.replace('המשפחה!', '<span class="cr-circle">המשפחה!<svg viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden="true"><path d="M14 44C10 20 58 6 108 7c52 1 84 15 81 36-3 22-49 31-93 30C50 72 12 62 13 40c1-13 18-23 40-27"/></svg></span>');

  var P = { 1: [[50, 50]], 2: [[28, 28], [72, 72]], 3: [[26, 26], [50, 50], [74, 74]], 4: [[28, 28], [72, 28], [28, 72], [72, 72]], 5: [[26, 26], [74, 26], [50, 50], [26, 74], [74, 74]] };
  function pips(n) { return P[n].map(function (p) { return '<s style="--x:' + p[0] + '%;--y:' + p[1] + '%"></s>'; }).join(''); }
  var cards = [['מי אמר?', 'מ', '#8654ad', -23, ''], ['?', '?', '#ff6a21', 0, 'cr-card--q'], ['סבתא', 'ס', '#8654ad', 23, '']];
  var table = el('div', 'cr-table'); table.setAttribute('aria-hidden', 'true');
  cards.forEach(function (c, n) {
    var d = el('div', 'cr-card ' + (c[4] === 'pips' ? '' : c[4]), '<u>' + c[1] + '</u><u>' + c[1] + '</u>' + (c[4] === 'pips' ? '<i><s></s><s></s><s></s></i>' : '<b>' + c[0] + '</b>'));
    d.style.cssText = '--r:' + c[3] + 'deg;--n:' + n + ';--c:' + c[2]; table.appendChild(d);
  });
  [[5, '8%', '80%', 14, '', '1s'], [3, '76%', '82%', -18, ' cr-die--o', '1.15s']].forEach(function (d) {
    var e = el('div', 'cr-die' + d[4], pips(d[0])); e.style.cssText = 'left:' + d[1] + ';top:' + d[2] + ';--r:' + d[3] + 'deg;--dl:' + d[5]; table.appendChild(e);
  });
  [['30%', '90%', '#ff6a21'], ['60%', '91%', '#8654ad'], ['92%', '66%', '#fbf2e3']].forEach(function (t) {
    var e = el('div', 'cr-token'); e.style.cssText = 'left:' + t[0] + ';top:' + t[1] + ';--c:' + t[2]; table.appendChild(e);
  });
  hero.appendChild(table);

  /* on phones the fixed "refer" pill must not cover the hero buttons */
  var pill = document.getElementById('refer-tab'), ctas = hero.querySelector('.lp3-hero__ctas');
  if (pill && ctas && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { pill.classList.toggle('cr-hide', en[0].isIntersecting && window.innerWidth <= 760); }, { threshold: 0.05 }).observe(ctas);
  }

  /* steps become dominoes: pips on top, the number below */
  Array.prototype.forEach.call(document.querySelectorAll('.lp3-step-num'), function (num) {
    var n = parseInt(num.textContent, 10); if (!P[n]) return;
    num.setAttribute('data-n', n); num.setAttribute('aria-label', 'שלב ' + n);
    num.innerHTML = P[n].map(function (p) { return '<s style="--x:' + p[0] + '%;--y:' + (p[1] / 2) + '%"></s>'; }).join('');
  });
})();
