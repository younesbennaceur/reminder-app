import React from 'react';

const HeroText = ({ theme }) => {
  return (
    <div className="text-center mb-12 space-y-4">
      <h1 className={`text-4xl md:text-6xl font-black tracking-tight leading-tight transition-colors duration-500
        ${theme === 'dark' ? 'text-white' : theme === 'sepia' ? 'text-[#5c4b37]' : 'text-[#1D1D1F]'}
      `}>
        رفيقك الروحي <br />
        <span className={` ${theme === 'dark' ? 'text-[#2B7FFF]' : theme === 'sepia' ? 'text-[#d8bd9d]' : 'text-text-[#2B7FFF]'}`}>لأورادك اليومية</span>
      </h1>
      
      <p className={`text-lg md:text-xl font-medium max-w-4xl mx-auto leading-relaxed transition-colors duration-500
        ${theme === 'dark' ? 'text-gray-400' : theme === 'sepia' ? 'text-[#8c7355]' : 'text-gray-500'}
      `}>
تنبيهات هادئة ترافقك في كل لحظة، لتذكّرك بأذكار الصباح والمساء، أذكار النوم، والسنن المهجورة.
        <br className="hidden md:block"/>
صُمّم ليكون جزءًا من روتينك الواعي، يعينك على الثبات ويُقَرِّبك من الطمأنينة كل يوم.      </p>
    </div>
  );
};

export default HeroText;