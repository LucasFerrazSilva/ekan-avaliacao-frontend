import { Documento } from "./documento.interface";

export interface BeneficiarioComDocumentos {
    id: number;
    nome: string;
    telefone: string;
    dataNascimento: Date;
    dataInclusao: Date;
    dataAtualizacao: Date;
    documentos: Documento[];
}