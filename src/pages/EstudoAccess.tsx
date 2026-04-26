import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

type Compra = {
  id: string;
  course_id?: string | null;
  course_title?: string | null;
  status: string;
};

type AcessoCurso = {
  id: string;
  produto_id: string;
  liberado_em?: string;
};

export function useCourseAccess() {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [acessos, setAcessos] = useState<AcessoCurso[]>([]);
  const [loadingAccess, setLoadingAccess] = useState(true);

  const liberadas = useMemo(() => compras.filter((item) => item.status === "compra aprovada"), [compras]);
  const cursosLiberados = useMemo(() => new Set(acessos.map((item) => item.produto_id)), [acessos]);

  useEffect(() => {
    carregarAcessos();
  }, []);

  async function carregarAcessos() {
    setLoadingAccess(true);
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      setLoadingAccess(false);
      return;
    }

    const { data: comprasData } = await supabase
      .from("chat_threads")
      .select("id,course_id,course_title,status")
      .eq("user_id", userData.user.id)
      .eq("type", "purchase");

    const { data: acessosData } = await supabase
      .from("acessos_cursos")
      .select("id,produto_id,liberado_em")
      .eq("user_id", userData.user.id);

    setCompras((comprasData ?? []) as Compra[]);
    setAcessos((acessosData ?? []) as AcessoCurso[]);
    setLoadingAccess(false);
  }

  function temAcesso(courseId: string, title: string, free?: boolean) {
    if (free) return true;
    if (cursosLiberados.has(courseId)) return true;
    return liberadas.some((compra) => compra.course_id === courseId || compra.course_title === title);
  }

  return { compras, acessos, loadingAccess, carregarAcessos, temAcesso };
}
