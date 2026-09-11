# SIG-HOVET — Componente de Requisições

Reprodução do componente de Requisições do sistema [SIG-HOVET](https://projeto.sig-hovet.site/),
feita como desafio técnico de seleção. CRUD completo (criar, listar, editar e excluir) em Next.js,
TypeScript, Ant Design, React Hook Form e TanStack Query, com backend mockado via `json-server`.

## Como rodar

```bash
npm install

# terminal 1 — mock da API
npm run mock

# terminal 2 — aplicação
npm run dev
```

Acesse `http://localhost:3000`. Confirme que `.env.local` tem `NEXT_PUBLIC_API_URL=http://localhost:3001`.

## Screenshots

![Listagem de requisições](public/screenshots/listagem.png)
![Criação de requisição](public/screenshots/criar.png)
![Edição de requisição](public/screenshots/editar.png)
![Exclusão de requisição](public/screenshots/excluir.png)

## Vídeo de demonstração

[Link do vídeo](https://drive.google.com/file/d/13ytHRyjR72HgJObzTkEq7PHQv8-u0Fz9/view?usp=drive_link)
