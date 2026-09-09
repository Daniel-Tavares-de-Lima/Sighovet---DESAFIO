import { RequisicaoProcedimento } from "@/app/types/procedure";

type Props = {
    requisicoes: RequisicaoProcedimento[];
}

export default function ProcedureList({ requisicoes }: Props) {
    if(requisicoes.length === 0){
        return <p>Nenhuma requisição cadastrada.</p>
    }

    return(
        <ul>
            {requisicoes.map((requisicao) => (
                <li key={requisicao.id}>
                    <strong>{requisicao.procedimentoConfig.nome}</strong>
                    <p>{requisicao.texto}</p>
                </li>
            ))}
        </ul>
    )
}
