// ==========================================
// CONFIGURACIÓN DEL SERVIDOR (BACKEND)
// ==========================================
// ⚠️ IMPORTANTE: Cambia esta URL por la que te dé Render.com al subir tu servidor
const BACKEND_URL = "https://backend-reportes.onrender.com/enviar-ppt"; 
// Si estás probando en tu compu, usa: "http://localhost:3000/enviar-ppt"


// ==========================================
// 1. DICCIONARIO DE TRADUCCIONES
// ==========================================
const translations = {
    es: {
        title: "Reporte de Servicio",
        subtitle: "Generador Automatizado",
        projectInfo: "Información del Proyecto",
        clientLabel: "Nombre del Cliente / Empresa",
        clientHelp: "* Escribe el nombre y sal para buscar logo.",
        manualWebLabel: "No encontramos el logo. ¿Cuál es su web?",
        location: "Locación (Sitio)",
        preparedBy: "Prepared By (Técnico)",
        revisedBy: "Revised By (Supervisor)",
        date: "Date (Fecha)",
        ticket: "Referencia / Ticket",
        visitDetails: "Detalles de Visita",
        visitNo: "No. Visita",
        startTime: "Hora Entrada",
        endTime: "Hora Salida",
        layoutLabel: "Layout (Plano/Esquema)",
        uploadLayout: "Subir Imagen del Layout",
        serviceDev: "Desarrollo del Servicio",
        problemDesc: "Descripción del Problema",
        photosBefore: "Fotos 'Antes' (Evidencia inicial)",
        selectPhotos: "Seleccionar fotos",
        photosAfter: "Fotos 'Después' (Solución)",
        solutionDesc: "Solución / Trabajo Realizado",
        closing: "Cierre",
        diagnosis: "Diagnóstico",
        finalNotes: "Anotaciones Finales",
        generateBtn: "Generar y Enviar Reporte"
    },
    en: {
        title: "Service Report",
        subtitle: "Automated Generator",
        projectInfo: "Project Information",
        clientLabel: "Client / Company Name",
        clientHelp: "* Type name to auto-search logo.",
        manualWebLabel: "Logo not found. Website?",
        location: "Location (Site)",
        preparedBy: "Prepared By (Technician)",
        revisedBy: "Revised By (Supervisor)",
        date: "Date",
        ticket: "Reference / Ticket",
        visitDetails: "Visit Details",
        visitNo: "Visit No.",
        startTime: "Start Time",
        endTime: "End Time",
        layoutLabel: "Layout (Blueprint)",
        uploadLayout: "Upload Layout Image",
        serviceDev: "Service Development",
        problemDesc: "Problem Description",
        photosBefore: "Photos 'Before'",
        selectPhotos: "Select photos",
        photosAfter: "Photos 'After'",
        solutionDesc: "Solution / Work Done",
        closing: "Closing",
        diagnosis: "Diagnosis",
        finalNotes: "Final Notes",
        generateBtn: "Generate & Send Report"
    },
    pt: {
        title: "Relatório de Serviço",
        subtitle: "Gerador Automatizado",
        projectInfo: "Informações do Projeto",
        clientLabel: "Nome do Cliente / Empresa",
        clientHelp: "* Digite o nome para buscar o logotipo.",
        manualWebLabel: "Logotipo não encontrado. Site?",
        location: "Localização (Site)",
        preparedBy: "Preparado Por (Técnico)",
        revisedBy: "Revisado Por (Supervisor)",
        date: "Data",
        ticket: "Referência / Ticket",
        visitDetails: "Detalhes da Visita",
        visitNo: "Nº da Visita",
        startTime: "Hora Entrada",
        endTime: "Hora Saída",
        layoutLabel: "Layout (Planta)",
        uploadLayout: "Carregar Imagem do Layout",
        serviceDev: "Desenvolvimento",
        problemDesc: "Descrição do Problema",
        photosBefore: "Fotos 'Antes'",
        selectPhotos: "Selecionar fotos",
        photosAfter: "Fotos 'Depois'",
        solutionDesc: "Solução / Trabalho",
        closing: "Encerramento",
        diagnosis: "Diagnóstico",
        finalNotes: "Anotações Finais",
        generateBtn: "Gerar e Enviar"
    }
};

// ==========================================
// 2. DIRECTORIO DE PERSONAL
// ==========================================
const staffDirectory = {
    "Saul Ramirez": "saul.ramirez@convergint.com",
    "Gustavo Aburto": "gustavo.aburto@convergint.com",
    "Italia Silva": "Italia.Silva@convergint.com",
    "Juan Torres": "juan.torres@convergint.com"
};

// ==========================================
// 3. FUNCIÓN DE LOGIN (GLOBAL)
// ==========================================
function checkLogin() {
    console.log("Validando usuario...");
    
    const emailInput = document.getElementById('loginEmail');
    const email = emailInput.value.trim().toLowerCase();
    const loginOverlay = document.getElementById('loginOverlay');
    const mainApp = document.getElementById('mainApp');
    const loginError = document.getElementById('loginError');

    // 1. Verificar Dominio
    if (email.endsWith('@convergint.com')) {
        // ACCESO CONCEDIDO
        loginOverlay.style.display = 'none';
        mainApp.style.display = 'block';

        // 2. Auto-Seleccionar Técnico
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
        // ACCESO DENEGADO
        if(loginError) loginError.style.display = 'block';
        const card = document.querySelector('.login-card');
        if(card) {
            card.classList.add('shake');
            setTimeout(() => card.classList.remove('shake'), 500);
        }
    }
}

// ==========================================
// 4. INICIALIZACIÓN DEL RESTO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

    const loginEmailInput = document.getElementById('loginEmail');
    if(loginEmailInput) {
        loginEmailInput.addEventListener('keypress', (e) => { 
            if (e.key === 'Enter') checkLogin(); 
        });
    }

    // --- PREVIEWS Y TRADUCCIONES ---
    safeSetupPreview('imgLayout', null);
    safeSetupPreview('fotosAntes', 'previewAntes');
    safeSetupPreview('fotosDespues', 'previewDespues');

    const langSelect = document.getElementById('langSelect');
    if(langSelect) langSelect.addEventListener('change', (e) => changeLanguage(e.target.value));

    // --- LOGO AUTOMÁTICO ---
    const inputCliente = document.getElementById('cliente');
    const inputWebManual = document.getElementById('webManual');
    
    if (inputCliente) {
        inputCliente.addEventListener('blur', () => {
            const clientName = inputCliente.value.trim();
            if (clientName.length > 2) {
                const guessDomain = clientName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com';
                fetchAndShowLogo(guessDomain);
            }
        });
    }
    if (inputWebManual) {
        inputWebManual.addEventListener('blur', () => {
            const domain = inputWebManual.value.trim();
            if (domain) fetchAndShowLogo(domain);
        });
    }

    // --- MOSTRAR CAMPOS MANUALES DE TÉCNICO ---
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

    // --- SUBMIT ---
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

// ============================================================================
// 5. GENERACIÓN PPTX Y ENVÍO
// ============================================================================
async function generatePowerPoint() {
    const btn = document.getElementById('btnPPT');
    const originalText = btn ? btn.innerHTML : "Generar";

    if (btn) {
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Procesando...';
        btn.disabled = true;
    }

    try {
        const data = getFormData();
        const pptx = new PptxGenJS();
        
        // --- PPT SETUP ---
        pptx.layout = 'LAYOUT_16x9'; 
        pptx.author = 'Convergint';
        pptx.subject = `Reporte ${data.cliente}`;

        // Colores
        const C_DARK_BLUE = '0e2c49'; 
        const C_WHITE = 'FFFFFF';
        const C_GREY_TXT = '595959';

        // Logos
        let logoConvergintBase64 = null;
        const imgConvergintHidden = document.getElementById('convergintLogoHidden');
        if (imgConvergintHidden) {
            try { logoConvergintBase64 = await getBase64FromImageElement(imgConvergintHidden); } catch(e) {}
        }

        let logoClienteBase64 = null;
        const imgLogoVisual = document.getElementById('logoVisual');
        if (imgLogoVisual && imgLogoVisual.src && imgLogoVisual.style.display !== 'none') {
            try { logoClienteBase64 = await getBase64FromImageElement(imgLogoVisual); } catch (e) { }
        }

        // --- MASTER SLIDE ---
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

        // --- SLIDE 1: PORTADA ---
        const slide1 = pptx.addSlide(); 
        slide1.background = { color: C_DARK_BLUE }; 
        if (logoConvergintBase64) slide1.addImage({ data: logoConvergintBase64, x: 7.5, y: 0.3, w: 2.2, h: 1.2 });
        slide1.addText("REPORTE DE SERVICIO", { x: 0.5, y: 0.8, w: 6, h: 1, fontSize: 28, color: C_WHITE, bold: true, fontFace: 'Arial' });

        // AJUSTE: Subimos un poco el inicio (de 2.0 a 1.6) y reducimos el espaciado (de 0.45 a 0.40)
        // para que quepan las horas sin chocar con el pie de página.
        const drawRow = (label, value, idx) => {
            const y = 1.6 + (idx * 0.40); 
            slide1.addText(label, { x: 0.5, y: y, w: 2.5, h: 0.3, fontSize: 12, color: 'CCCCCC', bold: true });
            slide1.addText(value || "---", { x: 3.0, y: y, w: 5, h: 0.3, fontSize: 14, color: C_WHITE });
            slide1.addShape(pptx.ShapeType.line, { x: 0.5, y: y + 0.35, w: 6.0, h: 0, line: { color: '4A6fa5', width: 1 } });
        };

        // LISTA DE DATOS EN PORTADA (Ahora incluye horas)
        drawRow("Locación:", data.ubicacion, 0);
        drawRow("Cliente:", data.cliente, 1);
        drawRow("Técnico:", data.nombre, 2);
        drawRow("Supervisor:", data.revisadoPor, 3);
        drawRow("Fecha:", formatDate(data.fecha), 4);
        drawRow("Ticket:", data.ticket, 5);
        drawRow("Hora Entrada:", data.horarioinicio, 6); // Agregado
        drawRow("Hora Salida:", data.horariofinal, 7);   // Agregado

        // LOGO CLIENTE EN GRANDE (Derecha)
        slide1.addShape(pptx.ShapeType.rect, { x: 7.2, y: 2.2, w: 2.5, h: 2.5, fill: { color: C_WHITE } });
        slide1.addText("CLIENTE", { x: 7.2, y: 4.8, w: 2.5, align: 'center', fontSize: 10, color: 'CCCCCC' });
        if (logoClienteBase64) slide1.addImage({ data: logoClienteBase64, x: 7.3, y: 2.3, w: 2.3, h: 2.3, sizing: { type: 'contain', w: 2.3, h: 2.3 } });

        // --- SLIDE 2: LAYOUT ---
        if (data.imgLayout) {
            const slide2 = pptx.addSlide({ masterName: 'CONVERGINT_STYLE' });
            slide2.addText("LAYOUT / UBICACIÓN", { x: 0.5, y: 1.0, fontSize: 18, color: C_WHITE, bold: true });
            const imgData = await readFileAsBase64(data.imgLayout);
            slide2.addImage({ data: imgData, x: 0.5, y: 1.2, w: 9.0, h: 3.5, sizing: { type: 'contain', w: 9.0, h: 3.5 } });
        }

        // --- SLIDE 3: PROBLEMA ---
        const slide3 = pptx.addSlide({ masterName: 'CONVERGINT_STYLE' });
        slide3.addText("DESCRIPCIÓN DEL PROBLEMA", { x: 0.5, y: 0.25, fontSize: 18, color: C_WHITE, bold: true });
        slide3.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.2, w: 9.0, h: 3.5, fill: { color: 'FAFAFA' }, line: { color: C_DARK_BLUE, width: 2 } });
        slide3.addText(data.descripcionProblema || "Sin detalles.", { x: 0.6, y: 1.3, w: 8.8, h: 3.3, fontSize: 14, color: '000000', valign: 'top' });

        // --- SLIDE 4: ANTES ---
        if (data.fotosAntes && data.fotosAntes.length > 0) {
            const slide4 = pptx.addSlide({ masterName: 'CONVERGINT_STYLE' });
            slide4.addText("EVIDENCIA: ANTES", { x: 0.5, y: 0.25, fontSize: 18, color: C_WHITE, bold: true });
            await addPhotosToSlide(slide4, data.fotosAntes, 1.2); 
        }

        // --- SLIDE 5: DESPUÉS ---
        const slide5 = pptx.addSlide({ masterName: 'CONVERGINT_STYLE' });
        slide5.addText("SOLUCIÓN / EVIDENCIA FINAL", { x: 0.5, y: 0.25, fontSize: 18, color: C_WHITE, bold: true });
        slide5.addText("Trabajo Realizado:", { x: 0.5, y: 1.0, fontSize: 12, bold: true, color: C_GREY_TXT });
        slide5.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.3, w: 9.0, h: 1.0, fill: { color: 'F0F7FF' }, line: { color: C_DARK_BLUE, width: 1 } });
        slide5.addText(data.descDespues || "Trabajo completado.", { x: 0.6, y: 1.35, w: 8.8, h: 0.9, fontSize: 12, color: '000000', valign: 'top' });
        slide5.addText("Fotos:", { x: 0.5, y: 2.5, fontSize: 12, bold: true, color: C_GREY_TXT });
        if (data.fotosDespues && data.fotosDespues.length > 0) await addPhotosToSlide(slide5, data.fotosDespues, 2.8);

        // --- SLIDE 6: CIERRE ---
        const slide6 = pptx.addSlide({ masterName: 'CONVERGINT_STYLE' });
        slide6.addText("DIAGNÓSTICO Y CIERRE", { x: 0.5, y: 0.25, fontSize: 18, color: C_WHITE, bold: true });
        slide6.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.2, w: 9.0, h: 3.5, fill: { color: 'FFFFFF' }, line: { color: C_DARK_BLUE, width: 2 } });
        slide6.addText((data.diagnostico || "") + "\n\n" + (data.resumen || ""), { x: 0.6, y: 1.3, w: 8.8, h: 3.3, fontSize: 14, color: '000000', valign: 'top' });

        // --- 1. DESCARGAR PPT ---
        const filename = `Reporte_${data.cliente || 'Servicio'}_${data.ticket || 'Ref'}.pptx`;
        await pptx.writeFile({ fileName: filename });

        // --- 2. ENVIAR CORREO (USANDO BACKEND) ---
        // Generamos el archivo en Base64 sin prefijos para enviarlo limpio
        const pptxBase64 = await pptx.write('base64');
        
        let listaCorreos = [];
        // Correos automáticos
        if (data.emailTecnico) listaCorreos.push(data.emailTecnico);
        if (data.emailSupervisor) listaCorreos.push(data.emailSupervisor);
        
        // Correos manuales
        if (data.correosExtras) {
            const extras = data.correosExtras.split(',').map(e => e.trim());
            listaCorreos = [...listaCorreos, ...extras];
        }
        
        const correosFinales = [...new Set(listaCorreos)].filter(Boolean).join(',');

        console.log("Enviando a servidor:", BACKEND_URL);
        console.log("Destinatarios:", correosFinales);

        if (!correosFinales) {
            alert("Reporte descargado. (No se envió correo porque no se encontraron destinatarios).");
            return;
        }

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
            alert(`Reporte descargado y enviado correctamente a: ${correosFinales}`);
        } else {
            throw new Error("El servidor respondió con error.");
        }

    } catch (err) {
        console.error("ERROR:", err);
        alert("Reporte descargado, pero hubo un error enviando el correo. Verifica tu conexión o el servidor Backend.");
    } finally {
        if (btn) {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
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
        if (selectTecnico.value === 'Otro') {
            nombreTec = val('nombreManual');
            emailTec = val('emailManual');
        } else {
            nombreTec = selectTecnico.value;
            emailTec = staffDirectory[nombreTec] || "";
        }
    }

    const selectSup = document.getElementById('revisadoPor');
    let nombreSup = "", emailSup = "";
    if (selectSup) {
        nombreSup = selectSup.value;
        emailSup = staffDirectory[nombreSup] || "";
    }

    return {
        cliente: val('cliente'), ubicacion: val('ubicacion'), 
        nombre: nombreTec, emailTecnico: emailTec,
        revisadoPor: nombreSup, emailSupervisor: emailSup,
        correosExtras: val('correoDestino'),
        fecha: val('fecha'), horarioinicio: val('horarioinicio'), horariofinal: val('horariofinal'), ticket: val('ticket'), visita: val('visita'),
        descripcionProblema: val('descripcionProblema'), descDespues: val('descDespues'), diagnostico: val('diagnostico'), resumen: val('resumen'),
        imgLayout: files('imgLayout')[0], fotosAntes: files('fotosAntes'), fotosDespues: files('fotosDespues')
    };
}

function fetchAndShowLogo(domain) {
    domain = domain.replace('https://', '').replace('http://', '').replace('www.', '').split('/')[0];
    const img = document.getElementById('logoVisual');
    const placeholder = document.getElementById('logoPlaceholder');
    const spinner = document.getElementById('logoSpinner');
    const manualInputDiv = document.getElementById('manualWebInput');

    if (placeholder) placeholder.style.display = 'none';
    if (img) img.style.display = 'none';
    if (spinner) spinner.style.display = 'block';

    const logoUrl = `https://logo.clearbit.com/${domain}?size=500`;
    const tempImg = new Image();
    tempImg.crossOrigin = "Anonymous";
    tempImg.src = logoUrl;

    tempImg.onload = () => {
        if (spinner) spinner.style.display = 'none';
        if (img) { img.src = logoUrl; img.style.display = 'block'; }
        if (manualInputDiv) manualInputDiv.style.display = 'none';
    };
    tempImg.onerror = () => {
        if (spinner) spinner.style.display = 'none';
        if (placeholder) { placeholder.style.display = 'block'; placeholder.textContent = "No encontrado"; placeholder.style.color = "#FF6600"; }
        if (manualInputDiv) { manualInputDiv.style.display = 'block'; document.getElementById('webManual').placeholder = "Intenta otro dominio..."; }
    };
}

function getBase64FromImageElement(img) {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        try { resolve(canvas.toDataURL("image/png")); } catch (e) { reject(e); }
    });
}

function formatDate(dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr + "T00:00:00"); // Fix zona horaria
    const parts = dateStr.split('-');
    if (parts.length < 3) return dateStr;
    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    return `${parts[2]} de ${months[parseInt(parts[1]) - 1]} de ${parts[0]}`;
}

function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
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
                    reader.onload = (e) => {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.className = 'preview-img';
                        container.appendChild(img);
                    }
                    reader.readAsDataURL(file);
                });
            }
        } else {
            const wrapper = this.closest('.file-upload-wrapper');
            if (wrapper) {
                const span = wrapper.querySelector('span'); 
                if (this.files.length > 0 && span) span.textContent = this.files[0].name;
            }
        }
    });
}
