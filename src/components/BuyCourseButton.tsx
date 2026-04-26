type BuyCourseButtonProps = {
  courseTitle: string;
  price: string;
};

export default function BuyCourseButton({ courseTitle, price }: BuyCourseButtonProps) {
  const phone = "5585992686478";
  const message = encodeURIComponent(`Olá! Quero comprar o curso: ${courseTitle} (${price}) pelo AprendaJá.`);

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-black text-black shadow-lg shadow-blue-500/20 transition hover:scale-[1.03] active:scale-95"
    >
      Comprar pelo WhatsApp
    </a>
  );
}
