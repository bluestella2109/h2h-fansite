// デフォルトデータ
const defaultMembers = [
  { id: 'jiwoo', name: 'JIWOO', jpName: 'ジウ', emoji: '🍓', comment: 'メインボーカル担当！', image: '' },
  { id: 'carmen', name: 'CARMEN', jpName: 'カルメン', emoji: '🌴', comment: 'メインダンサー！', image: '' },
  { id: 'yuha', name: 'YUHA', jpName: 'ユハ', emoji: '🎀', comment: '愛嬌リーダー♡', image: '' },
  { id: 'stella', name: 'STELLA', jpName: 'ステラ', emoji: '🧁', comment: 'ビジュアル担当', image: '' },
  { id: 'juun', name: 'JUUN', jpName: 'ジュウン', emoji: '👾', comment: 'オールラウンダー', image: '' },
  { id: 'a-na', name: 'A-NA', jpName: 'エイナ', emoji: '🌻', comment: 'いつもハッピー！', image: '' },
  { id: 'ian', name: 'IAN', jpName: 'イアン', emoji: '🫛', comment: 'クールなラッパー', image: '' },
  { id: 'ye-on', name: 'YE-ON', jpName: 'イェオン', emoji: '😊', comment: '末っ子マンネ', image: '' }
];

const defaultNews = [
  { id: 1, date: '2026.08.14', badge: 'NEW', title: '8/14(金)放送の日本テレビ系列『ZIP!』にて「CUTIE STREET」とコラボ！', link: 'https://hearts2heartsofficial.jp/', isAuto: false },
  { id: 2, date: '2026.08.12', badge: 'NEW', title: '「Hearts2Hearts JAPAN 1st Fan Event "READY S2U"」開催決定！', link: 'https://hearts2heartsofficial.jp/', isAuto: false },
  { id: 3, date: '2026.08.12', badge: 'INFO', title: 'Hearts2Hearts日本オフィシャルファンクラブオープン！本日より受付スタート！', link: 'https://hearts2heartsofficial.jp/', isAuto: true }
];

const defaultMovies = [
  { id: 1, title: "Hearts2Hearts 'FOCUS' MV", youtubeId: "dQw4w9WgXcQ" },
  { id: 2, title: "Hearts2Hearts 'The Chase' Official MV", youtubeId: "dQw4w9WgXcQ" },
  { id: 3, title: "Hearts2Hearts 1st Fan Event 'READY S2U' Teaser", youtubeId: "dQw4w9WgXcQ" }
];

const defaultBanner = {
  enabled: true,
  text: "🎉 1st Fan Event 'READY S2U' チケット1次先行受付スタート！"
};

// LocalStorage からデータ取得
let memberProfiles = JSON.parse(localStorage.getItem('h2h_members')) || defaultMembers;
let newsData = JSON.parse(localStorage.getItem('h2h_news')) || defaultNews;
let movieData = JSON.parse(localStorage.getItem('h2h_movies')) || defaultMovies;
let bannerData = JSON.parse(localStorage.getItem('h2h_banner')) || defaultBanner;
let heroImage = localStorage.getItem('h2h_hero_img') || '';

// 🔥 アクセス解析データの管理
function trackAnalytics() {
  let stats = JSON.parse(localStorage.getItem('h2h_analytics')) || {
    totalPV: 1280,
    dailyPV: [120, 190, 300, 250, 420, 380, 510] // 過去7日間のサンプル
  };

  stats.totalPV += 1;
  stats.dailyPV[6] += 1; // 本日のPVを加算

  localStorage.setItem('h2h_analytics', JSON.stringify(stats));
  return stats;
}

// データ保存
function saveData() {
  localStorage.setItem('h2h_members', JSON.stringify(memberProfiles));
  localStorage.setItem('h2h_news', JSON.stringify(newsData));
  localStorage.setItem('h2h_movies', JSON.stringify(movieData));
  localStorage.setItem('h2h_banner', JSON.stringify(bannerData));
  localStorage.setItem('h2h_hero_img', heroImage);
}

// トップ背景画像適用
function applyHeroImage() {
  const bg = document.getElementById('main-hero-bg');
  if (!bg) return;
  if (heroImage) {
    bg.style.backgroundImage = `url('${heroImage}')`;
  } else {
    bg.style.backgroundImage = 'none';
  }
}

// 1. プロフィール描画（画像対応）
function renderProfileCards() {
  const container = document.getElementById('profile-grid');
  if (!container) return;
  
  container.innerHTML = '';
  memberProfiles.forEach((m) => {
    const photoContent = m.image 
      ? `<img src="${m.image}" alt="${m.name}" class="w-full h-full object-cover">`
      : `<span class="text-4xl mb-2">${m.emoji}</span>
         <span class="text-xs font-bold text-sky-800">${m.jpName}</span>`;

    container.innerHTML += `
      <div class="bg-white rounded-2xl overflow-hidden card-shadow border border-sky-100 flex flex-col group hover:-translate-y-1 transition duration-200">
        <div class="w-full aspect-[3/4] bg-sky-100/80 border-b border-sky-100 flex flex-col items-center justify-center relative overflow-hidden text-center">
          ${photoContent}
        </div>
        <div class="bg-sky-200/60 py-2 px-3 text-center border-t border-sky-200/50">
          <h3 class="font-black text-sky-800 text-sm md:text-base font-brand tracking-wider">${m.name}</h3>
          <p class="text-[10px] text-sky-600 font-bold truncate">${m.comment}</p>
        </div>
      </div>
    `;
  });
}

// 2. ニュース描画
function renderNews() {
  const container = document.getElementById('news-list');
  const adminManageList = document.getElementById('admin-news-manage-list');
  if (!container) return;

  container.innerHTML = '';
  newsData.forEach(item => {
    container.innerHTML += `
      <div class="bg-white p-3.5 md:p-4 rounded-2xl border border-sky-100 flex items-center justify-between gap-3 hover:border-sky-300 transition shadow-sm">
        <div class="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 flex-1">
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-600 font-brand">${item.badge}</span>
            <span class="text-xs text-sky-400 font-bold font-accent">${item.date}</span>
          </div>
          <a href="${item.link}" target="_blank" class="text-xs md:text-sm font-bold text-sky-800 hover:text-sky-500 transition line-clamp-1">
            ${item.title}
          </a>
        </div>
        <a href="${item.link}" target="_blank" class="w-7 h-7 rounded-full bg-sky-50 hover:bg-sky-500 hover:text-white text-sky-400 flex items-center justify-center text-xs transition flex-shrink-0">➔</a>
      </div>
    `;
  });

  if (adminManageList) {
    adminManageList.innerHTML = '';
    newsData.forEach((item, index) => {
      adminManageList.innerHTML += `
        <div class="flex justify-between items-center text-xs bg-white p-2 rounded-lg border border-sky-100">
          <span class="truncate flex-1 font-bold text-sky-800 mr-2">${item.title}</span>
          <button onclick="deleteNews(${index})" class="text-red-400 hover:text-red-600 font-bold text-[10px] bg-red-50 px-2 py-1 rounded">削除</button>
        </div>
      `;
    });
  }
}

function deleteNews(index) {
  newsData.splice(index, 1);
  saveData();
  renderNews();
}

// 3. 動画描画
function renderMovies() {
  const container = document.getElementById('movie-grid');
  if (!container) return;

  container.innerHTML = '';
  movieData.forEach(m => {
    container.innerHTML += `
      <div class="bg-white rounded-2xl overflow-hidden border border-sky-100 card-shadow hover:-translate-y-1 transition duration-300">
        <div class="aspect-video bg-sky-100 relative">
          <iframe class="w-full h-full" src="https://www.youtube.com/embed/${m.youtubeId}" title="${m.title}" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="p-3.5 bg-white">
          <p class="text-xs font-bold text-sky-900 line-clamp-1">${m.title}</p>
        </div>
      </div>
    `;
  });
}

// 4. バナー描画
function renderBanner() {
  const bannerEl = document.getElementById('urgent-banner');
  const bannerTextEl = document.getElementById('banner-text');
  
  if (!bannerEl || !bannerTextEl) return;

  if (bannerData.enabled) {
    bannerTextEl.innerText = bannerData.text;
    bannerEl.classList.remove('hidden');
  } else {
    bannerEl.classList.add('hidden');
  }
}

// 🔥 アクセス解析グラフの描画
let myChart = null;
function renderAnalyticsGraph(stats) {
  document.getElementById('analytics-today').innerText = stats.dailyPV[6];
  document.getElementById('analytics-total').innerText = stats.totalPV;

  const ctx = document.getElementById('accessChart')?.getContext('2d');
  if (!ctx) return;

  if (myChart) myChart.destroy();

  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['6日前', '5日前', '4日前', '3日前', '2日前', '昨日', '本日'],
      datasets: [{
        label: '訪問PV数',
        data: stats.dailyPV,
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56, 189, 248, 0.15)',
        borderWidth: 3,
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#0284c7'
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: '#f0f9ff' } },
        x: { grid: { display: false } }
      }
    }
  });
}

// 管理者UIセットアップ
function setupAdminEvents() {
  const modal = document.getElementById('admin-modal');
  const btnOpen = document.getElementById('btn-open-admin');
  const btnClose = document.getElementById('btn-close-admin');
  const btnLogin = document.getElementById('btn-login-admin');
  const btnLogout = document.getElementById('btn-logout-admin');
  const btnReset = document.getElementById('btn-reset-data');

  if (btnOpen) btnOpen.addEventListener('click', () => modal.classList.remove('hidden'));
  if (btnClose) btnClose.addEventListener('click', () => modal.classList.add('hidden'));

  // ログイン
  if (btnLogin) {
    btnLogin.addEventListener('click', () => {
      const pass = document.getElementById('admin-pass').value;
      if (pass === 'admin123') {
        document.getElementById('admin-login-view').classList.add('hidden');
        document.getElementById('admin-panel-view').classList.remove('hidden');
        populateMemberSelects();
        renderAnalyticsGraph(trackAnalytics());
      } else {
        alert('パスワードが正しくありません');
      }
    });
  }

  // ログアウト
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      document.getElementById('admin-login-view').classList.remove('hidden');
      document.getElementById('admin-panel-view').classList.add('hidden');
      document.getElementById('admin-pass').value = '';
    });
  }

  // タブ切り替え
  const tabs = document.querySelectorAll('.admin-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.add('hidden'));
      document.getElementById(tab.dataset.tab).classList.remove('hidden');
    });
  });

  // メンバー選択ドロップダウン初期化
  function populateMemberSelects() {
    const sel1 = document.getElementById('admin-member-select');
    const sel2 = document.getElementById('admin-member-img-select');
    if (!sel1 || !sel2) return;

    sel1.innerHTML = '';
    sel2.innerHTML = '';
    memberProfiles.forEach((m, idx) => {
      const opt = `<option value="${idx}">${m.name} (${m.jpName})</option>`;
      sel1.innerHTML += opt;
      sel2.innerHTML += opt;
    });
  }

  // 🔥 画像設定：トップヘッダー画像保存
  document.getElementById('btn-save-hero-img')?.addEventListener('click', () => {
    const urlInput = document.getElementById('admin-hero-img-url').value;
    const fileInput = document.getElementById('admin-hero-img-file').files[0];

    if (fileInput) {
      const reader = new FileReader();
      reader.onload = function(e) {
        heroImage = e.target.result;
        saveData();
        applyHeroImage();
        alert('トップヘッダー背景画像を更新しました！');
      };
      reader.readAsDataURL(fileInput);
    } else if (urlInput) {
      heroImage = urlInput;
      saveData();
      applyHeroImage();
      alert('トップヘッダー背景画像を更新しました！');
    }
  });

  // 🔥 画像設定：メンバー写真保存
  document.getElementById('btn-save-member-img')?.addEventListener('click', () => {
    const idx = document.getElementById('admin-member-img-select').value;
    const urlInput = document.getElementById('admin-member-img-url').value;
    const fileInput = document.getElementById('admin-member-img-file').files[0];

    if (fileInput) {
      const reader = new FileReader();
      reader.onload = function(e) {
        memberProfiles[idx].image = e.target.result;
        saveData();
        renderProfileCards();
        alert(`${memberProfiles[idx].name} の写真を更新しました！`);
      };
      reader.readAsDataURL(fileInput);
    } else if (urlInput) {
      memberProfiles[idx].image = urlInput;
      saveData();
      renderProfileCards();
      alert(`${memberProfiles[idx].name} の写真を更新しました！`);
    }
  });

  // ニュース追加
  document.getElementById('btn-add-news')?.addEventListener('click', () => {
    const title = document.getElementById('admin-news-title').value;
    const badge = document.getElementById('admin-news-badge').value;
    if (!title) return alert('タイトルを入力してください');

    const today = new Date().toISOString().split('T')[0].replace(/-/g, '.');
    newsData.unshift({ id: Date.now(), date: today, badge: badge, title: title, link: 'https://hearts2heartsofficial.jp/', isAuto: false });
    
    saveData();
    renderNews();
    document.getElementById('admin-news-title').value = '';
    alert('ニュースを追加しました！');
  });

  // メンバーコメント更新
  document.getElementById('btn-update-member')?.addEventListener('click', () => {
    const idx = document.getElementById('admin-member-select').value;
    const emoji = document.getElementById('admin-member-emoji').value;
    const comment = document.getElementById('admin-member-comment').value;

    if (emoji) memberProfiles[idx].emoji = emoji;
    if (comment) memberProfiles[idx].comment = comment;

    saveData();
    renderProfileCards();
    alert(`${memberProfiles[idx].name} の情報を更新しました！`);
  });

  // Movie追加
  document.getElementById('btn-add-movie')?.addEventListener('click', () => {
    const title = document.getElementById('admin-movie-title').value;
    let url = document.getElementById('admin-movie-url').value;
    if (!title || !url) return alert('タイトルとYouTube IDを入力してください');

    if (url.includes('v=')) url = url.split('v=')[1].split('&')[0];
    else if (url.includes('youtu.be/')) url = url.split('youtu.be/')[1];

    movieData.push({ id: Date.now(), title: title, youtubeId: url });
    saveData();
    renderMovies();
    alert('新しい動画を追加しました！');
  });

  // バナー設定
  document.getElementById('btn-save-banner')?.addEventListener('click', () => {
    const text = document.getElementById('admin-banner-text').value;
    const enable = document.getElementById('admin-banner-enable').checked;

    if (text) bannerData.text = text;
    bannerData.enabled = enable;

    saveData();
    renderBanner();
    alert('緊急バナー設定を保存しました！');
  });

  // リセット
  btnReset?.addEventListener('click', () => {
    if (confirm('すべてのデータを初期状態に戻しますか？')) {
      localStorage.clear();
      memberProfiles = [...defaultMembers];
      newsData = [...defaultNews];
      movieData = [...defaultMovies];
      bannerData = { ...defaultBanner };
      heroImage = '';
      saveData();
      applyHeroImage();
      renderProfileCards();
      renderNews();
      renderMovies();
      renderBanner();
      alert('初期化完了しました！');
    }
  });
}

// 初期化実行
document.addEventListener('DOMContentLoaded', () => {
  trackAnalytics();
  applyHeroImage();
  renderProfileCards();
  renderNews();
  renderMovies();
  renderBanner();
  setupAdminEvents();
});
