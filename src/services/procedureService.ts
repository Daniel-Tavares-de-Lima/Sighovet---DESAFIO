import { AtualizarRequisicaoEntrada, ConfiguracaoProcedimento, CriarRequisicaoEntrada, RequisicaoProcedimento } from "@/app/types/procedure";
import api from "./api";


//-Busca todas as requisições de exame e procedimento
export async function buscarRequisicoes(): Promise<RequisicaoProcedimento[]> {
    const response = await api.get<RequisicaoProcedimento[]>('/procedimentoRequests');
    return response.data;
}

//Busca a lista de exame e procedimento disponíveis no formulário 
export async function buscarProcedimentosDisponiveis(): Promise<ConfiguracaoProcedimento[]>{
    const response = await api.get<ConfiguracaoProcedimento[]>('/procedimentosDisponiveis');
    return response.data;
}


//--Criar uma nova requisição de exame e procedimento
export async function criarRequisicao(data: CriarRequisicaoEntrada): Promise<RequisicaoProcedimento> {
    const response = await api.post<RequisicaoProcedimento>('/procedimentoRequests', data);
    return response.data;
}

//Atualiza uma requisição de exame e procedimento existente
export async function atualizarRequisicao(requisicao: AtualizarRequisicaoEntrada): Promise<RequisicaoProcedimento> {
    const response = await api.patch<RequisicaoProcedimento>(`/procedimentoRequests/${requisicao.id}`, requisicao.data);
    return response.data;
}


//--Remove uma requisição pelo id
export async function removerRequisicao(id: string): Promise<void>{
    await api.delete(`/procedimentoRequests/${id}`);
}