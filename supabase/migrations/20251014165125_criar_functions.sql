CREATE OR REPLACE FUNCTION public.touch_atualizado_em()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.atualizado_em = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_perfis_touch
  BEFORE UPDATE ON public.perfis
  FOR EACH ROW EXECUTE FUNCTION public.touch_atualizado_em();

CREATE TRIGGER trg_planos_aula_touch
  BEFORE UPDATE ON public.planos_aula
  FOR EACH ROW EXECUTE FUNCTION public.touch_atualizado_em();

CREATE TRIGGER trg_templates_touch
  BEFORE UPDATE ON public.templates
  FOR EACH ROW EXECUTE FUNCTION public.touch_atualizado_em();

CREATE OR REPLACE FUNCTION public.buscar_planos_aula(
  p_usuario_id UUID,
  p_termo_busca TEXT DEFAULT NULL,
  p_disciplina TEXT DEFAULT NULL,
  p_serie TEXT DEFAULT NULL,
  p_status TEXT DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  titulo TEXT,
  disciplina TEXT,
  serie TEXT,
  duracao_minutos INTEGER,
  status TEXT,
  criado_em TIMESTAMPTZ,
  relevancia REAL
)
LANGUAGE sql
AS $$
  WITH params AS (
    SELECT 
      NULLIF(TRIM(p_termo_busca), '') AS termo,
      p_disciplina AS disc,
      p_serie AS serie,
      p_status AS st
  )
  SELECT 
    pa.id, pa.titulo, pa.disciplina, pa.serie,
    pa.duracao_minutos, pa.status, pa.criado_em,
    CASE WHEN params.termo IS NOT NULL THEN
      ts_rank(
        to_tsvector('portuguese', pa.conteudo_gerado),
        plainto_tsquery('portuguese', params.termo)
      )
    ELSE 0 END AS relevancia
  FROM public.planos_aula pa, params
  WHERE pa.usuario_id = p_usuario_id
    AND (params.termo IS NULL OR to_tsvector('portuguese', pa.conteudo_gerado) @@ plainto_tsquery('portuguese', params.termo))
    AND (params.disc IS NULL OR pa.disciplina = params.disc)
    AND (params.serie IS NULL OR pa.serie = params.serie)
    AND (params.st IS NULL OR pa.status = params.st)
  ORDER BY relevancia DESC, pa.criado_em DESC;
$$;

CREATE OR REPLACE FUNCTION public.criar_perfil_usuario()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
BEGIN
  INSERT INTO public.perfis (auth_uid, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (auth_uid) DO NOTHING;
  RETURN NEW;
END;
$$;

 CREATE TRIGGER trg_auto_perfil
   AFTER INSERT ON auth.users
   FOR EACH ROW EXECUTE FUNCTION public.criar_perfil_usuario();