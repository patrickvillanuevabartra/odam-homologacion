/* ══════════════════════════════════════════════════════════════════
   GESTIÓN DE PROVEEDORES · módulos Compras y Directorio único
   Se apoya en index.html: qdbFetch, esc, tst, getUsuarioCorreo, getUsuarioNombre,
   esAdmin, _categorias, getCategoria, _pkNorm, _pkPlural, safeJsonParse, urpNotasPasos.
   ══════════════════════════════════════════════════════════════════ */
(function(){
var css=`
.mod-switch{display:grid;grid-template-columns:auto repeat(3,1fr);gap:8px;margin:0 0 14px;}
.mod-btn.home{flex-direction:column;justify-content:center;gap:2px;padding:8px 14px;text-align:center;}
.mod-btn.home b{font-size:.95rem;}
.ini-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:16px 0;}
.ini-card{font-family:inherit;text-align:left;background:white;border:2px solid var(--border);border-radius:14px;padding:18px;cursor:pointer;color:var(--text);display:flex;flex-direction:column;gap:8px;}
.ini-card:hover{border-color:var(--primary);box-shadow:0 4px 14px rgba(0,45,84,.12);}
.ini-card .ii{font-size:2.4rem;line-height:1;}
.ini-card b{font-size:1.25rem;}
.ini-card .ic{font-size:1rem;color:var(--muted);line-height:1.5;}
.ini-card .ig{margin-top:auto;font-weight:700;color:var(--primary);font-size:1rem;}
.ini-flujo{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;background:var(--surface);border:1.5px solid var(--border);border-radius:12px;padding:14px;font-size:1.05rem;}
.ini-flujo span.p{background:white;border:1.5px solid var(--border);border-radius:10px;padding:8px 12px;font-weight:600;}
.mod-btn{font-family:inherit;text-align:left;display:flex;align-items:center;gap:10px;padding:10px 14px;border:2px solid var(--border);border-radius:12px;background:white;cursor:pointer;color:var(--text);}
.mod-btn .mi{font-size:1.6rem;line-height:1;}
.mod-btn b{display:block;font-size:1.05rem;}
.mod-btn small{display:block;font-size:.85rem;color:var(--muted);}
.mod-btn.on{border-color:var(--primary);background:#EFF6FF;box-shadow:0 0 0 3px rgba(2,132,199,.15);}
.cp-card{background:white;border:1.5px solid var(--border);border-radius:12px;padding:16px 18px;margin-bottom:14px;}
.cp-h{font-size:1.25rem;font-weight:700;margin:0 0 4px;color:var(--text);}
.cp-sub{font-size:.95rem;color:var(--muted);margin-bottom:12px;}
.cp-lbl{display:block;font-size:.98rem;font-weight:700;margin:12px 0 4px;}
.cp-ayuda{font-size:.9rem;color:var(--muted);margin-top:3px;line-height:1.45;}
.cp-inp{width:100%;padding:10px 12px;border:1.5px solid var(--border);border-radius:8px;font-size:1rem;font-family:inherit;background:white;color:var(--text);}
.cp-inp:focus{outline:2px solid #93C5FD;border-color:#3B82F6;}
.cp-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.cp-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;}
.cp-acts{display:flex;gap:10px;flex-wrap:wrap;justify-content:space-between;align-items:center;margin:14px 0;}
.cp-acts .btn{font-size:.95rem;}
.cp-list{display:flex;flex-direction:column;gap:8px;}
.cp-item{display:block;width:100%;text-align:left;font-family:inherit;background:white;border:1.5px solid var(--border);border-left:5px solid var(--border);border-radius:10px;padding:12px 14px;cursor:pointer;color:var(--text);}
.cp-item.on{border-color:var(--primary);border-left-color:var(--primary);background:#EFF6FF;}
.cp-item-nom{font-size:1.05rem;font-weight:700;}
.cp-item-meta{font-size:.92rem;color:var(--muted);margin-top:3px;}
.cp-tabla{width:100%;border-collapse:collapse;font-size:.98rem;}
.cp-tabla th{background:var(--primary);color:white;font-weight:700;padding:9px 8px;text-align:left;font-size:.92rem;vertical-align:bottom;}
.cp-tabla td{border-bottom:1px solid var(--border);padding:8px;vertical-align:top;}
.cp-tabla td.num,.cp-tabla th.num{text-align:right;white-space:nowrap;}
.cp-tabla tr.tot td{font-weight:700;background:var(--surface);border-top:2px solid var(--primary);}
.cp-tabla input{width:100%;padding:7px 8px;border:1.5px solid var(--border);border-radius:6px;font-size:.98rem;font-family:inherit;}
.cp-tabla input.n{text-align:right;}
.cp-scroll{overflow-x:auto;border:1.5px solid var(--border);border-radius:10px;}
.cel-min{background:#DCFCE7;color:#065F46;font-weight:700;}
.cel-imp{background:#FEF3C7;color:#92400E;font-style:italic;}
.cel-nadie{background:#FEE2E2;color:#991B1B;}
.cp-badge{display:inline-block;padding:2px 10px;border-radius:20px;font-size:.82rem;font-weight:700;}
.b-normal{background:#DCFCE7;color:#065F46;}.b-alerta{background:#FEF9C3;color:#92400E;}
.b-lista_negra{background:#FEE2E2;color:#991B1B;}.b-vetado{background:#1E293B;color:white;}
.cp-oferta{border:1.5px solid var(--border);border-radius:12px;margin-bottom:16px;overflow:hidden;}
.cp-oferta-h{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;background:var(--surface);padding:12px 16px;border-bottom:1.5px solid var(--border);}
.cp-oferta-b{padding:12px 16px;}
.cp-chip{display:inline-flex;align-items:center;gap:6px;padding:7px 12px;border:1.5px dashed #93C5FD;border-radius:20px;font-size:.95rem;cursor:pointer;background:white;color:#0369A1;font-family:inherit;margin:0 6px 6px 0;}
.cp-modal{position:fixed;inset:0;background:rgba(15,23,42,.5);z-index:3000;display:flex;align-items:flex-start;justify-content:center;padding:30px 14px;overflow-y:auto;}
.cp-modal-c{background:white;border-radius:14px;max-width:760px;width:100%;padding:20px 22px;box-shadow:0 20px 50px rgba(0,0,0,.25);}
.cp-pend{background:#F8FAFC;border:2px dashed var(--border);border-radius:12px;padding:26px;text-align:center;font-size:1.05rem;color:var(--muted);}
.cp-rank{display:inline-flex;width:30px;height:30px;border-radius:50%;align-items:center;justify-content:center;background:var(--primary);color:white;font-weight:700;}
.cp-aviso{background:#FEF2F2;border:1.5px solid #FCA5A5;border-radius:8px;padding:8px 12px;color:#991B1B;font-size:.95rem;margin-top:6px;}
@media (max-width:760px){.mod-switch,.cp-grid2,.cp-grid3,.ini-grid{grid-template-columns:1fr;}}
`;
var st=document.createElement('style');st.id='compras-css';st.textContent=css;document.head.appendChild(st);
})();

// ── Utilidades ──
var CP_IGV=0.18;
function cpNum(v){var n=parseFloat(String(v==null?'':v).replace(/,/g,'').replace(/\s/g,''));return isNaN(n)?null:n;}
function cpSoles(n){if(n==null||isNaN(n))return '—';return 'S/ '+n.toLocaleString('es-PE',{minimumFractionDigits:2,maximumFractionDigits:2});}
function cpRuc(s){return String(s||'').replace(/\D/g,'');}
function cpHoy(){return new Date().toISOString().slice(0,10);}
function cpUid(p){return p+'_'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);}
var CP_ESTADOS={normal:'Normal',alerta:'Alerta',lista_negra:'Lista negra',vetado:'Vetado'};
function cpEstadoKey(e){e=String(e||'normal').toLowerCase().replace(/\s+/g,'_');return CP_ESTADOS[e]?e:'normal';}
function cpBadge(e){var k=cpEstadoKey(e);return '<span class="cp-badge b-'+k+'">'+CP_ESTADOS[k]+'</span>';}
function cpNota(ico,tit,html){return '<div class="paso-nota"><span class="pn-ico">'+ico+'</span><div><div class="pn-tit">'+tit+'</div>'+html+'</div></div>';}
function cpUrp(){try{if(typeof urpNotasPasos==='function')urpNotasPasos();}catch(e){}}

// ══════════════════════════════════════
// SELECTOR DE MÓDULO
// ══════════════════════════════════════
var _modulo='homolog';
function cambiarModulo(m){
  _modulo=m;
  if(m!=='inicio'){try{localStorage.setItem('gp_modulo',m);}catch(e){}}
  var ini=document.getElementById('modInicio');if(ini)ini.style.display=m==='inicio'?'':'none';
  if(m==='inicio')iniRender();
  document.querySelectorAll('.mod-btn').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-mod')===m);});
  var hm=document.getElementById('modHomolog'),cp=document.getElementById('modCompras'),dr=document.getElementById('modDirectorio');
  var hs=document.getElementById('hmSteps'),cs=document.getElementById('cpSteps');
  var badge=document.getElementById('paqueteBadge');
  if(hm)hm.style.display=m==='homolog'?'':'none';
  if(hs)hs.style.display=m==='homolog'?'':'none';
  if(cp)cp.style.display=m==='compras'?'':'none';
  if(cs)cs.style.display=m==='compras'?'':'none';
  if(dr)dr.style.display=m==='directorio'?'':'none';
  if(badge&&m!=='homolog')badge.style.visibility='hidden';else if(badge)badge.style.visibility='';
  var sub=document.querySelector('.portal-sub');
  if(sub)sub.textContent=m==='inicio'?'¿Qué quieres hacer hoy?':m==='compras'?'Compras: elegir al mejor proveedor comparando ofertas'
    :m==='directorio'?'Directorio único de proveedores (un registro por RUC)'
    :'Homologación: evaluación y reevaluación de proveedores';
  if(m==='compras'){cpIniciar();}
  if(m==='directorio'){dirIniciar();}
  window.scrollTo({top:0});
}

// Atajo para el administrador: abrir Admin › Categorías
function irAdminCategorias(){
  if(!esAdmin()){tst('Solo el administrador puede editar categorías');return;}
  if(_cpSucio&&_cpAct)cpGuardar();
  cambiarModulo('homolog');goStep(7);switchAdminTab(5);adminRenderCategorias();
}
// ── Pantalla de inicio (neutral) ──
var CP_MOD_NOM={compras:'🛒 Compras',homolog:'✅ Homologación',directorio:'📇 Proveedores'};
function iniRender(){
  var w=document.getElementById('modInicio');if(!w)return;
  var ult='';try{ult=localStorage.getItem('gp_modulo')||'';}catch(e){}
  var nom=(typeof getUsuarioNombre==='function'?getUsuarioNombre():'')||'';
  var card=function(m,ico,tit,cuando,ej){return '<button type="button" class="ini-card" onclick="cambiarModulo(\''+m+'\')"><span class="ii">'+ico+'</span><b>'+tit+'</b>'
    +'<span class="ic"><b style="font-size:1rem;">Úsalo cuando:</b> '+cuando+'</span><span class="ic"><i>'+ej+'</i></span><span class="ig">Entrar →</span></button>';};
  w.innerHTML=cpNota('👋','Hola'+(nom?', '+esc(nom.split(' ')[0]):'')+'. Elige con qué vas a trabajar',
      'El sistema tiene tres partes. El camino normal es: primero <b>Compras</b> (eliges al proveedor comparando ofertas) y después <b>Homologación</b> (evalúas cómo trabajó). '
      +'Si el proveedor ya trabaja contigo, puedes ir directo a Homologación. Los dos usan el mismo <b>directorio de proveedores</b>.')
    +'<div class="ini-flujo"><span class="p">🛒 Compras: comparar ofertas</span><span>→ gana uno →</span><span class="p">✅ Homologación: evaluar su desempeño</span><span>→ Normal, Alerta, Lista negra o Vetado</span></div>'
    +'<div class="ini-grid">'
    +card('compras','🛒','Compras','necesitas comprar o contratar algo y tienes varias cotizaciones.','Ej.: elegir quién hará la tabiquería de drywall.')
    +card('homolog','✅','Homologación','quieres evaluar a un proveedor que ya te dio el servicio o el producto.','Ej.: calificar el lavado de muebles que se hizo en octubre.')
    +card('directorio','📇','Proveedores','quieres ver, corregir o registrar los datos de un proveedor (RUC, contacto, cuenta).','Ej.: actualizar el celular de un contratista.')
    +'</div>'
    +(CP_MOD_NOM[ult]?'<div class="cp-acts"><span class="cp-sub" style="margin:0;">La última vez trabajaste en <b>'+CP_MOD_NOM[ult]+'</b>.</span>'
      +'<button class="btn btn-p" onclick="cambiarModulo(\''+ult+'\')">Continuar en '+CP_MOD_NOM[ult]+' →</button></div>':'');
  cpUrp();
}

// ══════════════════════════════════════
// DIRECTORIO ÚNICO DE PROVEEDORES
// ══════════════════════════════════════
var _dir=[],_dirCarga='idle',_dirCbs=[],_dirSembrado=false;
function _dirMap(r){
  return {_qid:r._qid,id:r.id||r._qid,ruc:r.ruc||'',razon_social:r.razon_social||'',
    contacto_nombre:r.contacto_nombre||'',contacto_celular:r.contacto_celular||'',contacto_email:r.contacto_email||'',
    direccion:r.direccion||'',n_cuenta:r.n_cuenta||'',cci:r.cci||'',web:r.web||'',
    categorias:String(r.categorias||'').split(/\s*;\s*/).filter(Boolean),
    etiquetas:String(r.etiquetas||'').split(/\s*;\s*/).filter(Boolean),
    estado:cpEstadoKey(r.estado),origen:r.origen||'',observacion:r.observacion||'',
    propietario:(r.propietario||'').toLowerCase(),propietario_nombre:r.propietario_nombre||'',
    fecha_registro:r.fecha_registro||''};
}
function _dirClave(o){var r=cpRuc(o.ruc);return r.length===11?'r:'+r:'n:'+_pkNorm(o.razon_social||o.nom||'');}
function dirCargar(cb,forzar){
  if(cb)_dirCbs.push(cb);
  if(_dirCarga==='cargando')return;
  if(_dirCarga==='ok'&&!forzar){var c=_dirCbs;_dirCbs=[];c.forEach(function(f){f(true);});return;}
  _dirCarga='cargando';
  qdbFetch({accion:'cargarDirectorio'},function(res){
    var ok=!!(res&&res.ok);
    if(ok){
      var yo=(getUsuarioCorreo()||'').toLowerCase();
      _dir=(res.registros||[]).map(_dirMap).filter(function(d){return d.razon_social&&d.propietario===yo;});
      _dir.sort(function(a,b){return a.razon_social.localeCompare(b.razon_social);});
    }
    var fin=function(){_dirCarga=ok?'ok':'error';var c=_dirCbs;_dirCbs=[];c.forEach(function(f){f(ok);});};
    // Primera vez: el directorio se llena con los proveedores ya registrados en Homologación
    if(ok&&!_dir.length&&!_dirSembrado){
      _dirSembrado=true;
      var l=document.getElementById('dirLista');if(l)l.innerHTML='<div class="cp-pend">Preparando tu directorio con los proveedores que ya registraste en Homologación…</div>';
      dirSembrar(function(n){if(n)tst('✅ '+n+' proveedores pasaron al directorio único');fin();});
      return;
    }
    fin();
  });
}
function dirBuscar(o){var k=_dirClave(o);return _dir.find(function(d){return _dirClave(d)===k;})||null;}
function _dirDatos(d){
  return {id:d.id,ruc:cpRuc(d.ruc)||d.ruc||'',razon_social:d.razon_social,contacto_nombre:d.contacto_nombre||'',
    contacto_celular:d.contacto_celular||'',contacto_email:d.contacto_email||'',direccion:d.direccion||'',
    n_cuenta:d.n_cuenta||'',cci:d.cci||'',web:d.web||'',categorias:(d.categorias||[]).join('; '),
    etiquetas:(d.etiquetas||[]).join('; '),estado:d.estado||'normal',origen:d.origen||'',observacion:d.observacion||'',
    propietario:getUsuarioCorreo(),propietario_nombre:getUsuarioNombre(),
    fecha_registro:d.fecha_registro||cpHoy(),ultima_actualizacion:cpHoy()};
}
function dirGuardar(d,cb){
  if(!d.id)d.id=cpUid('dir');
  qdbFetch({accion:'guardarDirectorio',datos:JSON.stringify(_dirDatos(d)),qid:d._qid||''},function(res){
    if(res&&res.qid)d._qid=res.qid;
    var ok=!!(res&&res.ok);
    if(ok&&_dir.indexOf(d)<0){_dir.push(d);_dir.sort(function(a,b){return a.razon_social.localeCompare(b.razon_social);});}
    if(cb)cb(ok);
  });
}
// Registra o actualiza en el directorio sin borrar datos que ya tenía
function dirUpsert(o,origen,cb){
  dirCargar(function(ok){
    if(!ok){if(cb)cb(false);return;}
    var d=dirBuscar(o);
    var nuevo=!d;
    if(!d)d={razon_social:'',origen:origen||'',categorias:[],etiquetas:[],estado:'normal'};
    ['ruc','razon_social','contacto_nombre','contacto_celular','contacto_email','direccion','n_cuenta','cci','web'].forEach(function(k){
      if(o[k]&&String(o[k]).trim())d[k]=String(o[k]).trim();
    });
    if(o.estado)d.estado=cpEstadoKey(o.estado);
    if(o.categoria&&d.categorias.indexOf(o.categoria)<0)d.categorias.push(o.categoria);
    (o.etiquetas||[]).forEach(function(e){if(d.etiquetas.indexOf(e)<0)d.etiquetas.push(e);});
    if(!d.razon_social){if(cb)cb(false);return;}
    dirGuardar(d,function(ok2){if(cb)cb(ok2,d,nuevo);});
  });
}
// Desde Homologación: cada proveedor guardado queda en el directorio
function dirDesdeHomolog(p,estado){
  if(!p||!(p.nom||'').trim())return;
  dirUpsert({ruc:p.ruc,razon_social:p.nom,contacto_nombre:p.contactoNom,contacto_celular:p.contactoCel,
    contacto_email:p.contactoEmail,direccion:p.dir,n_cuenta:p.nCuenta,cci:p.cci,web:p.linkEmpresa,
    estado:estado,categoria:(typeof paqueteActual!=='undefined'&&paqueteActual&&paqueteActual.categoria)||''},'homologacion');
}
// Primera vez: llenar el directorio con los proveedores ya registrados en Homologación
function dirSembrar(cb){
  qdbFetch({accion:'cargarProveedores'},function(res){
    if(!res||!res.ok){if(cb)cb(0);return;}
    var yo=(getUsuarioCorreo()||'').toLowerCase();
    var sev={normal:0,alerta:1,lista_negra:2,vetado:3};
    var porClave={};
    (res.registros||[]).filter(function(r){return (r.propietario||'').toLowerCase()===yo&&(r.nombre||'').trim();}).forEach(function(r){
      var o={ruc:r.ruc,razon_social:(r.nombre||'').trim(),contacto_nombre:r.contacto_nombre,contacto_celular:r.contacto_celular,
        contacto_email:r.contacto_email,direccion:r.direccion,n_cuenta:r.n_cuenta,cci:r.cci,web:r.link_empresa,
        estado:cpEstadoKey(r.estado),observacion:r.rubro_sector?'Rubro: '+r.rubro_sector:''};
      var k=_dirClave(o),prev=porClave[k];
      if(prev){Object.keys(o).forEach(function(x){if(o[x]&&x!=='estado')prev[x]=o[x];});if(sev[o.estado]>sev[prev.estado])prev.estado=o.estado;}
      else porClave[k]=o;
    });
    var lista=Object.keys(porClave).map(function(k){var o=porClave[k];o.origen='homologacion';o.categorias=[];o.etiquetas=[];return o;});
    if(!lista.length){if(cb)cb(0);return;}
    var pend=lista.length,hechos=0;
    lista.forEach(function(d){dirGuardar(d,function(ok){if(ok)hechos++;if(--pend===0&&cb)cb(hechos);});});
  });
}

var _dirFiltro='';
function dirIniciar(){
  var w=document.getElementById('modDirectorio');if(!w)return;
  if(!w.dataset.init){
    w.dataset.init='1';
    w.innerHTML=cpNota('📇','Un solo registro por proveedor',
      'Aquí está cada proveedor <b>una sola vez</b>, identificado por su <b>RUC</b>. Lo usan los dos módulos: en <b>Compras</b> lo invitas a cotizar y en <b>Homologación</b> lo evalúas. '
      +'El <b>estado</b> (Normal, Alerta, Lista negra o Vetado) lo calcula Homologación con sus evaluaciones; si un proveedor está en Lista negra o Vetado, Compras te avisará antes de invitarlo.')
      +'<div class="cp-acts"><input id="dirBuscar" class="cp-inp" style="max-width:420px;" type="search" placeholder="Buscar por razón social o RUC" oninput="_dirFiltro=this.value;dirRender()">'
      +'<div style="display:flex;gap:8px;"><button class="btn btn-o btn-sm" onclick="dirCargar(dirRender,true)">🔄 Actualizar</button>'
      +'<button class="btn btn-p btn-sm" onclick="dirEditar(null)">+ Nuevo proveedor</button></div></div>'
      +'<div id="dirForm"></div><div id="dirConteo" class="cp-sub"></div><div id="dirLista" class="cp-list"></div>';
    cpUrp();
  }
  var l=document.getElementById('dirLista');if(l&&_dirCarga!=='ok')l.innerHTML='<div class="cp-pend">Cargando el directorio desde QuintaDB…</div>';
  dirCargar(function(){dirRender();});
}
function dirRender(){
  var l=document.getElementById('dirLista');if(!l)return;
  if(_dirCarga==='error'){l.innerHTML='<div class="cp-pend">No se pudo leer el directorio. <button class="btn btn-o btn-sm" onclick="dirCargar(dirRender,true)">Reintentar</button></div>';return;}
  var q=_pkNorm(_dirFiltro);
  var lista=_dir.filter(function(d){return !q||_pkNorm(d.razon_social).indexOf(q)>-1||cpRuc(d.ruc).indexOf(cpRuc(_dirFiltro)||'@')>-1;});
  var c=document.getElementById('dirConteo');if(c)c.textContent=(q?lista.length+' de ':'')+_pkPlural(_dir.length,'proveedor','proveedores');
  l.innerHTML=lista.map(function(d){
    var i=_dir.indexOf(d);
    var cats=d.categorias.map(function(id){var k=getCategoria(id);return k?k.icono+' '+esc(k.nombre):'';}).filter(Boolean).join(' · ');
    return '<div class="cp-item" style="cursor:default;border-left-color:'+(d.estado==='normal'?'#10B981':d.estado==='alerta'?'#F59E0B':'#DC2626')+'">'
      +'<div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;"><div class="cp-item-nom">'+esc(d.razon_social)+' '+cpBadge(d.estado)+'</div>'
      +'<div style="display:flex;gap:6px;"><button class="pk-tool" style="font-size:.95rem;" onclick="dirEditar('+i+')">✏️ Editar</button>'
      +'<button class="pk-tool del" style="font-size:.95rem;" onclick="dirEliminar('+i+')">🗑 Eliminar</button></div></div>'
      +'<div class="cp-item-meta">RUC: '+(esc(d.ruc)||'<i>sin RUC</i>')+(d.contacto_nombre?' · '+esc(d.contacto_nombre):'')+(d.contacto_celular?' · '+esc(d.contacto_celular):'')+'</div>'
      +(cats?'<div class="cp-item-meta">'+cats+'</div>':'')
      +'<div class="cp-item-meta">Registrado desde: '+(d.origen==='compras'?'🛒 Compras':d.origen==='homologacion'?'✅ Homologación':'📇 Directorio')+'</div></div>';
  }).join('')||'<div class="cp-pend">'+(q?'Ningún proveedor coincide con la búsqueda.':'Aún no hay proveedores. Usa <b>+ Nuevo proveedor</b>.')+'</div>';
}
function dirEliminar(i){
  var d=_dir[i];if(!d)return;
  var usos=_cpLista.filter(function(c){return (c.ofertas||[]).some(function(o){return o.dirId===d.id||_dirClave(o)===_dirClave(d);});});
  var msg='¿Eliminar a "'+d.razon_social+'" del directorio?\n\n'
    +'• Sus evaluaciones y paquetes en Homologación NO se borran.\n'
    +(usos.length?'• Aparece en '+_pkPlural(usos.length,'requerimiento','requerimientos')+' de Compras ('+usos.map(function(c){return c.nombre;}).join(', ')+'); sus ofertas se conservan.\n':'')
    +'• Si vuelves a guardarlo desde Homologación o Compras, se registrará de nuevo.\n\nNo se puede deshacer.';
  if(!confirm(msg))return;
  var quitar=function(){_dir=_dir.filter(function(x){return x!==d;});dirRender();tst('✅ '+d.razon_social+' eliminado del directorio');};
  if(!d._qid){quitar();return;}
  qdbFetch({accion:'eliminarDirectorio',qid:d._qid},function(res){
    if(res&&res.ok)quitar();else tst('⚠️ No se pudo eliminar en QuintaDB; inténtalo de nuevo');
  });
}
function dirEditar(i){
  var f=document.getElementById('dirForm');if(!f)return;
  var d=i===null?{razon_social:'',ruc:'',categorias:[],etiquetas:[],estado:'normal',origen:'directorio'}:_dir[i];
  var campo=function(lbl,k,ph){return '<div><label class="cp-lbl">'+lbl+'</label><input class="cp-inp" id="df_'+k+'" value="'+esc(d[k]||'')+'" placeholder="'+(ph||'')+'"></div>';};
  f.innerHTML='<div class="cp-card" style="border-color:var(--primary);"><div class="cp-h">'+(i===null?'Nuevo proveedor':'Editar proveedor')+'</div>'
    +'<div class="cp-grid2">'+campo('Razón social *','razon_social','Ej.: MR Contratistas SAC')+campo('RUC (11 dígitos)','ruc','20xxxxxxxxx')
    +campo('Nombre de contacto','contacto_nombre')+campo('Celular','contacto_celular')+campo('Correo','contacto_email')+campo('Dirección','direccion')
    +campo('N° de cuenta','n_cuenta')+campo('CCI','cci')+campo('Web o red social','web')+'</div>'
    +'<label class="cp-lbl">Observación</label><textarea class="cp-inp" id="df_observacion" rows="2">'+esc(d.observacion||'')+'</textarea>'
    +'<div class="cp-ayuda">Estado actual: '+cpBadge(d.estado)+' — lo actualiza Homologación según las evaluaciones.</div>'
    +'<div class="cp-acts"><button class="btn btn-o" onclick="document.getElementById(\'dirForm\').innerHTML=\'\'">Cancelar</button>'
    +'<button class="btn btn-p" onclick="dirGuardarForm('+(i===null?'null':i)+')">💾 Guardar proveedor</button></div></div>';
  f.scrollIntoView({behavior:'smooth',block:'start'});
}
function dirGuardarForm(i){
  var g=function(k){return (document.getElementById('df_'+k).value||'').trim();};
  var o={};['razon_social','ruc','contacto_nombre','contacto_celular','contacto_email','direccion','n_cuenta','cci','web','observacion'].forEach(function(k){o[k]=g(k);});
  if(!o.razon_social){tst('Escribe la razón social');return;}
  var r=cpRuc(o.ruc);
  if(o.ruc&&r.length!==11){if(!confirm('El RUC debe tener 11 dígitos y tiene '+r.length+'. ¿Guardar de todos modos?'))return;}
  var d=i===null?{categorias:[],etiquetas:[],estado:'normal',origen:'directorio'}:_dir[i];
  var dup=dirBuscar(o);
  if(dup&&dup!==d){tst('⚠️ Ya existe en el directorio: '+dup.razon_social);return;}
  Object.keys(o).forEach(function(k){d[k]=o[k];});
  dirGuardar(d,function(ok){
    if(!ok){tst('⚠️ No se pudo guardar en QuintaDB');return;}
    document.getElementById('dirForm').innerHTML='';dirRender();tst('✅ Proveedor guardado');
  });
}

// Selector de proveedores del directorio (lo usan Compras y Homologación)
function dirElegir(titulo,alElegir,opciones){
  opciones=opciones||{};
  dirCargar(function(ok){
    var m=document.createElement('div');m.className='cp-modal';
    m.innerHTML='<div class="cp-modal-c"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px;">'
      +'<div class="cp-h">'+titulo+'</div><button class="btn btn-o btn-sm" id="dirElCerrar">✕ Cerrar</button></div>'
      +'<div class="cp-sub">Busca por razón social o RUC. Si no está, regístralo con <b>Nuevo proveedor</b>.</div>'
      +'<input class="cp-inp" id="dirElQ" type="search" placeholder="Buscar…" autocomplete="off">'
      +'<div id="dirElLista" class="cp-list" style="margin-top:10px;max-height:52vh;overflow-y:auto;"></div>'
      +'<details style="margin-top:12px;"><summary style="cursor:pointer;font-weight:700;font-size:1rem;">+ Nuevo proveedor (no está en la lista)</summary>'
      +'<div class="cp-grid2"><div><label class="cp-lbl">Razón social *</label><input class="cp-inp" id="dirNvNom"></div>'
      +'<div><label class="cp-lbl">RUC</label><input class="cp-inp" id="dirNvRuc" placeholder="20xxxxxxxxx"></div>'
      +'<div><label class="cp-lbl">Contacto</label><input class="cp-inp" id="dirNvCon"></div>'
      +'<div><label class="cp-lbl">Celular</label><input class="cp-inp" id="dirNvCel"></div></div>'
      +'<div class="cp-acts"><span></span><button class="btn btn-p" id="dirNvOk">Registrar y elegir</button></div></details></div>';
    document.body.appendChild(m);
    var cerrar=function(){m.remove();};
    m.querySelector('#dirElCerrar').onclick=cerrar;
    m.onclick=function(e){if(e.target===m)cerrar();};
    var excluir=opciones.excluir||[];
    function pintar(){
      var q=_pkNorm(m.querySelector('#dirElQ').value),qr=cpRuc(m.querySelector('#dirElQ').value);
      var l=_dir.filter(function(d){return (!q||_pkNorm(d.razon_social).indexOf(q)>-1||(qr&&cpRuc(d.ruc).indexOf(qr)>-1));});
      var w=m.querySelector('#dirElLista');
      if(!ok){w.innerHTML='<div class="cp-pend">No se pudo leer el directorio.</div>';return;}
      w.innerHTML=l.slice(0,80).map(function(d){
        var ya=excluir.indexOf(_dirClave(d))>-1;
        return '<button type="button" class="cp-item" data-i="'+_dir.indexOf(d)+'"'+(ya?' disabled style="opacity:.5;cursor:not-allowed;"':'')+'>'
          +'<div class="cp-item-nom">'+esc(d.razon_social)+' '+cpBadge(d.estado)+(ya?' <span class="cp-badge" style="background:#E2E8F0;">ya agregado</span>':'')+'</div>'
          +'<div class="cp-item-meta">RUC: '+(esc(d.ruc)||'sin RUC')+(d.contacto_nombre?' · '+esc(d.contacto_nombre):'')+'</div></button>';
      }).join('')||'<div class="cp-pend">Sin resultados.</div>';
      w.querySelectorAll('button[data-i]').forEach(function(b){b.onclick=function(){
        var d=_dir[+b.getAttribute('data-i')];
        if((d.estado==='lista_negra'||d.estado==='vetado')&&!confirm('⚠️ '+d.razon_social+' está en '+CP_ESTADOS[d.estado]+' según sus evaluaciones en Homologación.\n\n¿Elegirlo de todos modos?'))return;
        cerrar();alElegir(d);
      };});
    }
    m.querySelector('#dirElQ').oninput=pintar;
    m.querySelector('#dirNvOk').onclick=function(){
      var o={razon_social:m.querySelector('#dirNvNom').value.trim(),ruc:m.querySelector('#dirNvRuc').value.trim(),
        contacto_nombre:m.querySelector('#dirNvCon').value.trim(),contacto_celular:m.querySelector('#dirNvCel').value.trim()};
      if(!o.razon_social){tst('Escribe la razón social');return;}
      var dup=dirBuscar(o);if(dup){cerrar();alElegir(dup);return;}
      dirUpsert(o,opciones.origen||'directorio',function(ok2,d){if(!ok2){tst('⚠️ No se pudo registrar');return;}cerrar();alElegir(d);});
    };
    pintar();setTimeout(function(){m.querySelector('#dirElQ').focus();},30);
  });
}
// Homologación: agregar proveedor desde el directorio
function homologDesdeDirectorio(){
  if(typeof paqueteActual==='undefined'||!paqueteActual){tst('Primero elige un paquete');return;}
  var ya=(typeof provs!=='undefined'?provs:[]).map(function(p){return _dirClave({ruc:p.ruc,razon_social:p.nom});});
  dirElegir('Elegir proveedor del directorio',function(d){
    addProv({id:'p'+(++provSeq),nom:d.razon_social,ruc:d.ruc,dir:d.direccion,contactoNom:d.contacto_nombre,
      contactoCel:d.contacto_celular,contactoEmail:d.contacto_email,nCuenta:d.n_cuenta,cci:d.cci,linkEmpresa:d.web,
      fec:cpHoy(),mat:'',eva:'',guardado:false,_modificado:true});
    tst('✅ '+d.razon_social+' agregado. Revisa sus datos y guárdalo con 💾');
  },{excluir:ya,origen:'homologacion'});
}

// ══════════════════════════════════════
// COMPRAS
// ══════════════════════════════════════
var _cpLista=[],_cpCarga='idle',_cpAct=null,_cpPaso=0,_cpSucio=false;
var CP_PASOS=['Requerimiento','Partidas','Bases de evaluación','Postores y ofertas','Evaluación','Resultado'];

function _cpMap(r){
  return {_qid:r._qid,id:r.id||r._qid,nombre:r.nombre||'',categoria:r.categoria||'',descripcion:r.descripcion||'',
    objetivo:r.objetivo||'',fecha_solicitud:r.fecha_solicitud||'',fecha_tentativa:r.fecha_tentativa||'',
    peso_tecnico:cpNum(r.peso_tecnico)==null?70:cpNum(r.peso_tecnico),
    partidas:safeJsonParse(r.partidas_json,[])||[],ofertas:safeJsonParse(r.ofertas_json,[])||[],
    tecnica:safeJsonParse(r.tecnica_json,{})||{},resultado:safeJsonParse(r.resultado_json,{})||{},
    estado:r.estado||'borrador',propietario:(r.propietario||'').toLowerCase(),fecha_creacion:r.fecha_creacion||'',
    ultima_actualizacion:r.ultima_actualizacion||''};
}
function cpIniciar(){
  var w=document.getElementById('modCompras');if(!w)return;
  if(!w.dataset.init){w.dataset.init='1';cpPaso(0);}
  if(_cpCarga==='idle'||_cpCarga==='error')cpCargar();
}
function cpCargar(){
  _cpCarga='cargando';cpRender();
  qdbFetch({accion:'cargarCompras'},function(res){
    if(!res||!res.ok){_cpCarga='error';cpRender();return;}
    var yo=(getUsuarioCorreo()||'').toLowerCase();
    var lista=(res.registros||[]).map(_cpMap).filter(function(c){return c.nombre&&(!c.propietario||c.propietario===yo);});
    if(_cpAct){var i=lista.findIndex(function(c){return c.id===_cpAct.id;});if(i>-1)lista[i]=_cpAct;}
    lista.sort(function(a,b){return String(b.ultima_actualizacion).localeCompare(String(a.ultima_actualizacion));});
    _cpLista=lista;_cpCarga='ok';cpRender();
  });
  dirCargar(function(){});
}
function cpGuardar(cb){
  var c=_cpAct;if(!c){if(cb)cb(false);return;}
  var pt=Math.max(0,Math.min(100,cpNum(c.peso_tecnico)==null?70:cpNum(c.peso_tecnico)));
  var datos={id:c.id,nombre:c.nombre,categoria:c.categoria,descripcion:c.descripcion,objetivo:c.objetivo,
    fecha_solicitud:c.fecha_solicitud,fecha_tentativa:c.fecha_tentativa,peso_tecnico:String(pt),peso_economico:String(100-pt),
    partidas_json:JSON.stringify(c.partidas||[]),ofertas_json:JSON.stringify(c.ofertas||[]),
    tecnica_json:JSON.stringify(c.tecnica||{}),resultado_json:JSON.stringify(c.resultado||{}),
    estado:c.estado||'borrador',propietario:getUsuarioCorreo(),propietario_nombre:getUsuarioNombre(),
    fecha_creacion:c.fecha_creacion||cpHoy(),ultima_actualizacion:new Date().toISOString().slice(0,16).replace('T',' ')};
  qdbFetch({accion:'guardarCompra',datos:JSON.stringify(datos),qid:c._qid||''},function(res){
    var ok=!!(res&&res.ok);
    if(res&&res.qid)c._qid=res.qid;
    if(ok){_cpSucio=false;c.ultima_actualizacion=datos.ultima_actualizacion;if(_cpLista.indexOf(c)<0)_cpLista.unshift(c);}
    cpMarcarGuardado(ok);
    if(cb)cb(ok);
  });
}
function cpMarcar(){_cpSucio=true;var e=document.getElementById('cpEstadoGuardado');if(e){e.textContent='✏️ Cambios sin guardar';e.style.color='#92400E';}}
function cpMarcarGuardado(ok){var e=document.getElementById('cpEstadoGuardado');if(e){e.textContent=ok?'✓ Guardado en QuintaDB':'⚠️ No se pudo guardar; inténtalo de nuevo';e.style.color=ok?'#059669':'#991B1B';}}
function cpBotonGuardar(){
  if(!_cpAct)return '';
  return '<div style="display:flex;gap:10px;align-items:center;"><span id="cpEstadoGuardado" style="font-size:.95rem;font-weight:600;color:'+(_cpSucio?'#92400E':'#059669')+'">'
    +(_cpSucio?'✏️ Cambios sin guardar':(_cpAct._qid?'✓ Guardado en QuintaDB':''))+'</span>'
    +'<button class="btn btn-p" onclick="cpGuardar(function(ok){tst(ok?\'✅ Guardado\':\'⚠️ No se pudo guardar\');})">💾 Guardar</button></div>';
}

function cpPaso(n){
  if(n>0&&!_cpAct){tst('Primero elige o crea un requerimiento');n=0;}
  if(_cpPaso!==n&&_cpSucio&&_cpAct){cpGuardar();}
  _cpPaso=n;
  document.querySelectorAll('#cpSteps .sbtn').forEach(function(b){
    var s=+b.getAttribute('data-cp');b.classList.toggle('active',s===n);b.classList.toggle('done',s<n&&!!_cpAct);
  });
  cpRender();window.scrollTo({top:0,behavior:'smooth'});
}
function cpNav(){
  var prev=_cpPaso>0?'<button class="btn btn-o" onclick="cpPaso('+(_cpPaso-1)+')">← '+CP_PASOS[_cpPaso-1]+'</button>':'<span></span>';
  var next=_cpPaso<CP_PASOS.length-1&&_cpAct?'<button class="btn btn-p" onclick="cpPaso('+(_cpPaso+1)+')">Continuar → '+CP_PASOS[_cpPaso+1]+' →</button>':'';
  return '<div class="cp-acts">'+prev+next+'</div>';
}
function cpRender(){
  var w=document.getElementById('modCompras');if(!w||!w.dataset.init)return;
  var f=[cpVistaReq,cpVistaPartidas,cpVistaBases,cpVistaOfertas,cpVistaEvaluacion,cpVistaResultado][_cpPaso];
  var tit=_cpAct?'<div class="cp-sub" style="font-size:1rem;margin:0 0 6px;">Requerimiento: <b>'+esc(_cpAct.nombre)+'</b></div>':'';
  w.innerHTML=(_cpPaso>0?cpNav():'')+'<p class="stitle">Paso '+(_cpPaso+1)+' — '+CP_PASOS[_cpPaso]+'</p>'+tit+f()+(_cpPaso>0?cpNav():'');
  cpUrp();
}

// ── Paso 1: Requerimiento ──
function cpVistaReq(){
  var h=cpNota('🛒','¿Qué necesitas comprar o contratar?',
    'Un <b>requerimiento</b> es una necesidad concreta para la que pides cotizaciones a varios proveedores. Ejemplo: <i>Tabiquería drywall y albañilería menor – La Molina 2026</i>. '
    +'Todos los proveedores cotizarán <b>las mismas partidas</b> (paso 2), y así sus precios se pueden comparar de verdad. '
    +'Al final, el proveedor ganador pasa a <b>Homologación</b> para evaluar su desempeño.');
  var lista;
  if(_cpCarga==='cargando'&&!_cpLista.length)lista='<div class="cp-pend">Cargando requerimientos desde QuintaDB…</div>';
  else if(_cpCarga==='error')lista='<div class="cp-pend">No se pudieron cargar los requerimientos.<br><button class="btn btn-o btn-sm" onclick="cpCargar()">Reintentar</button></div>';
  else lista=_cpLista.map(function(c,i){
    var k=getCategoria(c.categoria);
    return '<button type="button" class="cp-item'+(_cpAct===c?' on':'')+'" onclick="cpElegir('+i+')">'
      +'<div class="cp-item-nom">'+esc(c.nombre)+'</div>'
      +'<div class="cp-item-meta">'+(k?k.icono+' '+esc(k.nombre):'Sin categoría')+' · '+_pkPlural((c.partidas||[]).length,'partida','partidas')+' · '+_pkPlural((c.ofertas||[]).length,'postor','postores')+(c.estado==='adjudicado'?' · 🏆 adjudicado':'')+'</div></button>';
  }).join('')||'<div class="cp-pend">Todavía no tienes requerimientos.<br>Crea el primero con <b>+ Nuevo requerimiento</b>.</div>';
  h+='<div class="pk-layout"><aside><div class="cp-acts" style="margin-top:0;"><b style="font-size:1.05rem;">Tus requerimientos</b>'
    +'<button class="btn btn-p btn-sm" onclick="cpNuevo()">+ Nuevo requerimiento</button></div><div class="cp-list">'+lista+'</div></aside><section>'+cpFormReq()+'</section></div>';
  return h;
}
function cpFormReq(){
  var c=_cpAct;
  if(!c)return '<div class="cp-pend">Elige un requerimiento de la lista o crea uno nuevo.</div>';
  var opts='<option value="">— Elige la categoría —</option>'+_categorias.filter(function(k){return k.activa||k.id===c.categoria;}).map(function(k){
    return '<option value="'+esc(k.id)+'"'+(k.id===c.categoria?' selected':'')+'>'+k.icono+' '+esc(k.nombre)+'</option>';}).join('');
  var pt=cpNum(c.peso_tecnico)==null?70:cpNum(c.peso_tecnico);
  var vr=(c.tecnica&&c.tecnica.valor_referencial!=null)?c.tecnica.valor_referencial:'';
  return '<div class="cp-card"><div class="cp-h">Datos del requerimiento</div>'
    +'<label class="cp-lbl" for="cqNom">Nombre *</label><input class="cp-inp" id="cqNom" value="'+esc(c.nombre)+'" oninput="_cpAct.nombre=this.value;cpMarcar()">'
    +'<label class="cp-lbl" for="cqCat">Categoría *</label><select class="cp-inp" id="cqCat" onchange="_cpAct.categoria=this.value;cpMarcar()">'+opts+'</select>'
    +'<div class="cp-ayuda">'+(esAdmin()?'¿Falta una categoría o quieres cambiar sus etiquetas? <a href="#" onclick="irAdminCategorias();return false;" style="font-weight:700;">⚙️ Administrar categorías</a>':'¿No encuentras la categoría que necesitas? Pídesela al administrador del sistema.')+'</div>'
    +'<label class="cp-lbl" for="cqDes">Descripción de lo que se necesita</label><textarea class="cp-inp" id="cqDes" rows="3" oninput="_cpAct.descripcion=this.value;cpMarcar()">'+esc(c.descripcion)+'</textarea>'
    +'<label class="cp-lbl" for="cqObj">Objetivo o resultado clave relacionado</label><textarea class="cp-inp" id="cqObj" rows="2" placeholder="Ej.: Habilitar el baño del segundo piso antes de febrero" oninput="_cpAct.objetivo=this.value;cpMarcar()">'+esc(c.objetivo)+'</textarea>'
    +'<div class="cp-ayuda">Texto libre: para qué se hace esta compra.</div>'
    +'<div class="cp-grid2"><div><label class="cp-lbl" for="cqFs">Fecha de solicitud</label><input type="date" class="cp-inp" id="cqFs" value="'+esc(c.fecha_solicitud)+'" onchange="_cpAct.fecha_solicitud=this.value;cpMarcar()"></div>'
    +'<div><label class="cp-lbl" for="cqFt">Fecha tentativa de contratación</label><input type="date" class="cp-inp" id="cqFt" value="'+esc(c.fecha_tentativa)+'" onchange="_cpAct.fecha_tentativa=this.value;cpMarcar()"></div></div>'
    +'<label class="cp-lbl" for="cqVr">Valor referencial (S/, con IGV) — opcional</label>'
    +'<input class="cp-inp" id="cqVr" style="max-width:240px;" inputmode="decimal" value="'+esc(String(vr))+'" placeholder="Ej.: 3500" oninput="cpT().valor_referencial=cpNum(this.value);cpMarcar()">'
    +'<div class="cp-ayuda">Es el monto máximo que estás dispuesto a pagar. Las ofertas que lo superen quedan fuera, y sirve para calificar la facturación en el modelo CTB.</div>'
    +'<label class="cp-lbl" for="cqPt">Peso de la evaluación técnica (%)</label>'
    +'<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;"><input type="number" min="0" max="100" step="5" class="cp-inp" style="max-width:120px;" id="cqPt" value="'+pt+'" oninput="cpPesos(this.value)">'
    +'<span id="cqPesos" style="font-size:1rem;">Técnico <b>'+pt+' %</b> + Económico <b>'+(100-pt)+' %</b> = 100 %</span></div>'
    +'<div class="cp-ayuda">Puntaje final = puntaje técnico × peso técnico + puntaje económico × peso económico. Por defecto 70 / 30, como en los concursos de la Cooperación Técnica Belga: pesa más la calidad que el precio.</div>'
    +'<div class="cp-acts"><button class="pk-tool del" style="font-size:.95rem;" onclick="cpEliminar()">🗑 Eliminar requerimiento</button>'+cpBotonGuardar()+'</div></div>'
    +'<div class="cp-acts"><span></span><button class="btn btn-p" onclick="cpPaso(1)">Continuar → Partidas →</button></div>';
}
function cpPesos(v){
  var n=Math.max(0,Math.min(100,cpNum(v)==null?0:cpNum(v)));_cpAct.peso_tecnico=n;cpMarcar();
  var e=document.getElementById('cqPesos');if(e)e.innerHTML='Técnico <b>'+n+' %</b> + Económico <b>'+(100-n)+' %</b> = 100 %';
}
function cpElegir(i){
  _cpEtapa=0;
  if(_cpSucio&&_cpAct&&_cpAct!==_cpLista[i])cpGuardar();
  _cpAct=_cpLista[i];_cpSucio=false;cpRender();
}
function cpNuevo(){
  if(_cpSucio&&_cpAct)cpGuardar();
  _cpAct={id:cpUid('cp'),nombre:'Nuevo requerimiento',categoria:'',descripcion:'',objetivo:'',fecha_solicitud:cpHoy(),fecha_tentativa:'',
    peso_tecnico:70,partidas:[],ofertas:[],tecnica:{minimo:80},resultado:{},estado:'borrador',fecha_creacion:cpHoy()};
  _cpSucio=true;cpRender();
  setTimeout(function(){var n=document.getElementById('cqNom');if(n){n.focus();n.select();}},40);
}
function cpEliminar(){
  var c=_cpAct;if(!c)return;
  if(!confirm('¿Eliminar el requerimiento "'+c.nombre+'" con sus partidas y ofertas?\n\nNo se puede deshacer.'))return;
  _cpLista=_cpLista.filter(function(x){return x!==c;});_cpAct=null;_cpSucio=false;cpRender();
  if(c._qid)qdbFetch({accion:'eliminarCompra',qid:c._qid},function(res){tst(res&&res.ok?'✅ Requerimiento eliminado':'⚠️ No se pudo eliminar en QuintaDB');});
}

// ── Paso 2: Partidas ──
function cpVistaPartidas(){
  var c=_cpAct,k=getCategoria(c.categoria);
  var h=cpNota('📋','Las partidas: lo que todos van a cotizar',
    'Escribe cada trabajo o producto <b>una sola vez</b>, con su unidad y cantidad (metrado). Luego cada proveedor pone su precio a <b>estas mismas partidas</b>. '
    +'Así se evita comparar presupuestos que cotizan cosas distintas. Ejemplo: <i>1. Muro de drywall con plancha RH en baño · m² · 12</i>.');
  var chips=k&&k.etiquetas.length?'<div class="cp-ayuda" style="margin-bottom:6px;">Atajos de la categoría '+k.icono+' '+esc(k.nombre)+' (agregan una partida con ese nombre):</div>'
    +k.etiquetas.map(function(e){return '<button type="button" class="cp-chip" onclick="cpAddPartida(\''+esc(e).replace(/'/g,"\\'")+'\')">+ '+esc(e)+'</button>';}).join(''):'';
  var filas=(c.partidas||[]).map(function(p,i){
    return '<tr><td style="width:56px;font-weight:700;">'+(i+1)+'</td>'
      +'<td><input value="'+esc(p.descripcion)+'" placeholder="Descripción de la partida" oninput="_cpAct.partidas['+i+'].descripcion=this.value;cpMarcar()"></td>'
      +'<td style="width:120px;"><input value="'+esc(p.unidad||'')+'" placeholder="m², und, glb" oninput="_cpAct.partidas['+i+'].unidad=this.value;cpMarcar()"></td>'
      +'<td style="width:120px;"><input class="n" inputmode="decimal" value="'+(p.cantidad==null?'':p.cantidad)+'" oninput="_cpAct.partidas['+i+'].cantidad=cpNum(this.value);cpMarcar()"></td>'
      +'<td style="width:110px;white-space:nowrap;"><button class="pk-tool" title="Subir" onclick="cpMoverPartida('+i+',-1)">▲</button> '
      +'<button class="pk-tool" title="Bajar" onclick="cpMoverPartida('+i+',1)">▼</button> '
      +'<button class="pk-tool del" title="Quitar" onclick="cpQuitarPartida('+i+')">🗑</button></td></tr>';
  }).join('');
  h+='<div class="cp-card"><div class="cp-scroll"><table class="cp-tabla"><thead><tr><th>Ítem</th><th>Descripción</th><th>Unidad</th><th class="num">Cantidad</th><th></th></tr></thead><tbody>'
    +(filas||'<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:18px;">Aún no hay partidas.</td></tr>')+'</tbody></table></div>'
    +'<div class="cp-acts"><button class="btn btn-o" onclick="cpAddPartida(\'\')">+ Agregar partida</button>'+cpBotonGuardar()+'</div>'+chips+'</div>';
  return h;
}
function cpAddPartida(txt){_cpAct.partidas.push({id:cpUid('pt'),descripcion:txt||'',unidad:txt?'glb':'',cantidad:txt?1:null});cpMarcar();cpRender();
  setTimeout(function(){var ins=document.querySelectorAll('.cp-tabla tbody tr:last-child input');if(ins[0]&&!txt)ins[0].focus();},30);}
function cpQuitarPartida(i){
  var p=_cpAct.partidas[i];
  var conPrecio=(_cpAct.ofertas||[]).some(function(o){return o.precios&&o.precios[p.id]&&o.precios[p.id].pu!=null;});
  if(conPrecio&&!confirm('Esta partida ya tiene precios en las ofertas. ¿Quitarla?'))return;
  _cpAct.partidas.splice(i,1);cpMarcar();cpRender();
}
function cpMoverPartida(i,d){var a=_cpAct.partidas,j=i+d;if(j<0||j>=a.length)return;var t=a[i];a[i]=a[j];a[j]=t;cpMarcar();cpRender();}

// ── Paso 3: Ofertas ──
function cpVistaOfertas(){
  var c=_cpAct;
  var h=cpNota('📨','Una oferta por proveedor',
    'Agrega a cada <b>postor</b> que presentó propuesta (desde el <b>directorio</b>) y registra su oferta económica: copia su <b>precio unitario</b> en cada partida. Si no cotizó una partida, marca <b>No cotiza</b>. '
    +'Completa también las condiciones: si el precio incluye <b>IGV</b>, el plazo, la garantía, el adelanto y lo que <b>no incluye</b>. '
    +'Se recomienda tener <b>al menos 3 ofertas</b>. Los precios solo se comparan entre quienes pasen la evaluación técnica (paso 5), como cuando el sobre económico se abre al final.');
  if(!(c.partidas||[]).length){
    return h+'<div class="cp-pend">Primero registra las partidas en el paso 2.<br><button class="btn btn-p btn-sm" style="margin-top:10px;" onclick="cpPaso(1)">Ir a Partidas</button></div>';
  }
  h+=(c.ofertas||[]).map(function(o,oi){return cpOfertaHtml(o,oi);}).join('');
  h+='<div class="cp-acts"><button class="btn-add-crit" style="max-width:420px;margin:0;" onclick="cpAddOferta()">＋ Agregar oferta de un proveedor</button>'+cpBotonGuardar()+'</div>';
  return h;
}
function cpOfertaTotal(o,conIgv){
  var t=0,n=0;
  (_cpAct.partidas||[]).forEach(function(p){var pr=o.precios&&o.precios[p.id];if(pr&&!pr.nc&&pr.pu!=null){t+=pr.pu*(cpNum(p.cantidad)||0);n++;}});
  if(conIgv&&o.igv==='no_incluye')t=t*(1+CP_IGV);
  return {total:t,n:n};
}
function cpOfertaHtml(o,oi){
  var d=_dir.find(function(x){return x.id===o.dirId;})||{estado:o.estado||'normal'};
  var filas=_cpAct.partidas.map(function(p,pi){
    var pr=(o.precios||{})[p.id]||{};
    var sub=(!pr.nc&&pr.pu!=null)?pr.pu*(cpNum(p.cantidad)||0):null;
    return '<tr><td style="font-weight:700;">'+(pi+1)+'</td><td>'+esc(p.descripcion||'(sin descripción)')+'<div class="cp-ayuda">'+esc(p.unidad||'')+' · '+(p.cantidad==null?'—':p.cantidad)+'</div></td>'
      +'<td style="width:150px;"><input class="n" inputmode="decimal" '+(pr.nc?'disabled':'')+' value="'+(pr.pu==null?'':pr.pu)+'" placeholder="0.00" oninput="cpPrecio('+oi+',\''+p.id+'\',this.value)"></td>'
      +'<td class="num" style="width:140px;" id="cpSub_'+oi+'_'+pi+'">'+(pr.nc?'<i>No cotiza</i>':cpSoles(sub))+'</td>'
      +'<td style="width:110px;"><label style="display:flex;gap:6px;align-items:center;font-size:.92rem;"><input type="checkbox" style="width:18px;height:18px;"'+(pr.nc?' checked':'')+' onchange="cpNoCotiza('+oi+',\''+p.id+'\',this.checked)">No cotiza</label></td></tr>';
  }).join('');
  var tot=cpOfertaTotal(o,false);
  var sel=function(v,t){return '<option value="'+v+'"'+(o.igv===v?' selected':'')+'>'+t+'</option>';};
  var inp=function(k,lbl,ph,tipo){return '<div><label class="cp-lbl">'+lbl+'</label><input class="cp-inp" '+(tipo==='n'?'inputmode="decimal"':'')+' value="'+esc(o[k]==null?'':String(o[k]))+'" placeholder="'+(ph||'')+'" oninput="_cpAct.ofertas['+oi+'].'+k+'='+(tipo==='n'?'cpNum(this.value)':'this.value')+';cpMarcar()"></div>';};
  return '<div class="cp-oferta"><div class="cp-oferta-h"><div><div class="cp-h" style="margin:0;">'+(oi+1)+'. '+esc(o.razon_social)+' '+cpBadge(d.estado)+'</div>'
    +'<div class="cp-item-meta">RUC: '+(esc(o.ruc)||'sin RUC')+'</div></div>'
    +'<button class="pk-tool del" style="font-size:.95rem;" onclick="cpQuitarOferta('+oi+')">🗑 Quitar oferta</button></div>'
    +((d.estado==='lista_negra'||d.estado==='vetado')?'<div class="cp-aviso" style="margin:10px 16px 0;">⚠️ Este proveedor está en <b>'+CP_ESTADOS[d.estado]+'</b> por sus evaluaciones en Homologación.</div>':'')
    +'<div class="cp-oferta-b"><div class="cp-scroll"><table class="cp-tabla"><thead><tr><th>Ítem</th><th>Partida</th><th class="num">Precio unitario (S/)</th><th class="num">Subtotal</th><th></th></tr></thead><tbody>'+filas
    +'<tr class="tot"><td colspan="3">Total ofertado ('+(o.igv==='no_incluye'?'sin IGV':o.igv==='exonerado'?'exonerado de IGV':'con IGV')+')</td><td class="num" id="cpTot_'+oi+'">'+cpSoles(tot.total)+'</td><td></td></tr></tbody></table></div>'
    +'<div class="cp-grid3"><div><label class="cp-lbl">¿El precio incluye IGV?</label><select class="cp-inp" onchange="_cpAct.ofertas['+oi+'].igv=this.value;cpMarcar();cpRender()">'
    +sel('incluye','Sí, incluye IGV')+sel('no_incluye','No, se suma el 18 %')+sel('exonerado','Exonerado / no emite factura')+'</select></div>'
    +inp('plazo_dias','Plazo de ejecución (días)','Ej.: 30','n')+inp('garantia_meses','Garantía (meses)','Ej.: 6 (0 si no ofrece)','n')
    +inp('adelanto_pct','Adelanto pedido (%)','Ej.: 20','n')+inp('validez_dias','Validez de la oferta (días)','Ej.: 15','n')+inp('forma_pago','Forma de pago','Ej.: 20 % adelanto, saldo al terminar')+'</div>'
    +'<label class="cp-lbl">¿Qué NO incluye? (exclusiones)</label><textarea class="cp-inp" rows="2" placeholder="Ej.: acabados, conexiones eléctricas, eliminación de desmonte" oninput="_cpAct.ofertas['+oi+'].exclusiones=this.value;cpMarcar()">'+esc(o.exclusiones||'')+'</textarea>'
    +'<div class="cp-grid2"><div><label class="cp-lbl">Enlace al PDF de la cotización</label><input class="cp-inp" value="'+esc(o.archivo_url||'')+'" placeholder="https://drive.google.com/…" oninput="_cpAct.ofertas['+oi+'].archivo_url=this.value;cpMarcar()"></div>'
    +'<div><label class="cp-lbl">Fecha de la cotización</label><input type="date" class="cp-inp" value="'+esc(o.fecha||'')+'" onchange="_cpAct.ofertas['+oi+'].fecha=this.value;cpMarcar()"></div></div>'
    +'<label class="cp-lbl">Observación</label><input class="cp-inp" value="'+esc(o.observacion||'')+'" oninput="_cpAct.ofertas['+oi+'].observacion=this.value;cpMarcar()"></div></div>';
}
function cpPrecio(oi,pid,v){
  var o=_cpAct.ofertas[oi];o.precios=o.precios||{};var pr=o.precios[pid]=o.precios[pid]||{};
  pr.pu=cpNum(v);pr.nc=false;cpMarcar();
  var pi=_cpAct.partidas.findIndex(function(p){return p.id===pid;});var p=_cpAct.partidas[pi];
  var e=document.getElementById('cpSub_'+oi+'_'+pi);if(e)e.textContent=cpSoles(pr.pu==null?null:pr.pu*(cpNum(p.cantidad)||0));
  var t=document.getElementById('cpTot_'+oi);if(t)t.textContent=cpSoles(cpOfertaTotal(o,false).total);
}
function cpNoCotiza(oi,pid,v){var o=_cpAct.ofertas[oi];o.precios=o.precios||{};var pr=o.precios[pid]=o.precios[pid]||{};pr.nc=v;if(v)pr.pu=null;cpMarcar();cpRender();}
function cpQuitarOferta(oi){if(!confirm('¿Quitar la oferta de '+_cpAct.ofertas[oi].razon_social+'?'))return;_cpAct.ofertas.splice(oi,1);cpMarcar();cpRender();}
function cpAddOferta(){
  var ya=(_cpAct.ofertas||[]).map(function(o){return _dirClave(o);});
  dirElegir('¿Qué proveedor presentó la oferta?',function(d){
    var k=getCategoria(_cpAct.categoria);
    _cpAct.ofertas.push({id:cpUid('of'),dirId:d.id,ruc:d.ruc,razon_social:d.razon_social,igv:'incluye',precios:{},
      plazo_dias:null,garantia_meses:null,adelanto_pct:null,validez_dias:null,forma_pago:'',exclusiones:'',archivo_url:'',fecha:cpHoy(),observacion:''});
    if(k&&d.categorias.indexOf(k.id)<0){d.categorias.push(k.id);dirGuardar(d);}
    cpMarcar();cpRender();tst('✅ Oferta de '+d.razon_social+' agregada');
  },{excluir:ya,origen:'compras'});
}

// ══════════════════════════════════════
// BASES Y EVALUACIÓN (modelo de concurso por etapas: habilitación → técnica → económica)
// ══════════════════════════════════════
function cpT(){
  var c=_cpAct;if(!c.tecnica||typeof c.tecnica!=='object'||Array.isArray(c.tecnica))c.tecnica={};
  var t=c.tecnica;t.requisitos=t.requisitos||[];t.factores=t.factores||[];t.eval=t.eval||{};
  if(t.minimo==null)t.minimo=80;
  return t;
}
function cpEv(oid){var t=cpT();var e=t.eval[oid]=t.eval[oid]||{};e.hab=e.hab||{};e.tec=e.tec||{};return e;}
function cpVR(){return cpNum(cpT().valor_referencial);}
function cpPtsFactor(f,e){
  if(!e)return null;
  var mx=cpNum(f.max)||0;
  if(f.tipo==='tramos'){
    var v=cpNum(e.valor);if(v==null)return null;
    if(f.relVR){var vr=cpVR();if(!vr)return null;v=v/vr;}
    var tr=(f.tramos||[]).filter(function(x){return cpNum(x.desde)!=null;}).sort(function(a,b){return cpNum(b.desde)-cpNum(a.desde);});
    for(var i=0;i<tr.length;i++)if(v>=cpNum(tr[i].desde))return Math.min(mx,cpNum(tr[i].pts)||0);
    return 0;
  }
  if(f.tipo==='niveles'){
    if(e.nivel==null||e.nivel==='')return null;var n=(f.niveles||[])[+e.nivel];
    return n?Math.min(mx,cpNum(n.pts)||0):null;
  }
  var p=cpNum(e.pts);return p==null?null:Math.max(0,Math.min(mx,p));
}
function cpHabEstado(o){
  var t=cpT(),e=cpEv(o.id);if(!t.requisitos.length)return 'si';
  var vals=t.requisitos.map(function(r){return e.hab[r.id]||'';});
  if(vals.indexOf('no')>-1)return 'no';
  return vals.every(function(v){return v==='si';})?'si':'pend';
}
function cpTecTotal(o){
  var t=cpT(),e=cpEv(o.id),tot=0,faltan=0;
  t.factores.forEach(function(f){var p=cpPtsFactor(f,e.tec[f.id]);if(p==null)faltan++;else tot+=p;});
  tot=Math.round(tot*100)/100;
  var min=cpNum(t.minimo)||0;
  return {total:tot,faltan:faltan,pasa:t.factores.length>0&&faltan===0&&tot>=min,completo:faltan===0&&t.factores.length>0};
}
function cpSumaMax(){return Math.round(cpT().factores.reduce(function(s,f){return s+(cpNum(f.max)||0);},0)*100)/100;}

// ── Plantillas de bases ──
function cpPlantillaCTB(){
  var tr=function(arr){return arr.map(function(x){return {desde:x[0],pts:x[1]};});};
  var nv=function(arr){return arr.map(function(x){return {txt:x[0],pts:x[1]};});};
  return {
    requisitos:[
      {id:cpUid('rq'),nombre:'Empresa constituida (copia de la escritura de constitución)',evidencia:'Copia simple de la escritura pública'},
      {id:cpUid('rq'),nombre:'RUC activo y habido',evidencia:'Consulta RUC en SUNAT'},
      {id:cpUid('rq'),nombre:'No impedido de contratar con el Estado',evidencia:'Declaración jurada firmada por el representante legal'},
      {id:cpUid('rq'),nombre:'Declaración jurada con la información del postor',evidencia:'Razón social, representante, RUC, domicilio, contacto'},
      {id:cpUid('rq'),nombre:'Ausencia de incompatibilidades (sin parentesco con la entidad)',evidencia:'Declaración jurada'},
      {id:cpUid('rq'),nombre:'CV del líder y del equipo en el formato pedido',evidencia:'Formato de resumen de CV'},
      {id:cpUid('rq'),nombre:'Cumple los requisitos técnicos mínimos de los términos de referencia',evidencia:'Revisión de la propuesta técnica'}
    ],
    factores:[
      {id:cpUid('fc'),grupo:'Experiencia de la empresa',nombre:'Antigüedad en el mercado',max:5,tipo:'tramos',unidad:'años',tramos:tr([[8,5],[5,3],[0,1]]),ayuda:'Según la escritura de constitución.'},
      {id:cpUid('fc'),grupo:'Experiencia de la empresa',nombre:'Trabajos similares realizados',max:15,tipo:'tramos',unidad:'trabajos',tramos:tr([[10,15],[6,10],[0,5]]),ayuda:'Certificados, constancias o contratos (máximo 10).'},
      {id:cpUid('fc'),grupo:'Experiencia de la empresa',nombre:'Facturación en servicios similares (últimos 8 años)',max:27,tipo:'tramos',unidad:'S/ facturados',relVR:true,tramos:tr([[2,27],[1.5,15],[1,10],[0.5,5],[0,0]]),ayuda:'Se compara con el valor referencial: 2 veces o más = 27 pts; 1.5 = 15; 1 = 10; 0.5 = 5; menos = 0.'},
      {id:cpUid('fc'),grupo:'Líder del equipo (13 pts)',nombre:'Grado académico',max:3,tipo:'niveles',niveles:nv([['Doctorado',3],['Maestría',2],['Diplomado o curso de posgrado',1],['Sin posgrado',0]])},
      {id:cpUid('fc'),grupo:'Líder del equipo (13 pts)',nombre:'Experiencia general',max:5,tipo:'tramos',unidad:'años',tramos:tr([[15,5],[10,4],[0,2]])},
      {id:cpUid('fc'),grupo:'Líder del equipo (13 pts)',nombre:'Experiencia específica en el tema',max:5,tipo:'tramos',unidad:'años',tramos:tr([[10,5],[6,4],[0,1]])},
      {id:cpUid('fc'),grupo:'Equipo de apoyo (10 pts)',nombre:'Consultor 1: grado académico',max:2,tipo:'niveles',niveles:nv([['Doctorado',2],['Maestría',1],['Diplomado o sin posgrado',0]])},
      {id:cpUid('fc'),grupo:'Equipo de apoyo (10 pts)',nombre:'Consultor 1: experiencia específica',max:3,tipo:'tramos',unidad:'años',tramos:tr([[5,3],[3,2],[0,0]])},
      {id:cpUid('fc'),grupo:'Equipo de apoyo (10 pts)',nombre:'Consultor 2: grado académico',max:2,tipo:'niveles',niveles:nv([['Doctorado',2],['Maestría',1],['Diplomado o sin posgrado',0]])},
      {id:cpUid('fc'),grupo:'Equipo de apoyo (10 pts)',nombre:'Consultor 2: experiencia específica',max:3,tipo:'tramos',unidad:'años',tramos:tr([[5,3],[3,2],[0,0]])},
      {id:cpUid('fc'),grupo:'Propuesta técnica',nombre:'Metodología de trabajo',max:30,tipo:'niveles',niveles:nv([
        ['Cumple los 4 elementos: selección, metodología y contenidos, herramientas y productos adicionales',30],
        ['Cumple los 3 primeros elementos',27],['Cumple solo el elemento 1 o el 2',21],['No evidencia ninguno',0]]),ayuda:'Se revisa la propuesta técnica escrita.'}
    ],
    minimo:80,peso_tecnico:70
  };
}
function cpPlantillaObras(){
  var tr=function(arr){return arr.map(function(x){return {desde:x[0],pts:x[1]};});};
  var nv=function(arr){return arr.map(function(x){return {txt:x[0],pts:x[1]};});};
  return {
    requisitos:[
      {id:cpUid('rq'),nombre:'RUC activo y habido (o RUS vigente)',evidencia:'Consulta RUC en SUNAT'},
      {id:cpUid('rq'),nombre:'Cotización por escrito con el detalle de partidas',evidencia:'PDF o documento firmado'},
      {id:cpUid('rq'),nombre:'Visitó el lugar o conoce el alcance del trabajo',evidencia:'Fecha de la visita'},
      {id:cpUid('rq'),nombre:'No está en Lista negra ni Vetado',evidencia:'Estado en el directorio de proveedores'}
    ],
    factores:[
      {id:cpUid('fc'),grupo:'Experiencia',nombre:'Trabajos similares comprobados',max:30,tipo:'tramos',unidad:'trabajos',tramos:tr([[5,30],[3,20],[1,10],[0,0]]),ayuda:'Fotos, contratos o referencias de obras parecidas.'},
      {id:cpUid('fc'),grupo:'Experiencia',nombre:'Referencias de clientes anteriores',max:15,tipo:'niveles',niveles:nv([['Buenas referencias verificadas (llamada o visita)',15],['Referencias sin verificar',8],['Sin referencias',0]])},
      {id:cpUid('fc'),grupo:'Propuesta técnica',nombre:'Garantía de los trabajos',max:20,tipo:'tramos',unidad:'meses',tramos:tr([[12,20],[6,15],[3,10],[1,5],[0,0]])},
      {id:cpUid('fc'),grupo:'Propuesta técnica',nombre:'Plazo de ejecución',max:20,tipo:'niveles',niveles:nv([['Igual o menor al plazo requerido',20],['Hasta 20 % más que el plazo requerido',10],['Más de 20 % por encima',0]])},
      {id:cpUid('fc'),grupo:'Propuesta técnica',nombre:'Calidad de materiales especificada',max:15,tipo:'niveles',niveles:nv([['Especifica marcas y calidades superiores a lo pedido',15],['Especifica las calidades pedidas',10],['No especifica materiales',0]])}
    ],
    minimo:80,peso_tecnico:70
  };
}
function cpPlantillaCategoria(){
  var k=getCategoria(_cpAct.categoria);
  return {requisitos:[{id:cpUid('rq'),nombre:'RUC activo y habido',evidencia:'Consulta RUC en SUNAT'}],
    factores:(k?k.criterios:[]).map(function(c){return {id:cpUid('fc'),grupo:'',nombre:c.label,max:c.weight,tipo:'directo'};}),
    minimo:80,peso_tecnico:cpNum(_cpAct.peso_tecnico)||70};
}
function cpAplicarPlantilla(cual){
  var t=cpT();
  if((t.requisitos.length||t.factores.length)&&!confirm('Esto reemplaza los requisitos y criterios que ya tienes (y las calificaciones hechas con ellos).\n\n¿Continuar?'))return;
  var p=cual==='ctb'?cpPlantillaCTB():cual==='obras'?cpPlantillaObras():cpPlantillaCategoria();
  if(cual==='cat'&&!p.factores.length){tst('La categoría del requerimiento no tiene criterios sugeridos');return;}
  t.requisitos=p.requisitos;t.factores=p.factores;t.minimo=p.minimo;t.eval={};
  _cpAct.peso_tecnico=p.peso_tecnico;
  cpMarcar();cpRender();tst('✅ Bases cargadas: '+_pkPlural(p.requisitos.length,'requisito','requisitos')+' y '+_pkPlural(p.factores.length,'criterio','criterios'));
}

// ── Paso 3: Bases (requisitos habilitadores y criterios técnicos) ──
function cpVistaBases(){
  var t=cpT(),pt=cpNum(_cpAct.peso_tecnico)==null?70:cpNum(_cpAct.peso_tecnico);
  var h=cpNota('📜','Las bases: cómo se va a elegir',
    'La evaluación tiene <b>tres filtros en orden</b>, como en los concursos formales:<br>'
    +'<b>1) Requisitos habilitadores:</b> se cumplen o no. Si falta uno, el postor queda fuera y no se evalúa.<br>'
    +'<b>2) Evaluación técnica (sobre 100 puntos):</b> solo para los habilitados. Quien no llega al <b>puntaje mínimo</b> queda fuera.<br>'
    +'<b>3) Evaluación económica:</b> solo para quienes pasaron la técnica. El más barato obtiene 100.<br>'
    +'<b>Puntaje final</b> = técnico × '+pt+' % + económico × '+(100-pt)+' %. Si hay empate, gana el de mayor puntaje técnico.');
  h+='<div class="cp-card"><div class="cp-h">Empezar desde un modelo</div><div class="cp-sub">Carga un modelo y luego ajústalo. Reemplaza lo que tengas.</div>'
    +'<button class="cp-chip" onclick="cpAplicarPlantilla(\'ctb\')">📑 Consultoría y servicios especializados (modelo CTB)</button>'
    +'<button class="cp-chip" onclick="cpAplicarPlantilla(\'obras\')">🏗️ Obras y servicios menores</button>'
    +'<button class="cp-chip" onclick="cpAplicarPlantilla(\'cat\')">🗂️ Desde los criterios de la categoría</button></div>';
  // Requisitos
  h+='<div class="cp-card"><div class="cp-h">1. Requisitos habilitadores</div><div class="cp-sub">Se cumplen o no; no dan puntos. Escribe también con qué documento se comprueba.</div>'
    +'<div class="cp-scroll"><table class="cp-tabla"><thead><tr><th style="width:50px;">N°</th><th>Requisito</th><th>Cómo se comprueba</th><th style="width:60px;"></th></tr></thead><tbody>'
    +(t.requisitos.map(function(r,i){
      return '<tr><td style="font-weight:700;">'+(i+1)+'</td><td><input value="'+esc(r.nombre)+'" oninput="cpT().requisitos['+i+'].nombre=this.value;cpMarcar()"></td>'
        +'<td><input value="'+esc(r.evidencia||'')+'" placeholder="Ej.: declaración jurada" oninput="cpT().requisitos['+i+'].evidencia=this.value;cpMarcar()"></td>'
        +'<td><button class="pk-tool del" onclick="cpQuitarReq('+i+')">🗑</button></td></tr>';
    }).join('')||'<tr><td colspan="4" style="text-align:center;color:var(--muted);padding:14px;">Sin requisitos: todos los postores quedan habilitados.</td></tr>')
    +'</tbody></table></div><div class="cp-acts"><button class="btn btn-o" onclick="cpT().requisitos.push({id:cpUid(\'rq\'),nombre:\'\',evidencia:\'\'});cpMarcar();cpRender()">+ Agregar requisito</button></div></div>';
  // Factores
  var suma=cpSumaMax();
  h+='<div class="cp-card"><div class="cp-h">2. Criterios de la evaluación técnica</div>'
    +'<div class="cp-sub">Cada criterio tiene un puntaje máximo; entre todos deben sumar <b>100</b>. Hay tres formas de calificar:<br>'
    +'• <b>Por tramos:</b> escribes un número (años, trabajos, meses) y la tabla da los puntos. Ej.: 8 años o más = 5 pts.<br>'
    +'• <b>Por niveles:</b> eliges la descripción que corresponde. Ej.: Maestría = 2 pts.<br>'
    +'• <b>Puntaje directo:</b> el evaluador pone los puntos, de 0 al máximo.</div>'
    +t.factores.map(function(f,i){return cpFactorHtml(f,i);}).join('')
    +'<div class="cp-acts"><button class="btn btn-o" onclick="cpAddFactor()">+ Agregar criterio</button>'
    +'<span style="font-size:1.05rem;font-weight:700;color:'+(suma===100?'#059669':'#991B1B')+'">Suma de puntajes máximos: '+suma+(suma===100?' ✓':' — debe ser 100')+'</span></div></div>';
  // Mínimo
  h+='<div class="cp-card"><div class="cp-h">3. Puntaje técnico mínimo</div>'
    +'<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;"><input type="number" class="cp-inp" style="max-width:120px;" min="0" max="100" value="'+(cpNum(t.minimo)==null?80:t.minimo)+'" oninput="cpT().minimo=cpNum(this.value);cpMarcar()">'
    +'<span style="font-size:1rem;">puntos de 100. Quien obtenga menos <b>no pasa</b> a la evaluación económica.</span></div></div>';
  h+='<div class="cp-acts"><span></span>'+cpBotonGuardar()+'</div>';
  return h;
}
function cpFactorHtml(f,i){
  var base='cpT().factores['+i+']';
  var sel=function(v,txt){return '<option value="'+v+'"'+((f.tipo||'directo')===v?' selected':'')+'>'+txt+'</option>';};
  var h='<div class="cp-oferta"><div class="cp-oferta-h"><b style="font-size:1.05rem;">Criterio '+(i+1)+'</b>'
    +'<div style="display:flex;gap:6px;"><button class="pk-tool" onclick="cpMoverFactor('+i+',-1)">▲</button><button class="pk-tool" onclick="cpMoverFactor('+i+',1)">▼</button>'
    +'<button class="pk-tool del" onclick="cpQuitarFactor('+i+')">🗑 Quitar</button></div></div><div class="cp-oferta-b">'
    +'<div class="cp-grid3"><div><label class="cp-lbl">Grupo (opcional)</label><input class="cp-inp" value="'+esc(f.grupo||'')+'" placeholder="Ej.: Líder del equipo" oninput="'+base+'.grupo=this.value;cpMarcar()"></div>'
    +'<div><label class="cp-lbl">Criterio *</label><input class="cp-inp" value="'+esc(f.nombre||'')+'" oninput="'+base+'.nombre=this.value;cpMarcar()"></div>'
    +'<div><label class="cp-lbl">Puntaje máximo</label><input class="cp-inp" type="number" min="0" max="100" value="'+(f.max==null?'':f.max)+'" onchange="'+base+'.max=cpNum(this.value);cpMarcar();cpRender()"></div></div>'
    +'<label class="cp-lbl">¿Cómo se califica?</label><select class="cp-inp" style="max-width:360px;" onchange="cpTipoFactor('+i+',this.value)">'
    +sel('tramos','Por tramos (se escribe un número)')+sel('niveles','Por niveles (se elige una descripción)')+sel('directo','Puntaje directo')+'</select>';
  if(f.tipo==='tramos'){
    h+='<div class="cp-grid2"><div><label class="cp-lbl">¿Qué se cuenta? (unidad)</label><input class="cp-inp" value="'+esc(f.unidad||'')+'" placeholder="años, trabajos, meses" oninput="'+base+'.unidad=this.value;cpMarcar()"></div>'
      +'<div><label class="cp-lbl">&nbsp;</label><label style="display:flex;gap:8px;align-items:center;font-size:1rem;"><input type="checkbox" style="width:20px;height:20px;"'+(f.relVR?' checked':'')+' onchange="'+base+'.relVR=this.checked;cpMarcar();cpRender()">El número se divide entre el valor referencial (veces el VR)</label></div></div>'
      +'<table class="cp-tabla" style="margin-top:8px;max-width:520px;"><thead><tr><th>Desde ('+(f.relVR?'veces el VR':esc(f.unidad||'valor'))+' o más)</th><th class="num">Puntos</th><th></th></tr></thead><tbody>'
      +(f.tramos||[]).map(function(x,j){return '<tr><td><input class="n" value="'+(x.desde==null?'':x.desde)+'" oninput="'+base+'.tramos['+j+'].desde=cpNum(this.value);cpMarcar()"></td>'
        +'<td><input class="n" value="'+(x.pts==null?'':x.pts)+'" oninput="'+base+'.tramos['+j+'].pts=cpNum(this.value);cpMarcar()"></td>'
        +'<td><button class="pk-tool del" onclick="'+base+'.tramos.splice('+j+',1);cpMarcar();cpRender()">🗑</button></td></tr>';}).join('')
      +'</tbody></table><button class="cp-chip" style="margin-top:6px;" onclick="('+base+'.tramos=('+base+'.tramos||[])).push({desde:null,pts:null});cpMarcar();cpRender()">+ Agregar tramo</button>'
      +'<div class="cp-ayuda">Se otorgan los puntos del tramo más alto que se alcance. Ej.: con 6 años y tramos 8→5, 5→3, 0→1, obtiene 3.</div>';
  } else if(f.tipo==='niveles'){
    h+='<table class="cp-tabla" style="margin-top:8px;"><thead><tr><th>Nivel (descripción)</th><th class="num" style="width:120px;">Puntos</th><th style="width:60px;"></th></tr></thead><tbody>'
      +(f.niveles||[]).map(function(x,j){return '<tr><td><input value="'+esc(x.txt||'')+'" oninput="'+base+'.niveles['+j+'].txt=this.value;cpMarcar()"></td>'
        +'<td><input class="n" value="'+(x.pts==null?'':x.pts)+'" oninput="'+base+'.niveles['+j+'].pts=cpNum(this.value);cpMarcar()"></td>'
        +'<td><button class="pk-tool del" onclick="'+base+'.niveles.splice('+j+',1);cpMarcar();cpRender()">🗑</button></td></tr>';}).join('')
      +'</tbody></table><button class="cp-chip" style="margin-top:6px;" onclick="('+base+'.niveles=('+base+'.niveles||[])).push({txt:\'\',pts:null});cpMarcar();cpRender()">+ Agregar nivel</button>';
  } else {
    h+='<div class="cp-ayuda">El evaluador escribe los puntos, de 0 a '+(f.max==null?'el máximo':f.max)+'.</div>';
  }
  h+='<label class="cp-lbl">Cómo se verifica (opcional)</label><input class="cp-inp" value="'+esc(f.ayuda||'')+'" placeholder="Ej.: constancias o contratos" oninput="'+base+'.ayuda=this.value;cpMarcar()">';
  return h+'</div></div>';
}
function cpAddFactor(){cpT().factores.push({id:cpUid('fc'),grupo:'',nombre:'',max:null,tipo:'niveles',niveles:[{txt:'',pts:null}]});cpMarcar();cpRender();}
function cpTipoFactor(i,v){var f=cpT().factores[i];f.tipo=v;if(v==='tramos'&&!f.tramos)f.tramos=[{desde:null,pts:null}];if(v==='niveles'&&!f.niveles)f.niveles=[{txt:'',pts:null}];cpMarcar();cpRender();}
function cpQuitarFactor(i){if(!confirm('¿Quitar este criterio? Se pierden las calificaciones hechas con él.'))return;cpT().factores.splice(i,1);cpMarcar();cpRender();}
function cpMoverFactor(i,d){var a=cpT().factores,j=i+d;if(j<0||j>=a.length)return;var x=a[i];a[i]=a[j];a[j]=x;cpMarcar();cpRender();}
function cpQuitarReq(i){cpT().requisitos.splice(i,1);cpMarcar();cpRender();}

// ── Paso 5: Evaluación por etapas ──
var _cpEtapa=0;
function cpEtapa(n){_cpEtapa=n;cpRender();}
function cpVistaEvaluacion(){
  var c=_cpAct,ofs=c.ofertas||[],t=cpT();
  if(!ofs.length)return cpNota('⚖️','Evaluación','Primero registra a los postores y sus ofertas en el paso 4.')
    +'<div class="cp-pend"><button class="btn btn-p btn-sm" onclick="cpPaso(3)">Ir a Postores y ofertas</button></div>';
  if(!t.factores.length&&_cpEtapa>0)_cpEtapa=0;
  var hab=ofs.filter(function(o){return cpHabEstado(o)==='si';});
  var tecOk=hab.filter(function(o){return cpTecTotal(o).pasa;});
  var tab=function(n,txt,cnt){return '<button class="tab-btn'+(_cpEtapa===n?' on':'')+'" onclick="cpEtapa('+n+')">'+txt+'<span class="tab-sub">'+cnt+'</span></button>';};
  var h='<div class="tab-bar">'
    +tab(0,'1. Requisitos habilitadores',hab.length+' de '+_pkPlural(ofs.length,'postor habilitado','postores habilitados'))
    +tab(1,'2. Evaluación técnica',tecOk.length+' de '+hab.length+' llegan al mínimo')
    +tab(2,'3. Evaluación económica',_pkPlural(tecOk.length,'postor evaluado','postores evaluados'))+'</div>';
  h+=[cpEtapaHab,cpEtapaTec,cpEtapaEco][_cpEtapa]();
  return h;
}
function cpThPostores(ofs){return ofs.map(function(o){var d=_dir.find(function(x){return x.id===o.dirId;});var e=d?d.estado:'normal';
  return '<th class="num" style="min-width:160px;text-align:center;">'+esc(o.razon_social)+(e!=='normal'?'<br>'+cpBadge(e):'')+'</th>';}).join('');}
function cpEtapaHab(){
  var c=_cpAct,ofs=c.ofertas,t=cpT();
  var h=cpNota('✅','Etapa 1: requisitos habilitadores',
    'Marca para cada postor si <b>cumple</b> o <b>no cumple</b> cada requisito. Basta un "No cumple" para que quede <b>no habilitado</b>: no pasa a la evaluación técnica. '
    +'Si un requisito aún no se revisa, déjalo en "Por revisar".');
  if(!t.requisitos.length)return h+'<div class="cp-pend">No definiste requisitos habilitadores: todos los postores quedan habilitados.<br><button class="btn btn-o btn-sm" style="margin-top:8px;" onclick="cpPaso(2)">Definirlos en Bases</button></div>';
  var filas=t.requisitos.map(function(r,ri){
    return '<tr><td style="font-weight:700;">'+(ri+1)+'</td><td>'+esc(r.nombre)+(r.evidencia?'<div class="cp-ayuda">'+esc(r.evidencia)+'</div>':'')+'</td>'
      +ofs.map(function(o){var v=cpEv(o.id).hab[r.id]||'';
        return '<td style="text-align:center;"><select class="cp-inp" style="padding:6px;font-size:.95rem;background:'+(v==='si'?'#DCFCE7':v==='no'?'#FEE2E2':'white')+'" onchange="cpEv(\''+o.id+'\').hab[\''+r.id+'\']=this.value;cpMarcar();cpRender()">'
          +'<option value=""'+(v===''?' selected':'')+'>Por revisar</option><option value="si"'+(v==='si'?' selected':'')+'>✓ Cumple</option><option value="no"'+(v==='no'?' selected':'')+'>✗ No cumple</option></select></td>';}).join('')+'</tr>';
  }).join('');
  var res=ofs.map(function(o){var e=cpHabEstado(o);return '<td style="text-align:center;font-weight:700;font-size:1rem;color:'+(e==='si'?'#059669':e==='no'?'#991B1B':'#92400E')+'">'
    +(e==='si'?'✓ Habilitado':e==='no'?'✗ No habilitado':'⏳ Pendiente')+'</td>';}).join('');
  h+='<div class="cp-scroll"><table class="cp-tabla"><thead><tr><th>N°</th><th>Requisito</th>'+cpThPostores(ofs)+'</tr></thead><tbody>'+filas
    +'<tr class="tot"><td colspan="2">Resultado</td>'+res+'</tr></tbody></table></div>';
  h+='<div class="cp-acts"><span></span><div style="display:flex;gap:10px;flex-wrap:wrap;">'+cpBotonGuardar()+'<button class="btn btn-p" onclick="cpEtapa(1)">Siguiente: evaluación técnica →</button></div></div>';
  return h;
}
function cpEtapaTec(){
  var c=_cpAct,t=cpT(),min=cpNum(t.minimo)||0;
  var hab=c.ofertas.filter(function(o){return cpHabEstado(o)==='si';});
  var h=cpNota('📐','Etapa 2: evaluación técnica (sobre 100 puntos)',
    'Solo se evalúa a los postores <b>habilitados</b>. En cada criterio escribe el dato o elige el nivel; el sistema calcula los puntos según las bases (paso 3). '
    +'<b>Puntaje técnico</b> = suma de los puntos de todos los criterios. Quien obtenga menos de <b>'+min+'</b> puntos queda fuera y <b>no pasa</b> a la evaluación económica.');
  if(!t.factores.length)return h+'<div class="cp-pend">Aún no hay criterios técnicos.<br><button class="btn btn-o btn-sm" style="margin-top:8px;" onclick="cpPaso(2)">Definirlos en Bases</button></div>';
  if(!hab.length)return h+'<div class="cp-pend">Ningún postor está habilitado todavía. Completa la etapa 1.</div>';
  var grupoAnt=null;
  var filas=t.factores.map(function(f,fi){
    var g='';
    if((f.grupo||'')!==grupoAnt){grupoAnt=f.grupo||'';if(grupoAnt)g='<tr><td colspan="'+(3+hab.length)+'" style="background:var(--surface);font-weight:700;">'+esc(grupoAnt)+'</td></tr>';}
    return g+'<tr><td>'+esc(f.nombre)+(f.ayuda?'<div class="cp-ayuda">'+esc(f.ayuda)+'</div>':'')+'</td><td class="num" style="font-weight:700;">'+(f.max==null?'—':f.max)+'</td>'
      +hab.map(function(o){
        var oi=c.ofertas.indexOf(o),e=cpEv(o.id).tec[f.id]||{},p=cpPtsFactor(f,e),inp;
        var on='cpTecSet(\''+o.id+'\',\''+f.id+'\',';
        if(f.tipo==='tramos')inp='<input class="n" inputmode="decimal" value="'+(e.valor==null?'':e.valor)+'" placeholder="'+(f.relVR?'S/':esc(f.unidad||'valor'))+'" oninput="'+on+'\'valor\',this.value)">';
        else if(f.tipo==='niveles')inp='<select class="cp-inp" style="padding:6px;font-size:.92rem;" onchange="'+on+'\'nivel\',this.value)"><option value="">— Elige —</option>'
          +(f.niveles||[]).map(function(n,j){return '<option value="'+j+'"'+(String(e.nivel)===String(j)?' selected':'')+'>'+esc(n.txt)+' ('+n.pts+')</option>';}).join('')+'</select>';
        else inp='<input class="n" inputmode="decimal" value="'+(e.pts==null?'':e.pts)+'" placeholder="0–'+f.max+'" oninput="'+on+'\'pts\',this.value)">';
        return '<td>'+inp+'<div class="cp-ayuda" style="text-align:right;" id="tp_'+oi+'_'+fi+'">'+(p==null?'—':'<b>'+p+' pts</b>')+'</div></td>';
      }).join('')+'</tr>';
  }).join('');
  var tot=hab.map(function(o){return '<td class="num" id="tt_'+c.ofertas.indexOf(o)+'"></td>';}).join('');
  var est=hab.map(function(o){return '<td style="text-align:center;font-weight:700;" id="ts_'+c.ofertas.indexOf(o)+'"></td>';}).join('');
  h+='<div class="cp-scroll"><table class="cp-tabla"><thead><tr><th>Criterio</th><th class="num">Máx.</th>'+cpThPostores(hab)+'</tr></thead><tbody>'+filas
    +'<tr class="tot"><td>Puntaje técnico</td><td class="num">'+cpSumaMax()+'</td>'+tot+'</tr>'
    +'<tr><td colspan="2"><b>¿Pasa a la evaluación económica?</b> (mínimo '+min+')</td>'+est+'</tr></tbody></table></div>';
  h+='<div class="cp-acts"><button class="btn btn-o" onclick="cpEtapa(0)">← Requisitos</button><div style="display:flex;gap:10px;flex-wrap:wrap;">'+cpBotonGuardar()+'<button class="btn btn-p" onclick="cpEtapa(2)">Siguiente: evaluación económica →</button></div></div>';
  setTimeout(cpRefrescarTec,0);
  return h;
}
function cpTecSet(oid,fid,k,v){
  var e=cpEv(oid),x=e.tec[fid]=e.tec[fid]||{};x[k]=(k==='nivel')?v:(v===''?null:v);cpMarcar();cpRefrescarTec();
}
function cpRefrescarTec(){
  var c=_cpAct;if(!c)return;var t=cpT(),min=cpNum(t.minimo)||0;
  c.ofertas.forEach(function(o,oi){
    var e=cpEv(o.id);
    t.factores.forEach(function(f,fi){var el=document.getElementById('tp_'+oi+'_'+fi);if(el){var p=cpPtsFactor(f,e.tec[f.id]);el.innerHTML=p==null?'—':'<b>'+p+' pts</b>';}});
    var r=cpTecTotal(o),tt=document.getElementById('tt_'+oi),ts=document.getElementById('ts_'+oi);
    if(tt)tt.innerHTML='<b style="font-size:1.15rem;">'+r.total+'</b>'+(r.faltan?'<div class="cp-ayuda">faltan '+r.faltan+'</div>':'');
    if(ts){ts.innerHTML=!r.completo?'⏳ Falta calificar':(r.pasa?'✓ Sí pasa':'✗ No pasa ('+r.total+' < '+min+')');ts.style.color=!r.completo?'#92400E':(r.pasa?'#059669':'#991B1B');}
  });
}
function cpAptosEco(){
  var vr=cpVR();
  return (_cpAct.ofertas||[]).filter(function(o){return cpHabEstado(o)==='si'&&cpTecTotal(o).pasa;});
}
function cpEtapaEco(){
  var c=_cpAct,aptos=cpAptosEco(),vr=cpVR();
  var h=cpNota('💰','Etapa 3: evaluación económica',
    'Solo entran los postores que <b>pasaron la evaluación técnica</b> (como abrir el sobre económico únicamente a ellos).<br>'
    +'Todos los montos se comparan <b>con IGV</b>; si alguien cotizó sin IGV, se le suma el 18 %. '
    +'<span class="cp-badge" style="background:#DCFCE7;color:#065F46;">verde</span> precio más bajo de la partida; '
    +'<span class="cp-badge" style="background:#FEF3C7;color:#92400E;">amarillo</span> partida que no cotizó, completada con el <b>promedio</b> de los demás.<br>'
    +'<b>Puntaje económico</b> = (total comparable más bajo ÷ total comparable del postor) × 100.'
    +(vr?' Las ofertas que superan el <b>valor referencial</b> ('+cpSoles(vr)+') quedan fuera.':''));
  if(!aptos.length)return h+'<div class="cp-pend">Ningún postor ha pasado todavía la evaluación técnica.</div>';
  var r=cpCalcEconomico(c,aptos);
  var filas=c.partidas.map(function(p,pi){
    return '<tr><td style="font-weight:700;">'+(pi+1)+'</td><td>'+esc(p.descripcion)+'<div class="cp-ayuda">'+esc(p.unidad||'')+' · '+(p.cantidad==null?'—':p.cantidad)+'</div></td>'
      +r.celdas[pi].map(function(x){
        var cls=x.tipo==='min'?'cel-min':x.tipo==='imp'?'cel-imp':x.tipo==='nadie'?'cel-nadie':'';
        return '<td class="num '+cls+'">'+(x.tipo==='nadie'?'nadie cotizó':cpSoles(x.v)+(x.tipo==='imp'?'<br><small>promedio</small>':''))+'</td>';
      }).join('')+'</tr>';
  }).join('');
  var fila=function(lbl,fn,cls){return '<tr class="'+(cls||'')+'"><td colspan="2">'+lbl+'</td>'+aptos.map(function(o,i){return '<td class="num">'+fn(o,r.tot[i],i)+'</td>';}).join('')+'</tr>';};
  var nd=function(v,suf){return v==null||v===''?'<span style="color:#991B1B;">no indica</span>':v+(suf||'');};
  h+='<div class="cp-scroll"><table class="cp-tabla"><thead><tr><th>Ítem</th><th>Partida</th>'+cpThPostores(aptos)+'</tr></thead><tbody>'+filas
    +fila('Total ofertado (lo que sí cotizó, con IGV)',function(o,t){return cpSoles(t.ofertado);},'tot')
    +fila('Partidas completadas con el promedio',function(o,t){return t.imputadas?'<b style="color:#92400E;">'+t.imputadas+'</b>':'0';})
    +fila('<b>Total comparable</b>',function(o,t){return '<b>'+cpSoles(t.comparable)+'</b>'+(t.excede?'<div style="color:#991B1B;font-weight:700;">Supera el valor referencial: queda fuera</div>':'');},'tot')
    +fila('<b>Puntaje económico (0–100)</b>',function(o,t){return t.excede?'—':'<b style="font-size:1.1rem;">'+t.puntaje.toFixed(2)+'</b>';},'tot')
    +'<tr><td colspan="'+(2+aptos.length)+'" style="background:var(--surface);font-weight:700;">Condiciones declaradas</td></tr>'
    +fila('IGV en la cotización',function(o){return o.igv==='no_incluye'?'No incluía (+18 %)':o.igv==='exonerado'?'Exonerado':'Incluía';})
    +fila('Plazo de ejecución',function(o){return nd(o.plazo_dias,' días');})
    +fila('Garantía',function(o){return nd(o.garantia_meses,' meses');})
    +fila('Adelanto',function(o){return nd(o.adelanto_pct,' %');})
    +fila('No incluye',function(o){return o.exclusiones?'<div style="text-align:left;white-space:normal;max-width:240px;">'+esc(o.exclusiones)+'</div>':'—';})
    +'</tbody></table></div>';
  h+='<div class="cp-acts"><button class="btn btn-o" onclick="cpEtapa(1)">← Evaluación técnica</button><div style="display:flex;gap:10px;flex-wrap:wrap;">'+cpBotonGuardar()
    +'<button class="btn btn-p" onclick="cpPaso(5)">Ver resultado final →</button></div></div>';
  return h;
}

// Cuadro económico (sobre un grupo de ofertas)
function cpCalcEconomico(c,ofs){
  ofs=ofs||c.ofertas||[];var parts=c.partidas||[],vr=cpVR();
  var factor=function(o){return o.igv==='no_incluye'?1+CP_IGV:1;};
  var celdas=parts.map(function(p){
    var cant=cpNum(p.cantidad)||0;
    var vals=ofs.map(function(o){var pr=(o.precios||{})[p.id];return (pr&&!pr.nc&&pr.pu!=null)?pr.pu*cant*factor(o):null;});
    var cot=vals.filter(function(v){return v!=null;});
    var prom=cot.length?cot.reduce(function(a,b){return a+b;},0)/cot.length:null;
    var min=cot.length?Math.min.apply(null,cot):null;
    return ofs.map(function(o,i){
      if(vals[i]!=null)return {v:vals[i],tipo:(vals[i]===min&&cot.length>1)?'min':'ok'};
      return prom!=null?{v:prom,tipo:'imp'}:{v:0,tipo:'nadie'};
    });
  });
  var tot=ofs.map(function(o,i){
    var t={ofertado:0,comparable:0,imputadas:0};
    celdas.forEach(function(f){var x=f[i];if(x.tipo==='imp')t.imputadas++;else if(x.tipo!=='nadie')t.ofertado+=x.v;t.comparable+=x.v;});
    t.excede=!!(vr&&t.comparable>vr+0.005);
    return t;
  });
  var validos=tot.filter(function(t){return !t.excede&&t.comparable>0;}).map(function(t){return t.comparable;});
  var pmin=validos.length?Math.min.apply(null,validos):null;
  tot.forEach(function(t){t.puntaje=(!t.excede&&pmin&&t.comparable>0)?pmin/t.comparable*100:0;});
  return {celdas:celdas,tot:tot,pmin:pmin};
}

// ── Paso 6: Resultado ──
function cpResultado(){
  var c=_cpAct,t=cpT(),pt=(cpNum(c.peso_tecnico)==null?70:cpNum(c.peso_tecnico))/100,pe=1-pt;
  var aptos=cpAptosEco(),eco=cpCalcEconomico(c,aptos);
  var filas=c.ofertas.map(function(o){
    var hab=cpHabEstado(o),tec=cpTecTotal(o),ai=aptos.indexOf(o),et=ai>-1?eco.tot[ai]:null;
    var etapa,fin=null;
    if(hab==='no')etapa='No habilitado';else if(hab==='pend')etapa='Habilitación pendiente';
    else if(!tec.completo)etapa='Evaluación técnica pendiente';else if(!tec.pasa)etapa='No alcanzó el mínimo técnico';
    else if(et&&et.excede)etapa='Supera el valor referencial';
    else{etapa='Evaluado';fin=Math.round((tec.total*pt+et.puntaje*pe)*100)/100;}
    return {o:o,hab:hab,tec:tec,eco:et,etapa:etapa,fin:fin};
  });
  var ev=filas.filter(function(f){return f.fin!=null;}).sort(function(a,b){return b.fin-a.fin||b.tec.total-a.tec.total;});
  ev.forEach(function(f,i){f.puesto=i+1;});
  return {filas:filas,evaluados:ev,pt:pt,pe:pe};
}
function cpVistaResultado(){
  var c=_cpAct,R=cpResultado(),res=c.resultado||{};
  var h=cpNota('🏆','Resultado final',
    '<b>Puntaje final</b> = puntaje técnico × '+Math.round(R.pt*100)+' % + puntaje económico × '+Math.round(R.pe*100)+' %. '
    +'Solo reciben puntaje final los postores que pasaron las tres etapas. Si dos empatan, gana el de <b>mayor puntaje técnico</b>.<br>'
    +'Ejemplo: técnico 90 y económico 80 → 90 × '+R.pt.toFixed(2)+' + 80 × '+R.pe.toFixed(2)+' = '+(90*R.pt+80*R.pe).toFixed(2)+'.');
  if(!c.ofertas.length)return h+'<div class="cp-pend">Aún no hay postores.</div>';
  var orden=R.evaluados.concat(R.filas.filter(function(f){return f.fin==null;}));
  h+='<div class="cp-scroll"><table class="cp-tabla"><thead><tr><th>Orden</th><th>Postor</th><th>Habilitación</th><th class="num">Técnico (0–100)</th><th class="num">Económico (0–100)</th><th class="num">Puntaje final</th><th>Situación</th></tr></thead><tbody>'
    +orden.map(function(f){
      var gan=res.ganador===f.o.id;
      return '<tr'+(gan?' style="background:#ECFDF5;"':'')+'><td>'+(f.puesto?'<span class="cp-rank">'+f.puesto+'</span>':'—')+'</td>'
        +'<td><b>'+esc(f.o.razon_social)+'</b>'+(gan?' <span class="cp-badge b-normal">🏆 Buena pro</span>':'')+'<div class="cp-ayuda">RUC '+(esc(f.o.ruc)||'—')+'</div></td>'
        +'<td>'+(f.hab==='si'?'✓ Habilitado':f.hab==='no'?'<span style="color:#991B1B;">✗ No habilitado</span>':'⏳ Pendiente')+'</td>'
        +'<td class="num">'+(f.hab==='si'&&f.tec.completo?f.tec.total.toFixed(2):'—')+'</td>'
        +'<td class="num">'+(f.eco&&!f.eco.excede?f.eco.puntaje.toFixed(2):'—')+'</td>'
        +'<td class="num" style="font-size:1.1rem;font-weight:700;">'+(f.fin==null?'—':f.fin.toFixed(2))+'</td>'
        +'<td style="color:'+(f.fin!=null?'#059669':'#991B1B')+';font-weight:600;">'+f.etapa+'</td></tr>';
    }).join('')+'</tbody></table></div>';
  var primero=R.evaluados[0];
  if(primero){
    var empate=R.evaluados[1]&&R.evaluados[1].fin===primero.fin;
    h+='<div class="cp-card" style="border-color:#10B981;"><div class="cp-h">'+(res.ganador?'Buena pro otorgada':'Propuesta de buena pro')+'</div>'
      +'<div style="font-size:1.05rem;">Mayor puntaje final: <b>'+esc(primero.o.razon_social)+'</b> con <b>'+primero.fin.toFixed(2)+'</b> puntos'
      +(empate?' (empate en puntaje final; se desempata por mayor puntaje técnico)':'')+'.</div>'
      +(res.ganador?'<div class="cp-ayuda">Otorgada el '+esc(res.fecha||'')+'. Para cambiarla, vuelve a otorgarla.</div>':'')
      +'<label class="cp-lbl">Observaciones del comité o evaluador</label><textarea class="cp-inp" rows="2" oninput="(_cpAct.resultado=_cpAct.resultado||{}).obs=this.value;cpMarcar()">'+esc(res.obs||'')+'</textarea>'
      +'<div class="cp-acts"><button class="btn btn-o" onclick="cpExcelActa()">⬇ Descargar cuadro final en Excel</button>'
      +'<button class="btn btn-p" onclick="cpOtorgar(\''+primero.o.id+'\')">🏆 Otorgar la buena pro a '+esc(primero.o.razon_social)+'</button></div></div>';
  } else {
    h+='<div class="cp-pend">Todavía ningún postor ha completado las tres etapas.</div>';
  }
  return h;
}
function cpOtorgar(oid){
  var o=_cpAct.ofertas.find(function(x){return x.id===oid;});if(!o)return;
  if(!confirm('¿Otorgar la buena pro a '+o.razon_social+'?'))return;
  _cpAct.resultado=_cpAct.resultado||{};_cpAct.resultado.ganador=oid;_cpAct.resultado.fecha=cpHoy();_cpAct.estado='adjudicado';
  cpMarcar();cpGuardar(function(ok){tst(ok?'✅ Buena pro otorgada y guardada':'⚠️ No se pudo guardar');cpRender();});
}
function cpExcelActa(){
  if(typeof XLSX==='undefined'){tst('⚠️ La herramienta de Excel aún no cargó; inténtalo en unos segundos');return;}
  var c=_cpAct,t=cpT(),R=cpResultado(),wb=XLSX.utils.book_new(),ofs=c.ofertas;
  var hab=[['Etapa 1 — Requisitos habilitadores: '+c.nombre],[],['N°','Requisito'].concat(ofs.map(function(o){return o.razon_social;}))];
  t.requisitos.forEach(function(r,i){hab.push([i+1,r.nombre].concat(ofs.map(function(o){var v=cpEv(o.id).hab[r.id];return v==='si'?'Cumple':v==='no'?'No cumple':'Por revisar';})));});
  hab.push(['','Resultado'].concat(ofs.map(function(o){var e=cpHabEstado(o);return e==='si'?'Habilitado':e==='no'?'No habilitado':'Pendiente';})));
  XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(hab),'1 Habilitación');
  var habs=ofs.filter(function(o){return cpHabEstado(o)==='si';});
  var tec=[['Etapa 2 — Evaluación técnica (mínimo '+t.minimo+' de 100)'],[],['Grupo','Criterio','Máximo'].concat(habs.map(function(o){return o.razon_social;}))];
  t.factores.forEach(function(f){tec.push([f.grupo||'',f.nombre,f.max].concat(habs.map(function(o){var p=cpPtsFactor(f,cpEv(o.id).tec[f.id]);return p==null?'':p;})));});
  tec.push(['','Puntaje técnico',cpSumaMax()].concat(habs.map(function(o){return cpTecTotal(o).total;})));
  tec.push(['','¿Pasa a económica?',''].concat(habs.map(function(o){return cpTecTotal(o).pasa?'Sí':'No';})));
  XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(tec),'2 Técnica');
  var aptos=cpAptosEco(),r=cpCalcEconomico(c,aptos);
  var eco=[['Etapa 3 — Evaluación económica (con IGV; * = partida completada con el promedio)'],[],['Ítem','Partida','Unidad','Cantidad'].concat(aptos.map(function(o){return o.razon_social;}))];
  c.partidas.forEach(function(p,pi){eco.push([pi+1,p.descripcion,p.unidad||'',p.cantidad].concat(r.celdas[pi].map(function(x){return x.tipo==='nadie'?'nadie cotizó':(Math.round(x.v*100)/100)+(x.tipo==='imp'?' *':'');})));});
  eco.push(['','Total comparable','',''].concat(r.tot.map(function(x){return Math.round(x.comparable*100)/100;})));
  eco.push(['','Puntaje económico = total más bajo ÷ total del postor × 100','',''].concat(r.tot.map(function(x){return x.excede?'Supera VR':Math.round(x.puntaje*100)/100;})));
  XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(eco),'3 Económica');
  var fin=[['Cuadro final — '+c.nombre],['Puntaje final = técnico × '+Math.round(R.pt*100)+' % + económico × '+Math.round(R.pe*100)+' %. Empate: gana el de mayor puntaje técnico.'],[],
    ['Orden','Postor','RUC','Técnico','Económico','Puntaje final','Situación']];
  R.evaluados.concat(R.filas.filter(function(f){return f.fin==null;})).forEach(function(f){
    fin.push([f.puesto||'',f.o.razon_social,f.o.ruc||'',f.tec.completo&&f.hab==='si'?f.tec.total:'',f.eco&&!f.eco.excede?Math.round(f.eco.puntaje*100)/100:'',f.fin==null?'':f.fin,f.etapa]);});
  if(c.resultado&&c.resultado.ganador){var g=c.ofertas.find(function(o){return o.id===c.resultado.ganador;});fin.push([],['Buena pro otorgada a: '+(g?g.razon_social:'')+' — '+(c.resultado.fecha||'')]);}
  if(c.resultado&&c.resultado.obs)fin.push(['Observaciones: '+c.resultado.obs]);
  XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(fin),'Cuadro final');
  XLSX.writeFile(wb,'Evaluacion_'+c.nombre.replace(/[^\wáéíóúñÁÉÍÓÚÑ]+/g,'_').slice(0,40)+'.xlsx');
}

// Al cargar: restaurar el módulo que se usó la última vez
document.addEventListener('DOMContentLoaded',function(){});
(function(){
  // Al ingresar siempre se muestra el inicio neutral; desde ahí se puede continuar donde se quedó
  window._gpModuloInicial='inicio';
})();
// Si la sesión ya estaba abierta cuando cargó este archivo, aplicar el módulo guardado
if(typeof _usuarioActual!=='undefined'&&_usuarioActual){setTimeout(function(){cambiarModulo(window._gpModuloInicial||'inicio');},0);}
