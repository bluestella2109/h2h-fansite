// 公式順メンバーデータ（2行×4列: JIWOO, CARMEN, YUHA, STELLA / JUUN, A-NA, IAN, YE-ON）
const memberProfiles = [
  { id: 'jiwoo', name: 'JIWOO', jpName: 'ジウ', emoji: '🍓' },
  { id: 'carmen', name: 'CARMEN', jpName: 'カルメン', emoji: '🌴' },
  { id: 'yuha', name: 'YUHA', jpName: 'ユハ', emoji: '🎀' },
  { id: 'stella', name: 'STELLA', jpName: 'ステラ', emoji: '🧁' },
  { id: 'juun', name: 'JUUN', jpName: 'ジュウン', emoji: '👾' },
  { id: 'a-na', name: 'A-NA', jpName: 'エイナ', emoji: '🌻' },
  { id: 'ian', name: 'IAN', jpName: 'イアン', emoji: '🫛' },
  { id: 'ye-on', name: 'YE-ON', jpName: 'イェオン', emoji: '😊' }
];

// 初期ニュースデータ
let newsData = [
  {
    id: 1,
    date: '2026.08.14',
    badge: 'NEW',
    title: '8/14(金)放送の日本テレビ系列『ZIP!』にて「CUTIE STREET」とコラボ！',
    link: 'https://hearts2heartsofficial.jp/',
    isAuto: false
  },
  {
    id: 2,
    date: '2026.08.12',
    badge: 'NEW',
    title: '「Hearts2Hearts JAPAN 1st Fan Event "READY S2U"」開催決定！',
    link: 'https://hearts2heartsofficial.jp/',
    isAuto: false
  },
  {
    id: 3,
    date: '2026.08.12',
    badge: 'NEW',
    title: 'Hearts2Hearts日本オフィシャルファンクラブオープン！本日8/12(水)12:00より受付スタート！',
    link: 'https://hearts2heartsofficial.jp/',
    isAuto: true
  }
];

// メンバープロフィールカード描画 (2行×4列)
function renderProfileCards() {
  const container = document.getElementById('profile-grid');
  if (!container) return;
  
  container.innerHTML = '';
  memberProfiles.forEach((m) => {
    container.innerHTML += `
      <div class="bg-white rounded-2xl overflow-hidden card-shadow border border-sky-100 flex flex-col group hover:-translate-y-1 transition duration-200">
        <div class="w-full aspect-[3/4] bg-sky-100/80 border-b border-sky-100 flex flex-col items-center justify-center relative overflow-hidden">
          <div class="flex flex-col items-center justify-center p-2 text-center">
            <span class="text-3xl mb-1">${m.emoji}</span>
            <span class="text-[11px] font-bold text-sky-400">📷 PHOTO FRAME</span>
            <span class="text-[9px] text-sky-300">(${m.jpName})</span>
          </div>
        </div>
        <div class="bg-sky-200/60 py-2 px-3 text-center border-t border-sky-200/50">
          <h3 class="font-black text-sky-800 text-sm md:text-base font-brand tracking-wider">${m.name}</h3>
        </div>
      </div>
    `;
  });
}

// ニュース描画
function renderNews() {
  const container = document.getElementById('news-list');
  if (!container) return;

  container.innerHTML = '';
  newsData.forEach(item => {
    container.innerHTML += `
      <div class="bg-white p-3.5 md:p-4 rounded-2xl border border-sky-100 flex items-center justify-between gap-3 hover:border-sky-300 transition shadow-sm">
        <div class="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 flex-1">
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-600 font-brand">
              ${item.badge}
            </span>
            <span class="text-xs text-sky-400 font-bold font-brand">${item.date}</span>
            ${item.isAuto ? '<span class="text-[9px] bg-amber-50 text-amber-500 border border-amber-200 px-1.5 py-0.2 rounded font-bold">AUTO</span>' : ''}
          </div>
          <a href="${item.link}" target="_blank" class="text-xs md:text-sm font-bold text-sky-800 hover:text-sky-500 transition line-clamp-1">
            ${item.title}
          </a>
        </div>
        <a href="${item.link}" target="_blank" class="w-7 h-7 rounded-full bg-sky-50 hover:bg-sky-500 hover:text-white text-sky-400 flex items-center justify-center text-xs transition flex-shrink-0">
          ➔
        </a>
      </div>
    `;
  });
}

// 自動更新取得シミュレーション
function fetchAutoNews() {
  const today = new Date().toISOString().split('T')[0].replace(/-/g, '.');
  const autoNewsItem = {
    id: Date.now(),
    date: today,
    badge: 'NEW',
    title: '【公式サイト更新】Hearts2Hearts 2nd Mini Album 発売情報・メディア出演スケジュールが公開されました！',
    link: 'https://hearts2heartsofficial.jp/',
    isAuto: true
  };
  newsData.unshift(autoNewsItem);
  renderNews();
  alert('https://hearts2heartsofficial.jp/ より最新ニュースを同期しました！🩵');
}

// 管理者モーダル関係のイベント
function setupAdminEvents() {
  const modal = document.getElementById('admin-modal');
  const btnOpen = document.getElementById('btn-open-admin');
  const btnClose = document.getElementById('btn-close-admin');
  const btnLogin = document.getElementById('btn-login-admin');
  const btnAddNews = document.getElementById('btn-add-news');

  if (btnOpen) btnOpen.addEventListener('click', () => modal.classList.remove('hidden'));
  if (btnClose) btnClose.addEventListener('click', () => modal.classList.add('hidden'));

  if (btnLogin) {
    btnLogin.addEventListener('click', () => {
      const pass = document.getElementById('admin-pass').value;
      if (pass === 'admin123') {
        document.getElementById('admin-login-view').classList.add('hidden');
        document.getElementById('admin-panel-view').classList.remove('hidden');
      } else {
        alert('パスワードが正しくありません');
      }
    });
  }

  if (btnAddNews) {
    btnAddNews.addEventListener('click', () => {
      const title = document.getElementById('admin-news-title').value;
      const badge = document.getElementById('admin-news-badge').value;

      if (!title) {
        alert('ニュースタイトルを入力してください');
        return;
      }

      const today = new Date().toISOString().split('T')[0].replace(/-/g, '.');
      newsData.unshift({
        id: Date.now(),
        date: today,
        badge: badge,
        title: title,
        link: 'https://hearts2heartsofficial.jp/',
        isAuto: false
      });

      renderNews();
      document.getElementById('admin-news-title').value = '';
      document.getElementById('admin-news-body').value = '';
      alert('ニュースを更新しました！');
      modal.classList.add('hidden');
    });
  }
}

// 言語切り替え
function setupLanguageSelect() {
  const select = document.getElementById('lang-select');
  if (!select) return;

  select.addEventListener('change', (e) => {
    const msg = document.getElementById('bias-welcome-msg');
    if (!msg) return;

    if (e.target.value === 'en') {
      msg.innerText = "Hearts2Hearts Official Fan Community 🩵";
    } else if (e.target.value === 'ko') {
      msg.innerText = "Hearts2Hearts 공식 팬커뮤니티 🩵";
    } else {
      msg.innerText = "Hearts2Hearts Official Fan Community 🩵";
    }
  });
}

// 初期化処理
document.addEventListener('DOMContentLoaded', () => {
  renderProfileCards();
  renderNews();
  setupAdminEvents();
  setupLanguageSelect();

  const syncBtn = document.getElementById('btn-sync-news');
  if (syncBtn) {
    syncBtn.addEventListener('click', fetchAutoNews);
  }
});
