/**
 * 마케팅 LP 빌더 · Google Sheets 적재 웹훅
 *
 * ─────────────────────────────────────────────────────────────
 * 배포 절차 (한 번만)
 * ─────────────────────────────────────────────────────────────
 * 1) 사내 Drive > Confidential 폴더에 Google Sheet 생성 (시트 공유는 "초대된 사용자만")
 * 2) script.google.com 에서 새 프로젝트 생성
 * 3) 이 코드 전체 붙여넣기 → SPREADSHEET_ID 교체
 * 4) 저장 → "배포" → "새 배포" → 유형 "웹 앱"
 *    - 실행 계정: 나
 *    - 액세스 권한: 모든 사용자 (외부 고객 POST 허용)
 * 5) 배포 URL을 builder.html 의 pageConfig > contactForm > webhookUrl 에 붙여넣기
 *
 * ─────────────────────────────────────────────────────────────
 * 특징
 * ─────────────────────────────────────────────────────────────
 * - Append-only (수정·삭제 없음, 사내 공식 수집툴 정책 준수)
 * - 서버 측 검증 (SYSTEM.md §4-1 validators와 동일 규칙)
 * - consentAgreed: true 만 기록 (개인정보법 증빙)
 */

const SPREADSHEET_ID = 'PASTE_YOUR_SPREADSHEET_ID_HERE';
const DATA_SHEET_NAME = 'submissions';
const ERROR_SHEET_NAME = 'errors';
const BANNER_SHEET_NAME = 'banner_generations';

const HEADERS = [
  'submittedAt',    // 클라이언트 기준 ISO 타임스탬프
  'pageSlug',       // 캠페인 식별자 (예: InternetRental_01_260417_ally)
  'name',           // 고객명
  'phone',          // 연락처 (숫자만)
  'service',        // internet / rental / moving
  'addons',         // comma-separated (예: "carrier_change")
  'consentAgreed',  // 개인정보법 증빙 (boolean)
  'userAgent',
  'referrer',
  'receivedAt',     // 서버 수신 시각
];

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    if (payload && payload.action === 'generate-banner') {
      return generateBanner(payload);
    }

    // ───── 서버 측 검증 (클라이언트 우회 방어) ─────
    const name = (payload.name || '').trim();
    const phone = (payload.phone || '').replace(/[-\s]/g, '');

    if (!/^[가-힣a-zA-Z\s]{1,50}$/.test(name)) {
      return respond({ ok: false, error: 'invalid_name' });
    }
    if (!/^01[0-9]{8,9}$/.test(phone)) {
      return respond({ ok: false, error: 'invalid_phone' });
    }
    if (payload.consentAgreed !== true) {
      return respond({ ok: false, error: 'consent_required' });
    }
    // ───────────────────────────────────────────────

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = getOrCreateSheet(ss, DATA_SHEET_NAME, HEADERS);
    const addons = Array.isArray(payload.addons) ? payload.addons.join(',') : '';

    sheet.appendRow([
      payload.submittedAt || new Date().toISOString(),
      payload.pageSlug || '',
      name,
      phone,
      payload.service || '',
      addons,
      payload.consentAgreed === true,
      payload.userAgent || '',
      payload.referrer || '',
      new Date().toISOString()
    ]);

    return respond({ ok: true });
  } catch (err) {
    logError(err, e);
    return respond({ ok: false, error: String(err) });
  }
}

function generateBanner(payload) {
  const apiKey = PropertiesService
    .getScriptProperties()
    .getProperty('FAL_API_KEY');
  if (!apiKey) return respond({ ok: false, error: 'API_KEY_MISSING' });

  const model = payload.model === 'seedream-4'
    ? 'fal-ai/bytedance/seedream-4-edit'
    : 'fal-ai/nano-banana/edit';
  const body = {
    prompt: payload.prompt || '',
    num_images: 1,
    output_format: 'png'
  };
  if (payload.referenceImage) body.image_urls = [payload.referenceImage];
  if (payload.aspectRatio) body.aspect_ratio = payload.aspectRatio;

  try {
    const response = UrlFetchApp.fetch(`https://fal.run/${model}`, {
      method: 'post',
      headers: {
        Authorization: `Key ${apiKey}`,
        'Content-Type': 'application/json'
      },
      payload: JSON.stringify(body),
      muteHttpExceptions: true
    });
    const code = response.getResponseCode();
    const text = response.getContentText();
    if (code !== 200) {
      logGeneration(payload, model, '', false, text.slice(0, 300));
      return respond({ ok: false, error: 'GENERATION_FAILED' });
    }
    const result = JSON.parse(text);
    const imageUrl = result && result.images && result.images[0] ? result.images[0].url : '';
    if (!imageUrl) {
      logGeneration(payload, model, '', false, 'NO_IMAGE_URL');
      return respond({ ok: false, error: 'GENERATION_FAILED' });
    }
    logGeneration(payload, model, imageUrl, true, '');
    return respond({ ok: true, imageUrl: imageUrl, model: payload.model || 'nano-banana' });
  } catch (err) {
    logGeneration(payload, model, '', false, String(err));
    return respond({ ok: false, error: 'TIMEOUT' });
  }
}

function doGet() {
  return respond({ ok: true, service: 'lp-builder-webhook', version: '1.0.0' });
}

function respond(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#EEF1F4');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function logError(err, e) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = getOrCreateSheet(ss, ERROR_SHEET_NAME, ['at', 'error', 'rawBody']);
    sheet.appendRow([
      new Date().toISOString(),
      String(err && err.stack || err),
      e && e.postData ? e.postData.contents : ''
    ]);
  } catch (_) { /* ignore */ }
}

function logGeneration(payload, model, imageUrl, success, errorDetail) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = getOrCreateSheet(
      ss,
      BANNER_SHEET_NAME,
      ['generatedAt', 'model', 'prompt', 'imageUrl', 'success', 'errorDetail']
    );
    sheet.appendRow([
      new Date().toISOString(),
      payload.model || model,
      String(payload.prompt || '').slice(0, 100),
      imageUrl || '',
      success === true,
      errorDetail || ''
    ]);
  } catch (_) { /* ignore */ }
}
