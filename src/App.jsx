import React, { useState, useEffect, useRef } from 'react';
import { Star, Shield, Clock, Sun, Moon, BookOpen, ChevronDown, Heart, Calendar, Code, Share2  } from 'lucide-react';
import PrayerCard from './components/prayerCard.jsx';
import HeroText from './components/heroCard.jsx';
import FeatureCard from './components/featureCard.jsx';
import { urlBase64ToUint8Array } from './utils/helpers.js';

function App() {
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [loadingDaily, setLoadingDaily] = useState(false);
  const [isDailySub, setIsDailySub] = useState(false); // État pour la carte Adhkar

  const [loadingFasting, setLoadingFasting] = useState(false);
  const [isFastingSub, setIsFastingSub] = useState(false);
  
  // Initialisation du thème
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('app-theme') || 'light';
    }
    return 'light';
  });
  
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const menuRef = useRef(null);

  // Gestion du clic extérieur pour le menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowThemeMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Application des classes globales (pour le scrollbar, body, etc.)
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'sepia-mode');
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'sepia') {
      root.classList.add('sepia-mode');
    }
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  // Styles du conteneur principal (Background global)
  const getThemeStyles = () => {
    switch(theme) {
      case 'dark': return 'bg-slate-950 text-gray-100'; // Plus sombre pour le contraste
      case 'sepia': return 'bg-[#f0e6d2] text-[#463a2a]'; // Couleur parchemin
      default: return 'bg-[#F5F5F7] text-gray-900'; // Clair standard
    }
  };

  // Styles de la Navbar
  const getNavbarStyles = () => {
    switch(theme) {
      case 'dark': return 'bg-slate-950/80 border-b border-white/10';
      case 'sepia': return 'bg-[#f0e6d2]/90 border-b border-[#d4c5a9]';
      default: return 'bg-[#F5F5F7]/90 border-b border-white';
    }
  };

 // --- LOGIQUE D'ABONNEMENT GÉNÉRIQUE ---
  const handleSubscribe = async (type) => {
    // 1. On active le chargement sur la bonne carte
    if (type === 'daily') setLoadingDaily(true);
    if (type === 'fasting') setLoadingFasting(true);
    
    setError('');

    try {
      if (!('serviceWorker' in navigator)) throw new Error("Non supporté");

      const register = await navigator.serviceWorker.register('/sw.js');
      await navigator.serviceWorker.ready;

      const vapidKey = import.meta.env.VITE_PUBLIC_VAPID_KEY;
      if (Notification.permission === 'default') {
        await Notification.requestPermission();
      }

      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey)
      });

      // 2. On envoie au backend le type spécifique ('daily' ou 'fasting')
      const response = await fetch('https://ton-api.onrender.com/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({ 
            subscription, 
            type: type // C'est ici qu'on dit au serveur quelle carte a été cliquée
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error('Erreur réseau');

      // 3. On met à jour l'état visuel de la bonne carte
      if (type === 'daily') {
          setIsDailySub(true);
          localStorage.setItem('sub-daily', 'true'); // On sauvegarde pour le rechargement de page
      } else {
          setIsFastingSub(true);
          localStorage.setItem('sub-fasting', 'true');
      }

    } catch (err) {
      console.error(err);
      setError('Erreur lors de l\'activation');
    } finally {
      setLoadingDaily(false);
      setLoadingFasting(false);
    }
  };

  // Au chargement, on vérifie le LocalStorage pour remettre les boutons "Verts" si déjà abonnés
  useEffect(() => {
      if (localStorage.getItem('sub-daily') === 'true') setIsDailySub(true);
      if (localStorage.getItem('sub-fasting') === 'true') setIsFastingSub(true);
  }, []);

  return (
    <div 
      className={`min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 pb-20 transition-colors duration-500 ${getThemeStyles()}`} 
      dir="rtl"
    >
      
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-md transition-colors duration-500 ${getNavbarStyles()}`}>
        <div className="max-w-5xl mx-auto p-4 flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img className='h-10 w-10' src={` ${theme === 'dark' ? './Logo.png' : theme === 'sepia' ? './Logo2.png' : './Logo.png'}`} alt="" />
           
            <span className="font-bold text-2xl tracking-tight">ذكـر</span>
          </div>
          
          {/* Theme Switcher */}
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className={`flex items-center gap-2 p-1.5 pr-3 rounded-full border transition-all duration-300
                ${theme === 'sepia' 
                  ? 'bg-[#e6dac0] border-[#d4c5a9] hover:bg-[#dbcca8]' 
                  : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:border-gray-300'}
              `}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm text-white transition-colors duration-300
                ${theme === 'light' ? 'bg-blue-500' : theme === 'dark' ? 'bg-indigo-500' : 'bg-[#8c7355]'}
              `}>
                 {theme === 'light' && <Sun size={16} />}
                 {theme === 'dark' && <Moon size={16} />}
                 {theme === 'sepia' && <BookOpen size={16} />}
              </div>
              <ChevronDown size={14} className="opacity-50" />
            </button>

            {/* Menu Déroulant */}
            {showThemeMenu && (
              <div className={`absolute top-full left-0 mt-2 w-48 rounded-2xl shadow-xl border overflow-hidden z-50 transform transition-all
                ${theme === 'sepia' 
                  ? 'bg-[#fcf7ec] border-[#d4c5a9]' 
                  : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700'}
              `}>
                <div className="p-2 space-y-1">
                  <button onClick={() => { setTheme('light'); setShowThemeMenu(false); }}
                    className={`w-full flex items-center gap-3 p-2 rounded-xl text-sm font-medium transition-colors
                      ${theme === 'light' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 dark:hover:bg-slate-700'}
                    `}>
                    <Sun size={18} /> <span>نهار (فاتح)</span>
                  </button>
                  
                  <button onClick={() => { setTheme('dark'); setShowThemeMenu(false); }}
                    className={`w-full flex items-center gap-3 p-2 rounded-xl text-sm font-medium transition-colors
                      ${theme === 'dark' ? 'bg-indigo-500/10 text-indigo-400' : 'hover:bg-gray-100 dark:hover:bg-slate-700'}
                    `}>
                    <Moon size={18} /> <span>ليل (داكن)</span>
                  </button>

                  <button onClick={() => { setTheme('sepia'); setShowThemeMenu(false); }}
                    className={`w-full flex items-center gap-3 p-2 rounded-xl text-sm font-medium transition-colors
                      ${theme === 'sepia' ? 'bg-[#e6dac0] text-[#5c4b37]' : 'hover:bg-gray-100 dark:hover:bg-slate-700'}
                    `}>
                    <BookOpen size={18} /> <span>قراءة (ورقي)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Contenu Principal */}
      <main className="max-w-4xl mx-auto px-6 pt-28">
        {/* On passe le theme aux enfants */}
        <HeroText theme={theme} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8">
         <PrayerCard 
    theme={theme}
    loading={loadingDaily}
    isSubscribed={isDailySub}
    onSubscribe={() => handleSubscribe('daily')}
    error={error}
    
    // Textes spécifiques au Sommeil
    badgeIcon={Moon}
    badgeText="الأساسية"
    title="أذكار النوم"
    description="تذكير يومي هادئ عند الساعة 10:00 مساءً لقراءة المعوذات وآية الكرسي قبل النوم."
    
    // Hadith spécifique au Sommeil
    hadithSource="قال رسول الله ﷺ : من قال حين يأوي إلى فراشه"
    hadithText="لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير، لا حول ولا قوة إلا بالله العلي العظيم، سبحان الله والحمد لله ولا إله إلا الله والله أكبر"
    hadithReward="غفرت له خطاياه ولو كانت مثل زبد البحر"
  />

  {/* --- CARTE 2 : JEÛNE (Lundi/Jeudi) --- */}
  <PrayerCard 
    theme={theme}
    loading={loadingFasting}
    isSubscribed={isFastingSub}
    onSubscribe={() => handleSubscribe('fasting')}
    error={error}

    // Textes spécifiques au Jeûne
    badgeIcon={Calendar}
    badgeText="سُنة مهجورة"
    title="صيام الإثنين والخميس"
    description="تذكير يأتيك الأحد والأربعاء لتذكيرك بنية الصيام واغتنام الأجر."

    // Hadith spécifique au Jeûne
    hadithSource="عن أبي هريرة رضي الله عنه قال: قال رسول الله ﷺ"
    hadithText="تُعرض الأعمال يوم الإثنين والخميس، فأحب أن يعرض عملي وأنا صائم."
    hadithReward="باب الريان في الجنة للصائمين"
  />
            <FeatureCard 
            icon={Heart }
            title="صدقة جارية"
            desc="هذا الموقع صدقة جارية لي ولأمي وأبي وأخي وأختي وزوجتي المستقبلية."
            
            theme={theme}
          />
          {/* Carte : Partager (Pour dire aux gens de partager) */}
<FeatureCard 
  icon={Share2}
  title="شارك الأجر"
  desc="الدال على الخير كفاعله. شارك هذا التطبيق مع من تحب ليتضاعف أجرك."
  baseColor="blue"
  theme={theme}
/>

{/* Carte : Fais-le toi-même (Open Source) */}
<FeatureCard 
  icon={Code}
  title="مفتوح المصدر"
  desc="الكود متاح مجاناً. يمكنك استخدامه لعمل تطبيق مماثل وصدقة جارية لك ولأهلك."
  baseColor="blue"
  theme={theme}
/>
          
        </div>
      </main>

      <footer className={`mt-20 text-center text-sm transition-colors duration-500 ${theme === 'sepia' ? 'text-[#8c7355]' : 'text-gray-400'}`}>
        <p>© 2025 تطبيق ذكر. صمم لراحتك.</p>
        <p>تم التطوير من طرف  يونس ناصر.</p>
      </footer>
    </div>
  );
}

export default App;