import { RequisicaoProcedimento } from "@/app/types/procedure";
import { Button, Popconfirm } from "antd";

type Props = {
    requisicoes: RequisicaoProcedimento[];
    aoEditar: (requisicao: RequisicaoProcedimento) => void;
    aoExcluir: (id: string) => void;
}

export default function ProcedureList({ requisicoes, aoEditar, aoExcluir }: Props) {
    if(requisicoes.length === 0){
        return <p>Nenhuma requisição cadastrada.</p>
    }

    return(
        <ul>
            {requisicoes.map((requisicao) => (
                <li key={requisicao.id}>
                    <strong>{requisicao.procedimentoConfig.nome}</strong>
                    <p>{requisicao.texto}</p>

                    <Button onClick={() => aoEditar(requisicao)}>Editar</Button>

                    <Popconfirm title="Tem certeza que deseja excluir?" onConfirm={() => aoExcluir(requisicao.id)} okText="Sim" cancelText="Não">
                        <Button danger>Excluir</Button>
                    </Popconfirm>
                </li>
            ))}
        </ul>
    )
}
