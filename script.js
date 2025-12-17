// ==========================================
// CONFIGURACIÓN BACKEND
// ==========================================
const BACKEND_URL = "https://gr25w49-github-io.onrender.com/enviar-ppt";

// ==========================================
// 1. DICCIONARIO DE IDIOMAS
// ==========================================
const translations = {
    es: {
        title: "Reporte de Servicio", clientLabel: "Cliente / Empresa", clientHelp: "* Presiona la Lupa o Enter para buscar.",
        manualWebLabel: "No encontrado. ¿Subir manual?", location: "Locación (Sitio)", preparedBy: "Prepared By (Técnico)", 
        revisedBy: "Revised By (Supervisor)", date: "Date (Fecha)", ticket: "Referencia / Ticket", visitDetails: "Detalles de Visita",
        visitNo: "No. Visita", startTime: "Hora Entrada", endTime: "Hora Salida", layoutLabel: "Layout (Plano)", 
        uploadLayout: "Subir Imagen", serviceDev: "Desarrollo del Servicio", problemDesc: "Descripción del Problema",
        photosBefore: "Fotos 'Antes'", selectPhotos: "Seleccionar fotos", photosAfter: "Fotos 'Después'", 
        solutionDesc: "Solución / Trabajo Realizado", closing: "Cierre", diagnosis: "Diagnóstico", finalNotes: "Notas Finales",
        generateBtn: "Generar y Enviar Reporte",
        // Placeholders
        ph_client: "Ej: Coca Cola, Ford...", ph_location: "Dirección / Ciudad", ph_manual_name: "Escribe tu nombre",
        ph_manual_email: "tucorreo@convergint.com", ph_ticket: "Escribe el ticket...", ph_problem: "¿Qué falla se reportó?",
        ph_solution: "Describe la solución...", ph_diagnosis: "Conclusión técnica...", ph_notes: "Notas adicionales...",
        ph_emails: "gerente@convergint.com...",
        // PPT
        ppt_title: "REPORTE DE SERVICIO", ppt_loc: "Locación:", ppt_client: "Cliente:", ppt_tech: "Técnico:", 
        ppt_sup: "Supervisor:", ppt_date: "Fecha:", ppt_ticket: "Ticket:", ppt_start: "Entrada:", ppt_end: "Salida:",
        ppt_layout: "LAYOUT / UBICACIÓN", ppt_prob: "DESCRIPCIÓN DEL PROBLEMA", ppt_evid_before: "EVIDENCIA: ANTES", 
        ppt_sol: "SOLUCIÓN / EVIDENCIA FINAL", ppt_work: "Trabajo Realizado:", ppt_photos: "Fotos:", ppt_close: "DIAGNÓSTICO Y CIERRE"
    },
    en: {
        title: "Service Report", clientLabel: "Client / Company", clientHelp: "* Press Magnifier or Enter to search.",
        manualWebLabel: "Not found. Upload manual?", location: "Location (Site)", preparedBy: "Prepared By (Technician)", 
        revisedBy: "Revised By (Supervisor)", date: "Date", ticket: "Reference / Ticket", visitDetails: "Visit Details",
        visitNo: "Visit No.", startTime: "Start Time", endTime: "End Time", layoutLabel: "Layout (Blueprint)", 
        uploadLayout: "Upload Image", serviceDev: "Service Development", problemDesc: "Problem Description",
        photosBefore: "Photos 'Before'", selectPhotos: "Select photos", photosAfter: "Photos 'After'", 
        solutionDesc: "Solution / Work Done", closing: "Closing", diagnosis: "Diagnosis", finalNotes: "Final Notes",
        generateBtn: "Generate & Send Report",
        // Placeholders
        ph_client: "Ex: Coca Cola, Ford...", ph_location: "Address / City", ph_manual_name: "Your Name",
        ph_manual_email: "email@convergint.com", ph_ticket: "Enter ticket...", ph_problem: "Reported issue?",
        ph_solution: "Describe solution...", ph_diagnosis: "Technical conclusion...", ph_notes: "Additional notes...",
        ph_emails: "manager@convergint.com...",
        // PPT
        ppt_title: "SERVICE REPORT", ppt_loc: "Location:", ppt_client: "Client:", ppt_tech: "Technician:", 
        ppt_sup: "Supervisor:", ppt_date: "Date:", ppt_ticket: "Ticket:", ppt_start: "Start:", ppt_end: "End:",
        ppt_layout: "LAYOUT / SITE MAP", ppt_prob: "PROBLEM DESCRIPTION", ppt_evid_before: "EVIDENCE: BEFORE", 
        ppt_sol: "SOLUTION / FINAL EVIDENCE", ppt_work: "Work Performed:", ppt_photos: "Photos:", ppt_close: "DIAGNOSIS & CLOSING"
    },
    pt: {
        title: "Relatório de Serviço", clientLabel: "Cliente / Empresa", clientHelp: "* Pressione Lupa ou Enter para buscar.",
        manualWebLabel: "Não encontrado. Upload?", location: "Localização (Site)", preparedBy: "Preparado Por (Técnico)", 
        revisedBy: "Revisado Por (Supervisor)", date: "Data", ticket: "Referência / Ticket", visitDetails: "Detalhes da Visita",
        visitNo: "Nº da Visita", startTime: "Hora Entrada", endTime: "Hora Saída", layoutLabel: "Layout (Planta)", 
        uploadLayout: "Carregar Imagem", serviceDev: "Desenvolvimento", problemDesc: "Descrição do Problema",
        photosBefore: "Fotos 'Antes'", selectPhotos: "Selecionar fotos", photosAfter: "Fotos 'Depois'", 
        solutionDesc: "Solução / Trabalho", closing: "Encerramento", diagnosis: "Diagnóstico", finalNotes: "Anotações Finais",
        generateBtn: "Gerar e Enviar",
        // Placeholders
        ph_client: "Ex: Coca Cola, Ford...", ph_location: "Endereço / Cidade", ph_manual_name: "Seu Nome",
        ph_manual_email: "email@convergint.com", ph_ticket: "Digite o ticket...", ph_problem: "Problema relatado?",
        ph_solution: "Descreva a solução...", ph_diagnosis: "Conclusão técnica...", ph_notes: "Notas adicionais...",
        ph_emails: "gerente@convergint.com...",
        // PPT
        ppt_title: "RELATÓRIO DE SERVIÇO", ppt_loc: "Localização:", ppt_client: "Cliente:", ppt_tech: "Técnico:", 
        ppt_sup: "Supervisor:", ppt_date: "Data:", ppt_ticket: "Ticket:", ppt_start: "Entrada:", ppt_end: "Saída:",
        ppt_layout: "LAYOUT / PLANTA", ppt_prob: "DESCRIÇÃO DO PROBLEMA", ppt_evid_before: "EVIDÊNCIA: ANTES", 
        ppt_sol: "SOLUÇÃO / EVIDÊNCIA FINAL", ppt_work: "Trabalho Realizado:", ppt_photos: "Fotos:", ppt_close: "DIAGNÓSTICO E ENCERRAMENTO"
    }
};

const staffDirectory = {
    "Saul Ramirez": "saul.ramirez@convergint.com",
    "Gustavo Aburto": "gustavo.aburto@convergint.com",
    "Italia Silva": "Italia.Silva@convergint.com",
    "Juan Torres": "juan.torres@convergint.com"
};

// ==========================================
// 2. MAPA & LOGIN
// ==========================================
let map; 

function initMap() {
    // Mapa centrado en CDMX por defecto
    map = L.map('miniMapContainer').setView([19.4326, -99.1332], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    let marker = L.marker([19.4326, -99.1332], {draggable: true}).addTo(map);

    // Intentar geolocalizar al usuario
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            map.setView([lat, lng], 15);
            marker.setLatLng([lat, lng]);
        });
    }
}

function checkLogin() {
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    if (email.endsWith('@convergint.com')) {
        document.getElementById('loginOverlay').style.display = 'none';
        document.getElementById('mainApp').style.display = 'block';
        
        // Iniciar mapa (requiere que el div sea visible)
        setTimeout(initMap, 500); 
    } else {
        const err = document.getElementById('loginError');
        if(err) err.style.display = 'block';
    }
}

// ==========================================
// 3. INICIALIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const loginInput = document.getElementById('loginEmail');
    if(loginInput) loginInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') checkLogin(); });
    
    safeSetupPreview('imgLayout', null);
    safeSetupPreview('fotosAntes', 'previewAntes');
    safeSetupPreview('fotosDespues', 'previewDespues');
    
    const langSelect = document.getElementById('langSelect');
    if(langSelect) langSelect.addEventListener('change', (e) => changeLanguage(e.target.value));

    const btnBuscar = document.getElementById('btnBuscarLogo');
    const inputCliente = document.getElementById('cliente');
    const inputLogoManual = document.getElementById('inputLogoManual');
    const btnReset = document.getElementById('btnResetLogo');

    if (inputCliente) {
        inputCliente.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); buscarLogoMaster(); }
        });
    }
    if (btnBuscar) btnBuscar.addEventListener('click', buscarLogoMaster);

    if(inputLogoManual) {
        inputLogoManual.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const base64 = e.target.result;
                    mostrarLogoEnPantalla(base64);
                    const name = inputCliente.value.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
                    if(name) localStorage.setItem('logo_hd_' + name, base64);
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
    }

    if(btnReset) btnReset.addEventListener('click', resetearLogoUI);

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

    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = el.getAttribute('data-i18n-ph');
        if (texts[key]) el.placeholder = texts[key];
    });
}

// =========================================================
// 4. MOTOR DE BÚSQUEDA MAESTRO
// =========================================================
async function buscarLogoMaster() {
    const input = document.getElementById('cliente');
    const query = input.value.trim();
    if (query.length < 2) return;

    resetearLogoUI();
    const spinner = document.getElementById('logoSpinner');
    const placeholder = document.getElementById('logoPlaceholder');
    spinner.style.display = 'block';
    placeholder.style.display = 'none';
    document.getElementById('manualUploadArea').style.display = 'none';

    const cleanKey = query.toLowerCase().replace(/[^a-z0-9]/g, '');

    // 1. MEMORIA LOCAL
    const memoria = localStorage.getItem('logo_hd_' + cleanKey);
    if (memoria) {
        mostrarLogoEnPantalla(memoria);
        return;
    }

    // 2. DICCIONARIO
    const brandMap = {
        "coca": "coca-cola.com", "cocacola": "coca-cola.com", "coca-cola": "coca-cola.com",
        "fedex": "fedex.com", "federalexpress": "fedex.com",
        "pepsi": "pepsi.com", "ford": "ford.com", "dhl": "dhl.com",
        "hp": "hp.com", "bimbo": "grupobimbo.com", "grupobimbo": "grupobimbo.com",
        "cemex": "cemex.com", "walmart": "walmart.com", "oxxo": "oxxo.com",
        "soriana": "soriana.com", "liverpool": "liverpool.com.mx",
        "coppel": "coppel.com", "telmex": "telmex.com", "cfe": "cfe.mx", "pemex": "pemex.com"
    };

    let candidates = [];
    if (brandMap[cleanKey]) {
        candidates.push(brandMap[cleanKey]);
    }

    candidates.push(query.toLowerCase().replace(/\s+/g, '') + ".com");       
    candidates.push(query.toLowerCase().replace(/\s+/g, '-') + ".com");      
    candidates.push(cleanKey + ".com");                                      
    candidates.push(cleanKey + ".com.mx");                                   
    
    candidates = [...new Set(candidates)];

    // 3. INTENTAR INTERNET
    const encontrado = await intentarListaGoogle(candidates, cleanKey);

    if (encontrado) return;

    // 4. INTENTAR CARPETA LOCAL (GITHUB)
    const localPath = `logos/${cleanKey}.png`;
    const imgLocal = new Image();
    imgLocal.onload = function() { mostrarLogoEnPantalla(localPath); };
    imgLocal.onerror = function() { mostrarErrorLogo(); };
    imgLocal.src = localPath;
}

function intentarListaGoogle(domains, cleanKey) {
    return new Promise((resolve) => {
        let index = 0;
        function probarSiguiente() {
            if (index >= domains.length) { resolve(false); return; }
            const domain = domains[index];
            const url = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = function() {
                mostrarLogoEnPantalla(url);
                localStorage.setItem('logo_hd_' + cleanKey, url);
                resolve(true);
            };
            img.onerror = function() { index++; probarSiguiente(); };
            img.src = url;
        }
        probarSiguiente();
    });
}

function mostrarLogoEnPantalla(src) {
    const img = document.getElementById('logoVisual');
    const spinner = document.getElementById('logoSpinner');
    const placeholder = document.getElementById('logoPlaceholder');
    const resetBtn = document.getElementById('btnResetLogo');
    const manualBox = document.getElementById('manualUploadArea');

    spinner.style.display = 'none';
    placeholder.style.display = 'none';
    manualBox.style.display = 'none';
    img.src = src;
    img.style.display = 'block';
    resetBtn.style.display = 'block';
}

function mostrarErrorLogo() {
    const spinner = document.getElementById('logoSpinner');
    const placeholder = document.getElementById('logoPlaceholder');
    const manualBox = document.getElementById('manualUploadArea');
    spinner.style.display = 'none';
    placeholder.style.display = 'flex';
    placeholder.innerHTML = "NO<br>LOGO";
    manualBox.style.display = 'block';
}

function resetearLogoUI() {
    const img = document.getElementById('logoVisual');
    const placeholder = document.getElementById('logoPlaceholder');
    const resetBtn = document.getElementById('btnResetLogo');
    img.style.display = 'none'; img.src = '';
    placeholder.style.display = 'flex'; placeholder.innerHTML = "SIN<br>LOGO";
    resetBtn.style.display = 'none';
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
        
        // TRADUCIR CONTENIDO DEL TÉCNICO
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
        row(t.ppt_date, formatDate(data.fecha), 4); row(t.ppt_ticket, data.ticket, 5);
        row(t.ppt_start, data.horarioinicio, 6); row(t.ppt_end, data.horariofinal, 7);

        if(logoClient) {
            s1.addShape(pptx.ShapeType.rect, {x:7.2, y:2.2, w:2.5, h:2.5, fill:C_WHT});
            s1.addImage({data:logoClient, x:7.3, y:2.3, w:2.3, h:2.3, sizing:{type:'contain'}});
        }

        // SLIDE 2
        if(data.imgLayout) {
            const s = pptx.addSlide({masterName:'MASTER'});
            s.addText(t.ppt_layout, {x:0.5, y:1, fontSize:18, color:C_WHT});
            try { s.addImage({data:await getBase64FromFile(data.imgLayout), x:0.5, y:1.2, w:9, h:3.5, sizing:{type:'contain'}}); } catch(e){}
        }

        // SLIDE 3
        const s3 = pptx.addSlide({masterName:'MASTER'});
        s3.addText(t.ppt_prob, {x:0.5, y:0.25, fontSize:18, color:C_WHT});
        s3.addShape(pptx.ShapeType.rect, {x:0.5, y:1.2, w:9, h:3.5, fill:'FAFAFA', line:{color:C_BLUE}});
        s3.addText(descP || '-', {x:0.6, y:1.3, w:8.8, h:3.3, fontSize:14, color:'000000', valign:'top'});

        // SLIDE 4
        if(data.fotosAntes.length) {
            const s = pptx.addSlide({masterName:'MASTER'}); s.addText(t.ppt_evid_before, {x:0.5, y:0.25, fontSize:18, color:C_WHT});
            await addPhotosToSlide(s, data.fotosAntes);
        }

        // SLIDE 5
        const sSol = pptx.addSlide({masterName:'MASTER'});
        sSol.addText(t.ppt_sol, {x:0.5, y:0.25, fontSize:18, color:C_WHT});
        sSol.addText(t.ppt_work, {x:0.5, y:1, fontSize:12, bold:true, color:'595959'});
        sSol.addShape(pptx.ShapeType.rect, {x:0.5, y:1.3, w:9, h:1, fill:'F0F7FF', line:{color:C_BLUE}});
        sSol.addText(descS || '-', {x:0.6, y:1.35, w:8.8, h:0.9, fontSize:12, color:'000000', valign:'top'});
        if(data.fotosDespues.length) {
             sSol.addText(t.ppt_photos, {x:0.5, y:2.5, fontSize:12, bold:true, color:'595959'});
             await addPhotosToSlide(sSol, data.fotosDespues, 2.8);
        }

        // SLIDE 6
        const s6 = pptx.addSlide({masterName:'MASTER'});
        s6.addText(t.ppt_close, {x:0.5, y:0.25, fontSize:18, color:C_WHT});
        s6.addShape(pptx.ShapeType.rect, {x:0.5, y:1.2, w:9, h:3.5, fill:'FFFFFF', line:{color:C_BLUE}});
        s6.addText((diag || "") + "\n\n" + (notes || ""), {x:0.6, y:1.3, w:8.8, h:3.3, fontSize:14, color:'000000', valign:'top'});

        // DOWNLOAD
        const safeClient = (data.cliente || 'Client').replace(/[^a-z0-9]/gi, '_');
        const fname = `Reporte_${safeClient}_${data.ticket}.pptx`;
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
    
    // Técnico es siempre manual ahora
    const nombreTec = val('nombreManual');
    
    // Asumimos un email por defecto o lo pedimos? 
    // Como el input de nombre es libre, el correo técnico es el manual o null
    // Usaremos el email manual del técnico
    // NOTA: Si quieres pedir email técnico, deberíamos agregar un input. 
    // Por ahora, lo dejaré vacío o podrías agregar un campo más. 
    // O mejor, usar el correo de login si coincide. 
    
    return {
        cliente: val('cliente'), ubicacion: val('ubicacion'), ticket: val('ticket'),
        fecha: val('fecha'), horarioinicio: val('horarioinicio'), horariofinal: val('horariofinal'),
        descripcionProblema: val('descripcionProblema'), descDespues: val('descDespues'),
        diagnostico: val('diagnostico'), resumen: val('resumen'), correosExtras: val('correoDestino'),
        nombre: nombreTec,
        emailTecnico: "", // Aquí podrías poner document.getElementById('loginEmail').value si quieres
        revisadoPor: val('revisadoPor'), emailSupervisor: staffDirectory[val('revisadoPor')],
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
