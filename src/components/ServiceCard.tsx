import { Check, Layout, Globe, ShoppingCart, Smartphone, Zap, MessageCircle } from 'lucide-react';
import type { Service } from '../types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'layout': Layout,
  'globe': Globe,
  'shopping-cart': ShoppingCart,
  'smartphone': Smartphone,
  'zap': Zap,
  'message-circle': MessageCircle,
};

interface ServiceCardProps {
  service: Service;
  onBuy: (service: Service) => void;
}

export function ServiceCard({ service, onBuy }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Layout;

  const statusColors = {
    'popular': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    'novo': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    'disponível': 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
  };

  const statusLabels = {
    'popular': 'Popular',
    'novo': 'Novo',
    'disponível': 'Disponível',
  };

  return (
    <div className="group relative flex flex-col rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/50 hover:scale-[1.02]">
      {/* Status Badge */}
      <div className="absolute -top-3 left-6">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusColors[service.status]}`}>
          {statusLabels[service.status]}
        </span>
      </div>

      {/* Icon */}
      <div className="mt-2 mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 text-white">
        <Icon className="h-6 w-6" />
      </div>

      {/* Title & Description */}
      <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
      <p className="text-sm text-zinc-400 mb-4 flex-grow">{service.description}</p>

      {/* Features */}
      <ul className="space-y-2 mb-6">
        {service.features.slice(0, 4).map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-zinc-400">
            <Check className="h-4 w-4 mt-0.5 text-emerald-500 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
        {service.features.length > 4 && (
          <li className="text-sm text-zinc-500">
            +{service.features.length - 4} mais recursos
          </li>
        )}
      </ul>

      {/* Price & Delivery */}
      <div className="mb-4 pb-4 border-b border-zinc-800">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-white">
            R$ {service.price.toLocaleString('pt-BR')}
          </span>
        </div>
        <p className="text-sm text-zinc-500 mt-1">Entrega em {service.deliveryTime}</p>
      </div>

      {/* CTA Button */}
      <button
        onClick={() => onBuy(service)}
        className="w-full py-3 px-4 rounded-xl bg-white text-black font-medium text-sm transition-all hover:bg-zinc-200 active:scale-[0.98]"
      >
        Comprar
      </button>
    </div>
  );
}
