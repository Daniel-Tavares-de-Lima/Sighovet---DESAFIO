import { RequisicaoProcedimento } from "@/app/types/procedure";
import { Button, Empty, Popconfirm, Space, Tag } from "antd";
import { FileTextOutlined } from "@ant-design/icons";

type Props = {
    requisicoes: RequisicaoProcedimento[];
    aoEditar: (requisicao: RequisicaoProcedimento) => void;
    aoExcluir: (id: string) => void;
}

export default function ProcedureList({ requisicoes, aoEditar, aoExcluir }: Props) {
    if (requisicoes.length === 0) {
        return (
            <div className="card-suave p-8 text-center">
                <Empty
                    image={<FileTextOutlined style={{ fontSize: 48, color: '#9aa39c' }} />}
                    description="Nenhuma requisição ainda"
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            {requisicoes.map((requisicao) => (
                <div
                    key={requisicao.id}
                    className="card-suve p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-shadow hover:shadow-md"
                >
                    <div className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#e6f4ec] text-[#2f855a] shrink-0">
                            <FileTextOutlined />
                        </span>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <strong className="text-[#1f2a24]">{requisicao.procedimentoConfig.nome}</strong>
                                <Tag color="green" className="m-0 rounded-md">exame</Tag>
                            </div>
                            <p className="text-muted text-sm m-0 mt-1">
                                {requisicao.texto}
                            </p>
                            <span className="text-xs text-muted m-0">
                                ID: {requisicao.id}
                            </span>
                        </div>
                    </div>

                    <Space size="small">
                        <Button type="text" onClick={() => aoEditar(requisicao)} className="text-[#2f855a] border border-[#c6e5d4] hover:bg-[#e6f4ec] rounded-lg">
                            Editar
                        </Button>
                        <Popconfirm
                            title="Tem certeza que deseja excluir?"
                            onConfirm={() => aoExcluir(requisicao.id)}
                            okText="Sim"
                            cancelText="Não"
                        >
                            <Button type="text" danger className="rounded-lg border border-[#f5c2c0]">
                                Excluir
                            </Button>
                        </Popconfirm>
                    </Space>
                </div>
            ))}
        </div>
    );
}