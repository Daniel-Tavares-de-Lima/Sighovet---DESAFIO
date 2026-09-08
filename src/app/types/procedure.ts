
//--Representa as informações de um exame e procedimento
export interface ConfiguracaoProcedimento{
    id: number;
    nome: string;
    preco: number;
    status: string;
}

//--Representa uma requisição de exame e procedimento conectada a uma consulta
export interface RequisicaoProcedimento{
    id: string;
    consultaId: number;
    animalId: string;
    procedimentoConfigId: number;
    tipo: string;
    texto: string;
    procedimentoConfig: ConfiguracaoProcedimento;
}

//--Dados padrões para criar uma nova requisição de exame e procedimento
export interface CriarRequisicaoEntrada{
    consultaId: number;
    animalId: string;
    procedimentoConfigId: number;
    tipo: string;
    texto: string;
    procedimentoConfig: ConfiguracaoProcedimento; 
}


//--Dados padrões para atualizar uma requisição de exame e procedimento
export interface AtualizarRequisicaoEntrada{
    id: string;
    data: Partial<CriarRequisicaoEntrada>;
}