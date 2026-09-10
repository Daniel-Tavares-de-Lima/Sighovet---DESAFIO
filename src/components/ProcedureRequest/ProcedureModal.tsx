"use client";
import { CriarRequisicaoEntrada } from "@/app/types/procedure";
import { useProcedimentosDisponiveis } from "@/hooks/useRequisicoes";
import { Button, Form, Input, Modal, Select } from "antd";
import { Controller, useForm } from "react-hook-form";


type Props = {
    aberto: boolean;
    fechar: () => void;
    salvar: (dados: CriarRequisicaoEntrada) => void;
}

//--Formato dos campos do formulário de requisição de exame e procedimento
type CamposFormulario = {
    procedimentoConfigId: number;
    texto: string;
}

export default function ProcedureModal({ aberto, fechar, salvar }: Props){
    const {data: procedimentos} = useProcedimentosDisponiveis();
    

    //-Criando o formulario 
    const {control, handleSubmit, register, reset} = useForm<CamposFormulario>({
        defaultValues: {
            procedimentoConfigId: 0,
            texto: "",
        }
    });

    //--Função para enviar os dados do formulário
    function enviar(campos: CamposFormulario){

        //-pega a lista procedimentos e procura o procedimento que o id é igual ao que o usário escolheu 
        const procedimentoEscolhido = procedimentos?.find(
            ((p) => p.id === campos.procedimentoConfigId)
        );
        
        //--Procedimento não encontrado
        if(!procedimentoEscolhido){
            alert("Procedimento inválido");
            return;
        }

        salvar({
            consultaId: 1, //--Consulta fixa para teste
            animalId: "1", //--Animal fixo para teste
            procedimentoConfigId: procedimentoEscolhido.id,
            tipo: "exame", //--Tipo fixo para teste
            texto: campos.texto,
            procedimentoConfig: procedimentoEscolhido, //--Envia o objeto inteiro para o json-server salvar junto e facilitar a exibição no server
        })

        reset(); //--Limpa os campos do formulário
        fechar(); //--Fecha o modal
    }

    return (
        <Modal title="Nova requisição" open={aberto} onCancel={fechar} footer={null}>
                <Form layout="vertical" onFinish={handleSubmit(enviar)}>
            <Form.Item label="Procedimento" required>
            <Controller
                name="procedimentoConfigId"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                <Select
                    {...field}
                    placeholder="Selecione um exame"
                    options={procedimentos?.map((p) => ({
                    label: p.nome,
                    value: p.id,
                    }))}
                />
                )}
            />
            </Form.Item>

            <Form.Item label="Justificativa" required>
            <Controller
                name="texto"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                <Input.TextArea {...field} rows={3} placeholder="Descreva a justificativa" />
                )}
            />
            </Form.Item>

            <Button type="primary" htmlType="submit">
            Salvar
            </Button>
        </Form>
        </Modal>
    )
}

