"use client";
import { useAtualizarRequisicao, useCriarRequisicao, useRemoverRequisicao, useRequisicoes } from "@/hooks/useRequisicoes";
import { Button, message } from "antd";
import { useState } from "react";
import ProcedureList from "./ProcedureList";
import ProcedureModal from "./ProcedureModal";
import { RequisicaoProcedimento } from "@/app/types/procedure";

export default function ProcedureRequest() {
    const [modalAberto, setModalAberto] = useState(false);
    const [requisicaoAtual, setRequisicaoAtual] = useState<RequisicaoProcedimento | null>(null);
    const {data, isLoading, isError, error} = useRequisicoes();
    const criarRequisicao = useCriarRequisicao();
    const atualizarRequisicao = useAtualizarRequisicao();
    const removerRequisicao = useRemoverRequisicao();

    //--Carregando as requisições
    if(isLoading){
        return <p>Carregando requisições...</p>
    }

    //--Erro ao buscar as requisições
    if(isError){
        return <p>Erro ao buscar as requisições: {String(error)}</p>
    }

    //--Função para abrir o modal de edição
    function abrirParaCriar(){
        setRequisicaoAtual(null); // null pq modal em modo de criação
        setModalAberto(true);
    }

    //--Função para abrir o modal de edição
    function abrirParaEditar(requisicao: RequisicaoProcedimento){
        setRequisicaoAtual(requisicao);
        setModalAberto(true);
    }

    return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Requisições</h2>
        <Button type="primary" onClick={abrirParaCriar}>
          + Nova requisição
        </Button>
      </div>

      <ProcedureList
        requisicoes={data ?? []}
        aoEditar={abrirParaEditar}
        aoExcluir={(id) =>
          removerRequisicao.mutate(id, {
            onError: () => message.error("Não foi possível excluir a requisição."),
          })
        }
      />

      <ProcedureModal
        aberto={modalAberto}
        fechar={() => setModalAberto(false)}
        requisicaoAtual={requisicaoAtual}
        salvar={(dados) => criarRequisicao.mutate(dados, {
            onError: () => message.error("Não foi possível criar a requisição."),
          })
        }
        atualizar={(id, dados) => atualizarRequisicao.mutate(
            { id, data: dados },
            { onError: () => message.error("Não foi possível atualizar a requisição.") }
          )
        }
      />
    </div>
  );
}