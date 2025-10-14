CREATE TABLE IF NOT EXISTS public.planos_aula (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL,
    titulo TEXT NOT NULL,
    disciplina TEXT NOT NULL,
    serie TEXT NOT NULL,
    duracao_minutos INTEGER NOT NULL,
    objetivos JSONB DEFAULT '[]'::jsonb,
    conteudo_gerado TEXT NOT NULL,
    metodologia TEXT,
    recursos_necessarios JSONB DEFAULT '[]'::jsonb,
    avaliacao TEXT,
    modelo_ia_usado TEXT,
    prompt_enviado TEXT,
    tokens_usados INTEGER,
    status TEXT NOT NULL DEFAULT 'rascunho',
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_planos_aula_usuario 
        FOREIGN KEY (usuario_id) 
        REFERENCES public.perfis(auth_uid) 
        ON DELETE CASCADE,
        
    CONSTRAINT planos_aula_duracao_check CHECK (duracao_minutos > 0 AND duracao_minutos <= 300),
    CONSTRAINT planos_aula_status_check CHECK (status IN ('rascunho', 'publicado', 'arquivado')),
    CONSTRAINT planos_aula_tokens_check CHECK (tokens_usados IS NULL OR tokens_usados >= 0)
);

CREATE INDEX idx_planos_aula_usuario ON public.planos_aula(usuario_id);
CREATE INDEX idx_planos_aula_disciplina ON public.planos_aula(disciplina);
CREATE INDEX idx_planos_aula_serie ON public.planos_aula(serie);
CREATE INDEX idx_planos_aula_status ON public.planos_aula(status);
CREATE INDEX idx_planos_aula_criado_em ON public.planos_aula(criado_em DESC);
CREATE INDEX idx_planos_aula_atualizado_em ON public.planos_aula(atualizado_em DESC);

CREATE INDEX idx_planos_aula_usuario_status ON public.planos_aula(usuario_id, status);

CREATE INDEX idx_planos_aula_conteudo_busca ON public.planos_aula USING gin(to_tsvector('portuguese', conteudo_gerado));
