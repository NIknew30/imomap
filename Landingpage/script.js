'use strict';

/* ── DATA ── */
const BEZIRKE = {
  wien: [
    {id:'w01',name:'1. – Innere Stadt', lat:48.2093,lng:16.3728,count:3},
    {id:'w02',name:'2. – Leopoldstadt', lat:48.2196,lng:16.3939,count:5},
    {id:'w03',name:'3. – Landstraße',   lat:48.1991,lng:16.3906,count:4},
    {id:'w04',name:'4. – Wieden',       lat:48.1933,lng:16.3661,count:2},
    {id:'w05',name:'5. – Margareten',   lat:48.1872,lng:16.3555,count:3},
    {id:'w06',name:'6. – Mariahilf',    lat:48.1960,lng:16.3555,count:4},
    {id:'w07',name:'7. – Neubau',       lat:48.2025,lng:16.3524,count:6},
    {id:'w08',name:'8. – Josefstadt',   lat:48.2100,lng:16.3480,count:3},
    {id:'w09',name:'9. – Alsergrund',   lat:48.2228,lng:16.3546,count:5},
    {id:'w10',name:'10. – Favoriten',   lat:48.1657,lng:16.3747,count:8},
    {id:'w11',name:'11. – Simmering',   lat:48.1717,lng:16.4242,count:3},
    {id:'w12',name:'12. – Meidling',    lat:48.1775,lng:16.3263,count:4},
    {id:'w13',name:'13. – Hietzing',    lat:48.1756,lng:16.2892,count:4},
    {id:'w14',name:'14. – Penzing',     lat:48.1986,lng:16.2866,count:3},
    {id:'w15',name:'15. – Rudolfsheim', lat:48.1957,lng:16.3310,count:5},
    {id:'w16',name:'16. – Ottakring',   lat:48.2133,lng:16.3122,count:6},
    {id:'w17',name:'17. – Hernals',     lat:48.2281,lng:16.3019,count:3},
    {id:'w18',name:'18. – Währing',     lat:48.2313,lng:16.3359,count:4},
    {id:'w19',name:'19. – Döbling',     lat:48.2497,lng:16.3477,count:5},
    {id:'w20',name:'20. – Brigittenau', lat:48.2358,lng:16.3709,count:4},
    {id:'w21',name:'21. – Floridsdorf', lat:48.2612,lng:16.4000,count:7},
    {id:'w22',name:'22. – Donaustadt',  lat:48.2394,lng:16.4614,count:9},
    {id:'w23',name:'23. – Liesing',     lat:48.1371,lng:16.3018,count:3},
  ],
  noe: [
    {id:'noe01',name:'Baden',           lat:48.0063,lng:16.2307,count:4},
    {id:'noe02',name:'Klosterneuburg',  lat:48.3044,lng:16.3267,count:3},
    {id:'noe03',name:'Mödling',         lat:48.0856,lng:16.2836,count:5},
    {id:'noe04',name:'Wiener Neustadt', lat:47.8133,lng:16.2433,count:6},
    {id:'noe05',name:'St. Pölten',      lat:48.2038,lng:15.6229,count:7},
    {id:'noe06',name:'Krems',           lat:48.4086,lng:15.5942,count:4},
    {id:'noe07',name:'Tulln',           lat:48.3300,lng:16.0561,count:3},
  ],
  ooe: [
    {id:'ooe01',name:'Linz',    lat:48.3069,lng:14.2858,count:8},
    {id:'ooe02',name:'Wels',    lat:48.1571,lng:14.0286,count:5},
    {id:'ooe03',name:'Steyr',   lat:48.0427,lng:14.4218,count:3},
    {id:'ooe04',name:'Gmunden', lat:47.9214,lng:13.7997,count:4},
  ],
  sbg: [
    {id:'sbg01',name:'Salzburg Stadt',lat:47.8095,lng:13.0550,count:6},
    {id:'sbg02',name:'Hallein',       lat:47.6835,lng:13.0960,count:2},
    {id:'sbg03',name:'Zell am See',   lat:47.3244,lng:12.7950,count:4},
    {id:'sbg04',name:'St. Johann',    lat:47.5242,lng:13.2000,count:3},
  ],
  tirol: [
    {id:'tir01',name:'Innsbruck',lat:47.2692,lng:11.4041,count:7},
    {id:'tir02',name:'Kufstein', lat:47.5833,lng:12.1667,count:3},
    {id:'tir03',name:'Kitzbühel',lat:47.4467,lng:12.3914,count:5},
    {id:'tir04',name:'Schwaz',   lat:47.3535,lng:11.7080,count:2},
  ],
  stmk: [
    {id:'stmk01',name:'Graz',  lat:47.0707,lng:15.4395,count:9},
    {id:'stmk02',name:'Leoben',lat:47.3833,lng:15.0944,count:3},
  ],
  ktn: [
    {id:'ktn01',name:'Klagenfurt',lat:46.6228,lng:14.3051,count:6},
    {id:'ktn02',name:'Villach',   lat:46.6104,lng:13.8558,count:4},
  ],
  vbg: [
    {id:'vbg01',name:'Bregenz',  lat:47.5031,lng:9.7471,count:5},
    {id:'vbg02',name:'Dornbirn', lat:47.4125,lng:9.7417,count:4},
    {id:'vbg03',name:'Feldkirch',lat:47.2336,lng:9.5993,count:3},
  ],
  bgld: [
    {id:'bgld01',name:'Eisenstadt',      lat:47.8454,lng:16.5249,count:4},
    {id:'bgld02',name:'Rust',            lat:47.8036,lng:16.6817,count:2},
    {id:'bgld03',name:'Neusiedl am See', lat:47.9478,lng:16.8389,count:3},
  ],
};

const LISTINGS = [];

/* ── STATE ── */
let map, layerStreet, layerSat;
let markers        = [];
let bezirkCircles  = {};
let selectedBez    = new Set();
let activeTypes    = new Set(['wohnung','haus']);
let activeTypeModus = new Set(['wohnung|kaufen','wohnung|mieten','haus|kaufen','haus|mieten']);
let activeLand     = 'wien';
let activeListing  = null;
let lbPhotos       = [];
let lbIndex        = 0;
let currentUser    = null;

/* ── FILTER STATE ── */
let filterModus            = 'kaufen';
let filterNurMeineInserate = false;
let filterPreisVon   = null;
let filterPreisBis   = null;
let filterFlaecheMin = null;
let filterFlaecheMax = null;
let filterZimmerMin  = null;
const DEFAULT_TYPE_MODUS = new Set(['wohnung|kaufen','wohnung|mieten','haus|kaufen','haus|mieten']);

/* ── HELPERS ── */
function slugify(str) {
  return str.toLowerCase()
    .replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss')
    .replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
}

function makeInseratPath(l) {
  const slug = slugify(`${l.title}-${l.addr}`);
  return `/inserat/${slug}-${l.id}`;
}

function extractIdFromPath(path) {
  const m = path.match(/^\/inserat\/(?:.*-)?([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})$/);
  return m ? m[1] : null;
}

function isFilterActive() {
  if (filterPreisVon || filterPreisBis || filterFlaecheMin || filterFlaecheMax || filterZimmerMin) return true;
  if (selectedBez.size > 0) return true;
  if (activeTypeModus.size !== DEFAULT_TYPE_MODUS.size || [...activeTypeModus].some(k => !DEFAULT_TYPE_MODUS.has(k))) return true;
  return false;
}

function updateFilterResetBtn() {
  const btn = document.getElementById('filterResetBtn');
  if (btn) btn.classList.toggle('active', isFilterActive());
}

window.resetAllFilters = function() {
  filterPreisVon = null; filterPreisBis = null;
  filterFlaecheMin = null; filterFlaecheMax = null;
  filterZimmerMin = null;
  selectedBez.clear();
  activeTypeModus.clear();
  DEFAULT_TYPE_MODUS.forEach(k => activeTypeModus.add(k));
  document.getElementById('preisVon').value = '';
  document.getElementById('preisBis').value = '';
  document.getElementById('flaecheMin').value = '';
  document.getElementById('flaecheMax').value = '';
  document.querySelectorAll('.zbtn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.type-btn').forEach(b => {
    const key = `${b.dataset.type}|${b.dataset.modus}`;
    b.classList.toggle('active', DEFAULT_TYPE_MODUS.has(key));
  });
  buildBezirkList(); renderMarkers(); flyToSelection();
};

/* ── SUPABASE ── */
const SUPABASE_URL  = 'https://gpodsuuugvwzldhfsrbv.supabase.co/rest/v1';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwb2RzdXV1Z3Z3emxkaGZzcmJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5MjM3MjUsImV4cCI6MjA5MjQ5OTcyNX0.GrRyrh6BQNwGgHJAUaRRmsPS-jkhzXvACU9N9gih5LY';
const { createClient } = supabase;

async function getAuthToken() {
  const { data } = await sb.auth.getSession();
  if (data?.session?.access_token) return data.session.access_token;
  // Fallback: Token könnte im sessionStorage liegen (wenn "nicht merken" gewählt)
  try {
    const key = 'sb-gpodsuuugvwzldhfsrbv-auth-token';
    const raw = sessionStorage.getItem(key) || localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      const token = parsed?.access_token || parsed?.currentSession?.access_token;
      if (token) return token;
    }
  } catch(_) {}
  return null;
}

function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
const sb = createClient('https://gpodsuuugvwzldhfsrbv.supabase.co', SUPABASE_ANON, { auth: { detectSessionInUrl: true, persistSession: true } });

/* ── EMAIL NOTIFICATIONS ── */
const EDGE_FN_INSERENT = 'https://gpodsuuugvwzldhfsrbv.supabase.co/functions/v1/send-notification';
const EDGE_FN_ABSENDER = 'https://gpodsuuugvwzldhfsrbv.supabase.co/functions/v1/clever-function';
async function sendNotificationEmail(type, payload) {
  const url = type === 'kontakt_bestaetigung' ? EDGE_FN_ABSENDER : EDGE_FN_INSERENT;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + SUPABASE_ANON },
      body: JSON.stringify({ type, ...payload }),
    });
  } catch(_) { /* fire-and-forget */ }
}

function getBezirkIdFromCoords(lat, lng) {
  let closest = null, minDist = Infinity;
  for (const list of Object.values(BEZIRKE)) {
    for (const b of list) {
      const d = Math.pow(lat - b.lat, 2) + Math.pow(lng - b.lng, 2);
      if (d < minDist) { minDist = d; closest = b; }
    }
  }
  return closest?.id || null;
}

async function sbFetch(path, params = {}) {
  const url = new URL(SUPABASE_URL + path);
  Object.entries(params).forEach(([k,v]) => url.searchParams.set(k, v));
  const token = await getAuthToken();
  const res = await fetch(url.toString(), {
    headers: {
      'apikey': SUPABASE_ANON, 'Authorization': 'Bearer ' + (token || SUPABASE_ANON),
      'Content-Type': 'application/json', 'Accept': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Supabase error: ' + res.status);
  return res.json();
}

async function loadListingsFromDB() {
  try {
    const data = await sbFetch('/inserate', { select: '*,fotos(url,ist_hauptfoto,reihenfolge)', status: 'eq.aktiv' });
    return data.map(r => ({
      id:            r.id,
      bezirk:        r.bezirk || '',
      lat:           r.lat,
      lng:           r.lng,
      type:          r.typ,
      modus:         r.modus,
      title:         r.titel,
      addr:          `${r.strasse}${r.hausnummer ? ' ' + r.hausnummer : ''}, ${r.plz} ${r.ort}`,
      hasHausnummer: !!(r.hausnummer && r.hausnummer.trim()),
      price:         r.preis_auf_anfrage ? 'Auf Anfrage' : '€ ' + Number(r.preis).toLocaleString('de-AT'),
      fl:            r.flaeche_wohn ? r.flaeche_wohn + ' m²' : '—',
      zi:            r.zimmer || '—',
      etage:         r.etage || '—',
      bj:            r.baujahr || '—',
      li:            r.ausstattung?.includes('Lift') ? 'Ja' : 'Nein',
      ba:            r.ausstattung?.includes('Balkon') ? 'Ja' : r.ausstattung?.includes('Terrasse') ? 'Terrasse' : 'Nein',
      hz:            r.heizung || '—',
      kl:            r.ausstattung?.includes('Klimaanlage') ? 'Ja' : 'Nein',
      zustand:       r.zustand || '—',
      tags:          r.ausstattung || [],
      photos:        r.fotos?.sort((a,b) => a.reihenfolge - b.reihenfolge).map(f => f.url) || [],
      user_id:       r.user_id || null,
    }));
  } catch(e) {
    console.warn('Supabase nicht erreichbar, Demo-Daten:', e.message);
    return null;
  }
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', async () => {
  initMap();
  buildBezirkList();
  wireUI();
  wireLightbox();
  wireStreetView();
  wireDarkMode();
  wireMobile();
  wireAuth();
  // Manual fallback: if redirected from password-reset link, show new-password form
  sb.auth.getSession().then(({ data }) => {
    if (data?.session && window.location.hash.includes('type=recovery')) {
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.auth-page[data-page]').forEach(p => p.classList.toggle('active', p.dataset.page === 'new-password'));
      document.getElementById('authOverlay').classList.add('visible');
      window.history.replaceState(null, '', window.location.pathname);
    }
  });
  wireKontakt();
  wireMeinBereich();
  wireFormular();

  const dbListings = await loadListingsFromDB();
  if (dbListings) {
    LISTINGS.length = 0; LISTINGS.push(...dbListings);
  }
  updateBezirkCounts();
  buildBezirkList();
  renderMarkers();

  // Deep-link routing: /inserat/{slug}-{uuid}
  const deepId = extractIdFromPath(window.location.pathname);
  if (deepId) {
    const found = LISTINGS.find(x => x.id === deepId);
    if (found) {
      // fromClick=false to avoid pushState (URL already correct), but open mobile detail
      setTimeout(() => { showDetail(found.id, false); if (window.innerWidth <= 1024) showMobileDetail(found); }, 450);
    }
  } else if (LISTINGS.length > 0 && window.innerWidth > 1024) {
    setTimeout(() => showDetail(LISTINGS[0].id, false), 450);
  }

  // Browser back/forward
  window.addEventListener('popstate', (e) => {
    const id = extractIdFromPath(window.location.pathname);
    if (id) {
      const l = LISTINGS.find(x => x.id === id);
      if (l) showDetail(l.id, false);
    }
  });
});

/* ── MAP ── */
function initMap() {
  map = L.map('map', {center:[48.2025,16.3524], zoom:15, zoomControl:true});
layerStreet = L.tileLayer(
  'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=31929e5e-e9f9-4e7f-869f-7d15a48e7505',
  {attribution:'© Stadia Maps © OpenStreetMap', maxZoom:20}
).addTo(map);
  layerSat = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {attribution:'© Esri', maxZoom:19}
  );
  map.zoomControl.setPosition('topright');
  setTimeout(() => map.invalidateSize(), 300);
  const togglePinDensity = () => document.getElementById('map').classList.toggle('compact-pins', map.getZoom() < 14);
  map.on('zoomend', togglePinDensity);
  togglePinDensity();
}

window.setLayer = function(mode) {
  if (mode === 'satellite') {
    map.removeLayer(layerStreet); layerSat.addTo(map);
    document.getElementById('btnStreet').classList.remove('active');
    document.getElementById('btnSat').classList.add('active');
  } else {
    map.removeLayer(layerSat); layerStreet.addTo(map);
    document.getElementById('btnSat').classList.remove('active');
    document.getElementById('btnStreet').classList.add('active');
  }
};

/* ── STREET VIEW ── */
function wireStreetView() {
  document.getElementById('svBtn').addEventListener('click', () => {
    if (!activeListing) return;
    const l = LISTINGS.find(x => x.id === activeListing);
    if (!l) return;
    document.getElementById('svTitle').textContent = `Street View — ${l.addr}`;
    document.getElementById('svFrame').src = `https://maps.google.com/maps?q=&layer=c&cbll=${l.lat},${l.lng}&cbp=12,0,,0,0&output=svembed`;
    document.getElementById('svOverlay').classList.add('visible');
  });
  const closeSV = () => {
    document.getElementById('svOverlay').classList.remove('visible');
    setTimeout(() => { document.getElementById('svFrame').src = ''; }, 150);
  };
  document.getElementById('svClose').addEventListener('click', e => { e.stopPropagation(); closeSV(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (document.getElementById('svOverlay').classList.contains('visible')) closeSV();
      if (document.getElementById('lightbox').classList.contains('visible')) closeLightbox();
    }
  }, true);
}

/* ── MARKERS ── */
const PIN_COLORS = {
  'wohnung|kaufen': '#1a56db',
  'wohnung|mieten': '#93b4f0',
  'haus|kaufen':    '#0e7d5c',
  'haus|mieten':    '#6dbfa3',
  'grundstueck':    '#c27803',
  'gewerbe':        '#9b1c1c',
};
function getPinColor(type, modus) {
  return PIN_COLORS[`${type}|${modus}`] || PIN_COLORS[type] || '#555';
}
const PIN_LABELS = {wohnung:'W',haus:'H',grundstueck:'G',gewerbe:'K'};

function renderMarkers() {
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  const visible = LISTINGS.filter(l => {
    const key = `${l.type}|${l.modus}`;
    if (!activeTypeModus.has(key)) return false;
    if (selectedBez.size > 0 && l.bezirk && !selectedBez.has(l.bezirk)) return false;
    const preis = parseInt(l.price.replace(/[^0-9]/g,'')) || 0;
    if (filterPreisVon && preis < filterPreisVon) return false;
    if (filterPreisBis && preis > filterPreisBis) return false;
    const flaeche = parseFloat(l.fl) || 0;
    if (filterFlaecheMin && flaeche < filterFlaecheMin) return false;
    if (filterFlaecheMax && flaeche > filterFlaecheMax) return false;
    if (filterZimmerMin && (parseFloat(l.zi) || 0) < filterZimmerMin) return false;
    if (filterNurMeineInserate && currentUser) {
      if (l.user_id !== currentUser.id) return false;
    }
    return true;
  });

  document.getElementById('resultCount').textContent =
    visible.length === 0 ? 'Keine Treffer'
      : `${visible.length} Inserat${visible.length !== 1 ? 'e' : ''} gefunden`;

  // Group by exact coordinates to spread overlapping pins
  const coordGroups = {};
  visible.forEach((l, i) => {
    const key = `${l.lat.toFixed(5)}_${l.lng.toFixed(5)}`;
    if (!coordGroups[key]) coordGroups[key] = [];
    coordGroups[key].push(i);
  });

  const offsets = visible.map(() => ({ lat: 0, lng: 0 }));
  Object.values(coordGroups).forEach(indices => {
    if (indices.length <= 1) return;
    const radius = 0.00012 * Math.ceil(indices.length / 6);
    indices.forEach((idx, pos) => {
      const angle = (2 * Math.PI * pos / indices.length) - Math.PI / 2;
      offsets[idx] = { lat: Math.cos(angle) * radius, lng: Math.sin(angle) * radius };
    });
  });

  visible.forEach((l, i) => {
    const lat = l.lat + offsets[i].lat;
    const lng = l.lng + offsets[i].lng;
    const color = getPinColor(l.type, l.modus);
    const lbl   = PIN_LABELS[l.type] || '?';
    const pinPrice = escapeHtml(l.price.replace('€ ','€\u202f'));
    const icon  = L.divIcon({
      className: '',
      html: `<div class="map-pin" style="background:${color}" data-id="${escapeHtml(String(l.id))}">
               <span class="map-pin-price">${pinPrice}</span>
               ${lbl}
             </div>`,
      iconSize: [30,30], iconAnchor: [15,15],
    });
    const m = L.marker([lat, lng], {icon}).addTo(map);
    m.on('click', () => showDetail(l.id, true));
    markers.push(m);
  });
  updateFilterResetBtn();
}

/* ── DETAIL ── */
function showDetail(id, fromClick = false) {
  activeListing = id;
  const l = LISTINGS.find(x => x.id === id);
  if (!l) return;

  document.querySelectorAll('.map-pin').forEach(p => p.classList.remove('active'));
  document.querySelectorAll(`.map-pin[data-id="${id}"]`).forEach(p => p.classList.add('active'));

  const badgeClass = {wohnung:'badge-wohnung',haus:'badge-haus',grundstueck:'badge-grundstueck',gewerbe:'badge-gewerbe'}[l.type];
  const typeLabel  = {wohnung:'Wohnung',haus:'Haus',grundstueck:'Grundstück',gewerbe:'Gewerbe'}[l.type];
  const modusLabel = {kaufen:'Kaufpreis gesamt',mieten:'Miete / Monat',pacht:'Pacht / Monat'}[l.modus] || 'Preis';

  document.getElementById('detailEmpty').style.display = 'none';
  const dc = document.getElementById('detailContent');
  dc.style.display = 'block';
  document.getElementById('contactBar').style.display = 'block';
  const _t = escapeHtml(l.title);
  const _a = escapeHtml(l.addr);
  const _p = escapeHtml(l.price);
  const _fl = escapeHtml(l.fl); const _zi = escapeHtml(l.zi); const _et = escapeHtml(l.etage);
  const _li = escapeHtml(l.li || '—'); const _ba = escapeHtml(l.ba || '—'); const _bj = escapeHtml(l.bj);
  const _hz = escapeHtml(l.hz || '—'); const _kl = escapeHtml(l.kl || '—'); const _zu = escapeHtml(l.zustand || '—');
  const _id = escapeHtml(String(l.id));
  const _pm2 = (l.fl && l.price) ? '€\u202f' + Math.round(parseInt(l.price.replace(/[^0-9]/g,'')) / parseFloat(l.fl)) : '—';
  dc.innerHTML = `
    <span class="type-badge ${badgeClass}">${typeLabel}</span>
    <h2 class="detail-title">${_t}</h2>
    <div class="detail-addr">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
      ${_a}
    </div>
    <div class="detail-price-row">
      <div class="detail-price">${_p}</div>
      <div class="detail-price-label">${modusLabel}</div>
    </div>
    <div class="stats-grid">
      <div class="stat-cell"><div class="stat-label">Fläche</div><div class="stat-value">${_fl}</div></div>
      <div class="stat-cell"><div class="stat-label">Zimmer</div><div class="stat-value">${_zi}</div></div>
      <div class="stat-cell"><div class="stat-label">Etage</div><div class="stat-value">${_et}</div></div>
      <div class="stat-cell"><div class="stat-label">Lift</div><div class="stat-value">${_li}</div></div>
      <div class="stat-cell"><div class="stat-label">Balkon</div><div class="stat-value">${_ba}</div></div>
      <div class="stat-cell"><div class="stat-label">Baujahr</div><div class="stat-value">${_bj}</div></div>
      <div class="stat-cell"><div class="stat-label">Heizung</div><div class="stat-value">${_hz}</div></div>
      <div class="stat-cell"><div class="stat-label">Klimaanlage</div><div class="stat-value">${_kl}</div></div>
      <div class="stat-cell"><div class="stat-label">Zustand</div><div class="stat-value">${_zu}</div></div>
      <div class="stat-cell"><div class="stat-label">Preis/m²</div><div class="stat-value">${_pm2}</div></div>
    </div>
  `;

  // Wire fixed contact button
  const bar = document.getElementById('contactBar');
  const fixedBtn = document.getElementById('btnContactFixed');
  bar.style.display = 'block';
  fixedBtn.textContent = 'Kontakt aufnehmen';
  fixedBtn.onclick = () => openKontakt(_id);
  const meldenFixedBtn = document.getElementById('btnMeldenFixed');
  meldenFixedBtn.style.display = 'block';
  meldenFixedBtn.onclick = () => openMelden(_id);

  lbPhotos = l.photos;
  document.getElementById('photosEmpty').style.display = 'none';
  const ps = document.getElementById('photosScroll');
  ps.style.display = 'flex';
  ps.innerHTML = l.photos.map((src, i) => {
    const isUrl = src.startsWith('http') || src.startsWith('/');
    const inner = isUrl
      ? `<img src="${src}" style="width:100%;height:100%;object-fit:cover;" />`
      : `<div class="photo-inner" style="background:${src};height:100%;"></div>`;
    return `<div class="photo-item ${i===0?'photo-main-item':'photo-thumb-item'}" onclick="openLightbox(${i})">${inner}</div>`;
  }).join('');

  if (fromClick && window.innerWidth <= 1024) showMobileDetail(l);
  if (fromClick) history.pushState({ inserat: id }, '', makeInseratPath(l));
  if (l.lat && l.lng) map.flyTo([l.lat, l.lng], Math.max(map.getZoom(), 16), { duration: 0.8 });
}

/* ── LIGHTBOX ── */
function wireLightbox() {
  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbPrev').addEventListener('click', () => moveLightbox(-1));
  document.getElementById('lbNext').addEventListener('click', () => moveLightbox(1));
  document.getElementById('lightbox').addEventListener('click', e => {
    if (e.target === document.getElementById('lightbox')) closeLightbox();
  });
}
window.openLightbox = function(index) {
  lbIndex = index; renderLightbox();
  document.getElementById('lightbox').classList.add('visible');
};
function closeLightbox() { document.getElementById('lightbox').classList.remove('visible'); }
function moveLightbox(dir) { lbIndex = (lbIndex + dir + lbPhotos.length) % lbPhotos.length; renderLightbox(); }
function renderLightbox() {
  const src = lbPhotos[lbIndex];
  const isUrl = src.startsWith('http') || src.startsWith('/');
  document.getElementById('lbImage').innerHTML = isUrl
    ? `<img src="${escapeHtml(src)}" style="width:100%;height:100%;object-fit:contain;border-radius:10px;background:var(--bg-3);padding:8px;box-sizing:border-box;" />`
    : `<div style="width:100%;height:100%;background:${escapeHtml(src)};border-radius:10px;"></div>`;
  document.getElementById('lbDots').innerHTML = lbPhotos.map((_, i) =>
    `<div class="lb-dot${i===lbIndex?' active':''}" onclick="openLightbox(${i})"></div>`
  ).join('');
}

/* ── DARK MODE ── */
function wireDarkMode() {
  document.documentElement.setAttribute('data-theme', 'light');
  document.getElementById('themeToggle').addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('immoat-theme', next); } catch(e) {}
  });
  try {
    const saved = localStorage.getItem('immoat-theme');
    if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  } catch(e) {}
}

/* ── MOBILE ── */
function wireMobile() {
  const btn     = document.getElementById('mobileFilterBtn');
  const overlay = document.getElementById('mobileOverlay');
  const sheet   = document.getElementById('mobileSheet');
  sheet.classList.remove('visible');
  overlay.classList.remove('visible');
  const openSheet = () => {
    document.getElementById('sheetScroll').innerHTML = buildFilterHTML();
    overlay.classList.add('visible');
    sheet.classList.add('visible');
  };
  const closeSheet = () => {
    overlay.classList.remove('visible');
    sheet.classList.remove('visible');
  };
  if (btn)     btn.addEventListener('click', openSheet);
  if (overlay) overlay.addEventListener('click', closeSheet);

  // X-Button im Sheet
  document.getElementById('sheetCloseBtn').addEventListener('click', closeSheet);

  // Swipe-to-close
  let touchStartY = 0;
  sheet.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, { passive: true });
  sheet.addEventListener('touchend', e => {
    const delta = e.changedTouches[0].clientY - touchStartY;
    if (delta > 60) closeSheet();
  }, { passive: true });

  // Hamburger-Menü
  const hamburger    = document.getElementById('hamburgerBtn');
  const mobileNav    = document.getElementById('mobileNavMenu');
  if (hamburger) {
    hamburger.addEventListener('click', e => {
      e.stopPropagation();
      mobileNav.classList.toggle('visible');
    });
  }
  document.addEventListener('click', e => {
    if (!e.target.closest('#hamburgerBtn') && !e.target.closest('#mobileNavMenu')) {
      mobileNav?.classList.remove('visible');
    }
  });

  // Hamburger: Darkmode-Button
  document.getElementById('mobileNavTheme')?.addEventListener('click', () => {
    document.getElementById('themeToggle').click();
  });
}

function buildFilterHTML() {
  const land = document.getElementById('bundesland').value;
  const list = BEZIRKE[land] || [];
  return `
    <div style="margin-bottom:16px;">
      <div class="type-grid">
        <button class="type-btn${activeTypeModus.has('wohnung|kaufen')?' active':''}" onclick="mobileType('wohnung|kaufen',this)" data-type="wohnung" data-modus="kaufen">
          <svg class="ti" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="8" width="18" height="13" rx="1"/><path d="M9 21V12h6v9"/><path d="M1 8l11-7 11 7"/></svg>
          <span class="type-btn-label">Wohnung</span><span class="type-btn-sub">Kaufen</span>
        </button>
        <button class="type-btn${activeTypeModus.has('wohnung|mieten')?' active':''}" onclick="mobileType('wohnung|mieten',this)" data-type="wohnung" data-modus="mieten">
          <svg class="ti" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="8" width="18" height="13" rx="1"/><path d="M9 21V12h6v9"/><path d="M1 8l11-7 11 7"/></svg>
          <span class="type-btn-label">Wohnung</span><span class="type-btn-sub">Mieten</span>
        </button>
        <button class="type-btn${activeTypeModus.has('haus|kaufen')?' active':''}" onclick="mobileType('haus|kaufen',this)" data-type="haus" data-modus="kaufen">
          <svg class="ti" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span class="type-btn-label">Haus</span><span class="type-btn-sub">Kaufen</span>
        </button>
        <button class="type-btn${activeTypeModus.has('haus|mieten')?' active':''}" onclick="mobileType('haus|mieten',this)" data-type="haus" data-modus="mieten">
          <svg class="ti" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span class="type-btn-label">Haus</span><span class="type-btn-sub">Mieten</span>
        </button>
      </div>
    </div>
    <div class="div" style="margin-bottom:12px;"></div>
    <div style="margin-bottom:12px;">
      <span class="flbl">Bundesland</span>
      <div class="sw"><select class="fsel" onchange="mobileLand(this.value)">${
        Object.keys(BEZIRKE).map(k=>`<option value="${k}"${k===land?' selected':''}>${k.toUpperCase()}</option>`).join('')
      }</select><svg class="sarr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></div>
    </div>
    <div style="margin-bottom:12px;">
      <span class="flbl">Bezirk</span>
      <div style="display:flex;flex-direction:column;gap:2px;max-height:180px;overflow-y:auto;">
        ${list.map(b=>`<button class="bezirk-btn${selectedBez.has(b.id)?' active':''}" onclick="mobileBez('${b.id}',this)">${b.name}<span class="bz-count">${b.count}</span></button>`).join('')}
      </div>
    </div>
    <div class="div" style="margin-bottom:12px;"></div>
    <div style="margin-bottom:10px;">
      <span class="flbl">Preis (€)</span>
      <div class="range-row"><input class="fi" placeholder="Von" /><span class="rsep">–</span><input class="fi" placeholder="Bis" /></div>
    </div>
    <div style="margin-bottom:10px;">
      <span class="flbl">Fläche (m²)</span>
      <div class="range-row"><input class="fi" placeholder="Min" /><span class="rsep">–</span><input class="fi" placeholder="Max" /></div>
    </div>
    <button class="btn-search" style="margin-top:8px;" onclick="mobileSearch()">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      Suchen
    </button>
    ${currentUser ? `<button id="meinsMobileToggle" class="meins-mobile-toggle${filterNurMeineInserate?' active':''}" onclick="toggleMeineInserate()">Meine Inserate anzeigen</button>` : ''}`;
}

window.mobileModus = function(val, btn) {
  filterModus = val;
  document.querySelectorAll('.seg-sel-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.mode === val));
};
window.mobileType = function(key, btn) {
  btn.classList.toggle('active');
  if (activeTypeModus.has(key)) activeTypeModus.delete(key); else activeTypeModus.add(key);
};
window.mobileLand = function(val) {
  activeLand = val; selectedBez.clear(); buildBezirkList(); renderMarkers();
};
window.mobileBez = function(id, btn) {
  btn.classList.toggle('active');
  if (selectedBez.has(id)) selectedBez.delete(id); else selectedBez.add(id);
};
window.mobileSearch = function() {
  renderMarkers(); flyToSelection();
  document.getElementById('mobileOverlay').classList.remove('visible');
  document.getElementById('mobileSheet').classList.remove('visible');
};

function showMobileDetail(l) {
  const overlay  = document.getElementById('mobileOverlay');
  const sheet    = document.getElementById('mobileSheet');
  const scroll   = document.getElementById('sheetScroll');
  const badgeClass = {wohnung:'badge-wohnung',haus:'badge-haus',grundstueck:'badge-grundstueck',gewerbe:'badge-gewerbe'}[l.type]||'badge-wohnung';
  const typeLabel  = {wohnung:'Wohnung',haus:'Haus',grundstueck:'Grundstück',gewerbe:'Gewerbe'}[l.type];
  const modusLabel = {kaufen:'Kaufpreis gesamt',mieten:'Miete / Monat',pacht:'Pacht / Monat'}[l.modus]||'Preis';
  const _mt = escapeHtml(l.title); const _ma = escapeHtml(l.addr); const _mp = escapeHtml(l.price);
  const _mfl = escapeHtml(l.fl); const _mzi = escapeHtml(l.zi); const _met = escapeHtml(l.etage); const _mbj = escapeHtml(l.bj);
  const _mid = escapeHtml(String(l.id));
  const safeTags = (l.tags||[]).map(t=>`<span class="tag">${escapeHtml(t)}</span>`).join('');
  scroll.innerHTML = `
    <span class="type-badge ${badgeClass}">${typeLabel}</span>
    <h2 class="detail-title" style="margin-bottom:6px;">${_mt}</h2>
    <div class="detail-addr"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>${_ma}</div>
    <div class="detail-price">${_mp}</div>
    <div class="detail-price-label">${modusLabel}</div>
    <div class="stats-grid" style="margin-bottom:10px;">
      <div class="stat-cell"><div class="stat-label">Fläche</div><div class="stat-value">${_mfl}</div></div>
      <div class="stat-cell"><div class="stat-label">Zimmer</div><div class="stat-value">${_mzi}</div></div>
      <div class="stat-cell"><div class="stat-label">Etage</div><div class="stat-value">${_met}</div></div>
      <div class="stat-cell"><div class="stat-label">Baujahr</div><div class="stat-value">${_mbj}</div></div>
    </div>
    <div class="tag-row">${safeTags}</div>
    <button class="btn-contact" style="margin-top:12px;" onclick="openKontakt('${_mid}')">Kontakt aufnehmen</button>
    <button class="btn-melden" onclick="openMelden('${_mid}')">Inserat melden</button>
    <div style="display:flex;flex-direction:column;gap:6px;margin-top:12px;">
      ${l.photos.map((c,i)=>{
        const isUrl = c.startsWith('http')||c.startsWith('/');
        const h = i===0 ? '200px' : '120px';
        return `<div style="border-radius:8px;overflow:hidden;cursor:pointer;height:${h};background:var(--bg-3);" onclick="openLightbox(${i})">
          ${isUrl?`<img src="${escapeHtml(c)}" style="width:100%;height:100%;object-fit:cover;display:block;"/>`:`<div style="width:100%;height:100%;"></div>`}
        </div>`;
      }).join('')}
    </div>
  `;
  overlay.classList.add('visible');
  sheet.classList.add('visible');
}

/* ── BEZIRK LIST ── */
function updateBezirkCounts() {
  // Count active listings per bezirk from loaded LISTINGS
  const counts = {};
  LISTINGS.forEach(l => {
    if (l.bezirk) counts[l.bezirk] = (counts[l.bezirk] || 0) + 1;
  });
  // Update count on every bezirk entry
  Object.values(BEZIRKE).forEach(list => {
    list.forEach(b => { b.count = counts[b.id] || 0; });
  });
}

function buildBezirkList() {
  const list = BEZIRKE[activeLand] || [];
  const el   = document.getElementById('bezirkList');
  el.innerHTML = list.map(b=>`
    <button class="bezirk-btn${selectedBez.has(b.id)?' active':''}" data-id="${b.id}">
      <span>${b.name}</span><span class="bz-count">${b.count}</span>
    </button>`).join('');
  el.querySelectorAll('.bezirk-btn').forEach(btn =>
    btn.addEventListener('click', () => toggleBezirk(btn.dataset.id))
  );
  updateBzCount();
}

function updateBzCount() {
  const n  = selectedBez.size;
  const el = document.getElementById('bzCount');
  if (n > 0) {
    el.style.display = '';
    el.innerHTML = `${n} ausgewählt <button class="bz-clear-btn" id="bzClearBtn" title="Auswahl aufheben">×</button>`;
    document.getElementById('bzClearBtn').addEventListener('click', e => {
      e.stopPropagation();
      selectedBez.clear(); buildBezirkList(); renderMarkers(); flyToSelection(); updateBezirkHighlights();
    });
  } else {
    el.textContent = ''; el.style.display = 'none';
  }
}

const bezirkGeoCache = {}; // id → GeoJSON FeatureCollection

// Direct OSM relation IDs — verified from wiki.openstreetmap.org/wiki/Vienna_OSM_Coverage
const OSM_RELATION_ID = {
  'w01': 1990592, 'w02': 1990594, 'w03': 1991416, 'w04': 1991443,
  'w05': 1991440, 'w06': 1990595, 'w07': 1990597, 'w08': 1990593,
  'w09': 1990590, 'w10': 1991436, 'w11': 1991442, 'w12': 1990596,
  'w13': 1990591, 'w14': 1990598, 'w15': 1990599, 'w16': 1991441,
  'w17': 1991438, 'w18': 1990600, 'w19': 1991435, 'w20': 1991433,
  'w21': 1991437, 'w22': 1991434, 'w23': 1991439,
  'noe01': 105088,  'noe02': 103364, 'noe03': 111858, 'noe04': 110451,
  'noe05': 134351,  'noe06': 130944, 'noe07': 106250,
  'ooe01': 151461,  'ooe02': 151463, 'ooe03': 151469, 'ooe04': 151471,
  'sbg01': 86538,   'sbg02': 86340,  'sbg03': 539863, 'sbg04': 533765,
  'tir01': 72643,   'tir02': 544102, 'tir03': 85647,  'tir04': null,
  'stmk01': 34719,  'stmk02': 49964,
  'ktn01': 105870,  'ktn02': 106163,
  'vbg01': 74231,   'vbg02': 75111,  'vbg03': 75152,
  'bgld01': 79747,  'bgld02': 78752, 'bgld03': 78829,
};

async function fetchBezirkGeo(b) {
  if (bezirkGeoCache[b.id]) return bezirkGeoCache[b.id];
  const relationId = OSM_RELATION_ID[b.id];
  const searchName = b.name.replace(/^\d+\.\s*[–-]\s*/, '').trim();
  const query = (relationId != null)
    ? `[out:json][timeout:15]; relation(${relationId}); out geom;`
    : `[out:json][timeout:15]; relation["name"="${searchName}"]["boundary"="administrative"](around:20000,${b.lat},${b.lng}); out geom;`;
  try {
    const res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query,
    });
    const data = await res.json();
    const features = data.elements.map(el => {
      // Collect all way segments as coordinate arrays
      const segments = (el.members || [])
        .filter(m => m.type === 'way' && m.geometry && m.geometry.length >= 2)
        .map(m => m.geometry.map(p => [p.lon, p.lat]));
      if (!segments.length) return null;

      // Join segments into a single closed ring by chaining end-to-start
      const ring = segments[0].slice();
      const used = new Set([0]);
      for (let i = 1; i < segments.length; i++) {
        let best = -1, bestReverse = false, bestDist = Infinity;
        const tail = ring[ring.length - 1];
        for (let j = 0; j < segments.length; j++) {
          if (used.has(j)) continue;
          const s = segments[j], e = s[s.length - 1];
          const ds = Math.hypot(s[0][0]-tail[0], s[0][1]-tail[1]);
          const de = Math.hypot(e[0]-tail[0], e[1]-tail[1]);
          if (ds < bestDist) { bestDist = ds; best = j; bestReverse = false; }
          if (de < bestDist) { bestDist = de; best = j; bestReverse = true; }
        }
        if (best === -1) break;
        used.add(best);
        const seg = bestReverse ? segments[best].slice().reverse() : segments[best].slice();
        ring.push(...seg.slice(1));
      }
      // Close the ring
      if (ring[0][0] !== ring[ring.length-1][0] || ring[0][1] !== ring[ring.length-1][1]) {
        ring.push(ring[0]);
      }
      return { type: 'Feature', geometry: { type: 'Polygon', coordinates: [ring] }, properties: {} };
    }).filter(Boolean);
    const fc = { type: 'FeatureCollection', features };
    bezirkGeoCache[b.id] = fc;
    return fc;
  } catch(e) {
    return null;
  }
}

function updateBezirkHighlights() {
  // Remove all existing layers
  Object.values(bezirkCircles).forEach(c => map.removeLayer(c));
  bezirkCircles = {};
  if (selectedBez.size === 0) return;
  const list = BEZIRKE[activeLand] || [];
  selectedBez.forEach(async id => {
    const b = list.find(x => x.id === id);
    if (!b) return;
    const geo = await fetchBezirkGeo(b);
    // If still selected after fetch, draw it
    if (!selectedBez.has(id)) return;
    if (!geo || !geo.features.length) return;
    bezirkCircles[id] = L.geoJSON(geo, {
      style: {
        color: 'transparent',
        fillColor: '#6b9fd4',
        fillOpacity: 0.13,
        weight: 0,
        interactive: false,
      },
    }).addTo(map);
  });
}

function toggleBezirk(id) {
  if (selectedBez.has(id)) selectedBez.delete(id); else selectedBez.add(id);
  buildBezirkList(); flyToSelection(); renderMarkers(); updateBezirkHighlights();
}

function flyToSelection() {
  const list = BEZIRKE[activeLand] || [];
  if (selectedBez.size === 0) {
    if (!list.length) return;
    const lats = list.map(b=>b.lat), lngs = list.map(b=>b.lng);
    map.flyToBounds([[Math.min(...lats),Math.min(...lngs)],[Math.max(...lats),Math.max(...lngs)]],{padding:[50,50],duration:0.7});
    return;
  }
  const sel = [...selectedBez].map(id=>list.find(b=>b.id===id)).filter(Boolean);
  if (!sel.length) return;
  if (sel.length === 1) {
    map.flyTo([sel[0].lat,sel[0].lng], activeLand==='wien'?15:13, {duration:0.7});
  } else {
    const lats = sel.map(b=>b.lat), lngs = sel.map(b=>b.lng);
    map.flyToBounds([[Math.min(...lats),Math.min(...lngs)],[Math.max(...lats),Math.max(...lngs)]],{padding:[40,40],duration:0.7,maxZoom:14});
  }
}

/* ── WIRE UI ── */
function wireUI() {
  document.getElementById('bundesland').addEventListener('change', e => {
    activeLand = e.target.value; selectedBez.clear();
    buildBezirkList(); renderMarkers(); updateBezirkHighlights();
    const list = BEZIRKE[activeLand] || [];
    if (!list.length) return;
    const lats = list.map(b=>b.lat), lngs = list.map(b=>b.lng);
    map.flyToBounds([[Math.min(...lats),Math.min(...lngs)],[Math.max(...lats),Math.max(...lngs)]],{padding:[80,80],duration:0.8});
  });

  document.querySelectorAll('.type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const key = `${btn.dataset.type}|${btn.dataset.modus}`;
      if (activeTypeModus.has(key)) activeTypeModus.delete(key); else activeTypeModus.add(key);
      renderMarkers();
    });
  });

  document.querySelectorAll('.zbtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const wasActive = btn.classList.contains('active');
      document.querySelectorAll('.zbtn').forEach(b => b.classList.remove('active'));
      if (!wasActive) { btn.classList.add('active'); filterZimmerMin = parseInt(btn.dataset.z); }
      else { filterZimmerMin = null; }
    });
  });

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterModus = btn.dataset.mode;
      renderMarkers();
    });
  });

  document.getElementById('searchBtn').addEventListener('click', () => {
    filterPreisVon   = parseInt(document.getElementById('preisVon').value.replace(/[^0-9]/g,''))   || null;
    filterPreisBis   = parseInt(document.getElementById('preisBis').value.replace(/[^0-9]/g,''))   || null;
    filterFlaecheMin = parseFloat(document.getElementById('flaecheMin').value) || null;
    filterFlaecheMax = parseFloat(document.getElementById('flaecheMax').value) || null;
    const activeZ = document.querySelector('.zbtn.active');
    filterZimmerMin = activeZ ? parseInt(activeZ.dataset.z) : null;
    renderMarkers(); flyToSelection();
  });
}

/* ── AUTH ── */
function wireAuth() {
  const authOverlay = document.getElementById('authOverlay');
  const userMenu    = document.getElementById('userMenu');

  // Tab switching
  document.querySelectorAll('.auth-tab, .auth-link').forEach(el => {
    el.addEventListener('click', () => {
      const tab = el.dataset.tab;
      if (!tab) return;
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
      document.querySelectorAll('.auth-page[data-page]').forEach(p => p.classList.toggle('active', p.dataset.page === tab));
    });
  });

  // Open modal via Anmelden button
  document.getElementById('authArea').addEventListener('click', e => {
    if (e.target.closest('#btnAnmelden')) {
      authOverlay.classList.add('visible');
    } else if (currentUser && e.target.closest('.user-avatar-btn')) {
      userMenu.classList.toggle('visible');
    }
  });

  // Close modal
  document.getElementById('authClose').addEventListener('click', () => authOverlay.classList.remove('visible'));
  authOverlay.addEventListener('click', e => { if (e.target === authOverlay) authOverlay.classList.remove('visible'); });

  // Close menu on outside click
  document.addEventListener('click', e => {
    if (!e.target.closest('#authArea') && !e.target.closest('#userMenu')) {
      userMenu.classList.remove('visible');
    }
  });

  // Login
  document.getElementById('loginBtn').addEventListener('click', async () => {
    const email    = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const errEl    = document.getElementById('loginError');
    const btn      = document.getElementById('loginBtn');
    errEl.textContent = '';
    btn.disabled = true; btn.textContent = 'Wird angemeldet...';
    const remember = document.getElementById('loginRemember').checked;
    // If not remembering, set storage key to session-only before sign-in
    if (!remember) {
      try { localStorage.removeItem('sb-gpodsuuugvwzldhfsrbv-auth-token'); } catch(_) {}
    }
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    btn.disabled = false; btn.textContent = 'Anmelden';
    if (error) { errEl.textContent = error.message; return; }
    // Andere Sessions beenden
    try { await sb.auth.signOut({ scope: 'others' }); } catch(_) {}
    if (!remember) {
      // Move token to sessionStorage so it's gone when browser closes
      try {
        const key = 'sb-gpodsuuugvwzldhfsrbv-auth-token';
        const val = localStorage.getItem(key);
        if (val) { sessionStorage.setItem(key, val); localStorage.removeItem(key); }
      } catch(_) {}
    }
    authOverlay.classList.remove('visible');
    setUser(data.user);
  });

  // Register
  document.getElementById('registerBtn').addEventListener('click', async () => {
    const name     = document.getElementById('registerName').value.trim();
    const email    = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const errEl    = document.getElementById('registerError');
    const btn      = document.getElementById('registerBtn');
    errEl.textContent = '';
    if (!name)               { errEl.textContent = 'Bitte Namen eingeben'; return; }
    if (!email)              { errEl.textContent = 'Bitte E-Mail eingeben'; return; }
    if (password.length < 8) { errEl.textContent = 'Passwort mind. 8 Zeichen'; return; }
    btn.disabled = true; btn.textContent = 'Wird registriert...';
    const { data: signUpData, error } = await sb.auth.signUp({ email, password, options: { data: { name } } });
    btn.disabled = false; btn.textContent = 'Konto erstellen';
    if (error) { errEl.textContent = error.message; return; }
    if (signUpData?.session) {
      authOverlay.classList.remove('visible');
      setUser(signUpData.session.user);
    } else {
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.auth-page[data-page]').forEach(p => p.classList.toggle('active', p.dataset.page === 'success'));
    }
  });

  // Password reset
  document.getElementById('resetBtn').addEventListener('click', async () => {
    const email = document.getElementById('resetEmail').value.trim();
    const errEl = document.getElementById('resetError');
    const btn   = document.getElementById('resetBtn');
    errEl.textContent = '';
    if (!email) { errEl.textContent = 'Bitte E-Mail eingeben'; return; }
    btn.disabled = true; btn.textContent = 'Wird gesendet...';
    const { error } = await sb.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + window.location.pathname
    });
    btn.disabled = false; btn.textContent = 'Link senden';
    if (error) { errEl.textContent = error.message; return; }
    document.querySelectorAll('.auth-page[data-page]').forEach(p => p.classList.toggle('active', p.dataset.page === 'reset-sent'));
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  });
  document.getElementById('resetDoneBtn').addEventListener('click', () => {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === 'login'));
    document.querySelectorAll('.auth-page[data-page]').forEach(p => p.classList.toggle('active', p.dataset.page === 'login'));
  });

  document.getElementById('newPasswordBtn').addEventListener('click', async () => {
    const pw  = document.getElementById('newPassword').value;
    const pw2 = document.getElementById('newPasswordConfirm').value;
    const errEl = document.getElementById('newPasswordError');
    const btn   = document.getElementById('newPasswordBtn');
    errEl.textContent = '';
    if (pw.length < 8)  { errEl.textContent = 'Passwort mind. 8 Zeichen'; return; }
    if (pw !== pw2)     { errEl.textContent = 'Passwörter stimmen nicht überein'; return; }
    btn.disabled = true; btn.textContent = 'Wird gespeichert...';
    const { error } = await sb.auth.updateUser({ password: pw });
    btn.disabled = false; btn.textContent = 'Passwort speichern';
    if (error) { errEl.textContent = error.message; return; }
    document.getElementById('authOverlay').classList.remove('visible');
  });

  // Inserieren — nur wenn eingeloggt
  let pendingInserieren = false;
  document.getElementById('btnInserieren').addEventListener('click', async () => {
    const { data } = await sb.auth.getSession();
    if (!data?.session?.user) { pendingInserieren = true; authOverlay.classList.add('visible'); return; }
    if (!currentUser) currentUser = data.session.user;
    openForm();
  });

  // Topbar inbox button
  document.getElementById('topbarInboxBtn').addEventListener('click', () => {
    openMeinBereich('postfach');
  });

  sb.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
    if (_event === 'PASSWORD_RECOVERY') {
      // User clicked reset link — show new password form
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.auth-page[data-page]').forEach(p => p.classList.toggle('active', p.dataset.page === 'new-password'));
      document.getElementById('authOverlay').classList.add('visible');
    }
    if (_event === 'SIGNED_IN' && pendingInserieren && session?.user) {
      pendingInserieren = false;
      authOverlay.classList.remove('visible');
      setTimeout(openForm, 50);
    }
  });

  // Logout
  document.getElementById('menuLogout').addEventListener('click', async () => {
    await sb.auth.signOut();
    setUser(null);
    userMenu.classList.remove('visible');
  });

  // Auth state — initial session check
  sb.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
}

function setUser(user) {
  currentUser = user;
  const meinsToggle = document.getElementById('meinsToggle');
  if (meinsToggle) meinsToggle.style.display = user ? '' : 'none';
  if (!user && filterNurMeineInserate) { filterNurMeineInserate = false; if (meinsToggle) meinsToggle.classList.remove('active'); renderMarkers(); }
  const authArea = document.getElementById('authArea');
  if (!authArea) return;
  const inboxWrap = document.getElementById('topbarInboxWrap');
  const navContent = document.getElementById('mobileNavContent');

  const themeIcon = `<svg class="icon-moon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`;

  if (user) {
    const name     = user.user_metadata?.name || user.email.split('@')[0];
    const initial  = escapeHtml(name.charAt(0).toUpperCase());
    const safeName = escapeHtml(name);
    authArea.innerHTML = `
      <button class="user-avatar-btn">
        <div class="user-avatar">${initial}</div>
        <span>${safeName}</span>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </button>`;
    if (inboxWrap) inboxWrap.style.display = 'flex';
    if (navContent) navContent.innerHTML = `
      <div style="padding:6px 12px 4px;font-size:11px;font-weight:600;color:var(--ink-4);letter-spacing:.06em;text-transform:uppercase;">${safeName}</div>
      <button class="mobile-nav-btn" id="mnInserate">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>
        Meine Inserate
      </button>
      <button class="mobile-nav-btn" id="mnPostfach">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        Postfach
      </button>
      <div class="mobile-nav-divider"></div>
      <button class="mobile-nav-btn" id="mnInserieren">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Inserieren
      </button>
      <button class="mobile-nav-btn" id="mnTheme">${themeIcon} Dunkel/Hell</button>
      <div class="mobile-nav-divider"></div>
      <button class="mobile-nav-btn mobile-nav-logout" id="mnLogout">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        Abmelden
      </button>`;
    document.getElementById('mnInserate')?.addEventListener('click', () => { document.getElementById('mobileNavMenu').classList.remove('visible'); openMeinBereich('inserate'); });
    document.getElementById('mnPostfach')?.addEventListener('click', () => { document.getElementById('mobileNavMenu').classList.remove('visible'); openMeinBereich('postfach'); });
    document.getElementById('mnInserieren')?.addEventListener('click', async () => {
      document.getElementById('mobileNavMenu').classList.remove('visible');
      const { data } = await sb.auth.getSession();
      if (!currentUser) currentUser = data?.session?.user ?? null;
      openForm();
    });
    document.getElementById('mnTheme')?.addEventListener('click', () => { document.getElementById('themeToggle').click(); });
    document.getElementById('mnLogout')?.addEventListener('click', async () => { document.getElementById('mobileNavMenu').classList.remove('visible'); await sb.auth.signOut(); setUser(null); });
    loadTopbarInboxBadge();
  } else {
    authArea.innerHTML = `<button class="btn-ghost" id="btnAnmelden">Anmelden</button>`;
    if (inboxWrap) inboxWrap.style.display = 'none';
    const badge = document.getElementById('topbarInboxBadge');
    if (badge) badge.style.display = 'none';
    if (navContent) navContent.innerHTML = `
      <button class="mobile-nav-btn" id="mnAnmelden">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        Anmelden
      </button>
      <div class="mobile-nav-divider"></div>
      <button class="mobile-nav-btn" id="mnTheme">${themeIcon} Dunkel/Hell</button>`;
    document.getElementById('mnAnmelden')?.addEventListener('click', () => { document.getElementById('mobileNavMenu').classList.remove('visible'); document.getElementById('authOverlay').classList.add('visible'); });
    document.getElementById('mnTheme')?.addEventListener('click', () => { document.getElementById('themeToggle').click(); });
  }
}

async function loadTopbarInboxBadge() {
  if (!currentUser) return;
  try {
    const token = await getAuthToken();
    const inserateRes = await fetch(
      `${SUPABASE_URL}/inserate?user_id=eq.${currentUser.id}&select=id`,
      { headers: { 'apikey': SUPABASE_ANON, 'Authorization': 'Bearer ' + token, 'Accept': 'application/json' } }
    );
    const inserate = await inserateRes.json();
    if (!inserate.length) return;
    const ids = inserate.map(i => i.id);
    const anfragenRes = await fetch(
      `${SUPABASE_URL}/kontaktanfragen?inserat_id=in.(${ids.join(',')})&select=id`,
      { headers: { 'apikey': SUPABASE_ANON, 'Authorization': 'Bearer ' + token, 'Accept': 'application/json' } }
    );
    const anfragen = await anfragenRes.json();
    const badge = document.getElementById('topbarInboxBadge');
    if (!badge) return;
    if (anfragen.length > 0) {
      badge.textContent = anfragen.length > 99 ? '99+' : anfragen.length;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  } catch(e) { /* silent fail */ }
}

/* ── MEIN BEREICH ── */
window.closeMeinBereich = function() { document.getElementById('meinBereichOverlay').classList.remove('visible'); };

function wireMeinBereich() {
  document.getElementById('meinBereichClose').addEventListener('click', () =>
    document.getElementById('meinBereichOverlay').classList.remove('visible'));
  document.getElementById('meinBereichOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('meinBereichOverlay'))
      document.getElementById('meinBereichOverlay').classList.remove('visible');
  });
  document.getElementById('menuMeineInserate').addEventListener('click', () => {
    document.getElementById('userMenu').classList.remove('visible');
    openMeinBereich('inserate');
  });
  document.getElementById('menuPostfach').addEventListener('click', () => {
    document.getElementById('userMenu').classList.remove('visible');
    openMeinBereich('postfach');
  });
  // Tab switching
  document.querySelectorAll('.mb-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.mb-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const which = tab.dataset.tab;
      document.getElementById('mbTabInserate').style.display = which === 'inserate' ? 'block' : 'none';
      document.getElementById('mbTabPostfach').style.display  = which === 'postfach'  ? 'block' : 'none';
      document.getElementById('mbTabGesendet').style.display  = which === 'gesendet'  ? 'block' : 'none';
      if (which === 'postfach') loadPostfach();
      if (which === 'gesendet') loadGesendet();
      if (which === 'inserate') openMeinBereich('inserate');
    });
  });
}

async function loadPostfach() {
  if (!currentUser) return;
  const loading = document.getElementById('postfachLoading');
  const list    = document.getElementById('postfachList');
  loading.style.display = 'flex';
  list.innerHTML = '';
  try {
    const token = await getAuthToken();
    // Fetch anfragen for inserate owned by this user
    const inserateRes = await fetch(
      `${SUPABASE_URL}/inserate?user_id=eq.${currentUser.id}&select=id,titel,strasse,hausnummer`,
      { headers: { 'apikey': SUPABASE_ANON, 'Authorization': 'Bearer ' + token, 'Accept': 'application/json' } }
    );
    const inserate = await inserateRes.json();
    loading.style.display = 'none';
    const ids = inserate.map(i => i.id);
    const inseratMap = Object.fromEntries(inserate.map(i => [i.id, i]));
    let anfragen = [];
    if (ids.length) {
      const anfragenRes = await fetch(
        `${SUPABASE_URL}/kontaktanfragen?inserat_id=in.(${ids.join(',')})&order=erstellt_am.desc`,
        { headers: { 'apikey': SUPABASE_ANON, 'Authorization': 'Bearer ' + token, 'Accept': 'application/json' } }
      );
      anfragen = await anfragenRes.json();
    }
    // Also load Meldungen directed to this account (inserent_id = own id, absender_name = [Meldung])
    const meldenRes = await fetch(
      `${SUPABASE_URL}/kontaktanfragen?inserent_id=eq.dd9478d0-fbf7-4974-9001-175a198d8a9c&absender_name=eq.[Meldung]&order=erstellt_am.desc`,
      { headers: { 'apikey': SUPABASE_ANON, 'Authorization': 'Bearer ' + token, 'Accept': 'application/json' } }
    );
    const meldungen = await meldenRes.json();
    // Merge: meldungen first, then regular anfragen (deduplicated by id)
    const seenIds = new Set();
    anfragen = [...meldungen, ...anfragen].filter(a => { if (seenIds.has(a.id)) return false; seenIds.add(a.id); return true; });
    // Extend inseratMap with inserat info for meldungen from other users' listings
    const missingIds = [...new Set(meldungen.map(m => m.inserat_id).filter(id => id && !inseratMap[id]))];
    if (missingIds.length) {
      const extRes = await fetch(
        `${SUPABASE_URL}/inserate?id=in.(${missingIds.join(',')})&select=id,titel,strasse,hausnummer`,
        { headers: { 'apikey': SUPABASE_ANON, 'Authorization': 'Bearer ' + token, 'Accept': 'application/json' } }
      );
      const extInserate = await extRes.json();
      extInserate.forEach(i => { inseratMap[i.id] = i; });
    }
    if (!anfragen.length) { list.innerHTML = '<p style="color:var(--ink-4);font-size:12px;padding:20px 0;">Noch keine Nachrichten erhalten.</p>'; return; }
    // Update badge
    const badge = document.getElementById('postfachBadge');
    badge.textContent = anfragen.length; badge.style.display = 'inline';
    list.innerHTML = anfragen.map(a => {
      const isMeldung = a.absender_name === '[Meldung]';
      const ins       = inseratMap[a.inserat_id];
      const insTitel  = ins ? escapeHtml(ins.titel || '') : 'Unbekanntes Inserat';
      const insAddr   = ins ? escapeHtml([ins.strasse, ins.hausnummer].filter(Boolean).join(' ')) : '';
      const datum     = new Date(a.erstellt_am).toLocaleDateString('de-AT', { day:'2-digit', month:'2-digit', year:'numeric' });
      const safeName  = isMeldung ? '🚨 Inserat gemeldet' : escapeHtml(a.absender_name);
      const safeMsg   = escapeHtml(a.nachricht);
      const safeTel   = escapeHtml(a.absender_tel);
      const safeId    = escapeHtml(a.id);
      const insLink   = a.inserat_id ? `<a class="pf-inserat-link" onclick="closeMeinBereich();showDetail('${a.inserat_id}',true)">${insTitel}${insAddr ? ' · ' + insAddr : ''}</a>` : `<span>${insTitel}</span>`;
      const readIds = JSON.parse(localStorage.getItem('imomap_read') || '[]');
      const isReadAlready = readIds.includes(String(a.id));
      return `
        <div class="pf-card${isMeldung ? ' pf-meldung' : ''}${isReadAlready ? ' pf-read-done' : ''}" data-pfid="${escapeHtml(String(a.id))}">
          <div class="pf-meta">
            <span class="pf-name">${safeName}</span>
            <span class="pf-date">${datum}</span>
          </div>
          <div class="pf-inserat">${insLink}</div>
          <div class="pf-msg">${safeMsg}</div>
          <div class="pf-actions">
            ${!isMeldung && a.absender_email ? `<a class="pf-reply" href="mailto:${encodeURIComponent(a.absender_email)}?subject=Re: ${encodeURIComponent(ins ? ins.titel : '')}">Antworten</a>` : ''}
            ${safeTel ? `<a class="pf-tel" href="tel:${safeTel}">${safeTel}</a>` : ''}
            <button class="pf-read" onclick="pfMarkRead(this)">${isReadAlready ? 'Ungelesen' : 'Gelesen'}</button>
            <button class="pf-del" onclick="pfDelete('${safeId}',this)">Löschen</button>
          </div>
        </div>`;
    }).join('');
  } catch(e) {
    loading.style.display = 'none';
    list.innerHTML = `<p style="color:#ef4444;font-size:12px;">Fehler: ${e.message}</p>`;
  }
}

async function loadGesendet() {
  if (!currentUser) return;
  const loading = document.getElementById('gesendetLoading');
  const list    = document.getElementById('gesendetList');
  loading.style.display = 'flex';
  list.innerHTML = '';
  try {
    const token = await getAuthToken();
    const res = await fetch(
      `${SUPABASE_URL}/kontaktanfragen?absender_id=eq.${currentUser.id}&order=erstellt_am.desc`,
      { headers: { 'apikey': SUPABASE_ANON, 'Authorization': 'Bearer ' + token, 'Accept': 'application/json' } }
    );
    const anfragen = await res.json();
    loading.style.display = 'none';
    if (!anfragen.length) {
      list.innerHTML = '<p style="color:var(--ink-4);font-size:12px;padding:20px 0;">Noch keine Nachrichten gesendet.</p>';
      return;
    }
    // Fetch inserat titles for display
    const inseratIds = [...new Set(anfragen.map(a => a.inserat_id).filter(Boolean))];
    let inseratMap = {};
    if (inseratIds.length) {
      const insRes = await fetch(
        `${SUPABASE_URL}/inserate?id=in.(${inseratIds.join(',')})&select=id,titel,strasse,hausnummer`,
        { headers: { 'apikey': SUPABASE_ANON, 'Authorization': 'Bearer ' + token, 'Accept': 'application/json' } }
      );
      const inserate = await insRes.json();
      inseratMap = Object.fromEntries(inserate.map(i => [i.id, i]));
    }
    list.innerHTML = anfragen.map(a => {
      const ins      = inseratMap[a.inserat_id];
      const insTitel = ins ? escapeHtml(ins.titel || '') : 'Unbekanntes Inserat';
      const insAddr  = ins ? escapeHtml([ins.strasse, ins.hausnummer].filter(Boolean).join(' ')) : '';
      const datum    = new Date(a.erstellt_am).toLocaleDateString('de-AT', { day:'2-digit', month:'2-digit', year:'numeric' });
      const safeMsg  = escapeHtml(a.nachricht);
      const insLink  = a.inserat_id
        ? `<a class="pf-inserat-link" onclick="closeMeinBereich();showDetail('${a.inserat_id}',true)">${insTitel}${insAddr ? ' · ' + insAddr : ''}</a>`
        : `<span>${insTitel}</span>`;
      return `
        <div class="pf-card">
          <div class="pf-meta">
            <span class="pf-name">An: ${insLink}</span>
            <span class="pf-date">${datum}</span>
          </div>
          <div class="pf-msg">${safeMsg}</div>
        </div>`;
    }).join('');
  } catch(e) {
    loading.style.display = 'none';
    list.innerHTML = `<p style="color:#ef4444;font-size:12px;">Fehler: ${e.message}</p>`;
  }
}

window.pfMarkRead = function(btn) {
  const card = btn.closest('.pf-card');
  card.classList.toggle('pf-read-done');
  const isRead = card.classList.contains('pf-read-done');
  btn.textContent = isRead ? 'Ungelesen' : 'Gelesen';
  const id = card.dataset.pfid;
  if (!id) return;
  const read = JSON.parse(localStorage.getItem('imomap_read') || '[]');
  if (isRead) { if (!read.includes(id)) read.push(id); }
  else { const i = read.indexOf(id); if (i > -1) read.splice(i, 1); }
  localStorage.setItem('imomap_read', JSON.stringify(read));
};

window.pfDelete = async function(id, btn) {
  if (!currentUser) return;
  const token = await getAuthToken();
  // Verify ownership: only delete if the kontaktanfrage belongs to one of our inserate
  const ownRes = await fetch(
    `${SUPABASE_URL}/kontaktanfragen?id=eq.${id}&select=inserat_id`,
    { headers: { 'apikey': SUPABASE_ANON, 'Authorization': 'Bearer ' + token, 'Accept': 'application/json' } }
  );
  const ownData = await ownRes.json().catch(() => []);
  if (!ownData.length) return; // not found
  const inseratId = ownData[0].inserat_id;
  const checkRes = await fetch(
    `${SUPABASE_URL}/inserate?id=eq.${inseratId}&user_id=eq.${currentUser.id}&select=id`,
    { headers: { 'apikey': SUPABASE_ANON, 'Authorization': 'Bearer ' + token, 'Accept': 'application/json' } }
  );
  const checkData = await checkRes.json().catch(() => []);
  if (!checkData.length) return; // not our inserat
  btn.closest('.pf-card').remove();
  await fetch(`${SUPABASE_URL}/kontaktanfragen?id=eq.${id}`, {
    method: 'DELETE',
    headers: { 'apikey': SUPABASE_ANON, 'Authorization': 'Bearer ' + token }
  });
  // Update badge
  const remaining = document.querySelectorAll('.pf-card').length;
  const badge = document.getElementById('postfachBadge');
  if (remaining === 0) { badge.style.display = 'none'; document.getElementById('postfachList').innerHTML = '<p style="color:var(--ink-4);font-size:12px;padding:20px 0;">Noch keine Nachrichten erhalten.</p>'; }
  else { badge.textContent = remaining; }
};

async function openMeinBereich(tab = 'inserate') {
  if (!currentUser) return;
  const overlay = document.getElementById('meinBereichOverlay');
  const loading = document.getElementById('meinBereichLoading');
  const list    = document.getElementById('meinBereichList');
  overlay.classList.add('visible');
  // Switch to requested tab
  document.querySelectorAll('.mb-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.getElementById('mbTabInserate').style.display = tab === 'inserate' ? 'block' : 'none';
  document.getElementById('mbTabPostfach').style.display  = tab === 'postfach'  ? 'block' : 'none';
  document.getElementById('mbTabGesendet').style.display  = tab === 'gesendet'  ? 'block' : 'none';
  if (tab === 'postfach') { loadPostfach(); return; }
  if (tab === 'gesendet') { loadGesendet(); return; }
  loading.style.display = 'flex';
  list.innerHTML = '';

  try {
    const res = await fetch(
      `${SUPABASE_URL}/inserate?user_id=eq.${currentUser.id}&select=*,fotos(url,ist_hauptfoto,reihenfolge)&order=erstellt_am.desc&status=neq.geloescht`,
      { headers: { 'apikey': SUPABASE_ANON, 'Authorization': 'Bearer ' + (await getAuthToken()), 'Accept': 'application/json' } }
    );
    const data = await res.json();
    loading.style.display = 'none';

    if (!data.length) {
      list.innerHTML = `
        <div class="mb-empty">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <p>Sie haben noch keine Inserate.</p>
          <button class="mb-empty-btn" onclick="document.getElementById('meinBereichOverlay').classList.remove('visible');openForm();">Jetzt inserieren</button>
        </div>`;
      return;
    }

    list.innerHTML = data.map(r => {
      const foto = r.fotos?.sort((a,b) => a.reihenfolge - b.reihenfolge)[0];
      const fotoHtml = foto
        ? `<img src="${foto.url}" alt="" />`
        : `<div class="mb-foto-placeholder"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>`;
      const statusLabel = {aktiv:'Aktiv',pausiert:'Pausiert',entwurf:'Entwurf'}[r.status] || r.status;
      const preis = r.preis_auf_anfrage ? 'Auf Anfrage' : '€ ' + Number(r.preis).toLocaleString('de-AT');
      const addr  = `${r.strasse}${r.hausnummer?' '+r.hausnummer:''}, ${r.plz} ${r.ort}`;
      const pauseBtn = r.status === 'aktiv'
        ? `<button class="mb-btn mb-btn-pause" onclick="mbSetStatus('${r.id}','pausiert')"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>Pausieren</button>`
        : `<button class="mb-btn mb-btn-aktiv" onclick="mbSetStatus('${r.id}','aktiv')"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>Aktivieren</button>`;
      return `
        <div class="mb-card" id="mbcard-${r.id}">
          <div class="mb-foto">${fotoHtml}</div>
          <div class="mb-info">
            <div class="mb-title">${r.titel}</div>
            <div class="mb-addr">${addr}</div>
            <div class="mb-meta">
              <span class="mb-price">${preis}</span>
              <span class="mb-status mb-status-${r.status}">${statusLabel}</span>
            </div>
          </div>
          <div class="mb-actions">
            <button class="mb-btn mb-btn-edit" onclick="mbEdit('${r.id}')">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Bearbeiten
            </button>
            ${pauseBtn}
            <button class="mb-btn mb-btn-danger" onclick="mbDelete('${r.id}')">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
              Löschen
            </button>
          </div>
        </div>`;
    }).join('');
  } catch(e) {
    loading.style.display = 'none';
    list.innerHTML = `<p style="color:#ef4444;font-size:12px;">Fehler: ${e.message}</p>`;
  }
}

window.mbSetStatus = async function(id, status) {
  if (!currentUser) { alert('Nicht angemeldet.'); return; }
  const allowed = ['aktiv', 'pausiert', 'entwurf'];
  if (!allowed.includes(status)) { alert('Ungültiger Status.'); return; }
  const token = await getAuthToken();
  const res = await fetch(`${SUPABASE_URL}/inserate?id=eq.${id}&user_id=eq.${currentUser.id}`, {
    method: 'PATCH',
    headers: { 'apikey': SUPABASE_ANON, 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
    body: JSON.stringify({ status })
  });
  if (!res.ok) { const e = await res.json().catch(()=>({})); alert('Fehler: ' + (e.message || res.status)); return; }
  const fresh = await loadListingsFromDB();
  if (fresh) { LISTINGS.length = 0; LISTINGS.push(...fresh); updateBezirkCounts(); buildBezirkList(); renderMarkers(); }
  openMeinBereich();
};

window.mbDelete = async function(id) {
  if (!confirm('Inserat wirklich löschen?')) return;
  const token = await getAuthToken();
  const res = await fetch(`${SUPABASE_URL}/inserate?id=eq.${id}&user_id=eq.${currentUser.id}`, {
    method: 'DELETE',
    headers: { 'apikey': SUPABASE_ANON, 'Authorization': 'Bearer ' + token }
  });
  if (!res.ok) { const e = await res.json().catch(() => ({})); alert('Löschen fehlgeschlagen: ' + (e.message || res.status)); return; }
  document.getElementById(`mbcard-${id}`)?.remove();
  const fresh = await loadListingsFromDB();
  if (fresh) { LISTINGS.length = 0; LISTINGS.push(...fresh); updateBezirkCounts(); buildBezirkList(); renderMarkers(); }
  if (!document.querySelector('.mb-card')) openMeinBereich();
};

window.mbEdit = async function(id) {
  // Fetch full inserat data
  const editFetchToken = await getAuthToken();
  const res = await fetch(`${SUPABASE_URL}/inserate?id=eq.${id}&user_id=eq.${currentUser.id}&select=*`, {
    headers: { 'apikey': SUPABASE_ANON, 'Authorization': 'Bearer ' + editFetchToken, 'Accept': 'application/json' }
  });
  const [r] = await res.json();
  if (!r) return;

  // Close mein bereich, open form in edit mode
  document.getElementById('meinBereichOverlay').classList.remove('visible');
  document.getElementById('formBtnNext').disabled = false;
  formEditId = id;
  formPhotos = [];
  formCoords = { lat: r.lat || null, lng: r.lng || null };
  formCurrentStep = 1;
  renderFormStep(1);
  document.getElementById('formOverlay').classList.add('visible');
  document.body.style.overflow = 'hidden';

  // Prefill step 1
  document.getElementById('fTitel').value  = r.titel || '';
  document.getElementById('fPreis').value  = r.preis || '';
  document.querySelectorAll('#fTypModusGrid .type-sel-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.typ === r.typ && b.dataset.modus === r.modus)
  );

  // Prefill step 2
  document.getElementById('fStrasse').value    = r.strasse || '';
  document.getElementById('fHausnummer').value = r.hausnummer || '';
  document.getElementById('fPlz').value        = r.plz || '';
  document.getElementById('fOrt').value        = r.ort || '';
  setAutoBezirk(bezirkFromPlz(r.plz) || r.bezirk_name || r.bezirk || null);
  const blSel = document.getElementById('fBundesland');
  if (r.bundesland) [...blSel.options].forEach(o => { if (o.value === r.bundesland || r.bundesland.includes(o.value)) blSel.value = o.value; });

  // Prefill step 3
  document.getElementById('fFlaeche').value     = r.flaeche_wohn || '';
  document.getElementById('fZimmer').value      = r.zimmer || '';
  document.getElementById('fEtage').value       = r.etage || '';
  document.getElementById('fBaujahr').value     = r.baujahr || '';
  document.getElementById('fHeizung').value     = r.heizung || '';
  document.getElementById('fBeschreibung').value = r.beschreibung || '';
  if (r.ausstattung) {
    document.querySelectorAll('#fAusstattung input').forEach(cb => { cb.checked = r.ausstattung.includes(cb.value); });
  }

  // Prefill step 4 contact — robust fallback to currentUser
  const _cName  = r.inserent_name  || currentUser?.user_metadata?.name || currentUser?.email?.split('@')[0] || '';
  const _cEmail = r.inserent_email || currentUser?.email || '';
  const _cTel   = r.inserent_tel   || '';
  document.getElementById('fKontaktName').value  = _cName;
  document.getElementById('fKontaktEmail').value = _cEmail;
  document.getElementById('fKontaktTel').value   = _cTel;
  _formEditContactCache = { name: _cName, email: _cEmail, tel: _cTel };

  // Update minimap if we have coords
  if (r.lat && r.lng) {
    setTimeout(() => updateMiniMap(r.lat, r.lng, `${r.strasse} ${r.hausnummer || ''}`), 200);
  }
};

/* ── KONTAKT ── */
function wireKontakt() {
  document.getElementById('kontaktClose').addEventListener('click', () =>
    document.getElementById('kontaktOverlay').classList.remove('visible'));
  document.getElementById('kontaktOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('kontaktOverlay'))
      document.getElementById('kontaktOverlay').classList.remove('visible');
  });
  document.getElementById('kontaktSchliessen').addEventListener('click', () =>
    document.getElementById('kontaktOverlay').classList.remove('visible'));

  document.getElementById('kontaktSendBtn').addEventListener('click', async () => {
    const name      = document.getElementById('kName').value.trim();
    const email     = document.getElementById('kEmail').value.trim();
    const tel       = document.getElementById('kTel').value.trim();
    const checkedTexts = [...document.querySelectorAll('.k-check input:checked')].map(c => c.value);
    const extraText    = document.getElementById('kNachricht').value.trim();
    const nachricht    = [...checkedTexts, ...(extraText ? [extraText] : [])].join(' ');
    const errEl      = document.getElementById('kontaktError');
    const btn        = document.getElementById('kontaktSendBtn');
    errEl.textContent = '';
    if (!name)      { errEl.textContent = 'Bitte Namen eingeben'; return; }
    if (!email)     { errEl.textContent = 'Bitte E-Mail eingeben'; return; }
    if (!nachricht) { errEl.textContent = 'Bitte mindestens eine Option auswählen oder eine Nachricht eingeben'; return; }

    btn.disabled = true; btn.textContent = 'Wird gesendet...';
    const l = LISTINGS.find(x => x.id === activeListing);
    try {
      const res = await fetch(SUPABASE_URL + '/kontaktanfragen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON, 'Authorization': 'Bearer ' + SUPABASE_ANON, 'Prefer': 'return=minimal' },
        body: JSON.stringify({ inserat_id: l?.id || null, inserent_id: l?.user_id || null, absender_id: currentUser?.id || null, absender_name: name, absender_email: email, absender_tel: tel || null, nachricht }),
      });
      if (!res.ok) {
        let msg = 'Fehler beim Senden';
        try { const e = await res.json(); msg = e.error || e.message || msg; } catch(_) {}
        throw new Error(msg);
      }
      document.getElementById('kontaktForm').classList.remove('active');
      document.getElementById('kontaktSuccess').classList.add('active');
      sendNotificationEmail('kontaktanfrage', { inserent_id: l?.user_id, inserat_titel: l?.title, absender_name: name, absender_email: email, nachricht });
      sendNotificationEmail('kontakt_bestaetigung', { absender_email: email, absender_name: name, inserat_titel: l?.title, inserat_addr: l?.addr });
    } catch(e) {
      errEl.textContent = 'Fehler: ' + e.message;
    } finally {
      btn.disabled = false; btn.textContent = 'Nachricht senden';
    }
  });
}

window.openKontakt = function(inseratId) {
  const l = LISTINGS.find(x => String(x.id) === String(inseratId));
  if (!l) return;
  document.getElementById('kName').value      = currentUser?.user_metadata?.name || '';
  document.getElementById('kEmail').value     = currentUser?.email || '';
  document.getElementById('kTel').value       = '';
  document.getElementById('kNachricht').value = '';
  document.getElementById('kontaktError').textContent = '';
  document.getElementById('kontaktForm').classList.add('active');
  document.getElementById('kontaktSuccess').classList.remove('active');
  document.getElementById('kontaktTitel').textContent   = l.title;
  document.getElementById('kontaktAdresse').textContent = l.addr;
  // Reset checkboxes
  document.querySelectorAll('.k-check input').forEach(c => { c.checked = false; });
  document.getElementById('kontaktOverlay').classList.add('visible');
};



/* ── MELDEN ── */
let _meldenInseratId = null;

window.openMelden = function(inseratId) {
  const l = LISTINGS.find(x => String(x.id) === String(inseratId));
  _meldenInseratId = inseratId;
  document.querySelectorAll('#meldenModal input[name="meldenGrund"]').forEach(c => { c.checked = false; });
  document.getElementById('meldenText').value = '';
  document.getElementById('meldenError').textContent = '';
  document.getElementById('meldenForm').classList.add('active');
  document.getElementById('meldenSuccess').classList.remove('active');
  document.getElementById('meldenAdresse').textContent = l ? (l.title + ' · ' + l.addr) : ('Inserat #' + inseratId);
  document.getElementById('meldenOverlay').classList.add('visible');
};

window.closeMelden = function() {
  document.getElementById('meldenOverlay').classList.remove('visible');
  _meldenInseratId = null;
};

window.submitMelden = async function() {
  const checked = [...document.querySelectorAll('#meldenModal input[name="meldenGrund"]:checked')].map(c => c.value);
  const text    = document.getElementById('meldenText').value.trim();
  const errEl   = document.getElementById('meldenError');
  const btn     = document.getElementById('meldenSendBtn');
  if (!checked.length && !text) { errEl.textContent = 'Bitte mindestens einen Grund auswählen oder eine Beschreibung eingeben.'; return; }
  errEl.textContent = '';
  btn.disabled = true; btn.textContent = 'Wird gesendet…';

  const l = LISTINGS.find(x => String(x.id) === String(_meldenInseratId));
  const nachricht = '[MELDUNG] Gründe: ' + (checked.length ? checked.join(', ') : '—') + (text ? ' | Details: ' + text : '');

  try {
    const res = await fetch(SUPABASE_URL + '/kontaktanfragen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON, 'Authorization': 'Bearer ' + SUPABASE_ANON, 'Prefer': 'return=minimal' },
      body: JSON.stringify({ inserat_id: l?.id || null, inserent_id: 'dd9478d0-fbf7-4974-9001-175a198d8a9c', absender_name: '[Meldung]', absender_email: 'contact@webwien.com', absender_tel: null, nachricht }),
    });
    if (!res.ok) throw new Error('Fehler');
    document.getElementById('meldenForm').classList.remove('active');
    document.getElementById('meldenSuccess').classList.add('active');
  } catch(e) {
    errEl.textContent = 'Fehler beim Senden. Bitte versuche es später erneut.';
  } finally {
    btn.disabled = false; btn.textContent = 'Meldung absenden';
  }
};

/* ── INSERAT FORMULAR ── */
let formCurrentStep = 1;
const FORM_TOTAL    = 4;
let formMiniMap     = null;
let formMiniMarker  = null;
let formPhotos      = [];
let formCoords      = { lat: null, lng: null };
let formEditId      = null;
let addrDebounce    = null;
let _formEditContactCache = null;

function wireFormular() {
  document.getElementById('formClose').addEventListener('click', closeForm);
  document.getElementById('formOverlay').addEventListener('click', e => { if (e.target === document.getElementById('formOverlay')) closeForm(); });
  document.getElementById('formBtnNext').addEventListener('click', formNext);
  document.getElementById('formBtnBack').addEventListener('click', formBack);
  wireFormStep1();
  wireFormStep2();
  wireFormStep4();

  // Tastatur auf Mobile: form-footer immer sichtbar halten
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => {
      const modal = document.getElementById('formModal');
      if (!modal) return;
      const vvH = window.visualViewport.height;
      const offset = window.innerHeight - vvH;
      modal.style.marginBottom = offset > 0 ? offset + 'px' : '';
    });
  }
}

function openForm() {
  formCurrentStep = 1; formPhotos = []; formCoords = { lat: null, lng: null }; formEditId = null; _formEditContactCache = null;
  document.getElementById('formBtnNext').disabled = false;
  // Clear all form fields
  ['fTitel','fPreis','fStrasse','fHausnummer','fPlz','fOrt','fFlaeche','fZimmer','fEtage','fBaujahr'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  setAutoBezirk(null); // clears readonly + badge
  document.getElementById('fHeizung').value  = '';
  document.getElementById('fZustand').value  = '';
  document.querySelectorAll('#fAusstattung input').forEach(c => { c.checked = false; });
  document.querySelectorAll('#fTypModusGrid .type-sel-btn').forEach((b,i) => b.classList.toggle('active', i===0));
  document.getElementById('addrMapPreview').classList.remove('visible');
  // Prefill contact with logged-in user
  document.getElementById('fKontaktName').value  = currentUser?.user_metadata?.name || '';
  document.getElementById('fKontaktEmail').value = currentUser?.email || '';
  document.getElementById('fKontaktTel').value   = '';
  renderFormStep(1);
  document.getElementById('formOverlay').classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeForm() {
  document.getElementById('formOverlay').classList.remove('visible');
  document.body.style.overflow = '';
}

function renderFormStep(step) {
  document.querySelectorAll('.form-page').forEach(p => p.classList.remove('active'));
  document.querySelector(`.form-page[data-page="${step}"]`).classList.add('active');
  document.querySelectorAll('.form-step').forEach(s => {
    s.classList.remove('active','done');
    const n = parseInt(s.dataset.step);
    if (n < step)  s.classList.add('done');
    if (n === step) s.classList.add('active');
    const num = s.querySelector('.step-num');
    if (n < step) num.innerHTML = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`;
    else num.textContent = n;
  });
  document.getElementById('formBtnBack').style.visibility = step > 1 ? 'visible' : 'hidden';
  document.getElementById('formStepIndicator').textContent = `Schritt ${step} von ${FORM_TOTAL}`;
  const nextBtn = document.getElementById('formBtnNext');
  nextBtn.disabled = false;
  if (step === FORM_TOTAL) {
    nextBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> ${formEditId ? 'Änderungen speichern' : 'Inserat einreichen'}`;
  } else {
    nextBtn.innerHTML = `Weiter <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>`;
  }
  if (step === 2) setTimeout(() => { if (!formMiniMap) initFormMiniMap(); else formMiniMap.invalidateSize(); document.getElementById('addrMapPreview').classList.add('visible'); }, 100);
  const contactBar = document.getElementById('formContactBar');
  if (contactBar) contactBar.style.display = (step === 4) ? 'block' : 'none';
  if (step === 4 && formEditId) {
    // Re-apply contact prefill so it's never lost when editing
    const r = _formEditContactCache;
    const name  = r?.name  || currentUser?.user_metadata?.name || currentUser?.email?.split('@')[0] || '';
    const email = r?.email || currentUser?.email || '';
    const tel   = r?.tel   || '';
    document.getElementById('fKontaktName').value  = name;
    document.getElementById('fKontaktEmail').value = email;
    document.getElementById('fKontaktTel').value   = tel;
  }
}

function formNext() {
  if (!validateStep(formCurrentStep)) return;
  if (formCurrentStep === FORM_TOTAL) { submitForm(); return; }
  formCurrentStep++; renderFormStep(formCurrentStep);
}
function formBack() {
  if (formCurrentStep > 1) { formCurrentStep--; renderFormStep(formCurrentStep); }
}

function validateStep(step) {
  clearErrors();
  if (step === 1) {
    if (!document.getElementById('fTitel').value.trim()) { showError('fTitel','Bitte einen Titel eingeben'); return false; }
    const preis = parseFloat(document.getElementById('fPreis').value);
    if (!preis || preis <= 0) { showError('fPreis','Bitte einen Preis größer 0 eingeben'); return false; }
  }
  if (step === 2) {
    if (!document.getElementById('fStrasse').value.trim()) { showError('fStrasse','Straße ist Pflichtfeld'); return false; }
    if (!document.getElementById('fPlz').value.trim())     { showError('fPlz','PLZ eingeben'); return false; }
    if (!document.getElementById('fOrt').value.trim())     { showError('fOrt','Ort eingeben'); return false; }
    if (!formCoords.lat) return geocodeAndProceed();
  }
  if (step === 3) {
    const flaeche = parseFloat(document.getElementById('fFlaeche').value);
    if (!flaeche || flaeche <= 0) { showError('fFlaeche','Wohnfläche ist Pflichtfeld'); return false; }
    const zimmer = parseFloat(document.getElementById('fZimmer').value);
    if (!zimmer || zimmer <= 0)   { showError('fZimmer','Zimmeranzahl ist Pflichtfeld'); return false; }
    if (!document.getElementById('fEtage').value.trim()) { showError('fEtage','Etage ist Pflichtfeld'); return false; }
  }
  if (step === 4) {
    const name  = document.getElementById('fKontaktName').value.trim();
    const email = document.getElementById('fKontaktEmail').value.trim();
    if (!name)  { showError('fKontaktName','Ihr Name ist Pflichtfeld'); return false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('fKontaktEmail','Bitte eine gültige E-Mail-Adresse eingeben'); return false; }
  }
  return true;
}

function showError(fieldId, msg) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  field.classList.add('error');
  const err = document.createElement('div');
  err.className = 'form-error-msg'; err.textContent = msg;
  field.parentNode.insertBefore(err, field.nextSibling);
}
function clearErrors() {
  document.querySelectorAll('.form-input.error').forEach(f => f.classList.remove('error'));
  document.querySelectorAll('.form-error-msg').forEach(e => e.remove());
}

function geocodeAndProceed() {
  const strasse    = document.getElementById('fStrasse').value.trim();
  const hausnummer = document.getElementById('fHausnummer').value.trim();
  const plz        = document.getElementById('fPlz').value.trim();
  const ort        = document.getElementById('fOrt').value.trim();
  const btn = document.getElementById('formBtnNext');
  btn.disabled = true; btn.textContent = 'Adresse wird geprüft...';
  fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(`${strasse} ${hausnummer}, ${plz} ${ort}, AT`)}&format=json&limit=1&countrycodes=at`, {
  })
  .then(r => r.json())
  .then(data => {
    btn.disabled = false; renderFormStep(formCurrentStep);
    if (data.length > 0) {
      formCoords = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      updateMiniMap(formCoords.lat, formCoords.lng, `${strasse} ${hausnummer}, ${plz} ${ort}`);
      formCurrentStep++; renderFormStep(formCurrentStep);
    } else { showError('fStrasse','Adresse nicht gefunden — bitte prüfen'); }
  })
  .catch(() => { btn.disabled = false; renderFormStep(formCurrentStep); formCurrentStep++; renderFormStep(formCurrentStep); });
  return false;
}

function wireFormStep1() {
  document.querySelectorAll('#fTypModusGrid .type-sel-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#fTypModusGrid .type-sel-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  document.querySelectorAll('#fLiftGrid .seg-sel-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#fLiftGrid .seg-sel-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/* ── BEZIRK AUTO-DETECT ── */
const WIEN_PLZ_BEZIRK = {
  '1010':'1. – Innere Stadt','1020':'2. – Leopoldstadt','1030':'3. – Landstraße',
  '1040':'4. – Wieden','1050':'5. – Margareten','1060':'6. – Mariahilf',
  '1070':'7. – Neubau','1080':'8. – Josefstadt','1090':'9. – Alsergrund',
  '1100':'10. – Favoriten','1110':'11. – Simmering','1120':'12. – Meidling',
  '1130':'13. – Hietzing','1140':'14. – Penzing','1150':'15. – Rudolfsheim-Fünfhaus',
  '1160':'16. – Ottakring','1170':'17. – Hernals','1180':'18. – Währing',
  '1190':'19. – Döbling','1200':'20. – Brigittenau','1210':'21. – Floridsdorf',
  '1220':'22. – Donaustadt','1230':'23. – Liesing',
};

function bezirkFromPlz(plz) {
  return WIEN_PLZ_BEZIRK[plz?.trim()] || null;
}

function setAutoBezirk(val) {
  const field = document.getElementById('fBezirk');
  const label = document.querySelector('label[for="fBezirk"], .form-label[data-for="fBezirk"]') ||
                field?.closest('.form-group')?.querySelector('.form-label');
  if (!field) return;
  if (val) {
    field.value    = val;
    field.readOnly = true;
    field.title    = 'Automatisch erkannt — wird aus Adresse abgeleitet';
    // Add badge if not already there
    if (!field.parentNode.querySelector('.bezirk-auto-badge')) {
      const badge = document.createElement('span');
      badge.className   = 'bezirk-auto-badge';
      badge.textContent = '✓ Auto';
      badge.title       = 'Bezirk wurde automatisch aus der Adresse erkannt';
      field.parentNode.appendChild(badge);
    }
  } else {
    field.value = '';
    field.title = 'Bezirk wird automatisch aus der Adresse abgeleitet';
    field.parentNode.querySelector('.bezirk-auto-badge')?.remove();
  }
}

function wireFormStep2() {
  const input = document.getElementById('fAddrSearch');
  const sugg  = document.getElementById('addrSuggestions');
  if (!input) return;
  input.addEventListener('input', () => {
    clearTimeout(addrDebounce);
    const q = input.value.trim();
    if (q.length < 2) { sugg.classList.remove('visible'); return; }
    addrDebounce = setTimeout(() => fetchAddrSuggestions(q), 250);
  });
  // Reset coords when address fields are manually edited
  ['fStrasse','fHausnummer','fPlz','fOrt'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => { formCoords = { lat: null, lng: null }; });
  });
  // Wien: derive Bezirk live from PLZ
  const plzEl = document.getElementById('fPlz');
  if (plzEl) plzEl.addEventListener('input', () => {
    const fromPlz = bezirkFromPlz(plzEl.value);
    if (fromPlz) setAutoBezirk(fromPlz);
    else setAutoBezirk(null);
  });
  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !sugg.contains(e.target)) sugg.classList.remove('visible');
  });
}

function fetchAddrSuggestions(q) {
  const sugg = document.getElementById('addrSuggestions');
  fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5&countrycodes=at&addressdetails=1`)
  .then(r => r.json())
  .then(data => {
    if (!data.length) { sugg.classList.remove('visible'); return; }
    sugg.innerHTML = data.map((item, i) => {
      const addr = item.address;
      const main = [addr.road, addr.house_number].filter(Boolean).join(' ') || item.display_name.split(',')[0];
      const sub  = [addr.postcode, addr.city||addr.town||addr.village, addr.state].filter(Boolean).join(', ');
      return `<div class="addr-suggestion-item" data-lat="${item.lat}" data-lng="${item.lon}"
                data-strasse="${addr.road||''}" data-hnr="${addr.house_number||''}"
                data-plz="${addr.postcode||''}" data-ort="${addr.city||addr.town||addr.village||''}"
                data-bl="${addr.state||''}" data-bezirk="${addr.suburb||addr.city_district||''}">
                <div class="addr-suggestion-main">${main}</div>
                <div class="addr-suggestion-sub">${sub}</div>
              </div>`;
    }).join('');
    sugg.classList.add('visible');
    sugg.querySelectorAll('.addr-suggestion-item').forEach(item => {
      item.addEventListener('click', () => fillAddressFields(item));
    });
  })
  .catch(() => sugg.classList.remove('visible'));
}

function fillAddressFields(item) {
  document.getElementById('fStrasse').value    = item.dataset.strasse;
  document.getElementById('fHausnummer').value = item.dataset.hnr;
  document.getElementById('fPlz').value        = item.dataset.plz;
  document.getElementById('fOrt').value        = item.dataset.ort;
  // Prefer Wien PLZ lookup, fall back to Nominatim suburb/city_district
  const _bzFromPlz = bezirkFromPlz(item.dataset.plz);
  setAutoBezirk(_bzFromPlz || item.dataset.bezirk || null);
  const bl = item.dataset.bl;
  if (bl) {
    const sel = document.getElementById('fBundesland');
    [...sel.options].forEach(o => { if (bl.includes(o.value) || o.value.includes(bl.split(' ')[0])) sel.value = o.value; });
  }
  formCoords = { lat: parseFloat(item.dataset.lat), lng: parseFloat(item.dataset.lng) };
  document.getElementById('addrSuggestions').classList.remove('visible');
  document.getElementById('fAddrSearch').value = '';
  updateMiniMap(formCoords.lat, formCoords.lng, item.dataset.strasse + ' ' + item.dataset.hnr);
}

function initFormMiniMap() {
  if (formMiniMap) return;
  formMiniMap = L.map('formMiniMap', { zoomControl: true, scrollWheelZoom: false });
  L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png?api_key=31929e5e-e9f9-4e7f-869f-7d15a48e7505', {
    attribution: '© Stadia Maps © OpenStreetMap', maxZoom: 20
  }).addTo(formMiniMap);
  formMiniMap.setView([48.2025, 16.3524], 12);
  // Allow clicking map to set pin
  formMiniMap.on('click', e => {
    const { lat, lng } = e.latlng;
    formCoords = { lat, lng };
    if (formMiniMarker) formMiniMap.removeLayer(formMiniMarker);
    formMiniMarker = L.marker([lat, lng], { icon: L.divIcon({
      className: '',
      html: `<div style="width:16px;height:16px;background:#1a56db;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,.3);"></div>`,
      iconSize: [16,16], iconAnchor: [8,8]
    })}).addTo(formMiniMap);
    document.getElementById('addrMapLabel').textContent = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    // Reverse geocode to fill address fields
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`)
      .then(r => r.json()).then(d => {
        if (!d.address) return;
        const a = d.address;
        if (a.road)        document.getElementById('fStrasse').value    = a.road;
        if (a.house_number) document.getElementById('fHausnummer').value = a.house_number;
        if (a.postcode)    document.getElementById('fPlz').value        = a.postcode;
        const city = a.city || a.town || a.village || '';
        if (city)          document.getElementById('fOrt').value        = city;
        document.getElementById('addrMapLabel').textContent = [a.road, a.house_number, a.postcode, city].filter(Boolean).join(' ');
        const _bzRev = bezirkFromPlz(a.postcode) || a.suburb || a.city_district || a.county || null;
        setAutoBezirk(_bzRev);
      }).catch(() => {});
  });
}

function updateMiniMap(lat, lng, label) {
  document.getElementById('addrMapPreview').classList.add('visible');
  if (!formMiniMap) initFormMiniMap();
  setTimeout(() => {
    formMiniMap.invalidateSize();
    formMiniMap.setView([lat, lng], 16);
    if (formMiniMarker) formMiniMap.removeLayer(formMiniMarker);
    formMiniMarker = L.marker([lat, lng], { icon: L.divIcon({
      className: '',
      html: `<div style="width:16px;height:16px;background:#1a56db;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,.3);"></div>`,
      iconSize: [16,16], iconAnchor: [8,8]
    })}).addTo(formMiniMap);
    document.getElementById('addrMapLabel').textContent = label || 'Adresse gefunden';
  }, 150);
}

function wireFormStep4() {
  const zone  = document.getElementById('photoDropZone');
  const input = document.getElementById('photoFileInput');
  if (!zone || !input) return;
  // Zone-Click: nur wenn nicht schon ein Listener drauf (verhindert Doppel-Registrierung)
  zone.addEventListener('click', e => {
    if (e.target === input || e.target.closest('.btn-upload-select')) return;
    input.click();
  });
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
  zone.addEventListener('drop', e => { e.preventDefault(); zone.classList.remove('drag-over'); handlePhotoFiles(e.dataTransfer.files); });
  input.addEventListener('change', () => {
    handlePhotoFiles(input.files);
    input.value = ''; // Reset damit dieselben Dateien erneut ausgewählt werden können und kein zweites Öffnen triggert
  });
}

function compressImage(file, maxPx = 1200, quality = 0.8) {
  return new Promise(resolve => {
    const img = new Image();
    const src = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(src);
      let { width, height } = img;
      if (width > maxPx || height > maxPx) {
        if (width > height) { height = Math.round(height * maxPx / width); width = maxPx; }
        else                { width  = Math.round(width  * maxPx / height); height = maxPx; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width; canvas.height = height;
      canvas.getContext('2d').drawImage(img, 0, 0, width, height);
      canvas.toBlob(blob => {
        resolve({ file: new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' }), url: URL.createObjectURL(blob) });
      }, 'image/jpeg', quality);
    };
    img.src = src;
  });
}

async function handlePhotoFiles(files) {
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
  const ALLOWED_EXTS  = ['jpg', 'jpeg', 'png', 'webp', 'heic', 'heif'];
  const MAX_PHOTOS = 5;
  const valid = [...files].filter(file => {
    if (!ALLOWED_TYPES.includes(file.type)) return false;
    const ext = file.name.split('.').pop().toLowerCase();
    if (!ALLOWED_EXTS.includes(ext)) return false;
    if (file.size > 10 * 1024 * 1024) return false;
    return true;
  });
  const slots = MAX_PHOTOS - formPhotos.length;
  if (slots <= 0) {
    alert('Maximal 5 Fotos pro Inserat erlaubt.');
    return;
  }
  const toAdd = valid.slice(0, slots);
  if (valid.length > slots) alert(`Maximal 5 Fotos erlaubt. Es wurden nur ${slots} Foto${slots !== 1 ? 's' : ''} hinzugefügt.`);
  for (const file of toAdd) {
    const compressed = await compressImage(file);
    formPhotos.push(compressed);
  }
  renderPhotoPreview();
}

function renderPhotoPreview() {
  document.getElementById('photoPreviewGrid').innerHTML = formPhotos.map((p, i) => `
    <div class="photo-preview-item${i===0?' main-photo':''}">
      <img src="${p.url}" alt="Foto ${i+1}" />
      <button class="photo-del" onclick="removePhoto(${i})">×</button>
    </div>`).join('');
}

window.removePhoto = function(i) {
  URL.revokeObjectURL(formPhotos[i].url);
  formPhotos.splice(i, 1);
  renderPhotoPreview();
};

async function submitForm() {
  const btn = document.getElementById('formBtnNext');
  btn.disabled = true; btn.textContent = 'Wird eingereicht...';

  try {
    const submitToken = await getAuthToken();
    if (!submitToken) { alert('Bitte zuerst anmelden.'); btn.disabled = false; btn.textContent = 'Weiter'; return; }
    if (!formCoords.lat) {
      const q = encodeURIComponent(`${document.getElementById('fStrasse').value.trim()} ${document.getElementById('fHausnummer').value.trim()}, ${document.getElementById('fPlz').value.trim()} ${document.getElementById('fOrt').value.trim()}, Austria`);
      try {
        const gd = await (await fetch(`https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1`)).json();
        if (gd.length > 0) formCoords = { lat: parseFloat(gd[0].lat), lng: parseFloat(gd[0].lon) };
      } catch(ge) { console.warn('Geocoding fehlgeschlagen:', ge); }
      if (!formCoords.lat) {
        btn.disabled = false; renderFormStep(formCurrentStep);
        showError('fStrasse', 'Adresse konnte nicht auf der Karte gefunden werden. Bitte Adresse prüfen oder Pin manuell setzen.');
        formCurrentStep = 2; renderFormStep(2);
        return;
      }
    }

    const activeBtn  = document.querySelector('#fTypModusGrid .type-sel-btn.active');
    const typ        = activeBtn?.dataset.typ   || 'wohnung';
    const modus      = activeBtn?.dataset.modus || 'kaufen';
    const preis       = parseFloat(document.getElementById('fPreis').value.replace(/[^0-9.]/g,'')) || null;
    const ausstattung = [...document.querySelectorAll('#fAusstattung input:checked')].map(c => c.value);
    const bezirkId    = getBezirkIdFromCoords(formCoords.lat, formCoords.lng);
    const liftActive  = document.querySelector('#fLiftGrid .seg-sel-btn.active');
    const liftWert    = liftActive?.dataset.val || null;

    const { data: sessionData } = await sb.auth.getSession();
    const sessionUserId = sessionData?.session?.user?.id || currentUser?.id;
    if (!currentUser && sessionData?.session?.user) currentUser = sessionData.session.user;

    const payload = {
      user_id:      sessionUserId,
      typ, modus, status: 'aktiv',
      titel:        document.getElementById('fTitel').value.trim(),
      strasse:      document.getElementById('fStrasse').value.trim(),
      hausnummer:   document.getElementById('fHausnummer').value.trim() || null,
      plz:          document.getElementById('fPlz').value.trim(),
      ort:          document.getElementById('fOrt').value.trim(),
      bundesland:   document.getElementById('fBundesland').value,
      bezirk:       bezirkId,
      lat:          formCoords.lat,
      lng:          formCoords.lng,
      preis, preis_auf_anfrage: false,
      flaeche_wohn: parseFloat(document.getElementById('fFlaeche').value) || null,
      zimmer:       parseFloat(document.getElementById('fZimmer').value) || null,
      etage:        document.getElementById('fEtage').value.trim() || null,
      lift:         liftWert,
      baujahr:      parseInt(document.getElementById('fBaujahr').value) || null,
      heizung:      document.getElementById('fHeizung').value || null,
      zustand:      document.getElementById('fZustand').value || null,
      beschreibung: document.getElementById('fBeschreibung').value.trim() || null,
      ausstattung:  ausstattung.length > 0 ? ausstattung : null,
      inserent_name:  document.getElementById('fKontaktName').value.trim() || null,
      inserent_email: document.getElementById('fKontaktEmail').value.trim() || null,
      inserent_tel:   document.getElementById('fKontaktTel').value.trim() || null,
      land: 'AT',
    };

    let newInserat;
    if (formEditId) {
      // PATCH existing
      delete payload.user_id; delete payload.status;
      if (!submitToken) throw new Error('Nicht angemeldet. Bitte neu einloggen.');
      const res = await fetch(`${SUPABASE_URL}/inserate?id=eq.${formEditId}`, {
        method: 'PATCH',
        headers: { 'apikey': SUPABASE_ANON, 'Authorization': 'Bearer ' + submitToken, 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) { const err = await res.json(); throw new Error(err.message || 'Fehler'); }
      const [patched] = await res.json();
      newInserat = patched;
    } else {
      // POST new
      if (!submitToken) throw new Error('Nicht angemeldet. Bitte neu einloggen.');
      const res = await fetch(SUPABASE_URL + '/inserate', {
        method: 'POST',
        headers: { 'apikey': SUPABASE_ANON, 'Authorization': 'Bearer ' + submitToken, 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) { const err = await res.json(); throw new Error(err.message || 'Fehler'); }
      const [created] = await res.json();
      newInserat = created;
    }

    // Fotos hochladen (nur neue)
    if (formPhotos.length > 0 && newInserat?.id) {
      const uploadToken = await getAuthToken();
      for (const [index, photo] of formPhotos.entries()) {
        try {
          const ext  = photo.file.name.split('.').pop().toLowerCase();
          const path = `${newInserat.id}/${Date.now()}-${index}.${ext}`;
          const uploadRes = await fetch(`https://gpodsuuugvwzldhfsrbv.supabase.co/storage/v1/object/inserat-fotos/${path}`, {
            method: 'POST',
            headers: { 'apikey': SUPABASE_ANON, 'Authorization': 'Bearer ' + uploadToken, 'Content-Type': photo.file.type, 'x-upsert': 'false' },
            body: photo.file,
          });
          if (uploadRes.ok) {
            await fetch(SUPABASE_URL + '/fotos', {
              method: 'POST',
              headers: { 'apikey': SUPABASE_ANON, 'Authorization': 'Bearer ' + uploadToken, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
              body: JSON.stringify({ inserat_id: newInserat.id, url: `https://gpodsuuugvwzldhfsrbv.supabase.co/storage/v1/object/public/inserat-fotos/${path}`, storage_path: path, reihenfolge: index, ist_hauptfoto: index === 0 }),
            });
          }
        } catch(fe) { console.warn('Foto-Upload fehlgeschlagen:', fe.message); }
      }
    }

    btn.disabled = false;
    closeForm();
    if (!formEditId) document.getElementById('formSuccess').classList.add('visible');
    if (!formEditId && newInserat?.id) sendNotificationEmail('inserat_bestaetigung', { inserent_email: currentUser?.email, inserat_titel: document.getElementById('fTitel').value.trim() });
    formEditId = null;
    selectedBez.clear(); buildBezirkList();
    const fresh = await loadListingsFromDB();
    if (fresh) { LISTINGS.length = 0; LISTINGS.push(...fresh); updateBezirkCounts(); buildBezirkList(); }
    renderMarkers();
    if (formCoords.lat) {
      setTimeout(() => map.flyTo([formCoords.lat, formCoords.lng], 16, { duration: 0.8 }), 600);
      if (newInserat?.id) setTimeout(() => showDetail(newInserat.id, false), 1200);
    }
  } catch(e) {
    btn.disabled = false; renderFormStep(formCurrentStep);
    alert('Fehler: ' + e.message);
  }
}

/* ── LEGAL OVERLAYS ── */
const LEGAL_CONTENT = {
  impressum: {
    title: 'Impressum',
    html: `
      <h3>Angaben gemäß § 5 ECG</h3>
      <p>imomap<br>Brünnlbadgasse 7, 1090 Wien<br>Österreich</p>
      <h3>Kontakt</h3>
      <p>E-Mail: office@imomap.at</p>
      <h3>Unternehmensgegenstand</h3>
      <p>Betrieb einer Immobilienplattform für Österreich.</p>
      <h3>Haftungsausschluss</h3>
      <p>imomap übernimmt keine Haftung für die Richtigkeit der von Inserenten eingestellten Inhalte. Alle Inserate werden von den jeweiligen Anbietern eigenverantwortlich erstellt.</p>
    `
  },
  datenschutz: {
    title: 'Datenschutzerklärung',
    html: `
      <p><strong>Stand:</strong> Mai 2026</p>

      <h3>Verantwortlicher</h3>
      <p>imomap, Einzelunternehmen, Brünnlbadgasse 7, 1090 Wien · office@imomap.at</p>

      <h3>Erhobene Daten</h3>
      <p>Bei der Registrierung: E-Mail-Adresse. Bei Inseraten: Adressdaten, Fotos, Preisangaben. Bei Kontaktanfragen: Name, E-Mail, Telefonnummer, Nachricht. Bei der Nutzung der Website: IP-Adresse, Browsertyp, besuchte Seiten, Verweildauer (nur bei Einwilligung in Analyse-Cookies).</p>

      <h3>Rechtsgrundlagen</h3>
      <p>Vertragserfüllung und vorvertragliche Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO) für die Bereitstellung der Plattformfunktionen. Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) für Analyse- und Marketing-Cookies. Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO) für die Sicherheit und den Betrieb der Plattform.</p>

      <h3>Zweck der Verarbeitung</h3>
      <p>Bereitstellung der Plattformfunktionen (Inserieren, Suchen, Kontaktaufnahme). Analyse des Nutzungsverhaltens zur Verbesserung des Angebots (nur mit Einwilligung). Ausspielung relevanter Werbung auf Drittplattformen (nur mit Einwilligung).</p>

      <h3>Eingesetzte Dienste (nur bei Einwilligung)</h3>
      <p><strong>Google Analytics 4</strong> – Anbieter: Google Ireland Ltd., Gordon House, Barrow Street, Dublin 4, Irland. Zweck: Analyse des Nutzungsverhaltens (Seitenaufrufe, Verweildauer, Herkunft). Datenübermittlung in die USA auf Basis von Standardvertragsklauseln. IP-Anonymisierung ist aktiviert. Datenschutzerklärung: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">policies.google.com/privacy</a>.</p>
      <p><strong>Google Ads Conversion-Tracking</strong> – Anbieter: Google Ireland Ltd. Zweck: Messung der Wirksamkeit von Werbekampagnen. Datenübermittlung in die USA auf Basis von Standardvertragsklauseln.</p>
      <p><strong>Meta Pixel (Facebook/Instagram)</strong> – Anbieter: Meta Platforms Ireland Ltd., 4 Grand Canal Square, Dublin 2, Irland. Zweck: Messung von Kampagnenerfolgen, Erstellung von Zielgruppen für personalisierte Werbung auf Facebook und Instagram. Datenübermittlung in die USA auf Basis von Standardvertragsklauseln. Datenschutzerklärung: <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener">facebook.com/privacy/policy</a>.</p>

      <h3>Weitergabe an Dritte</h3>
      <p>Eine Weitergabe personenbezogener Daten an Dritte erfolgt ausschließlich im Rahmen der oben genannten Dienste und nur bei erteilter Einwilligung, sowie an Supabase Inc. (Infrastruktur/Authentifizierung) auf Basis eines Auftragsverarbeitungsvertrags.</p>

      <h3>Speicherdauer</h3>
      <p>Kontodaten werden bis zur Löschung des Kontos gespeichert. Inserate bleiben bis zur manuellen Löschung durch den Inserenten aktiv. Analytics-Daten werden gemäß den Einstellungen des jeweiligen Dienstanbieters gespeichert (GA4: 14 Monate).</p>

      <h3>Ihre Rechte</h3>
      <p>Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch (Art. 21 DSGVO). Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Anfragen an: office@imomap.at</p>
      <p>Sie haben zudem das Recht, sich bei der österreichischen Datenschutzbehörde (dsb.gv.at) zu beschweren.</p>

      <h3>Cookies</h3>
      <p>Technisch notwendige Cookies (Supabase Auth-Session) sind für den Betrieb der Plattform erforderlich und bedürfen keiner Einwilligung. Analyse- und Marketing-Cookies werden ausschließlich nach Ihrer ausdrücklichen Einwilligung gesetzt. Ihre Cookie-Einstellungen können Sie jederzeit über den Link im Footer anpassen oder widerrufen.</p>
    `
  },
  agb: {
    title: 'Allgemeine Geschäftsbedingungen',
    html: `
  <p><strong>Stand:</strong> Mai 2026</p>

      <h3>1. Geltungsbereich und Vertragspartner</h3>
      <p>1.1 Diese Allgemeinen Geschäftsbedingungen (im Folgenden „AGB") regeln die Nutzung der unter imomap.at erreichbaren Online-Plattform (im Folgenden „Plattform" oder „imomap") sowie sämtliche darüber abgeschlossenen Verträge zwischen den Nutzern und dem Betreiber.</p>
      <p>1.2 Betreiber der Plattform und Vertragspartner der Nutzer ist <strong>imomap</strong>, Inhaber des einzelunternehmerischen Geschäftsbetriebs mit Sitz in Wien, Österreich (im Folgenden „Betreiber" oder „wir"). Die vollständigen Kontaktdaten und sonstige Pflichtangaben gemäß § 5 ECG sind dem Impressum zu entnehmen.</p>
      <p>1.3 Diese AGB gelten in der zum Zeitpunkt der jeweiligen Nutzung gültigen Fassung. Abweichende, entgegenstehende oder ergänzende Geschäftsbedingungen des Nutzers werden nicht Vertragsbestandteil, es sei denn, der Betreiber stimmt ihrer Geltung ausdrücklich schriftlich zu.</p>
      <p>1.4 Soweit in diesen AGB von „Nutzer" die Rede ist, sind sowohl Verbraucher im Sinne des § 1 Abs. 1 Z 2 KSchG als auch Unternehmer im Sinne des § 1 UGB gemeint. Soweit Regelungen ausschließlich für eine dieser Gruppen gelten, ist dies ausdrücklich gekennzeichnet.</p>

      <h3>2. Leistungsbeschreibung</h3>
      <p>2.1 imomap stellt eine Online-Plattform zur Verfügung, auf der registrierte Nutzer Immobilieninserate veröffentlichen, einsehen und Kontakt zu anderen Nutzern aufnehmen können. Die Inserate enthalten verpflichtend eine Adressangabe und werden auf einer kartenbasierten Oberfläche dargestellt.</p>
      <p>2.2 Der Betreiber stellt ausschließlich die technische Infrastruktur zur Verfügung. Er ist <strong>weder Immobilienmakler noch Vermittler</strong> im Sinne der Gewerbeordnung und tritt zu keinem Zeitpunkt als Vertragspartei eines zwischen Nutzern angebahnten oder abgeschlossenen Geschäfts (insbesondere Kauf, Verkauf, Miete oder Pacht von Immobilien) auf. Sämtliche Verträge zwischen Nutzern kommen ausschließlich zwischen diesen zustande.</p>
      <p>2.3 Die Grundnutzung der Plattform ist unentgeltlich. Der Betreiber behält sich vor, kostenpflichtige Zusatzleistungen (z. B. hervorgehobene Inserate, erweiterte Reichweite, Premium-Funktionen) anzubieten. Solche Leistungen werden vor der Buchung klar als kostenpflichtig gekennzeichnet; ihr Umfang und Preis ergeben sich aus der jeweiligen Leistungsbeschreibung zum Zeitpunkt der Buchung.</p>
      <p>2.4 Der Betreiber bemüht sich um eine möglichst hohe Verfügbarkeit der Plattform, schuldet jedoch keine ununterbrochene Erreichbarkeit. Wartungsarbeiten, technische Störungen, Angriffe Dritter sowie Ereignisse höherer Gewalt können zu vorübergehenden Einschränkungen führen.</p>

      <h3>3. Registrierung und Nutzerkonto</h3>
      <p>3.1 Das Veröffentlichen von Inseraten und die Nutzung weiterer Plattformfunktionen setzt eine Registrierung mit gültiger E-Mail-Adresse voraus. Die Registrierung ist ausschließlich natürlichen Personen ab Vollendung des 18. Lebensjahres sowie juristischen Personen über vertretungsbefugte natürliche Personen gestattet.</p>
      <p>3.2 Der Nutzer ist verpflichtet, bei der Registrierung wahrheitsgemäße und vollständige Angaben zu machen und diese bei Änderungen unverzüglich zu aktualisieren. Pro Person bzw. pro Unternehmen ist grundsätzlich nur ein Nutzerkonto zulässig.</p>
      <p>3.3 Die Zugangsdaten (insbesondere Passwort) sind vertraulich zu behandeln und vor dem Zugriff Dritter zu schützen. Der Nutzer haftet für sämtliche Aktivitäten, die unter Verwendung seiner Zugangsdaten erfolgen, sofern er den Missbrauch zu vertreten hat. Bei Verdacht auf unbefugte Nutzung ist der Betreiber unverzüglich zu informieren.</p>
      <p>3.4 Auf die Registrierung und auf die Freischaltung einzelner Inserate besteht kein Rechtsanspruch. Der Betreiber kann eine Registrierung ohne Angabe von Gründen ablehnen.</p>

      <h3>4. Vertragsschluss</h3>
      <p>4.1 Mit Abschluss der Registrierung kommt zwischen dem Nutzer und dem Betreiber ein Nutzungsvertrag über die unentgeltliche Grundnutzung der Plattform zustande.</p>
      <p>4.2 Bei Buchung kostenpflichtiger Zusatzleistungen kommt ein gesonderter, entgeltlicher Vertrag zustande, sobald der Nutzer den Buchungsvorgang verbindlich abschließt und der Betreiber die Buchung bestätigt oder die Leistung freischaltet.</p>

      <h3>5. Widerrufsrecht für Verbraucher (FAGG)</h3>
      <p>5.1 Verbraucher im Sinne des § 1 KSchG haben bei im Fernabsatz abgeschlossenen entgeltlichen Verträgen mit dem Betreiber das Recht, binnen <strong>vierzehn Tagen</strong> ohne Angabe von Gründen vom Vertrag zurückzutreten. Die Frist beginnt mit dem Tag des Vertragsabschlusses.</p>
      <p>5.2 Zur Ausübung des Rücktrittsrechts hat der Verbraucher den Betreiber mittels einer eindeutigen Erklärung (z. B. per E-Mail an die im Impressum angegebene Adresse) zu informieren.</p>
      <p>5.3 <strong>Erlöschen des Rücktrittsrechts:</strong> Verlangt der Verbraucher ausdrücklich, dass die Dienstleistung bereits vor Ablauf der Rücktrittsfrist beginnt, und wird die Dienstleistung innerhalb der Rücktrittsfrist vollständig erbracht, erlischt das Rücktrittsrecht gemäß § 18 Abs. 1 Z 1 FAGG. Beginnt die Leistung vorzeitig auf Verlangen des Verbrauchers und tritt dieser anschließend zurück, hat er einen anteiligen Wertersatz zu leisten.</p>
      <p>5.4 Die unentgeltliche Grundnutzung der Plattform ist kein entgeltlicher Vertrag im Sinne des FAGG; das Rücktrittsrecht bezieht sich ausschließlich auf entgeltliche Zusatzleistungen.</p>

      <h3>6. Pflichten der Inserenten</h3>
      <p>6.1 Inserenten sind verpflichtet, in ihren Inseraten ausschließlich wahrheitsgemäße, vollständige und nicht irreführende Angaben zu machen. Insbesondere muss die angegebene Adresse der tatsächlichen Lage der inserierten Immobilie entsprechen.</p>
      <p>6.2 Es dürfen ausschließlich Immobilien inseriert werden, an denen der Inserent selbst über die zur Inseratsschaltung erforderlichen Rechte verfügt (z. B. als Eigentümer, bevollmächtigter Vertreter oder gewerblich befugter Makler).</p>
      <p>6.3 Hochgeladene Bilder, Texte, Pläne und sonstige Inhalte müssen frei von Rechten Dritter sein oder dem Inserenten müssen die für die Veröffentlichung erforderlichen Nutzungs- und Verwertungsrechte zustehen. Insbesondere sind Urheber-, Marken-, Persönlichkeits- und datenschutzrechtliche Vorschriften einzuhalten.</p>
      <p>6.4 Es ist insbesondere untersagt:</p>
      <ul>
        <li>das Inserieren nicht existierender, nicht verfügbarer oder bereits anderweitig vergebener Immobilien („Lockangebote");</li>
        <li>das Veröffentlichen von Inhalten, die gegen geltendes Recht, behördliche Auflagen oder die guten Sitten verstoßen, insbesondere diskriminierende, gewaltverherrlichende, pornografische, rassistische, verleumderische oder jugendgefährdende Inhalte;</li>
        <li>das Verschleiern der Identität, das Auftreten unter falschem Namen oder die Angabe falscher Kontaktdaten;</li>
        <li>das mehrfache Inserieren derselben Immobilie zur künstlichen Erhöhung der Sichtbarkeit;</li>
        <li>der Versand unaufgeforderter Werbung (Spam) an andere Nutzer;</li>
        <li>das automatisierte Auslesen, Kopieren oder Weiterverwenden von Plattforminhalten (Scraping, Crawling), soweit dies nicht vom Betreiber ausdrücklich gestattet ist;</li>
        <li>das Umgehen technischer Schutzmaßnahmen sowie der Versuch, in Systeme oder Daten der Plattform oder anderer Nutzer einzudringen;</li>
        <li>die Verwendung der Plattform zu Zwecken, die nicht der Anbahnung von Immobiliengeschäften dienen.</li>
      </ul>
      <p>6.5 Gewerbliche Inserenten (insbesondere Makler, Bauträger, Hausverwaltungen) sind zusätzlich verpflichtet, sämtliche für sie geltenden gewerbe-, berufs-, informations- und kennzeichnungsrechtlichen Vorschriften einzuhalten. Dies umfasst insbesondere die Angabe von Energieausweisdaten gemäß EAVG 2012, Provisionshinweise gemäß MaklerG sowie die Pflichtangaben gemäß § 5 ECG und § 14 UGB.</p>
      <p>6.6 Der Inserent stellt den Betreiber von sämtlichen Ansprüchen Dritter frei, die aus einer Verletzung der Pflichten gemäß diesem Punkt 6 resultieren, einschließlich der Kosten einer angemessenen Rechtsverteidigung. Diese Freistellung gilt nicht, soweit der Inserent die Pflichtverletzung nicht zu vertreten hat.</p>

      <h3>7. Rechte an eingestellten Inhalten</h3>
      <p>7.1 Sämtliche Rechte an den vom Inserenten eingestellten Inhalten (insbesondere Texte, Fotos, Grundrisse, Videos) verbleiben beim Inserenten bzw. den jeweiligen Rechteinhabern.</p>
      <p>7.2 Mit dem Einstellen von Inhalten räumt der Inserent dem Betreiber eine <strong>räumlich unbeschränkte, zeitlich auf die Dauer der Veröffentlichung zuzüglich angemessener Archivierungsfristen begrenzte, nicht-exklusive, unentgeltliche und übertragbare Lizenz</strong> ein, die Inhalte</p>
      <ul>
        <li>auf der Plattform und in zugehörigen mobilen Anwendungen darzustellen, zu speichern, zu vervielfältigen und zu bearbeiten (insbesondere Skalierung, Komprimierung, Wasserzeichen);</li>
        <li>im Rahmen der Bewerbung der Plattform und einzelner Inserate in Online-Medien, Suchmaschinen, sozialen Netzwerken und Newslettern zu nutzen;</li>
        <li>für interne Zwecke des Betreiberbetriebs (z. B. Backups, Statistiken, Qualitätssicherung) zu verarbeiten.</li>
      </ul>
      <p>7.3 Eine Weitergabe der Inhalte an dritte Plattformbetreiber zur dortigen eigenständigen Veröffentlichung erfolgt nur mit ausdrücklicher Zustimmung des Inserenten.</p>
      <p>7.4 Nach Beendigung des Inserats ist der Betreiber berechtigt, die Inhalte aus technischen Gründen (z. B. Backups, Caches, Suchmaschinenindizes) noch für eine angemessene Übergangszeit vorzuhalten.</p>

      <h3>8. Verantwortlichkeit für Inhalte; Haftungsprivileg</h3>
      <p>8.1 Die Inserenten sind allein für die von ihnen eingestellten Inhalte und Angaben verantwortlich. Der Betreiber macht sich diese Inhalte nicht zu eigen und führt grundsätzlich keine inhaltliche Vorabprüfung durch.</p>
      <p>8.2 Der Betreiber ist als Diensteanbieter im Sinne des § 16 ECG für fremde Inhalte nur dann verantwortlich, wenn er von einer rechtswidrigen Information tatsächliche Kenntnis erlangt und nicht unverzüglich tätig wird, um diese zu entfernen oder den Zugang zu sperren.</p>
      <p>8.3 Hinweise auf rechtswidrige Inhalte können über das auf der Plattform bereitgestellte Meldeformular oder per E-Mail an die im Impressum genannte Adresse übermittelt werden. Der Betreiber prüft eingehende Meldungen zeitnah.</p>

      <h3>9. Sperrung, Löschung und Beendigung</h3>
      <p>9.1 Der Betreiber ist berechtigt, einzelne Inserate, Inhalte oder Nutzerkonten ohne Vorankündigung zu sperren oder zu entfernen, wenn</p>
      <ul>
        <li>der begründete Verdacht eines Verstoßes gegen diese AGB, gegen geltendes Recht oder gegen Rechte Dritter besteht;</li>
        <li>das Inserat falsche, irreführende oder unvollständige Angaben enthält;</li>
        <li>der Nutzer trotz Aufforderung erforderliche Angaben nicht beibringt;</li>
        <li>technische oder sicherheitsrelevante Gründe dies erfordern.</li>
      </ul>
      <p>9.2 Der Nutzer kann sein Konto jederzeit ohne Einhaltung einer Frist löschen. Bereits in Anspruch genommene kostenpflichtige Leistungen bleiben hiervon unberührt; ein Anspruch auf Rückerstattung besteht nur im Rahmen der gesetzlichen Bestimmungen.</p>
      <p>9.3 Der Betreiber kann den Nutzungsvertrag mit einer Frist von 14 Tagen zum Monatsende ordentlich kündigen. Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.</p>

      <h3>10. Gewährleistung und Haftung</h3>
      <p>10.1 Der Betreiber übernimmt keine Gewähr für die Richtigkeit, Vollständigkeit, Aktualität oder Verfügbarkeit der von Nutzern eingestellten Inhalte. Es wird ausdrücklich darauf hingewiesen, dass der Betreiber die Identität von Nutzern sowie Eigentums- und Verfügungsverhältnisse an inserierten Immobilien nicht überprüft.</p>
      <p>10.2 Für entgeltliche Leistungen des Betreibers gelten die gesetzlichen Gewährleistungsrechte. Gegenüber Unternehmern wird die Gewährleistungsfrist auf das gesetzlich zulässige Mindestmaß reduziert; die Vermutung der Mangelhaftigkeit gemäß § 924 ABGB gilt gegenüber Unternehmern als ausgeschlossen.</p>
      <p>10.3 Der Betreiber haftet unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit, für Schäden aufgrund von Vorsatz oder grober Fahrlässigkeit sowie nach den zwingenden Bestimmungen des Produkthaftungsgesetzes.</p>
      <p>10.4 Im Übrigen ist die Haftung des Betreibers wie folgt beschränkt:</p>
      <ul>
        <li><strong>Gegenüber Verbrauchern:</strong> Bei leichter Fahrlässigkeit haftet der Betreiber nur für die Verletzung wesentlicher Vertragspflichten (Kardinalpflichten) und der Höhe nach begrenzt auf den vertragstypischen, vorhersehbaren Schaden.</li>
        <li><strong>Gegenüber Unternehmern:</strong> Eine Haftung für leichte Fahrlässigkeit ist ausgeschlossen. Die Haftung für mittelbare Schäden, Folgeschäden, entgangenen Gewinn, ausgebliebene Einsparungen, Datenverluste sowie Schäden aus Ansprüchen Dritter ist – soweit gesetzlich zulässig – ausgeschlossen. Der Unternehmer hat das Vorliegen grober Fahrlässigkeit oder Vorsatzes zu beweisen.</li>
      </ul>
      <p>10.5 Der Betreiber haftet nicht für Schäden, die aus der Nichtverfügbarkeit der Plattform, aus Datenverlusten infolge nicht vom Betreiber zu vertretender Umstände, aus Angriffen Dritter, aus höherer Gewalt oder aus dem Verhalten anderer Nutzer entstehen.</p>
      <p>10.6 Die vorstehenden Haftungsbeschränkungen gelten auch zugunsten der Erfüllungsgehilfen, gesetzlichen Vertreter und Organe des Betreibers.</p>

      <h3>11. Datenschutz</h3>
      <p>Die Verarbeitung personenbezogener Daten richtet sich nach der Datenschutzerklärung des Betreibers, die Bestandteil dieser AGB ist.</p>

      <h3>12. Änderungen der AGB</h3>
      <p>12.1 Der Betreiber ist berechtigt, diese AGB mit Wirkung für die Zukunft zu ändern, soweit dies aus sachlichem Grund erforderlich ist (insbesondere bei Änderungen der Rechtslage, höchstgerichtlicher Rechtsprechung, Änderung des Leistungsumfangs oder Einführung neuer Funktionen) und die Änderungen den Nutzer nicht unangemessen benachteiligen.</p>
      <p>12.2 Geänderte AGB werden dem Nutzer mindestens <strong>sechs Wochen</strong> vor ihrem geplanten Inkrafttreten per E-Mail an die zuletzt bekanntgegebene Adresse mitgeteilt. In der Mitteilung werden die geplanten Änderungen sowie der Zeitpunkt des Inkrafttretens deutlich hervorgehoben. Die Zustimmung gilt als erteilt, wenn der Nutzer den Änderungen nicht innerhalb der Frist in Textform widerspricht; auf diese Folge wird in der Änderungsmitteilung gesondert hingewiesen.</p>
      <p>12.3 Widerspricht der Nutzer fristgerecht, ist sowohl der Nutzer als auch der Betreiber berechtigt, den Nutzungsvertrag zum Zeitpunkt des Inkrafttretens der geänderten AGB zu beenden.</p>

      <h3>13. Schlussbestimmungen</h3>
      <p>13.1 Es gilt österreichisches Recht unter Ausschluss seiner Verweisungsnormen sowie unter Ausschluss des UN-Kaufrechts. Gegenüber Verbrauchern mit gewöhnlichem Aufenthalt in einem anderen EU-Mitgliedstaat bleiben die zwingenden verbraucherschützenden Bestimmungen ihres Aufenthaltsstaats unberührt.</p>
      <p>13.2 Erfüllungsort und ausschließlicher Gerichtsstand für sämtliche Streitigkeiten aus oder im Zusammenhang mit dem Vertragsverhältnis ist – soweit der Nutzer Unternehmer, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist – Wien. Gegenüber Verbrauchern gelten die zwingenden gesetzlichen Gerichtsstände.</p>
      <p>13.3 <strong>Online-Streitbeilegung:</strong> Die Europäische Kommission stellt unter <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">ec.europa.eu/consumers/odr</a> eine Plattform zur Online-Streitbeilegung bereit. Der Betreiber ist nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      <p>13.4 Sollten einzelne Bestimmungen dieser AGB unwirksam oder undurchführbar sein oder werden, so bleibt die Wirksamkeit der übrigen Bestimmungen davon unberührt. An die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung. Gegenüber Unternehmern gilt anstelle der unwirksamen Bestimmung diejenige wirksame Regelung, die dem wirtschaftlichen Zweck der unwirksamen Bestimmung am nächsten kommt.</p>
      <p>13.5 Mündliche Nebenabreden bestehen nicht. Änderungen und Ergänzungen dieser AGB bedürfen der Textform; dies gilt auch für die Aufhebung dieses Textformerfordernisses.</p>
    `
  }
};
window.toggleMeineInserate = function() {
  filterNurMeineInserate = !filterNurMeineInserate;
  const btn = document.getElementById('meinsToggle');
  if (btn) btn.classList.toggle('active', filterNurMeineInserate);
  const mobileBtn = document.getElementById('meinsMobileToggle');
  if (mobileBtn) mobileBtn.classList.toggle('active', filterNurMeineInserate);
  renderMarkers();
};

window.openLegal = function(which) {
  const content = LEGAL_CONTENT[which];
  if (!content) return;
  document.getElementById('legalTitle').textContent = content.title;
  document.getElementById('legalBody').innerHTML = content.html;
  document.getElementById('legalOverlay').classList.add('visible');
};

window.closeLegal = function() {
  document.getElementById('legalOverlay').classList.remove('visible');
};

/* ── COOKIE CONSENT + ANALYTICS ── */

// ▼▼▼ HIER DEINE IDS EINTRAGEN ▼▼▼
const GA4_ID    = 'G-XXXXXXXXXX';   // Google Analytics 4 Measurement ID
const GADS_ID   = 'AW-XXXXXXXXX';   // Google Ads Conversion ID
const META_ID   = 'XXXXXXXXXXXXXXXXX'; // Meta Pixel ID (nur Zahlen)
// ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

function getCookiePrefs() {
  try { return JSON.parse(localStorage.getItem('cookiePrefs') || 'null'); }
  catch(_) { return null; }
}

function saveCookiePrefs(prefs) {
  localStorage.setItem('cookiePrefs', JSON.stringify(prefs));
}

function loadGA4() {
  if (window._ga4Loaded) return;
  window._ga4Loaded = true;
  const s = document.createElement('script');
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
  s.async = true;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', GA4_ID, { anonymize_ip: true });
  gtag('config', GADS_ID);
}

function loadMetaPixel() {
  if (window._metaLoaded) return;
  window._metaLoaded = true;
  /* eslint-disable */
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
  (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */
  fbq('init', META_ID);
  fbq('track', 'PageView');
}

function applyPrefs(prefs) {
  if (prefs.analyse)   loadGA4();
  if (prefs.marketing) loadMetaPixel();
}

function initCookieBanner() {
  const prefs = getCookiePrefs();
  if (prefs) { applyPrefs(prefs); return; }
  const banner = document.getElementById('cookieBanner');
  if (banner) banner.style.display = 'block';
}

window.acceptAll = function() {
  const prefs = { analyse: true, marketing: true };
  saveCookiePrefs(prefs);
  applyPrefs(prefs);
  const banner = document.getElementById('cookieBanner');
  if (banner) banner.style.display = 'none';
  closeCookiePrefs();
};

window.acceptNecessary = function() {
  saveCookiePrefs({ analyse: false, marketing: false });
  const banner = document.getElementById('cookieBanner');
  if (banner) banner.style.display = 'none';
  closeCookiePrefs();
};

window.openCookiePrefs = function() {
  const prefs = getCookiePrefs() || { analyse: false, marketing: false };
  const ta = document.getElementById('toggleAnalyse');
  const tm = document.getElementById('toggleMarketing');
  if (ta) ta.classList.toggle('active', prefs.analyse);
  if (tm) tm.classList.toggle('active', prefs.marketing);
  const overlay = document.getElementById('cookieOverlay');
  if (overlay) overlay.style.display = 'flex';
};

window.closeCookiePrefs = function() {
  const overlay = document.getElementById('cookieOverlay');
  if (overlay) overlay.style.display = 'none';
};

window.toggleCookiePref = function(type) {
  const id = 'toggle' + type.charAt(0).toUpperCase() + type.slice(1);
  const btn = document.getElementById(id);
  if (btn) btn.classList.toggle('active');
};

window.savePrefsAndClose = function() {
  const ta = document.getElementById('toggleAnalyse');
  const tm = document.getElementById('toggleMarketing');
  const prefs = {
    analyse:   ta ? ta.classList.contains('active') : false,
    marketing: tm ? tm.classList.contains('active') : false,
  };
  saveCookiePrefs(prefs);
  applyPrefs(prefs);
  const banner = document.getElementById('cookieBanner');
  if (banner) banner.style.display = 'none';
  closeCookiePrefs();
};

document.addEventListener('DOMContentLoaded', initCookieBanner);
