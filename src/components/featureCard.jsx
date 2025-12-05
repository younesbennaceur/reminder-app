import React from 'react';

// On utilise 'baseColor' (ex: 'purple') pour pouvoir générer les variantes dark/sepia/light
const FeatureCard = ({ icon: Icon, title, desc, baseColor = 'blue', theme }) => {
  
  // 1. Définir le style global de la carte (Fond et Bordure)
  const getCardStyles = () => {
    if (theme === 'dark') return 'bg-slate-900 border-slate-800 shadow-none hover:bg-slate-800';
    if (theme === 'sepia') return 'bg-[#fcf7ec] border-[#e6dac0] hover:bg-[#f5ebd6]';
    return 'bg-white border-gray-100 hover:scale-[1.02] shadow-sm'; // Default Light
  };

  // 2. Définir le style du Texte
  const getTitleColor = () => {
    if (theme === 'dark') return 'text-white';
    if (theme === 'sepia') return 'text-[#5c4b37]';
    return 'text-[#1D1D1F]';
  };

  const getDescColor = () => {
    if (theme === 'dark') return 'text-gray-400';
    if (theme === 'sepia') return 'text-[#8c7355]';
    return 'text-gray-400';
  };

  // 3. Définir la couleur de l'icône selon la 'baseColor' et le 'theme'
  const getIconContainerStyles = () => {
    const colors = {
      purple: { light: 'bg-purple-100 text-purple-600', dark: 'bg-purple-500/20 text-purple-300', sepia: 'bg-[#dcd0b8] text-[#5c4b37]' },
      yellow: { light: 'bg-yellow-100 text-yellow-600', dark: 'bg-yellow-500/20 text-yellow-300', sepia: 'bg-[#e6dac0] text-[#8c7355]' },
      green:  { light: 'bg-green-100 text-green-600',  dark: 'bg-green-500/20 text-green-300',  sepia: 'bg-[#d4c5a9] text-[#4a3b2a]' },
      blue:   { light: 'bg-blue-100 text-blue-600',    dark: 'bg-blue-500/20 text-blue-300',    sepia: 'bg-[#c5b8a0] text-[#3d3220]' },
    };
    
    // Fallback si la couleur n'existe pas
    const selected = colors[baseColor] || colors.blue;

    if (theme === 'dark') return selected.dark;
    if (theme === 'sepia') return selected.sepia;
    return selected.light;
  };

  return (
    <div className={`p-6 rounded-3xl border flex flex-col items-center text-center space-y-3 transition-all duration-300 ${getCardStyles()}`}>
      <div className={`p-3 rounded-2xl transition-colors duration-500 ${getIconContainerStyles()}`}>
        <Icon size={24} />
      </div>
      <h4 className={`font-bold text-lg transition-colors duration-500 ${getTitleColor()}`}>{title}</h4>
      <p className={`text-sm transition-colors duration-500 ${getDescColor()}`}>{desc}</p>
    </div>
  );
};

export default FeatureCard;