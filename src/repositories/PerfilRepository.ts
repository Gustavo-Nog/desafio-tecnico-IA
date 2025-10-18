import supabase from '../utils/supabase';
import { Perfil } from '../models/Perfil';
import { 
  IPerfil, 
  IPerfilCriacao, 
  IPerfilAtualizacao,
  IEstatisticasPerfil,
  IFiltrosPerfil
} from '../types/perfil.types';

export class PerfilRepository {
  private static readonly TABELA = 'perfis';

  static async criar(dados: IPerfilCriacao): Promise<Perfil> {
    const { data, error } = await supabase
      .from(this.TABELA)
      .insert(dados)
      .select()
      .single();

    if (error) {
      throw new Error(`Erro ao criar perfil: ${error.message}`);
    }

    return this.converterParaModel(data);
  }


  static async buscarPorId(id: string): Promise<Perfil | null> {
    const { data, error } = await supabase
      .from(this.TABELA)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Não encontrado
      }
      throw new Error(`Erro ao buscar perfil: ${error.message}`);
    }

    return this.converterParaModel(data);
  }

  static async buscarPorAuthUid(authUid: string): Promise<Perfil | null> {
    const { data, error } = await supabase
      .from(this.TABELA)
      .select('*')
      .eq('auth_uid', authUid)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Não encontrado
      }
      throw new Error(`Erro ao buscar perfil por auth_uid: ${error.message}`);
    }

    return this.converterParaModel(data);
  }

  static async buscarPorEmail(email: string): Promise<Perfil | null> {
    const { data, error } = await supabase
      .from(this.TABELA)
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Não encontrado
      }
      throw new Error(`Erro ao buscar perfil por email: ${error.message}`);
    }

    return this.converterParaModel(data);
  }

  static async listar(pagina: number = 1, limite: number = 10): Promise<Perfil[]> {
    const inicio = (pagina - 1) * limite;

    const { data, error } = await supabase
      .from(this.TABELA)
      .select('*')
      .order('criado_em', { ascending: false })
      .range(inicio, inicio + limite - 1);

    if (error) {
      throw new Error(`Erro ao listar perfis: ${error.message}`);
    }

    return data.map((item: IPerfil) => this.converterParaModel(item));
  }

  static async buscarPorDisciplina(disciplina: string): Promise<Perfil[]> {
    const { data, error } = await supabase
      .from(this.TABELA)
      .select('*')
      .eq('disciplina_principal', disciplina)
      .order('nome_completo', { ascending: true });

    if (error) {
      throw new Error(`Erro ao buscar perfis por disciplina: ${error.message}`);
    }

    return data.map((item: IPerfil) => this.converterParaModel(item));
  }

  static async buscarPorNivel(nivel: string): Promise<Perfil[]> {
    const { data, error } = await supabase
      .from(this.TABELA)
      .select('*')
      .eq('nivel_ensino', nivel)
      .order('nome_completo', { ascending: true });

    if (error) {
      throw new Error(`Erro ao buscar perfis por nível: ${error.message}`);
    }

    return data.map((item: IPerfil) => this.converterParaModel(item));
  }

  static async atualizar(id: string, dados: IPerfilAtualizacao): Promise<Perfil> {
    const { data, error } = await supabase
      .from(this.TABELA)
      .update(dados)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Erro ao atualizar perfil: ${error.message}`);
    }

    return this.converterParaModel(data);
  }

  static async deletar(id: string): Promise<boolean> {
    const { error } = await supabase
      .from(this.TABELA)
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Erro ao deletar perfil: ${error.message}`);
    }

    return true;
  }

  static async obterEstatisticas(perfilId: string): Promise<IEstatisticasPerfil | null> {
    const { data, error } = await supabase
      .from('estatisticas_planos_usuario')
      .select('*')
      .eq('perfil_id', perfilId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Não encontrado
      }
      throw new Error(`Erro ao obter estatísticas: ${error.message}`);
    }

    return data as IEstatisticasPerfil;
  }

  static async contar(): Promise<number> {
    const { count, error } = await supabase
      .from(this.TABELA)
      .select('*', { count: 'exact', head: true });

    if (error) {
      throw new Error(`Erro ao contar perfis: ${error.message}`);
    }

    return count || 0;
  }

  static async emailExiste(email: string): Promise<boolean> {
    const { count, error } = await supabase
      .from(this.TABELA)
      .select('*', { count: 'exact', head: true })
      .eq('email', email);

    if (error) {
      throw new Error(`Erro ao verificar email: ${error.message}`);
    }

    return (count || 0) > 0;
  }

  private static converterParaModel(data: IPerfil): Perfil {
    return new Perfil(data);
  }
}
