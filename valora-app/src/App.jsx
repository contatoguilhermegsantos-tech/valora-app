import { useState, useEffect, useMemo } from "react";

// ── META ──────────────────────────────────────────────────────
const META = [
  { t:"PETR4",  n:"Petrobras",        s:"Petróleo & Gás",      g:"ibov", alvo:58.50, pl:4.2,  pvp:1.1, dy:14.2, w52l:29.50, w52h:40.10 },
  { t:"VALE3",  n:"Vale",             s:"Mineração",            g:"ibov", alvo:89.00, pl:5.8,  pvp:1.4, dy:11.8, w52l:51.30, w52h:71.20 },
  { t:"ITUB4",  n:"Itaú Unibanco",    s:"Bancos",               g:"ibov", alvo:42.00, pl:8.4,  pvp:2.1, dy:4.8,  w52l:26.80, w52h:37.10 },
  { t:"BBAS3",  n:"Banco do Brasil",  s:"Bancos",               g:"ibov", alvo:39.00, pl:4.9,  pvp:1.0, dy:9.2,  w52l:20.40, w52h:31.20 },
  { t:"BBDC4",  n:"Bradesco",         s:"Bancos",               g:"ibov", alvo:18.20, pl:9.1,  pvp:0.9, dy:5.1,  w52l:10.60, w52h:17.40 },
  { t:"WEGE3",  n:"WEG",              s:"Industrial",           g:"ibov", alvo:53.00, pl:28.4, pvp:9.8, dy:1.4,  w52l:35.80, w52h:52.10 },
  { t:"ABEV3",  n:"Ambev",            s:"Bebidas",              g:"ibov", alvo:13.80, pl:14.2, pvp:2.3, dy:5.5,  w52l:10.20, w52h:14.50 },
  { t:"SUZB3",  n:"Suzano",           s:"Papel & Celulose",     g:"ibov", alvo:71.00, pl:6.2,  pvp:2.1, dy:2.1,  w52l:42.10, w52h:62.80 },
  { t:"PRIO3",  n:"PRIO",             s:"Petróleo & Gás",       g:"ibov", alvo:58.00, pl:7.1,  pvp:2.8, dy:0.0,  w52l:31.20, w52h:46.80 },
  { t:"LREN3",  n:"Lojas Renner",     s:"Varejo",               g:"ibov", alvo:18.50, pl:18.2, pvp:2.4, dy:2.8,  w52l:10.40, w52h:16.90 },
  { t:"GGBR4",  n:"Gerdau",           s:"Siderurgia",           g:"ibov", alvo:24.00, pl:5.8,  pvp:1.0, dy:7.2,  w52l:14.80, w52h:22.10 },
  { t:"JBSS3",  n:"JBS",              s:"Alimentos",            g:"ibov", alvo:40.00, pl:6.4,  pvp:1.8, dy:4.1,  w52l:24.10, w52h:36.20 },
  { t:"EQTL3",  n:"Equatorial",       s:"Energia Elétrica",     g:"ibov", alvo:38.00, pl:12.1, pvp:2.1, dy:2.2,  w52l:24.20, w52h:34.80 },
  { t:"SBSP3",  n:"Sabesp",           s:"Saneamento",           g:"ibov", alvo:95.00, pl:14.2, pvp:2.8, dy:2.1,  w52l:58.10, w52h:84.20 },
  { t:"VIVT3",  n:"Telefônica Vivo",  s:"Telecom",              g:"ibov", alvo:52.00, pl:16.8, pvp:2.1, dy:6.2,  w52l:38.40, w52h:48.20 },
  { t:"RADL3",  n:"Raia Drogasil",    s:"Farmácias",            g:"ibov", alvo:27.00, pl:28.4, pvp:4.8, dy:1.2,  w52l:17.80, w52h:25.40 },
  { t:"RAIL3",  n:"Rumo",             s:"Logística",            g:"ibov", alvo:27.00, pl:18.2, pvp:2.8, dy:1.0,  w52l:16.80, w52h:24.40 },
  { t:"CYRE3",  n:"Cyrela",           s:"Construção Civil",     g:"ibov", alvo:24.00, pl:6.8,  pvp:1.4, dy:5.8,  w52l:13.20, w52h:21.40 },
  { t:"CMIG4",  n:"Cemig",            s:"Energia Elétrica",     g:"ibov", alvo:14.50, pl:5.2,  pvp:1.1, dy:12.4, w52l:9.40,  w52h:13.20 },
  { t:"MRVE3",  n:"MRV Engenharia",   s:"Construção Civil",     g:"ibov", alvo:14.00, pl:8.4,  pvp:0.8, dy:4.2,  w52l:6.40,  w52h:11.80 },
  { t:"EGIE3",  n:"Engie Brasil",     s:"Energia Elétrica",     g:"ibov", alvo:49.00, pl:11.2, pvp:2.4, dy:6.8,  w52l:36.80, w52h:47.20 },
  { t:"RENT3",  n:"Localiza",         s:"Locação de Veículos",  g:"ibov", alvo:48.00, pl:12.4, pvp:2.8, dy:1.2,  w52l:31.40, w52h:46.20 },
  { t:"KLBN11", n:"Klabin",           s:"Papel & Embalagens",   g:"small", alvo:25.00, pl:null, pvp:2.1, dy:5.4, w52l:16.20, w52h:23.40 },
  { t:"STBP3",  n:"Santos Brasil",    s:"Portos & Logística",   g:"small", alvo:14.00, pl:8.2,  pvp:2.1, dy:8.4, w52l:8.40,  w52h:12.80 },
  { t:"BEEF3",  n:"Minerva Foods",    s:"Alimentos",            g:"small", alvo:10.00, pl:4.8,  pvp:1.2, dy:6.8, w52l:5.80,  w52h:9.40  },
  { t:"BRAP4",  n:"Bradespar",        s:"Mineração",            g:"small", alvo:29.00, pl:4.2,  pvp:0.8, dy:12.1,w52l:18.20, w52h:27.40 },
  { t:"EZTC3",  n:"EZTEC",            s:"Construção Civil",     g:"small", alvo:20.00, pl:7.8,  pvp:1.1, dy:4.2, w52l:10.20, w52h:18.40 },
  { t:"MGLU3",  n:"Magazine Luiza",   s:"Varejo Digital",       g:"small", alvo:9.10,  pl:null, pvp:2.4, dy:0.0, w52l:4.80,  w52h:10.40 },
  { t:"SAPR11", n:"Sanepar",          s:"Saneamento",           g:"small", alvo:24.50, pl:7.8,  pvp:1.4, dy:7.2, w52l:14.80, w52h:22.40 },
  { t:"KEPL3",  n:"Kepler Weber",     s:"Agronegócio",          g:"small", alvo:32.00, pl:9.4,  pvp:2.1, dy:4.8, w52l:18.20, w52h:28.40 },
  { t:"EVEN3",  n:"Even Construtora", s:"Construção Civil",     g:"small", alvo:12.50, pl:6.4,  pvp:0.9, dy:6.2, w52l:6.80,  w52h:11.40 },
  { t:"ARZZ3",  n:"Arezzo",           s:"Calçados & Moda",      g:"small", alvo:58.00, pl:18.4, pvp:3.8, dy:2.1, w52l:36.40, w52h:56.20 },
  { t:"CSMG3",  n:"Copasa",           s:"Saneamento",           g:"small", alvo:25.50, pl:6.8,  pvp:1.1, dy:8.2, w52l:14.40, w52h:23.20 },
];

const DIVS = {
  PETR4:  [{d:"Nov/24",v:1.48},{d:"Ago/24",v:1.72},{d:"Mai/24",v:1.06},{d:"Fev/24",v:0.89}],
  VALE3:  [{d:"Out/24",v:3.12},{d:"Abr/24",v:2.84},{d:"Out/23",v:3.40},{d:"Abr/23",v:4.10}],
  CMIG4:  [{d:"Dez/24",v:0.72},{d:"Jun/24",v:0.68},{d:"Dez/23",v:0.74},{d:"Jun/23",v:0.61}],
  BBAS3:  [{d:"Nov/24",v:1.40},{d:"Ago/24",v:1.20},{d:"Mai/24",v:1.10},{d:"Fev/24",v:1.05}],
  BBDC4:  [{d:"Dez/24",v:0.25},{d:"Set/24",v:0.25},{d:"Jun/24",v:0.25},{d:"Mar/24",v:0.25}],
  ITUB4:  [{d:"Dez/24",v:0.51},{d:"Set/24",v:0.47},{d:"Jun/24",v:0.45},{d:"Mar/24",v:0.42}],
  GGBR4:  [{d:"Nov/24",v:0.68},{d:"Mai/24",v:0.42},{d:"Nov/23",v:0.88},{d:"Mai/23",v:0.74}],
  VIVT3:  [{d:"Out/24",v:1.28},{d:"Abr/24",v:1.10},{d:"Out/23",v:0.98},{d:"Abr/23",v:0.91}],
  EGIE3:  [{d:"Ago/24",v:1.60},{d:"Mar/24",v:1.22},{d:"Ago/23",v:1.44},{d:"Mar/23",v:1.18}],
  STBP3:  [{d:"Set/24",v:0.48},{d:"Jun/24",v:0.42},{d:"Mar/24",v:0.36},{d:"Dez/23",v:0.38}],
  SAPR11: [{d:"Out/24",v:0.68},{d:"Abr/24",v:0.62},{d:"Out/23",v:0.58},{d:"Abr/23",v:0.54}],
  BRAP4:  [{d:"Nov/24",v:1.52},{d:"Mai/24",v:1.20},{d:"Nov/23",v:1.88},{d:"Mai/23",v:2.14}],
  CSMG3:  [{d:"Dez/24",v:0.84},{d:"Jun/24",v:0.72},{d:"Dez/23",v:0.68},{d:"Jun/23",v:0.60}],
  EVEN3:  [{d:"Nov/24",v:0.28},{d:"Mai/24",v:0.24},{d:"Nov/23",v:0.22},{d:"Mai/23",v:0.18}],
  BEEF3:  [{d:"Set/24",v:0.22},{d:"Mar/24",v:0.18},{d:"Set/23",v:0.16},{d:"Mar/23",v:0.14}],
};

// ── API ───────────────────────────────────────────────────────
async function fetchBrapi(tickers, withHistory = false) {
  const params = withHistory
    ? "range=1mo&interval=1d&fundamental=false"
    : "fundamental=false";
  const url = `/api/quote?tickers=${tickers.join(",")}&${params}`;
  const r = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const json = await r.json();
  const out = {};
  for (const q of (json.results ?? [])) {
    if (!q?.symbol || q.regularMarketPrice == null) continue;
    const hist = q.historicalDataPrice ?? [];
    out[q.symbol] = {
      price:   q.regularMarketPrice,
      change:  q.regularMarketChangePercent ?? 0,
      open:    q.regularMarketOpen,
      prev:    q.regularMarketPreviousClose,
      high:    q.regularMarketDayHigh,
      low:     q.regularMarketDayLow,
      vol:     q.regularMarketVolume,
      mktcap:  q.marketCap,
      w52l:    q.fiftyTwoWeekLow,
      w52h:    q.fiftyTwoWeekHigh,
      spark:   hist.slice(-10).map(d => d.close).filter(Boolean),
    };
  }
  return out;
}

function chunks(arr, n) {
  const r = [];
  for (let i = 0; i < arr.length; i += n) r.push(arr.slice(i, i + n));
  return r;
}

// ── HELPERS ───────────────────────────────────────────────────
const fmtR   = v => v == null ? "—" : "R$ " + Number(v).toLocaleString("pt-BR", {minimumFractionDigits:2,maximumFractionDigits:2});
const fmtX   = v => v == null ? "—" : Number(v).toFixed(1) + "x";
const fmtPct = v => v == null ? "—" : (v > 0 ? "+" : "") + Number(v).toFixed(2) + "%";
const fmtVol = v => !v ? "—" : v >= 1e9 ? (v/1e9).toFixed(1)+"B" : v >= 1e6 ? (v/1e6).toFixed(0)+"M" : Number(v).toLocaleString("pt-BR");
const fmtCap = v => !v ? "—" : v >= 1e12 ? "R$"+(v/1e12).toFixed(2)+"T" : v >= 1e9 ? "R$"+(v/1e9).toFixed(1)+"B" : "—";

function clsKey(pot) {
  if (pot == null) return "neutral";
  if (pot >= 20)   return "high";
  if (pot >= 5)    return "mid";
  if (pot >= -5)   return "neutral";
  return "low";
}

const LBL = {
  high:    {txt:"Ótima Oportunidade", c:"#FF6A00", bg:"rgba(255,106,0,0.12)",  bd:"rgba(255,106,0,0.3)"},
  mid:     {txt:"Boa Oportunidade",   c:"#FF9A3C", bg:"rgba(255,154,60,0.12)", bd:"rgba(255,154,60,0.3)"},
  neutral: {txt:"Preço Justo",        c:"#888888", bg:"rgba(136,136,136,0.1)", bd:"rgba(136,136,136,0.2)"},
  low:     {txt:"Acima do Valor",     c:"#FF3B3B", bg:"rgba(255,59,59,0.12)",  bd:"rgba(255,59,59,0.3)"},
};

const SECTOR_COLORS = ["#FF6A00","#FF9A3C","#FFB347","#FF3B3B","#C0392B","#E67E22","#F39C12","#D35400","#BDC3C7","#95A5A6"];
const PG = {background:"#0A0A0A",minHeight:"100vh",color:"#F5F5F5",fontFamily:"system-ui,sans-serif",maxWidth:430,margin:"0 auto"};

// ── ATOMS ─────────────────────────────────────────────────────
function Tag({txt,c,bg,bd,small}) {
  return <span style={{fontSize:small?8:9,fontWeight:700,color:c,background:bg,border:`1px solid ${bd}`,padding:small?"1px 5px":"2px 7px",borderRadius:20,whiteSpace:"nowrap"}}>{txt}</span>;
}
function Sk({w="100%",h=14,r=6}) {
  return <div style={{width:w,height:h,borderRadius:r,background:"#222222",overflow:"hidden",position:"relative",flexShrink:0}}><div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent)",animation:"sh 1.4s infinite"}}/></div>;
}
function Pill({on,onClick,children}) {
  return <button onClick={onClick} style={{display:"inline-flex",alignItems:"center",whiteSpace:"nowrap",padding:"6px 13px",borderRadius:20,fontSize:11,fontWeight:700,cursor:"pointer",border:"1px solid",flexShrink:0,background:on?"rgba(255,106,0,0.15)":"transparent",borderColor:on?"#FF6A00":"#2A2A2A",color:on?"#FF6A00":"#666666"}}>{children}</button>;
}

function Sparkline({data, color="#FF6A00", w=60, h=28}) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} style={{flexShrink:0}}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function W52({price, low, high}) {
  if (!price || !low || !high || high === low) return null;
  const pct = ((price - low) / (high - low)) * 100;
  const c = pct < 30 ? "#FF6A00" : pct < 70 ? "#FF9A3C" : "#FF3B3B";
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:"#444444",marginBottom:5}}>
        <span>{fmtR(low)}</span><span style={{color:"#666666"}}>Faixa 52 semanas</span><span>{fmtR(high)}</span>
      </div>
      <div style={{height:4,background:"#222222",borderRadius:10,position:"relative"}}>
        <div style={{height:"100%",width:Math.min(100,pct)+"%",background:`linear-gradient(90deg,#FF6A00,${c})`,borderRadius:10}}/>
        <div style={{position:"absolute",top:-4,left:`calc(${Math.min(96,pct)}% - 5px)`,width:12,height:12,background:c,borderRadius:"50%",border:"2px solid #0A0A0A",boxShadow:`0 0 6px ${c}80`}}/>
      </div>
    </div>
  );
}

function DonutChart({data, size=160}) {
  const total = data.reduce((a,d)=>a+d.v,0);
  if (!total) return null;
  const r=60,cx=size/2,cy=size/2,stroke=22,circ=2*Math.PI*r;
  let offset=0;
  const slices = data.map((d,i)=>{
    const pct = d.v/total;
    const s = {strokeDasharray:`${pct*circ} ${circ-pct*circ}`,strokeDashoffset:-offset*circ,color:SECTOR_COLORS[i%SECTOR_COLORS.length]};
    offset += pct;
    return {...d,...s,pct};
  });
  return (
    <div style={{display:"flex",alignItems:"center",gap:16}}>
      <svg width={size} height={size} style={{flexShrink:0}}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#222222" strokeWidth={stroke}/>
        {slices.map((s,i)=>(
          <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth={stroke}
            strokeDasharray={s.strokeDasharray} strokeDashoffset={s.strokeDashoffset}
            style={{transform:`rotate(-90deg)`,transformOrigin:`${cx}px ${cy}px`}}/>
        ))}
        <text x={cx} y={cy-6} textAnchor="middle" fill="#F5F5F5" fontSize="13" fontWeight="800">{data.length}</text>
        <text x={cx} y={cy+10} textAnchor="middle" fill="#444444" fontSize="9">setores</text>
      </svg>
      <div style={{flex:1,display:"flex",flexDirection:"column",gap:5}}>
        {slices.map((s,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{width:8,height:8,borderRadius:2,background:s.color,flexShrink:0}}/>
            <div style={{fontSize:10,color:"#888888",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.label}</div>
            <div style={{fontSize:10,fontWeight:700,color:"#666666"}}>{(s.pct*100).toFixed(0)}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── NAV ───────────────────────────────────────────────────────
function Nav({active,set,wlCount,cartCount}) {
  return (
    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:"rgba(10,10,10,0.97)",backdropFilter:"blur(24px)",borderTop:"1px solid #2A2A2A",display:"flex",zIndex:200}}>
      {[["radar","📡","Radar"],["buscar","🔍","Buscar"],["watchlist","⭐","Watchlist"],["carteira","💼","Carteira"]].map(([id,icon,label])=>(
        <div key={id} onClick={()=>set(id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"10px 0",cursor:"pointer",borderTop:active===id?"2px solid #FF6A00":"2px solid transparent",position:"relative"}}>
          <span style={{fontSize:20}}>{icon}</span>
          {id==="watchlist"&&wlCount>0&&<div style={{position:"absolute",top:6,right:"50%",marginRight:-18,background:"#FF3B3B",color:"#fff",fontSize:9,fontWeight:700,borderRadius:10,padding:"1px 5px"}}>{wlCount}</div>}
          {id==="carteira"&&cartCount>0&&<div style={{position:"absolute",top:6,right:"50%",marginRight:-18,background:"#FF6A00",color:"#fff",fontSize:9,fontWeight:700,borderRadius:10,padding:"1px 5px"}}>{cartCount}</div>}
          <span style={{fontSize:10,fontWeight:600,color:active===id?"#FF6A00":"#444444"}}>{label}</span>
        </div>
      ))}
    </div>
  );
}

// ── CARD ──────────────────────────────────────────────────────
function Card({s, onOpen, onStar, starred, onCompare, inCompare}) {
  const loading = !s.live;
  const lbl = LBL[s.cls];
  const cc  = (s.change||0) > 0 ? "#FF6A00" : (s.change||0) < 0 ? "#FF3B3B" : "#666666";
  const barPct = s.pot ? Math.min(90, Math.max(4, 30 + s.pot * 0.85)) : 0;
  const sparkColor = (s.change||0) >= 0 ? "#FF6A00" : "#FF3B3B";

  return (
    <div style={{background:inCompare?"#141414":"#141414",border:`1px solid ${inCompare?"#FF6A00":"#2A2A2A"}`,borderRadius:18,padding:"14px 16px",marginBottom:10,position:"relative",overflow:"hidden",cursor:"pointer"}} onClick={onOpen}>
      <div style={{position:"absolute",left:0,top:0,bottom:0,width:3,background:lbl.c,borderRadius:"3px 0 0 3px"}}/>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
        <div style={{display:"flex",gap:10,alignItems:"center",flex:1}}>
          <div style={{width:36,height:36,borderRadius:10,background:"#222222",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,color:"#666666",flexShrink:0}}>
            {s.t.replace(/\d/g,"").slice(0,4)}
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap",marginBottom:2}}>
              <span style={{fontWeight:800,fontSize:15}}>{s.t}</span>
              <Tag {...lbl} txt={lbl.txt}/>
              {(s.dy||0)>=6&&<Tag txt={`💰 ${s.dy}%`} c="#FF9A3C" bg="rgba(255,154,60,0.12)" bd="rgba(255,154,60,0.3)"/>}
              {s.live&&<Tag txt="● Brapi" c="#FF6A00" bg="rgba(255,106,0,0.08)" bd="rgba(255,106,0,0.2)" small/>}
            </div>
            <div style={{fontSize:11,color:"#444444"}}>{s.n} · {s.s}</div>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4,marginLeft:8}}>
          {loading?<Sk w={70} h={20}/>:<span style={{fontWeight:800,fontSize:17}}>{fmtR(s.price)}</span>}
          <div style={{display:"flex",alignItems:"center",gap:5}}>
            {loading?<Sk w={48} h={13}/>:<span style={{fontSize:11,fontWeight:700,color:cc}}>{(s.change||0)>0?"▲":"▼"} {Math.abs(s.change||0).toFixed(2)}%</span>}
            {onCompare&&<button onClick={e=>{e.stopPropagation();onCompare(s.t);}} style={{background:inCompare?"rgba(255,106,0,0.2)":"none",border:inCompare?"1px solid #FF6A00":"none",cursor:"pointer",fontSize:13,lineHeight:1,padding:"2px 5px",borderRadius:6,opacity:inCompare?1:0.4,color:inCompare?"#FF6A00":"#888888"}}>⇄</button>}
            <button onClick={e=>{e.stopPropagation();onStar(s.t);}} style={{background:"none",border:"none",cursor:"pointer",fontSize:16,lineHeight:1,padding:0,opacity:starred?1:0.25}}>⭐</button>
          </div>
        </div>
      </div>

      <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:10}}>
        <div style={{display:"flex",gap:14,flex:1}}>
          {[["P/L",s.pl?fmtX(s.pl):"—",s.pl&&s.pl<10?"#FF6A00":null],["P/VP",s.pvp?fmtX(s.pvp):"—",s.pvp&&s.pvp<1?"#FF6A00":null],["D.Y.",s.dy?s.dy+"%":"—",(s.dy||0)>=6?"#FF9A3C":null],["Alvo",fmtR(s.alvo),"#FF9A3C"]].map(([label,val,color])=>(
            <div key={label}>
              <div style={{fontSize:9,color:"#444444",marginBottom:2}}>{label}</div>
              <div style={{fontWeight:700,fontSize:12,color:color||"#888888"}}>{val}</div>
            </div>
          ))}
        </div>
        {s.spark && s.spark.length >= 2 && <Sparkline data={s.spark} color={sparkColor}/>}
      </div>

      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:10,color:"#444444",whiteSpace:"nowrap"}}>Desconto</span>
        <div style={{flex:1,height:5,background:"#222222",borderRadius:10,overflow:"hidden"}}>
          {loading?<div style={{height:"100%",width:"20%",background:"#2a2d3a",borderRadius:10}}/>:<div style={{height:"100%",width:Math.max(0,barPct)+"%",background:lbl.c,borderRadius:10}}/>}
        </div>
        {loading?<Sk w={50} h={22} r={8}/>:(
          <div style={{fontSize:12,fontWeight:800,padding:"3px 9px",borderRadius:8,background:lbl.bg,color:lbl.c,border:`1px solid ${lbl.bd}`,whiteSpace:"nowrap"}}>
            {s.pot!=null?(s.pot>0?"+":"")+s.pot.toFixed(1)+"%":"—"}
          </div>
        )}
      </div>
    </div>
  );
}

// ── ALERT MODAL ───────────────────────────────────────────────
function AlertModal({s, alertas, onSave, onClose}) {
  const existing = alertas.find(a=>a.t===s.t);
  const [tipo, setTipo]   = useState(existing?.tipo||"below");
  const [price, setPrice] = useState(existing?.price?.toString()||"");

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:500}} onClick={onClose}>
      <div style={{background:"#141414",border:"1px solid #2A2A2A",borderRadius:"20px 20px 0 0",padding:24,width:"100%",maxWidth:430}} onClick={e=>e.stopPropagation()}>
        <div style={{fontWeight:800,fontSize:17,marginBottom:4}}>🔔 Alerta — {s.t}</div>
        <div style={{fontSize:12,color:"#444444",marginBottom:18}}>Notificação visual quando o preço atingir o valor.</div>
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          {[["below","Cair abaixo de"],["above","Subir acima de"]].map(([k,l])=>(
            <button key={k} onClick={()=>setTipo(k)} style={{flex:1,padding:"10px 8px",borderRadius:12,fontSize:12,fontWeight:700,cursor:"pointer",border:`1px solid ${tipo===k?"#FF6A00":"#2A2A2A"}`,background:tipo===k?"rgba(255,106,0,0.12)":"transparent",color:tipo===k?"#FF6A00":"#666666"}}>{l}</button>
          ))}
        </div>
        <input value={price} onChange={e=>setPrice(e.target.value)} placeholder={s.price?s.price.toFixed(2):"ex: 35.00"}
          style={{width:"100%",background:"#0A0A0A",border:"1px solid #2A2A2A",borderRadius:10,padding:"12px 14px",color:"#F5F5F5",fontSize:16,fontWeight:700,outline:"none",boxSizing:"border-box",marginBottom:14}}/>
        <div style={{display:"flex",gap:8}}>
          {existing&&<button onClick={()=>{onSave(null);onClose();}} style={{flex:1,padding:13,borderRadius:12,background:"rgba(255,59,59,0.1)",border:"1px solid rgba(255,59,59,0.25)",color:"#FF3B3B",fontWeight:700,fontSize:13,cursor:"pointer"}}>Remover</button>}
          <button onClick={()=>{if(!price||isNaN(parseFloat(price)))return;onSave({t:s.t,tipo,price:parseFloat(price),fired:false});onClose();}}
            style={{flex:2,padding:13,borderRadius:12,background:"linear-gradient(135deg,#FF6A00,#CC5200)",border:"none",color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer"}}>Salvar</button>
        </div>
      </div>
    </div>
  );
}

// ── SIMULADOR ─────────────────────────────────────────────────
function Simulador({s}) {
  const [valor, setValor] = useState("1000");
  const ref  = s.price || s.alvo;
  const vNum = parseFloat(valor.replace(",",".").replace(/[^0-9.]/g,""))||0;
  const qtd  = ref ? Math.floor(vNum/ref) : 0;
  const invest = qtd*ref;
  const alvoPct = invest ? qtd*s.alvo-invest : 0;
  const dyAnual = invest&&s.dy ? invest*(s.dy/100) : 0;

  return (
    <div style={{margin:"0 20px 14px",background:"#141414",border:"1px solid #2A2A2A",borderRadius:16,padding:16}}>
      <div style={{fontSize:11,color:"#666666",fontWeight:700,textTransform:"uppercase",letterSpacing:0.5,marginBottom:12}}>🧮 Simulador</div>
      <div style={{marginBottom:12}}>
        <div style={{fontSize:10,color:"#444444",marginBottom:5}}>Valor a investir</div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:14,fontWeight:700,color:"#666666"}}>R$</span>
          <input value={valor} onChange={e=>setValor(e.target.value.replace(/[^0-9,]/g,""))}
            style={{flex:1,background:"#0A0A0A",border:"1px solid #2A2A2A",borderRadius:10,padding:"10px 12px",color:"#F5F5F5",fontSize:15,fontWeight:700,outline:"none"}}/>
        </div>
      </div>
      {vNum>0&&ref?(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {[
            ["Ações",`${qtd}","#888888`],
            ["Investido",fmtR(invest),"#888888"],
            ["Se atingir alvo",fmtR(qtd*s.alvo),"#FF6A00"],
            ["Ganho estimado",(alvoPct>0?"+":"")+fmtR(alvoPct),alvoPct>=0?"#FF6A00":"#FF3B3B"],
            ...(s.dy>0?[["Dividendos/ano",fmtR(dyAnual),"#FF9A3C"],["Dividendos/mês",fmtR(dyAnual/12),"#FF9A3C"]]:[[],[]]),
          ].filter(r=>r.length).map(([l,v,c])=>(
            <div key={l} style={{background:"#0F0F0F",borderRadius:10,padding:"10px"}}>
              <div style={{fontSize:9,color:"#444444",marginBottom:4}}>{l}</div>
              <div style={{fontSize:12,fontWeight:700,color:c}}>{v}</div>
            </div>
          ))}
        </div>
      ):<div style={{fontSize:12,color:"#444444",textAlign:"center",padding:"8px 0"}}>Digite um valor</div>}
    </div>
  );
}

// ── COMPARATIVO ───────────────────────────────────────────────
function Comparativo({stocks, tickers, onClose, onClear}) {
  const [a, b] = tickers.map(t=>stocks.find(s=>s.t===t)).filter(Boolean);
  if (!a||!b) return null;

  const rows = [
    {label:"Preço atual",    va:fmtR(a.price),    vb:fmtR(b.price),    wA:a.price&&b.price?a.price<b.price:null},
    {label:"Variação hoje",  va:fmtPct(a.change),  vb:fmtPct(b.change),  wA:(a.change||0)>(b.change||0)},
    {label:"Valor estimado", va:fmtR(a.alvo),     vb:fmtR(b.alvo),     wA:null},
    {label:"Desconto",       va:a.pot!=null?(a.pot>0?"+":"")+a.pot.toFixed(1)+"%":"—",vb:b.pot!=null?(b.pot>0?"+":"")+b.pot.toFixed(1)+"%":"—",wA:(a.pot||0)>(b.pot||0)},
    {label:"P/L",            va:fmtX(a.pl),       vb:fmtX(b.pl),       wA:a.pl&&b.pl?a.pl<b.pl:null},
    {label:"P/VP",           va:fmtX(a.pvp),      vb:fmtX(b.pvp),      wA:a.pvp&&b.pvp?a.pvp<b.pvp:null},
    {label:"Dividend Yield", va:a.dy?a.dy+"%":"—",vb:b.dy?b.dy+"%":"—",wA:(a.dy||0)>(b.dy||0)},
    {label:"Mín 52 sem.",    va:fmtR(a.w52l),     vb:fmtR(b.w52l),     wA:null},
    {label:"Máx 52 sem.",    va:fmtR(a.w52h),     vb:fmtR(b.w52h),     wA:null},
  ];

  return (
    <div style={{...PG,paddingBottom:30}}>
      <div style={{padding:"20px 20px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <button onClick={onClose} style={{width:36,height:36,borderRadius:"50%",background:"#141414",border:"1px solid #2A2A2A",cursor:"pointer",color:"#F5F5F5",fontSize:20,display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
          <div style={{fontWeight:800,fontSize:18}}>Comparativo</div>
        </div>
        <button onClick={onClear} style={{fontSize:11,fontWeight:700,color:"#FF3B3B",background:"rgba(255,59,59,0.1)",border:"1px solid rgba(255,59,59,0.25)",padding:"5px 12px",borderRadius:20,cursor:"pointer"}}>Limpar</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,margin:"0 20px 16px"}}>
        {[a,b].map((s,i)=>(
          <div key={i} style={{background:"#141414",border:`1px solid ${i===0?"#FF6A00":"#FF9A3C"}`,borderRadius:16,padding:"14px 12px",textAlign:"center"}}>
            <div style={{fontWeight:900,fontSize:20,marginBottom:2}}>{s.t}</div>
            <div style={{fontSize:10,color:"#444444",marginBottom:8}}>{s.n}</div>
            <div style={{fontWeight:800,fontSize:18}}>{fmtR(s.price)}</div>
            {s.spark&&<div style={{display:"flex",justifyContent:"center",marginTop:8}}><Sparkline data={s.spark} color={i===0?"#FF6A00":"#FF9A3C"} w={80}/></div>}
          </div>
        ))}
      </div>
      <div style={{margin:"0 20px"}}>
        {rows.map(({label,va,vb,wA})=>(
          <div key={label} style={{display:"grid",gridTemplateColumns:"1fr 1.2fr 1fr",gap:8,padding:"10px 0",borderBottom:"1px solid #2A2A2A",alignItems:"center"}}>
            <div style={{fontSize:11,fontWeight:700,color:wA===true?"#FF6A00":"#444444",textAlign:"right",paddingRight:8}}>{va}{wA===true?" ✓":""}</div>
            <div style={{fontSize:10,color:"#666666",textAlign:"center"}}>{label}</div>
            <div style={{fontSize:11,fontWeight:700,color:wA===false?"#FF9A3C":"#444444",paddingLeft:8}}>{wA===false?"✓ ":""}{vb}</div>
          </div>
        ))}
      </div>
      <div style={{margin:"16px 20px 0",background:"#141414",border:"1px solid #2A2A2A",borderRadius:16,padding:16}}>
        <div style={{fontSize:11,color:"#666666",fontWeight:700,textTransform:"uppercase",letterSpacing:0.5,marginBottom:10}}>Veredito</div>
        {(()=>{
          const sA=(a.pot||0)*0.5+(a.dy||0)*0.3+(a.pl?Math.max(0,20-a.pl)*0.5:0);
          const sB=(b.pot||0)*0.5+(b.dy||0)*0.3+(b.pl?Math.max(0,20-b.pl)*0.5:0);
          const winner=sA>=sB?a:b;
          const wc=sA>=sB?"#FF6A00":"#FF9A3C";
          return <div style={{fontSize:13,color:"#888888",lineHeight:1.7}}>Com base em desconto, DY e valuation, <strong style={{color:wc}}>{winner.t}</strong> apresenta melhor relação risco-retorno. Desconto <strong style={{color:wc}}>{winner.pot!=null?"+"+winner.pot.toFixed(1)+"%":"—"}</strong> · DY <strong style={{color:wc}}>{winner.dy||0}%</strong>.</div>;
        })()}
      </div>
    </div>
  );
}

// ── DETALHE ───────────────────────────────────────────────────
function Detalhe({s, onBack, starred, onStar, onCompare, inCompare, alertas, onOpenAlert}) {
  const lbl  = LBL[s.cls];
  const cc   = (s.change||0)>0?"#FF6A00":(s.change||0)<0?"#FF3B3B":"#666666";
  const barPct = s.price&&s.alvo ? Math.min(78,Math.max(8,(s.price/s.alvo)*72)) : 45;
  const divs = DIVS[s.t]||[];
  const sparkColor = (s.change||0)>=0?"#FF6A00":"#FF3B3B";

  return (
    <div style={{...PG,paddingBottom:30}}>
      <div style={{display:"flex",alignItems:"center",gap:12,padding:"20px 20px 14px"}}>
        <button onClick={onBack} style={{width:36,height:36,borderRadius:"50%",background:"#141414",border:"1px solid #2A2A2A",cursor:"pointer",color:"#F5F5F5",fontSize:20,display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
        <div style={{flex:1}}>
          <div style={{fontWeight:900,fontSize:22}}>{s.t}</div>
          <div style={{fontSize:12,color:"#444444"}}>{s.n} · {s.s}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:5,alignItems:"flex-end"}}>
          <Tag {...lbl} txt={lbl.txt}/>
          {(s.dy||0)>=6&&<Tag txt={`💰 DY ${s.dy}%`} c="#FF9A3C" bg="rgba(255,154,60,0.12)" bd="rgba(255,154,60,0.3)"/>}
        </div>
      </div>

      <div style={{margin:"0 20px 12px",display:"flex",gap:8,flexWrap:"wrap"}}>
        {s.live&&<div style={{display:"inline-flex",alignItems:"center",gap:6,fontSize:11,fontWeight:700,color:"#FF6A00",background:"rgba(255,106,0,0.08)",border:"1px solid rgba(255,106,0,0.25)",padding:"5px 12px",borderRadius:20}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:"#FF6A00"}}/> Brapi.dev
        </div>}
        <button onClick={()=>onCompare(s.t)} style={{display:"inline-flex",alignItems:"center",gap:6,fontSize:11,fontWeight:700,cursor:"pointer",background:inCompare?"rgba(255,106,0,0.15)":"rgba(255,106,0,0.08)",border:`1px solid ${inCompare?"#FF6A00":"rgba(255,106,0,0.25)"}`,color:"#FF6A00",padding:"5px 12px",borderRadius:20}}>
          ⇄ {inCompare?"No Comparativo":"Comparar"}
        </button>
        <button onClick={()=>onOpenAlert(s.t)} style={{display:"inline-flex",alignItems:"center",gap:6,fontSize:11,fontWeight:700,cursor:"pointer",background:alertas?.some(a=>a.t===s.t)?"rgba(255,154,60,0.12)":"rgba(255,255,255,0.04)",border:`1px solid ${alertas?.some(a=>a.t===s.t)?"rgba(255,154,60,0.35)":"#2A2A2A"}`,color:alertas?.some(a=>a.t===s.t)?"#FF9A3C":"#666666",padding:"5px 12px",borderRadius:20}}>
          {alertas?.some(a=>a.t===s.t)?"🔔 Alerta ativo":"🔕 Criar alerta"}
        </button>
      </div>

      {/* Sparkline detalhe */}
      {s.spark&&s.spark.length>=2&&(
        <div style={{margin:"0 20px 12px",background:"#141414",border:"1px solid #2A2A2A",borderRadius:16,padding:"14px 16px"}}>
          <div style={{fontSize:10,color:"#444444",marginBottom:8}}>Últimos 10 pregões</div>
          <Sparkline data={s.spark} color={sparkColor} w={350} h={50}/>
        </div>
      )}

      <div style={{margin:"0 20px 14px",background:"linear-gradient(145deg,#0F0F0F,#0F0F0F)",border:"1px solid #2A2A2A",borderRadius:22,padding:22,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-40,right:-40,width:160,height:160,background:`radial-gradient(circle,${lbl.c}15,transparent 65%)`,borderRadius:"50%",pointerEvents:"none"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
          <div>
            <div style={{fontSize:10,color:"#444444",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>Preço Atual</div>
            <div style={{fontWeight:900,fontSize:40,lineHeight:1,letterSpacing:-1}}>{fmtR(s.price)}</div>
          </div>
          {s.change!=null&&<div style={{padding:"7px 13px",borderRadius:12,background:cc+"22",color:cc,fontWeight:700,fontSize:14}}>{s.change>0?"▲":"▼"} {Math.abs(s.change).toFixed(2)}%</div>}
        </div>
        {s.price&&<div style={{marginBottom:18}}><W52 price={s.price} low={s.w52l} high={s.w52h}/></div>}
        <div style={{borderTop:"1px solid #2A2A2A",paddingTop:16}}>
          <div style={{fontSize:10,color:"#444444",textTransform:"uppercase",letterSpacing:0.8,marginBottom:10}}>Preço atual vs. valor estimado</div>
          <div style={{height:10,background:"#222222",borderRadius:10,position:"relative",marginBottom:14}}>
            <div style={{height:"100%",width:barPct+"%",background:"linear-gradient(90deg,#FF6A00,#CC5200)",borderRadius:10}}/>
            <div style={{position:"absolute",top:-5,right:(100-barPct-2.5)+"%",width:20,height:20,background:"#FF9A3C",borderRadius:"50%",border:"2px solid #0A0A0A",boxShadow:"0 0 10px rgba(255,154,60,0.5)"}}/>
          </div>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <div style={{textAlign:"center"}}><div style={{fontWeight:700,fontSize:14}}>{fmtR(s.price)}</div><div style={{fontSize:10,color:"#444444",marginTop:3}}>Hoje</div></div>
            <div style={{textAlign:"center"}}><div style={{fontWeight:900,fontSize:26,color:lbl.c,letterSpacing:-0.5}}>{s.pot!=null?(s.pot>0?"+":"")+s.pot.toFixed(1)+"%":"—"}</div><div style={{fontSize:10,color:"#444444",marginTop:3}}>Potencial</div></div>
            <div style={{textAlign:"center"}}><div style={{fontWeight:700,fontSize:14,color:"#FF9A3C"}}>{fmtR(s.alvo)}</div><div style={{fontSize:10,color:"#444444",marginTop:3}}>Estimado</div></div>
          </div>
        </div>
      </div>

      <div style={{fontSize:10,color:"#444444",fontWeight:700,textTransform:"uppercase",letterSpacing:1,padding:"0 20px 10px"}}>Indicadores</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,margin:"0 20px 14px"}}>
        {[["P/L",s.pl?fmtX(s.pl):"—",s.pl&&s.pl<10?"#FF6A00":"#888888"],["P/VP",s.pvp?fmtX(s.pvp):"—",s.pvp&&s.pvp<1?"#FF6A00":"#888888"],["Div. Yield",s.dy?s.dy+"%":"—",(s.dy||0)>=6?"#FF9A3C":"#888888"]].map(([l,v,c])=>(
          <div key={l} style={{background:"#141414",border:"1px solid #2A2A2A",borderRadius:14,padding:"12px 10px",textAlign:"center"}}>
            <div style={{fontSize:9,color:"#444444",marginBottom:5}}>{l}</div>
            <div style={{fontWeight:800,fontSize:18,color:c}}>{v}</div>
          </div>
        ))}
      </div>

      {divs.length>0&&(
        <>
          <div style={{fontSize:10,color:"#444444",fontWeight:700,textTransform:"uppercase",letterSpacing:1,padding:"0 20px 10px"}}>Histórico de Dividendos</div>
          <div style={{margin:"0 20px 14px",background:"#141414",border:"1px solid #2A2A2A",borderRadius:16,overflow:"hidden"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",padding:"10px 16px",background:"#0F0F0F",borderBottom:"1px solid #2A2A2A"}}>
              {["Data","Valor/ação","Yield"].map(h=><div key={h} style={{fontSize:9,color:"#444444",fontWeight:700,textTransform:"uppercase",textAlign:"center"}}>{h}</div>)}
            </div>
            {divs.map((d,i)=>{
              const ref = s.price||s.alvo;
              const y = ref?((d.v/ref)*100).toFixed(2)+"%":"—";
              return (
                <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",padding:"12px 16px",borderBottom:i<divs.length-1?"1px solid #2A2A2A":"none",alignItems:"center"}}>
                  <div style={{fontSize:12,color:"#888888",textAlign:"center"}}>{d.d}</div>
                  <div style={{fontSize:13,fontWeight:700,color:"#FF9A3C",textAlign:"center"}}>R$ {d.v.toFixed(2)}</div>
                  <div style={{fontSize:12,fontWeight:600,color:"#FF6A00",textAlign:"center"}}>{y}</div>
                </div>
              );
            })}
            <div style={{padding:"10px 16px",background:"#0F0F0F",borderTop:"1px solid #2A2A2A",textAlign:"center",fontSize:10,color:"#444444"}}>
              Total 12m: <strong style={{color:"#FF9A3C"}}>R$ {divs.reduce((a,d)=>a+d.v,0).toFixed(2)}</strong>
              {s.price&&<> · Yield: <strong style={{color:"#FF6A00"}}>{((divs.reduce((a,d)=>a+d.v,0)/s.price)*100).toFixed(1)}%</strong></>}
            </div>
          </div>
        </>
      )}

      <Simulador s={s}/>

      <div style={{fontSize:10,color:"#444444",fontWeight:700,textTransform:"uppercase",letterSpacing:1,padding:"0 20px 10px"}}>Dados de Mercado</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,margin:"0 20px 14px"}}>
        {[["Abertura",fmtR(s.open)],["Fech. anterior",fmtR(s.prev)],["Máxima",fmtR(s.high)],["Mínima",fmtR(s.low)],["Mín 52 sem.",fmtR(s.w52l)],["Máx 52 sem.",fmtR(s.w52h)],["Volume",fmtVol(s.vol)],["Valor de Mercado",fmtCap(s.mktcap)]].map(([l,v])=>(
          <div key={l} style={{background:"#141414",border:"1px solid #2A2A2A",borderRadius:12,padding:"12px 13px"}}>
            <div style={{fontWeight:700,fontSize:13,marginBottom:3}}>{v}</div>
            <div style={{fontSize:10,color:"#444444"}}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{margin:"0 20px 20px",fontSize:10,color:"#444444",background:"#141414",border:"1px solid #2A2A2A",borderRadius:12,padding:"12px 14px",lineHeight:1.8}}>
        ⚠️ Valor estimado calculado com base em múltiplos setoriais. Dividendos históricos aproximados. Não representa recomendação de compra ou venda.
      </div>
      <div style={{padding:"0 20px"}}>
        <button onClick={()=>onStar(s.t)} style={{width:"100%",fontWeight:800,fontSize:15,border:starred?"1px solid #FF6A00":"none",borderRadius:16,padding:17,cursor:"pointer",background:starred?"transparent":"linear-gradient(135deg,#FF6A00,#CC5200)",color:starred?"#FF6A00":"#000"}}>
          {starred?"✅ Na Watchlist — remover":"⭐ Adicionar à Watchlist"}
        </button>
      </div>
    </div>
  );
}

// ── MINHA CARTEIRA ────────────────────────────────────────────
function Carteira({stocks, carteira, setCarteira}) {
  const [adding, setAdding] = useState(false);
  const [search, setSearch] = useState("");
  const [qtd,    setQtd]    = useState("");
  const [pm,     setPm]     = useState("");
  const [selT,   setSel]    = useState(null);

  const results = search.length>=1 ? stocks.filter(s=>s.t.includes(search.toUpperCase())||s.n.toUpperCase().includes(search.toUpperCase())).slice(0,6) : [];

  function add() {
    if(!selT||!qtd||!pm) return;
    const qty=parseFloat(qtd.replace(",",".")), cost=parseFloat(pm.replace(",","."));
    if(!qty||!cost) return;
    setCarteira(prev=>{
      const ex=prev.find(p=>p.t===selT);
      if(ex) return prev.map(p=>p.t===selT?{...p,qty:p.qty+qty,pm:((p.pm*p.qty+cost*qty)/(p.qty+qty))}:p);
      return [...prev,{t:selT,qty,pm:cost}];
    });
    setAdding(false);setSearch("");setQtd("");setPm("");setSel(null);
  }

  const positions = carteira.map(p=>{
    const s=stocks.find(x=>x.t===p.t);
    const price=s?.price;
    const vlAtual=price?price*p.qty:null;
    const vlInvest=p.pm*p.qty;
    const resultado=vlAtual!=null?vlAtual-vlInvest:null;
    const resultadoPct=vlAtual!=null?((vlAtual-vlInvest)/vlInvest)*100:null;
    return{...p,s,price,vlAtual,vlInvest,resultado,resultadoPct,lbl:LBL[s?.cls||"neutral"],pot:s?.pot};
  });

  const totalInvest=positions.reduce((a,p)=>a+p.vlInvest,0);
  const totalAtual=positions.reduce((a,p)=>a+(p.vlAtual||p.vlInvest),0);
  const totalRes=totalAtual-totalInvest;
  const totalPct=totalInvest?(totalRes/totalInvest)*100:0;
  const avgPot=positions.filter(p=>p.pot).length?positions.filter(p=>p.pot).reduce((a,p)=>a+p.pot,0)/positions.filter(p=>p.pot).length:0;

  const dyTotal=positions.reduce((acc,p)=>{
    const val=p.vlAtual||p.vlInvest;
    return acc+val*((p.s?.dy||0)/100);
  },0);

  const bySetor={};
  positions.forEach(p=>{
    const setor=p.s?.s||"Outros";
    bySetor[setor]=(bySetor[setor]||0)+(p.vlAtual||p.vlInvest);
  });
  const setorData=Object.entries(bySetor).map(([label,v])=>({label,v})).sort((a,b)=>b.v-a.v);

  if(!carteira.length&&!adding) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"70vh",padding:"30px 20px 88px"}}>
      <div style={{fontSize:56,marginBottom:16}}>💼</div>
      <div style={{fontSize:20,fontWeight:800,marginBottom:8,textAlign:"center"}}>Carteira vazia</div>
      <div style={{fontSize:14,color:"#444444",textAlign:"center",lineHeight:1.7,marginBottom:24}}>Registre suas posições e acompanhe resultado e potencial.</div>
      <button onClick={()=>setAdding(true)} style={{background:"linear-gradient(135deg,#FF6A00,#CC5200)",color:"#fff",fontWeight:800,fontSize:14,border:"none",borderRadius:14,padding:"13px 28px",cursor:"pointer"}}>+ Adicionar Ação</button>
    </div>
  );

  return (
    <div style={{paddingBottom:88}}>
      <div style={{padding:"22px 20px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontSize:22,fontWeight:900,marginBottom:2}}>Minha Carteira</div>
          <div style={{fontSize:13,color:"#444444"}}>{carteira.length} ação{carteira.length!==1?"s":""}</div>
        </div>
        <button onClick={()=>setAdding(true)} style={{background:"rgba(255,106,0,0.15)",color:"#FF6A00",fontWeight:700,fontSize:12,border:"1px solid rgba(255,106,0,0.3)",borderRadius:20,padding:"7px 14px",cursor:"pointer"}}>+ Adicionar</button>
      </div>

      {adding&&(
        <div style={{margin:"0 20px 16px",background:"#141414",border:"1px solid #FF6A00",borderRadius:18,padding:18}}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:14,color:"#FF6A00"}}>Adicionar posição</div>
          <input value={search} onChange={e=>{setSearch(e.target.value);setSel(null);}} placeholder="Buscar ticker ou empresa..."
            style={{width:"100%",background:"#0A0A0A",border:"1px solid #2A2A2A",borderRadius:10,padding:"10px 12px",color:"#F5F5F5",fontSize:13,outline:"none",marginBottom:8,boxSizing:"border-box"}}/>
          {results.length>0&&!selT&&(
            <div style={{background:"#0A0A0A",border:"1px solid #2A2A2A",borderRadius:10,marginBottom:8,overflow:"hidden"}}>
              {results.map(s=>(
                <div key={s.t} onClick={()=>{setSel(s.t);setSearch(s.t+" — "+s.n);}} style={{padding:"10px 12px",cursor:"pointer",borderBottom:"1px solid #2A2A2A",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div><span style={{fontWeight:700,fontSize:13}}>{s.t}</span><span style={{fontSize:11,color:"#666666",marginLeft:8}}>{s.n}</span></div>
                  {s.price&&<span style={{fontWeight:700,fontSize:12,color:"#888888"}}>{fmtR(s.price)}</span>}
                </div>
              ))}
            </div>
          )}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
            <div>
              <div style={{fontSize:10,color:"#444444",marginBottom:5}}>Quantidade</div>
              <input value={qtd} onChange={e=>setQtd(e.target.value)} placeholder="100"
                style={{width:"100%",background:"#0A0A0A",border:"1px solid #2A2A2A",borderRadius:10,padding:"10px 12px",color:"#F5F5F5",fontSize:13,outline:"none",boxSizing:"border-box"}}/>
            </div>
            <div>
              <div style={{fontSize:10,color:"#444444",marginBottom:5}}>Preço médio (R$)</div>
              <input value={pm} onChange={e=>setPm(e.target.value)} placeholder="38.50"
                style={{width:"100%",background:"#0A0A0A",border:"1px solid #2A2A2A",borderRadius:10,padding:"10px 12px",color:"#F5F5F5",fontSize:13,outline:"none",boxSizing:"border-box"}}/>
            </div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>{setAdding(false);setSearch("");setQtd("");setPm("");setSel(null);}} style={{flex:1,background:"transparent",color:"#666666",fontWeight:700,fontSize:13,border:"1px solid #2A2A2A",borderRadius:12,padding:12,cursor:"pointer"}}>Cancelar</button>
            <button onClick={add} disabled={!selT||!qtd||!pm} style={{flex:2,background:selT&&qtd&&pm?"linear-gradient(135deg,#FF6A00,#CC5200)":"#222222",color:selT&&qtd&&pm?"#fff":"#444444",fontWeight:800,fontSize:13,border:"none",borderRadius:12,padding:12,cursor:selT&&qtd&&pm?"pointer":"default"}}>Confirmar</button>
          </div>
        </div>
      )}

      {carteira.length>0&&(
        <>
          <div style={{margin:"0 20px 16px",background:"linear-gradient(145deg,#0F0F0F,#0F0F0F)",border:"1px solid #2A2A2A",borderRadius:20,padding:18}}>
            <div style={{fontSize:10,color:"#444444",textTransform:"uppercase",letterSpacing:0.8,marginBottom:12}}>Resumo</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
              <div style={{background:"#141414",borderRadius:14,padding:"14px 12px"}}><div style={{fontSize:10,color:"#444444",marginBottom:4}}>Total Investido</div><div style={{fontWeight:800,fontSize:18}}>{fmtR(totalInvest)}</div></div>
              <div style={{background:"#141414",borderRadius:14,padding:"14px 12px"}}><div style={{fontSize:10,color:"#444444",marginBottom:4}}>Valor Atual</div><div style={{fontWeight:800,fontSize:18}}>{fmtR(totalAtual)}</div></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div style={{background:totalRes>=0?"rgba(255,106,0,0.08)":"rgba(255,59,59,0.08)",border:`1px solid ${totalRes>=0?"rgba(255,106,0,0.2)":"rgba(255,59,59,0.2)"}`,borderRadius:14,padding:"14px 12px"}}>
                <div style={{fontSize:10,color:"#444444",marginBottom:4}}>Resultado</div>
                <div style={{fontWeight:800,fontSize:18,color:totalRes>=0?"#FF6A00":"#FF3B3B"}}>{totalRes>=0?"+":""}{fmtR(totalRes)}</div>
                <div style={{fontSize:11,color:totalRes>=0?"#FF6A00":"#FF3B3B"}}>{totalRes>=0?"+":""}{totalPct.toFixed(2)}%</div>
              </div>
              <div style={{background:"rgba(255,106,0,0.08)",border:"1px solid rgba(255,106,0,0.2)",borderRadius:14,padding:"14px 12px"}}>
                <div style={{fontSize:10,color:"#444444",marginBottom:4}}>Potencial médio</div>
                <div style={{fontWeight:800,fontSize:18,color:"#FF6A00"}}>{avgPot>0?"+"+avgPot.toFixed(1)+"%":"—"}</div>
              </div>
            </div>
          </div>

          {dyTotal>0&&(
            <div style={{margin:"0 20px 16px",background:"rgba(255,154,60,0.06)",border:"1px solid rgba(255,154,60,0.2)",borderRadius:18,padding:18}}>
              <div style={{fontSize:10,color:"#444444",textTransform:"uppercase",letterSpacing:0.8,marginBottom:12}}>💰 Projeção de Dividendos</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
                {[[fmtR(dyTotal),"Anual","#FF9A3C"],[fmtR(dyTotal/12),"Mensal","#FF9A3C"],[(dyTotal/totalAtual*100).toFixed(1)+"%","DY carteira","#FF6A00"]].map(([v,l,c])=>(
                  <div key={l} style={{textAlign:"center"}}><div style={{fontWeight:800,fontSize:15,color:c}}>{v}</div><div style={{fontSize:9,color:"#444444",marginTop:3}}>{l}</div></div>
                ))}
              </div>
            </div>
          )}

          {setorData.length>1&&(
            <div style={{margin:"0 20px 16px",background:"#141414",border:"1px solid #2A2A2A",borderRadius:18,padding:18}}>
              <div style={{fontSize:10,color:"#444444",textTransform:"uppercase",letterSpacing:0.8,marginBottom:14}}>Alocação por Setor</div>
              <DonutChart data={setorData}/>
            </div>
          )}
        </>
      )}

      <div style={{padding:"0 20px"}}>
        {positions.map(p=>{
          const rc=p.resultado==null?"#666666":p.resultado>=0?"#FF6A00":"#FF3B3B";
          return (
            <div key={p.t} style={{background:"#141414",border:"1px solid #2A2A2A",borderRadius:16,padding:"14px 16px",marginBottom:10,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",left:0,top:0,bottom:0,width:3,background:rc,borderRadius:"3px 0 0 3px"}}/>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                    <span style={{fontWeight:800,fontSize:15}}>{p.t}</span>
                    {p.lbl&&<Tag {...p.lbl} txt={p.lbl.txt}/>}
                  </div>
                  <div style={{fontSize:11,color:"#444444"}}>{p.s?.n} · {p.qty} ações · PM {fmtR(p.pm)}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontWeight:800,fontSize:16}}>{fmtR(p.vlAtual||p.vlInvest)}</div>
                  {p.resultado!=null&&<div style={{fontSize:12,fontWeight:700,color:rc}}>{p.resultado>=0?"+":""}{fmtR(p.resultado)} ({p.resultadoPct>=0?"+":""}{p.resultadoPct?.toFixed(2)}%)</div>}
                </div>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#444444"}}>
                <span>Preço: <strong style={{color:"#888888"}}>{fmtR(p.price)}</strong></span>
                {p.pot!=null&&<span>Potencial: <strong style={{color:p.pot>0?"#FF6A00":"#FF3B3B"}}>{p.pot>0?"+":""}{p.pot.toFixed(1)}%</strong></span>}
              </div>
              <button onClick={()=>setCarteira(prev=>prev.filter(x=>x.t!==p.t))} style={{position:"absolute",top:10,right:12,background:"none",border:"none",cursor:"pointer",fontSize:13,color:"#444444",padding:4}}>✕</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── WATCHLIST ─────────────────────────────────────────────────
function Watchlist({stocks, wl, openDetail, star}) {
  const watched=stocks.filter(s=>wl.includes(s.t));
  const avgPot=watched.length?watched.reduce((a,s)=>a+(s.pot||0),0)/watched.length:0;
  const avgDY=watched.filter(s=>s.dy>0).length?watched.filter(s=>s.dy>0).reduce((a,s)=>a+s.dy,0)/watched.filter(s=>s.dy>0).length:0;
  if(!watched.length) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"72vh",padding:"30px 20px 88px"}}>
      <div style={{fontSize:56,marginBottom:16}}>⭐</div>
      <div style={{fontSize:20,fontWeight:800,marginBottom:8}}>Watchlist vazia</div>
      <div style={{fontSize:14,color:"#444444",textAlign:"center",lineHeight:1.7}}>Toque na estrela para monitorar.</div>
    </div>
  );
  return (
    <div style={{paddingBottom:88}}>
      <div style={{padding:"22px 20px 14px"}}>
        <div style={{fontSize:22,fontWeight:900,marginBottom:4}}>Minha Watchlist</div>
        <div style={{fontSize:13,color:"#444444"}}>{watched.length} ações monitoradas</div>
      </div>
      <div style={{margin:"0 20px 16px",background:"linear-gradient(145deg,#0F0F0F,#0F0F0F)",border:"1px solid #2A2A2A",borderRadius:20,padding:18}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10}}>
          {[["+"+avgPot.toFixed(1)+"%","Desc. médio","#FF6A00"],[avgDY.toFixed(1)+"%","DY médio","#FF9A3C"],[watched.filter(s=>s.change>0).length,"Em alta","#FF6A00"],[watched.filter(s=>s.change<0).length,"Em queda","#FF3B3B"]].map(([v,l,c])=>(
            <div key={l} style={{background:c+"12",border:`1px solid ${c}30`,borderRadius:12,padding:"12px 4px",textAlign:"center"}}>
              <div style={{fontSize:18,fontWeight:800,color:c}}>{v}</div>
              <div style={{fontSize:9,color:"#444444",marginTop:3}}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{padding:"0 20px"}}>
        {[...watched].sort((a,b)=>(b.pot||0)-(a.pot||0)).map(s=>(
          <Card key={s.t} s={s} onOpen={()=>openDetail(s)} onStar={star} starred={true}/>
        ))}
      </div>
    </div>
  );
}

// ── BUSCAR ────────────────────────────────────────────────────
function Buscar({stocks, openDetail, wl, star}) {
  const [q, setQ]=useState("");
  const res=q.length>=1?stocks.filter(s=>s.t.includes(q.toUpperCase())||s.n.toUpperCase().includes(q.toUpperCase())||s.s.toUpperCase().includes(q.toUpperCase())):[];
  return (
    <div style={{paddingBottom:88}}>
      <div style={{padding:"22px 20px 16px"}}>
        <div style={{fontSize:22,fontWeight:900,marginBottom:14}}>Buscar Ações</div>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Ticker ou nome..."
          style={{width:"100%",background:"#141414",border:"1px solid #FF6A00",borderRadius:14,padding:"13px 16px",color:"#F5F5F5",fontSize:14,outline:"none",boxSizing:"border-box"}}/>
      </div>
      {!q&&<div style={{padding:"0 20px"}}><div style={{fontSize:12,color:"#444444",marginBottom:10}}>Buscas rápidas</div><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{["PETR4","VALE3","CMIG4","BBAS3","STBP3","BRAP4"].map(t=><button key={t} onClick={()=>setQ(t)} style={{padding:"7px 14px",borderRadius:20,background:"#141414",border:"1px solid #2A2A2A",color:"#666666",fontSize:12,fontWeight:700,cursor:"pointer"}}>{t}</button>)}</div></div>}
      {q&&!res.length&&<div style={{padding:"50px 20px",textAlign:"center",color:"#444444",fontSize:14}}>Nenhuma ação para "{q}"</div>}
      {res.length>0&&<div style={{padding:"0 20px"}}>{res.map(s=><Card key={s.t} s={s} onOpen={()=>openDetail(s)} onStar={star} starred={wl.includes(s.t)}/>)}</div>}
    </div>
  );
}

// ── RADAR ─────────────────────────────────────────────────────
function Radar({stocks, fetching, loadedN, totalN, apiOk, openDetail, wl, star, compareList, onCompare}) {
  const [grp,  setGrp]  = useState("all");
  const [sort, setSort] = useState("pot");
  const [q,    setQ]    = useState("");
  const pct = Math.round((loadedN/totalN)*100);

  const list = useMemo(()=>{
    let arr=stocks.filter(s=>{
      if(grp==="desconto") return s.cls==="high"||s.cls==="mid";
      if(grp==="dy")       return (s.dy||0)>=6;
      if(grp==="ibov")     return s.g==="ibov";
      if(grp==="small")    return s.g==="small";
      return true;
    }).filter(s=>!q||s.t.includes(q.toUpperCase())||s.n.toUpperCase().includes(q.toUpperCase())||s.s.toUpperCase().includes(q.toUpperCase()));
    arr.sort((a,b)=>{
      const lv=(b.live?1:0)-(a.live?1:0);
      if(lv!==0) return lv;
      if(sort==="pot")    return (b.pot||0)-(a.pot||0);
      if(sort==="change") return (b.change||0)-(a.change||0);
      if(sort==="dy")     return (b.dy||0)-(a.dy||0);
      if(sort==="pl")     return (a.pl||999)-(b.pl||999);
      return 0;
    });
    return arr;
  },[stocks,grp,sort,q]);

  const liveStocks=stocks.filter(s=>s.live);
  const best=[...liveStocks].sort((a,b)=>(b.pot||0)-(a.pot||0))[0];

  return (
    <div style={{paddingBottom:88}}>
      <div style={{padding:"22px 20px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontSize:28,fontWeight:900,letterSpacing:-1}}>Val<span style={{color:"#FF6A00"}}>ora</span></div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          {compareList.length>0&&<button onClick={()=>openDetail({__compare:true})} style={{fontSize:11,fontWeight:700,color:"#FF6A00",background:"rgba(255,106,0,0.12)",border:"1px solid rgba(255,106,0,0.3)",padding:"5px 12px",borderRadius:20,cursor:"pointer"}}>⇄ Comparar ({compareList.length}/2)</button>}
          {fetching&&<div style={{fontSize:11,fontWeight:700,color:"#FF6A00",background:"rgba(255,106,0,0.08)",border:"1px solid rgba(255,106,0,0.2)",padding:"5px 11px",borderRadius:20,display:"flex",alignItems:"center",gap:5}}><div style={{width:6,height:6,borderRadius:"50%",background:"#FF6A00"}}/>{loadedN}/{totalN}</div>}
        </div>
      </div>

      <div style={{margin:"0 20px 14px",background:"linear-gradient(145deg,#0F0F0F,#0F0F0F)",border:"1px solid #2A2A2A",borderRadius:22,padding:"18px 20px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-50,right:-50,width:180,height:180,background:"radial-gradient(circle,rgba(255,106,0,0.1),transparent 65%)",borderRadius:"50%",pointerEvents:"none"}}/>
        {fetching&&(
          <div style={{marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontSize:11,color:"#666666"}}>Buscando cotações na B3...</span><span style={{fontSize:11,fontWeight:700,color:"#FF6A00"}}>{pct}%</span></div>
            <div style={{height:3,background:"#222222",borderRadius:10}}><div style={{height:"100%",width:pct+"%",background:"linear-gradient(90deg,#FF6A00,#CC5200)",borderRadius:10,transition:"width 0.5s ease"}}/></div>
          </div>
        )}
        {!fetching&&!apiOk&&<div style={{marginBottom:12,padding:"10px 14px",background:"rgba(255,154,60,0.08)",border:"1px solid rgba(255,154,60,0.2)",borderRadius:12,fontSize:11,color:"#FF9A3C"}}>⚠️ Não foi possível conectar à Brapi. Verifique sua conexão.</div>}
        <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(255,106,0,0.1)",border:"1px solid rgba(255,106,0,0.2)",color:"#FF6A00",fontSize:10,fontWeight:700,padding:"4px 11px",borderRadius:20,marginBottom:11,textTransform:"uppercase"}}>
          <div style={{width:5,height:5,borderRadius:"50%",background:"#FF6A00"}}/>{fetching?"Carregando...":apiOk?"Cotações ao vivo · Brapi.dev":"Dados locais"}
        </div>
        <div style={{fontWeight:900,fontSize:18,lineHeight:1.3,marginBottom:5}}>Ações abaixo do valor<br/>estimado pelo mercado</div>
        <div style={{fontSize:12,color:"#444444"}}>Ibovespa + Small Caps · Sparkline · Dividendos · Comparativo</div>
        <div style={{display:"flex",gap:18,marginTop:14,paddingTop:12,borderTop:"1px solid #2A2A2A"}}>
          {[[liveStocks.length,"Ao vivo"],[stocks.filter(s=>s.live&&(s.cls==="high"||s.cls==="mid")).length,"Com desconto"],[best?"+"+best.pot.toFixed(0)+"%":"—","Maior desconto"],[wl.length,"Watchlist"]].map(([v,l],i)=>(
            <div key={l}><div style={{fontSize:18,fontWeight:800,color:i===3?"#FF9A3C":"#FF6A00"}}>{v}</div><div style={{fontSize:10,color:"#444444",marginTop:2}}>{l}</div></div>
          ))}
        </div>
      </div>

      <div style={{margin:"0 20px 10px"}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="🔍  Ticker, empresa ou setor..."
          style={{width:"100%",background:"#141414",border:"1px solid #2A2A2A",borderRadius:13,padding:"11px 14px",color:"#F5F5F5",fontSize:13,outline:"none",boxSizing:"border-box"}}/>
      </div>
      <div style={{display:"flex",gap:7,padding:"0 20px 8px",overflowX:"auto",scrollbarWidth:"none"}}>
        {[["all","Todas"],["desconto","Com Desconto"],["dy","Alto DY"],["ibov","Ibovespa"],["small","Small Caps"]].map(([k,l])=>(
          <Pill key={k} on={grp===k} onClick={()=>setGrp(k)}>{l}</Pill>
        ))}
      </div>
      <div style={{display:"flex",gap:6,padding:"0 20px 10px",alignItems:"center"}}>
        <span style={{fontSize:10,color:"#444444",whiteSpace:"nowrap"}}>Ordenar:</span>
        {[["pot","Desconto"],["change","Variação"],["dy","D.Y."],["pl","P/L"]].map(([k,l])=>(
          <Pill key={k} on={sort===k} onClick={()=>setSort(k)}>{l}</Pill>
        ))}
      </div>
      <div style={{padding:"0 20px 10px",fontWeight:700,fontSize:14}}>{list.length} ações</div>
      <div style={{padding:"0 20px"}}>
        {list.map(s=>(
          <Card key={s.t} s={s} onOpen={()=>openDetail(s)} onStar={star} starred={wl.includes(s.t)} onCompare={onCompare} inCompare={compareList.includes(s.t)}/>
        ))}
      </div>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────
export default function App() {
  const [screen,      setScreen]    = useState("radar");
  const [detail,      setDetail]    = useState(null);
  const [wl,          setWl]        = useState(() => { try { return JSON.parse(localStorage.getItem("v:wl")||"[]"); } catch{return [];} });
  const [carteira,    setCarteira]  = useState(() => { try { return JSON.parse(localStorage.getItem("v:carteira")||"[]"); } catch{return [];} });
  const [alertas,     setAlertas]   = useState(() => { try { return JSON.parse(localStorage.getItem("v:alertas")||"[]"); } catch{return [];} });
  const [alertModal,  setAlertModal]= useState(null);
  const [compareList, setCompare]   = useState([]);
  const [fetching,    setFetching]  = useState(true);
  const [loadedN,     setLoadedN]   = useState(0);
  const [apiOk,       setApiOk]     = useState(false);
  const [stocks,      setStocks]    = useState(() =>
    META.map(m => ({...m,price:null,change:null,open:null,prev:null,high:null,low:null,vol:null,mktcap:null,spark:null,pot:null,cls:"neutral",live:false}))
  );

  // Persistência localStorage (funciona fora do iframe)
  useEffect(() => { localStorage.setItem("v:wl", JSON.stringify(wl)); }, [wl]);
  useEffect(() => { localStorage.setItem("v:carteira", JSON.stringify(carteira)); }, [carteira]);
  useEffect(() => { localStorage.setItem("v:alertas", JSON.stringify(alertas)); }, [alertas]);

  // Fetch preços via proxy local /api/quote
  useEffect(() => {
    let alive = true;
    (async () => {
      setFetching(true);
      const batches = chunks(META.map(m=>m.t), 8);
      let done=0, anyOk=false;
      for (const batch of batches) {
        if (!alive) break;
        try {
          const data = await fetchBrapi(batch, true); // com histórico
          if (Object.keys(data).length>0) anyOk=true;
          if (alive) {
            setStocks(prev=>prev.map(s=>{
              const d=data[s.t];
              if (!d||d.price==null) return s;
              const pot=((s.alvo-d.price)/d.price)*100;
              // usa 52w da Brapi se disponível, senão mantém o meta
              return {...s,...d,w52l:d.w52l||s.w52l,w52h:d.w52h||s.w52h,pot,cls:clsKey(pot),live:true};
            }));
            setAlertas(prev=>prev.map(a=>{
              const d=data[a.t];
              if (!d?.price) return a;
              const fired=a.tipo==="below"?d.price<=a.price:d.price>=a.price;
              return {...a,fired:fired||a.fired};
            }));
          }
        } catch(e) { console.warn("Batch falhou:", e.message); }
        done+=batch.length;
        if (alive) setLoadedN(done);
      }
      if (alive) { setFetching(false); setApiOk(anyOk); }
    })();
    return () => { alive=false; };
  }, []);

  const sorted = useMemo(()=>
    [...stocks].sort((a,b)=>{const lv=(b.live?1:0)-(a.live?1:0);return lv!==0?lv:(b.pot||0)-(a.pot||0);}),
    [stocks]
  );

  function star(t) { setWl(p=>p.includes(t)?p.filter(x=>x!==t):[...p,t]); }
  function toggleCompare(t) {
    setCompare(prev=>{
      if(prev.includes(t)) return prev.filter(x=>x!==t);
      if(prev.length>=2) return [prev[1],t];
      return [...prev,t];
    });
  }
  function saveAlerta(alerta) {
    if(!alerta) setAlertas(prev=>prev.filter(a=>a.t!==alertModal));
    else setAlertas(prev=>[...prev.filter(a=>a.t!==alerta.t),alerta]);
  }

  const alertModalStock = alertModal ? sorted.find(s=>s.t===alertModal) : null;
  const liveDetail = detail&&!detail.__compare ? sorted.find(s=>s.t===detail.t)||detail : detail;
  const showCompare = detail?.__compare||(compareList.length===2&&!detail);

  if (showCompare&&compareList.length===2) return (
    <div style={PG}>
      <style>{`@keyframes sh{from{transform:translateX(-100%)}to{transform:translateX(100%)}}`}</style>
      <Comparativo stocks={sorted} tickers={compareList} onClose={()=>setDetail(null)} onClear={()=>{setCompare([]);setDetail(null);}}/>
    </div>
  );

  if (liveDetail&&!liveDetail.__compare) return (
    <div style={PG}>
      <style>{`@keyframes sh{from{transform:translateX(-100%)}to{transform:translateX(100%)}}`}</style>
      <Detalhe s={liveDetail} onBack={()=>setDetail(null)} starred={wl.includes(liveDetail.t)} onStar={star} onCompare={toggleCompare} inCompare={compareList.includes(liveDetail.t)} alertas={alertas} onOpenAlert={setAlertModal}/>
      {alertModalStock&&<AlertModal s={alertModalStock} alertas={alertas} onSave={saveAlerta} onClose={()=>setAlertModal(null)}/>}
    </div>
  );

  return (
    <div style={PG}>
      <style>{`@keyframes sh{from{transform:translateX(-100%)}to{transform:translateX(100%)}}`}</style>
      {screen==="radar"     && <Radar stocks={sorted} fetching={fetching} loadedN={loadedN} totalN={META.length} apiOk={apiOk} openDetail={setDetail} wl={wl} star={star} compareList={compareList} onCompare={toggleCompare}/>}
      {screen==="buscar"    && <Buscar stocks={sorted} openDetail={setDetail} wl={wl} star={star}/>}
      {screen==="watchlist" && <Watchlist stocks={sorted} wl={wl} openDetail={setDetail} star={star}/>}
      {screen==="carteira"  && <Carteira stocks={sorted} carteira={carteira} setCarteira={setCarteira}/>}
      <Nav active={screen} set={setScreen} wlCount={wl.length} cartCount={carteira.length}/>
      {alertModalStock&&<AlertModal s={alertModalStock} alertas={alertas} onSave={saveAlerta} onClose={()=>setAlertModal(null)}/>}
    </div>
  );
}
