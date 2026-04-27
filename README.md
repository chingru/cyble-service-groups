# Cyble Service Group Selector

> 🤖 Built with [Claude](https://claude.ai) — an AI assistant by Anthropic.  
> This Chrome extension was developed entirely through conversation with Claude, from requirements gathering to code generation, debugging, and iteration.

---

## 中文說明

### 這是什麼？

這是一個 Chrome 瀏覽器擴充套件，專為 **Cyble Vision** 平台的使用者設計。

當你在 `https://cyble.ai/control-panel/user-management` 編輯使用者時，Services 區塊有多達 **65 個服務項目**需要逐一勾選，非常耗時。

這個套件會在 Services 區塊上方自動插入**分群快速選取按鈕**，依照 Cyble Help Center 的 Alerts Management 分類，讓你一鍵全選整個類別，大幅節省操作時間。

### 分群說明

套件將 65 個服務依照 Cyble Help Center 分成 10 大類：

| 分群 | 包含服務數量 | 主要內容 |
|------|------------|---------|
| Darkweb Intelligence | 9 | Data Exposures、Leaked Credentials、Ransomware Leaks 等 |
| Cybercrime Monitoring | 4 | Cybercrime Forum Mentions、Darkweb Marketplaces 等 |
| Attack Surface Monitoring | 8 | Assets、Subdomains、Network Vulnerabilities - CVEs 等 |
| Brand Intelligence | 10 | Phishing Monitoring、Social Media Monitoring 等 |
| Data Leaks | 6 | Cloud Storage、Code Analysis (Github/Bitbucket/Postman/Docker Hub) 等 |
| Threat Intelligence | 3 | IoCs、Hacktivism、Ransomware Incidents |
| Vulnerability Intelligence | 1 | Vulnerability Intelligence |
| Reporting | 4 | Cyble Research Labs、News Flash、Cyber Newsfeed 等 |
| Executive Monitoring | 1 | Executive Monitoring |
| Other | 19 | 其他未分類服務 |

### 安裝步驟

#### 方法一：從 GitHub 下載

1. 點擊本頁右上角的綠色 **Code** 按鈕 → **Download ZIP**
2. 解壓縮下載的 ZIP 檔案

#### 方法二：使用 git clone

```bash
git clone https://github.com/chingru/cyble-service-groups.git
```

#### 載入到 Chrome

1. 打開 Chrome 瀏覽器，在網址列輸入：
   ```
   chrome://extensions/
   ```
2. 開啟右上角的**開發人員模式**（Developer mode）開關
3. 點擊左上角**載入未封裝項目**（Load unpacked）
4. 選取剛才解壓縮的 `cyble-service-groups` 資料夾
5. 套件安裝完成，圖示會出現在 Chrome 工具列

### 使用方式

1. 前往 `https://cyble.ai/control-panel/user-management`
2. 點選任一使用者進行編輯（或新增使用者）
3. 捲動到 **Services** 區塊
4. 可以看到 Services 標題下方多出一排**彩色分群按鈕**

![分群按鈕示意](https://img.shields.io/badge/Quick%20Select%20by%20Group-ready-brightgreen)

**操作說明：**
- **點一次**分群按鈕 → 該群所有服務全部勾選 ✅
- **再點一次**同一按鈕 → 該群所有服務全部取消勾選
- 每個按鈕右側的**數字徽章**（如 `3/9`）顯示「已選數量 / 總數量」
- 支援與原本的搜尋框、Select All 混合使用

### 注意事項

- 此套件僅在 `https://cyble.ai/control-panel/user-management` 頁面上生效
- 套件不會儲存任何資料，不需要任何特殊權限
- 若頁面更新導致版面改變，請回報 Issue

---

## English

### What is this?

A Chrome extension designed for **Cyble Vision** platform users.

When editing a user at `https://cyble.ai/control-panel/user-management`, the Services section contains **65 individual checkboxes** that need to be selected one by one — a tedious and time-consuming process.

This extension automatically injects **group quick-select buttons** above the Services section, organized according to Cyble Help Center's Alerts Management categories. Select an entire category with a single click.

### Service Groups

The extension organizes all 65 services into 10 groups based on the Cyble Help Center:

| Group | Count | Key Services |
|-------|-------|-------------|
| Darkweb Intelligence | 9 | Data Exposures, Leaked Credentials, Ransomware Leaks, etc. |
| Cybercrime Monitoring | 4 | Cybercrime Forum Mentions, Darkweb Marketplaces, etc. |
| Attack Surface Monitoring | 8 | Assets, Subdomains, Network Vulnerabilities - CVEs, etc. |
| Brand Intelligence | 10 | Phishing Monitoring, Social Media Monitoring, etc. |
| Data Leaks | 6 | Cloud Storage, Code Analysis (Github/Bitbucket/Postman/Docker Hub), etc. |
| Threat Intelligence | 3 | IoCs, Hacktivism, Ransomware Incidents |
| Vulnerability Intelligence | 1 | Vulnerability Intelligence |
| Reporting | 4 | Cyble Research Labs, News Flash, Cyber Newsfeed, etc. |
| Executive Monitoring | 1 | Executive Monitoring |
| Other | 19 | Remaining services not listed in the Help Center |

### Installation

#### Option 1: Download ZIP from GitHub

1. Click the green **Code** button on this page → **Download ZIP**
2. Unzip the downloaded file

#### Option 2: Clone with git

```bash
git clone https://github.com/chingru/cyble-service-groups.git
```

#### Load into Chrome

1. Open Chrome and navigate to:
   ```
   chrome://extensions/
   ```
2. Enable **Developer mode** toggle in the top-right corner
3. Click **Load unpacked** in the top-left
4. Select the `cyble-service-groups` folder
5. The extension is now installed and active

### How to Use

1. Go to `https://cyble.ai/control-panel/user-management`
2. Click on any user to edit (or create a new user)
3. Scroll down to the **Services** section
4. You'll see a row of **colored group buttons** injected above the checkboxes

**Button behavior:**
- **Click once** → Select all services in that group ✅
- **Click again** → Deselect all services in that group
- The **badge** on each button (e.g. `3/9`) shows how many services in that group are currently selected
- Works alongside the search box and the existing "Select All" checkbox

### File Structure

```
cyble-service-groups/
├── manifest.json     # Chrome extension manifest (v3)
├── content.js        # Main script — injects UI and handles checkbox logic
└── diagnose.js       # Diagnostic script for troubleshooting checkbox compatibility
```

### Troubleshooting

If the group buttons don't appear:
- Make sure you're on the correct URL: `https://cyble.ai/control-panel/user-management`
- Try refreshing the page after opening a user's edit panel
- Open Chrome DevTools (F12) → Console, paste and run `diagnose.js` to check which click method works

If clicking a group button doesn't check/uncheck services:
- Open Chrome DevTools Console
- Copy the contents of `diagnose.js` and paste it into the Console
- The script will test 4 different methods and report which one works on your browser version

---

## Development

This extension was built through an iterative conversation with **[Claude](https://claude.ai)**, Anthropic's AI assistant, using the **Cowork** desktop app.

The development process included:
- Analyzing the Cyble User Management page HTML structure
- Identifying the correct DOM selectors for PrimeReact v10 checkboxes
- Running a diagnostic script to determine which click event method triggers React's state updates
- Iterating on the group definitions based on Cyble Help Center screenshots
- Packaging and committing to GitHub — all without writing a single line of code manually

> This is a practical demonstration of how AI-assisted development can turn a repetitive manual task into a one-click workflow.

---

## License

MIT — feel free to fork and adapt for your own Cyble instance.
