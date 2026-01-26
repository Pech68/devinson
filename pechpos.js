import React, { useState, useEffect } from 'react';
import { 
  Store, ShoppingCart, BarChart3, Users, 
  CheckCircle, Zap, Shield, Smartphone, 
  ArrowRight, Menu, X, LayoutDashboard, MessageCircle,
  Star, HelpCircle, ChevronDown, ChevronUp, Globe, CreditCard, Lock
} from 'lucide-react';

const PechPOSApp = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [pricingMode, setPricingMode] = useState('fe'); // 'fe' = Facturación Electrónica, 'pos' = Gestión Interna

  // Función para redirigir al sistema principal
  const handleLoginRedirect = () => {
    window.location.href = 'https://pechpos.netlify.app/';
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleContact = () => {
    window.open('https://wa.me/573215203354', '_blank');
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 scroll-smooth selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl border-b border-gray-100 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo con Imagen solicitada */}
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="relative h-12 w-auto overflow-hidden rounded-lg">
                <img 
                  src="https://i.imgur.com/HNQr8IZ.png" 
                  alt="PechPOS Logo" 
                  className="h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 hidden sm:block">
                PechPOS
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('features')} className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors">Módulos</button>
              <button onClick={() => scrollToSection('pricing')} className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors">Planes</button>
              <button onClick={() => scrollToSection('faq')} className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors">Preguntas</button>
              <button onClick={handleContact} className="text-sm font-bold text-gray-600 hover:text-green-600 transition flex items-center gap-2">
                <MessageCircle size={18} /> Contacto
              </button>
              <button 
                onClick={handleLoginRedirect}
                className="bg-gray-900 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all transform hover:scale-105 shadow-lg active:scale-95"
              >
                Ingresar / Registro
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-600 hover:text-indigo-600 transition">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t p-4 space-y-2 shadow-2xl absolute w-full animate-in slide-in-from-top duration-300">
            <button onClick={() => scrollToSection('features')} className="block w-full text-left py-4 px-4 hover:bg-gray-50 rounded-xl font-semibold text-gray-700">Módulos</button>
            <button onClick={() => scrollToSection('pricing')} className="block w-full text-left py-4 px-4 hover:bg-gray-50 rounded-xl font-semibold text-gray-700">Planes</button>
            <button onClick={() => scrollToSection('faq')} className="block w-full text-left py-4 px-4 hover:bg-gray-50 rounded-xl font-semibold text-gray-700">Preguntas</button>
            <button onClick={handleContact} className="block w-full text-left py-4 px-4 hover:bg-green-50 rounded-xl font-semibold text-green-600">WhatsApp</button>
            <div className="pt-4">
              <button onClick={handleLoginRedirect} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-center shadow-xl shadow-indigo-100">
                Ingresar al Sistema
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 px-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-indigo-100 text-indigo-700 rounded-full text-sm font-bold shadow-sm hover:shadow-md transition-shadow cursor-default">
              <Zap size={16} fill="currentColor" className="text-yellow-400" /> ¡Nuevo! Facturación Electrónica DIAN Integrada
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-tight text-gray-900 tracking-tight">
              Tu negocio, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">
                al siguiente nivel
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              PechPOS unifica tus ventas, inventario, mesas y facturación en una plataforma hermosa y fácil de usar. Deja de sufrir con Excel y libretas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={handleLoginRedirect} className="px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-extrabold text-lg shadow-2xl shadow-indigo-200 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
                Prueba Gratis <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-sm font-bold text-gray-500">
              <span className="flex items-center gap-1.5"><CheckCircle size={18} className="text-green-500"/> Sin contratos</span>
              <span className="flex items-center gap-1.5"><CheckCircle size={18} className="text-green-500"/> Activación inmediata</span>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
            <div className="relative transform transition-transform duration-700 hover:scale-[1.03]">
               <img 
                 src="https://i.imgur.com/RUm6BRn.png" 
                 alt="Dashboard PechPOS" 
                 className="relative z-10 rounded-3xl shadow-2xl border-4 border-white ring-1 ring-gray-100"
               />
               {/* Floating Badge */}
               <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-2xl border border-gray-100 hidden md:flex items-center gap-4 animate-bounce-slow">
                  <div className="bg-green-100 p-2.5 rounded-xl text-green-600"><CheckCircle size={24}/></div>
                  <div>
                     <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Estado DIAN</p>
                     <p className="text-sm font-extrabold text-gray-800">Factura Aprobada</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS STRIP --- */}
      <div className="bg-gray-900 text-white py-16 border-y border-gray-800">
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="space-y-2">
               <div className="text-4xl md:text-5xl font-black text-indigo-400">100%</div>
               <div className="text-sm text-gray-400 font-bold uppercase tracking-widest">Nube Segura</div>
            </div>
            <div className="space-y-2">
               <div className="text-4xl md:text-5xl font-black text-purple-400">+500</div>
               <div className="text-sm text-gray-400 font-bold uppercase tracking-widest">Negocios</div>
            </div>
            <div className="space-y-2">
               <div className="text-4xl md:text-5xl font-black text-blue-400">24/7</div>
               <div className="text-sm text-gray-400 font-bold uppercase tracking-widest">Acceso Total</div>
            </div>
            <div className="space-y-2">
               <div className="text-4xl md:text-5xl font-black text-green-400">0</div>
               <div className="text-sm text-gray-400 font-bold uppercase tracking-widest">Comisiones</div>
            </div>
         </div>
      </div>

      {/* --- FEATURES GRID --- */}
      <section id="features" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <span className="text-indigo-600 font-black tracking-widest uppercase text-xs px-4 py-1.5 bg-indigo-50 rounded-full">Características Potentes</span>
            <h2 className="text-4xl md:text-5xl font-black mb-8 mt-6 text-gray-900">Todo lo que necesitas para operar</h2>
            <p className="text-xl text-gray-500 leading-relaxed">Hemos simplificado la tecnología empresarial para que tú solo te preocupes por vender.</p>
          </div>

          <div className="space-y-40">
            
            {/* Feature 1: POS */}
            <div className="flex flex-col lg:flex-row items-center gap-20 group">
              <div className="lg:w-1/2 order-2 lg:order-1 relative">
                <div className="absolute inset-0 bg-indigo-600 rounded-3xl blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <img src="https://i.imgur.com/8c1Kcs3.png" className="relative rounded-3xl shadow-2xl border border-gray-100 transform transition-all duration-500 group-hover:scale-[1.02] group-hover:-rotate-1" alt="POS System" />
              </div>
              <div className="lg:w-1/2 order-1 lg:order-2 space-y-8">
                <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center text-indigo-600 shadow-inner">
                  <LayoutDashboard size={40} />
                </div>
                <div>
                   <h3 className="text-3xl md:text-4xl font-black mb-6">Punto de Venta Ágil (POS)</h3>
                   <p className="text-lg text-gray-600 leading-relaxed">
                     Registra ventas en segundos. Compatible con lectores de código de barras, impresoras térmicas y cajones monedero. Tu personal aprenderá a usarlo en menos de 5 minutos.
                   </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['Interfaz Táctil', 'Multi-cajero', 'Búsqueda Rápida', 'Soporte Offline'].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-indigo-200 transition-colors">
                       <CheckCircle className="text-green-500 shrink-0" size={20}/> <span className="text-sm font-bold text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature 2: Restaurant */}
            <div className="flex flex-col lg:flex-row items-center gap-20 group">
              <div className="lg:w-1/2 space-y-8">
                <div className="w-20 h-20 bg-orange-100 rounded-3xl flex items-center justify-center text-orange-600 shadow-inner">
                  <Store size={40} />
                </div>
                <div>
                   <h3 className="text-3xl md:text-4xl font-black mb-6">Modo Restaurante & Mesas</h3>
                   <p className="text-lg text-gray-600 leading-relaxed">
                     Perfecto para bares, cafés y restaurantes. Gestiona tu salón visualmente, toma pedidos por mesa, añade notas a cocina y divide cuentas sin dolor de cabeza.
                   </p>
                </div>
                <ul className="space-y-5">
                  <li className="flex items-center gap-4 text-gray-700 font-semibold">
                     <div className="bg-orange-100 p-2 rounded-xl text-orange-600"><CheckCircle size={20}/></div> 
                     <span>Mapa de mesas interactivo en tiempo real</span>
                  </li>
                  <li className="flex items-center gap-4 text-gray-700 font-semibold">
                     <div className="bg-orange-100 p-2 rounded-xl text-orange-600"><CheckCircle size={20}/></div> 
                     <span>Traslado de mesas y unión de cuentas</span>
                  </li>
                </ul>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="absolute inset-0 bg-orange-500 rounded-3xl blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <img src="https://i.imgur.com/cpvru8p.png" className="relative rounded-3xl shadow-2xl border border-gray-100 transform transition-all duration-500 group-hover:scale-[1.02] group-hover:rotate-1" alt="Restaurant Mode" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="pricing" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-black tracking-widest uppercase text-xs px-4 py-1.5 bg-indigo-50 rounded-full">Inversión Inteligente</span>
            <h2 className="text-4xl md:text-5xl font-black mb-6 mt-6">Planes Transparentes</h2>
            <p className="text-xl text-gray-500">Sin costos ocultos ni letras pequeñas.</p>
          </div>

          {/* Toggle de Planes */}
          <div className="flex justify-center mb-16">
             <div className="bg-white p-2 rounded-2xl inline-flex relative shadow-xl border border-gray-100">
                <button 
                  onClick={() => setPricingMode('fe')}
                  className={`px-8 py-3.5 rounded-xl text-sm font-black transition-all duration-300 ${pricingMode === 'fe' ? 'bg-indigo-600 text-white shadow-xl transform scale-105' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  Facturación Electrónica
                </button>
                <button 
                  onClick={() => setPricingMode('pos')}
                  className={`px-8 py-3.5 rounded-xl text-sm font-black transition-all duration-300 ${pricingMode === 'pos' ? 'bg-indigo-600 text-white shadow-xl transform scale-105' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  Gestión Interna (POS)
                </button>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* PLAN BÁSICO */}
            <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 flex flex-col hover:border-indigo-300 transition-all shadow-sm hover:shadow-2xl">
              <div className="mb-10">
                <span className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Emprendedor</span>
                <h3 className="text-3xl font-black mt-4 text-gray-900">{pricingMode === 'fe' ? 'FE - Básico' : 'POS - Básico'}</h3>
                <div className="mt-6 flex items-baseline">
                  <span className="text-5xl font-black text-gray-900">{pricingMode === 'fe' ? '$75.000' : '$35.000'}</span>
                  <span className="ml-2 text-gray-400 font-bold">/ mes</span>
                </div>
              </div>
              <ul className="space-y-5 mb-12 flex-1">
                <li className="flex items-center gap-4 text-gray-600 font-semibold"><Users size={20} className="text-indigo-600"/> 3 Empleados</li>
                <li className="flex items-center gap-4 text-gray-600 font-semibold"><CheckCircle size={20} className="text-green-500"/> {pricingMode === 'fe' ? '100 docs / mes' : 'Caja e Inventario'}</li>
                <li className="flex items-center gap-4 text-gray-300 line-through font-semibold"><X size={20}/> Sin Tienda Virtual</li>
              </ul>
              <button onClick={handleLoginRedirect} className="w-full py-4 rounded-2xl border-2 border-gray-100 text-gray-900 font-black hover:border-indigo-600 hover:text-indigo-600 transition-all active:scale-95">
                Elegir Plan
              </button>
            </div>

            {/* PLAN PLUS (POPULAR) */}
            <div className="bg-white rounded-[2.5rem] p-10 border-2 border-indigo-600 flex flex-col relative shadow-2xl transform md:scale-105 z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-black px-6 py-2 rounded-full tracking-widest shadow-xl">RECOMENDADO</div>
              <div className="mb-10">
                <span className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Crecimiento</span>
                <h3 className="text-3xl font-black mt-4 text-gray-900">{pricingMode === 'fe' ? 'FE - Plus' : 'POS - Plus'}</h3>
                <div className="mt-6 flex items-baseline">
                  <span className="text-5xl font-black text-gray-900">{pricingMode === 'fe' ? '$100.000' : '$50.000'}</span>
                  <span className="ml-2 text-gray-400 font-bold">/ mes</span>
                </div>
              </div>
              <ul className="space-y-5 mb-12 flex-1">
                <li className="flex items-center gap-4 text-gray-600 font-semibold"><Users size={20} className="text-indigo-600"/> 5 Empleados</li>
                <li className="flex items-center gap-4 text-gray-600 font-semibold"><CheckCircle size={20} className="text-green-500"/> {pricingMode === 'fe' ? '300 docs / mes' : 'Gestión Avanzada'}</li>
                <li className="flex items-center gap-4 text-gray-600 font-semibold"><Smartphone size={20} className="text-indigo-600"/> Soporte Prioritario</li>
              </ul>
              <button onClick={handleLoginRedirect} className="w-full py-5 rounded-2xl bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95">
                Elegir Plan Plus
              </button>
            </div>

            {/* PLAN PRO */}
            <div className="bg-gray-900 rounded-[2.5rem] p-10 flex flex-col text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="mb-10 relative z-10">
                <span className="bg-white/10 text-indigo-300 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Corporativo</span>
                <h3 className="text-3xl font-black mt-4">{pricingMode === 'fe' ? 'FE - PRO' : 'POS - PRO'}</h3>
                <div className="mt-6 flex items-baseline">
                  <span className="text-5xl font-black">{pricingMode === 'fe' ? '$150.000' : '$80.000'}</span>
                  <span className="ml-2 text-gray-500 font-bold">/ mes</span>
                </div>
              </div>
              <ul className="space-y-5 mb-12 flex-1 relative z-10">
                <li className="flex items-center gap-4 text-gray-300 font-semibold"><Users size={20} className="text-indigo-400"/> 8 Empleados</li>
                <li className="flex items-center gap-4 text-gray-300 font-semibold"><CheckCircle size={20} className="text-green-400"/> {pricingMode === 'fe' ? 'Ilimitado (1000 docs)' : 'Control de Sedes'}</li>
                <li className="flex items-center gap-4 text-white font-black bg-white/10 p-4 rounded-2xl border border-white/10">
                  <Smartphone size={20} className="text-green-400 shrink-0"/> SÍ Tienda Virtual
                </li>
              </ul>
              <button onClick={handleLoginRedirect} className="w-full py-4 rounded-2xl bg-white text-gray-900 font-black hover:bg-indigo-50 transition-all relative z-10 active:scale-95">
                Elegir Plan PRO
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-32 bg-white">
        <div className="max-w-3xl mx-auto px-4">
           <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-6">Preguntas Frecuentes</h2>
              <p className="text-lg text-gray-500">Resolvemos tus dudas antes de empezar.</p>
           </div>
           <div className="space-y-4">
             {[
               {q: "¿Necesito comprar equipos especiales?", a: "No. PechPOS funciona en cualquier computador, tablet o celular con navegador. Compatible con la mayoría de lectores de códigos e impresoras USB/Bluetooth del mercado."},
               {q: "¿Qué pasa si se va el internet?", a: "El sistema requiere internet para sincronizar datos y facturar a la DIAN. En caso de caída, los datos se mantienen seguros en el navegador hasta que vuelvas a conectar."},
               {q: "¿La facturación electrónica tiene costo extra?", a: "No. Los planes incluyen el paquete de documentos indicado. Solo pagas la mensualidad fija del software."},
               {q: "¿Puedo cambiar de plan después?", a: "Sí, puedes mejorar o reducir tu plan en cualquier momento desde tu panel de administración o contactando a soporte."},
               {q: "¿Mis datos están seguros?", a: "Totalmente. Usamos infraestructura de Google Cloud con encriptación SSL de 256 bits y respaldos automáticos diarios."}
             ].map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 transition-all hover:border-indigo-100 shadow-sm">
                   <button 
                     onClick={() => toggleFaq(i)}
                     className="w-full flex justify-between items-center p-6 text-left font-extrabold text-gray-800 hover:text-indigo-600 transition"
                   >
                      <span className="pr-4">{item.q}</span>
                      {openFaq === i ? <ChevronUp size={20} className="text-indigo-600 shrink-0"/> : <ChevronDown size={20} className="text-gray-400 shrink-0"/>}
                   </button>
                   {openFaq === i && (
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed animate-in fade-in duration-300">
                         {item.a}
                      </div>
                   )}
                </div>
             ))}
           </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 bg-indigo-600 relative overflow-hidden group">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">
            ¿Listo para ordenar tu negocio?
          </h2>
          <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto font-medium">
            Únete a los empresarios que tomaron el control de sus ventas. Empieza hoy mismo y recibe la aprobación en minutos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button onClick={handleLoginRedirect} className="w-full sm:w-auto px-12 py-6 bg-white text-indigo-600 rounded-[2rem] font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all">
              Crear mi Cuenta Gratis
            </button>
            <button onClick={handleContact} className="w-full sm:w-auto px-12 py-6 bg-indigo-500 text-white rounded-[2rem] font-black text-xl hover:bg-indigo-400 transition-all flex items-center justify-center gap-3">
               <MessageCircle size={24}/> Chatear ahora
            </button>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-gray-900 text-gray-400 py-20 border-t border-white/5">
         <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
               <div className="col-span-1 md:col-span-2 space-y-8">
                  <div className="flex items-center gap-3">
                     <div className="bg-indigo-600 p-2.5 rounded-xl shadow-xl shadow-indigo-900/20">
                        <img src="https://i.imgur.com/HNQr8IZ.png" alt="PechPOS" className="h-8 w-auto filter invert brightness-200" />
                     </div>
                     <span className="text-3xl font-black text-white tracking-tighter">PechPOS</span>
                  </div>
                  <p className="text-gray-500 text-lg max-w-sm leading-relaxed">
                     El sistema de punto de venta en la nube diseñado para hacer crecer los negocios en Colombia. Simple, potente y seguro.
                  </p>
               </div>
               
               <div>
                  <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Producto</h4>
                  <ul className="space-y-5 font-bold">
                     <li><button onClick={() => scrollToSection('features')} className="hover:text-indigo-400 transition-colors">Características</button></li>
                     <li><button onClick={() => scrollToSection('pricing')} className="hover:text-indigo-400 transition-colors">Precios</button></li>
                     <li><button onClick={() => scrollToSection('faq')} className="hover:text-indigo-400 transition-colors">Preguntas</button></li>
                     <li><button onClick={handleLoginRedirect} className="hover:text-indigo-400 transition-colors">Ingresar</button></li>
                  </ul>
               </div>

               <div>
                  <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Legal</h4>
                  <ul className="space-y-5 font-bold">
                     <li><a href="#" className="hover:text-indigo-400 transition-colors">Términos</a></li>
                     <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacidad</a></li>
                     <li><a href="#" className="hover:text-indigo-400 transition-colors">Cookies</a></li>
                  </ul>
               </div>
            </div>

            <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
               <div className="text-sm font-bold text-gray-600">
                  © {new Date().getFullYear()} PechPOS Inc. Todos los derechos reservados.
               </div>
               <div className="text-sm flex items-center gap-3">
                  <span className="font-bold text-gray-600">Desarrollado por</span>
                  <a href="https://devinson.lat" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-white font-black bg-indigo-950/50 px-5 py-2 rounded-full border border-indigo-500/20 transition-all hover:bg-indigo-600">
                     Devinson Rodriguez
                  </a>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default PechPOSApp;
