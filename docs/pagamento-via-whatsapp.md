# Pagamento via WhatsApp — AprendaJá

Por enquanto o pagamento do AprendaJá funciona pelo WhatsApp.

## Fluxo

1. O usuário entra em **Pagamento**.
2. Escolhe o produto.
3. Clica em **Finalizar pelo WhatsApp**.
4. O WhatsApp abre com uma mensagem pronta para o número de suporte.
5. O ADM confirma o pagamento manualmente.
6. O ADM aprova a compra no Supabase.
7. O acesso ao curso é liberado automaticamente.

## Aprovar compra no Supabase

Quando uma compra existir na tabela `compras`, rode:

```sql
update compras
set status = 'aprovado'
where id = 'ID_DA_COMPRA';
```

O trigger criado na migration libera o acesso na tabela `acessos_cursos`.

## Observação

Não coloque tokens de pagamento no GitHub. Quando for usar pagamento automático no futuro, as chaves devem ficar em Secrets/Env do Supabase ou Vercel.
