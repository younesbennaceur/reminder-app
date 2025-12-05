import React, { useState } from 'react';
import { Bell, Moon, Check, Loader2, ChevronDown, ChevronUp, Quote, Calendar } from 'lucide-react';

const PrayerCard = ({ 
  // Logique
  onSubscribe, loading, isSubscribed, error, theme, 
  // Contenu (Textes dynamiques)
  title, 
  description, 
  badgeIcon: BadgeIcon = Moon, // Par défaut la lune, modifiable
  badgeText,
  hadithSource,
  hadithText,
  hadithReward
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // --- STYLES DYNAMIQUES ---
  const getContainerStyles = () => {
    switch (theme) {
      case 'dark': return 'bg-slate-900 border-slate-700 shadow-slate-900/50';
      case 'sepia': return 'bg-[#fcf7ec] border-[#d4c5a9] shadow-[#d4c5a9]/20';
      default: return 'bg-white border-gray-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]';
    }
  };

  const getDecorationStyles = () => {
    switch (theme) {
      case 'dark': return 'bg-blue-900/30 opacity-40';
      case 'sepia': return 'bg-[#e6dac0] opacity-60';
      default: return 'bg-blue-50 opacity-60';
    }
  };

  const getButtonStyles = () => {
    if (isSubscribed) return 'bg-green-500/10 text-green-600 border border-green-500/20 cursor-default';
    switch (theme) {
      case 'dark': return 'bg-white text-black hover:bg-gray-200';
      case 'sepia': return 'bg-[#5c4b37] text-[#fcf7ec] hover:bg-[#4a3b2a]';
      default: return 'bg-[#1D1D1F] text-white hover:bg-black';
    }
  };

  const getPrayerBoxStyles = () => {
    switch (theme) {
      case 'dark': return 'bg-slate-800/50 border-slate-700 text-gray-300';
      case 'sepia': return 'bg-[#f0e6d2]/50 border-[#d4c5a9] text-[#5c4b37]';
      default: return 'bg-gray-50 border-gray-100 text-gray-600';
    }
  };

  const titleColor = theme === 'dark' ? 'text-white' : theme === 'sepia' ? 'text-[#5c4b37]' : 'text-[#1D1D1F]';
  const descColor = theme === 'dark' ? 'text-slate-400' : theme === 'sepia' ? 'text-[#8c7355]' : 'text-gray-500';
  const linkColor = theme === 'sepia' ? 'text-[#8c7355] hover:text-[#5c4b37]' : 'text-blue-500 hover:text-blue-600';

  return (
    <div className={`group relative rounded-[2rem] p-8 transition-all duration-500 border overflow-hidden col-span-1 md:col-span-3 ${getContainerStyles()}`}>
      
      {/* Décoration d'arrière-plan */}
      <div className={`absolute -top-24 -left-24 w-64 h-64 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700 ${getDecorationStyles()}`}></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-start justify-between gap-8 text-right">
        
        {/* Partie Gauche : Textes + Accordéon */}
        <div className="flex-1 space-y-4 w-full">
          
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold w-fit
            ${theme === 'sepia' ? 'bg-[#e6dac0] text-[#5c4b37]' : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'}
          `}>
            <BadgeIcon size={16} fill="currentColor" />
            <span>{badgeText}</span>
          </div>
          
          {/* Titre et Description Dynamiques */}
          <h3 className={`text-3xl font-bold transition-colors ${titleColor}`}>{title}</h3>
          <p className={`text-lg leading-relaxed transition-colors ${descColor}`}>
            {description}
          </p>

          {/* Bouton Toggle (affiché seulement si un hadith est fourni) */}
          {hadithText && (
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center gap-2 text-sm font-bold transition-colors ${linkColor}`}
            >
              {isOpen ? 'إخفاء الفضل' : 'اقرأ فضل هذا العمل'}
              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}

          {/* Zone du Hadith */}
          {hadithText && (
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] w-full opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className={`mt-2 p-6 rounded-2xl border relative ${getPrayerBoxStyles()}`}>
                <Quote size={20} className="absolute top-4 right-4 opacity-20" />
                
                <div className="text-center space-y-4">
                  <p className="text-sm opacity-80 font-medium">{hadithSource}</p>
                  
                  <p className={`text-xl font-bold leading-loose ${theme === 'sepia' ? 'text-[#8c7355]' : 'text-blue-600 dark:text-blue-400'}`}>
                    "{hadithText}"
                  </p>
                  
                  {hadithReward && (
                    <div className="text-sm opacity-80 pt-2 border-t border-current/10">
                      <span className="font-bold">الجزاء: </span>
                      {hadithReward}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Erreurs */}
          {error && (
            <div className="p-3 bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl text-sm border border-red-500/20 flex items-center gap-2">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Partie Droite : Bouton d'action */}
        <div className="w-full md:w-auto pt-2">
          <button
            onClick={onSubscribe}
            disabled={loading || isSubscribed}
            className={`w-full md:w-48 py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-3 shadow-lg ${getButtonStyles()}`}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
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