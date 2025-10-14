ALTER TABLE public.planos_aula ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver seus próprios planos"
    ON public.planos_aula
    FOR SELECT
    USING (auth.uid() = usuario_id);

CREATE POLICY "Usuários podem inserir planos apenas para si mesmos"
    ON public.planos_aula
    FOR INSERT
    WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Usuários podem atualizar apenas seus próprios planos"
    ON public.planos_aula
    FOR UPDATE
    USING (auth.uid() = usuario_id)
    WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Usuário podem deletar seus própios planos"
    ON public.planos_aula
    FOR DELETE
    USING (auth.uid() = usuario_id);