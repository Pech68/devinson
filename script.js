const apiKey = "AIzaSyBdaivnoeGHO4gM8V2HGckDu6T2XApKlZM"; // <--- AQUÍ VA TU LLAVE

let aiSummaryForWhatsapp = ""; // Variable para guardar el resumen corto

// 1. MENU HAMBURGUESA LOGIC
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = menuBtn.querySelector('i');
let isMenuOpen = false;

menuBtn.addEventListener('click', toggleMenu);

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

// 2. PARTICLES NETWORK (Canvas Dinámico)
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
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)'; 
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

// 3. SCROLL REVEAL (Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 4. TILT EFFECT 3D
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
        shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.25) 0%, transparent 80%)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
        shine.style.background = 'transparent';
    });
}

// 5. IA CONSULTANT
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
    aiSummaryForWhatsapp = ""; // Reset summary

    // Resetear checkboxes (menos base)
    document.getElementById('check-pagos').checked = false;
    document.getElementById('check-chatbot').checked = false;
    document.getElementById('check-pwa').checked = false;


    if (!apiKey || apiKey === "PEGAR_TU_API_KEY_AQUI") {
        // Fallback Simulado
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
        // Prompt estructurado para JSON
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
        3. SI el usuario pide algo complejo que NO está en los módulos estándar (ej: GPS en tiempo real, Sistema de reservas complejo, Dashboard de analítica avanzada), CREA un módulo personalizado.
        4. Genera un resumen MUY BREVE y directo para WhatsApp (primera persona del cliente).
        
        Responde SOLO en formato JSON válido:
        {
            "explanation": "Texto breve explicando tu estrategia al usuario (usa Markdown).",
            "whatsapp_summary": "Hola Devinson, necesito: [Resumen ultra corto].",
            "select_modules": ["pagos", "pwa"], // Array con los IDs que apliquen
            "custom_modules": [ // Opcional, solo si es necesario
                {"name": "Nombre Módulo Extra", "price": 500000} 
            ]
        }
        `;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: systemPrompt }]
                }],
                generationConfig: {
                    responseMimeType: "application/json"
                }
            })
        });
        
        const data = await response.json();
        
        if(data.error) throw new Error(data.error.message);

        const aiResponse = JSON.parse(data.candidates[0].content.parts[0].text);

        // 1. Mostrar explicación visual
        contentDiv.innerHTML = marked.parse(aiResponse.explanation);
        
        // 2. Guardar resumen para WhatsApp
        aiSummaryForWhatsapp = aiResponse.whatsapp_summary;

        // 3. Marcar checkboxes automáticamente
        if(aiResponse.select_modules) {
            aiResponse.select_modules.forEach(modId => {
                const checkbox = document.getElementById(`check-${modId}`);
                if(checkbox) checkbox.checked = true;
            });
        }

        // 4. Crear módulos dinámicos si existen
        if(aiResponse.custom_modules && aiResponse.custom_modules.length > 0) {
            aiResponse.custom_modules.forEach((mod, index) => {
                const div = document.createElement('div');
                // HTML del nuevo módulo
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

        // 5. Recalcular total
        calculateTotal();
        
    } catch (error) {
        console.error(error);
        contentDiv.innerHTML = `<span class="text-red-400">Error de conexión. Intenta de nuevo.</span>`;
    } finally {
        btn.innerHTML = originalContent;
        btn.disabled = false;
    }
}

// 6. COTIZADOR INTELIGENTE (Actualizado)
function calculateTotal() {
    let total = 0;
    let selectedItems = [];
    
    // Buscar TODOS los checkboxes (incluyendo los dinámicos creados por IA)
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
        // Si la IA generó un resumen, usar ese como base
        message = `${aiSummaryForWhatsapp}\n\n*Detalle Técnico Seleccionado:*\n${selectedItems.map(i => `• ${i}`).join('\n')}\n\n*Presupuesto Estimado:* ${fmt}`;
    } else {
        // Fallback manual
        const itemsString = selectedItems.join(' + ');
        message = `Hola Devinson, me interesa cotizar: [ ${itemsString} ]. El presupuesto estimado en web es ${fmt}.`;
    }
    
    const btn = document.getElementById('btn-cotizar');
    btn.href = `https://wa.me/573215203354?text=${encodeURIComponent(message)}`;
}

// Ejecutar al inicio para sumar la base
calculateTotal();
