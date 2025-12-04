import React from 'react';
import { Bell, Moon, Check } from 'lucide-react';

const PrayerCard = ({ onSubscribe, loading, isSubscribed, error }) => {
  return (
    <div className="group relative bg-white rounded-4xl p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 border border-gray-100 overflow-hidden col-span-1 md:col-span-2">
      
      {/* Décoration d'arrière-plan (lumière bleue) */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60 group-hover:scale-110 transition-transform duration-700"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-right">
        
        {/* Contenu Texte */}
        <div className="flex-1 space-y-4 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-bold">
            <Moon size={16} fill="currentColor" />
            <span>الأساسية</span>
          </div>
          
          <h3 className="text-3xl font-bold text-[#1D1D1F]">أذكار النوم</h3>
          <p className="text-gray-500 text-lg leading-relaxed">
            تذكير يومي هادئ عند الساعة 10:00 مساءً لقراءة المعوذات وآية الكرسي قبل النوم.
          </p>

          {/* Affichage des erreurs */}
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 flex items-center gap-2">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Bouton d'action */}
        <div className="w-full md:w-auto">
          <button
            onClick={onSubscribe}
            disabled={loading || isSubscribed}
            className={`w-full md:w-48 py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-3 ${
              isSubscribed 
                ? 'bg-green-50 text-green-600 border border-green-200 cursor-default'
                : 'bg-[#1D1D1F] text-white hover:bg-black shadow-lg hover:shadow-xl'
            }`}
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : isSubscribed ? (
              <>
                <span>مفعل</span>
                <Check size={20} strokeWidth={3} />
              </>
            ) : (
              <>
                <span>تفعيل</span>
                <Bell size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrayerCard;