CREATE TABLE IF NOT EXISTS public.historico_geracoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL,
    plano_aula_id UUID,
    parametros JSONB NOT NULL DEFAULT '{}'::jsonb,
    sucesso BOOLEAN NOT NULL DEFAULT TRUE,
    mensagem_erro TEXT,
    tempo_geracao_ms INTEGER,
    tokens_usados INTEGER,
    modelo_ia TEXT,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT fk_historico_usuario 
        FOREIGN KEY (usuario_id) 
        REFERENCES public.perfis(auth_uid) 
        ON DELETE CASCADE,
    
    CONSTRAINT fk_historico_plano 
        FOREIGN KEY (plano_aula_id) 
        REFERENCES public.planos_aula(id) 
        ON DELETE SET NULL,
    
    CONSTRAINT historico_tempo_check CHECK (tempo_geracao_ms IS NULL OR tempo_geracao_ms >= 0),
    CONSTRAINT historico_tokens_check CHECK (tokens_usados IS NULL OR tokens_usados >= 0),
    CONSTRAINT historico_erro_check CHECK (
        (sucesso = TRUE AND mensagem_erro IS NULL) OR 
        (sucesso = FALSE AND mensagem_erro IS NOT NULL)
    )
);

CREATE INDEX idx_historico_usuario ON public.historico_geracoes_geracoes(usuario_id);
CREATE INDEX idx_historico_plano ON public.historico_geracoes_geracoes(plano_aula_id) WHERE plano_aula_id IS NOT NULL;
CREATE INDEX idx_historico_sucesso ON public.historico_geracoes_geracoes(sucesso);
CREATE INDEX idx_historico_criado_em ON public.historico_geracoes_geracoes(criado_em DESC);
CREATE INDEX idx_historico_modelo ON public.historico_geracoes_geracoes_geracoes_geracoes_geracoes(modelo_ia) WHERE modelo_ia IS NOT NULL;