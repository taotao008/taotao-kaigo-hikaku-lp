// DOMContentLoaded may have already fired (script is at end of body)
(function () {
  // --- Shared Template: Ranking Card Tabs ---
  var RANKING_TAB_LABELS = ['総合', '取り扱い求人', 'サービス内容'];

  function normalizeRankingTabHeader(header) {
    var tabItems = Array.from(header.querySelectorAll('li'));
    if (!tabItems.length) return;
    if (tabItems.length !== RANKING_TAB_LABELS.length) {
      console.warn(
        '[ranking tabs] tab count mismatch:',
        'expected=' + RANKING_TAB_LABELS.length,
        'actual=' + tabItems.length,
        header
      );
    }

    tabItems.forEach(function (item, index) {
      var label = RANKING_TAB_LABELS[index];
      if (!label) return;
      var p = item.querySelector('p');
      if (p) p.textContent = label;
    });
  }

  function markRankingEditableFields() {
    document.querySelectorAll('.ranking__card[id^="rank"]').forEach(function (card) {
      var rankId = card.id || '';
      var rankNumber = rankId.replace('rank', '');
      if (!rankNumber) return;

      card.setAttribute('data-codex-rank', rankNumber);

      var agentName = card.querySelector('.ranking__cardTitle .cta-title');
      if (agentName) {
        agentName.setAttribute('data-codex-field', 'agent-name');
        agentName.setAttribute('data-codex-rank', rankNumber);
      }

      var catchCopy = card.querySelector('.ranking__cardCatchCopy');
      if (catchCopy) {
        catchCopy.setAttribute('data-codex-field', 'catch-copy');
        catchCopy.setAttribute('data-codex-rank', rankNumber);
      }

      var score = card.querySelector('.ranking__cardScoreArea .ranking__cardScore');
      if (score) {
        score.setAttribute('data-codex-field', 'score');
        score.setAttribute('data-codex-rank', rankNumber);
      }

      var photo = card.querySelector('.ranking__cardBnr img');
      if (photo) {
        photo.setAttribute('data-codex-field', 'photo');
        photo.setAttribute('data-codex-rank', rankNumber);
      }

      var featureTitle = card.querySelector('.ranking__cardPointTitle h3');
      if (featureTitle) {
        featureTitle.setAttribute('data-codex-field', 'feature-title');
        featureTitle.setAttribute('data-codex-rank', rankNumber);
      }

      card.querySelectorAll('.ranking__cardPointDetail li p').forEach(function (item, index) {
        item.setAttribute('data-codex-field', 'feature-item');
        item.setAttribute('data-codex-rank', rankNumber);
        item.setAttribute('data-codex-index', String(index + 1));
      });

      card.querySelectorAll('.ranking__cardTabContent').forEach(function (content, index) {
        content.setAttribute('data-codex-field', 'content-tab');
        content.setAttribute('data-codex-rank', rankNumber);
        content.setAttribute('data-codex-tab-index', String(index + 1));

        content.querySelectorAll('dt').forEach(function (dt, dtIndex) {
          dt.setAttribute('data-codex-field', 'content-label');
          dt.setAttribute('data-codex-rank', rankNumber);
          dt.setAttribute('data-codex-tab-index', String(index + 1));
          dt.setAttribute('data-codex-index', String(dtIndex + 1));
        });

        content.querySelectorAll('dd').forEach(function (dd, ddIndex) {
          dd.setAttribute('data-codex-field', 'content-value');
          dd.setAttribute('data-codex-rank', rankNumber);
          dd.setAttribute('data-codex-tab-index', String(index + 1));
          dd.setAttribute('data-codex-index', String(ddIndex + 1));
        });
      });

      card.querySelectorAll('.ranking__noticeTextsItem').forEach(function (notice, index) {
        notice.setAttribute('data-codex-field', 'notice-item');
        notice.setAttribute('data-codex-rank', rankNumber);
        notice.setAttribute('data-codex-index', String(index + 1));
      });

      card.querySelectorAll('.review__content').forEach(function (reviewItem, index) {
        reviewItem.setAttribute('data-codex-field', 'review-item');
        reviewItem.setAttribute('data-codex-rank', rankNumber);
        reviewItem.setAttribute('data-codex-index', String(index + 1));

        var reviewTitle = reviewItem.querySelector('.review__title');
        if (reviewTitle) {
          reviewTitle.setAttribute('data-codex-field', 'review-title');
          reviewTitle.setAttribute('data-codex-rank', rankNumber);
          reviewTitle.setAttribute('data-codex-index', String(index + 1));
        }

        var reviewText = reviewItem.querySelector('.review__text');
        if (reviewText) {
          reviewText.setAttribute('data-codex-field', 'review-text');
          reviewText.setAttribute('data-codex-rank', rankNumber);
          reviewText.setAttribute('data-codex-index', String(index + 1));
        }

        var reviewScore = reviewItem.querySelector('.review__ratingBox span');
        if (reviewScore) {
          reviewScore.setAttribute('data-codex-field', 'review-score');
          reviewScore.setAttribute('data-codex-rank', rankNumber);
          reviewScore.setAttribute('data-codex-index', String(index + 1));
        }
      });

      card.querySelectorAll('.ranking__ctaBox a').forEach(function (cta, index) {
        cta.setAttribute('data-codex-field', 'cta-link');
        cta.setAttribute('data-codex-rank', rankNumber);
        cta.setAttribute('data-codex-index', String(index + 1));

        var ctaMainText = cta.querySelector('.text');
        if (ctaMainText) {
          ctaMainText.setAttribute('data-codex-field', 'cta-main-text');
          ctaMainText.setAttribute('data-codex-rank', rankNumber);
          ctaMainText.setAttribute('data-codex-index', String(index + 1));
        }

        var ctaSubText = cta.querySelector('.sub-text');
        if (ctaSubText) {
          ctaSubText.setAttribute('data-codex-field', 'cta-sub-text');
          ctaSubText.setAttribute('data-codex-rank', rankNumber);
          ctaSubText.setAttribute('data-codex-index', String(index + 1));
        }
      });
    });
  }

  // --- Compare Table Tab Switching ---
  var compareTabHeader = document.querySelector('.compare_tableHeader');
  if (compareTabHeader) {
    var compareTabs = compareTabHeader.querySelectorAll('li');
    var compareTables = compareTabHeader.parentElement.querySelectorAll('.compare_tableBody > table');

    compareTabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        compareTabs.forEach(function (t) { t.classList.remove('selectTab'); });
        tab.classList.add('selectTab');
        compareTables.forEach(function (t) { t.style.display = 'none'; });
        if (compareTables[index]) compareTables[index].style.display = '';
      });
    });
  }

  // --- Ranking Card Tab Header Templating ---
  document.querySelectorAll('.ranking__cardTabHeader').forEach(function (header) {
    normalizeRankingTabHeader(header);
  });

  // --- Ranking Editable Field Markers ---
  markRankingEditableFields();

  // --- Ranking Card Tab Switching (event delegation) ---
  document.addEventListener('click', function (event) {
    var tab = event.target.closest('.ranking__cardTabHeader li');
    if (!tab) return;

    var header = tab.parentElement;
    if (!header) return;

    var tabs = Array.from(header.querySelectorAll('li'));
    var index = tabs.indexOf(tab);
    if (index < 0) return;

    var tabArea = header.parentElement;
    if (!tabArea) return;

    var contents = tabArea.querySelectorAll('.ranking__cardTabContent');
    tabs.forEach(function (t) { t.classList.remove('selectTab'); });
    tab.classList.add('selectTab');
    contents.forEach(function (c) { c.style.display = 'none'; });
    if (contents[index]) contents[index].style.display = '';
  });

  // --- Swiper Initialization ---
  if (document.querySelector('.swiper')) {
    new Swiper('.swiper', {
      slidesPerView: 1.35,
      spaceBetween: 20,
      centeredSlides: true,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        768: {
          slidesPerView: 1.35,
          spaceBetween: 30
        }
      }
    });
  }

  // --- Page Top Button ---
  var pagetop = document.querySelector('.pagetop');
  if (pagetop) {
    window.addEventListener('scroll', function () {
      pagetop.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    pagetop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Watch More (もっと見る) ---
  var watchMoreBtn = document.querySelector('.compare__tableWatchMoreBtn');
  var watchMoreWrap = document.querySelector('.compare__tableWatchMore');
  var tableBody = document.querySelector('.compare_tableBody');
  if (watchMoreBtn && tableBody) {
    watchMoreBtn.addEventListener('click', function () {
      tableBody.classList.add('is-expanded');
      if (watchMoreWrap) watchMoreWrap.style.display = 'none';
    });
  }

  // --- Help Tooltip ---
  document.querySelectorAll('.compare_tableHelp').forEach(function (icon) {
    icon.addEventListener('click', function (e) {
      e.stopPropagation();
      var msg = icon.getAttribute('data-help') || '';
      if (msg) alert(msg);
    });
  });

  // --- Table Sort ---
  document.querySelectorAll('.compare_tableSort').forEach(function (th) {
    th.addEventListener('click', function () {
      var table = th.closest('table');
      if (!table) return;
      var headerRow = th.parentElement;
      var colIndex = Array.from(headerRow.children).indexOf(th);
      var tbody = table.querySelector('tbody');
      if (!tbody) return;
      var rows = Array.from(tbody.querySelectorAll('tr'));
      var isAsc = th.classList.contains('js-sortAsc');

      rows.sort(function (a, b) {
        var aText = (a.children[colIndex] && a.children[colIndex].textContent.trim()) || '';
        var bText = (b.children[colIndex] && b.children[colIndex].textContent.trim()) || '';
        var aNum = parseFloat(aText.replace(/[^0-9.]/g, ''));
        var bNum = parseFloat(bText.replace(/[^0-9.]/g, ''));
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return isAsc ? aNum - bNum : bNum - aNum;
        }
        return isAsc ? aText.localeCompare(bText) : bText.localeCompare(aText);
      });

      rows.forEach(function (row) { tbody.appendChild(row); });
      document.querySelectorAll('.compare_tableSort').forEach(function (s) { s.classList.remove('js-sortAsc'); });
      if (!isAsc) th.classList.add('js-sortAsc');
    });
  });

  // --- Review Open (すべての口コミを見る) ---
  document.querySelectorAll('.review__open').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var contents = btn.closest('.review__contents');
      if (contents) {
        contents.classList.toggle('is-open');
        btn.style.display = 'none';
      }
    });
  });

})();
