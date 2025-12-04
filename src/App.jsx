import React, { useState } from 'react';
import { Star, Shield, Clock } from 'lucide-react';
import PrayerCard from './components/prayerCard.jsx';
import HeroText from './components/heroCard.jsx';
import FeatureCard from './components/featureCard.jsx';
import { urlBase64ToUint8Array } from './utils/helpers.js';




function App() {
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

const handleSubscribe = async () => {
  setLoading(true);
  setError('');
  setIsSubscribed(false);
  console.log("1. Début du processus...");

  try {
    if (!('serviceWorker' in navigator)) {
      throw new Error("Service Worker non supporté");
    }

    console.log("2. Tentative registration SW...");
    const register = await navigator.serviceWorker.register('/sw.js');
    console.log("3. SW enregistré !");

    // ✅ ATTENDS que le SW soit VRAIMENT actif
    await navigator.serviceWorker.ready;
    console.log("3b. SW prêt et actif !");

    const vapidKey = import.meta.env.VITE_PUBLIC_VAPID_KEY;
    if (!vapidKey) throw new Error("Pas de clé VAPID !");

    console.log("4. Demande de permission au navigateur...");
    
    // ✅ Assure-toi que la permission est accordée
    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        throw new Error("Permission refusée");
      }
    }

    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidKey)
    });
    
    console.log("5. Permission accordée & Token généré !");

    console.log("6. Envoi vers le serveur...");
    const response = await fetch('https://reminder-eud4.onrender.com/api/test-notifications', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: { 'Content-Type': 'application/json' }
    });

    console.log("7. Réponse reçue du serveur !");

    if (!response.ok) throw new Error('Erreur serveur HTTP ' + response.status);

    setIsSubscribed(true);
    console.log("8. SUCCÈS TOTAL !");

  } catch (err) {
    console.error("ERREUR ATTRAPÉE :", err);
    setError(err.message || 'Erreur inconnue');
  } finally {
    console.log("9. Fin du chargement (Finally)");
    setLoading(false);
  }
};


  return (
    // 'dir="rtl"' force l'affichage de droite à gauche (Arabe)
    <div className="min-h-screen bg-[#F5F5F7] font-sans selection:bg-blue-100 selection:text-blue-900 pb-20" dir="rtl">
      
      {/* Navbar Minimaliste */}
      <nav className="p-6 flex justify-between items-center max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">
            ذ
          </div>
          <span className="font-bold text-xl tracking-tight">ذكـر</span>
        </div>
        
        {/* Avatar Placeholder */}
        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden ring-2 ring-white shadow-sm">
          <div className="w-full h-full bg-gradient-to-tr from-gray-300 to-gray-100"></div>
        </div>
      </nav>

      {/* Contenu Principal */}
      <main className="max-w-4xl mx-auto px-6 mt-10">
        <HeroText />

        {/* Grille Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          
          {/* Carte d'abonnement */}
          <PrayerCard 
            onSubscribe={handleSubscribe}
            loading={loading}
            isSubscribed={isSubscribed}
            error={error}
          />

          {/* Cartes Avantages */}
          <FeatureCard 
            icon={Shield}
            title="تحصين"
            desc="حماية وراحة نفسية قبل النوم"
            color="bg-purple-100"
          />
          <FeatureCard 
            icon={Star}
            title="أجر مستمر"
            desc="احياء سنة نبوية مهجورة"
            color="bg-yellow-100"
          />
          <FeatureCard 
            icon={Clock}
            title="روتين"
            desc="بناء عادة إيجابية يومية"
            color="bg-green-100"
          />

        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 text-center text-gray-400 text-sm">
        <p>© 2024 تطبيق ذكر. صمم لراحتك.</p>
      </footer>

    </div>
  );
}

export default App;