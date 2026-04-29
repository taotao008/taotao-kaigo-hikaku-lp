// DOMContentLoaded may have already fired (script is at end of body)
(function () {

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

  // --- Ranking Card Tab Switching ---
  document.querySelectorAll('.ranking__cardTabHeader').forEach(function (header) {
    var tabs = header.querySelectorAll('li');
    var contents = header.parentElement.querySelectorAll('.ranking__cardTabContent');

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('selectTab'); });
        tab.classList.add('selectTab');
        contents.forEach(function (c) { c.style.display = 'none'; });
        if (contents[index]) contents[index].style.display = '';
      });
    });
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
