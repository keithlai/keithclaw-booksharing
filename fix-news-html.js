const fs = require('fs');
const p = 'C:\\Users\\Administrator\\workspace-dev\\books\\html\\book-browser-material.html';
let c = fs.readFileSync(p, 'utf8');

// 1. Add CSS for burger menu, news, and mode switching
const cssInsert = `
/* ======= Burger Menu ======= */
.burger-btn{position:fixed;top:16px;left:16px;z-index:998;background:var(--md-sys-color-surface-container);border:1px solid var(--md-sys-color-outline-variant);border-radius:50%;width:44px;height:44px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--md-sys-color-on-surface);font-size:22px;transition:all .2s;box-shadow:0 2px 8px rgba(0,0,0,0.15)}
.burger-btn:hover{background:var(--md-sys-color-surface-container-high)}
.burger-menu{position:fixed;top:0;left:-280px;width:260px;height:100vh;background:var(--md-sys-color-surface-container);border-right:1px solid var(--md-sys-color-outline-variant);z-index:997;transition:left .25s ease;padding:20px 0;box-shadow:2px 0 20px rgba(0,0,0,0.2)}
.burger-menu.open{left:0}
.burger-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.4);z-index:996;display:none}
.burger-overlay.open{display:block}
.burger-menu .menu-item{display:flex;align-items:center;gap:14px;padding:14px 20px;cursor:pointer;color:var(--md-sys-color-on-surface);font-size:15px;font-weight:500;transition:background .15s;border:none;background:none;width:100%;text-align:left}
.burger-menu .menu-item:hover{background:var(--md-sys-color-surface-container-high)}
.burger-menu .menu-item.active{background:var(--md-sys-color-primary-container);color:var(--md-sys-color-on-primary-container)}
.burger-menu .menu-icon{font-size:22px}
.burger-menu .menu-divider{height:1px;background:var(--md-sys-color-outline-variant);margin:12px 20px}
.burger-menu .menu-header{font-size:12px;color:var(--md-sys-color-on-surface-variant);padding:8px 20px 4px;text-transform:uppercase;letter-spacing:1px}
/* ======= Mode Sections ======= */
.mode-section{display:none}
.mode-section.active{display:block}
/* ======= News Cards ======= */
.news-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px}
.news-card{padding:16px;background:var(--md-sys-color-surface-container-low);border:1px solid var(--md-sys-color-outline-variant);border-radius:16px;cursor:pointer;transition:all .2s}
.news-card:hover{border-color:var(--md-sys-color-primary);background:var(--md-sys-color-surface-container-high)}
.news-card .nc-source{font-size:11px;color:var(--md-sys-color-on-surface-variant);margin-bottom:4px}
.news-card .nc-source .src-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:600}
.news-card .nc-title{font-size:15px;font-weight:600;line-height:1.4;margin-bottom:6px;color:var(--md-sys-color-on-surface)}
.news-card .nc-summary{font-size:13px;color:var(--md-sys-color-on-surface-variant);line-height:1.5}
.news-card .nc-time{font-size:11px;color:var(--md-sys-color-on-surface-variant);margin-top:8px}
/* ======= News Article Modal ======= */
.news-modal-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:999;display:none;align-items:center;justify-content:center}
.news-modal-overlay.open{display:flex}
.news-modal{background:var(--md-sys-color-surface-container);border-radius:28px;width:90%;max-width:640px;max-height:85vh;overflow-y:auto;box-shadow:0 8px 40px rgba(0,0,0,0.3)}
.news-modal-head{padding:20px 24px 12px;border-bottom:1px solid var(--md-sys-color-outline-variant);position:sticky;top:0;background:var(--md-sys-color-surface-container);border-radius:28px 28px 0 0}
.news-modal-head h2{font-size:20px;font-weight:600;line-height:1.4;margin-bottom:8px}
.news-modal-head .nm-meta{font-size:12px;color:var(--md-sys-color-on-surface-variant);display:flex;gap:12px;flex-wrap:wrap}
.news-modal-head .nm-meta span{display:inline-flex;align-items:center;gap:4px}
.news-modal-body{padding:20px 24px}
.news-modal-body .nm-detail{font-size:15px;line-height:1.85;margin-bottom:20px;color:var(--md-sys-color-on-surface)}
.news-modal-body .nm-takeaways{background:var(--md-sys-color-surface-container-high);border-radius:16px;padding:16px 20px;margin-bottom:20px}
.news-modal-body .nm-takeaways h3{font-size:14px;font-weight:600;margin-bottom:12px;color:var(--md-sys-color-primary)}
.news-modal-body .nm-takeaways .nm-t{display:flex;gap:10px;margin-bottom:10px;font-size:14px;line-height:1.6}
.news-modal-body .nm-takeaways .nm-t:last-child{margin-bottom:0}
.news-modal-body .nm-takeaways .nm-t-num{font-weight:700;color:var(--md-sys-color-primary);min-width:20px}
.news-modal-body .nm-link{display:inline-flex;align-items:center;gap:6px;padding:8px 18px;background:var(--md-sys-color-primary-container);color:var(--md-sys-color-on-primary-container);border-radius:20px;text-decoration:none;font-size:13px;font-weight:500}
.news-modal-close{background:none;border:none;color:var(--md-sys-color-on-surface-variant);cursor:pointer;font-size:22px;padding:4px;position:absolute;top:16px;right:20px}
.news-modal-head{position:relative}
@media(max-width:600px){.burger-btn{top:12px;left:12px;width:38px;height:38px;font-size:18px}.news-grid{grid-template-columns:1fr}.news-modal{width:95%;border-radius:20px}}
`;

c = c.replace('/* ======= M3 Tabs', cssInsert + '\n/* ======= M3 Tabs');

// 2. Add burger menu HTML after opening body tag
const burgerHtml = `
<!-- ======= Burger Menu ======= -->
<button class="burger-btn" id="burgerBtn" onclick="toggleBurger()">&#x2630;</button>
<div class="burger-overlay" id="burgerOverlay" onclick="closeBurger()"></div>
<div class="burger-menu" id="burgerMenu">
  <div class="menu-header">Navigation</div>
  <button class="menu-item active" data-mode="books" onclick="switchMode('books')">
    <span class="menu-icon">&#x1F4DA;</span> Book Sharing
  </button>
  <button class="menu-item" data-mode="news" onclick="switchMode('news')">
    <span class="menu-icon">&#x1F4F0;</span> 新聞頻道
  </button>
  <div class="menu-divider"></div>
  <div style="padding:14px 20px;font-size:12px;color:var(--md-sys-color-on-surface-variant)">
    &#x1F99E; Keithclaw Booksharing
  </div>
</div>

`;

c = c.replace('</head>\n<body>', '</head>\n<body>' + burgerHtml);

// 3. Wrap book content in mode-section
c = c.replace(
  '  <!-- Difficulty Filter Chips -->',
  '  <div class="mode-section active" id="modeBooks">\n  <!-- Difficulty Filter Chips -->'
);

// 4. Add news section and close book mode section before </body>
c = c.replace(
  '</body>\n</html>',
  '  </div>\n\n  <!-- ======= News Mode Section ======= -->\n  <div class="mode-section" id="modeNews">\n    <div style="padding:0 0 16px">\n      <h2 style="font-size:22px;font-weight:700">&#x1F4F0; 新聞頻道</h2>\n      <div class="tab-bar" id="newsTabs" role="tablist"></div>\n      <div class="news-grid" id="newsGrid"><div class="spinner"></div></div>\n    </div>\n  </div>\n\n  <!-- ======= News Article Modal ======= -->\n  <div class="news-modal-overlay" id="newsModal" onclick="if(event.target===this)closeNewsModal()">\n    <div class="news-modal">\n      <div class="news-modal-head" id="newsModalHead">\n        <button class="news-modal-close" onclick="closeNewsModal()">&#x2715;</button>\n        <h2 id="newsModalTitle"></h2>\n        <div class="nm-meta" id="newsModalMeta"></div>\n      </div>\n      <div class="news-modal-body" id="newsModalBody">\n        <div class="spinner"></div>\n      </div>\n    </div>\n  </div>\n\n</body>\n</html>'
);

// 5. Add JS functions for burger menu, news, and switching
const jsInsert = `
// ===== Burger Menu & Mode Switching =====
var currentMode = 'books';
function toggleBurger() {
  document.getElementById('burgerMenu').classList.toggle('open');
  document.getElementById('burgerOverlay').classList.toggle('open');
}
function closeBurger() {
  document.getElementById('burgerMenu').classList.remove('open');
  document.getElementById('burgerOverlay').classList.remove('open');
}
function switchMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.menu-item').forEach(function(m) { m.classList.remove('active'); });
  document.querySelector('.menu-item[data-mode="' + mode + '"]').classList.add('active');
  document.querySelectorAll('.mode-section').forEach(function(s) { s.classList.remove('active'); });
  document.getElementById('mode' + mode.charAt(0).toUpperCase() + mode.slice(1)).classList.add('active');
  closeBurger();
  if (mode === 'news') loadNews();
}

// ===== News =====
var newsData = [];
var newsActiveCat = '';
var newsCatColors = {"國際時事":"#1a73e8","香港時事":"#e83e8c","財經新聞":"#f0b429"};

async function loadNews() {
  var grid = document.getElementById('newsGrid');
  try {
    var r = await fetch('/api/news/list');
    var list = await r.json();
    newsData = list;
    buildNewsTabs();
    renderNews();
  } catch(e) {
    grid.innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted)">Failed to load news</div>';
  }
}

function buildNewsTabs() {
  var cats = [...new Set(newsData.map(function(a) { return a.cat; }))];
  var html = '<button class="m3-tab active" data-cat="">全部</button>';
  cats.forEach(function(c) {
    var col = newsCatColors[c] || '#888';
    html += '<button class="m3-tab" data-cat="' + c + '"><span class="dot" style="background:' + col + '"></span>' + c + '</button>';
  });
  var el = document.getElementById('newsTabs');
  el.innerHTML = html;
  el.onclick = function(e) {
    var btn = e.target.closest('.m3-tab');
    if (!btn) return;
    el.querySelectorAll('.m3-tab').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    newsActiveCat = btn.dataset.cat;
    renderNews();
  };
}

function renderNews() {
  var filtered = newsData;
  if (newsActiveCat) filtered = filtered.filter(function(a) { return a.cat === newsActiveCat; });
  var grid = document.getElementById('newsGrid');
  if (filtered.length === 0) {
    grid.innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted)">No articles</div>';
    return;
  }
  grid.innerHTML = '<div class="news-grid">' +
    filtered.map(function(a) {
      var col = newsCatColors[a.cat] || '#888';
      var time = a.time ? new Date(a.time).toLocaleDateString('zh-HK', {month:'short',day:'numeric'}) : '';
      return '<div class="news-card" onclick="openNewsArticle(\\'' + a.id + '\\')">' +
        '<div class="nc-source"><span class="src-badge" style="background:' + col + '20;color:' + col + '">' + a.cat + '</span> ' + a.source + '</div>' +
        '<div class="nc-title">' + a.title + '</div>' +
        '<div class="nc-summary">' + a.summary + '</div>' +
        '<div class="nc-time">' + time + '</div>' +
        '</div>';
    }).join('') +
    '</div>';
}

async function openNewsArticle(id) {
  var modal = document.getElementById('newsModal');
  var title = document.getElementById('newsModalTitle');
  var meta = document.getElementById('newsModalMeta');
  var body = document.getElementById('newsModalBody');
  modal.classList.add('open');
  title.textContent = 'Loading...';
  meta.innerHTML = '';
  body.innerHTML = '<div class="spinner"></div>';
  try {
    var r = await fetch('/api/news/article?id=' + id);
    var d = await r.json();
    title.textContent = d.title;
    meta.innerHTML = '<span>&#x1F464; ' + d.source + '</span><span>&#x1F4C5; ' + new Date(d.time).toLocaleDateString('zh-HK') + '</span><span class="src-badge" style="background:' + (newsCatColors[d.category]||'#888') + '20;color:' + (newsCatColors[d.category]||'#888') + ';padding:2px 8px;border-radius:10px;font-size:10px">' + d.category + '</span>';
    var html = '<div class="nm-detail">' + d.detail + '</div>';
    if (d.takeaways && d.takeaways.length) {
      html += '<div class="nm-takeaways"><h3>&#x1F4A1; 主要得着</h3>';
      d.takeaways.forEach(function(t, i) {
        html += '<div class="nm-t"><span class="nm-t-num">' + (i+1) + '</span><span>' + t + '</span></div>';
      });
      html += '</div>';
    }
    if (d.article_url) {
      html += '<a class="nm-link" href="' + d.article_url + '" target="_blank">&#x1F517; 原文連結</a>';
    }
    body.innerHTML = html;
  } catch(e) {
    body.innerHTML = '<div style="color:#F2B8B5;text-align:center;padding:20px">Failed to load article</div>';
  }
}

function closeNewsModal() {
  document.getElementById('newsModal').classList.remove('open');
}

// Override init to check which mode was active
var origRender = render;
render = function() {
  if (currentMode === 'books') {
    document.getElementById('burgerBtn').style.display = 'flex';
    origRender();
  }
};
`;

// Insert JS before the existing render() function
c = c.replace(
  '\n// ======= Render =======',
  jsInsert + '\n// ======= Render ======='
);

fs.writeFileSync(p, c);
console.log('OK - HTML updated with burger menu and news channel');
