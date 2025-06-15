
-- Clear existing data to avoid duplicates if this script is run multiple times
DELETE FROM public.ml_models;
DELETE FROM public.nlp_tasks;
DELETE FROM public.vision_tasks;
DELETE FROM public.knowledge_graph_nodes;

-- Populate ml_models with sample data
INSERT INTO public.ml_models (name, type, target, accuracy, confidence, last_trained, status) VALUES
('Patient Readmission Predictor', 'lstm', 'Readmission Risk', 92.5, 88.0, now() - interval '3 days', 'active'),
('ED Volume Forecaster', 'prophet', 'ED Patient Volume', 85.2, 91.5, now() - interval '1 week', 'active'),
('Sepsis Onset Detector', 'ensemble', 'Sepsis Onset', 95.8, 93.2, now() - interval '1 day', 'training'),
('ICU Bed Demand Model', 'arima', 'ICU Bed Demand', 88.0, 85.0, now() - interval '2 months', 'pending');

-- Populate nlp_tasks with sample data
INSERT INTO public.nlp_tasks (type, status, confidence, entities, processing_time) VALUES
('clinical_notes', 'completed', 98.7, 15, '2.5s'),
('discharge_summary', 'processing', 75.0, 8, '1.8s'),
('lab_report', 'queued', null, null, null),
('imaging_report', 'completed', 94.2, 11, '4.1s');

-- Populate vision_tasks with sample data
INSERT INTO public.vision_tasks (type, status, accuracy, objects_detected, processing_time) VALUES
('bed_status', 'completed', 99.5, 2, '0.8s'),
('equipment_detection', 'analyzing', 88.0, 5, '1.2s'),
('safety_compliance', 'failed', 76.3, 3, '2.0s');

-- Populate knowledge_graph_nodes with sample data
INSERT INTO public.knowledge_graph_nodes (label, type, connections, relevance_score) VALUES
('Patient: John Smith', 'patient', 8, 92.1),
('Dept: Cardiology', 'department', 45, 85.0),
('Dr. Alice Vance', 'staff', 22, 95.5),
('Equipment: MRI-02', 'equipment', 3, 78.0),
('Outcome: Successful Discharge', 'outcome', 152, 89.9),
('Condition: Myocardial Infarction', 'outcome', 78, 98.2);
