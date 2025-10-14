ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem visualizar templates"
    ON public.templates
    FOR SELECT
    USING (
        auth.uid() = criador_id OR publico = TRUE
    );

CREATE POLICY "Usuários podem inserir templates apenas para si"
    ON public.templates
    FOR INSERT
    WITH CHECK (auth.uid() = criador_id);

CREATE POLICY "Usuários podem atualizar seus próprios templates"
    ON public.templates
    FOR UPDATE
    USING (auth.uid() = criador_id)
    WITH CHECK (auth.uid() = criador_id);

CREATE POLICY "Usuários podem deletar apenas seus proprios templates"
    ON public.templates
    FOR DELETE
    USING (auth.uid() = criador_id);

COMMENT ON POLICY "Usuários podem visualizar templates" ON public.templates IS 
    'Permite que usuários vejam seus próprios templates ou templates marcados como públicos';