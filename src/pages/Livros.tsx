import { educationalBooks } from "../data/books";

export default function Livros() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-black">📚 Biblioteca Educativa</h1>
        <p className="text-zinc-400 mt-2">Livros simples, práticos e para todas as idades</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {educationalBooks.map((book) => (
          <div key={book.id} className="p-4 rounded-2xl border border-white/10 bg-white/5">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{book.cover}</div>
              <div>
                <h2 className="font-black">{book.title}</h2>
                <p className="text-sm text-zinc-400">{book.subtitle}</p>
              </div>
            </div>

            <p className="mt-3 text-sm text-zinc-300">{book.description}</p>

            <div className="mt-3 text-xs text-zinc-500">
              {book.age} • {book.category} • {book.readingTime}
            </div>

            <div className="mt-4 space-y-3">
              {book.chapters.map((chapter, index) => (
                <div key={index} className="p-3 rounded-xl bg-black/40">
                  <h3 className="font-bold">{chapter.title}</h3>
                  <p className="text-sm text-zinc-300 mt-1">{chapter.content}</p>

                  <p className="text-xs text-blue-300 mt-2">
                    💭 {chapter.reflection}
                  </p>

                  <p className="text-xs text-green-300 mt-1">
                    ✅ {chapter.activity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
