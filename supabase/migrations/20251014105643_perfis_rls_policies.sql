ALTER TABLE public.perfis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver apenas seu perfil"
    ON public.perfis
    FOR SELECT
    USING (auth.uid() = auth_uid);

CREATE POLICY "Usuários podem inserir apenas seu próprio perfil"
    ON public.perfis
    FOR INSERT 
    WITH CHECK (auth.uid() = auth_uid);

CREATE POLICY "Usuários podem atualizar apenas seu próprio perfil"
    ON public.perfis
    FOR UPDATE
    USING (auth.uid() = auth_uid)
    WITH CHECK (auth.uid() = auth_uid);

CREATE POLICY "Usuários podem deletar apenas seu próprio perfil"
    ON public.perfis
    FOR DELETE
    USING  (auth.uid() = auth_uid);
