import { IHistoricoGeracao } from '../types/historico.types';

export class HistoricoGeracao {
  private readonly _id: string;
  private readonly _usuarioId: string;
  private readonly _planoAulaId?: string;
  private readonly _parametros: Record<string, any>;
  private readonly _sucesso: boolean;
  private readonly _mensagemErro?: string;
  private readonly _tempoGeracaoMs?: number;
  private readonly _tokensUsados?: number;
  private readonly _modeloIa: string;
  private readonly _criadoEm: Date;

  constructor(dados: IHistoricoGeracao) {
    this._id = dados.id;
    this._usuarioId = dados.usuario_id;
    this._planoAulaId = dados.plano_aula_id;
    this._parametros = dados.parametros;
    this._sucesso = dados.sucesso;
    this._mensagemErro = dados.mensagem_erro;
    this._tempoGeracaoMs = dados.tempo_geracao_ms;
    this._tokensUsados = dados.tokens_usados;
    this._modeloIa = dados.modelo_ia;
    this._criadoEm = dados.criado_em;
  }

  get id(): string {
    return this._id;
  }

  get usuarioId(): string {
    return this._usuarioId;
  }

  get planoAulaId(): string | undefined {
    return this._planoAulaId;
  }

  get parametros(): Record<string, any> {
    return this._parametros;
  }

  get sucesso(): boolean {
    return this._sucesso;
  }

  get mensagemErro(): string | undefined {
    return this._mensagemErro;
  }

  get tempoGeracaoMs(): number | undefined {
    return this._tempoGeracaoMs;
  }

  get tokensUsados(): number | undefined {
    return this._tokensUsados;
  }

  get modeloIa(): string {
    return this._modeloIa;
  }

  get criadoEm(): Date {
    return this._criadoEm;
  }

  foiSucesso(): boolean {
    return this._sucesso;
  }

  foiFalha(): boolean {
    return !this._sucesso;
  }

  obterTempoEmSegundos(): number {
    if (!this._tempoGeracaoMs) return 0;
    return this._tempoGeracaoMs / 1000;
  }

  obterCustoEstimado(): number {
    if (!this._tokensUsados) return 0;
    // Aproximação: $0.002 por 1000 tokens (Gemini Pro)
    return (this._tokensUsados / 1000) * 0.002;
  }


  foiRapida(): boolean {
    return this.obterTempoEmSegundos() < 5;
  }


  foiLenta(): boolean {
    return this.obterTempoEmSegundos() > 10;
  }

  obterResumo(): string {
    const status = this._sucesso ? '✅ Sucesso' : '❌ Falha';
    const tempo = this._tempoGeracaoMs ? `${this.obterTempoEmSegundos().toFixed(2)}s` : 'N/A';
    const tokens = this._tokensUsados ? `${this._tokensUsados} tokens` : 'N/A';
    
    return `${status} - ${tempo} - ${tokens} - ${this._modeloIa}`;
  }


  gerouPlano(): boolean {
    return !!this._planoAulaId;
  }


  paraJSON(): IHistoricoGeracao {
    return {
      id: this._id,
      usuario_id: this._usuarioId,
      plano_aula_id: this._planoAulaId,
      parametros: this._parametros,
      sucesso: this._sucesso,
      mensagem_erro: this._mensagemErro,
      tempo_geracao_ms: this._tempoGeracaoMs,
      tokens_usados: this._tokensUsados,
      modelo_ia: this._modeloIa,
      criado_em: this._criadoEm,
    };
  }
}
