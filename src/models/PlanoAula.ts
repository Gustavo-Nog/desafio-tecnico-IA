import { IPlanoAula, StatusPlano } from '../types/planoAula.types';

export class PlanoAula {
  private _id: string;
  private _usuarioId: string;
  private _titulo: string;
  private _disciplina: string;
  private _serie?: string;
  private _duracaoMinutos: number;
  private _objetivos: any[];
  private _conteudoGerado: string;
  private _metodologia?: string;
  private _recursosNecessarios: any[];
  private _avaliacao?: string;
  private _modeloIaUsado?: string;
  private _tokensUsados?: number;
  private _status: StatusPlano;
  private _criadoEm: Date;
  private _atualizadoEm: Date;

  constructor(dados: IPlanoAula) {
    this._id = dados.id;
    this._usuarioId = dados.usuario_id;
    this._titulo = dados.titulo;
    this._disciplina = dados.disciplina;
    this._serie = dados.serie;
    this._duracaoMinutos = dados.duracao_minutos;
    this._objetivos = dados.objetivos;
    this._conteudoGerado = dados.conteudo_gerado;
    this._metodologia = dados.metodologia;
    this._recursosNecessarios = dados.recursos_necessarios;
    this._avaliacao = dados.avaliacao;
    this._modeloIaUsado = dados.modelo_ia_usado;
    this._tokensUsados = dados.tokens_usados;
    this._status = dados.status;
    this._criadoEm = dados.criado_em;
    this._atualizadoEm = dados.atualizado_em;
  }

  get id(): string {
    return this._id;
  }

  get usuarioId(): string {
    return this._usuarioId;
  }

  get titulo(): string {
    return this._titulo;
  }

  get disciplina(): string {
    return this._disciplina;
  }

  get serie(): string | undefined {
    return this._serie;
  }

  get duracaoMinutos(): number {
    return this._duracaoMinutos;
  }

  get objetivos(): any[] {
    return this._objetivos;
  }

  get conteudoGerado(): string {
    return this._conteudoGerado;
  }

  get metodologia(): string | undefined {
    return this._metodologia;
  }

  get recursosNecessarios(): any[] {
    return this._recursosNecessarios;
  }

  get avaliacao(): string | undefined {
    return this._avaliacao;
  }

  get modeloIaUsado(): string | undefined {
    return this._modeloIaUsado;
  }

  get tokensUsados(): number | undefined {
    return this._tokensUsados;
  }

  get status(): StatusPlano {
    return this._status;
  }

  get criadoEm(): Date {
    return this._criadoEm;
  }

  get atualizadoEm(): Date {
    return this._atualizadoEm;
  }

  set titulo(valor: string) {
    if (valor.trim().length < 3) {
      throw new Error('Título deve ter pelo menos 3 caracteres');
    }
    this._titulo = valor;
  }

  set disciplina(valor: string) {
    if (valor.trim().length < 2) {
      throw new Error('Disciplina deve ter pelo menos 2 caracteres');
    }
    this._disciplina = valor;
  }

  set serie(valor: string | undefined) {
    this._serie = valor;
  }

  set duracaoMinutos(valor: number) {
    if (valor < 1 || valor > 300) {
      throw new Error('Duração deve estar entre 1 e 300 minutos');
    }
    this._duracaoMinutos = valor;
  }

  set objetivos(valor: any[]) {
    this._objetivos = valor;
  }

  set conteudoGerado(valor: string) {
    if (valor.trim().length < 10) {
      throw new Error('Conteúdo gerado deve ter pelo menos 10 caracteres');
    }
    this._conteudoGerado = valor;
  }

  set metodologia(valor: string | undefined) {
    this._metodologia = valor;
  }

  set recursosNecessarios(valor: any[]) {
    this._recursosNecessarios = valor;
  }

  set avaliacao(valor: string | undefined) {
    this._avaliacao = valor;
  }

  set status(valor: StatusPlano) {
    this._status = valor;
  }

  estaPublicado(): boolean {
    return this._status === 'publicado';
  }

  ehRascunho(): boolean {
    return this._status === 'rascunho';
  }

  estaArquivado(): boolean {
    return this._status === 'arquivado';
  }

  temDuracaoMinima(): boolean {
    return this._duracaoMinutos >= 30;
  }

  calcularNumeroAulas(): number {
    return Math.ceil(this._duracaoMinutos / 50);
  }

  adicionarObjetivo(objetivo: any): void {
    this._objetivos.push(objetivo);
  }

  removerObjetivo(indice: number): void {
    if (indice >= 0 && indice < this._objetivos.length) {
      this._objetivos.splice(indice, 1);
    }
  }

  adicionarRecurso(recurso: any): void {
    this._recursosNecessarios.push(recurso);
  }

  removerRecurso(indice: number): void {
    if (indice >= 0 && indice < this._recursosNecessarios.length) {
      this._recursosNecessarios.splice(indice, 1);
    }
  }

  estimarCusto(): number {
    if (!this._tokensUsados) return 0;
    // Aproximação: $0.002 por 1000 tokens (Gemini Pro)
    return (this._tokensUsados / 1000) * 0.002;
  }

  paraJSON(): IPlanoAula {
    return {
      id: this._id,
      usuario_id: this._usuarioId,
      titulo: this._titulo,
      disciplina: this._disciplina,
      serie: this._serie,
      duracao_minutos: this._duracaoMinutos,
      objetivos: this._objetivos,
      conteudo_gerado: this._conteudoGerado,
      metodologia: this._metodologia,
      recursos_necessarios: this._recursosNecessarios,
      avaliacao: this._avaliacao,
      modelo_ia_usado: this._modeloIaUsado,
      tokens_usados: this._tokensUsados,
      status: this._status,
      criado_em: this._criadoEm,
      atualizado_em: this._atualizadoEm,
    };
  }
}
