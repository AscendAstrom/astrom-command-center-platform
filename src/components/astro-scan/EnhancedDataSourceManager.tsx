
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database, 
  Upload, 
  Settings, 
  Activity,
  Plus
} from 'lucide-react';
import { DataSourceManager } from './DataSourceManager';
import { FileUploadDropzone } from './FileUploadDropzone';
import { toast } from 'sonner';

interface EnhancedDataSourceManagerProps {
  onAddSourceClick?: () => void;
}

export const EnhancedDataSourceManager = ({ onAddSourceClick }: EnhancedDataSourceManagerProps) => {
  const [activeTab, setActiveTab] = useState('sources');
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  const handleFilesUploaded = (files: any[]) => {
    setUploadedFiles(files);
    toast.success(`${files.length} files processed and ready for configuration`);
  };

  const createDataSourceFromFile = (file: any) => {
    // This would integrate with the existing data source creation flow
    toast.info(`Creating data source from ${file.file.name}...`);
    // Implementation would call the actual data source creation API
  };

  return (
    <div className="space-y-6">
      {/* Add Source Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Data Sources</h2>
          <p className="text-muted-foreground">Manage your connected data sources and monitor their health</p>
        </div>
        <Button onClick={onAddSourceClick} className="gradient-bg-blue hover:shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          Add Data Source
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sources" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Data Sources
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            File Upload
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Monitoring
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sources" className="space-y-4">
          <DataSourceManager onAddSourceClick={onAddSourceClick} />
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                File Upload & Processing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FileUploadDropzone
                onFilesUploaded={handleFilesUploaded}
                acceptedTypes={['.csv', '.hl7', '.json', '.xml', '.xlsx']}
                maxFiles={20}
              />

              {uploadedFiles.length > 0 && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Processed Files</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{file.file.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {file.preview.type?.toUpperCase()} format • 
                              {file.preview.totalRows || file.preview.segments || 'N/A'} records
                            </p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => createDataSourceFromFile(file)}
                          >
                            Create Data Source
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Data Source Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Real-time monitoring dashboard</p>
                <p className="text-sm">Track data source health, ingestion rates, and errors</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
