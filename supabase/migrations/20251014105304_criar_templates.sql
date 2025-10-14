CREATE TABLE IF NOT EXISTS public.templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    criador_id UUID NOT NULL,
    nome TEXT NOT NULL,
    descricao TEXT,
    disciplina TEXT,
    estrutura JSONB NOT NULL DEFAULT '{}'::jsonb,
    publico BOOLEAN NOT NULL DEFAULT FALSE,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT fk_templates_criador 
        FOREIGN KEY (criador_id) 
        REFERENCES public.perfis(auth_uid) 
        ON DELETE CASCADE,
    
    CONSTRAINT templates_nome_check CHECK (LENGTH(nome) >= 3)
);

CREATE INDEX idx_templates_criador ON public.templates(criador_id);
CREATE INDEX idx_templates_publico ON public.templates(publico) WHERE publico = TRUE;
CREATE INDEX idx_templates_disciplina ON public.templates(disciplina) WHERE disciplina IS NOT NULL;
CREATE INDEX idx_templates_nome ON public.templates(nome);

CREATE INDEX idx_templates_busca ON public.templates 
    USING gin(to_tsvector('portuguese', nome || ' ' || COALESCE(descricao, '')));
