export interface IPerfil {
  auth_uid: string;
  email: string;
  nome_completo?: string;
  escola?: string;
  disciplina_principal?: string;
  foto_url?: string;
  bio?: string;
  criado_em: Date;
  atualizado_em: Date;
}

export interface IPerfilCriacao {
  auth_uid: string;
  email: string;
  nome_completo?: string;
  escola?: string;
  disciplina_principal?: string;
  foto_url?: string;
  bio?: string;
}

export interface IPerfilAtualizacao {
  email?: string;
  nome_completo?: string;
  escola?: string;
  disciplina_principal?: string;
  foto_url?: string;
  bio?: string;
}

export interface IEstatisticasPerfil {
  usuario_id: string;
  nome_completo?: string;
  email: string;
  total_planos: number;
  planos_publicados: number;
  planos_rascunho: number;
  planos_arquivados: number;
  duracao_media_minutos?: number;
  total_tokens_usados?: number;
  ultimo_plano_criado?: Date;
}

export interface IFiltrosPerfil {
  disciplina?: string;
  escola?: string;
  limite?: number;
  offset?: number;
}