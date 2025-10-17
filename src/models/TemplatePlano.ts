import { ITemplatePlano } from '../types/template.types';


export class TemplatePlano {
  private _id: string;
  private _criadorId: string;
  private _nome: string;
  private _descricao?: string;
  private _disciplina?: string;
  private _estrutura: Record<string, any>;
  private _publico: boolean;
  private _criadoEm: Date;
  private _atualizadoEm: Date;

  constructor(dados: ITemplatePlano) {
    this._id = dados.id;
    this._criadorId = dados.criador_id;
    this._nome = dados.nome;
    this._descricao = dados.descricao;
    this._disciplina = dados.disciplina;
    this._estrutura = dados.estrutura;
    this._publico = dados.publico;
    this._criadoEm = dados.criado_em;
    this._atualizadoEm = dados.atualizado_em;
  }

  get id(): string {
    return this._id;
  }

  get criadorId(): string {
    return this._criadorId;
  }

  get nome(): string {
    return this._nome;
  }

  get descricao(): string | undefined {
    return this._descricao;
  }

  get disciplina(): string | undefined {
    return this._disciplina;
  }

  get estrutura(): Record<string, any> {
    return this._estrutura;
  }

  get publico(): boolean {
    return this._publico;
  }

  get criadoEm(): Date {
    return this._criadoEm;
  }

  get atualizadoEm(): Date {
    return this._atualizadoEm;
  }


  set nome(valor: string) {
    if (valor.trim().length < 3) {
      throw new Error('Nome do template deve ter pelo menos 3 caracteres');
    }
    this._nome = valor;
  }

  set descricao(valor: string | undefined) {
    if (valor && valor.length > 500) {
      throw new Error('Descrição não pode ter mais de 500 caracteres');
    }
    this._descricao = valor;
  }

  set disciplina(valor: string | undefined) {
    this._disciplina = valor;
  }

  set estrutura(valor: Record<string, any>) {
    if (typeof valor !== 'object' || Array.isArray(valor)) {
      throw new Error('Estrutura deve ser um objeto');
    }
    this._estrutura = valor;
  }

  set publico(valor: boolean) {
    this._publico = valor;
  }


  estaPublico(): boolean {
    return this._publico;
  }


  estaPrivado(): boolean {
    return !this._publico;
  }

  clonar(): TemplatePlano {
    return new TemplatePlano({
      id: this._id,
      criador_id: this._criadorId,
      nome: `${this._nome} (Cópia)`,
      descricao: this._descricao,
      disciplina: this._disciplina,
      estrutura: JSON.parse(JSON.stringify(this._estrutura)),
      publico: false, // Cópias começam privadas
      criado_em: new Date(),
      atualizado_em: new Date(),
    });
  }


  temEstruturaValida(): boolean {
    return Object.keys(this._estrutura).length > 0;
  }


  obterSecoes(): string[] {
    return Object.keys(this._estrutura);
  }

  paraJSON(): ITemplatePlano {
    return {
      id: this._id,
      criador_id: this._criadorId,
      nome: this._nome,
      descricao: this._descricao,
      disciplina: this._disciplina,
      estrutura: this._estrutura,
      publico: this._publico,
      criado_em: this._criadoEm,
      atualizado_em: this._atualizadoEm,
    };
  }
}
