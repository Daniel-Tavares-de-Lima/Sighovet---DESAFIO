import { AtualizarRequisicaoEntrada, ConfiguracaoProcedimento, CriarRequisicaoEntrada, RequisicaoProcedimento } from "@/app/types/procedure";
import api from "./api";


//-Busca todas as requisições de exame e procedimento
export async function buscarRequisicoes(): Promise<RequisicaoProcedimento[]> {
    const resposta = await api.get<RequisicaoProcedimento[]>('/requisicoes');
    return resposta.data;
}

//Busca a lista de exame e procedimento disponíveis no formulário 
export async function buscarProcedimentosDisponiveis(): Promise<ConfiguracaoProcedimento[]>{
    const resposta = await api.get<ConfiguracaoProcedimento[]>('/procedimentosDisponiveis');
    return resposta.data;
}


//--Criar uma nova requisição de exame e procedimento
export async function criarRequisicao(data: CriarRequisicaoEntrada): Promise<RequisicaoProcedimento> {
    const resposta = await api.post<RequisicaoProcedimento>('/requisicoes', data);
    return resposta.data;
}

//Atualiza uma requisição de exame e procedimento existente
export async function atualizarRequisicao(requisicao: AtualizarRequisicaoEntrada): Promise<RequisicaoProcedimento> {
    const resposta = await api.patch<RequisicaoProcedimento>(`/requisicoes${requisicao.id}`, requisicao.data);
    return resposta.data;
}


//--Remove uma requisição pelo id
export async function removerRequisicao(id: string): Promise<void>{
    await api.delete(`/requisicoes/${id}`);
}