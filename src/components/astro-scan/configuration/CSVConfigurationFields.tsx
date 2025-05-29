
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { useRef, useState } from "react";

interface CSVConfigurationFieldsProps {
  config: any;
  updateConfig: (key: string, value: any) => void;
}

export const CSVConfigurationFields = ({ config, updateConfig }: CSVConfigurationFieldsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      updateConfig('uploadedFile', file);
      updateConfig('filePath', ''); // Clear the path when file is uploaded
    }
  };

  const clearUploadedFile = () => {
    setUploadedFile(null);
    updateConfig('uploadedFile', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFilePathChange = (value: string) => {
    updateConfig('filePath', value);
    if (value && uploadedFile) {
      // Clear uploaded file if user starts typing a path
      setUploadedFile(null);
      updateConfig('uploadedFile', null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <>
      <div className="space-y-4">
        <Label className="text-foreground font-medium">Data Source</Label>
        
        {/* File Upload Option */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Upload CSV File</Label>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2"
              disabled={!!config.filePath}
            >
              <Upload className="h-4 w-4" />
              Choose File
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
            {uploadedFile && (
              <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-md">
                <span className="text-sm text-foreground">{uploadedFile.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearUploadedFile}
                  className="h-auto p-1"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* OR separator */}
        <div className="flex items-center gap-3">
          <div className="flex-1 border-t border-border"></div>
          <span className="text-xs text-muted-foreground bg-background px-2">OR</span>
          <div className="flex-1 border-t border-border"></div>
        </div>

        {/* File Path/URL Option */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">File Path/URL</Label>
          <Input
            value={config.filePath || ''}
            onChange={(e) => handleFilePathChange(e.target.value)}
            placeholder="/path/to/files or https://example.com/data.csv"
            className="bg-background border-border text-foreground"
            disabled={!!uploadedFile}
          />
        </div>
      </div>

      <div>
        <Label className="text-foreground font-medium">Delimiter</Label>
        <Select value={config.delimiter || ','} onValueChange={(value) => updateConfig('delimiter', value)}>
          <SelectTrigger className="mt-2 bg-background border-border text-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-background border-border">
            <SelectItem value=",">Comma (,)</SelectItem>
            <SelectItem value=";">Semicolon (;)</SelectItem>
            <SelectItem value="\t">Tab</SelectItem>
            <SelectItem value="|">Pipe (|)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          checked={config.hasHeader || false}
          onCheckedChange={(checked) => updateConfig('hasHeader', checked)}
        />
        <Label className="text-foreground font-medium">File has header row</Label>
      </div>
    </>
  );
};
