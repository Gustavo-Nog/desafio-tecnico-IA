export interface ITemplatePlano {
  id: string;
  criador_id: string;
  nome: string;
  descricao?: string;
  disciplina?: string;
  estrutura: Record<string, any>;
  publico: boolean;
  criado_em: Date;
  atualizado_em: Date;
}

export interface ITemplatePlanoCriacao {
  criador_id: string;
  nome: string;
  descricao?: string;
  disciplina?: string;
  estrutura: Record<string, any>;
  publico?: boolean;
}

export interface ITemplatePlanoAtualizacao {
  nome?: string;
  descricao?: string;
  disciplina?: string;
  estrutura?: Record<string, any>;
  publico?: boolean;
}

export interface ITemplatePublico {
  id: string;
  criador_id: string;
  nome: string;
  descricao?: string;
  disciplina?: string;
  estrutura: Record<string, any>;
  criado_em: Date;
  criador_nome?: string;
  criador_escola?: string;
}

export interface IFiltrosTemplate {
  disciplina?: string;
  termo_busca?: string;
  publico?: boolean;
  limite?: number;
  offset?: number;
}