export interface Service {
  id: number;
  title: string;
  description: string;
  price: string;
  highlight?: boolean;
}

export const services: Service[] = [
  {
    id: 1,
    title: "Criação de Site",
    description: "Site moderno, rápido e responsivo com design premium.",
    price: "R$ 150",
    highlight: true,
  },
  {
    id: 2,
    title: "Landing Page",
    description: "Página focada em conversão para vendas ou serviços.",
    price: "R$ 100",
  },
  {
    id: 3,
    title: "Correção de Bugs",
    description: "Arrumo erros do seu código e deixo tudo funcionando.",
    price: "R$ 50",
  },
  {
    id: 4,
    title: "Consultoria",
    description: "Te ajudo a criar seu app ou projeto do zero.",
    price: "R$ 30",
  },
];
