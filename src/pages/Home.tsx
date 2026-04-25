import { useState } from 'react';
import { ArrowRight, Sparkles, Code2, Rocket, Users } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { services } from '../data/services';
import { ServiceCard } from '../components/ServiceCard';
import type { Service } from '../types';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const { user, setUserName } = useUser();
  const [nameInput, setNameInput] = useState('');

  const handleSetName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      setUserName(nameInput.trim());
      setNameInput('');
    }
  };

  const handleQuoteRequest = () => {
    const message = encodeURIComponent(
      `Olá! Sou ${user?.name || 'visitante'} e gostaria de solicitar um orçamento para meu projeto.`
    );
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  const handleBuyService = (service: Service) => {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no serviço: ${service.title} (R$ ${service.price.toLocaleString('pt-BR')})`
    );
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  const features = [
    {
      icon: Code2,
      title: 'Código Premium',
      description: 'Desenvolvemos com as tecnologias mais modernas do mercado.'
    },
    {
      icon: Rocket,
      title: 'Entrega Rápida',
      description: 'Projetos entregues no prazo, sem dor de cabeça.'
    },
    {
      icon: Users,
      title: 'Suporte Dedicado',
      description: 'Acompanhamento próximo em todas as etapas.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 via-black to-black pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-zinc-800/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 text-sm text-zinc-400 mb-8">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>Transformando ideias em realidade digital</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-white">Kairós</span>
            <span className="text-zinc-500"> Studio</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 text-balance">
            Criamos experiências digitais únicas. Sites, aplicativos e automações 
            que impulsionam o seu negócio para o próximo nível.
          </p>

          {/* User Name Input */}
          {!user?.name ? (
            <form onSubmit={handleSetName} className="max-w-md mx-auto mb-8">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Qual é o seu nome?"
                  className="flex-grow px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-white text-black font-medium transition-all hover:bg-zinc-200 active:scale-[0.98]"
                >
                  Salvar
                </button>
              </div>
            </form>
          ) : (
            <p className="text-zinc-400 mb-8">
              Olá, <span className="text-white font-medium">{user.name}</span>! 
              Pronto para transformar sua ideia?
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleQuoteRequest}
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-medium text-lg transition-all hover:bg-zinc-200 active:scale-[0.98]"
            >
              Quero orçamento
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => onNavigate('courses')}
              className="flex items-center gap-2 px-8 py-4 rounded-xl border border-zinc-700 text-white font-medium transition-all hover:bg-zinc-900 active:scale-[0.98]"
            >
              Ver cursos
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950 transition-all hover:border-zinc-700 hover:bg-zinc-900/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 text-white mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-4 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Nossos Serviços</h2>
              <p className="text-zinc-400">Soluções completas para o seu projeto</p>
            </div>
            <button
              onClick={() => onNavigate('services')}
              className="hidden sm:flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Ver todos
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 3).map((service) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onBuy={handleBuyService}
              />
            ))}
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="sm:hidden w-full mt-6 py-3 rounded-xl border border-zinc-800 text-zinc-400 font-medium transition-all hover:bg-zinc-900 hover:text-white"
          >
            Ver todos os serviços
          </button>
        </div>
      </section>
    </div>
  );
}
