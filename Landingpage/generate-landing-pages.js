#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const SUPABASE_URL  = 'https://gpodsuuugvwzldhfsrbv.supabase.co/rest/v1';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwb2RzdXV1Z3Z3emxkaGZzcmJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5MjM3MjUsImV4cCI6MjA5MjQ5OTcyNX0.GrRyrh6BQNwGgHJAUaRRmsPS-jkhzXvACU9N9gih5LY';
const SITE = 'https://imomap.at';

const BUNDESLAENDER = {
  wien:  { name: 'Wien',             slug: 'wien',              lat: 48.2082, lng: 16.3738, zoom: 12 },
  noe:   { name: 'Niederösterreich', slug: 'niederoesterreich', lat: 48.1000, lng: 15.8000, zoom: 8  },
  ooe:   { name: 'Oberösterreich',   slug: 'oberoesterreich',   lat: 48.2000, lng: 14.2500, zoom: 9  },
  sbg:   { name: 'Salzburg',         slug: 'salzburg',          lat: 47.5000, lng: 13.1000, zoom: 9  },
  tirol: { name: 'Tirol',            slug: 'tirol',             lat: 47.3500, lng: 11.8000, zoom: 9  },
  stmk:  { name: 'Steiermark',       slug: 'steiermark',        lat: 47.2000, lng: 15.3000, zoom: 9  },
  ktn:   { name: 'Kärnten',          slug: 'kaernten',          lat: 46.6200, lng: 14.1000, zoom: 9  },
  vbg:   { name: 'Vorarlberg',       slug: 'vorarlberg',        lat: 47.3800, lng: 9.7000,  zoom: 10 },
  bgld:  { name: 'Burgenland',       slug: 'burgenland',        lat: 47.8000, lng: 16.5000, zoom: 9  },
};

const BEZIRKE = {
  wien: [
    {id:'w01',name:'1. – Innere Stadt',plz:'1010',lat:48.2093,lng:16.3728},
    {id:'w02',name:'2. – Leopoldstadt',plz:'1020',lat:48.2196,lng:16.3939},
    {id:'w03',name:'3. – Landstraße',plz:'1030',lat:48.1991,lng:16.3906},
    {id:'w04',name:'4. – Wieden',plz:'1040',lat:48.1933,lng:16.3661},
    {id:'w05',name:'5. – Margareten',plz:'1050',lat:48.1872,lng:16.3555},
    {id:'w06',name:'6. – Mariahilf',plz:'1060',lat:48.1960,lng:16.3555},
    {id:'w07',name:'7. – Neubau',plz:'1070',lat:48.2025,lng:16.3524},
    {id:'w08',name:'8. – Josefstadt',plz:'1080',lat:48.2100,lng:16.3480},
    {id:'w09',name:'9. – Alsergrund',plz:'1090',lat:48.2228,lng:16.3546},
    {id:'w10',name:'10. – Favoriten',plz:'1100',lat:48.1657,lng:16.3747},
    {id:'w11',name:'11. – Simmering',plz:'1110',lat:48.1717,lng:16.4242},
    {id:'w12',name:'12. – Meidling',plz:'1120',lat:48.1775,lng:16.3263},
    {id:'w13',name:'13. – Hietzing',plz:'1130',lat:48.1756,lng:16.2892},
    {id:'w14',name:'14. – Penzing',plz:'1140',lat:48.1986,lng:16.2866},
    {id:'w15',name:'15. – Rudolfsheim',plz:'1150',lat:48.1957,lng:16.3310},
    {id:'w16',name:'16. – Ottakring',plz:'1160',lat:48.2133,lng:16.3122},
    {id:'w17',name:'17. – Hernals',plz:'1170',lat:48.2281,lng:16.3019},
    {id:'w18',name:'18. – Währing',plz:'1180',lat:48.2313,lng:16.3359},
    {id:'w19',name:'19. – Döbling',plz:'1190',lat:48.2497,lng:16.3477},
    {id:'w20',name:'20. – Brigittenau',plz:'1200',lat:48.2358,lng:16.3709},
    {id:'w21',name:'21. – Floridsdorf',plz:'1210',lat:48.2612,lng:16.4000},
    {id:'w22',name:'22. – Donaustadt',plz:'1220',lat:48.2394,lng:16.4614},
    {id:'w23',name:'23. – Liesing',plz:'1230',lat:48.1371,lng:16.3018},
  ],
  noe: [
    {id:'noe01',name:'Baden',lat:48.0063,lng:16.2307},
    {id:'noe02',name:'Klosterneuburg',lat:48.3044,lng:16.3267},
    {id:'noe03',name:'Mödling',lat:48.0856,lng:16.2836},
    {id:'noe04',name:'Wiener Neustadt',lat:47.8133,lng:16.2433},
    {id:'noe05',name:'St. Pölten',lat:48.2038,lng:15.6229},
    {id:'noe06',name:'Krems',lat:48.4086,lng:15.5942},
    {id:'noe07',name:'Tulln',lat:48.3300,lng:16.0561},
  ],
  ooe: [
    {id:'ooe01',name:'Linz',lat:48.3069,lng:14.2858},
    {id:'ooe02',name:'Wels',lat:48.1571,lng:14.0286},
    {id:'ooe03',name:'Steyr',lat:48.0427,lng:14.4218},
    {id:'ooe04',name:'Gmunden',lat:47.9214,lng:13.7997},
  ],
  sbg: [
    {id:'sbg01',name:'Salzburg Stadt',lat:47.8095,lng:13.0550},
    {id:'sbg02',name:'Hallein',lat:47.6835,lng:13.0960},
    {id:'sbg03',name:'Zell am See',lat:47.3244,lng:12.7950},
    {id:'sbg04',name:'St. Johann',lat:47.5242,lng:13.2000},
  ],
  tirol: [
    {id:'tir01',name:'Innsbruck',lat:47.2692,lng:11.4041},
    {id:'tir02',name:'Kufstein',lat:47.5833,lng:12.1667},
    {id:'tir03',name:'Kitzbühel',lat:47.4467,lng:12.3914},
    {id:'tir04',name:'Schwaz',lat:47.3535,lng:11.7080},
  ],
  stmk: [
    {id:'stmk01',name:'Graz',lat:47.0707,lng:15.4395},
    {id:'stmk02',name:'Leoben',lat:47.3833,lng:15.0944},
  ],
  ktn: [
    {id:'ktn01',name:'Klagenfurt',lat:46.6228,lng:14.3051},
    {id:'ktn02',name:'Villach',lat:46.6104,lng:13.8558},
  ],
  vbg: [
    {id:'vbg01',name:'Bregenz',lat:47.5031,lng:9.7471},
    {id:'vbg02',name:'Dornbirn',lat:47.4125,lng:9.7417},
    {id:'vbg03',name:'Feldkirch',lat:47.2336,lng:9.5993},
  ],
  bgld: [
    {id:'bgld01',name:'Eisenstadt',lat:47.8454,lng:16.5249},
    {id:'bgld02',name:'Rust',lat:47.8036,lng:16.6817},
    {id:'bgld03',name:'Neusiedl am See',lat:47.9478,lng:16.8389},
  ],
};

function slugify(str) {
  return str.toLowerCase()
    .replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss')
    .replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
}
function makeInseratSlug(r) {
  const addr = [r.strasse, r.hausnummer, r.plz, r.ort].filter(Boolean).join(' ');
  return slugify((r.titel || '') + '-' + addr);
}
function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function formatPreis(r) {
  if (r.preis_auf_anfrage) return 'Auf Anfrage';
  return '\u20AC\u00A0' + Number(r.preis).toLocaleString('de-AT');
}
function typLabel(t) { return {wohnung:'Wohnung',haus:'Haus',grundstueck:'Grundst\u00FCck',gewerbe:'Gewerbe'}[t]||t; }
function modusLabel(m) { return {kaufen:'Kaufen',mieten:'Mieten',pacht:'Pachten'}[m]||m; }
function typColor(t,m) {
  const c={'wohnung|kaufen':'#1a56db','wohnung|mieten':'#6d28d9','haus|kaufen':'#16a34a','haus|mieten':'#65a30d','grundstueck|kaufen':'#d97706','gewerbe|kaufen':'#dc2626'};
  return c[t+'|'+m]||c[t]||'#555';
}

async function fetchListings() {
  const res = await fetch(
    SUPABASE_URL+'/inserate?select=id,titel,typ,modus,preis,preis_auf_anfrage,flaeche_wohn,zimmer,strasse,hausnummer,plz,ort,bezirk,lat,lng,erstellt_am&status=eq.aktiv&order=erstellt_am.desc',
    { headers: { 'apikey': SUPABASE_ANON, 'Authorization': 'Bearer '+SUPABASE_ANON, 'Accept': 'application/json' } }
  );
  if (!res.ok) throw new Error('Supabase error: '+res.status);
  return res.json();
}
function groupByBezirk(listings) {
  const m={};
  for (const l of listings) { const b=l.bezirk||''; if(!m[b])m[b]=[]; m[b].push(l); }
  return m;
}

function cardHTML(r) {
  const slug = makeInseratSlug(r);
  const addr = [r.strasse, r.hausnummer, r.plz, r.ort].filter(Boolean).join(' ');
  const fl = r.flaeche_wohn ? r.flaeche_wohn+' m\u00B2' : '';
  const zi = r.zimmer ? r.zimmer+' Zi.' : '';
  const meta = [fl,zi].filter(Boolean).join(' \u00B7 ');
  const color = typColor(r.typ, r.modus);
  return `<a href="/inserat/${slug}-${r.id}" class="card">
  <div class="card-top">
    <span class="card-badge" style="background:${color}">${esc(typLabel(r.typ))} \u00B7 ${esc(modusLabel(r.modus))}</span>
  </div>
  <div class="card-title">${esc(r.titel||'Inserat')}</div>
  <div class="card-addr">${esc(addr)}</div>
  ${meta?'<div class="card-meta">'+esc(meta)+'</div>':''}
  <div class="card-price">${esc(formatPreis(r))}</div>
</a>`;
}

function markerJS(listings) {
  return listings.filter(l=>l.lat&&l.lng).map(l => {
    const slug = makeInseratSlug(l);
    const c = typColor(l.typ,l.modus);
    return `{a:${l.lat},o:${l.lng},p:"${esc(formatPreis(l))}",c:"${c}",u:"/inserat/${slug}-${l.id}"}`;
  }).join(',');
}

function pageHTML({ title, description, canonical, h1, sub, listings, breadcrumbs, chips, landChips, mapCenter, mapZoom }) {
  const hasMap = listings.some(l=>l.lat&&l.lng);
  const bcHTML = breadcrumbs.map((b,i) =>
    i<breadcrumbs.length-1
      ? '<a href="'+b.url+'">'+esc(b.name)+'</a><span class="sep">\u203A</span>'
      : '<span class="cur">'+esc(b.name)+'</span>'
  ).join('');

  const chipsHTML = chips.length ? '<section class="sec"><h2>Bezirke &amp; Gemeinden</h2><div class="chips">'+
    chips.map(c=>'<a href="'+c.url+'" class="chip">'+esc(c.name)+(c.count?'<span class="chip-n">'+c.count+'</span>':'')+'</a>').join('')+
    '</div></section>' : '';

  const landHTML = landChips.length ? '<section class="sec"><h2>Alle Bundesl\u00E4nder</h2><div class="chips">'+
    landChips.map(c=>'<a href="'+c.url+'" class="chip">'+esc(c.name)+'</a>').join('')+
    '</div></section>' : '';

  const cardsHTML = listings.length
    ? '<div class="cards">'+listings.map(r=>cardHTML(r)).join('')+'</div>'
    : '<div class="empty">Aktuell keine Inserate in dieser Region.</div>';

  const ld = JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList",
    itemListElement: breadcrumbs.map((b,i)=>({"@type":"ListItem",position:i+1,name:b.name,item:SITE+b.url}))});

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="index,follow">
<link rel="canonical" href="${SITE}${canonical}">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE}${canonical}">
<meta property="og:site_name" content="imomap">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:locale" content="de_AT">
<link rel="icon" type="image/svg+xml" href="/icon/favicon-32.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
<script type="application/ld+json">${ld}</script>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--ink:#0d0d0d;--ink2:#3a3a3a;--ink3:#5a5a5a;--ink4:#909090;--ink5:#c8c8c8;--bg:#fff;--bg2:#f4f4f2;--bg3:#eaeae7;--border:#dcdcd8;--accent:#1a56db;--accent-d:#1443b0;--accent-l:#eff6ff;--r:7px}
@media(prefers-color-scheme:dark){:root{--ink:#f0f0ee;--ink2:#c8c8c6;--ink3:#909090;--ink4:#606060;--ink5:#404040;--bg:#161616;--bg2:#1e1e1e;--bg3:#282828;--border:#2e2e2e;--accent:#4d8ef7;--accent-d:#76a9fa;--accent-l:#1e3a6e}}
body{font-family:'Inter',system-ui,-apple-system,sans-serif;color:var(--ink);background:var(--bg);line-height:1.5;-webkit-font-smoothing:antialiased;font-feature-settings:'cv02','cv03','cv04','cv11';font-size:13px}

.topbar{position:sticky;top:0;z-index:100;height:52px;background:var(--bg);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 20px}
.logo{display:flex;align-items:center;gap:8px;text-decoration:none;font-size:16px;font-weight:600;letter-spacing:-.5px;color:var(--ink)}
.logo b{color:var(--accent);font-weight:600}

.wrap{max-width:880px;margin:0 auto;padding:28px 20px 56px}
.bc{font-size:12px;color:var(--ink4);margin-bottom:20px;display:flex;align-items:center;gap:2px;flex-wrap:wrap}
.bc a{color:var(--accent);text-decoration:none}.bc a:hover{text-decoration:underline}
.bc .sep{margin:0 4px;color:var(--ink5)}
.bc .cur{color:var(--ink3)}

h1{font-size:26px;font-weight:600;letter-spacing:-.03em;line-height:1.25;margin-bottom:6px}
.sub{font-size:13px;color:var(--ink3);max-width:540px;margin-bottom:20px;line-height:1.55}
.stat{display:inline-flex;align-items:baseline;gap:6px;background:var(--accent-l);padding:5px 14px;border-radius:20px;font-size:12px;font-weight:500;color:var(--accent);margin-bottom:24px}
.stat b{font-size:18px;font-weight:700;letter-spacing:-.02em}

.map{width:100%;height:280px;border-radius:var(--r);border:1px solid var(--border);margin-bottom:28px;overflow:hidden}

.sec{margin-bottom:28px}
.sec h2{font-size:14px;font-weight:600;letter-spacing:-.02em;margin-bottom:10px;color:var(--ink2);text-transform:uppercase;letter-spacing:.03em}

.cards{display:flex;flex-direction:column;gap:1px;background:var(--border);border:1px solid var(--border);border-radius:var(--r);overflow:hidden}
.card{display:grid;grid-template-columns:1fr auto;gap:2px 16px;padding:14px 16px;background:var(--bg);text-decoration:none;color:inherit;transition:background .1s}
.card:hover{background:var(--bg2)}
.card-top{grid-column:1}
.card-badge{display:inline-block;font-size:10px;font-weight:600;color:#fff;padding:2px 7px;border-radius:4px;letter-spacing:.02em}
.card-title{grid-column:1;font-size:13px;font-weight:500;margin-top:4px}
.card-addr{grid-column:1;font-size:12px;color:var(--ink4)}
.card-meta{grid-column:1;font-size:12px;color:var(--ink3)}
.card-price{grid-column:2;grid-row:1/5;align-self:center;font-size:14px;font-weight:600;color:var(--accent);white-space:nowrap}
.empty{padding:28px 16px;text-align:center;color:var(--ink4);font-size:13px;background:var(--bg);border:1px solid var(--border);border-radius:var(--r)}

.chips{display:flex;flex-wrap:wrap;gap:6px}
.chip{display:inline-flex;align-items:center;gap:5px;padding:6px 13px;background:var(--bg);border:1px solid var(--border);border-radius:var(--r);font-size:12px;font-weight:500;color:var(--ink2);text-decoration:none;transition:all .12s}
.chip:hover{border-color:var(--accent);color:var(--accent);background:var(--accent-l)}
.chip-n{font-size:11px;color:var(--ink4);font-weight:400}

.cta-wrap{text-align:center;margin-top:32px}
.cta{display:inline-block;padding:11px 28px;background:var(--accent);color:#fff;border-radius:var(--r);font-size:13px;font-weight:500;text-decoration:none;transition:background .12s;letter-spacing:-.01em}
.cta:hover{background:var(--accent-d)}

.foot{margin-top:40px;padding:16px 0;border-top:1px solid var(--border);text-align:center;font-size:11px;color:var(--ink4)}
.foot a{color:var(--ink4);text-decoration:none;transition:color .12s}
.foot a:hover{color:var(--ink2)}

@media(max-width:640px){
  h1{font-size:22px}
  .wrap{padding:20px 14px 40px}
  .map{height:200px}
  .card{padding:12px}
  .card-price{font-size:13px}
}
</style>
</head>
<body>
<header class="topbar"><a href="/" class="logo">imo<b>MAP</b></a></header>
<div class="wrap">
  <nav class="bc">${bcHTML}</nav>
  <h1>${esc(h1)}</h1>
  <p class="sub">${sub}</p>
  <div class="stat"><b>${listings.length}</b> Inserate verf\u00FCgbar</div>
  ${hasMap?'<div id="map" class="map"></div>':''}
  <section class="sec">
    <h2>${listings.length?'Aktuelle Inserate':'Inserate'}</h2>
    ${cardsHTML}
  </section>
  ${chipsHTML}
  ${landHTML}
  <div class="cta-wrap"><a href="/" class="cta">Alle Immobilien auf der Karte \u2192</a></div>
  <div class="foot">\u00A9 ${new Date().getFullYear()} imomap.at \u00B7 <a href="/">Startseite</a> \u00B7 <a href="/impressum">Impressum</a> \u00B7 <a href="/datenschutz">Datenschutz</a></div>
</div>
${hasMap?`<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
var m=L.map('map',{scrollWheelZoom:false}).setView([${mapCenter.lat},${mapCenter.lng}],${mapZoom});
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',{
  attribution:'\u00A9 OpenStreetMap \u00A9 CARTO',subdomains:'abcd',maxZoom:19}).addTo(m);
var pts=[${markerJS(listings)}];
pts.forEach(function(p){
  var ic=L.divIcon({className:'',html:'<div style="background:'+p.c+';color:#fff;font-size:10px;font-weight:600;padding:2px 7px;border-radius:5px;white-space:nowrap;box-shadow:0 1px 3px rgba(0,0,0,.12)">'+p.p+'</div>',iconSize:null,iconAnchor:[28,10]});
  L.marker([p.a,p.o],{icon:ic}).addTo(m).on('click',function(){window.location.href=p.u});
});
if(pts.length){m.fitBounds(pts.map(function(p){return[p.a,p.o]}),{padding:[30,30],maxZoom:15})}
</script>`:''}
</body>
</html>`;
}

async function main() {
  const listings = await fetchListings();
  const byBezirk = groupByBezirk(listings);
  let pageCount = 0;
  const sitemapEntries = [];
  const allLandLinks = Object.values(BUNDESLAENDER).map(l=>({name:l.name,url:'/'+l.slug}));

  for (const [landKey, land] of Object.entries(BUNDESLAENDER)) {
    const bezirke = BEZIRKE[landKey]||[];
    const landSlug = land.slug;
    fs.mkdirSync(path.join('.',landSlug),{recursive:true});

    const landListings = bezirke.flatMap(bz=>byBezirk[bz.id]||[]);
    const bezirkLinks = bezirke.map(bz=>{
      const n=bz.name.replace(/^\d+\.\s*–\s*/,'');
      const s=bz.plz?bz.plz+'-'+slugify(n):slugify(bz.name);
      return {name:bz.name,url:'/'+landSlug+'/'+s,count:(byBezirk[bz.id]||[]).length};
    });

    fs.writeFileSync(path.join('.',landSlug,'index.html'), pageHTML({
      title: 'Immobilien in '+land.name+' \u2014 imomap.at',
      description: landListings.length+' Wohnungen, H\u00E4user und Grundst\u00FCcke in '+land.name+'. Alle Inserate mit genauer Adresse auf imomap.at.',
      canonical: '/'+landSlug,
      h1: 'Immobilien in '+land.name,
      sub: 'Entdecken Sie aktuelle Immobilienangebote in '+land.name+'. Jedes Inserat auf imomap.at zeigt die exakte Stra\u00DFenadresse \u2014 damit Sie die Lage sofort einsch\u00E4tzen k\u00F6nnen.',
      listings: landListings,
      breadcrumbs: [{name:'imomap.at',url:'/'},{name:land.name,url:'/'+landSlug}],
      chips: bezirkLinks,
      landChips: allLandLinks.filter(l=>l.url!=='/'+landSlug),
      mapCenter:{lat:land.lat,lng:land.lng}, mapZoom:land.zoom,
    }));
    sitemapEntries.push('/'+landSlug);
    pageCount++;

    for (const bz of bezirke) {
      const n=bz.name.replace(/^\d+\.\s*–\s*/,'');
      const s=bz.plz?bz.plz+'-'+slugify(n):slugify(bz.name);
      fs.mkdirSync(path.join('.',landSlug,s),{recursive:true});

      const bzL = byBezirk[bz.id]||[];
      const full = bz.plz?bz.plz+' '+n:bz.name;
      const siblings = bezirkLinks.filter(l=>l.url!=='/'+landSlug+'/'+s);

      fs.writeFileSync(path.join('.',landSlug,s,'index.html'), pageHTML({
        title: 'Immobilien in '+full+', '+land.name+' \u2014 imomap.at',
        description: bzL.length+' Immobilien in '+full+'. Wohnungen und H\u00E4user mit genauer Adresse auf imomap.at.',
        canonical: '/'+landSlug+'/'+s,
        h1: 'Immobilien in '+full,
        sub: 'Finden Sie Ihr neues Zuhause in '+full+'. Alle Inserate zeigen die exakte Stra\u00DFenadresse, damit Sie die Lage einsch\u00E4tzen k\u00F6nnen.',
        listings: bzL,
        breadcrumbs: [{name:'imomap.at',url:'/'},{name:land.name,url:'/'+landSlug},{name:bz.name,url:'/'+landSlug+'/'+s}],
        chips: siblings,
        landChips: [],
        mapCenter:{lat:bz.lat,lng:bz.lng}, mapZoom:bz.plz?14:13,
      }));
      sitemapEntries.push('/'+landSlug+'/'+s);
      pageCount++;
    }
  }

  fs.writeFileSync('landing-pages.json',JSON.stringify(sitemapEntries,null,2));
  process.stderr.write('\u2713 '+pageCount+' Landing Pages generiert\n');
}

main().catch(e=>{process.stderr.write('Fehler: '+e.message+'\n');process.exit(1);});
