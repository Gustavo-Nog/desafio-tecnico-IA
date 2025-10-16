export type StatusPlano = 'rascunho' | 'publicado' | 'arquivado';

export interface IPlanoAula {
  id: string;
  usuario_id: string;
  titulo: string;
  disciplina: string;
  serie?: string;
  duracao_minutos: number;
  objetivos: string[];
  conteudo_gerado: string;
  metodologia?: string;
  recursos_necessarios: string[];
  avaliacao?: string;
  modelo_ia_usado?: string;
  tokens_usados?: number;
  status: StatusPlano;
  criado_em: Date;
  atualizado_em: Date;
}

export interface IPlanoAulaCriacao {
  usuario_id: string;
  titulo: string;
  disciplina: string;
  serie?: string;
  duracao_minutos: number;
  objetivos?: string[];
  conteudo_gerado: string;
  metodologia?: string;
  recursos_necessarios?: string[];
  avaliacao?: string;
  modelo_ia_usado?: string;
  tokens_usados?: number;
  status?: StatusPlano;
}

export interface IPlanoAulaAtualizacao {
  titulo?: string;
  disciplina?: string;
  serie?: string;
  duracao_minutos?: number;
  objetivos?: string[];
  conteudo_gerado?: string;
  metodologia?: string;
  recursos_necessarios?: string[];
  avaliacao?: string;
  status?: StatusPlano;
}

export interface IPlanoAulaDetalhado extends IPlanoAula {
  autor_nome?: string;
  autor_email?: string;
  autor_escola?: string;
  autor_disciplina_principal?: string;
}

export interface IFiltrosPlanoAula {
  status?: StatusPlano;
  disciplina?: string;
  serie?: string;
  termo_busca?: string;
  limite?: number;
  offset?: number;
}

export interface IParametrosGeracaoPlano {
  disciplina: string;
  tema: string;
  serie: string;
  duracao_minutos: number;
  objetivos?: string[];
  nivel_dificuldade?: 'básico' | 'intermediário' | 'avançado';
  metodologia_preferida?: string;
  recursos_disponiveis?: string[];
  template_id?: string;
}