// ==========================================
// SECCIÓN DE INICIO Y BÚSQUEDA INTELIGENTE
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar Login y Previews
    const loginInput = document.getElementById('loginEmail');
    if(loginInput) loginInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') checkLogin(); });
    safeSetupPreview('imgLayout', null);
    safeSetupPreview('fotosAntes', 'previewAntes');
    safeSetupPreview('fotosDespues', 'previewDespues');
    
    // 2. Selector de Idioma
    const langSelect = document.getElementById('langSelect');
    if(langSelect) langSelect.addEventListener('change', (e) => changeLanguage(e.target.value));

    // 3. EVENTOS DEL LOGO (La parte importante)
    const btnBuscar = document.getElementById('btnBuscarLogo');
    const inputCliente = document.getElementById('cliente');
    const inputLogoManual = document.getElementById('inputLogoManual');
    const btnReset = document.getElementById('btnResetLogo');

    // Al presionar Enter en el nombre del cliente
    if (inputCliente) {
        inputCliente.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // Evita enviar el formulario
                iniciarBusquedaInteligente();
            }
        });
        // Opcional: Buscar también al salir del campo (blur)
        inputCliente.addEventListener('blur', () => {
            if(inputCliente.value.trim().length > 2) iniciarBusquedaInteligente();
        });
    }

    // Al hacer clic en la Lupa
    if (btnBuscar) btnBuscar.addEventListener('click', iniciarBusquedaInteligente);

    // Al subir un logo MANUALMENTE (Guardar en Memoria)
    if(inputLogoManual) {
        inputLogoManual.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const base64 = e.target.result;
                    establecerLogo(base64); // Mostrar logo
                    
                    // GUARDAR EN MEMORIA (LocalStorage)
                    const clientName = document.getElementById('cliente').value.trim().toLowerCase();
                    // Guardamos una versión "limpia" del nombre como clave
                    const cleanKey = clientName.replace(/[^a-z0-9]/g, '');
                    if(cleanKey) {
                        localStorage.setItem('logo_' + cleanKey, base64);
                        // Ocultar mensaje de error
                        document.getElementById('manualUploadArea').style.display = 'none';
                    }
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
    }

    // Botón de borrar logo
    if(btnReset) {
        btnReset.addEventListener('click', () => {
            document.getElementById('logoVisual').style.display = 'none';
            document.getElementById('logoVisual').src = '';
            document.getElementById('logoPlaceholder').style.display = 'flex';
            document.getElementById('logoPlaceholder').innerHTML = "SIN<br>LOGO";
            btnReset.style.display = 'none';
            // Opcional: Borrar de memoria si el usuario lo quita explícitamente
            const clientName = document.getElementById('cliente').value.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
            localStorage.removeItem('logo_' + clientName);
        });
    }

    // Lógica del Formulario
    const form = document.getElementById('serviceForm');
    if (form) form.addEventListener('submit', async (e) => { e.preventDefault(); await generatePowerPoint(); });
});

// --- FUNCIÓN CEREBRO DE LA BÚSQUEDA ---
function iniciarBusquedaInteligente() {
    const clientInput = document.getElementById('cliente');
    const rawName = clientInput.value.trim();
    
    if (rawName.length < 2) return; // Nombre muy corto, ignorar

    const cleanKey = rawName.toLowerCase().replace(/[^a-z0-9]/g, ''); // "Coca-Cola" -> "cocacola"

    // 1. ¿YA LO SUBISTE MANUALMENTE ANTES? (Memoria)
    const memoria = localStorage.getItem('logo_' + cleanKey);
    if (memoria) {
        console.log("Recuperado de memoria local:", rawName);
        establecerLogo(memoria);
        return;
    }

    // Preparar UI para búsqueda
    const spinner = document.getElementById('logoSpinner');
    const placeholder = document.getElementById('logoPlaceholder');
    const img = document.getElementById('logoVisual');
    const manualArea = document.getElementById('manualUploadArea');

    spinner.style.display = 'block';
    placeholder.style.display = 'none';
    img.style.display = 'none';
    manualArea.style.display = 'none';

    // 2. DICCIONARIO MANUAL (Marcas difíciles)
    const brandMap = {
        "coca": "coca-cola.com", 
        "cocacola": "coca-cola.com",
        "fedex": "fedex.com",
        "pepsi": "pepsi.com",
        "ford": "ford.com",
        "dhl": "dhl.com",
        "hp": "hp.com",
        "grupobimbo": "grupobimbo.com",
        "bimbo": "grupobimbo.com",
        "cemex": "cemex.com",
        "walmart": "walmart.com",
        "oxxo": "oxxo.com"
    };

    let domainsToTry = [];
    
    // Si está en el mapa, es el primer intento
    if (brandMap[cleanKey]) {
        domainsToTry.push(brandMap[cleanKey]);
    }

    // Intentos automáticos
    domainsToTry.push(cleanKey + ".com");        // cocacola.com
    domainsToTry.push(cleanKey + ".com.mx");     // cocacola.com.mx
    
    // Si el nombre tiene espacios "Coca Cola", prueba "coca-cola.com"
    if (rawName.includes(' ')) {
        domainsToTry.push(rawName.replace(/\s+/g, '-') + ".com");
    }

    // Iniciar la cascada de intentos
    tryDomainsSequentially(domainsToTry);
}

function tryDomainsSequentially(domains, index = 0) {
    // Si fallaron todos los dominios
    if (index >= domains.length) {
        const spinner = document.getElementById('logoSpinner');
        const placeholder = document.getElementById('logoPlaceholder');
        const manualArea = document.getElementById('manualUploadArea');
        
        spinner.style.display = 'none';
        placeholder.style.display = 'flex'; 
        placeholder.innerHTML = "LOGO NO<br>ENCONTRADO"; // Ahora sí cabe con el CSS arreglado
        
        // MOSTRAR EL BOTÓN PARA SUBIR MANUALMENTE
        manualArea.style.display = 'block';
        return;
    }

    const domain = domains[index];
    // Usamos la API de Google Favicons (es la más rápida y permisiva)
    const url = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    
    const tempImg = new Image();
    tempImg.crossOrigin = "Anonymous";
    tempImg.src = url;

    tempImg.onload = () => {
        // Google devuelve una imagen genérica de "mundo" si falla.
        // A veces es difícil detectarla, pero asumiremos éxito si carga.
        establecerLogo(url);
    };

    tempImg.onerror = () => {
        // Si falla, probar el siguiente dominio de la lista
        tryDomainsSequentially(domains, index + 1);
    };
}

function establecerLogo(src) {
    const img = document.getElementById('logoVisual');
    const placeholder = document.getElementById('logoPlaceholder');
    const spinner = document.getElementById('logoSpinner');
    const resetBtn = document.getElementById('btnResetLogo');
    const manualArea = document.getElementById('manualUploadArea');

    if(spinner) spinner.style.display = 'none';
    if(placeholder) placeholder.style.display = 'none';
    if(manualArea) manualArea.style.display = 'none';
    
    if(img) {
        img.src = src;
        img.style.display = 'block';
    }
    if(resetBtn) resetBtn.style.display = 'block';
}
