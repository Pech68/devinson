const apiKey = "AIzaSyBdaivnoeGHO4gM8V2HGckDu6T2XApKlZM"; // <--- TU LLAVE (Asegúrate de que sea válida)

// ============================================
// 0. LÓGICA DE TEMPORADAS INTELIGENTES
// ============================================
let currentThemeColor = 'rgba(59, 130, 246, 0.15)'; // Azul por defecto

function detectarTemporada() {
    const date = new Date();
    const month = date.getMonth(); // 0 = Enero, 11 = Diciembre
    const day = date.getDate();
    const body = document.body;
    
    // Elementos de la notificación
    const badge = document.getElementById('holiday-badge');
    const badgeText = document.getElementById('holiday-text');
    const badgeIcon = document.getElementById('holiday-icon');

    // Resetear clases por si acaso
    body.classList.remove('theme-christmas', 'theme-halloween', 'theme-love', 'theme-colombia');

    // LÓGICA DE FECHAS
    // 1. Diciembre (Navidad)
    if (month === 11) { 
        body.classList.add('theme-christmas');
        currentThemeColor = 'rgba(239, 68, 68, 0.2)'; // Rojo
        mostrarBadge("Modo Navidad", "fas fa-snowflake", "text-red-400");
    }
    // 2. Octubre (Halloween)
    else if (month === 9) { 
        body.classList.add('theme-halloween');
        currentThemeColor = 'rgba(249, 115, 22, 0.2)'; // Naranja
        mostrarBadge("Modo Halloween", "fas fa-ghost", "text-orange-400");
    }
    // 3. Septiembre (Amor y Amistad COL) o Febrero (San Valentin)
    else if (month === 8 || month === 1) { 
        body.classList.add('theme-love');
        currentThemeColor = 'rgba(236, 72, 153, 0.2)'; // Rosa
        mostrarBadge("Modo Amor", "fas fa-heart", "text-pink-400");
    }
    // 4. Independencia Colombia (20 Julio) - Margen del 15 al 25 de Julio
    else if (month === 6 && (day >= 15 && day <= 25)) { 
        body.classList.add('theme-colombia');
        currentThemeColor = 'rgba(234, 179, 8, 0.2)'; // Amarillo
        mostrarBadge("¡Viva Colombia!", "fas fa-flag", "text-yellow-400");
    }
    
    // DEBUG: Descomenta la siguiente línea para probar el modo Navidad hoy mismo:
    // body.classList.add('theme-christmas'); currentThemeColor = 'rgba(239, 68, 68, 0.2)'; mostrarBadge("Modo Navidad", "fas fa-snowflake", "text-red-400");
}

function mostrarBadge(texto, icono, claseColor) {
    const badge = document.getElementById('holiday-badge');
    const badgeText = document.getElementById('holiday-text');
    const badgeIcon = document.getElementById('holiday-icon');
    
    if(badge && badgeText && badgeIcon) {
        badgeText.innerText = texto;
        badgeIcon.className = `${icono} ${claseColor}`;
        badge.classList.remove('hidden');
    }
}

// Ejecutar detección al inicio
detectarTemporada();


// ============================================
// 1. MENU HAMBURGUESA
// ============================================
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = menuBtn ? menuBtn.querySelector('i') : null;
let isMenuOpen = false;

if (menuBtn) {
    menuBtn.addEventListener('click', toggleMenu);
}

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if(isMenuOpen) {
        mobileMenu.classList.add('open');
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        mobileMenu.classList.remove('open');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
}

// Cerrar menú al hacer clic en un enlace (Móvil)
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        if(isMenuOpen) toggleMenu();
    });
});


// ============================================
// 2. PARTICLES NETWORK (Adaptado al tema)
// ============================================
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
}
window.addEventListener('resize', resize);

function createParticles() {
    particles = [];
    const count = window.innerWidth < 768 ? 40 : 80; 
    for(let i=0; i<count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    // Usamos el color dinámico detectado por la temporada
    ctx.strokeStyle = currentThemeColor; 
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';

    particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if(p.x < 0) p.x = width;
        if(p.x > width) p.x = 0;
        if(p.y < 0) p.y = height;
        if(p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fill();

        for(let j=i+1; j<particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if(dist < 150) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    });
    requestAnimationFrame(animateParticles);
}
resize();
animateParticles();


// ============================================
// 3. SCROLL REVEAL & 3D
// ============================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const heroSection = document.getElementById('hero');
const heroImgContainer = document.getElementById('hero-img-container');
if (heroSection && heroImgContainer && window.innerWidth > 768) {
    heroSection.addEventListener('mousemove', (e) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 2;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 2;
        heroImgContainer.style.transform = `perspective(1000px) rotateY(${xPos * 15}deg) rotateX(${yPos * -15}deg)`;
    });
    heroSection.addEventListener('mouseleave', () => {
        heroImgContainer.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    });
}

const card = document.getElementById('payment-card');
const shine = document.getElementById('card-shine');
if(card && window.innerWidth > 768) {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -15; 
        const rotateY = ((x - centerX) / centerX) * 15;  
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        if(shine) {
            shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.25) 0%, transparent 80%)`;
        }
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
        if(shine) {
            shine.style.background = 'transparent';
        }
    });
}


// ============================================
// 4. COTIZADOR & IA
// ============================================
let aiSummaryForWhatsapp = "";

async function consultarIA() {
    const input = document.getElementById('ai-input').value;
    const btn = document.getElementById('ai-btn');
    const resultDiv = document.getElementById('ai-result');
    const contentDiv = document.getElementById('ai-content');
    const dynamicContainer = document.getElementById('dynamic-modules-container');

    if (!input) return;
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<div class="ai-loader"></div>';
    btn.disabled = true;
    resultDiv.classList.remove('hidden');
    contentDiv.innerHTML = '<span class="animate-pulse text-gray-500">Analizando estructura de costos y módulos...</span>';
    
    // Limpiar módulos dinámicos previos
    dynamicContainer.innerHTML = '';
    aiSummaryForWhatsapp = "";

    // Resetear checkboxes (menos base)
    document.getElementById('check-pagos').checked = false;
    document.getElementById('check-chatbot').checked = false;
    document.getElementById('check-pwa').checked = false;

    // Fallback si no hay API Key real
    if (!apiKey || apiKey === "PEGAR_TU_API_KEY_AQUI") {
        setTimeout(() => {
            const mockExplanation = `He detectado que necesitas una solución de comercio electrónico completa. He activado los módulos de **Pagos** y **PWA** para ti.`;
            contentDiv.innerHTML = marked.parse(mockExplanation);
            document.getElementById('check-pagos').checked = true;
            document.getElementById('check-pwa').checked = true;
            aiSummaryForWhatsapp = "Quiero una PWA con pagos integrados.";
            calculateTotal();
            btn.innerHTML = originalContent;
            btn.disabled = false;
        }, 2000);
        return;
    }

    try {
        const systemPrompt = `
        Eres el motor de ventas inteligente de Devinson Rodriguez.
        Tus Módulos Estándar son:
        1. "pagos": Pasarela de Pago ($100.000 COP)
        2. "chatbot": Chatbot IA ($300.000 COP)
        3. "pwa": App Web PWA Gestión ($400.000 COP)
        (La "Base Web" de 200.000 es obligatoria, ignórala en tu selección).

        Tu tarea:
        1. Analiza el requerimiento del usuario: "${input}".
        2. Selecciona qué módulos estándar necesita (pagos, chatbot, pwa).
        3. SI el usuario pide algo complejo que NO está en los módulos estándar, CREA un módulo personalizado.
        4. Genera un resumen MUY BREVE y directo para WhatsApp.
        
        Responde SOLO en formato JSON válido:
        {
            "explanation": "Texto breve explicando tu estrategia (Markdown).",
            "whatsapp_summary": "Hola Devinson, necesito: [Resumen ultra corto].",
            "select_modules": ["pagos", "pwa"],
            "custom_modules": [ {"name": "Nombre Módulo Extra", "price": 500000} ]
        }
        `;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: input }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] },
                generationConfig: { responseMimeType: "application/json" }
            })
        });
        
        const data = await response.json();
        
        if(data.error) throw new Error(data.error.message);

        const aiResponse = JSON.parse(data.candidates[0].content.parts[0].text);

        // 1. Mostrar explicación
        contentDiv.innerHTML = marked.parse(aiResponse.explanation);
        
        // 2. Guardar resumen
        aiSummaryForWhatsapp = aiResponse.whatsapp_summary;

        // 3. Marcar checkboxes
        if(aiResponse.select_modules) {
            aiResponse.select_modules.forEach(modId => {
                const checkbox = document.getElementById(`check-${modId}`);
                if(checkbox) checkbox.checked = true;
            });
        }

        // 4. Crear módulos personalizados
        if(aiResponse.custom_modules && aiResponse.custom_modules.length > 0) {
            aiResponse.custom_modules.forEach((mod) => {
                const div = document.createElement('div');
                div.innerHTML = `
                <label class="flex items-center justify-between p-4 rounded-xl bg-purple-900/10 border border-purple-500/30 hover:border-purple-500/50 cursor-pointer transition-all group active:scale-[0.98] ai-suggested animate-pulse">
                    <div class="flex items-center gap-3">
                        <div class="w-5 h-5 rounded-full border border-purple-500 flex items-center justify-center relative">
                            <input type="checkbox" checked data-name="${mod.name} (IA)" value="${mod.price}" onchange="calculateTotal()" class="opacity-0 absolute inset-0 cursor-pointer peer item-checkbox">
                            <div class="w-3 h-3 bg-purple-500 rounded-full opacity-100 transition-opacity"></div>
                        </div>
                        <div class="flex flex-col">
                            <span class="text-white group-hover:text-purple-400 transition-colors text-sm md:text-base flex items-center">
                                ${mod.name} <span class="ai-badge">SUGERIDO IA</span>
                            </span>
                        </div>
                    </div>
                    <span class="font-mono text-purple-300 text-sm md:text-base">$${new Intl.NumberFormat('es-CO').format(mod.price)}</span>
                </label>`;
                dynamicContainer.appendChild(div);
            });
        }

        calculateTotal();
        
    } catch (error) {
        console.error(error);
        contentDiv.innerHTML = `<span class="text-red-400">Error de conexión con Gemini. Intenta de nuevo.</span>`;
    } finally {
        btn.innerHTML = originalContent;
        btn.disabled = false;
    }
}

// Recalcular total del cotizador
function calculateTotal() {
    let total = 0;
    let selectedItems = [];
    
    // Buscar TODOS los checkboxes (incluyendo los dinámicos)
    const allCheckboxes = document.querySelectorAll('.item-checkbox');
    
    allCheckboxes.forEach(box => {
        if(box.checked) {
            total += parseInt(box.value);
            selectedItems.push(box.getAttribute('data-name'));
        }
    });
    
    // Formatear precio
    const fmt = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(total);
    document.getElementById('total-display').innerText = fmt;
    
    // Generar Link WhatsApp
    let message = "";
    
    if (aiSummaryForWhatsapp && aiSummaryForWhatsapp.length > 5) {
        message = `${aiSummaryForWhatsapp}\n\n*Detalle Técnico:*\n${selectedItems.map(i => `• ${i}`).join('\n')}\n\n*Presupuesto:* ${fmt}`;
    } else {
        const itemsString = selectedItems.join(' + ');
        message = `Hola Devinson, me interesa cotizar: [ ${itemsString} ]. El presupuesto es ${fmt}.`;
    }
    
    const btn = document.getElementById('btn-cotizar');
    btn.href = `https://wa.me/573215203354?text=${encodeURIComponent(message)}`;
}

// Ejecutar al inicio para sumar la base
calculateTotal();
