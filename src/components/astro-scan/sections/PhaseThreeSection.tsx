
import AdvancedMLPlatform from "@/components/ai-ecosystem/AdvancedMLPlatform";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit } from 'lucide-react';

const PhaseThreeSection = () => {
    return (
        <Card className="bg-card/50 border-border backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl font-bold">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <BrainCircuit className="h-6 w-6 text-white" />
                    </div>
                    <span>Phase 3: Advanced ML Platform</span>
                </CardTitle>
                <CardDescription>
                    A comprehensive platform to manage, train, and deploy machine learning models at scale, featuring a model registry, training job management, and a federated learning network.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <AdvancedMLPlatform />
            </CardContent>
        </Card>
    );
};

export default PhaseThreeSection;
