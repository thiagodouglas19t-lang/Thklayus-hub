type LockedCoursePreviewProps = {
  title: string;
  price: string;
};

export default function LockedCoursePreview({ title, price }: LockedCoursePreviewProps) {
  return (
    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-100">
      <p className="font-black">🔒 Curso bloqueado</p>
      <p className="mt-1 text-amber-100/80">
        Para acessar <strong>{title}</strong>, compre o curso e aguarde a aprovação no chat.
      </p>
      <p className="mt-2 font-black text-amber-200">Valor: {price}</p>
    </div>
  );
}
