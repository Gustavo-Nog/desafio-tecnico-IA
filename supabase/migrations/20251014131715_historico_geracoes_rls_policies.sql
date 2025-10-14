ALTER TABLE public.historico_geracoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver apenas seus próprios históricos"
    ON public.historico_geracoes
    FOR SELECT
    USING (auth.uid() = usuario_id);

CREATE POLICY "Usuários podem inserir histórico apenas para si mesmos"
    ON public.historico_geracoes
    FOR INSERT
    WITH CHECK (auth.uid() = usuario_id);

-- Histórico so podem ser lidos e não atualizados (apenas leitura após adicionar)

CREATE POLICY "Usuários podem deletar apenas seus próprios históricos"
    ON  public.historico_geracoes
    FOR DELETE
    USING (auth.uid() = usuario_id);