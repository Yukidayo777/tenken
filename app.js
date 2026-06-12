// ==============================
// NagaT-X Building Patrol System
// ==============================

// ---- localStorage キー ----
const LS_KEY_USER = "nagatx_user";
const LS_KEY_SESSION = "nagatx_current_session";
const LS_KEY_HISTORY = "nagatx_histories";
const LS_KEY_THEME = "nagatx_theme";

// ---- 日常巡回ルートマスタ ----
const ROUTE_MASTER = {
  id: "daily_standard",
  name: "日常巡回ルート（標準）",
  description: "ビル全体の主要設備を巡回する標準ルート",
  estimatedMinutes: 60,
  points: [
    {
      id: "roof_reclaimed_tank",
      order: 1,
      floor: "屋上",
      locationName: "中水高架水槽",
      equipments: ["中水高架水槽"],
      items: [
        {
          id: "naocl_value_roof",
          label: "次亜塩素濃度",
          type: "number",
          unit: "mg/L",
          required: true,
          hint: "基準値との乖離がないか確認し、異常時は報告・是正を行う。"
        },
        {
          id: "naocl_status_roof",
          label: "状態",
          type: "select",
          options: ["異常なし", "異常あり"],
          default: "異常なし",
          required: true
        },
        {
          id: "naocl_memo_roof",
          label: "異常時メモ",
          type: "text",
          requiredIf: "naocl_status_roof=異常あり",
          hint: "異常内容を具体的に記入する。"
        }
      ]
    },
    {
      id: "36f_l5_electrical",
      order: 2,
      floor: "36F",
      locationName: "L5電気室",
      equipments: ["L5電気室"],
      items: [
        {
          id: "room_temp_l5",
          label: "室温",
          type: "number",
          unit: "℃",
          required: true,
          hint: "室温が基準値を超えていないか確認する。"
        },
        {
          id: "room_status_l5",
          label: "状態",
          type: "select",
          options: ["異常なし", "異常あり"],
          default: "異常なし",
          required: true
        },
        {
          id: "room_memo_l5",
          label: "異常時メモ",
          type: "text",
          requiredIf: "room_status_l5=異常あり"
        }
      ]
    },
    {
      id: "27f_l4_electrical",
      order: 3,
      floor: "27F",
      locationName: "L4電気室",
      equipments: ["L4電気室"],
      items: [
        {
          id: "room_temp_l4",
          label: "室温",
          type: "number",
          unit: "℃",
          required: true
        },
        {
          id: "room_status_l4",
          label: "状態",
          type: "select",
          options: ["異常なし", "異常あり"],
          default: "異常なし",
          required: true
        },
        {
          id: "room_memo_l4",
          label: "異常時メモ",
          type: "text",
          requiredIf: "room_status_l4=異常あり"
        }
      ]
    },
    {
      id: "3f_l3_electrical",
      order: 4,
      floor: "3F",
      locationName: "L3電気室",
      equipments: ["L3電気室"],
      items: [
        {
          id: "room_temp_l3",
          label: "室温",
          type: "number",
          unit: "℃",
          required: true
        },
        {
          id: "room_status_l3",
          label: "状態",
          type: "select",
          options: ["異常なし", "異常あり"],
          default: "異常なし",
          required: true
        },
        {
          id: "room_memo_l3",
          label: "異常時メモ",
          type: "text",
          requiredIf: "room_status_l3=異常あり"
        }
      ]
    },
    {
      id: "3f_generator_room",
      order: 5,
      floor: "3F",
      locationName: "発電機室",
      equipments: ["発電機"],
      items: [
        {
          id: "generator_status",
          label: "発電機状態",
          type: "select",
          options: ["異常なし", "異常あり"],
          default: "異常なし",
          required: true,
          hint: "漏油・異常音・振動などがないか確認する。"
        },
        {
          id: "generator_memo",
          label: "異常時メモ",
          type: "text",
          requiredIf: "generator_status=異常あり"
        }
      ]
    },
    {
      id: "2f_l2_electrical",
      order: 6,
      floor: "2F",
      locationName: "L2電気室",
      equipments: ["L2電気室"],
      items: [
        {
          id: "room_temp_l2",
          label: "室温",
          type: "number",
          unit: "℃",
          required: true
        },
        {
          id: "room_status_l2",
          label: "状態",
          type: "select",
          options: ["異常なし", "異常あり"],
          default: "異常なし",
          required: true
        },
        {
          id: "room_memo_l2",
          label: "異常時メモ",
          type: "text",
          requiredIf: "room_status_l2=異常あり"
        }
      ]
    },
    {
      id: "2f_l1_electrical",
      order: 7,
      floor: "2F",
      locationName: "L1電気室",
      equipments: ["L1電気室"],
      items: [
        {
          id: "room_temp_l1",
          label: "室温",
          type: "number",
          unit: "℃",
          required: true
        },
        {
          id: "room_status_l1",
          label: "状態",
          type: "select",
          options: ["異常なし", "異常あり"],
          default: "異常なし",
          required: true
        },
        {
          id: "room_memo_l1",
          label: "異常時メモ",
          type: "text",
          requiredIf: "room_status_l1=異常あり"
        }
      ]
    },
    {
      id: "1f_ups",
      order: 8,
      floor: "1F",
      locationName: "UPS",
      equipments: ["UPS"],
      items: [
        {
          id: "ups_status",
          label: "UPS状態",
          type: "select",
          options: ["異常なし", "警報あり"],
          default: "異常なし",
          required: true
        },
        {
          id: "ups_memo",
          label: "警報内容メモ",
          type: "text",
          requiredIf: "ups_status=警報あり"
        }
      ]
    },
    {
      id: "1f_bms",
      order: 9,
      floor: "1F",
      locationName: "中央監視制御装置",
      equipments: ["中央監視制御装置"],
      items: [
        {
          id: "bms_alarm",
          label: "警報表示有無",
          type: "select",
          options: ["なし", "あり"],
          default: "なし",
          required: true
        },
        {
          id: "bms_memo",
          label: "警報内容メモ",
          type: "text",
          requiredIf: "bms_alarm=あり"
        }
      ]
    },
    {
      id: "b2_header",
      order: 10,
      floor: "B2",
      locationName: "ヘッダー",
      equipments: ["ヘッダー"],
      items: [
        {
          id: "header_pressure",
          label: "圧力",
          type: "number",
          unit: "MPa",
          range: { min: 1.7, max: 2.1 },
          required: true
        },
        {
          id: "header_temperature",
          label: "温度",
          type: "number",
          unit: "℃",
          range: { min: 6.0, max: 15.0 },
          required: true
        },
        {
          id: "header_current",
          label: "電流",
          type: "number",
          unit: "A",
          range: { min: 0, max: 50 },
          required: true
        }
      ]
    },
    {
      id: "b2_heat_exchanger",
      order: 10.2,
      floor: "B2",
      locationName: "熱交換器",
      equipments: ["熱交換器"],
      items: [
        {
          id: "dhc_supply_temp",
          label: "DHC往温度",
          type: "number",
          unit: "℃",
          range: { min: 6.0, max: 30.0 },
          required: true
        },
        {
          id: "dhc_return_temp",
          label: "DHC還温度",
          type: "number",
          unit: "℃",
          range: { min: 6.0, max: 30.0 },
          required: true
        },
        {
          id: "building_supply_temp",
          label: "ビル側往温度",
          type: "number",
          unit: "℃",
          range: { min: 6.0, max: 30.0 },
          required: true
        },
        {
          id: "building_return_temp",
          label: "ビル側還温度",
          type: "number",
          unit: "℃",
          range: { min: 6.0, max: 30.0 },
          required: true
        }
      ]
    },
    {
      id: "b2_wastewater",
      order: 11,
      floor: "B2",
      locationName: "排水処理設備",
      equipments: ["排水処理設備"],
      items: [
        {
          id: "wastewater_status",
          label: "設備状態",
          type: "select",
          options: ["異常なし", "異常あり"],
          default: "異常なし",
          required: true
        },
        {
          id: "wastewater_memo",
          label: "異常時メモ",
          type: "text",
          requiredIf: "wastewater_status=異常あり"
        }
      ]
    },
    {
      id: "b2_tanks",
      order: 12,
      floor: "B2",
      locationName: "受水槽・雑用水槽",
      equipments: ["受水槽", "雑用水槽"],
      items: [
        {
          id: "naocl_value_b2",
          label: "次亜塩素濃度",
          type: "number",
          unit: "mg/L",
          required: true
        },
        {
          id: "naocl_status_b2",
          label: "状態",
          type: "select",
          options: ["異常なし", "異常あり"],
          default: "異常なし",
          required: true
        },
        {
          id: "naocl_memo_b2",
          label: "異常時メモ",
          type: "text",
          requiredIf: "naocl_status_b2=異常あり"
        }
      ]
    },
    {
      id: "disaster_center_excel",
      order: 13,
      floor: "防災センター",
      locationName: "防災センター（Excel入力）",
      equipments: ["Excel入力"],
      items: [
        {
          id: "excel_input_done",
          label: "Excelへの入力完了",
          type: "select",
          options: ["未実施", "実施済"],
          default: "未実施",
          required: true
        },
        {
          id: "excel_memo",
          label: "備考",
          type: "text",
          required: false
        }
      ]
    }
  ]
};

// ---- 状態管理 ----
let currentSession = null;
let currentPointIndex = 0;
let deferredPrompt = null;

// ---- ユーティリティ ----

function formatDateTime(date) {
  if (!date) return "-";
  const d = typeof date === "string" ? new Date(date) : date;
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${yyyy}/${mm}/${dd} ${hh}:${mi}`;
}

function calcDurationMinutes(start, end) {
  if (!start || !end) return null;
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  return Math.round((e - s) / 1000 / 60);
}

function loadJsonFromLS(key, defaultValue) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

function saveJsonToLS(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // 容量オーバーなどは無視
  }
}

function judgeRange(value, range) {
  if (value === "" || value === null || value === undefined) return null;
  const num = Number(value);
  if (Number.isNaN(num)) return null;
  if (num >= range.min && num <= range.max) return "normal";
  return "abnormal";
}

// ---- テーマ ----

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "light") {
    root.classList.add("light-theme");
  } else {
    root.classList.remove("light-theme");
  }
  const iconEl = document.getElementById("themeToggleIcon");
  if (iconEl) {
    iconEl.textContent = theme === "light" ? "🌞" : "🌙";
  }
}

function initTheme() {
  const saved = loadJsonFromLS(LS_KEY_THEME, null);
  if (saved === "light" || saved === "dark") {
    applyTheme(saved);
    return;
  }
  const prefersLight =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches;
  applyTheme(prefersLight ? "light" : "dark");
}

function toggleTheme() {
  const root = document.documentElement;
  const isLight = root.classList.contains("light-theme");
  const next = isLight ? "dark" : "light";
  applyTheme(next);
  saveJsonToLS(LS_KEY_THEME, next);
}

// ---- セッション管理 ----

function startPatrol() {
  const userName = document.getElementById("userNameInput").value.trim();
  if (!userName) {
    alert("担当者名を入力してください。");
    return;
  }

  const now = new Date();
  const sessionId = `${now.toISOString()}_${ROUTE_MASTER.id}_${userName}`;

  currentSession = {
    sessionId,
    routeId: ROUTE_MASTER.id,
    routeName: ROUTE_MASTER.name,
    user: userName,
    startedAt: now.toISOString(),
    finishedAt: null,
    status: "in_progress",
    results: ROUTE_MASTER.points.map((p) => ({
      pointId: p.id,
      floor: p.floor,
      locationName: p.locationName,
      order: p.order,
      startedAt: null,
      finishedAt: null,
      items: p.items.map((item) => ({
        itemId: item.id,
        label: item.label,
        value: item.default || "",
        note: "",
        completedAt: null,
        status: null
      }))
    }))
  };

  saveJsonToLS(LS_KEY_SESSION, currentSession);
  saveJsonToLS(LS_KEY_USER, { name: userName });

  currentPointIndex = 0;
  updateHeaderTimes();
  updateProgress();
  renderCurrentPoint();
  renderSummary();
  updateFloorMap();
  document.getElementById("finishPatrolButton").disabled = false;
  document.getElementById("routeNameLabel").textContent =
    ROUTE_MASTER.name;
}

function finishPatrol() {
  if (!currentSession) {
    alert("巡回が開始されていません。");
    return;
  }
  const now = new Date();
  currentSession.finishedAt = now.toISOString();
  currentSession.status = "completed";

  const histories = loadJsonFromLS(LS_KEY_HISTORY, []);
  histories.push(currentSession);
  saveJsonToLS(LS_KEY_HISTORY, histories);

  localStorage.removeItem(LS_KEY_SESSION);

  updateHeaderTimes();
  updateProgress();
  renderSummary();
  updateFloorMap();

  alert("巡回を完了しました。");
  document.getElementById("finishPatrolButton").disabled = true;
}

function resetAll() {
  if (!confirm("現在の巡回データをすべてリセットしますか？")) return;
  currentSession = null;
  currentPointIndex = 0;
  localStorage.removeItem(LS_KEY_SESSION);

  document.getElementById("startTimeDisplay").textContent = "未開始";
  document.getElementById("endTimeDisplay").textContent = "未終了";
  document.getElementById("durationDisplay").textContent = "-";
  document.getElementById("progressBarInner").style.width = "0%";
  document.getElementById("progressText").textContent = "0 / 0";
  document.getElementById("routeNameLabel").textContent = "-";

  document.getElementById("contentSection").innerHTML =
    '<p class="placeholder-text">担当者名を入力し、「巡回開始」を押して日常巡回を開始してください。</p>';
  document.getElementById("summaryContent").innerHTML =
    '<p class="placeholder-text">まだ巡回が完了していません。</p>';

  resetFloorMap();
  document.getElementById("finishPatrolButton").disabled = true;
}

// ---- UI 更新 ----

function updateHeaderTimes() {
  const startEl = document.getElementById("startTimeDisplay");
  const endEl = document.getElementById("endTimeDisplay");
  const durEl = document.getElementById("durationDisplay");

  if (!currentSession) {
    startEl.textContent = "未開始";
    endEl.textContent = "未終了";
    durEl.textContent = "-";
    return;
  }

  startEl.textContent = formatDateTime(currentSession.startedAt);
  endEl.textContent = currentSession.finishedAt
    ? formatDateTime(currentSession.finishedAt)
    : "未終了";

  const duration = calcDurationMinutes(
    currentSession.startedAt,
    currentSession.finishedAt
  );
  durEl.textContent = duration ? `${duration} 分` : "-";
}

function updateProgress() {
  const progressTextEl = document.getElementById("progressText");
  const progressBarInnerEl = document.getElementById("progressBarInner");

  if (!currentSession) {
    progressTextEl.textContent = "0 / 0";
    progressBarInnerEl.style.width = "0%";
    return;
  }

  const totalPoints = currentSession.results.length;
  const completedPoints = currentSession.results.filter(
    (r) => r.finishedAt
  ).length;

  progressTextEl.textContent = `${completedPoints} / ${totalPoints}`;
  const percent =
    totalPoints === 0 ? 0 : Math.round((completedPoints / totalPoints) * 100);
  progressBarInnerEl.style.width = `${percent}%`;
}

function renderCurrentPoint() {
  const contentEl = document.getElementById("contentSection");

  if (!currentSession) {
    contentEl.innerHTML =
      '<p class="placeholder-text">担当者名を入力し、「巡回開始」を押して日常巡回を開始してください。</p>';
    return;
  }

  const pointResult = currentSession.results[currentPointIndex];
  const pointMaster = ROUTE_MASTER.points[currentPointIndex];

  if (!pointResult.startedAt) {
    pointResult.startedAt = new Date().toISOString();
    saveJsonToLS(LS_KEY_SESSION, currentSession);
  }

  let html = "";

  html += `<div class="point-header">`;
  html += `<div>`;
  html += `<div class="point-title">${pointMaster.order}. ${pointMaster.floor} ${pointMaster.locationName}</div>`;
  html += `<div class="point-meta">設備: ${pointMaster.equipments.join(
    " / "
  )}</div>`;
  html += `</div>`;
  html += `<div class="point-time">開始: ${formatDateTime(
    pointResult.startedAt
  )}<br>完了: ${
    pointResult.finishedAt ? formatDateTime(pointResult.finishedAt) : "未完了"
  }</div>`;
  html += `</div>`;

  html += `<div class="items-list">`;
  pointMaster.items.forEach((item) => {
    const resultItem = pointResult.items.find(
      (ri) => ri.itemId === item.id
    );
    const value = resultItem ? resultItem.value : "";
    const note = resultItem ? resultItem.note : "";
    const status = resultItem ? resultItem.status : null;

    const statusClass =
      status === "normal"
        ? "normal"
        : status === "abnormal"
        ? "abnormal"
        : "";
    const statusLabel =
      status === "normal"
        ? "正常"
        : status === "abnormal"
        ? "基準外"
        : "";

    html += `<div class="item-card ${statusClass}" data-item-id="${item.id}">`;
    html += `<div class="item-label-row">`;
    html += `<span class="item-label">${item.label}${
      item.unit ? ` (${item.unit})` : ""
    }</span>`;
    html += `<span class="item-type">${item.type}${
      item.range
        ? ` / ${item.range.min}〜${item.range.max}${item.unit || ""}`
        : ""
    }</span>`;
    html += `</div>`;

    html += `<div class="item-input-row">`;

    if (item.type === "number") {
      html += `<input type="number" class="item-input-value" value="${value}" placeholder="数値を入力" />`;
    } else if (item.type === "select") {
      html += `<select class="item-input-value">`;
      (item.options || []).forEach((opt) => {
        const selected = opt === value ? "selected" : "";
        html += `<option value="${opt}" ${selected}>${opt}</option>`;
      });
      html += `</select>`;
    } else {
      html += `<input type="text" class="item-input-value" value="${value}" placeholder="入力" />`;
    }

    html += `<input type="text" class="item-input-note" value="${note}" placeholder="備考" />`;
    html += `</div>`;

    if (item.hint || statusLabel) {
      html += `<div class="item-hint">`;
      if (item.hint) {
        html += `${item.hint} `;
      }
      if (statusLabel) {
        html += `<span class="item-status-label ${statusClass}">${statusLabel}</span>`;
      }
      html += `</div>`;
    }

    html += `</div>`;
  });
  html += `</div>`;

  html += `<div class="point-actions">`;
  html += `<button class="btn ghost" id="prevPointButton"${
    currentPointIndex === 0 ? " disabled" : ""
  } type="button">前のポイント</button>`;
  html += `<button class="btn ghost" id="nextPointButton"${
    currentPointIndex === ROUTE_MASTER.points.length - 1 ? " disabled" : ""
  } type="button">次のポイント</button>`;
  html += `<button class="btn primary" id="completePointButton" type="button">ポイント完了</button>`;
  html += `</div>`;

  contentEl.innerHTML = html;

  document
    .getElementById("prevPointButton")
    ?.addEventListener("click", () => movePoint(-1));
  document
    .getElementById("nextPointButton")
    ?.addEventListener("click", () => movePoint(1));
  document
    .getElementById("completePointButton")
    ?.addEventListener("click", () => completeCurrentPoint());

  const itemCards = contentEl.querySelectorAll(".item-card");
  itemCards.forEach((card) => {
    const itemId = card.getAttribute("data-item-id");
    const valueInput = card.querySelector(".item-input-value");
    const noteInput = card.querySelector(".item-input-note");

    valueInput.addEventListener("input", () => {
      updateItemValue(pointResult, pointMaster, itemId, valueInput.value);
    });
    noteInput.addEventListener("input", () => {
      updateItemNote(pointResult, itemId, noteInput.value);
    });
  });
}

function updateItemValue(pointResult, pointMaster, itemId, value) {
  const item = pointResult.items.find((i) => i.itemId === itemId);
  if (!item) return;
  item.value = value;

  const masterItem = pointMaster.items.find((i) => i.id === itemId);

  if (masterItem && masterItem.range) {
    const status = judgeRange(value, masterItem.range);
    item.status = status;
  } else {
    if (
      masterItem &&
      masterItem.type === "select" &&
      (value === "異常あり" || value === "警報あり")
    ) {
      item.status = "abnormal";
    } else if (masterItem && masterItem.type === "select") {
      item.status = "normal";
    }
  }

  item.completedAt = new Date().toISOString();
  saveJsonToLS(LS_KEY_SESSION, currentSession);
  renderCurrentPoint();
  renderSummary();
}

function updateItemNote(pointResult, itemId, note) {
  const item = pointResult.items.find((i) => i.itemId === itemId);
  if (!item) return;
  item.note = note;
  saveJsonToLS(LS_KEY_SESSION, currentSession);
}

function completeCurrentPoint() {
  if (!currentSession) return;
  const pointResult = currentSession.results[currentPointIndex];
  const pointMaster = ROUTE_MASTER.points[currentPointIndex];

  for (const item of pointMaster.items) {
    const resultItem = pointResult.items.find(
      (ri) => ri.itemId === item.id
    );
    if (item.required && (!resultItem || resultItem.value === "")) {
      alert(`必須項目「${item.label}」が未入力です。`);
      return;
    }
    if (item.requiredIf) {
      const [depId, depVal] = item.requiredIf.split("=");
      const depItem = pointResult.items.find((ri) => ri.itemId === depId);
      if (depItem && depItem.value === depVal && !resultItem?.value) {
        alert(`「${depVal}」の場合、「${item.label}」は必須です。`);
        return;
      }
    }
  }

  pointResult.finishedAt = new Date().toISOString();
  pointResult.items.forEach((i) => {
    if (!i.completedAt) i.completedAt = new Date().toISOString();
  });

  saveJsonToLS(LS_KEY_SESSION, currentSession);
  updateProgress();
  renderCurrentPoint();
  renderSummary();
  updateFloorMap();
}

function movePoint(delta) {
  const newIndex = currentPointIndex + delta;
  if (newIndex < 0 || newIndex >= ROUTE_MASTER.points.length) return;
  currentPointIndex = newIndex;
  renderCurrentPoint();
  updateFloorMap();
}

function renderSummary() {
  const summaryEl = document.getElementById("summaryContent");

  if (!currentSession) {
    summaryEl.innerHTML =
      '<p class="placeholder-text">まだ巡回が完了していません。</p>';
    return;
  }

  const totalPoints = currentSession.results.length;
  const completedPoints = currentSession.results.filter(
    (r) => r.finishedAt
  ).length;

  const abnormalItems = [];
  currentSession.results.forEach((r) => {
    r.items.forEach((i) => {
      if (
        i.status === "abnormal" ||
        i.value === "異常あり" ||
        i.value === "警報あり"
      ) {
        abnormalItems.push({
          floor: r.floor,
          locationName: r.locationName,
          label: i.label,
          value: i.value,
          note: i.note
        });
      }
    });
  });

  let html = "";
  html += `<div class="summary-item">ルート: ${
    currentSession.routeName
  }</div>`;
  html += `<div class="summary-item">担当者: ${currentSession.user}</div>`;
  html += `<div class="summary-item">開始: ${formatDateTime(
    currentSession.startedAt
  )}</div>`;
  html += `<div class="summary-item">終了: ${
    currentSession.finishedAt
      ? formatDateTime(currentSession.finishedAt)
      : "未終了"
  }</div>`;
  const duration = calcDurationMinutes(
    currentSession.startedAt,
    currentSession.finishedAt
  );
  html += `<div class="summary-item">所要時間: ${
    duration ? `${duration} 分` : "-"
  }</div>`;
  html += `<div class="summary-item">ポイント完了数: ${completedPoints} / ${totalPoints}</div>`;

  if (abnormalItems.length > 0) {
    html += `<div class="summary-item">異常・要確認項目: ${abnormalItems.length} 件</div>`;
    html += `<ul class="summary-list">`;
    abnormalItems.forEach((a) => {
      html += `<li>${a.floor} ${a.locationName} - ${a.label}: ${
        a.value
      } (${a.note || "備考なし"})</li>`;
    });
    html += `</ul>`;
  } else {
    html += `<div class="summary-item">異常・要確認項目: 0 件</div>`;
  }

  summaryEl.innerHTML = html;
}

// ---- ビル縦断マップ ----

function resetFloorMap() {
  const floorEls = document.querySelectorAll(".floor-item");
  floorEls.forEach((el) => {
    el.classList.remove("floor-current", "floor-complete");
  });
}

function updateFloorMap() {
  const floorEls = document.querySelectorAll(".floor-item");
  if (!currentSession) {
    resetFloorMap();
    return;
  }

  const floorStatus = {};
  currentSession.results.forEach((r, index) => {
    const floor = r.floor;
    if (!floorStatus[floor]) floorStatus[floor] = "pending";
    if (r.finishedAt) floorStatus[floor] = "complete";
    if (index === currentPointIndex) floorStatus[floor] = "current";
  });

  floorEls.forEach((el) => {
    const floor = el.getAttribute("data-floor");
    const status = floorStatus[floor] || "pending";
    el.classList.remove("floor-current", "floor-complete");
    if (status === "current") el.classList.add("floor-current");
    else if (status === "complete") el.classList.add("floor-complete");
  });
}

// ---- CSV / JSON 出力 ----

function exportCsv() {
  if (!currentSession) {
    alert("巡回セッションがありません。");
    return;
  }

  const rows = [];
  rows.push([
    "sessionId",
    "担当者",
    "ルート名",
    "開始時刻",
    "終了時刻",
    "ポイント順序",
    "階",
    "場所",
    "項目名",
    "値",
    "備考",
    "判定",
    "項目完了時刻"
  ]);

  currentSession.results.forEach((r) => {
    r.items.forEach((i) => {
      rows.push([
        currentSession.sessionId,
        currentSession.user,
        currentSession.routeName,
        formatDateTime(currentSession.startedAt),
        currentSession.finishedAt
          ? formatDateTime(currentSession.finishedAt)
          : "",
        r.order,
        r.floor,
        r.locationName,
        i.label,
        i.value,
        i.note,
        i.status || "",
        i.completedAt ? formatDateTime(i.completedAt) : ""
      ]);
    });
  });

  const csvContent = rows
    .map((row) =>
      row
        .map((cell) => {
          const s = String(cell ?? "");
          if (s.includes(",") || s.includes("\n") || s.includes('"')) {
            return `"${s.replace(/"/g, '""')}"`;
          }
          return s;
        })
        .join(",")
    )
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `nagatx_${currentSession.sessionId}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function exportJson() {
  if (!currentSession) {
    alert("巡回セッションがありません。");
    return;
  }
  const blob = new Blob([JSON.stringify(currentSession, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `nagatx_${currentSession.sessionId}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ---- 初期化 ----

function initUser() {
  const user = loadJsonFromLS(LS_KEY_USER, null);
  if (user && user.name) {
    document.getElementById("userNameInput").value = user.name;
  }
}

function initSession() {
  const session = loadJsonFromLS(LS_KEY_SESSION, null);
  if (session) {
    currentSession = session;
    currentPointIndex = 0;
    updateHeaderTimes();
    updateProgress();
    renderCurrentPoint();
    renderSummary();
    updateFloorMap();
    document.getElementById("finishPatrolButton").disabled =
      session.status === "completed";
    document.getElementById("routeNameLabel").textContent =
      session.routeName;
  } else {
    document.getElementById("contentSection").innerHTML =
      '<p class="placeholder-text">担当者名を入力し、「巡回開始」を押して日常巡回を開始してください。</p>';
  }
}

// ---- PWA ----

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("service-worker.js")
      .catch(() => {});
  }
}

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const btn = document.getElementById("installButton");
  if (btn) btn.style.display = "inline-flex";
});

function initInstallButton() {
  const btn = document.getElementById("installButton");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    btn.style.display = "none";
  });
}

// ---- DOMContentLoaded ----

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initUser();
  initSession();
  registerServiceWorker();
  initInstallButton();

  document
    .getElementById("startPatrolButton")
    .addEventListener("click", startPatrol);
  document
    .getElementById("finishPatrolButton")
    .addEventListener("click", finishPatrol);
  document.getElementById("resetButton").addEventListener("click", resetAll);
  document
    .getElementById("exportCsvButton")
    .addEventListener("click", exportCsv);
  document
    .getElementById("exportJsonButton")
    .addEventListener("click", exportJson);
  document
    .getElementById("saveUserButton")
    .addEventListener("click", () => {
      const name = document
        .getElementById("userNameInput")
        .value.trim();
      if (!name) {
        alert("担当者名を入力してください。");
        return;
      }
      saveJsonToLS(LS_KEY_USER, { name });
      alert("担当者名を保存しました。");
    });
  document
    .getElementById("themeToggleButton")
    .addEventListener("click", toggleTheme);
});
