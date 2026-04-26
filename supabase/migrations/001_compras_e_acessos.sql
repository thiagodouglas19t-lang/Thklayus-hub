-- AprendaJá / THKLAYUS
-- Base para pagamento automático + liberação automática de curso.

create table if not exists public.produtos (
  id text primary key,
  nome text not null,
  descricao text,
  preco_centavos integer not null default 0,
  ativo boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.compras (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  produto_id text references public.produtos(id) on delete set null,
  status text not null default 'pendente',
  valor_centavos integer not null default 0,
  provedor text not null default 'manual',
  provedor_payment_id text,
  checkout_url text,
  created_at timestamptz not null default now(),
  approved_at timestamptz
);

create table if not exists public.acessos_cursos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  produto_id text not null references public.produtos(id) on delete cascade,
  compra_id uuid references public.compras(id) on delete set null,
  liberado_em timestamptz not null default now(),
  unique(user_id, produto_id)
);

alter table public.produtos enable row level security;
alter table public.compras enable row level security;
alter table public.acessos_cursos enable row level security;

create policy "Produtos ativos são públicos"
  on public.produtos for select
  using (ativo = true);

create policy "Usuário vê as próprias compras"
  on public.compras for select
  using (auth.uid() = user_id);

create policy "Usuário cria a própria compra"
  on public.compras for insert
  with check (auth.uid() = user_id);

create policy "Usuário vê os próprios acessos"
  on public.acessos_cursos for select
  using (auth.uid() = user_id);

insert into public.produtos (id, nome, descricao, preco_centavos, ativo)
values
  ('curso-basico', 'Curso Básico', 'Acesso inicial aos conteúdos do AprendaJá.', 1990, true),
  ('suporte-premium', 'Suporte Premium', 'Atendimento prioritário para dúvidas e pedidos.', 990, true),
  ('servico-escolar', 'Serviço Escolar', 'Pedido de apresentação, resumo ou material de estudo.', 0, true)
on conflict (id) do update set
  nome = excluded.nome,
  descricao = excluded.descricao,
  preco_centavos = excluded.preco_centavos,
  ativo = excluded.ativo;

create or replace function public.liberar_acesso_apos_aprovacao()
returns trigger
language plpgsql
security definer
as $$
begin
  if new.status = 'aprovado' and old.status is distinct from 'aprovado' and new.user_id is not null and new.produto_id is not null then
    insert into public.acessos_cursos (user_id, produto_id, compra_id)
    values (new.user_id, new.produto_id, new.id)
    on conflict (user_id, produto_id) do nothing;

    new.approved_at = coalesce(new.approved_at, now());
  end if;

  return new;
end;
$$;

drop trigger if exists trg_liberar_acesso_apos_aprovacao on public.compras;

create trigger trg_liberar_acesso_apos_aprovacao
before update on public.compras
for each row
execute function public.liberar_acesso_apos_aprovacao();
