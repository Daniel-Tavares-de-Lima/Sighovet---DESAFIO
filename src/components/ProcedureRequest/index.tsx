"use client";
import { useCriarRequisicao, useRequisicoes } from "@/hooks/useRequisicoes";
import { Button } from "antd";
import { useState } from "react";
import ProcedureList from "./ProcedureList";
import ProcedureModal from "./ProcedureModal";

export default function ProcedureRequest() {
    const [modalAberto, setModalAberto] = useState(false);
    const {data, isLoading, isError, error} = useRequisicoes();
    const criarRequisicao = useCriarRequisicao();

    //--Carregando as requisições
    if(isLoading){
        return <p>Carregando requisições...</p>
    }

    //--Erro ao buscar as requisições
    if(isError){
        return <p>Erro ao buscar as requisições: {String(error)}</p>
    }

    return(
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2>Requisições</h2>
                <Button type="primary" onClick={() => setModalAberto(true)}>
                    + Nova requisição
                </Button>
            </div>

            <ProcedureList requisicoes={data ?? []} />
            <ProcedureModal aberto={modalAberto} fechar={() => setModalAberto(false)} salvar={(dados) => criarRequisicao.mutate(dados)} />

        </div>
    )
}