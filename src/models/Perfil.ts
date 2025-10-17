import { IPerfil } from '../types/perfil.types';

export class Perfil {
  private _authUid: string;
  private _email: string;
  private _nomeCompleto?: string;
  private _escola?: string;
  private _disciplinaPrincipal?: string;
  private _fotoUrl?: string;
  private _bio?: string;
  private _criadoEm: Date;
  private _atualizadoEm: Date;

  constructor(dados: IPerfil) {
    this._authUid = dados.auth_uid;
    this._email = dados.email;
    this._nomeCompleto = dados.nome_completo;
    this._escola = dados.escola;
    this._disciplinaPrincipal = dados.disciplina_principal;
    this._fotoUrl = dados.foto_url;
    this._bio = dados.bio;
    this._criadoEm = dados.criado_em;
    this._atualizadoEm = dados.atualizado_em;
  }

  get authUid(): string {
    return this._authUid;
  }

  get email(): string {
    return this._email;
  }

  get nomeCompleto(): string | undefined {
    return this._nomeCompleto;
  }

  get escola(): string | undefined {
    return this._escola;
  }

  get disciplinaPrincipal(): string | undefined {
    return this._disciplinaPrincipal;
  }

  get fotoUrl(): string | undefined {
    return this._fotoUrl;
  }

  get bio(): string | undefined {
    return this._bio;
  }

  get criadoEm(): Date {
    return this._criadoEm;
  }

  get atualizadoEm(): Date {
    return this._atualizadoEm;
  }

  set email(valor: string) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(valor)) {
      throw new Error('Email inválido');
    }
    this._email = valor;
  }

  set nomeCompleto(valor: string | undefined) {
    if (valor && valor.trim().length < 3) {
      throw new Error('Nome completo deve ter pelo menos 3 caracteres');
    }
    this._nomeCompleto = valor;
  }

  set escola(valor: string | undefined) {
    this._escola = valor;
  }

  set disciplinaPrincipal(valor: string | undefined) {
    this._disciplinaPrincipal = valor;
  }

  set fotoUrl(valor: string | undefined) {
    this._fotoUrl = valor;
  }

  set bio(valor: string | undefined) {
    if (valor && valor.length > 500) {
      throw new Error('Bio não pode ter mais de 500 caracteres');
    }
    this._bio = valor;
  }

  estaCompleto(): boolean {
    return !!(
      this._nomeCompleto &&
      this._escola &&
      this._disciplinaPrincipal
    );
  }


  paraJSON(): IPerfil {
    return {
      auth_uid: this._authUid,
      email: this._email,
      nome_completo: this._nomeCompleto,
      escola: this._escola,
      disciplina_principal: this._disciplinaPrincipal,
      foto_url: this._fotoUrl,
      bio: this._bio,
      criado_em: this._criadoEm,
      atualizado_em: this._atualizadoEm,
    };
  }
 
  obterIniciais(): string {
    if (!this._nomeCompleto) return '??';
    
    const nomes = this._nomeCompleto.trim().split(' ');
    if (nomes.length === 1) {
      return nomes[0].substring(0, 2).toUpperCase();
    }
    
    return (nomes[0][0] + nomes[nomes.length - 1][0]).toUpperCase();
  }

  
  obterPrimeiroNome(): string {
    if (!this._nomeCompleto) return 'Usuário';
    return this._nomeCompleto.trim().split(' ')[0];
  }
}
