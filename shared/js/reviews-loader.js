(function () {
  'use strict';

  var TITLE_TO_SLUG = {
    'レバウェル介護': 'rebawell-kaigo',
    'マイナビ介護職': 'mynavi-kaigo',
    'ユアジョブ介護': 'yourjob-kaigo',
    '介護ではたらこ': 'kaigo-de-hatarako',
    'スタッフサービス・メディカル': 'staff-medical'
  };

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }

  function renderText(text) {
    return escapeHtml(text).replace(/\n/g, '<br>');
  }

  function renderReview(review, hidden) {
    var score = Math.round(review.rating * 10);
    var hiddenAttr = hidden ? ' hidden' : '';
    return (
      '<div class="review__content" data-v-19fc0f5c=""' + hiddenAttr + '>' +
      '<p class="review__title" data-v-19fc0f5c=""></p>' +
      '<div class="review__ratingBox" data-v-19fc0f5c="">' +
      '<div data-score="' + score + '%" class="l-star" data-v-19fc0f5c=""></div>' +
      '<span data-v-19fc0f5c="">' + review.rating + '</span>' +
      '</div>' +
      '<p class="review__text" data-v-19fc0f5c="">' + renderText(review.text) + '</p>' +
      '</div>'
    );
  }

  function renderSection(reviews) {
    var html = reviews.map(function (r, i) { return renderReview(r, i >= 2); }).join('');
    if (reviews.length > 2) {
      html += '<button class="review__open" onclick="const r=this.closest(\'.review__contents\');r.querySelectorAll(\'.review__content[hidden]\').forEach(e=>e.removeAttribute(\'hidden\'));this.style.display=\'none\';" style="display:;" data-v-19fc0f5c=""></button>';
    } else {
      html += '<button class="review__open" style="display:none;" data-v-19fc0f5c=""></button>';
    }
    return html;
  }

  function applyReviews(data) {
    var grouped = {};
    (data.reviews || []).forEach(function (r) {
      (grouped[r.service_slug] = grouped[r.service_slug] || []).push(r);
    });

    var sections = document.querySelectorAll('.review');
    sections.forEach(function (section) {
      var h3 = section.querySelector('h3');
      if (!h3) return;
      var title = h3.textContent.replace(/の口コミ$/, '').trim();
      var slug = TITLE_TO_SLUG[title];
      if (!slug) return;
      var contents = section.querySelector('.review__contents');
      if (!contents) return;
      contents.innerHTML = renderSection(grouped[slug] || []);
    });
  }

  function init() {
    fetch('./data/reviews.json', { cache: 'no-cache' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(applyReviews)
      .catch(function (err) {
        console.error('[reviews-loader] failed to load reviews.json', err);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
