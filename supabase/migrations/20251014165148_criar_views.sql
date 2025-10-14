CREATE OR REPLACE VIEW public.estatisticas_planos_usuario AS
SELECT 
    p.auth_uid AS usuario_id, p.nome_completo, p.email,
    COUNT(pa.id) AS total_planos,
    COUNT(CASE WHEN pa.status = 'publicado' THEN 1 END) AS planos_publicados,
    COUNT(CASE WHEN pa.status = 'rascunho' THEN 1 END) AS planos_rascunho,
    COUNT(CASE WHEN pa.status = 'arquivado' THEN 1 END) AS planos_arquivados,
    AVG(pa.duracao_minutos)::INTEGER AS duracao_media_minutos,
    SUM(pa.tokens_usados) AS total_tokens_usados,
    MAX(pa.criado_em) AS ultimo_plano_criado
FROM public.perfis p
LEFT JOIN public.planos_aula pa ON p.auth_uid = pa.usuario_id
GROUP BY p.auth_uid, p.nome_completo, p.email;

CREATE OR REPLACE VIEW public.planos_aula_detalhados AS
SELECT 
    pa.*, 
    p.nome_completo AS autor_nome,
    p.email AS autor_email,
    p.escola AS autor_escola,
    p.disciplina_principal AS autor_disciplina_principal
FROM public.planos_aula pa
LEFT JOIN public.perfis p ON pa.usuario_id = p.auth_uid;

CREATE OR REPLACE VIEW public.templates_publicos AS
SELECT 
    t.id, t.criador_id, t.nome, t.descricao, t.disciplina, t.estrutura, t.criado_em,
    p.nome_completo AS criador_nome,
    p.escola AS criador_escola
FROM public.templates t
LEFT JOIN public.perfis p ON t.criador_id = p.auth_uid
WHERE t.publico = TRUE
ORDER BY t.criado_em DESC;

CREATE OR REPLACE VIEW public.estatisticas_ia AS
SELECT 
    hg.modelo_ia,
    COUNT(*) AS total_geracoes,
    COUNT(CASE WHEN hg.sucesso THEN 1 END) AS geracoes_sucesso,
    COUNT(CASE WHEN NOT hg.sucesso THEN 1 END) AS geracoes_falha,
    ROUND(AVG(hg.tempo_geracao_ms)::NUMERIC, 2) AS tempo_medio_ms,
    SUM(hg.tokens_usados) AS total_tokens_usados,
    ROUND(AVG(hg.tokens_usados)::NUMERIC, 2) AS media_tokens_por_geracao,
    MAX(hg.criado_em) AS ultima_geracao
FROM public.historico_geracoes hg
GROUP BY hg.modelo_ia
ORDER BY total_geracoes DESC;
