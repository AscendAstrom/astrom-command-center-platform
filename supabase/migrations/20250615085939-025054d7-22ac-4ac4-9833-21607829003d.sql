
-- Create table for ML models
CREATE TABLE public.ml_models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    target TEXT NOT NULL,
    accuracy NUMERIC,
    confidence NUMERIC,
    last_trained TIMESTAMPTZ,
    status TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.ml_models ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users full access to ml_models" ON public.ml_models FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Create table for NLP tasks
CREATE TABLE public.nlp_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL,
    status TEXT NOT NULL,
    confidence NUMERIC,
    entities INTEGER,
    processing_time TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.nlp_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users full access to nlp_tasks" ON public.nlp_tasks FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Create table for Vision tasks
CREATE TABLE public.vision_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL,
    status TEXT NOT NULL,
    accuracy NUMERIC,
    objects_detected INTEGER,
    processing_time TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.vision_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users full access to vision_tasks" ON public.vision_tasks FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Create table for Knowledge Graph nodes
CREATE TABLE public.knowledge_graph_nodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    label TEXT NOT NULL,
    type TEXT NOT NULL,
    connections INTEGER,
    relevance_score NUMERIC,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.knowledge_graph_nodes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users full access to knowledge_graph_nodes" ON public.knowledge_graph_nodes FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
