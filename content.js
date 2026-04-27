// ==============================================================
// Cyble Service Group Selector — content.js  v1.3
// 分群依照 Help Center > Alerts Management 實際分類
// ==============================================================

// ── 分群定義（對應 Help Center 截圖） ─────────────────────────
const SERVICE_GROUPS = {
  // 截圖 1
  'Darkweb Intelligence': [
    'Data Exposures',
    'Leaked Credentials',
    'Ransomware Leaks',
    'Compromised Endpoints',
    'Compromised Cookies',
    'Compromised Files',
    'Potential File Leaks',
    'I2P Links',
    'Tor Links',
  ],
  // 截圖 10
  'Cybercrime Monitoring': [
    'Cybercrime Forum Mentions',
    'Darkweb Marketplaces',
    'Telegram Mentions',
    'Discord',
  ],
  // 截圖 8
  'Attack Surface Monitoring': [
    'Web Application Discovery',
    'Issues Catalog',
    'Network Vulnerabilities - CVEs',
    'Domain Expiry',
    'Asset SSL Expiry',
    'Assets',
    'IP Risk Score',
    'Subdomains',
  ],
  // 截圖 5
  'Brand Intelligence': [
    'Mobile Apps',
    'OSINT',
    'Malicious Ads',
    'Suspicious Domains',
    'Phishing Monitoring',
    'Domain Watchlist',
    'Social Media Monitoring',
    'Defacement URL',
    'Defacement Content',
    'Defacement Keyword',
  ],
  // 截圖 7
  'Data Leaks': [
    'Cloud Storage',
    'Code Analysis - Github',
    'Code Analysis - Bitbucket',
    'Code Analysis - Postman',
    'Code Analysis - Docker Hub',
    'Pastesite',
  ],
  // 截圖 4
  'Threat Intelligence': [
    'IoCs',
    'Hacktivism',
    'Ransomware Incidents',
  ],
  // 截圖 6
  'Vulnerability Intelligence': [
    'Vulnerability Intelligence',
  ],
  // 截圖 2
  'Reporting': [
    'Cyble Research Labs Advisory',
    'Cyble Research Labs',
    'News Flash',
    'Cyber Newsfeed',
  ],
  // 截圖 3 + 9
  'Executive Monitoring': [
    'Executive Monitoring',
  ],
  // Help Center 未列出的其他服務
  'Other': [
    'Application Scan',
    'Blaze Alerts',
    'Cloud Security',
    'DNS Monitoring',
    'Domain Analysis',
    'Incident Management',
    'Keyword Management',
    'Mobile App Scanning',
    'Negative Domains API',
    'New Ports',
    'POI',
    'Report Management',
    'Sensor Intelligence',
    'Spectra',
    'Spotlight Search',
    'Third Party Report',
    'Threat Detection Rules',
    'Threat Lens',
    'Threat Library',
  ],
};

// ── 分群顏色 ──────────────────────────────────────────────────
const GROUP_COLORS = {
  'Darkweb Intelligence':      { bg: '#581C87', light: '#F5F3FF', text: '#581C87' },
  'Cybercrime Monitoring':     { bg: '#7C3AED', light: '#EDE9FE', text: '#7C3AED' },
  'Attack Surface Monitoring': { bg: '#1D4ED8', light: '#EFF6FF', text: '#1D4ED8' },
  'Brand Intelligence':        { bg: '#0369A1', light: '#F0F9FF', text: '#0369A1' },
  'Data Leaks':                { bg: '#0F766E', light: '#F0FDFA', text: '#0F766E' },
  'Threat Intelligence':       { bg: '#B45309', light: '#FFFBEB', text: '#B45309' },
  'Vulnerability Intelligence':{ bg: '#C2410C', light: '#FFF7ED', text: '#C2410C' },
  'Reporting':                 { bg: '#047857', light: '#ECFDF5', text: '#047857' },
  'Executive Monitoring':      { bg: '#BE185D', light: '#FDF2F8', text: '#BE185D' },
  'Other':                     { bg: '#374151', light: '#F9FAFB', text: '#374151' },
};

// ── 工具：group name → DOM id ─────────────────────────────────
function toId(name) {
  return 'cyble-grp-' + name.replace(/[^a-zA-Z0-9]/g, '-');
}

// ── 工具：找 Services field 容器 ─────────────────────────────
function findServicesField() {
  const label = document.querySelector('label[for="add-key-services"]');
  return label ? label.closest('.field.w-full') : null;
}

// ── 工具：依文字找 name="category" 的 checkbox input ─────────
function getInputByLabel(text) {
  for (const lbl of document.querySelectorAll('label.ml-2')) {
    if (lbl.textContent.trim() === text) {
      const id = lbl.getAttribute('for');
      if (id) {
        const inp = document.getElementById(id);
        if (inp && inp.name === 'category') return inp;
      }
    }
  }
  return null;
}

// ── 核心：觸發 PrimeReact checkbox 狀態變更 ──────────────────
//
// PrimeReact v10 checkbox 結構：
//   <div data-pc-name="checkbox" data-pc-section="root">   ← onClick 在這裡
//     <input type="checkbox" name="category" ...>
//     <div data-pc-section="box">...</div>
//   </div>
//   <label class="ml-2">Service Name</label>
//
// 我們用三層 fallback 確保 React 狀態被正確更新：
//
function triggerCheckbox(input) {
  // ① 最優先：點擊關聯的 <label>（診斷確認有效）
  const label = document.querySelector(`label[for="${input.id}"]`);
  if (label) {
    label.dispatchEvent(new MouseEvent('click', {
      bubbles: true, cancelable: true, view: window
    }));
    return;
  }

  // ② fallback：直接 click input（診斷確認有效）
  input.click();
}

// ── 核心：點擊分群按鈕邏輯 ──────────────────────────────────
function handleGroupClick(groupName) {
  const services  = SERVICE_GROUPS[groupName] || [];
  const inputs    = services.map(getInputByLabel).filter(Boolean);
  if (!inputs.length) return;

  // toggle：全選 → 全取消；否則 → 全選
  const allChecked = inputs.every(inp => inp.checked);
  const target     = !allChecked;

  // 依序觸發，每隔 20ms 一個，避免連續觸發讓 React 來不及更新
  inputs.forEach((inp, i) => {
    if (inp.checked !== target) {
      setTimeout(() => {
        triggerCheckbox(inp);
      }, i * 20);
    }
  });

  // 等全部觸發完後刷新按鈕計數
  setTimeout(refreshAllButtons, inputs.length * 20 + 200);
}

// ── UI：刷新按鈕外觀（顏色 + 計數） ─────────────────────────
function refreshButton(groupName) {
  const btn = document.getElementById(toId(groupName));
  if (!btn) return;

  const inputs      = (SERVICE_GROUPS[groupName] || []).map(getInputByLabel).filter(Boolean);
  const checked     = inputs.filter(i => i.checked).length;
  const total       = inputs.length;
  const allChecked  = total > 0 && checked === total;
  const c           = GROUP_COLORS[groupName] || { bg: '#374151', light: '#F9FAFB', text: '#374151' };

  btn.style.background  = allChecked ? c.bg    : c.light;
  btn.style.color       = allChecked ? '#fff'  : c.text;
  btn.style.borderColor = c.bg;

  const badge = btn.querySelector('.cyble-badge');
  if (badge) {
    badge.textContent      = `${checked}/${total}`;
    badge.style.background = allChecked ? 'rgba(255,255,255,0.3)' : c.bg;
    badge.style.color      = '#fff';
  }

  btn.title = allChecked
    ? `再次點擊可取消全選（${total} 項）`
    : `點擊全選此分群（已選 ${checked}/${total}）`;
}

function refreshAllButtons() {
  Object.keys(SERVICE_GROUPS).forEach(refreshButton);
}

// ── UI：注入分群面板 ─────────────────────────────────────────
function injectGroupPanel(container) {
  if (document.getElementById('cyble-group-panel')) return;

  const panel = document.createElement('div');
  panel.id = 'cyble-group-panel';
  Object.assign(panel.style, {
    display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center',
    padding: '10px 0 12px 0', marginBottom: '8px',
    borderBottom: '1px solid #e5e7eb',
  });

  // 提示文字
  const hint = document.createElement('div');
  hint.style.cssText = 'width:100%;font-size:11px;color:#9ca3af;letter-spacing:.03em;margin-bottom:2px;';
  hint.textContent = 'Quick select by group  （點擊全選 / 再點取消全選）';
  panel.appendChild(hint);

  Object.keys(SERVICE_GROUPS).forEach(groupName => {
    const c = GROUP_COLORS[groupName] || { bg: '#374151', light: '#F9FAFB', text: '#374151' };

    const btn = document.createElement('button');
    btn.id = toId(groupName);
    btn.type = 'button';
    Object.assign(btn.style, {
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      padding: '4px 10px', borderRadius: '20px',
      border: `1.5px solid ${c.bg}`, background: c.light, color: c.text,
      fontSize: '12px', fontWeight: '600', cursor: 'pointer',
      lineHeight: '1.4', userSelect: 'none',
      transition: 'background .15s, color .15s',
    });

    const nameSpan = document.createElement('span');
    nameSpan.textContent = groupName;
    btn.appendChild(nameSpan);

    const badge = document.createElement('span');
    badge.className = 'cyble-badge';
    Object.assign(badge.style, {
      display: 'inline-block', padding: '0 5px', borderRadius: '10px',
      fontSize: '10px', fontWeight: '700',
      background: c.bg, color: '#fff',
      minWidth: '24px', textAlign: 'center',
    });
    badge.textContent = '…';
    btn.appendChild(badge);

    btn.addEventListener('click', () => handleGroupClick(groupName));
    panel.appendChild(btn);
  });

  // 插入在 Select All 列下方
  const selectAllRow = container.querySelector('.grid.justify-content-between');
  if (selectAllRow) {
    selectAllRow.after(panel);
  } else {
    container.querySelector('.px-4')?.before(panel);
  }

  // 初始化計數
  refreshAllButtons();
}

// ── MutationObserver：等待 SPA 載入 ──────────────────────────
let debounce = null;
const observer = new MutationObserver(() => {
  clearTimeout(debounce);
  debounce = setTimeout(() => {
    const field = findServicesField();
    if (!field) return;
    if (!document.getElementById('cyble-group-panel')) {
      injectGroupPanel(field);
    } else {
      refreshAllButtons();
    }
  }, 200);
});
observer.observe(document.body, { childList: true, subtree: true });

// 頁面已就緒時直接注入
const existing = findServicesField();
if (existing) injectGroupPanel(existing);
