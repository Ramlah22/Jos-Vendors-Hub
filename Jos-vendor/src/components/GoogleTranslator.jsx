import React, { useState } from 'react';
import { Globe } from 'lucide-react';

const GoogleTranslator = () => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ha', name: 'Hausa', flag: '🇳🇬' },
    { code: 'yo', name: 'Yoruba', flag: '🇳🇬' },
    { code: 'ig', name: 'Igbo', flag: '🇳🇬' },
  ];

  const handleLanguageChange = (languageCode) => {
    // Find and trigger the Google Translate combo dropdown
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = languageCode;
      combo.dispatchEvent(new Event('change'));
      localStorage.setItem('selectedLanguage', languageCode);
    }
    setIsOpen(false);
  };

  const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('selectedLanguage') : 'en';

  return (
    <div className="relative">
      {/* Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition duration-300 ease-in-out shadow-md font-semibold"
        aria-label="Change Language"
      >
        <Globe size={20} />
        <span className="text-sm">Language</span>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-56 bg-white border-2 border-emerald-600 rounded-lg shadow-2xl z-50 overflow-hidden">
          <div className="bg-emerald-600 text-white px-4 py-2 font-semibold text-sm">
            Select Language
          </div>
          <div className="p-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left px-4 py-3 rounded-md transition duration-200 flex items-center gap-3 mb-2 font-medium ${
                  savedLanguage === lang.code
                    ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-600'
                    : 'text-gray-700 hover:bg-emerald-50 border-2 border-transparent'
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleTranslator;
