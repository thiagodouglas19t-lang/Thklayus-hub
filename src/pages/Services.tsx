import { services } from '../data/services';
import { ServiceCard } from '../components/ServiceCard';
import type { Service } from '../types';

export function Services() {
  const handleBuyService = (service: Service) => {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no serviço: ${service.title} (R$ ${service.price.toLocaleString('pt-BR')}). Gostaria de mais informações.`
    );
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Nossos Serviços</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-balance">
            Soluções digitais personalizadas para transformar seu negócio. 
            Escolha o serviço ideal para suas necessidades.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onBuy={handleBuyService}
            />
          ))}
        </div>

        {/* Custom Project CTA */}
        <div className="mt-16 p-8 rounded-2xl border border-zinc-800 bg-zinc-950 text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Projeto personalizado?</h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Não encontrou o que procura? Entre em contato e vamos criar algo único para você.
          </p>
          <button
            onClick={() => {
              const message = encodeURIComponent(
                'Olá! Gostaria de solicitar um orçamento para um projeto personalizado.'
              );
              window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
            }}
            className="px-8 py-3 rounded-xl bg-white text-black font-medium transition-all hover:bg-zinc-200 active:scale-[0.98]"
          >
            Solicitar orçamento personalizado
          </button>
        </div>
      </div>
    </div>
  );
}
