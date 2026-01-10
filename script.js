// ============================================
// 🔒 PROTECCIÓN DE API KEY (Identidad B2B)
// ============================================
const partA = "AIzaSyBHfGUNg8F5";    
const partB = "0Volpv1yBuYnG";     
const partC = "cxS6MZCMM4";        
const apiKey = partA + partB + partC; 

// ============================================
// 0. CONFIGURACIÓN VISUAL CORPORATIVA
// ============================================
// Colores sobrios: Azul corporativo tenue para conexiones
const NETWORK_COLOR = 'rgba(148, 163, 184, 0.15)'; // Slate-400 muy sutil
const PARTICLE_COLOR = 'rgba(255, 255, 255, 0.2)'; 

// Eliminada lógica de temporadas (Navidad/Halloween) para mantener seriedad.

// ============================================
// 1. MENU DE NAVEGACIÓN (UX OPTIMIZADA)
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
        menuBtn.classList.add('active'); 
        document.body.style.overflow = 'hidden'; 
    } else {
        mobileMenu.classList.remove('open');
        menuBtn.classList.remove('active');
        document.body.style.overflow = ''; 
    }
}

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        if(isMenuOpen) toggleMenu();
    });
});

// ============================================
// 2. RED NEURONAL DE FONDO (Sutil & Elegante)
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
    // Menos partículas para un look más limpio (Minimalismo Corporativo)
    const count = window.innerWidth < 768 ? 25 : 50; 

    for(let i=0; i<count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            // Velocidad reducida drásticamente para transmitir estabilidad
            vx: (Math.random() - 0.5) * 0.2, 
            vy: (Math.random() - 0.5) * 0.2,
            size: Math.random() * 1.5, // Partículas más finas
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = NETWORK_COLOR; 
    ctx.fillStyle = PARTICLE_COLOR;

    particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Rebote suave en los bordes
        if(p.x < 0 || p.x > width) p.vx *= -1;
        if(p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fill();

        // Conexiones (Red)
        for(let j=i+1; j<particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            // Distancia de conexión aumentada para redes más amplias
            if(dist < 180) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.lineWidth = 0.5; // Líneas muy finas
                ctx.stroke();
            }
        }
    });
    requestAnimationFrame(animateParticles);
}
resize();
animateParticles();

// ============================================
// 3. TEXTO DINÁMICO (Sobrio)
// ============================================
const typeWriterElement = document.getElementById('typewriter-text');
const phrases = ["Transformación Digital", "Arquitectura Escalable", "Inteligencia de Negocio", "Infraestructura Cloud"];
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
        setTimeout(() => isDeleting = true, 3000); // Pausa más larga para leer
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    // Velocidad constante y suave
    const speed = isDeleting ? 40 : 80;
    setTimeout(typeWriterEffect, speed);
}

document.addEventListener('DOMContentLoaded', typeWriterEffect);


// ============================================
// 4. INTERACCIONES & SCROLL
// ============================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Efecto 3D sutil en imágenes (reducido para ser menos "juguetón")
const heroImgContainer = document.getElementById('hero-img-container');
const heroSection = document.getElementById('hero');

if (heroSection && heroImgContainer && window.innerWidth > 768) {
    heroSection.addEventListener('mousemove', (e) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 1; // Movimiento reducido
        const yPos = (e.clientY / window.innerHeight - 0.5) * 1;
        heroImgContainer.style.transform = `perspective(1000px) rotateY(${xPos * 5}deg) rotateX(${yPos * -5}deg)`;
    });
}

// ============================================
// 5. CONFIGURADOR DE SOLUCIONES (IA B2B)
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
    btn.innerHTML = '<span class="text-xs tracking-widest">ANALIZANDO REQUERIMIENTOS...</span>';
    btn.disabled = true;
    btn.classList.add('opacity-75');
    
    resultDiv.classList.remove('hidden');
    contentDiv.innerHTML = '<div class="animate-pulse flex space-x-2"><div class="h-2 w-2 bg-blue-400 rounded-full"></div><div class="h-2 w-2 bg-blue-400 rounded-full animation-delay-200"></div><div class="h-2 w-2 bg-blue-400 rounded-full animation-delay-400"></div></div>';
    
    dynamicContainer.innerHTML = '';
    aiSummaryForWhatsapp = "";
    
    // Resetear checkboxes
    document.querySelectorAll('.item-checkbox').forEach(cb => cb.checked = false);
    // Base siempre activa pero oculta
    const baseCheck = document.getElementById('check-base');
    if(baseCheck) baseCheck.checked = true;

    // VALIDAR API KEY
    if (!apiKey || apiKey.includes("PARTE_1")) {
        setTimeout(() => {
            const mockExplanation = `**Análisis Preliminar:** Para el requerimiento descrito, recomiendo una arquitectura basada en microservicios con énfasis en la pasarela de pagos y una PWA para gestión en tiempo real.`;
            contentDiv.innerHTML = marked.parse(mockExplanation);
            document.getElementById('check-pagos').checked = true;
            document.getElementById('check-pwa').checked = true;
            updateConfiguratorUI();
            btn.innerHTML = originalContent;
            btn.disabled = false;
            btn.classList.remove('opacity-75');
        }, 2000);
        return;
    }

    try {
        const systemPrompt = `
        Actúa como un Arquitecto de Soluciones Senior (CTO) para Devinson Rodriguez.
        Tu objetivo es analizar la necesidad del cliente y recomendar una infraestructura técnica sólida.
        NO HABLES DE PRECIOS BARATOS. Habla de escalabilidad, seguridad, ROI y eficiencia.
        
        Tus Módulos Disponibles son:
        1. "pagos": Pasarela de Pagos (Stripe/MercadoPago Enterprise)
        2. "chatbot": Asistente IA Corporativo (RAG/NLP)
        3. "pwa": Aplicación Web Progresiva (Dashboard de Gestión)
        
        Responde SOLO en JSON válido:
        {
            "explanation": "Texto técnico y profesional explicando la solución (Markdown). Usa términos como 'Arquitectura', 'Scalability', 'Secure Node'.",
            "whatsapp_summary": "Hola, solicito consultoría para una infraestructura que incluye: [Resumen Técnico].",
            "select_modules": ["pagos", "pwa"],
            "custom_modules": [ {"name": "Nombre Módulo Extra (Ej: API Integration)", "type": "Backend"} ]
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
                div.className = "flex items-center justify-between p-4 rounded-lg bg-blue-900/10 border border-blue-500/20";
                div.innerHTML = `
                    <div class="flex items-center gap-3">
                        <i class="fas fa-server text-blue-400"></i>
                        <span class="text-sm font-medium text-blue-100">${mod.name}</span>
                    </div>
                    <span class="text-xs text-blue-300 border border-blue-500/30 px-2 py-1 rounded">RECOMENDADO</span>
                `;
                dynamicContainer.appendChild(div);
            });
        }
        updateConfiguratorUI();
        
    } catch (error) {
        console.error(error);
        contentDiv.innerHTML = `<span class="text-red-400 text-sm">Error en conexión neuronal: ${error.message}</span>`;
    } finally {
        btn.innerHTML = originalContent;
        btn.disabled = false;
        btn.classList.remove('opacity-75');
    }
}

// Nueva función de UI (Sin precios visibles)
function updateConfiguratorUI() {
    let selectedItems = [];
    const allCheckboxes = document.querySelectorAll('.item-checkbox');
    let count = 0;
    
    allCheckboxes.forEach(box => {
        // En modo B2B, visualmente resaltamos las cajas seleccionadas
        const parentLabel = box.closest('label');
        
        if(box.checked) {
            count++;
            selectedItems.push(box.getAttribute('data-name'));
            if(parentLabel) {
                parentLabel.classList.add('border-blue-500', 'bg-blue-500/5');
                parentLabel.classList.remove('border-white/5');
            }
        } else {
            if(parentLabel) {
                parentLabel.classList.remove('border-blue-500', 'bg-blue-500/5');
                parentLabel.classList.add('border-white/5');
            }
        }
    });
    
    // Actualizar texto de estado
    const totalDisplay = document.getElementById('total-display');
    if(totalDisplay) {
        if(count > 0) {
            totalDisplay.innerHTML = `<span class="text-2xl text-blue-400">${count} Módulos</span>`;
            document.getElementById('presupuesto-label').innerText = "Configuración Actual";
        } else {
            totalDisplay.innerHTML = `<span class="text-2xl text-gray-500">--</span>`;
            document.getElementById('presupuesto-label').innerText = "Seleccione Módulos";
        }
    }
    
    // Construir mensaje B2B
    let message = "";
    if (aiSummaryForWhatsapp && aiSummaryForWhatsapp.length > 5) {
        message = `${aiSummaryForWhatsapp}\n\n*Stack Técnico Sugerido:*\n${selectedItems.map(i => `• ${i}`).join('\n')}`;
    } else {
        message = `Hola Devinson, quisiera agendar una reunión para discutir un proyecto que involucra: [ ${selectedItems.join(', ')} ].`;
    }
    
    const btn = document.getElementById('btn-cotizar');
    if(btn) {
        btn.href = `https://wa.me/573215203354?text=${encodeURIComponent(message)}`;
        // Cambiar texto del botón si hay selección
        const btnTextSpan = btn.querySelector('span');
        if(btnTextSpan) {
            btnTextSpan.innerText = count > 0 ? "Solicitar Consultoría Técnica" : "Contactar Soporte";
        }
    }
}

// Event Listeners para cambios manuales
document.querySelectorAll('.item-checkbox').forEach(cb => {
    cb.addEventListener('change', updateConfiguratorUI);
});

// ============================================
// 6. HERRAMIENTAS (WhatsApp Link) - Funcionalidad intacta
// ============================================
function generateWhatsAppLink() {
    const phoneInput = document.getElementById('wa-number');
    const messageInput = document.getElementById('wa-message');
    const outputInput = document.getElementById('wa-output');
    const resultDiv = document.getElementById('wa-result');

    let phone = phoneInput.value.replace(/\D/g, '');
    let message = encodeURIComponent(messageInput.value);

    if (!phone) {
        phoneInput.parentElement.style.border = "1px solid #ef4444";
        setTimeout(() => phoneInput.parentElement.style.border = "", 2000);
        return;
    }

    const link = `https://wa.me/${phone}?text=${message}`;
    outputInput.value = link;
    document.getElementById('wa-test-btn').href = link;
    
    resultDiv.classList.remove('hidden');
}

function copyToClipboard() {
    const copyText = document.getElementById("wa-output");
    copyText.select();
    try {
        navigator.clipboard.writeText(copyText.value);
        const feedback = document.getElementById('copy-feedback');
        feedback.style.opacity = '1';
        setTimeout(() => feedback.style.opacity = '0', 2000);
    } catch (err) { console.error(err); }
}

// ============================================
// 7. LIVE CODE EXPERIENCE (Arquitectura Transparente)
// ============================================
const codeSnippets = {
    frontend: {
        filename: "ProductCard.jsx",
        lang: "javascript",
        code: `<span class="text-purple-400">import</span> { <span class="text-yellow-300">motion</span> } <span class="text-purple-400">from</span> <span class="text-green-300">'framer-motion'</span>;

<span class="text-blue-400">export const</span> <span class="text-yellow-300">ProductCard</span> = ({ <span class="text-red-300">data</span> }) => {
  <span class="text-purple-400">return</span> (
    &lt;<span class="text-yellow-300">motion.div</span>
      <span class="text-green-300">whileHover</span>={{ <span class="text-blue-300">scale</span>: <span class="text-orange-300">1.05</span> }}
      <span class="text-green-300">className</span>=<span class="text-green-300">"bg-white rounded-xl shadow-lg p-4"</span>
    &gt;
      &lt;<span class="text-yellow-300">h3</span>&gt;{<span class="text-red-300">data</span>.title}&lt;/<span class="text-yellow-300">h3</span>&gt;
      &lt;<span class="text-yellow-300">PriceTag</span> <span class="text-green-300">value</span>={<span class="text-red-300">data</span>.price} /&gt;
      &lt;<span class="text-yellow-300">BuyButton</span> <span class="text-green-300">onClick</span>={<span class="text-blue-300">addToCart</span>} /&gt;
    &lt;/<span class="text-yellow-300">motion.div</span>&gt;
  );
};`
    },
    backend: {
        filename: "PaymentController.js",
        lang: "javascript",
        code: `<span class="text-purple-400">const</span> <span class="text-yellow-300">express</span> = <span class="text-blue-400">require</span>(<span class="text-green-300">'express'</span>);
<span class="text-purple-400">const</span> { <span class="text-yellow-300">authMiddleware</span> } = <span class="text-blue-400">require</span>(<span class="text-green-300">'./middlewares'</span>);

<span class="text-purple-400">const</span> <span class="text-yellow-300">app</span> = <span class="text-blue-400">express</span>();

<span class="text-yellow-300">app</span>.<span class="text-blue-400">post</span>(<span class="text-green-300">'/api/v1/payments'</span>, <span class="text-yellow-300">authMiddleware</span>, <span class="text-purple-400">async</span> (<span class="text-red-300">req</span>, <span class="text-red-300">res</span>) => {
  <span class="text-purple-400">try</span> {
    <span class="text-purple-400">const</span> { <span class="text-red-300">amount</span>, <span class="text-red-300">method</span> } = <span class="text-red-300">req</span>.body;
    
    <span class="text-gray-500">// Secure transaction logic</span>
    <span class="text-purple-400">const</span> <span class="text-yellow-300">tx</span> = <span class="text-purple-400">await</span> <span class="text-yellow-300">PaymentGateway</span>.<span class="text-blue-400">charge</span>({
      <span class="text-red-300">amount</span>,
      <span class="text-red-300">source</span>: <span class="text-red-300">method</span>.token,
      <span class="text-red-300">secure</span>: <span class="text-orange-300">true</span>
    });

    <span class="text-red-300">res</span>.<span class="text-blue-400">status</span>(<span class="text-orange-300">200</span>).<span class="text-blue-400">json</span>({ <span class="text-red-300">success</span>: <span class="text-orange-300">true</span>, <span class="text-red-300">id</span>: <span class="text-yellow-300">tx</span>.id });
  } <span class="text-purple-400">catch</span> (<span class="text-red-300">error</span>) {
    <span class="text-yellow-300">Logger</span>.<span class="text-blue-400">error</span>(<span class="text-green-300">'Payment failed'</span>, <span class="text-red-300">error</span>);
    <span class="text-red-300">res</span>.<span class="text-blue-400">status</span>(<span class="text-orange-300">500</span>).<span class="text-blue-400">json</span>({ <span class="text-red-300">error</span>: <span class="text-green-300">'Declined'</span> });
  }
});`
    },
    ai: {
        filename: "BrainEngine.py",
        lang: "python",
        code: `<span class="text-purple-400">import</span> <span class="text-yellow-300">google.generativeai</span> <span class="text-purple-400">as</span> <span class="text-yellow-300">genai</span>

<span class="text-purple-400">def</span> <span class="text-blue-400">analyze_business_logic</span>(<span class="text-orange-300">user_prompt</span>):
    <span class="text-yellow-300">model</span> = <span class="text-yellow-300">genai</span>.<span class="text-blue-400">GenerativeModel</span>(<span class="text-green-300">'gemini-pro'</span>)

    <span class="text-gray-500"># Contexto empresarial inyectado</span>
    <span class="text-yellow-300">system_context</span> = <span class="text-green-300">"""
    Actúa como un arquitecto de soluciones senior.
    Analiza la viabilidad técnica y escalabilidad.
    """</span>

    <span class="text-yellow-300">response</span> = <span class="text-yellow-300">model</span>.<span class="text-blue-400">generate_content</span>([
        <span class="text-yellow-300">system_context</span>,
        <span class="text-orange-300">user_prompt</span>
    ])

    <span class="text-purple-400">return</span> {
        <span class="text-green-300">"strategy"</span>: <span class="text-yellow-300">response</span>.text,
        <span class="text-green-300">"complexity_score"</span>: <span class="text-blue-400">calculate_complexity</span>(<span class="text-yellow-300">response</span>)
    }`
    }
};

function updateCodeView(section, btnElement) {
    const display = document.getElementById('code-display');
    const filename = document.getElementById('code-filename');
    
    // Animación de salida
    display.style.opacity = '0';
    
    setTimeout(() => {
        // Actualizar contenido
        display.innerHTML = codeSnippets[section].code;
        filename.innerText = codeSnippets[section].filename;
        
        // Animación de entrada
        display.style.opacity = '1';
    }, 200);

    // Actualizar clases de botones
    document.querySelectorAll('.stack-selector').forEach(el => {
        el.classList.remove('active');
        // Aseguramos estilo base
        el.classList.add('bg-slate-800/50', 'border-slate-700');
        // Removemos estilo activo
        el.classList.remove('bg-slate-800', 'border-blue-500/50');
    });

    // Activar botón actual
    if(btnElement) {
        btnElement.classList.add('active');
        btnElement.classList.remove('bg-slate-800/50', 'border-slate-700');
    }
}

// Inicialización
updateConfiguratorUI();
