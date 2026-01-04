import React, { useState, useEffect, useCallback, useRef } from 'react';
import { LOGIN_HASH_U, LOGIN_HASH_P, GENERATORS, MASTER_PROMPT } from './constants';
import { Generator, PersonalizationData, ApiConfig, ViewState } from './types';
import { generateContent } from './services/aiService';

// --- COMPONENTS ---

// 1. Icon Helper (using FontAwesome classes)
const Icon = ({ name, className = "" }: { name: string; className?: string }) => (
  <i className={`fas ${name} ${className}`} />
);

// Success Toast Component
const SuccessToast = ({ show }: { show: boolean }) => {
  if (!show) return null;
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] animate-slide-up pointer-events-none">
      <div className="bg-emerald-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 font-bold border border-emerald-500 backdrop-blur-md bg-opacity-95">
        <div className="w-6 h-6 bg-white text-emerald-600 rounded-full flex items-center justify-center shadow-sm">
            <Icon name="fa-check" className="text-sm" />
        </div>
        <span className="drop-shadow-sm">Conteúdo gerado com sucesso!</span>
      </div>
    </div>
  );
};

// 2. Modal Wrapper
const Modal = ({ isOpen, onClose, title, icon, children, maxWidth = "max-w-4xl" }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity animate-fade-in">
      <div className={`bg-white rounded-3xl shadow-2xl w-full ${maxWidth} max-h-[90vh] flex flex-col overflow-hidden animate-scale-in`}>
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
              <Icon name={icon} className="text-lg" />
            </div>
            <h3 className="text-xl font-bold tracking-tight">{title}</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <Icon name="fa-times" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 relative">
          {children}
        </div>
      </div>
    </div>
  );
};

// 3. Landing Page (Formerly LoginScreen)
const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-900 via-violet-900 to-slate-900 overflow-hidden font-sans">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-600 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[128px] animate-pulse delay-1000" />
      </div>
      
      <div className={`relative z-10 max-w-4xl w-full flex flex-col items-center text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Logo / Icon Area */}
        <div className="mb-8 relative group cursor-default">
          <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full"></div>
          <div className="w-28 h-28 mx-auto bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-2xl relative z-10 transform group-hover:scale-105 transition-transform duration-500">
            <Icon name="fa-graduation-cap" className="text-5xl text-white drop-shadow-md" />
          </div>
        </div>

        {/* Typography */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-200 mb-4 tracking-tight drop-shadow-sm">
          Educador IA
        </h1>
        <p className="text-xl md:text-2xl text-indigo-200 font-light mb-8 max-w-2xl mx-auto leading-relaxed">
          Edição Pro BNCC
        </p>
        <p className="text-white/80 text-base md:text-lg mb-12 max-w-lg mx-auto leading-relaxed font-light">
          O assistente pedagógico inteligente que transforma seu planejamento. 
          Crie planos de aula, avaliações e atividades alinhadas à BNCC em segundos.
        </p>

        {/* Action Button */}
        <button 
          onClick={onLogin}
          className="group relative px-8 py-4 bg-white text-indigo-900 font-bold text-lg rounded-2xl shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 overflow-hidden"
        >
          <span className="relative z-10">Acessar Plataforma</span>
          <Icon name="fa-arrow-right" className="relative z-10 group-hover:translate-x-1 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-8 mt-16 text-white/50 text-xs md:text-sm font-medium w-full max-w-md">
           <div className="flex flex-col items-center gap-2 transition-colors hover:text-white/80">
              <div className="p-3 bg-white/5 rounded-2xl mb-1 border border-white/5"><Icon name="fa-bolt" className="text-lg" /></div>
              <span>Rápido</span>
           </div>
           <div className="flex flex-col items-center gap-2 transition-colors hover:text-white/80">
              <div className="p-3 bg-white/5 rounded-2xl mb-1 border border-white/5"><Icon name="fa-check-circle" className="text-lg" /></div>
              <span>BNCC</span>
           </div>
           <div className="flex flex-col items-center gap-2 transition-colors hover:text-white/80">
              <div className="p-3 bg-white/5 rounded-2xl mb-1 border border-white/5"><Icon name="fa-magic" className="text-lg" /></div>
              <span>Intuitivo</span>
           </div>
        </div>

      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-center animate-fade-in delay-700 w-full px-4">
        <p className="text-white/30 text-xs mb-2">© 2026 Educador IA</p>
        <p className="text-indigo-200/90 text-sm font-medium flex items-center gap-2 justify-center bg-white/5 backdrop-blur-sm py-2 px-4 rounded-full mx-auto max-w-fit border border-white/5">
           <Icon name="fa-code" className="text-xs text-indigo-400" /> 
           De Educador para Educador desenvolvido pelo Profº Sérgio Araújo
        </p>
      </div>
    </div>
  );
};

// 4. Sidebar Component
const Sidebar = ({ 
  isOpen, 
  onClose, 
  onSelectGenerator, 
  selectedId, 
  onOpenModal,
  onLogout 
}: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredGenerators = GENERATORS.filter(g => 
    g.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div 
        className={`fixed inset-0 bg-slate-900/50 z-40 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose}
      />
      <aside className={`fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-slate-200 shadow-xl transform transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
        <div className="p-6 bg-gradient-to-br from-indigo-600 to-violet-700 text-white relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="flex justify-between items-center mb-6 relative">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm cursor-pointer hover:bg-white/30 transition-colors" onClick={() => onSelectGenerator(null)}>
                  <Icon name="fa-home" />
               </div>
               <div>
                 <h1 className="font-bold text-lg leading-tight">Educador IA</h1>
                 <p className="text-xs text-indigo-200">BNCC Pro</p>
               </div>
            </div>
            <button onClick={onClose} className="md:hidden text-white/80 hover:text-white">
              <Icon name="fa-times" className="text-xl" />
            </button>
          </div>
          
          <div className="relative">
            <Icon name="fa-search" className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300" />
            <input 
              type="text" 
              placeholder="Buscar ferramenta..." 
              className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-indigo-200 focus:outline-none focus:bg-white/20 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
          {filteredGenerators.map(gen => (
            <button
              key={gen.id}
              onClick={() => { onSelectGenerator(gen); onClose(); }}
              className={`w-full text-left px-4 py-3 flex items-center gap-4 rounded-xl transition-all group ${selectedId === gen.id ? 'bg-indigo-50 border-l-4 border-indigo-600' : 'hover:bg-slate-50 border-l-4 border-transparent'}`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${selectedId === gen.id ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-500'}`}>
                <Icon name="fa-chalkboard-teacher" className={selectedId === gen.id ? '' : 'text-slate-400'} />
                {gen.icon && <Icon name={gen.icon} className="absolute opacity-0" />} 
              </div>
              <div className="min-w-0">
                 <div className="flex items-center gap-2">
                    <Icon name={gen.icon} className={`text-xs ${selectedId === gen.id ? 'text-indigo-500' : 'text-slate-400'}`} />
                    <div className={`font-semibold text-sm truncate ${selectedId === gen.id ? 'text-indigo-700' : 'text-slate-700'}`}>{gen.title}</div>
                 </div>
                <div className="text-xs text-slate-400 truncate pl-5">{gen.description}</div>
              </div>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3 shrink-0">
          <button onClick={() => onOpenModal('guide')} className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-white rounded-lg transition-all">
            <Icon name="fa-book-reader" className="w-5" /> Guia Didático
          </button>
          <button onClick={() => onOpenModal('tutorial')} className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-white rounded-lg transition-all">
            <Icon name="fa-question-circle" className="w-5" /> Ajuda / API
          </button>
          <div className="pt-3 border-t border-slate-200">
             <button onClick={() => onOpenModal('api')} className="w-full py-2 bg-white border border-slate-200 hover:border-indigo-300 text-indigo-600 text-sm font-bold rounded-xl shadow-sm transition-all mb-2 flex items-center justify-center gap-2">
                <Icon name="fa-plug" /> Configurar IA
             </button>
             <div className="flex justify-between items-center px-2">
                <span className="text-xs text-slate-400">v2.1.0</span>
                <button onClick={onLogout} className="text-xs font-medium text-red-500 hover:text-red-600 flex items-center gap-1">
                  <Icon name="fa-sign-out-alt" /> Sair
                </button>
             </div>
          </div>
        </div>
      </aside>
    </>
  );
};

// 5. Main App Logic
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentGenerator, setCurrentGenerator] = useState<Generator | null>(null);
  const [modals, setModals] = useState<{ [key: string]: boolean }>({
    result: false, api: false, personalization: false, tutorial: false, guide: false, master: false
  });
  
  // Data State
  const [apiConfig, setApiConfig] = useState<ApiConfig>({ provider: 'gemini', key: '', model: '' });
  const [personalization, setPersonalization] = useState<PersonalizationData>({});
  const [formData, setFormData] = useState<any>({});
  
  // Generation State
  const [loading, setLoading] = useState(false);
  const [resultContent, setResultContent] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [masterPromptDisplay, setMasterPromptDisplay] = useState("");

  useEffect(() => {
    const logged = sessionStorage.getItem('isLoggedIn');
    if (logged === 'true') setIsLoggedIn(true);

    const savedApi = localStorage.getItem('apiConfig');
    if (savedApi) setApiConfig(JSON.parse(savedApi));

    const savedPers = localStorage.getItem('personalizationData');
    if (savedPers) setPersonalization(JSON.parse(savedPers));
  }, []);

  const handleLogin = () => {
    sessionStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const toggleModal = (name: string, value: boolean) => {
    setModals(prev => ({ ...prev, [name]: value }));
  };

  const saveApi = (config: ApiConfig) => {
    setApiConfig(config);
    localStorage.setItem('apiConfig', JSON.stringify(config));
    toggleModal('api', false);
  };

  const savePersonalization = (data: PersonalizationData) => {
    setPersonalization(data);
    localStorage.setItem('personalizationData', JSON.stringify(data));
    toggleModal('personalization', false);
  };

  const generatePrompt = (gen: Generator, data: any) => {
    let prompt = gen.prompt(data);
    if (Object.keys(personalization).length > 0) {
      let context = "\n\nCONTEXTO DO PROFESSOR:\n";
      if(personalization.Nome do Professor) context += `- Nome: ${personalization.professorName}\n`;
      if(personalization.Noma da Escola) context += `- Escola: ${personalization.schoolName}\n`;
      if(personalization.Unidade Didática) context += `- Unidade: ${personalization.didacticUnit}\n`;
      prompt += context;
    }
    return prompt;
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentGenerator) return;

    if (!apiConfig.key) {
      toggleModal('api', true);
      return;
    }

    setLoading(true);
    toggleModal('result', true);
    setResultContent(""); // Clear previous
    setShowSuccess(false);

    const userPrompt = generatePrompt(currentGenerator, formData);
    
    try {
      const text = await generateContent(apiConfig, userPrompt);
      setResultContent(text);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    } catch (error: any) {
      setResultContent(`**Erro:** ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Conteúdo copiado para a área de transferência!");
  };

  const handleCopyPrompt = () => {
    if (!currentGenerator) return;
    const p = `${MASTER_PROMPT}\n\n${generatePrompt(currentGenerator, formData)}`;
    setMasterPromptDisplay(p);
    toggleModal('master', true);
  };

  // --- Export Functions ---
  const handleExportTXT = () => {
    if (!resultContent) return;
    const blob = new Blob([resultContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `educador-ia-${currentGenerator?.id || 'doc'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => {
    const element = document.getElementById('result-content');
    if (!element) return;
    
    const opt = {
      margin:       [10, 10, 10, 10], // top, left, bottom, right in mm
      filename:     `educador-ia-${currentGenerator?.id || 'doc'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Cast to any because html2pdf is loaded from CDN
    (window as any).html2pdf().set(opt).from(element).save();
  };

  const handleExportDOCX = () => {
    const element = document.getElementById('result-content');
    if (!element) return;
    
    // Create a complete HTML document for Word compatibility
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Documento Educador IA</title><style>body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.5; } h1, h2, h3 { color: #2E3A59; } table { border-collapse: collapse; width: 100%; } td, th { border: 1px solid #999; padding: 5px; }</style></head><body>`;
    const footer = "</body></html>";
    const htmlContent = header + element.innerHTML + footer;

    // Use Blob with MS Word MIME type
    const blob = new Blob(['\ufeff', htmlContent], {
        type: 'application/msword'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    // Word will open .doc as HTML seamlessly. It is the most robust way without heavy libraries.
    link.download = `educador-ia-${currentGenerator?.id || 'doc'}.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // --- Sub-Components for Modals ---
  
  const ApiModalContent = () => {
    const [localConfig, setLocalConfig] = useState(apiConfig);
    const [showCustom, setShowCustom] = useState(['groq', 'gemini', 'deepseek', 'anthropic', 'openrouter'].includes(apiConfig.provider));

    useEffect(() => {
        setShowCustom(['groq', 'gemini', 'deepseek', 'anthropic', 'openrouter'].includes(localConfig.provider));
    }, [localConfig.provider]);

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Provedor de IA</label>
          <select 
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl"
            value={localConfig.provider}
            onChange={(e) => setLocalConfig({...localConfig, provider: e.target.value as any})}
          >
            <option value="gemini">🌟 Google Gemini (Grátis)</option>
            <option value="groq">⚡ Groq (Rápido)</option>
            <option value="openai">🤖 OpenAI (GPT-4)</option>
            <option value="deepseek">🔍 DeepSeek</option>
            <option value="anthropic">🧠 Claude (Anthropic)</option>
            <option value="openrouter">🌐 OpenRouter</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Chave API (Key)</label>
          <input 
            type="password" 
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl"
            placeholder="sk-..."
            value={localConfig.key}
            onChange={(e) => setLocalConfig({...localConfig, key: e.target.value})}
          />
          <p className="text-xs text-slate-500 mt-1">Sua chave é salva apenas no seu navegador.</p>
        </div>
        {showCustom && (
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Modelo (Opcional)</label>
                <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl"
                    placeholder="Ex: gemini-1.5-pro"
                    value={localConfig.model}
                    onChange={(e) => setLocalConfig({...localConfig, model: e.target.value})}
                />
            </div>
        )}
        <div className="flex justify-end pt-4">
           <button onClick={() => saveApi(localConfig)} className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-colors">Salvar Configuração</button>
        </div>
      </div>
    );
  };

  if (!isLoggedIn) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-800 font-sans">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        onSelectGenerator={setCurrentGenerator} 
        selectedId={currentGenerator?.id}
        onOpenModal={(m: string) => toggleModal(m, true)}
        onLogout={handleLogout}
      />

      <main className="flex-1 flex flex-col h-full w-full md:ml-80 transition-all duration-300">
        {/* Header Mobile */}
        <header className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shrink-0 h-16 z-30 sticky top-0">
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
             <Icon name="fa-bars" className="text-xl" />
          </button>
          <h1 className="font-bold text-lg text-indigo-700">Educador IA</h1>
          <div className="w-8" />
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto relative bg-gradient-to-br from-slate-50 to-indigo-50/50">
          {!currentGenerator ? (
            /* Welcome Screen */
            <div className="flex flex-col items-center justify-center min-h-full p-8 text-center animate-fade-in">
                <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6 text-indigo-600 border border-indigo-50">
                   <Icon name="fa-chalkboard-teacher" className="text-5xl" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-3">Bem-vindo(a), Professor(a)</h2>
                <p className="text-slate-500 max-w-lg mb-8 text-lg">Selecione uma ferramenta no menu lateral para começar a planejar suas aulas com inteligência artificial.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full">
                    <button onClick={() => toggleModal('personalization', true)} className="p-4 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-300 transition-all flex items-center gap-3 text-left group">
                       <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform"><Icon name="fa-user-cog" /></div>
                       <div><div className="font-bold text-slate-700">Meus Dados</div><div className="text-xs text-slate-400">Personalize o contexto</div></div>
                    </button>
                    <button onClick={() => toggleModal('api', true)} className="p-4 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-300 transition-all flex items-center gap-3 text-left group">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform"><Icon name="fa-key" /></div>
                        <div><div className="font-bold text-slate-700">Configurar API</div><div className="text-xs text-slate-400">{apiConfig.key ? 'Conectado' : 'Não configurado'}</div></div>
                    </button>
                </div>
                {!apiConfig.key && (
                    <div onClick={() => toggleModal('tutorial', true)} className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl max-w-md cursor-pointer hover:bg-amber-100 transition-colors">
                        <div className="flex items-center gap-3 text-amber-800 font-medium">
                            <Icon name="fa-exclamation-triangle" /> Configuração Necessária
                        </div>
                        <p className="text-sm text-amber-700 mt-1">Clique para ver como obter sua chave gratuita do Google Gemini.</p>
                    </div>
                )}
            </div>
          ) : (
            /* Generator Form */
            <div className="max-w-4xl mx-auto p-6 md:p-10 animate-fade-in pb-6">
              <div className="mb-8">
                 <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                        <Icon name={currentGenerator.icon} className="text-xl" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">{currentGenerator.title}</h2>
                        <p className="text-slate-500">{currentGenerator.description}</p>
                    </div>
                 </div>
                 <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-transparent opacity-20 rounded-full mt-4" />
              </div>

              <form onSubmit={handleGenerate} className="space-y-6">
                 {currentGenerator.fields.map((field) => (
                    <div key={field.name} className="group">
                        <label className="block text-sm font-bold text-slate-700 mb-2 group-focus-within:text-indigo-600 transition-colors">
                            {field.label} {field.required && <span className="text-red-400">*</span>}
                        </label>
                        {field.type === 'textarea' ? (
                            <textarea
                                required={field.required}
                                rows={4}
                                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none shadow-sm"
                                placeholder={field.placeholder}
                                onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                            />
                        ) : field.type === 'select' ? (
                            <div className="relative">
                                <select
                                    required={field.required}
                                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm appearance-none cursor-pointer"
                                    onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                                >
                                    <option value="">Selecione...</option>
                                    {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                                <Icon name="fa-chevron-down" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                        ) : (
                            <input
                                type={field.type}
                                required={field.required}
                                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm"
                                placeholder={field.placeholder}
                                onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                            />
                        )}
                    </div>
                 ))}
                 
                 {/* SPACER DIV - Ensures content is scrollable above fixed footer */}
                 <div className="h-28 md:h-32" aria-hidden="true" />
                 
                 <div className="fixed bottom-0 left-0 md:left-80 right-0 px-6 py-3 bg-white/95 backdrop-blur-xl border-t border-slate-200 flex items-center justify-between z-30 shadow-lg">
                    <button type="button" onClick={handleCopyPrompt} className="text-indigo-600 font-semibold px-4 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-sm md:text-base">
                        <Icon name="fa-copy" className="mr-2" /> <span className="hidden sm:inline">Copiar Prompt</span><span className="sm:hidden">Copiar</span>
                    </button>
                    <div className="flex gap-3">
                        <button type="button" onClick={() => { setFormData({}); (document.querySelector('form') as HTMLFormElement).reset(); }} className="px-4 py-2 text-slate-500 hover:text-slate-700 font-medium text-sm md:text-base">
                            Limpar
                        </button>
                        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all flex items-center gap-2 text-sm md:text-base">
                            <Icon name="fa-wand-magic-sparkles" /> <span className="hidden sm:inline">Gerar Conteúdo</span><span className="sm:hidden">Gerar</span>
                        </button>
                    </div>
                 </div>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* --- MODALS --- */}

      {/* Result Modal */}
      <Modal isOpen={modals.result} onClose={() => toggleModal('result', false)} title="Resultado Gerado" icon="fa-sparkles">
         {loading ? (
             <div className="flex flex-col items-center justify-center py-20 text-center">
                 <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-6" />
                 <h3 className="text-xl font-bold text-slate-700 animate-pulse">A IA está pensando...</h3>
                 <p className="text-slate-500 mt-2">Consultando {apiConfig.provider}...</p>
             </div>
         ) : (
             <>
                 <div 
                    id="result-content"
                    className="markdown-body bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
                    dangerouslySetInnerHTML={{ __html: (window as any).marked ? (window as any).marked.parse(resultContent) : resultContent }} 
                 />
                 
                 {/* Modern Toolbar for Export */}
                 <div className="mt-8 pt-6 border-t border-slate-200 sticky bottom-0 bg-slate-50/95 backdrop-blur z-10 flex flex-col md:flex-row md:justify-between items-center gap-4">
                     <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
                         <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2 hidden md:inline-block self-center">Exportar:</span>
                         <button onClick={handleExportPDF} className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-200 px-4 py-2 rounded-lg font-medium transition-all text-sm flex items-center gap-2 group">
                            <Icon name="fa-file-pdf" className="group-hover:scale-110 transition-transform"/> PDF
                         </button>
                         <button onClick={handleExportDOCX} className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-200 px-4 py-2 rounded-lg font-medium transition-all text-sm flex items-center gap-2 group">
                            <Icon name="fa-file-word" className="group-hover:scale-110 transition-transform"/> Word (.doc)
                         </button>
                         <button onClick={handleExportTXT} className="bg-slate-100 text-slate-600 hover:bg-slate-600 hover:text-white border border-slate-200 px-4 py-2 rounded-lg font-medium transition-all text-sm flex items-center gap-2 group">
                            <Icon name="fa-file-alt" className="group-hover:scale-110 transition-transform"/> TXT
                         </button>
                     </div>
                     
                     <div className="flex gap-2 w-full md:w-auto justify-end">
                         <button onClick={() => copyToClipboard(resultContent)} className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-bold hover:bg-slate-50 transition-colors shadow-sm text-sm flex items-center gap-2">
                            <Icon name="fa-copy" /> Copiar Texto
                         </button>
                         <button onClick={() => toggleModal('result', false)} className="bg-slate-800 text-white px-5 py-2 rounded-lg font-bold hover:bg-slate-900 transition-colors shadow-lg text-sm">
                            Fechar
                         </button>
                     </div>
                 </div>
             </>
         )}
      </Modal>

      {/* API Modal */}
      <Modal isOpen={modals.api} onClose={() => toggleModal('api', false)} title="Configuração de API" icon="fa-plug" maxWidth="max-w-lg">
         <ApiModalContent />
      </Modal>

      {/* Personalization Modal */}
      <Modal isOpen={modals.personalization} onClose={() => toggleModal('personalization', false)} title="Personalizar Dados" icon="fa-user-cog" maxWidth="max-w-2xl">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {['professorName', 'schoolName', 'schoolYear', 'didacticUnit'].map(field => (
                 <div key={field}>
                     <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
                     <input 
                        type="text" 
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl"
                        value={(personalization as any)[field] || ''}
                        onChange={(e) => setPersonalization({...personalization, [field]: e.target.value})}
                     />
                 </div>
             ))}
         </div>
         <div className="flex justify-end pt-6">
            <button onClick={() => savePersonalization(personalization)} className="bg-purple-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-purple-700">Salvar Dados</button>
         </div>
      </Modal>
      
      {/* Master Prompt Modal */}
      <Modal isOpen={modals.master} onClose={() => toggleModal('master', false)} title="Prompt Gerado" icon="fa-code">
         <div className="bg-slate-800 text-slate-200 p-6 rounded-2xl font-mono text-sm whitespace-pre-wrap overflow-x-auto border border-slate-700 shadow-inner">
             {masterPromptDisplay}
         </div>
         <div className="flex justify-end pt-4">
            <button onClick={() => copyToClipboard(masterPromptDisplay)} className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700">Copiar</button>
         </div>
      </Modal>

       {/* Tutorial Modal */}
       <Modal isOpen={modals.tutorial} onClose={() => toggleModal('tutorial', false)} title="Como obter Chave API" icon="fa-key">
         <div className="space-y-6">
            <div className="p-4 bg-blue-50 text-blue-800 rounded-xl border border-blue-100 flex gap-3">
                <Icon name="fa-info-circle" className="mt-1" />
                <p className="text-sm">A chave API é uma "senha" gratuita que conecta este aplicativo à inteligência do Google ou outras IAs.</p>
            </div>
            <div className="space-y-4">
                <div className="border border-slate-200 rounded-xl p-4">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2"><Icon name="fa-star" className="text-yellow-500"/> Google Gemini (Recomendado)</h4>
                    <ol className="list-decimal ml-5 mt-2 text-sm text-slate-600 space-y-1">
                        <li>Acesse <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-indigo-600 underline">Google AI Studio</a>.</li>
                        <li>Clique em <strong>Create API Key</strong>.</li>
                        <li>Copie o código e cole nas configurações deste app.</li>
                    </ol>
                </div>
            </div>
         </div>
       </Modal>
       
       {/* Guide Modal */}
       <Modal isOpen={modals.guide} onClose={() => toggleModal('guide', false)} title="Guia Didático" icon="fa-book" maxWidth="max-w-4xl">
            <div className="space-y-6">
                 {/* Tip Box */}
                 <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                        <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm shrink-0">
                            <Icon name="fa-robot" className="text-3xl" />
                        </div>
                        <div>
                            <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-2 border border-white/20">DICA PRO</div>
                            <h4 className="font-bold text-lg mb-1">Prefere copiar o Prompt?</h4>
                            <p className="text-white/90 text-sm leading-relaxed text-justify">
                                Se você optar por usar o botão <strong>"Copiar Prompt"</strong> para colar em outra IA externa, 
                                recomendamos fortemente o uso do <strong>Claude.ai (Anthropic)</strong>. 
                                Em nossos testes, ele demonstrou a melhor capacidade de estruturação pedagógica 
                                e aderência às normas da BNCC em português brasileiro.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-200 my-4"></div>

                {/* Generator List */}
                <div>
                     <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
                        <Icon name="fa-list-ul" className="text-indigo-500" /> Catálogo de Ferramentas
                     </h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {GENERATORS.map(gen => (
                            <div key={gen.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex gap-4 hover:border-indigo-200 group">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center shrink-0 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                     <Icon name={gen.icon} className="text-xl" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-sm group-hover:text-indigo-700 transition-colors">{gen.title}</h4>
                                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{gen.description}</p>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
            </div>
       </Modal>
       
       <SuccessToast show={showSuccess} />
    </div>
  );
};

export default App;
