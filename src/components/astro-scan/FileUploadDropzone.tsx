
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  File, 
  FileText, 
  Database, 
  CheckCircle, 
  AlertCircle,
  X,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';

interface FileUploadItem {
  id: string;
  file: File;
  status: 'uploading' | 'parsing' | 'completed' | 'error';
  progress: number;
  preview?: any;
  errors?: string[];
}

interface FileUploadDropzoneProps {
  onFilesUploaded: (files: FileUploadItem[]) => void;
  acceptedTypes?: string[];
  maxFiles?: number;
}

export const FileUploadDropzone = ({ 
  onFilesUploaded, 
  acceptedTypes = ['.csv', '.hl7', '.json', '.xml'],
  maxFiles = 10 
}: FileUploadDropzoneProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<FileUploadItem[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const getFileIcon = (fileName: string) => {
    const ext = fileName.toLowerCase().split('.').pop();
    switch (ext) {
      case 'csv': return <FileText className="h-5 w-5 text-green-500" />;
      case 'hl7': return <Database className="h-5 w-5 text-blue-500" />;
      case 'json': return <File className="h-5 w-5 text-purple-500" />;
      case 'xml': return <File className="h-5 w-5 text-orange-500" />;
      default: return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const parseFile = async (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const ext = file.name.toLowerCase().split('.').pop();
          
          switch (ext) {
            case 'csv':
              const csvLines = content.split('\n');
              const headers = csvLines[0]?.split(',') || [];
              const preview = csvLines.slice(0, 6).map(line => line.split(','));
              resolve({ type: 'csv', headers, preview, totalRows: csvLines.length - 1 });
              break;
            case 'json':
              const jsonData = JSON.parse(content);
              resolve({ type: 'json', data: jsonData, preview: JSON.stringify(jsonData, null, 2).slice(0, 500) });
              break;
            case 'hl7':
              const hl7Segments = content.split('\r');
              resolve({ type: 'hl7', segments: hl7Segments.length, preview: hl7Segments.slice(0, 5) });
              break;
            default:
              resolve({ type: 'unknown', preview: content.slice(0, 500) });
          }
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsText(file);
    });
  };

  const processFiles = async (files: File[]) => {
    const newFiles: FileUploadItem[] = files.map(file => ({
      id: Date.now() + Math.random().toString(),
      file,
      status: 'uploading',
      progress: 0
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    for (const fileItem of newFiles) {
      try {
        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 20) {
          await new Promise(resolve => setTimeout(resolve, 200));
          setUploadedFiles(prev => 
            prev.map(f => f.id === fileItem.id ? { ...f, progress } : f)
          );
        }

        // Parse file
        setUploadedFiles(prev => 
          prev.map(f => f.id === fileItem.id ? { ...f, status: 'parsing' } : f)
        );

        const preview = await parseFile(fileItem.file);
        
        setUploadedFiles(prev => 
          prev.map(f => f.id === fileItem.id ? { 
            ...f, 
            status: 'completed', 
            preview 
          } : f)
        );

        toast.success(`File ${fileItem.file.name} processed successfully`);
      } catch (error) {
        setUploadedFiles(prev => 
          prev.map(f => f.id === fileItem.id ? { 
            ...f, 
            status: 'error',
            errors: [error instanceof Error ? error.message : 'Failed to process file']
          } : f)
        );
        toast.error(`Failed to process ${fileItem.file.name}`);
      }
    }

    onFilesUploaded(uploadedFiles.filter(f => f.status === 'completed'));
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length + uploadedFiles.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`);
      return;
    }
    
    processFiles(files);
  }, [uploadedFiles.length, maxFiles]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  return (
    <div className="space-y-4">
      <Card 
        className={`border-2 border-dashed transition-colors ${
          isDragOver ? 'border-blue-400 bg-blue-50/50' : 'border-gray-300'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
      >
        <CardContent className="p-8 text-center">
          <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload Data Files</h3>
          <p className="text-muted-foreground mb-4">
            Drag and drop files here, or click to browse
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {acceptedTypes.map(type => (
              <Badge key={type} variant="outline">{type}</Badge>
            ))}
          </div>
          <input
            type="file"
            multiple
            accept={acceptedTypes.join(',')}
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <Button asChild>
            <label htmlFor="file-upload" className="cursor-pointer">
              Choose Files
            </label>
          </Button>
        </CardContent>
      </Card>

      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Files ({uploadedFiles.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {uploadedFiles.map((fileItem) => (
              <div key={fileItem.id} className="flex items-center gap-3 p-3 border rounded-lg">
                {getFileIcon(fileItem.file.name)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium truncate">{fileItem.file.name}</p>
                    <Badge variant="outline" className="text-xs">
                      {(fileItem.file.size / 1024).toFixed(1)} KB
                    </Badge>
                  </div>
                  
                  {fileItem.status === 'uploading' && (
                    <Progress value={fileItem.progress} className="h-2" />
                  )}
                  
                  {fileItem.status === 'parsing' && (
                    <p className="text-sm text-blue-600">Parsing file...</p>
                  )}
                  
                  {fileItem.status === 'completed' && fileItem.preview && (
                    <div className="text-sm text-green-600">
                      ✓ Ready - {fileItem.preview.type?.toUpperCase()} format detected
                    </div>
                  )}
                  
                  {fileItem.status === 'error' && (
                    <p className="text-sm text-red-600">
                      ✗ {fileItem.errors?.[0] || 'Processing failed'}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center gap-1">
                  {fileItem.status === 'completed' && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  {fileItem.status === 'error' && (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeFile(fileItem.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
