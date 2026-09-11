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
        <ul className="flex flex-col gap-3">
            {requisicoes.map((requisicao) => (
                <li key={requisicao.id} className="border rounded-lg p-3 flex justify-between items-start">
                    <div>
                        <strong>{requisicao.procedimentoConfig.nome}</strong>
                        <p className="text-sm text-gray-600">{requisicao.texto}</p>
                    </div>

                    <div className="flex gap-2">
                        <Button onClick={() => aoEditar(requisicao)}>Editar</Button>

                        <Popconfirm title="Tem certeza que deseja excluir?" onConfirm={() => aoExcluir(requisicao.id)} okText="Sim" cancelText="Não">
                            <Button danger>Excluir</Button>
                        </Popconfirm>
                    </div>
                </li>
            ))}
        </ul>
    )
}
