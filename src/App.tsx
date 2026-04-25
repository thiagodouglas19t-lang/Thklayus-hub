import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const courses = [
    {
      id: 1,
      title: "Curso de Slides",
      price: "R$ 9,90",
      pix: "COLE_SEU_PIX_AQUI",
    },
    {
      id: 2,
      title: "Curso de Trabalhos",
      price: "R$ 14,90",
      pix: "COLE_SEU_PIX_AQUI",
    },
  ];

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", padding: 20 }}>
      <h1>THKLAYUS</h1>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("cursos")}>Cursos</button>
      </div>

      {page === "home" && (
        <div>
          <h2>Bem-vindo</h2>
          <p>Serviços baratos e cursos simples</p>
        </div>
      )}

      {page === "cursos" && (
        <div>
          <h2>Cursos</h2>

          {courses.map((c) => (
            <div key={c.id} style={{ border: "1px solid #333", padding: 10, marginTop: 10 }}>
              <h3>{c.title}</h3>
              <p>{c.price}</p>
              <button onClick={() => setSelectedCourse(c)}>Comprar</button>
            </div>
          ))}
        </div>
      )}

      {selectedCourse && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "#000000cc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ background: "#111", padding: 20 }}>
            <h2>{selectedCourse.title}</h2>
            <p>{selectedCourse.price}</p>

            <p>PIX:</p>
            <textarea value={selectedCourse.pix} readOnly style={{ width: "100%" }} />

            <br /><br />

            <button
              onClick={() => {
                alert("Comprovante enviado!");
                setSelectedCourse(null);
              }}
            >
              Já paguei
            </button>

            <button onClick={() => setSelectedCourse(null)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}
