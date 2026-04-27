// ======================================================
// 診斷腳本：在瀏覽器 Console 貼上執行，測試哪種方法有效
// 到 user-management 頁面，打開編輯某個 user，
// 在 Services 區塊出現後，在 Console 執行此腳本
// ======================================================

(function diagnose() {
  // 找第一個 name=category 的 checkbox（未勾選的）
  const inputs = Array.from(document.querySelectorAll('input[name="category"]'));
  const unchecked = inputs.find(i => !i.checked);
  const checked   = inputs.find(i => i.checked);
  const target    = unchecked || inputs[0];

  if (!target) { console.warn('[Cyble Diag] 找不到 category checkbox'); return; }

  const initial = target.checked;
  console.log('[Cyble Diag] 測試目標:', target.id, '| 初始狀態:', initial);

  // 方法 1：click root wrapper
  function method1() {
    const root = target.closest('[data-pc-name="checkbox"]');
    if (root) { root.click(); return true; }
    return false;
  }

  // 方法 2：click label
  function method2() {
    const lbl = document.querySelector(`label[for="${target.id}"]`);
    if (lbl) { lbl.click(); return true; }
    return false;
  }

  // 方法 3：click input
  function method3() {
    target.click(); return true;
  }

  // 方法 4：nativeSetter + change event
  function method4() {
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'checked').set;
    setter.call(target, !target.checked);
    target.dispatchEvent(new Event('change', { bubbles: true }));
    target.dispatchEvent(new Event('input',  { bubbles: true }));
    return true;
  }

  const methods = [
    { name: '① root div .click()',         fn: method1 },
    { name: '② label .click()',             fn: method2 },
    { name: '③ input .click()',             fn: method3 },
    { name: '④ nativeSetter+change event',  fn: method4 },
  ];

  let tested = 0;
  function testNext() {
    if (tested >= methods.length) {
      console.log('[Cyble Diag] 所有方法測試完畢');
      return;
    }
    const m = methods[tested++];
    const before = target.checked;
    const ok = m.fn();
    setTimeout(() => {
      const after = target.checked;
      const changed = after !== before;
      console.log(`[Cyble Diag] ${m.name}: ${changed ? '✅ 有效！狀態從' : '❌ 無效，狀態仍'} ${before} → ${after}`);
      // 還原狀態再測下一個
      if (changed) m.fn(); // toggle back
      setTimeout(testNext, 300);
    }, 200);
  }

  testNext();
})();
