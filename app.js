const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
/* ===== DATA & PENGATURAN ===== */
const S={type:"",style:"",colors:[]};
const COLS=CONFIG.colors;
const names=["Jenis desain","Detail desain","Kontak"],steps=$$(".step");let cur=0;
document.querySelectorAll("[data-brand]").forEach(e=>e.textContent=CONFIG.brand);document.title=CONFIG.brand+" – Pesan desain lewat formulir";CONFIG.budgets.forEach(b=>$("#bg").add(new Option(b)));
COLS.forEach(([n,h])=>{const b=document.createElement("button");b.type="button";b.className="sw";b.style.background=h;b.title=n;b.setAttribute("aria-label",n);b.setAttribute("aria-pressed","false");b.dataset.g="color";b.dataset.v=n;$("#sws").appendChild(b)});
/* ===== PILIHAN (jenis, gaya, warna) ===== */
function pick(g,v){$$('[data-g="'+g+'"]').forEach(b=>{if(g==="color"){if(b.dataset.v===v){const on=b.getAttribute("aria-pressed")==="true";if(!on&&S.colors.length>=3)return;b.setAttribute("aria-pressed",String(!on));S.colors=on?S.colors.filter(c=>c!==v):[...S.colors,v]}}else b.setAttribute("aria-pressed",String(b.dataset.v===v))});if(g!=="color")S[g]=v}
document.addEventListener("click",e=>{const c=e.target.closest("[data-g]");if(c){$("#err").textContent="";pick(c.dataset.g,c.dataset.v)}
const p=e.target.closest("[data-pick]");if(p){const v=p.dataset.pick;pick("type",v);show(1);$("#pesan").scrollIntoView()}});
/* ===== LANGKAH FORMULIR ===== */
function show(i){cur=i;steps.forEach((s,k)=>s.hidden=k!==i);$("#bar").style.width=((i+1)/3*100)+"%";$("#stl").textContent="Langkah "+(i+1)+" dari 3";$("#stn").textContent=names[i];$("#back").hidden=i===0;$("#next").textContent=i===2?"Kirim pesanan":"Lanjut";$("#err").textContent=""}
/* ===== VALIDASI ISIAN ===== */
function check(){if(cur===0&&!S.type)return"Pilih salah satu jenis desain terlebih dahulu.";
if(cur===1){if(!$("#proj").value.trim())return"Isi nama proyek atau usaha Anda.";if($("#desc").value.trim().length<10)return"Ceritakan sedikit lebih lengkap, minimal satu kalimat."}
if(cur===2){if(!$("#nm").value.trim())return"Isi nama Anda.";const c=$("#ct").value.trim();if(!(/^\S+@\S+\.\S+$/.test(c)||c.replace(/\D/g,"").length>=9))return"Isi nomor WhatsApp atau email yang benar.";if(!$("#ag").checked)return"Centang persetujuan agar kami bisa menghubungi Anda."}return""}
$("#next").onclick=()=>{const m=check();if(m){$("#err").textContent=m;return}if(cur<2){show(cur+1);return}submit()};
$("#back").onclick=()=>show(cur-1);
/* ===== UNGGAH GAMBAR ===== */
let FILES=[];
const fh=skip=>{$("#flh").textContent="Maksimal "+CONFIG.maxFiles+" gambar, masing-masing "+CONFIG.maxFileMB+" MB."+(skip?" "+skip+" file dilewati karena bukan gambar, terlalu besar, atau melebihi batas.":"")};fh(0);
function drawThumbs(){const t=$("#thumbs");t.textContent="";FILES.forEach((o,i)=>{const w=document.createElement("div"),im=new Image(),x=document.createElement("button");w.className="th";im.src=o.url;im.alt=o.file.name;x.type="button";x.textContent="×";x.setAttribute("aria-label","Hapus "+o.file.name);x.onclick=()=>{FILES.splice(i,1);drawThumbs()};w.append(im,x);t.appendChild(w)})}
$("#fl").onchange=e=>{const max=CONFIG.maxFileMB*1048576;let skip=0;[...e.target.files].forEach(f=>{if(!f.type.startsWith("image/")||f.size>max||FILES.length>=CONFIG.maxFiles){skip++;return}const o={file:f,url:""},r=new FileReader();FILES.push(o);r.onload=()=>{o.url=r.result;drawThumbs()};r.readAsDataURL(f)});e.target.value="";fh(skip)};

/* ===== KIRIM PESANAN (WhatsApp, email, server, simpan di perangkat) ===== */
let TXT="",ORDER=null;
async function submit(){
const id="DK-"+Date.now().toString(36).toUpperCase().slice(-6);
const rows=[["Jenis",S.type],["Proyek",$("#proj").value.trim()],["Keinginan",$("#desc").value.trim()],["Gaya",S.style||"Belum dipilih"],["Warna",S.colors.join(", ")||"Belum dipilih"],["Gambar contoh",FILES.length?FILES.length+" file":"Tidak ada"],["Nama",$("#nm").value.trim()],["Kontak",$("#ct").value.trim()],["Target",$("#dl").value||"Fleksibel"],["Anggaran",$("#bg").value]];
TXT="Pesanan "+id+" ("+CONFIG.brand+")\n"+rows.map(([k,v])=>k+": "+v).join("\n");
ORDER={id,time:new Date().toISOString(),rows};
try{const a=JSON.parse(localStorage.getItem("orders")||"[]");a.push(ORDER);localStorage.setItem("orders",JSON.stringify(a))}catch(e){}
const dl=$("#sum");dl.textContent="";rows.forEach(([k,v])=>{const d=document.createElement("div"),t=document.createElement("dt"),o=document.createElement("dd");t.textContent=k;o.textContent=v;d.append(t,o);dl.appendChild(d)});
$("#thx").textContent="Terima kasih, "+$("#nm").value.trim()+"!";$("#oid").textContent="Nomor pesanan: "+id;
$("#cmsg").textContent=FILES.length&&!CONFIG.endpoint?"Gambar contoh perlu dilampirkan manual di chat WhatsApp atau email.":"";
$("#flow").hidden=true;$("#done").hidden=false;$("#form").scrollIntoView();
if(CONFIG.endpoint){const bad="Sistem belum menerima pesanan. Kirim lewat WhatsApp atau email di atas.";try{const fd=new FormData();fd.append("id",id);rows.forEach(([k,v])=>fd.append(k,v));FILES.forEach(o=>fd.append("gambar",o.file));const r=await fetch(CONFIG.endpoint,{method:"POST",body:fd,headers:{Accept:"application/json"}});$("#cmsg").textContent=r.ok?"Pesanan Anda sudah masuk ke sistem kami.":bad}catch(e){$("#cmsg").textContent=bad}}}
$("#wa").onclick=()=>{if(!CONFIG.whatsapp){$("#cmsg").textContent="Nomor WhatsApp belum diisi di js/config.js.";return}window.open("https://wa.me/"+CONFIG.whatsapp+"?text="+encodeURIComponent(TXT+(FILES.length?"\n\nContoh gambar saya kirim setelah pesan ini.":"")),"_blank","noopener")};
$("#mail").onclick=()=>{if(!CONFIG.email){$("#cmsg").textContent="Alamat email belum diisi di js/config.js.";return}location.href="mailto:"+CONFIG.email+"?subject="+encodeURIComponent("Pesanan desain "+ORDER.id)+"&body="+encodeURIComponent(TXT)};
$("#copy").onclick=async()=>{try{await navigator.clipboard.writeText(TXT);$("#cmsg").textContent="Ringkasan sudah disalin."}catch(e){$("#cmsg").textContent="Gagal menyalin. Tekan dan tahan teks ringkasan untuk menyalin manual."}};
$("#again").onclick=()=>{S.type=S.style="";S.colors=[];FILES=[];drawThumbs();fh(0);$("#fl").value="";$$("[aria-pressed]").forEach(b=>b.setAttribute("aria-pressed","false"));$$("input[type=text],input[type=date],textarea").forEach(i=>i.value="");$("#ag").checked=false;$("#flow").hidden=false;$("#done").hidden=true;show(0)};

/* ===== ANGKA BERJALAN (statistik) ===== */
const rm=matchMedia("(prefers-reduced-motion:reduce)").matches,fmt=n=>n.toLocaleString("id-ID");
function count(el){const to=+el.dataset.to,suf=el.dataset.suf||"";if(rm){el.textContent=fmt(to)+suf;return}const t0=performance.now();(function f(t){const p=Math.min((t-t0)/1400,1),e=1-Math.pow(1-p,3);el.textContent=fmt(Math.round(to*e))+suf;if(p<1)requestAnimationFrame(f)})(t0)}
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){count(x.target);io.unobserve(x.target)}}),{threshold:.6});
$$(".num").forEach(n=>io.observe(n));
