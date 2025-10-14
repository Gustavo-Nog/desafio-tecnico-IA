CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public.perfis(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_uid UUID NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    nome_completo TEXT,
    escola TEXT,
    disciplina_principal TEXT,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_perfis_auth_uid ON public.perfis(auth_uid);
CREATE INDEX idx_perfis_email ON public.perfis(email);
CREATE INDEX idx_perfis_disciplina ON public.perfis(disciplina_principal) WHERE disciplina_principal IS NOT NULL;