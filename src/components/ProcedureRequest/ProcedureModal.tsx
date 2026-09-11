"use client";
import { CriarRequisicaoEntrada, RequisicaoProcedimento } from "@/app/types/procedure";
import { useProcedimentosDisponiveis } from "@/hooks/useRequisicoes";
import { Button, Form, Input, Modal, Select, Spin } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { FileTextOutlined } from "@ant-design/icons";


type Props = {
    aberto: boolean;
    fechar: () => void;
    salvar: (dados: CriarRequisicaoEntrada) => void;
    atualizar: (id: string, dados: Partial<CriarRequisicaoEntrada>) => void;
    requisicaoAtual?: RequisicaoProcedimento | null;
}

type CamposFormulario = {
    procedimentoConfigId: number;
    texto: string;
}


export default function ProcedureModal({ aberto, fechar, salvar, atualizar, requisicaoAtual }: Props){
    const {data: procedimentos, isLoading} = useProcedimentosDisponiveis();
    const edicao = requisicaoAtual ? true : false;

    const {control, handleSubmit, register, reset} = useForm<CamposFormulario>({
        defaultValues: {
            procedimentoConfigId: 0,
            texto: "",
        }
    });

    useEffect(() => {
        if(aberto){
            reset({
                procedimentoConfigId: requisicaoAtual?.procedimentoConfigId,
                texto: requisicaoAtual?.texto || "",
            })
        }
    }, [aberto, requisicaoAtual, reset]);

    function enviar(campos: CamposFormulario){
        const procedimentoEscolhido = procedimentos?.find(
            ((p) => p.id === campos.procedimentoConfigId)
        );

        if(!procedimentoEscolhido){
            return;
        }

        if(edicao && requisicaoAtual){
            atualizar(requisicaoAtual.id, {
                procedimentoConfigId: procedimentoEscolhido.id,
                texto: campos.texto,
                procedimentoConfig: procedimentoEscolhido
            })
        }else{
            salvar({
                consultaId: 1,
                animalId: "1",
                procedimentoConfigId: procedimentoEscolhido.id,
                tipo: "exame",
                texto: campos.texto,
                procedimentoConfig: procedimentoEscolhido
            })
        }

        reset();
        fechar();
    }

    return (
    <Modal
        title={
            <span className="flex items-center gap-2 text-[#1f2a24]">
                <FileTextOutlined style={{ color: '#2f855a' }} />
                {edicao ? "Editar requisição" : "Nova requisição"}
            </span>
        }
        open={aberto}
        onCancel={fechar}
        footer={null}
        destroyOnHidden
        width={520}
        className="procedure-modal"
        styles={{
            body: { maxHeight: '70vh', overflowY: 'auto', padding: '20px 24px' }
        }}
    >
        <Form layout="vertical" onFinish={handleSubmit(enviar)} className="mt-2">
            <Form.Item
                label="Procedimento"
                required
                className="mb-4"
            >
                <Controller
                    name="procedimentoConfigId"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            placeholder="Selecione um exame"
                            loading={isLoading}
                            className="procedure-select"
                            options={procedimentos?.map((p) => ({ label: p.nome, value: p.id }))}
                        />
                    )}
                />
            </Form.Item>

            <Form.Item
                label="Justificativa"
                required
                className="mb-5"
            >
                <Controller
                    name="texto"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Input.TextArea
                            {...field}
                            rows={3}
                            placeholder="Descreva a justificativa"
                            className="procedure-textarea"
                        />
                    )}
                />
            </Form.Item>

            <div className="flex justify-end gap-2 pt-2">
                <Button onClick={fechar} className="rounded-lg">
                    Cancelar
                </Button>
                <Button type="primary" htmlType="submit" className="rounded-lg">
                    Salvar
                </Button>
            </div>
        </Form>
    </Modal>
  )
}