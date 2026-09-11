"use client";
import { useAtualizarRequisicao, useCriarRequisicao, useRemoverRequisicao, useRequisicoes } from "@/hooks/useRequisicoes";
import { Button, Empty, message, Space, Spin, Tag, Tooltip } from "antd";
import { useState } from "react";
import { EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import ProcedureList from "./ProcedureList";
import ProcedureModal from "./ProcedureModal";
import { RequisicaoProcedimento } from "@/app/types/procedure";

export default function ProcedureRequest() {
    const [modalAberto, setModalAberto] = useState(false);
    const [requisicaoAtual, setRequisicaoAtual] = useState<RequisicaoProcedimento | null>(null);
    const { data, isLoading, isError, error } = useRequisicoes();
    const criarRequisicao = useCriarRequisicao();
    const atualizarRequisicao = useAtualizarRequisicao();
    const removerRequisicao = useRemoverRequisicao();

    if (isLoading) {
        return (
            <div className="card-suave p-10 flex flex-col items-center justify-center min-h-[200px]">
                <Spin size="large" />
                <p className="text-muted mt-3">Carregando requisições...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="card-suave p-10 text-center">
                <p className="text-red-600">Erro ao buscar as requisições: {String(error)}</p>
            </div>
        );
    }

    function abrirParaCriar() {
        setRequisicaoAtual(null);
        setModalAberto(true);
    }

    function abrirParaEditar(requisicao: RequisicaoProcedimento) {
        setRequisicaoAtual(requisicao);
        setModalAberto(true);
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="card-suave p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl font-semibold text-[#1f2a24] m-0">
                        Requisições de exames
                    </h1>
                    <p className="text-muted text-sm m-0">
                        Gerencie as requisições de procedimentos veterinários.
                    </p>
                </div>
                <Button type="primary" icon={<PlusOutlined />} onClick={abrirParaCriar} className="rounded-lg">
                    Nova requisição
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
                })}
                atualizar={(id, dados) => atualizarRequisicao.mutate(
                    { id, data: dados },
                    { onError: () => message.error("Não foi possível atualizar a requisição.") }
                )}
            />
        </div>
    );
}