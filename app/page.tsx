"use client";

import React, { useState } from 'react';
import { Eye, AlertTriangle, ShieldAlert, X, RefreshCw } from 'lucide-react';
// Importations Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Votre configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBRDhF6nysGYYFFXTkI4bChcI1ELSG2vWY",
  authDomain: "sensibilisation-8f7ff.firebaseapp.com",
  projectId: "sensibilisation-8f7ff",
  storageBucket: "sensibilisation-8f7ff.firebasestorage.app",
  messagingSenderId: "1019540920209",
  appId: "1:1019540920209:web:55dc302e432e64167aac30",
  measurementId: "G-QPQNSJGW0E"
};

// Initialisation de Firebase à l'extérieur du composant pour éviter les re-rendus
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'forgot', 'education'
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Fonction appelée lors de la soumission du formulaire
  const handleSimulatedSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. Récupération de l'identifiant pour le KPI
    const target = e.target as typeof e.target & {
        0: { value: string };
    };
    const userEmail = target[0].value;

    // 2. ENVOI À FIREBASE (Sécurisé : on n'envoie PAS le mot de passe)
    try {
      // On ajoute un nouveau document dans une collection nommée "kpi_clics"
      await addDoc(collection(db, "kpi_clics"), {
        email: userEmail,
        date_clic: new Date().toISOString(),
        navigateur: window.navigator.userAgent 
      });
      console.log("✅ KPI bien enregistré dans Firebase !");
    } catch (error) {
      console.error("❌ Erreur lors de l'enregistrement Firebase :", error);
    }

    // 3. On redirige instantanément vers la page de sensibilisation
    setCurrentView('education');
    setShowHelpModal(false);
  };

  const resetSimulation = () => {
    setCurrentView('login');
    setShowHelpModal(false);
  };

  return (
    <div className="relative min-h-screen w-full font-sans bg-white overflow-hidden selection:bg-[#008bd2] selection:text-white">
      
      {/* ==================== VUE ÉDUCATION ==================== */}
      {currentView === 'education' && (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 p-6 absolute inset-0 z-50">
          <div className="bg-white max-w-2xl w-full p-8 rounded-lg shadow-2xl border-t-8 border-red-600 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
              <AlertTriangle className="h-10 w-10 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Ceci est un exercice de sensibilisation !</h1>
            <p className="text-md text-gray-600 mb-6">
              Si cette page avait été une véritable attaque de phishing, <strong>vos identifiants viendraient d'être volés</strong> par des pirates.
            </p>
            <div className="bg-red-50 p-5 rounded text-left mb-6 border border-red-100">
              <h3 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" /> 
                Que se passe-t-il en réalité ?
              </h3>
              <p className="text-red-700 text-sm">
                Sur un vrai site malveillant, le bouton "Connexion" n'affiche pas de message d'erreur. Il enregistre silencieusement votre adresse e-mail dans une base de données secrète pour de futures attaques, puis vous redirige vers le vrai site pour que vous ne remarquiez rien.
              </p>
            </div>
            <p className="text-xs text-gray-400 mb-8 uppercase tracking-wide">Rassurez-vous, aucun mot de passe n'a été enregistré lors de ce test.</p>
            <button 
              onClick={resetSimulation}
              className="bg-red-600 text-white px-6 py-2.5 rounded font-medium hover:bg-red-700 transition"
            >
              Compris, retourner à l'accueil
            </button>
          </div>
        </div>
      )}

      {/* ==================== VUE PRINCIPALE ==================== */}
      {currentView !== 'education' && (
        <div className="flex flex-col md:flex-row min-h-screen w-full">
          
          <div className="w-full md:w-[35%] lg:w-[30%] xl:w-[28%] bg-white flex flex-col justify-between p-8 relative min-h-screen">
            
            <div className="flex flex-col items-center mt-12">
              <svg width="120" height="70" viewBox="0 0 120 70" className="mb-2">
                <path d="M20 35 C 20 15, 50 10, 80 15 C 100 18, 110 30, 105 45 C 100 60, 70 65, 45 60 C 25 55, 20 45, 20 35 Z" fill="none" stroke="#00619e" strokeWidth="6" strokeLinecap="round" />
                <path d="M20 35 C 20 15, 50 10, 80 15" fill="none" stroke="#00619e" strokeWidth="8" strokeLinecap="round" />
                <text x="55" y="50" fontFamily="Arial, sans-serif" fontSize="48" fontWeight="bold" fontStyle="italic" fill="#00619e" textAnchor="middle">E</text>
              </svg>
              <h1 className="text-[20px] font-medium text-black mt-[-5px]">EcoleDirecte</h1>
            </div>

            <div className="flex-grow flex flex-col items-center justify-center w-full">
              
              {currentView === 'login' && (
                <div className="w-full max-w-[340px] mx-auto mb-auto pt-10">
                  <h2 className="text-[#008bd2] text-[24px] text-center mb-10 font-normal">Connectez-vous</h2>
                  
                  <form onSubmit={handleSimulatedSubmit}>
                    <div className="mb-5">
                      <input 
                        type="text" 
                        placeholder="Identifiant" 
                        className="w-full border border-gray-200 rounded-[3px] px-3 py-2.5 text-[13px] outline-none focus:border-[#008bd2] transition-colors placeholder-gray-500" 
                        required 
                      />
                    </div>
                    
                    <div className="mb-1 relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Mot de passe" 
                        className="w-full border border-gray-200 rounded-[3px] px-3 py-2.5 text-[13px] outline-none focus:border-[#008bd2] transition-colors pr-10 placeholder-gray-500" 
                        required 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#008bd2] hover:text-blue-700"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="text-right mb-8">
                      <button 
                        type="button" 
                        onClick={() => setCurrentView('forgot')}
                        className="text-[11px] text-gray-400 italic hover:underline"
                      >
                        Mot de passe oublié ?
                      </button>
                    </div>
                    
                    <div className="flex items-center mb-6">
                      <input type="checkbox" id="remember" className="mr-2 w-3.5 h-3.5 border-gray-300 rounded-[2px] text-[#008bd2] focus:ring-[#008bd2]" />
                      <label htmlFor="remember" className="text-[12px] font-bold text-black cursor-pointer">Se souvenir de moi</label>
                    </div>
                    
                    <button type="submit" className="w-full bg-[#008bd2] text-white rounded-[3px] py-2.5 text-[14px] hover:bg-[#0073ae] transition-colors">
                      Connexion
                    </button>
                  </form>
                </div>
              )}

              {currentView === 'forgot' && (
                <div className="w-full flex flex-col items-center mb-auto pt-4">
                  <h2 className="text-black text-[14px] uppercase text-center mb-8 font-normal tracking-wide">Comment souhaitez-vous récupérer vos identifiants ?</h2>
                  
                  <div className="bg-[#eaf4fc] text-[#00619e] text-[13px] text-center p-4 rounded-sm w-[90%] max-w-[400px] mb-10">
                    Veuillez saisir l'adresse e-mail ou le numéro de téléphone portable que vous aviez renseigné lors de la personnalisation de vos codes d'accès.
                  </div>

                  <form onSubmit={handleSimulatedSubmit} className="w-full max-w-[320px] flex flex-col items-center">
                    <label className="text-[12px] font-bold text-gray-800 mb-2">Adresse email ou numéro de téléphone</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-200 rounded px-4 py-2 text-[13px] outline-none focus:border-[#008bd2] text-center mb-8 placeholder-gray-500" 
                      required 
                    />
                    
                    <div className="flex items-center justify-center gap-4 mb-8">
                      <div className="text-4xl font-serif italic tracking-widest transform -rotate-3 text-gray-800">72284</div>
                      <button type="button" className="bg-[#008bd2] p-2 text-white rounded hover:bg-[#0073ae]">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-8 w-full justify-center">
                      <label className="text-[12px] font-bold text-gray-800">Code de sécurité</label>
                      <input 
                        type="text" 
                        className="w-24 border border-gray-200 rounded px-2 py-1 outline-none focus:border-[#008bd2] placeholder-gray-500" 
                        required 
                      />
                    </div>
                    
                    <button type="submit" className="bg-[#008bd2] text-white rounded-[3px] py-2 px-8 text-[13px] hover:bg-[#0073ae] transition-colors mb-12">
                      Étape suivante
                    </button>
                  </form>
                  
                  <button 
                    onClick={() => setCurrentView('login')} 
                    className="text-[#008bd2] text-[12px] hover:underline"
                  >
                    Retour à l'accueil
                  </button>
                </div>
              )}
            </div>

            <div className="text-[11px] text-black flex gap-3 mt-8">
              <a href="#" className="hover:underline">Mentions légales</a>
              <span>Accessibilité : partiellement conforme</span>
            </div>
          </div>

          <div className="hidden md:flex w-full md:w-[65%] lg:w-[70%] xl:w-[72%] bg-[#00619e] relative flex-col items-center justify-center border-l-2 border-[#005286]">
            
            <button 
              onClick={() => setShowHelpModal(true)}
              className="absolute -left-[30px] top-1/3 bg-white text-black text-[10px] font-bold py-6 px-1.5 shadow-[2px_0_5px_rgba(0,0,0,0.2)] rounded-r-sm hover:bg-gray-50 flex items-center justify-center transition-colors"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              <span className="tracking-widest">PROBLÈME DE CONNEXION ?</span>
            </button>

            <div className="text-white text-center mt-20">
              <p className="mb-4 text-[16px]">Retrouvez EcoleDirecte aussi sur votre mobile</p>
              
              <div className="flex flex-row gap-3 justify-center items-center">
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img src="https://play.google.com/intl/en_us/badges/static/images/badges/fr_badge_web_generic.png" alt="Disponible sur Google Play" className="h-[60px] object-contain" />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/fr-fr?size=250x83&releaseDate=1276560000&h=d2b86ab32ea48e815617d591bd0c8227" alt="Télécharger dans l'App Store" className="h-[42px] object-contain ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {showHelpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
          <div className="bg-white max-w-[600px] w-full rounded shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 p-4">
              <h3 className="text-gray-700 text-[15px] font-normal uppercase tracking-wide">Des difficultés pour vous connecter ?</h3>
              <button onClick={() => setShowHelpModal(false)} className="text-gray-500 hover:text-black">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 bg-gray-50 text-[13px] leading-relaxed">
              <h4 className="text-[#008bd2] uppercase font-normal mb-2">Si vous avez déjà personnalisé votre compte d'accès</h4>
              <p className="text-gray-800 mb-2">Vous pouvez utiliser le lien <span className="text-[#008bd2] font-medium">'mot de passe oublié'</span> en indiquant l'email ou le numéro de téléphone que vous avez fourni lors de la création de votre compte.</p>
              <p className="text-gray-800 mb-6">Si cette procédure échoue, vous devez contacter directement votre établissement afin qu'il réinitialise votre compte d'accès.</p>
              <h4 className="text-[#008bd2] uppercase font-normal mb-2">Si vous n'avez jamais personnalisé votre compte d'accès</h4>
              <p className="text-gray-800 mb-1">Dans ce cas, le lien 'mot de passe oublié' ne fonctionnera pas.</p>
              <p className="text-gray-800">Vous devez utiliser votre code de première connexion fourni par votre établissement.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}