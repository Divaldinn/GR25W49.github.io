// ==========================================
// CONFIGURACIÓN
// ==========================================
const BACKEND_URL = "https://gr25w49-github-io.onrender.com/enviar-ppt";

// ==========================================
// 1. DICCIONARIO DE IDIOMAS
// ==========================================
const translations = {
    es: {
        title: "Reporte de Servicio", clientLabel: "Cliente / Empresa", clientHelp: "* Presiona la Lupa o Enter para buscar en HD.",
        manualWebLabel: "No encontrado. ¿Subir manual?", location: "Locación", preparedBy: "Técnico", revisedBy: "Supervisor",
        date: "Fecha", ticket: "Ticket", visitDetails: "Visita", visitNo: "# Visita", startTime: "Entrada", endTime: "Salida",
        layoutLabel: "Layout", uploadLayout: "Subir Layout", serviceDev: "Desarrollo", problemDesc: "Problema",
        photosBefore: "Fotos Antes", selectPhotos: "Seleccionar", photosAfter: "Fotos Después", solutionDesc: "Solución",
        closing: "Cierre", diagnosis: "Diagnóstico", finalNotes: "Notas", generateBtn: "Generar Reporte",
        // PPT
        ppt_title: "REPORTE DE SERVICIO", ppt_loc: "Locación:", ppt_client: "Cliente:", ppt_tech: "Técnico:", 
        ppt_sup: "Supervisor:", ppt_date: "Fecha:", ppt_ticket: "Ticket:", ppt_start: "Entrada:", ppt_end: "Salida:",
        ppt_layout: "LAYOUT", ppt_prob_title: "PROBLEMA", ppt_evid_before: "ANTES", ppt_sol_title: "SOLUCIÓN", 
        ppt_work_done: "Trabajo:", ppt_photos: "Fotos:", ppt_close_title: "CIERRE"
    },
    en: {
        title: "Service Report", clientLabel: "Client / Company", clientHelp: "* Press Magnifier or Enter to search HD.",
        manualWebLabel: "Not found. Upload manual?", location: "Location", preparedBy: "Technician", revisedBy: "Supervisor",
        date: "Date", ticket: "Ticket", visitDetails: "Visit", visitNo: "Visit #", startTime: "In", endTime: "Out",
        layoutLabel: "Layout", uploadLayout: "Upload Layout", serviceDev: "Development", problemDesc: "Problem",
        photosBefore: "Photos Before", selectPhotos: "Select", photosAfter: "Photos After", solutionDesc: "Solution",
        closing: "Closing", diagnosis: "Diagnosis", finalNotes: "Notes", generateBtn: "Generate Report",
        // PPT
        ppt_title: "SERVICE REPORT", ppt_loc: "Location:", ppt_client: "Client:", ppt_tech: "Technician:", 
        ppt_sup: "Supervisor:", ppt_date: "Date:", ppt_ticket: "Ticket:", ppt_start: "Start:", ppt_end: "End:",
        ppt_layout: "LAYOUT", ppt_prob_title: "PROBLEM", ppt_evid_before: "BEFORE", ppt_sol_title: "SOLUTION", 
        ppt_work_done: "Work:", ppt_photos: "Photos:", ppt_close_title: "CLOSING"
    },
    pt: {
        title: "Relatório de Serviço", clientLabel: "Cliente / Empresa", clientHelp: "* Pressione Lupa ou Enter para buscar HD.",
        manualWebLabel: "Não encontrado. Upload?", location: "Localização", preparedBy: "Técnico", revisedBy: "Supervisor",
        date: "Data", ticket: "Ticket", visitDetails: "Visita", visitNo: "Nº Visita", startTime: "Entrada", endTime: "Saída",
        layoutLabel: "Layout", uploadLayout: "Carregar Layout", serviceDev: "Desenvolvimento", problemDesc: "Problema",
        photosBefore: "Fotos Antes", selectPhotos: "Selecionar", photosAfter: "Fotos Depois", solutionDesc: "Solução",
        closing: "Fechamento", diagnosis: "Diagnóstico", finalNotes: "Notas", generateBtn: "Gerar Relatório",
        // PPT
        ppt_title: "RELATÓRIO DE SERVIÇO", ppt_loc: "Localização:", ppt_client: "Cliente:", ppt_tech: "Técnico:", 
        ppt_sup: "Supervisor:", ppt_date: "Data:", ppt_ticket: "Ticket:", ppt_start: "Entrada:", ppt_end: "Saída:",
        ppt_layout: "LAYOUT", ppt_prob_title: "PROBLEMA", ppt_evid_before: "ANTES", ppt_sol_title: "SOLUÇÃO", 
        ppt_work_done: "Trabalho:", ppt_photos: "Fotos:", ppt_close_title: "ENCERRAMENTO"
    }
};

const staffDirectory = {
    "Saul Ramirez": "saul.ramirez@convergint.com",
    "Gustavo Aburto": "gustavo.aburto@convergint.com",
    "Italia Silva": "Italia.Silva@convergint.com",
    "Juan Torres": "juan.torres@convergint.com"
};

// ==========================================
// 2. FUNCIONES PRINCIPALES (Login)
// ==========================================
function checkLogin() {
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    if (email.endsWith('@convergint.com')) {
        document.getElementById('loginOverlay').style.display = 'none';
        document.getElementById('mainApp').style.display = 'block';
        const sel = document.getElementById('nombreSelect');
        const manEmail = document.getElementById('emailManual');
        let found = false;
        for (const [name, mail] of Object.entries(staffDirectory)) {
            if (mail.toLowerCase() === email) { sel.value = name; sel.dispatchEvent(new Event('change')); found = true; break; }
        }
        if(!found) { sel.value = 'Otro'; sel.dispatchEvent(new Event('change')); if(manEmail) manEmail.value = email; }
    } else {
        const err = document.getElementById('loginError');
        if(err) err.style.display = 'block';
    }
}

// ==========================================
// 3. INICIALIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Login
    const loginInput = document.getElementById('loginEmail');
    if(loginInput) loginInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') checkLogin(); });
    
    // Previews
    safeSetupPreview('imgLayout', null);
    safeSetupPreview('fotosAntes', 'previewAntes');
    safeSetupPreview('fotosDespues', 'previewDespues');
    
    // Idioma
    const langSelect = document.getElementById('langSelect');
    if(langSelect) langSelect.addEventListener('change', (e) => changeLanguage(e.target.value));

    // --- SISTEMA DE LOGOS ---
    const btnBuscar = document.getElementById('btnBuscarLogo');
    const inputCliente = document.getElementById('cliente');
    const inputLogoManual = document.getElementById('inputLogoManual');
    const btnReset = document.getElementById('btnResetLogo');

    if (inputCliente) {
        inputCliente.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); buscarLogoPremium(); }
        });
    }
    if (btnBuscar) btnBuscar.addEventListener('click', buscarLogoPremium);

    // Carga Manual (Guarda en Memoria)
    if(inputLogoManual) {
        inputLogoManual.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const base64 = e.target.result;
                    mostrarLogoEnPantalla(base64);
                    // Guardar para el futuro
                    const name = inputCliente.value.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
                    if(name) localStorage.setItem('logo_hd_' + name, base64);
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
    }

    if(btnReset) btnReset.addEventListener('click', resetearLogoUI);

    // Técnico Manual
    const selectTecnico = document.getElementById('nombreSelect');
    const divManual = document.getElementById('manualTechnicianInput');
    if(selectTecnico && divManual) {
        selectTecnico.addEventListener('change', function() {
            if (this.value === 'Otro') {
                divManual.style.display = 'block';
                document.getElementById('nombreManual').required = true;
                document.getElementById('emailManual').required = true;
            } else {
                divManual.style.display = 'none';
                document.getElementById('nombreManual').required = false;
                document.getElementById('emailManual').required = false;
            }
        });
    }

    // Submit
    const form = document.getElementById('serviceForm');
    if (form) form.addEventListener('submit', async (e) => { e.preventDefault(); await generatePowerPoint(); });
});

function changeLanguage(lang) {
    const texts = translations[lang];
    if(!texts) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (texts[key]) el.innerText = texts[key];
    });
}

// ==========================================
// 4. ALGORITMO DE BÚSQUEDA DE LOGOS
// ==========================================
async function buscarLogoPremium() {
    const input = document.getElementById('cliente');
    const query = input.value.trim();
    if (query.length < 2) return;

    resetearLogoUI();
    const spinner = document.getElementById('logoSpinner');
    const placeholder = document.getElementById('logoPlaceholder');
    spinner.style.display = 'block';
    placeholder.style.display = 'none';
    document.getElementById('manualUploadArea').style.display = 'none';

    // 1. MEMORIA: ¿Ya lo buscamos o subimos antes?
    const cleanKey = query.toLowerCase().replace(/[^a-z0-9]/g, '');
    const memoria = localStorage.getItem('logo_hd_' + cleanKey);
    if (memoria) {
        mostrarLogoEnPantalla(memoria);
        return;
    }

    // 2. INTERNET: Apple -> Clearbit
    try {
        // Apple iTunes
        try {
            const appleUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=software&limit=1`;
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(appleUrl)}`;
            const response = await fetch(proxyUrl);
            const data = await response.json();
            const json = JSON.parse(data.contents);
            if (json.resultCount > 0 && json.results[0].artworkUrl512) {
                await validarYMostrarImagen(json.results[0].artworkUrl512, cleanKey);
                return;
            }
        } catch (e) {}

        // Clearbit
        try {
            const clearbitUrl = `https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(query)}`;
            const resp = await fetch(clearbitUrl);
            const data = await resp.json();
            if (data && data.length > 0 && data[0].logo) {
                await validarYMostrarImagen(data[0].logo, cleanKey);
                return;
            }
        } catch (e) {}

        // Google (Intenta varios dominios)
        const domains = [
            query.toLowerCase().replace(/\s+/g, '') + ".com",
            query.toLowerCase().replace(/\s+/g, '-') + ".com",
            query.toLowerCase().replace(/\s+/g, '') + ".com.mx"
        ];
        await intentarGoogleSecuencial(domains, 0, cleanKey);

    } catch (error) {
        buscarEnCarpetaLocal(cleanKey); // Si falla internet, busca en carpeta
    }
}

function intentarGoogleSecuencial(domains, index, cleanKey) {
    if (index >= domains.length) {
        buscarEnCarpetaLocal(cleanKey); // Falló Google, vamos a la carpeta
        return;
    }
    const domain = domains[index];
    const url = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function() { mostrarLogoEnPantalla(url); }; // Google casi siempre devuelve imagen (aunque sea un mundo)
    img.onerror = function() { intentarGoogleSecuencial(domains, index + 1, cleanKey); };
    img.src = url;
}

// 3. CARPETA LOCAL (Fallback)
function buscarEnCarpetaLocal(cleanKey) {
    // Intenta cargar desde la carpeta 'logos/'
    const localPath = `logos/${cleanKey}.png`; 
    const img = new Image();
    img.onload = function() {
        mostrarLogoEnPantalla(localPath);
    };
    img.onerror = function() {
        // Falló todo: Mostrar opción manual
        mostrarErrorLogo();
    };
    img.src = localPath;
}

function validarYMostrarImagen(url, saveKey) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            mostrarLogoEnPantalla(url);
            localStorage.setItem('logo_hd_' + saveKey, url);
            resolve();
        };
        img.onerror = () => { reject(); };
        img.src = url;
    });
}

function mostrarLogoEnPantalla(src) {
    const img = document.getElementById('logoVisual');
    const spinner = document.getElementById('logoSpinner');
    const placeholder = document.getElementById('logoPlaceholder');
    const resetBtn = document.getElementById('btnResetLogo');
    const manualBox = document.getElementById('manualUploadArea');

    if(spinner) spinner.style.display = 'none';
    if(placeholder) placeholder.style.display = 'none';
    if(manualBox) manualBox.style.display = 'none';
    
    if(img) {
        img.src = src;
        img.style.display = 'block';
    }
    if(resetBtn) resetBtn.style.display = 'block';
}

function mostrarErrorLogo() {
    const spinner = document.getElementById('logoSpinner');
    const placeholder = document.getElementById('logoPlaceholder');
    const manualBox = document.getElementById('manualUploadArea');

    if(spinner) spinner.style.display = 'none';
    if(placeholder) {
        placeholder.style.display = 'flex';
        placeholder.innerHTML = "NO<br>LOGO";
    }
    if(manualBox) manualBox.style.display = 'block';
}

function resetearLogoUI() {
    const img = document.getElementById('logoVisual');
    const placeholder = document.getElementById('logoPlaceholder');
    const resetBtn = document.getElementById('btnResetLogo');
    
    if(img) { img.style.display = 'none'; img.src = ''; }
    if(placeholder) { placeholder.style.display = 'flex'; placeholder.innerHTML = "SIN<br>LOGO"; }
    if(resetBtn) resetBtn.style.display = 'none';
}

// ==========================================
// 5. TRADUCCIÓN Y PPT
// ==========================================
async function translateText(text, targetLang) {
    if (!text || targetLang === 'es') return text;
    try {
        const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=es|${targetLang}`);
        const json = await res.json();
        return json.responseData.translatedText || text;
    } catch (e) { return text; }
}

async function generatePowerPoint() {
    const btn = document.getElementById('btnPPT');
    const originalText = btn.innerHTML;
    const lang = document.getElementById('langSelect').value || 'es';
    const t = translations[lang];
    
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Procesando...`;

    try {
        const data = getFormData();
        
        // --- FASE DE TRADUCCIÓN ---
        const [descP, descS, diag, notes] = await Promise.all([
            translateText(data.descripcionProblema, lang),
            translateText(data.descDespues, lang),
            translateText(data.diagnostico, lang),
            translateText(data.resumen, lang)
        ]);

        const pptx = new PptxGenJS();
        pptx.layout = 'LAYOUT_16x9';
        
        const C_BLUE = '0e2c49'; const C_WHT = 'FFFFFF';
        
        let logoConv = null, logoClient = null;
        try { logoConv = await getBase64FromImg('convergintLogoHidden'); } catch(e){}
        try { 
            const imgVis = document.getElementById('logoVisual');
            if(imgVis.src && imgVis.style.display !== 'none') logoClient = await getBase64FromImg('logoVisual');
        } catch(e){}

        pptx.defineSlideMaster({
            title: 'MASTER', bkgd: 'FFFFFF',
            objects: [
                { rect: { x:0, y:0, w:'100%', h:0.8, fill: C_BLUE } },
                { rect: { x:0, y:5.15, w:'100%', h:0.5, fill: C_BLUE } },
                { text: { text:'www.convergint.com', options:{x:0.3, y:5.25, color:C_WHT, fontSize:10} } },
                logoConv ? { image: { data:logoConv, x:8.5, y:0.1, w:1.3, h:0.6 } } : { text:{text:'Convergint', x:8.5, y:0.2, color:C_WHT} },
                logoClient ? { image: { data:logoClient, x:8.8, y:5.2, w:0.9, h:0.36, sizing:{type:'contain'} } } : 
                             { text: { text:data.cliente, x:7, y:5.25, w:2.8, align:'right', color:C_WHT, fontSize:10 } }
            ]
        });

        // SLIDE 1
        const s1 = pptx.addSlide(); s1.bkgd = C_BLUE;
        if(logoConv) s1.addImage({ data:logoConv, x:7.5, y:0.3, w:2.2, h:1.2 });
        s1.addText(t.ppt_title, { x:0.5, y:0.8, w:6, h:1, fontSize:28, color:C_WHT, bold:true });
        
        const row = (l, v, i) => {
            const y = 1.6 + (i*0.4);
            s1.addText(l, {x:0.5, y:y, w:2.5, color:'CCCCCC', fontSize:12, bold:true});
            s1.addText(v||'-', {x:3, y:y, w:5, color:C_WHT, fontSize:14});
            s1.addShape(pptx.ShapeType.line, {x:0.5, y:y+0.35, w:6, h:0, line:{color:'4A6fa5'}});
        };
        row(t.ppt_loc, data.ubicacion, 0); row(t.ppt_client, data.cliente, 1);
        row(t.ppt_tech, data.nombre, 2); row(t.ppt_sup, data.revisadoPor, 3);
        row(t.ppt_date, data.fecha, 4); row(t.ppt_ticket, data.ticket, 5);
        row(t.ppt_start, data.horarioinicio, 6); row(t.ppt_end, data.horariofinal, 7);

        if(logoClient) {
            s1.addShape(pptx.ShapeType.rect, {x:7.2, y:2.2, w:2.5, h:2.5, fill:C_WHT});
            s1.addImage({data:logoClient, x:7.3, y:2.3, w:2.3, h:2.3, sizing:{type:'contain'}});
        }

        // SLIDES DE CONTENIDO (TRADUCIDOS)
        const addContentSlide = (title, text, imgs) => {
            const s = pptx.addSlide({ masterName:'MASTER' });
            s.addText(title, {x:0.5, y:0.25, fontSize:18, color:C_WHT, bold:true});
            s.addShape(pptx.ShapeType.rect, {x:0.5, y:1.2, w:9, h:3.5, fill:'FAFAFA', line:{color:C_BLUE, width:2}});
            if(text) s.addText(text, {x:0.6, y:1.3, w:8.8, h:3.3, fontSize:14, color:'000000', valign:'top'});
            if(imgs) addPhotosToSlide(s, imgs);
        };

        if(data.imgLayout) {
            const s = pptx.addSlide({masterName:'MASTER'});
            s.addText(t.ppt_layout, {x:0.5, y:1, fontSize:18, color:C_WHT});
            s.addImage({data:await getBase64FromFile(data.imgLayout), x:0.5, y:1.2, w:9, h:3.5, sizing:{type:'contain'}});
        }

        addContentSlide(t.ppt_prob_title, descP, data.fotosAntes);
        
        const sSol = pptx.addSlide({masterName:'MASTER'});
        sSol.addText(t.ppt_sol_title, {x:0.5, y:0.25, fontSize:18, color:C_WHT});
        sSol.addText(t.ppt_work_done, {x:0.5, y:1, fontSize:12, bold:true, color:'595959'});
        sSol.addShape(pptx.ShapeType.rect, {x:0.5, y:1.3, w:9, h:1, fill:'F0F7FF', line:{color:C_BLUE}});
        sSol.addText(descS || '-', {x:0.6, y:1.35, w:8.8, h:0.9, fontSize:12, color:'000000', valign:'top'});
        if(data.fotosDespues.length) {
             sSol.addText(t.ppt_photos, {x:0.5, y:2.5, fontSize:12, bold:true, color:'595959'});
             await addPhotosToSlide(sSol, data.fotosDespues, 2.8);
        }

        addContentSlide(t.ppt_close_title, `${diag || ''}\n\n${notes || ''}`);

        const fname = `Reporte_${data.cliente}_${data.ticket}.pptx`;
        await pptx.writeFile({ fileName: fname });
        
        const b64 = await pptx.write('base64');
        await enviarBackend(fname, b64, data);

    } catch (e) {
        console.error(e);
        alert("Error generando reporte. Revisa la consola.");
    } finally {
        btn.innerHTML = originalText; btn.disabled = false;
    }
}

// ==========================================
// 6. HELPERS
// ==========================================
async function enviarBackend(fname, b64, data) {
    let mails = [data.emailTecnico, data.emailSupervisor];
    if(data.correosExtras) mails = [...mails, ...data.correosExtras.split(',')];
    const finalMails = [...new Set(mails)].filter(Boolean).join(',');
    
    if(!finalMails) { alert("Reporte descargado (No enviado: faltan correos)"); return; }

    try {
        const res = await fetch(BACKEND_URL, {
            method: "POST", headers: {"Content-Type":"application/json"},
            body: JSON.stringify({ correos: finalMails, nombreArchivo: fname, archivo: b64, mensaje: `Reporte ${data.cliente}` })
        });
        if(res.ok) alert(`Enviado a: ${finalMails}`);
        else alert("Error enviando correo.");
    } catch(e) { alert("Error de red enviando correo."); }
}

function getFormData() {
    const val = id => document.getElementById(id)?.value || "";
    const files = id => document.getElementById(id)?.files || [];
    
    const selName = val('nombreSelect');
    const selSup = val('revisadoPor');
    
    return {
        cliente: val('cliente'), ubicacion: val('ubicacion'), ticket: val('ticket'),
        fecha: val('fecha'), horarioinicio: val('horarioinicio'), horariofinal: val('horariofinal'),
        descripcionProblema: val('descripcionProblema'), descDespues: val('descDespues'),
        diagnostico: val('diagnostico'), resumen: val('resumen'), correosExtras: val('correoDestino'),
        nombre: selName === 'Otro' ? val('nombreManual') : selName,
        emailTecnico: selName === 'Otro' ? val('emailManual') : staffDirectory[selName],
        revisadoPor: selSup, emailSupervisor: staffDirectory[selSup],
        imgLayout: files('imgLayout')[0], fotosAntes: files('fotosAntes'), fotosDespues: files('fotosDespues')
    };
}

function getBase64FromImg(id) {
    return new Promise((res, rej) => {
        const img = document.getElementById(id);
        if(!img || !img.src) return rej();
        const c = document.createElement("canvas"); c.width=img.naturalWidth; c.height=img.naturalHeight;
        c.getContext("2d").drawImage(img,0,0);
        res(c.toDataURL("image/png"));
    });
}
function getBase64FromFile(file) {
    return new Promise((res, rej) => {
        const r = new FileReader(); r.onload=()=>res(r.result); r.onerror=rej; r.readAsDataURL(file);
    });
}
async function addPhotosToSlide(s, files, y=1.5) {
    if(!files || !files.length) return;
    const max = Math.min(files.length, 3);
    for(let i=0; i<max; i++) {
        try {
            const d = await getBase64FromFile(files[i]);
            const x = 0.5 + (i * 3.1);
            s.addImage({ data:d, x:x, y:y, w:2.8, h:2.5, sizing:{type:'contain'} });
            s.addShape(s.pptx.ShapeType.rect, {x:x, y:y, w:2.8, h:2.5, fill:{type:'none'}, line:{color:'0e2c49'}});
        } catch(e){}
    }
}
function safeSetupPreview(idIn, idOut) {
    const inp = document.getElementById(idIn);
    if(!inp) return;
    inp.addEventListener('change', function() {
        if(idOut) {
            const c = document.getElementById(idOut); c.innerHTML='';
            Array.from(this.files).forEach(f => {
                const r = new FileReader(); r.onload=e=>{
                    const i=document.createElement('img'); i.src=e.target.result; i.className='preview-img'; c.appendChild(i);
                }; r.readAsDataURL(f);
            });
        }
    });
}
