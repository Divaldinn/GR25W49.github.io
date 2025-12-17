// ==========================================
// CONFIGURACIÓN DEL SERVIDOR
// ==========================================
const BACKEND_URL = "https://gr25w49-github-io.onrender.com/enviar-ppt";

// ==========================================
// 1. DICCIONARIO DE TRADUCCIONES
// ==========================================
const translations = {
    es: {
        // UI
        title: "Reporte de Servicio", subtitle: "Generador Automatizado", projectInfo: "Información del Proyecto",
        clientLabel: "Cliente / Empresa", clientHelp: "* Escribe el nombre y presiona ENTER.",
        manualWebLabel: "¿Web del cliente?", location: "Locación",
        preparedBy: "Técnico", revisedBy: "Supervisor",
        date: "Fecha", ticket: "Ticket / Referencia", visitDetails: "Visita & Tiempos",
        visitNo: "# Visita", startTime: "Entrada", endTime: "Salida",
        layoutLabel: "Layout", uploadLayout: "Subir Imagen",
        serviceDev: "Desarrollo", problemDesc: "Problema Reportado",
        photosBefore: "Evidencia Inicial (Antes)", selectPhotos: "Añadir Fotos",
        photosAfter: "Evidencia Final (Después)", solutionDesc: "Solución Aplicada",
        closing: "Cierre Técnico", diagnosis: "Diagnóstico Final", finalNotes: "Notas Adicionales",
        generateBtn: "Generar Reporte",
        // PPT
        ppt_title: "REPORTE DE SERVICIO",
        ppt_loc: "Locación:", ppt_client: "Cliente:", ppt_tech: "Técnico:", ppt_sup: "Supervisor:",
        ppt_date: "Fecha:", ppt_ticket: "Ticket:", ppt_start: "Hora Entrada:", ppt_end: "Hora Salida:",
        ppt_layout: "LAYOUT / UBICACIÓN",
        ppt_prob_title: "DESCRIPCIÓN DEL PROBLEMA",
        ppt_evid_before: "EVIDENCIA: ANTES",
        ppt_sol_title: "SOLUCIÓN / EVIDENCIA FINAL",
        ppt_work_done: "Trabajo Realizado:",
        ppt_photos: "Fotos:",
        ppt_close_title: "DIAGNÓSTICO Y CIERRE"
    },
    en: {
        // UI
        title: "Service Report", subtitle: "Automated Generator", projectInfo: "Project Information",
        clientLabel: "Client / Company", clientHelp: "* Type name and press ENTER.",
        manualWebLabel: "Client Website?", location: "Location",
        preparedBy: "Technician", revisedBy: "Supervisor",
        date: "Date", ticket: "Ticket / Ref", visitDetails: "Visit & Timing",
        visitNo: "Visit #", startTime: "Start Time", endTime: "End Time",
        layoutLabel: "Layout", uploadLayout: "Upload Image",
        serviceDev: "Development", problemDesc: "Reported Problem",
        photosBefore: "Initial Evidence (Before)", selectPhotos: "Add Photos",
        photosAfter: "Final Evidence (After)", solutionDesc: "Applied Solution",
        closing: "Technical Closing", diagnosis: "Final Diagnosis", finalNotes: "Additional Notes",
        generateBtn: "Generate Report",
        // PPT
        ppt_title: "SERVICE REPORT",
        ppt_loc: "Location:", ppt_client: "Client:", ppt_tech: "Technician:", ppt_sup: "Supervisor:",
        ppt_date: "Date:", ppt_ticket: "Ticket:", ppt_start: "Start Time:", ppt_end: "End Time:",
        ppt_layout: "LAYOUT / SITE MAP",
        ppt_prob_title: "PROBLEM DESCRIPTION",
        ppt_evid_before: "EVIDENCE: BEFORE",
        ppt_sol_title: "SOLUTION / FINAL EVIDENCE",
        ppt_work_done: "Work Performed:",
        ppt_photos: "Photos:",
        ppt_close_title: "DIAGNOSIS & CLOSING"
    },
    pt: {
        // UI
        title: "Relatório de Serviço", subtitle: "Gerador Automatizado", projectInfo: "Informações do Projeto",
        clientLabel: "Cliente / Empresa", clientHelp: "* Digite o nome e pressione ENTER.",
        manualWebLabel: "Site do Cliente?", location: "Localização",
        preparedBy: "Técnico", revisedBy: "Supervisor",
        date: "Data", ticket: "Ticket / Ref", visitDetails: "Visita & Horários",
        visitNo: "Nº Visita", startTime: "Entrada", endTime: "Saída",
        layoutLabel: "Layout", uploadLayout: "Carregar Imagem",
        serviceDev: "Desenvolvimento", problemDesc: "Problema Relatado",
        photosBefore: "Evidência Inicial (Antes)", selectPhotos: "Adicionar Fotos",
        photosAfter: "Evidência Final (Depois)", solutionDesc: "Solução Aplicada",
        closing: "Encerramento Técnico", diagnosis: "Diagnóstico Final", finalNotes: "Notas Adicionais",
        generateBtn: "Gerar Relatório",
        // PPT
        ppt_title: "RELATÓRIO DE SERVIÇO",
        ppt_loc: "Localização:", ppt_client: "Cliente:", ppt_tech: "Técnico:", ppt_sup: "Supervisor:",
        ppt_date: "Data:", ppt_ticket: "Ticket:", ppt_start: "Entrada:", ppt_end: "Saída:",
        ppt_layout: "LAYOUT / PLANTA",
        ppt_prob_title: "DESCRIÇÃO DO PROBLEMA",
        ppt_evid_before: "EVIDÊNCIA: ANTES",
        ppt_sol_title: "SOLUÇÃO / EVIDÊNCIA FINAL",
        ppt_work_done: "Trabalho Realizado:",
        ppt_photos: "Fotos:",
        ppt_close_title: "DIAGNÓSTICO E ENCERRAMENTO"
    }
};

const staffDirectory = {
    "Saul Ramirez": "saul.ramirez@convergint.com",
    "Gustavo Aburto": "gustavo.aburto@convergint.com",
    "Italia Silva": "Italia.Silva@convergint.com",
    "Juan Torres": "juan.torres@convergint.com"
};

// ==========================================
// 2. LÓGICA DE INICIO Y EVENTOS
// ==========================================
function checkLogin() {
    const emailInput = document.getElementById('loginEmail');
    const email = emailInput.value.trim().toLowerCase();
    const loginOverlay = document.getElementById('loginOverlay');
    const mainApp = document.getElementById('mainApp');
    const loginError = document.getElementById('loginError');

    if (email.endsWith('@convergint.com')) {
        loginOverlay.style.display = 'none';
        mainApp.style.display = 'block';
        // Auto-llenar datos si es posible
        const nombreSelect = document.getElementById('nombreSelect');
        const emailManual = document.getElementById('emailManual');
        let encontrado = false;
        for (const [nombre, emailStaff] of Object.entries(staffDirectory)) {
            if (emailStaff.toLowerCase() === email) {
                nombreSelect.value = nombre;
                nombreSelect.dispatchEvent(new Event('change'));
                encontrado = true;
                break;
            }
        }
        if (!encontrado) {
            nombreSelect.value = 'Otro';
            nombreSelect.dispatchEvent(new Event('change'));
            if(emailManual) emailManual.value = email;
        }
    } else {
        if(loginError) loginError.style.display = 'block';
        const card = document.querySelector('.login-card');
        if(card) {
            card.classList.add('shake');
            setTimeout(() => card.classList.remove('shake'), 500);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Login Enter
    const loginEmailInput = document.getElementById('loginEmail');
    if(loginEmailInput) loginEmailInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') checkLogin(); });

    // Previews
    safeSetupPreview('imgLayout', null);
    safeSetupPreview('fotosAntes', 'previewAntes');
    safeSetupPreview('fotosDespues', 'previewDespues');

    // Idioma
    const langSelect = document.getElementById('langSelect');
    if(langSelect) langSelect.addEventListener('change', (e) => changeLanguage(e.target.value));

    // LOGOS: Lógica Mejorada con Diccionario
    const inputCliente = document.getElementById('cliente');
    const inputWebManual = document.getElementById('webManual');
    
    // --- DICCIONARIO DE MARCAS CONOCIDAS ---
    const brandMap = {
        "fedex": "fedex.com",
        "coca": "coca-cola.com",
        "cocacola": "coca-cola.com",
        "coca-cola": "coca-cola.com",
        "ford": "ford.com",
        "pepsi": "pepsi.com",
        "dhl": "dhl.com",
        "amazon": "amazon.com",
        "google": "google.com",
        "microsoft": "microsoft.com",
        "convergint": "convergint.com",
        "tesla": "tesla.com",
        "walmart": "walmart.com"
    };

    const iniciarBusquedaLogo = () => {
        const clientName = inputCliente.value.trim();
        if (clientName.length < 2) return;

        // Limpieza del nombre
        const clean = clientName.toLowerCase().replace(/[^a-z0-9\-]/g, ''); // solo letras y numeros

        // 1. ¿Está en el diccionario?
        if (brandMap[clean]) {
            tryDomainsSequentially([brandMap[clean]]);
            return;
        }

        // 2. Si no, intentamos adivinar
        const candidates = [
            clean + '.com',
            clean + '.com.mx',
            clientName.replace(/\s+/g, '') + '.com'
        ];

        // Reset UI
        document.getElementById('manualWebInput').style.display = 'none';
        document.getElementById('logoPlaceholder').style.display = 'none';
        
        tryDomainsSequentially(candidates);
    };

    if (inputCliente) {
        inputCliente.addEventListener('blur', iniciarBusquedaLogo);
        inputCliente.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); iniciarBusquedaLogo(); }
        });
    }

    if (inputWebManual) {
        inputWebManual.addEventListener('blur', () => {
            if(inputWebManual.value) tryDomainsSequentially([inputWebManual.value]);
        });
    }

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
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await generatePowerPoint();
        });
    }
});

function changeLanguage(lang) {
    const texts = translations[lang];
    if(!texts) return;
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (texts[key]) el.innerText = texts[key];
    });
}

// ==========================================
// 3. BUSCADOR DE LOGOS
// ==========================================
function tryDomainsSequentially(domains, index = 0) {
    // Si fallan todos
    if (index >= domains.length) {
        const manualInputDiv = document.getElementById('manualWebInput');
        const placeholder = document.getElementById('logoPlaceholder');
        const spinner = document.getElementById('logoSpinner');
        
        if (spinner) spinner.style.display = 'none';
        
        if (placeholder) {
            placeholder.style.display = 'flex'; // Flex para centrar
            placeholder.innerHTML = "LOGO<br>NO<br>ENCONTRADO";
            placeholder.style.fontSize = "10px"; // Texto pequeño para que quepa
        }

        if (manualInputDiv) {
            manualInputDiv.style.display = 'block';
            const inputManual = document.getElementById('webManual');
            if(inputManual) inputManual.placeholder = "ej: fedex.com";
        }
        return;
    }

    const domain = domains[index];
    const img = document.getElementById('logoVisual');
    const spinner = document.getElementById('logoSpinner');
    if (spinner) spinner.style.display = 'block';

    // Usamos Google API primero (Mas robusto para favicons)
    const logoUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    
    const tempImg = new Image();
    tempImg.crossOrigin = "Anonymous";
    tempImg.src = logoUrl;

    tempImg.onload = () => {
        // Validar que no sea la imagen de error por defecto de Google (a veces pasa)
        // Pero asumimos que funciona para simplificar.
        if (spinner) spinner.style.display = 'none';
        if (img) {
            img.src = logoUrl;
            img.style.display = 'block';
        }
        document.getElementById('logoPlaceholder').style.display = 'none';
        document.getElementById('manualWebInput').style.display = 'none';
    };

    tempImg.onerror = () => {
        // Si falla, probar siguiente
        tryDomainsSequentially(domains, index + 1);
    };
}

// ==========================================
// 4. TRADUCTOR API
// ==========================================
async function translateText(text, targetLang) {
    if (!text || targetLang === 'es') return text;
    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=es|${targetLang}`);
        const json = await response.json();
        return json.responseData.translatedText || text;
    } catch (e) {
        console.error("Error API Traducción:", e);
        return text;
    }
}

// ==========================================
// 5. GENERAR PPTX
// ==========================================
async function generatePowerPoint() {
    const btn = document.getElementById('btnPPT');
    const originalText = btn ? btn.innerHTML : "Generar";
    
    // IDIOMA SELECCIONADO
    const currentLang = document.getElementById('langSelect').value || 'es';
    const t = translations[currentLang]; // Diccionario activo

    if (btn) { 
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${currentLang === 'en' ? 'Processing...' : 'Procesando...'}`; 
        btn.disabled = true; 
    }

    try {
        const data = getFormData();
        
        // TRADUCCIÓN DE CAMPOS DE TEXTO
        const translatedDescProb = await translateText(data.descripcionProblema, currentLang);
        const translatedDescSol = await translateText(data.descDespues, currentLang);
        const translatedDiag = await translateText(data.diagnostico, currentLang);
        const translatedNotes = await translateText(data.resumen, currentLang);

        const pptx = new PptxGenJS();
        pptx.layout = 'LAYOUT_16x9'; 
        pptx.author = 'Convergint';
        pptx.subject = `Reporte ${data.cliente}`;

        const C_DARK_BLUE = '0e2c49'; 
        const C_WHITE = 'FFFFFF';
        const C_GREY_TXT = '595959';

        let logoConvergintBase64 = null;
        const imgConvergintHidden = document.getElementById('convergintLogoHidden');
        if (imgConvergintHidden) { try { logoConvergintBase64 = await getBase64FromImageElement(imgConvergintHidden); } catch(e) {} }

        let logoClienteBase64 = null;
        const imgLogoVisual = document.getElementById('logoVisual');
        if (imgLogoVisual && imgLogoVisual.src && imgLogoVisual.style.display !== 'none') {
            try { logoClienteBase64 = await getBase64FromImageElement(imgLogoVisual); } catch (e) { }
        }

        // MASTER SLIDE
        const masterObjects = [
             { rect: { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: C_DARK_BLUE } } },
             (logoConvergintBase64 ? 
                { image: { data: logoConvergintBase64, x: 8.5, y: 0.1, w: 1.3, h: 0.6 } } : 
                { text: { text: 'Convergint', x: 8.5, y: 0.2, color: C_WHITE, fontSize: 18, bold: true } }
             ),
             { rect: { x: 0, y: 5.15, w: '100%', h: 0.5, fill: { color: C_DARK_BLUE } } },
             { text: { text: 'www.convergint.com', options: { x: 0.3, y: 5.25, fontSize: 10, color: C_WHITE, bold: true, fontFace: 'Arial' } } },
             { placeholder: { options: { name: 'slideNumber', type: 'slideNumber', x: 2.5, y: 5.25, w: 0.5, h: 0.2, color: C_WHITE, fontSize: 10 } } }
        ];

        if (logoClienteBase64) {
            masterObjects.push({ rect: { x: 8.8, y: 5.2, w: 1.0, h: 0.4, fill: { color: C_WHITE } } });
            masterObjects.push({ image: { data: logoClienteBase64, x: 8.85, y: 5.22, w: 0.9, h: 0.36, sizing: { type: 'contain' } } });
        } else {
            masterObjects.push({ text: { text: data.cliente, x: 7.0, y: 5.25, w: 2.8, align: 'right', fontSize: 10, color: C_WHITE, bold: true } });
        }
        pptx.defineSlideMaster({ title: 'CONVERGINT_STYLE', background: { color: 'FFFFFF' }, objects: masterObjects });

        // SLIDE 1: PORTADA
        const slide1 = pptx.addSlide(); 
        slide1.background = { color: C_DARK_BLUE }; 
        if (logoConvergintBase64) slide1.addImage({ data: logoConvergintBase64, x: 7.5, y: 0.3, w: 2.2, h: 1.2 });
        slide1.addText(t.ppt_title, { x: 0.5, y: 0.8, w: 6, h: 1, fontSize: 28, color: C_WHITE, bold: true, fontFace: 'Arial' });

        const drawRow = (label, value, idx) => {
            const y = 1.6 + (idx * 0.40); 
            slide1.addText(label, { x: 0.5, y: y, w: 2.5, h: 0.3, fontSize: 12, color: 'CCCCCC', bold: true });
            slide1.addText(value || "---", { x: 3.0, y: y, w: 5, h: 0.3, fontSize: 14, color: C_WHITE });
            slide1.addShape(pptx.ShapeType.line, { x: 0.5, y: y + 0.35, w: 6.0, h: 0, line: { color: '4A6fa5', width: 1 } });
        };

        drawRow(t.ppt_loc, data.ubicacion, 0);
        drawRow(t.ppt_client, data.cliente, 1);
        drawRow(t.ppt_tech, data.nombre, 2);
        drawRow(t.ppt_sup, data.revisadoPor, 3);
        drawRow(t.ppt_date, formatDate(data.fecha), 4);
        drawRow(t.ppt_ticket, data.ticket, 5);
        drawRow(t.ppt_start, data.horarioinicio, 6);
        drawRow(t.ppt_end, data.horariofinal, 7);

        slide1.addShape(pptx.ShapeType.rect, { x: 7.2, y: 2.2, w: 2.5, h: 2.5, fill: { color: C_WHITE } });
        slide1.addText(t.ppt_client, { x: 7.2, y: 4.8, w: 2.5, align: 'center', fontSize: 10, color: 'CCCCCC' });
        if (logoClienteBase64) slide1.addImage({ data: logoClienteBase64, x: 7.3, y: 2.3, w: 2.3, h: 2.3, sizing: { type: 'contain', w: 2.3, h: 2.3 } });

        // SLIDE 2: LAYOUT
        if (data.imgLayout) {
            const slide2 = pptx.addSlide({ masterName: 'CONVERGINT_STYLE' });
            slide2.addText(t.ppt_layout, { x: 0.5, y: 1.0, fontSize: 18, color: C_WHITE, bold: true });
            const imgData = await readFileAsBase64(data.imgLayout);
            slide2.addImage({ data: imgData, x: 0.5, y: 1.2, w: 9.0, h: 3.5, sizing: { type: 'contain', w: 9.0, h: 3.5 } });
        }
        
        // SLIDE 3: PROBLEMA
        const slide3 = pptx.addSlide({ masterName: 'CONVERGINT_STYLE' });
        slide3.addText(t.ppt_prob_title, { x: 0.5, y: 0.25, fontSize: 18, color: C_WHITE, bold: true });
        slide3.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.2, w: 9.0, h: 3.5, fill: { color: 'FAFAFA' }, line: { color: C_DARK_BLUE, width: 2 } });
        slide3.addText(translatedDescProb || "---", { x: 0.6, y: 1.3, w: 8.8, h: 3.3, fontSize: 14, color: '000000', valign: 'top' });

        // SLIDE 4: ANTES
        if (data.fotosAntes && data.fotosAntes.length > 0) {
            const slide4 = pptx.addSlide({ masterName: 'CONVERGINT_STYLE' });
            slide4.addText(t.ppt_evid_before, { x: 0.5, y: 0.25, fontSize: 18, color: C_WHITE, bold: true });
            await addPhotosToSlide(slide4, data.fotosAntes, 1.2); 
        }

        // SLIDE 5: DESPUÉS
        const slide5 = pptx.addSlide({ masterName: 'CONVERGINT_STYLE' });
        slide5.addText(t.ppt_sol_title, { x: 0.5, y: 0.25, fontSize: 18, color: C_WHITE, bold: true });
        slide5.addText(t.ppt_work_done, { x: 0.5, y: 1.0, fontSize: 12, bold: true, color: C_GREY_TXT });
        slide5.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.3, w: 9.0, h: 1.0, fill: { color: 'F0F7FF' }, line: { color: C_DARK_BLUE, width: 1 } });
        slide5.addText(translatedDescSol || "---", { x: 0.6, y: 1.35, w: 8.8, h: 0.9, fontSize: 12, color: '000000', valign: 'top' });
        slide5.addText(t.ppt_photos, { x: 0.5, y: 2.5, fontSize: 12, bold: true, color: C_GREY_TXT });
        if (data.fotosDespues && data.fotosDespues.length > 0) await addPhotosToSlide(slide5, data.fotosDespues, 2.8);

        // SLIDE 6: CIERRE
        const slide6 = pptx.addSlide({ masterName: 'CONVERGINT_STYLE' });
        slide6.addText(t.ppt_close_title, { x: 0.5, y: 0.25, fontSize: 18, color: C_WHITE, bold: true });
        slide6.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.2, w: 9.0, h: 3.5, fill: { color: 'FFFFFF' }, line: { color: C_DARK_BLUE, width: 2 } });
        slide6.addText((translatedDiag || "") + "\n\n" + (translatedNotes || ""), { x: 0.6, y: 1.3, w: 8.8, h: 3.3, fontSize: 14, color: '000000', valign: 'top' });

        // DESCARGAR Y ENVIAR
        const filename = `Reporte_${data.cliente || 'Servicio'}_${data.ticket || 'Ref'}.pptx`;
        await pptx.writeFile({ fileName: filename });

        const pptxBase64 = await pptx.write('base64');
        
        let listaCorreos = [];
        if (data.emailTecnico) listaCorreos.push(data.emailTecnico);
        if (data.emailSupervisor) listaCorreos.push(data.emailSupervisor);
        if (data.correosExtras) {
            const extras = data.correosExtras.split(',').map(e => e.trim());
            listaCorreos = [...listaCorreos, ...extras];
        }
        
        const correosFinales = [...new Set(listaCorreos)].filter(Boolean).join(',');

        if (!correosFinales) {
            alert("Reporte descargado. (No se envió correo: Faltan destinatarios).");
            return;
        }

        console.log("Enviando a:", BACKEND_URL);
        const response = await fetch(BACKEND_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                correos: correosFinales,
                nombreArchivo: filename,
                archivo: pptxBase64,
                mensaje: `Hola, adjunto el reporte de ${data.cliente}.\nTécnico: ${data.nombre}\nTicket: ${data.ticket}`
            })
        });

        if (response.ok) {
            alert(`Reporte enviado correctamente a: ${correosFinales}`);
        } else {
            throw new Error("El servidor Backend respondió con error.");
        }

    } catch (err) {
        console.error("ERROR ENVÍO:", err);
        alert("Reporte descargado. Hubo un error enviando el correo.");
    } finally {
        if (btn) { btn.innerHTML = originalText; btn.disabled = false; }
    }
}

// ==========================================
// 6. HELPERS
// ==========================================
function getFormData() {
    const val = (id) => { const el = document.getElementById(id); return el ? el.value : ""; };
    const files = (id) => { const el = document.getElementById(id); return el ? el.files : []; };

    const selectTecnico = document.getElementById('nombreSelect');
    let nombreTec = "", emailTec = "";
    if (selectTecnico) {
        if (selectTecnico.value === 'Otro') { nombreTec = val('nombreManual'); emailTec = val('emailManual'); }
        else { nombreTec = selectTecnico.value; emailTec = staffDirectory[nombreTec] || ""; }
    }

    const selectSup = document.getElementById('revisadoPor');
    let nombreSup = "", emailSup = "";
    if (selectSup) { nombreSup = selectSup.value; emailSup = staffDirectory[nombreSup] || ""; }

    return {
        cliente: val('cliente'), ubicacion: val('ubicacion'), 
        nombre: nombreTec, emailTecnico: emailTec, revisadoPor: nombreSup, emailSupervisor: emailSup,
        correosExtras: val('correoDestino'),
        fecha: val('fecha'), horarioinicio: val('horarioinicio'), horariofinal: val('horariofinal'),
        ticket: val('ticket'), visita: val('visita'),
        descripcionProblema: val('descripcionProblema'), descDespues: val('descDespues'), diagnostico: val('diagnostico'), resumen: val('resumen'),
        imgLayout: files('imgLayout')[0], fotosAntes: files('fotosAntes'), fotosDespues: files('fotosDespues')
    };
}

function getBase64FromImageElement(img) {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas"); canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d"); ctx.drawImage(img, 0, 0);
        try { resolve(canvas.toDataURL("image/png")); } catch (e) { reject(e); }
    });
}

function formatDate(dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr + "T00:00:00");
    const parts = dateStr.split('-');
    if (parts.length < 3) return dateStr;
    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    return `${parts[2]} de ${months[parseInt(parts[1]) - 1]} de ${parts[0]}`;
}

function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file);
    });
}

async function addPhotosToSlide(slide, fileList, startY = 1.5) {
    if (!fileList || fileList.length === 0) return;
    const count = Math.min(fileList.length, 3);
    const startX = 0.5; const w = 2.8; const h = 2.5; const gap = 0.3;
    const C_DARK_BLUE = '0e2c49';
    for (let i = 0; i < count; i++) {
        try {
            const base64 = await readFileAsBase64(fileList[i]);
            const xPos = startX + (i * (w + gap));
            slide.addImage({ data: base64, x: xPos, y: startY, w: w, h: h, sizing: { type: 'contain', w: w, h: h } });
            slide.addShape(slide.pptx.ShapeType.rect, { x: xPos, y: startY, w: w, h: h, fill: { type: 'none' }, line: { color: C_DARK_BLUE, width: 1 } });
        } catch (e) { }
    }
}

function safeSetupPreview(inputId, previewContainerId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.addEventListener('change', function () {
        if (previewContainerId) {
            const container = document.getElementById(previewContainerId);
            if (container) {
                container.innerHTML = '';
                Array.from(this.files).forEach(file => {
                    const reader = new FileReader();
                    reader.onload = (e) => { const img = document.createElement('img'); img.src = e.target.result; img.className = 'preview-img'; container.appendChild(img); }
                    reader.readAsDataURL(file);
                });
            }
        } else {
            const wrapper = this.closest('.file-upload-wrapper');
            if (wrapper) { const span = wrapper.querySelector('span'); if (this.files.length > 0 && span) span.textContent = this.files[0].name; }
        }
    });
}
