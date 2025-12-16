const apiKey = "AIzaSyBdaivnoeGHO4gM8V2HGckDu6T2XApKlZM"; // <--- TU LLAVE

// ============================================
// 0. LÓGICA DE TEMPORADAS INTELIGENTES
// ============================================
let currentThemeColor = 'rgba(59, 130, 246, 0.15)'; 
let particleMode = 'circle'; 
let particleEmoji = ''; 

function detectarTemporada() {
    const date = new Date();
    const month = date.getMonth(); 
    const day = date.getDate();
    const body = document.body;
    const originalTitle = "Devinson Rodriguez | Experto en E-commerce & Automatización IA";
    
    body.classList.remove('theme-christmas', 'theme-halloween', 'theme-love', 'theme-colombia');
    document.title = originalTitle; 
    particleMode = 'circle';
    particleEmoji = '';

    // LOGICA DE FECHAS
    if (month === 11) { 
        body.classList.add('theme-christmas');
        currentThemeColor = 'rgba(239, 68, 68, 0.2)';
        particleMode = 'emoji';
        particleEmoji = '❄️';
        document.title = "🎄 Devinson | Edición Navideña";
        mostrarBadge("Modo Navidad", "fas fa-snowflake", "text-red-400");
    } else if (month === 9) { 
        body.classList.add('theme-halloween');
        currentThemeColor = 'rgba(249, 115, 22, 0.2)';
        particleMode = 'emoji';
        particleEmoji = '🎃';
        document.title = "👻 Devinson | ¿Dulce o Truco?";
        mostrarBadge("Modo Halloween", "fas fa-ghost", "text-orange-400");
    } else if (month === 8 || month === 1) { 
        body.classList.add('theme-love');
        currentThemeColor = 'rgba(236, 72, 153, 0.2)';
        particleMode = 'emoji';
        particleEmoji = '❤️';
        document.title = "❤️ Devinson | Hecho con Pasión";
        mostrarBadge("Modo Amor", "fas fa-heart", "text-pink-400");
    } else if (month === 6 && (day >= 15 && day <= 25)) { 
        body.classList.add('theme-colombia');
        currentThemeColor = 'rgba(234, 179, 8, 0.2)';
        particleMode = 'colombia';
        document.title = "🇨🇴 Devinson | Orgullo Colombiano";
        mostrarBadge("¡Viva Colombia!", "fas fa-flag", "text-yellow-400");
    }
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

detectarTemporada();

// ============================================
// 1. MENU HAMBURGUESA MEJORADO
// ============================================
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
let isMenuOpen = false;

if (menuBtn) {
    menuBtn.addEventListener('click', toggleMenu);
}

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if(isMenuOpen) {
        mobileMenu.classList.add('open');
        menuBtn.classList.add('active'); // Animación de X
        document.body.style.overflow = 'hidden'; // Evitar scroll
    } else {
        mobileMenu.classList.remove('open');
        menuBtn.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll
    }
}

// Cerrar menú al clickear enlace
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        if(isMenuOpen) toggleMenu();
    });
});

// ============================================
// 2. PARTICLES NETWORK
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
    const colombiaColors = ['#FCD116', '#003893', '#CE1126'];

    for(let i=0; i<count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2,
            colombiaColor: particleMode === 'colombia' ? colombiaColors[Math.floor(Math.random() * colombiaColors.length)] : null
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = currentThemeColor; 
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';

    particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if(p.x < 0) p.x = width;
        if(p.x > width) p.x = 0;
        if(p.y < 0) p.y = height;
        if(p.y > height) p.y = 0;

        if (particleMode === 'emoji') {
            ctx.font = "20px serif";
            ctx.fillText(particleEmoji, p.x, p.y);
        } else if (particleMode === 'colombia') {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI*2);
            ctx.fillStyle = p.colombiaColor;
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.fill();
        }

        if (particleMode !== 'emoji') {
            for(let j=i+1; j<particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if(dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = particleMode === 'colombia' ? 'rgba(255,255,255,0.1)' : currentThemeColor;
                    ctx.stroke();
                }
            }
        }
    });
    requestAnimationFrame(animateParticles);
}
resize();
animateParticles();

// ============================================
// 3. EFECTO TYPEWRITER (NUEVO)
// ============================================
const typeWriterElement = document.getElementById('typewriter-text');
const phrases = ["Inteligencia Artificial", "Automatización", "Chatbots Avanzados", "E-commerce Global"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriterEffect() {
    if (!typeWriterElement) return;
    
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typeWriterElement.innerText = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeWriterElement.innerText = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => isDeleting = true, 2000); // Esperar antes de borrar
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(typeWriterEffect, speed);
}

// Iniciar efecto de escritura
document.addEventListener('DOMContentLoaded', typeWriterEffect);


// ============================================
// 4. SCROLL REVEAL & 3D
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
        if(shine) shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.25) 0%, transparent 80%)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
        if(shine) shine.style.background = 'transparent';
    });
}

// ============================================
// 5. COTIZADOR & IA
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
    
    dynamicContainer.innerHTML = '';
    aiSummaryForWhatsapp = "";
    document.getElementById('check-pagos').checked = false;
    document.getElementById('check-chatbot').checked = false;
    document.getElementById('check-pwa').checked = false;

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
        (La "Base Web" de 200.000 es obligatoria).
        Responde SOLO en JSON válido:
        {
            "explanation": "Texto breve explicando estrategia (Markdown).",
            "whatsapp_summary": "Hola Devinson, necesito: [Resumen corto].",
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

        contentDiv.innerHTML = marked.parse(aiResponse.explanation);
        aiSummaryForWhatsapp = aiResponse.whatsapp_summary;

        if(aiResponse.select_modules) {
            aiResponse.select_modules.forEach(modId => {
                const checkbox = document.getElementById(`check-${modId}`);
                if(checkbox) checkbox.checked = true;
            });
        }

        if(aiResponse.custom_modules && aiResponse.custom_modules.length > 0) {
            aiResponse.custom_modules.forEach((mod) => {
                const div = document.createElement('div');
                div.innerHTML = `
                <label class="flex items-center justify-between p-5 rounded-2xl bg-purple-900/10 border border-purple-500/30 hover:border-purple-500/50 cursor-pointer transition-all group active:scale-[0.99] ai-suggested animate-pulse">
                    <div class="flex items-center gap-4">
                        <div class="w-6 h-6 rounded-full border border-purple-500 flex items-center justify-center relative">
                            <input type="checkbox" checked data-name="${mod.name} (IA)" value="${mod.price}" onchange="calculateTotal()" class="opacity-0 absolute inset-0 cursor-pointer peer item-checkbox">
                            <div class="w-3 h-3 bg-purple-500 rounded-full opacity-100 transition-opacity"></div>
                        </div>
                        <div>
                            <span class="text-white font-medium group-hover:text-purple-400 transition-colors block">
                                ${mod.name} <span class="ai-badge">SUGERIDO IA</span>
                            </span>
                        </div>
                    </div>
                    <span class="font-mono text-purple-300">$${new Intl.NumberFormat('es-CO').format(mod.price)}</span>
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

function calculateTotal() {
    let total = 0;
    let selectedItems = [];
    const allCheckboxes = document.querySelectorAll('.item-checkbox');
    allCheckboxes.forEach(box => {
        if(box.checked) {
            total += parseInt(box.value);
            selectedItems.push(box.getAttribute('data-name'));
        }
    });
    
    const fmt = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(total);
    document.getElementById('total-display').innerText = fmt;
    
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

calculateTotal();
