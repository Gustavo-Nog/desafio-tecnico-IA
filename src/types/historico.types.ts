export interface IHistoricoGeracao {
  id: string;
  usuario_id: string;
  plano_aula_id?: string;
  parametros: Record<string, any>;
  sucesso: boolean;
  mensagem_erro?: string;
  tempo_geracao_ms?: number;
  tokens_usados?: number;
  modelo_ia: string;
  criado_em: Date;
}

export interface IHistoricoGeracaoCriacao {
  usuario_id: string;
  plano_aula_id?: string;
  parametros: Record<string, any>;
  sucesso: boolean;
  mensagem_erro?: string;
  tempo_geracao_ms?: number;
  tokens_usados?: number;
  modelo_ia: string;
}

export interface IEstatisticasIA {
  modelo_ia: string;
  total_geracoes: number;
  geracoes_sucesso: number;
  geracoes_falha: number;
  tempo_medio_ms?: number;
  total_tokens_usados?: number;
  media_tokens_por_geracao?: number;
  ultima_geracao?: Date;
}

export interface IFiltrosHistorico {
  sucesso?: boolean;
  data_inicio?: Date;
  data_fim?: Date;
  limite?: number;
  offset?: number;
}