"use client";

import { useRequisicoes } from "@/hooks/useRequisicoes";
import ProcedureList from "@/components/ProcedureRequest/ProcedureList";

export default function Home() {
  const { data, isLoading, isError, error } = useRequisicoes();

  if (isLoading) {
    return <p>Carregando requisições...</p>;
  }

  if (isError) {
    return <p>Erro ao buscar requisições: {String(error)}</p>;
  }

  return (
    <div>
      <h1>Requisições</h1>
      <ProcedureList requisicoes={data ?? []} />
    </div>
  );
}