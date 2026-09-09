import { atualizarRequisicao, buscarProcedimentosDisponiveis, buscarRequisicoes, criarRequisicao, removerRequisicao } from "@/services/procedureService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


//--Busca a lista de exame e procedimento
export function useRequisicoes(){
    //--UseQuery buscar os dados
    return useQuery({
        queryKey: ['requisicoes'], //--Qual dado estou controlando
        queryFn: buscarRequisicoes, //--Como vou buscar
    });
}

//--Busca a lista de exame e procedimento disponíveis no formulário
export function useProcedimentosDisponiveis(){
    //--UseQuery buscar os dados
    return useQuery({
        queryKey: ['procedimentosDisponiveis'], //--Qual dado estou controlando
        queryFn: buscarProcedimentosDisponiveis, //--Como vou buscar
        staleTime: 1000 * 60 * 10, // Depois de 10 minutos considerar esses dados desatualizados
    });
}
//--Cria uma nova requisição de exame e procedimento
export function useCriarRequisicao(){
    const queryClient = useQueryClient();
    //--UseMutation para alterar os dados
    return useMutation({
        mutationFn: criarRequisicao,
        onSuccess: () => {
            //--Depois de criar avisa o TanStack que a lista está desatualizada e precisa ser recarregada
            queryClient.invalidateQueries({queryKey: ["requisicoes"]});
        }
    })
}

//--Atualiza uma requisição de exame e procedimento 
export function useAtualizarRequisicao(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: atualizarRequisicao,
        onSuccess: () => {
            //--Depois de atualizar avisa o TanStack que a lista está desatualizada e precisa ser recarregada
            queryClient.invalidateQueries({queryKey: ["requisicoes"]});
        }
    })
}

//--Remove uma requisição de exame e procedimento 
export function useRemoverRequisicao(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removerRequisicao,
        onSuccess: () => {
            //--Depois de remover avisa o TanStack que a lista está desatualizada e precisa ser recarregada
            queryClient.invalidateQueries({queryKey: ["requisicoes"]});
        }
    })
}