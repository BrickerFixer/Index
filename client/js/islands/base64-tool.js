export const id = "base64-tool";
export const name = "Base64 Encoder/Decoder";
export const trigger = "search_query";
export const keywords = ["base64", "base64 tool"];
export const manually_curated = false;
export const require_context_wildcard = true;
export const context_wildcard = null;
export const column = "main";

export async function renderIsland(container, params) {
  let input = params.context_wildcard || '';
  let encoded = '';
  let decoded = '';
  let error = '';
  let mode = '';
  if (/\bencode\b/i.test(input)) {
    mode = 'encode';
    input = input.replace(/\bencode\b/i, '').trim();
    try {
      encoded = btoa(unescape(encodeURIComponent(input)));
    } catch (e) {
      encoded = 'Invalid input for encoding';
    }
  } else if (/\bdecode\b/i.test(input)) {
    mode = 'decode';
    input = input.replace(/\bdecode\b/i, '').trim();
    try {
      decoded = decodeURIComponent(escape(atob(input)));
    } catch (e) {
      decoded = 'Invalid base64 for decoding';
    }
  }
  // If there is a wildcard param, show only the result in h1
  if (params.context_wildcard) {
    let result = '';
    if (mode === 'encode') {
      result = encoded;
    } else if (mode === 'decode') {
      result = decoded;
    } else {
      // If no explicit encode/decode, show both
      try {
        encoded = btoa(unescape(encodeURIComponent(input)));
      } catch (e) {
        encoded = 'Invalid input for encoding';
      }
      try {
        decoded = decodeURIComponent(escape(atob(input)));
      } catch (e) {
        decoded = 'Invalid base64 for decoding';
      }
      result = `<div><b>Encoded:</b> <span>${encoded}</span></div><div style='margin-top:0.5em;'><b>Decoded:</b> <span>${decoded}</span></div>`;
    }
    container.innerHTML = `
      <div class="serp-block">
        <div class="serp-block__head"><div class="serp-block__head-wrap">Base64 Encoder/Decoder</div></div>
        <div class="serp-item"><div class="serp-item__wrap island island-interactive i-clearfix base64-tool-island-container">
          <h1 style="word-break:break-all;">${result}</h1>
        </div></div>
      </div>
      <style>
        .base64-tool-island-container {
          font-family: 'Inter', monospace, sans-serif;
          line-height: 32px;
          padding: 24px;
        }
      </style>
    `;
    return;
  }
  container.innerHTML = `
    <div class="serp-block">
      <div class="serp-block__head"><div class="serp-block__head-wrap">Base64 Encoder/Decoder</div></div>
      <div class="serp-item"><div class="serp-item__wrap island island-interactive i-clearfix base64-tool-island-container">
        <textarea style="width:100%;height:60px;" placeholder="Enter text or base64">${input}</textarea>
        <div style="margin:1em 0;display:flex;gap:1em;justify-content:center;">
          <button id="base64-encode-btn">Encode</button>
          <button id="base64-decode-btn">Decode</button>
        </div>
        <div><b>Encoded:</b> <span id="base64-encoded">${mode === 'encode' ? encoded : ''}</span></div>
        <div style="margin-top:0.5em;"><b>Decoded:</b> <span id="base64-decoded">${mode === 'decode' ? decoded : ''}</span></div>
      </div></div>
    </div>
    <style>
      .base64-tool-island-container {
        font-family: 'Inter', monospace, sans-serif;
        padding: 24px;
      }
      .base64-tool-island-container textarea {
        font-family: monospace;
        font-size: 1em;
        border-radius: 8px;
        border: 1px solid #ccc;
        padding: 8px;
      }
    </style>
  `;
  setTimeout(() => {
    const ta = document.querySelector('.base64-tool-island-container textarea');
    const encBtn = document.getElementById('base64-encode-btn');
    const decBtn = document.getElementById('base64-decode-btn');
    if (encBtn) encBtn.onclick = () => {
      let val = ta.value;
      let out = '';
      try {
        out = btoa(unescape(encodeURIComponent(val)));
      } catch (e) {
        out = 'Invalid input for encoding';
      }
      document.getElementById('base64-encoded').textContent = out;
    };
    if (decBtn) decBtn.onclick = () => {
      let val = ta.value;
      let out = '';
      try {
        out = decodeURIComponent(escape(atob(val)));
      } catch (e) {
        out = 'Invalid base64 for decoding';
      }
      document.getElementById('base64-decoded').textContent = out;
    };
  }, 100);
}
