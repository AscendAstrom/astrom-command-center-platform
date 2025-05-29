
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Upload, File, X } from "lucide-react";
import { useState } from "react";

interface CSVConfigurationFieldsProps {
  config: any;
  updateConfig: (key: string, value: any) => void;
}

export const CSVConfigurationFields = ({ config, updateConfig }: CSVConfigurationFieldsProps) => {
  console.log("CSVConfigurationFields component rendered"); // Debug log
  
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const csvFiles = files.filter(file => 
      file.type === 'text/csv' || 
      file.name.toLowerCase().endsWith('.csv') ||
      file.type === 'application/vnd.ms-excel'
    );
    
    console.log("Files uploaded:", csvFiles); // Debug log
    
    setUploadedFiles(prev => [...prev, ...csvFiles]);
    updateConfig('uploadedFiles', [...uploadedFiles, ...csvFiles]);
  };

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    updateConfig('uploadedFiles', newFiles);
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800 font-medium">CSV Configuration Fields Loaded</p>
      </div>

      <div>
        <Label className="text-foreground font-medium">Data Source</Label>
        <div className="mt-2 space-y-3">
          {/* File Upload Option */}
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-3">
              Upload CSV files from your computer
            </p>
            <Button variant="outline" className="relative">
              <Upload className="h-4 w-4 mr-2" />
              Choose Files
              <input
                type="file"
                multiple
                accept=".csv,text/csv,application/vnd.ms-excel"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </Button>
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <Label className="text-foreground font-medium text-sm">Uploaded Files</Label>
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded border">
                  <div className="flex items-center gap-2">
                    <File className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-foreground">{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* OR Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 border-t border-border"></div>
            <span className="text-xs text-muted-foreground uppercase">OR</span>
            <div className="flex-1 border-t border-border"></div>
          </div>

          {/* URL/Path Option */}
          <div>
            <Label className="text-foreground font-medium text-sm">File Path/URL</Label>
            <Input
              value={config.filePath || ''}
              onChange={(e) => updateConfig('filePath', e.target.value)}
              placeholder="/path/to/files or https://example.com/data.csv"
              className="mt-1 bg-background border-border text-foreground"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter a local file path or remote URL to CSV files
            </p>
          </div>
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

      {/* Additional CSV Options */}
      <div className="space-y-4 pt-4 border-t border-border">
        <Label className="text-foreground font-medium">Advanced Options</Label>
        
        <div>
          <Label className="text-foreground text-sm">Encoding</Label>
          <Select value={config.encoding || 'utf-8'} onValueChange={(value) => updateConfig('encoding', value)}>
            <SelectTrigger className="mt-1 bg-background border-border text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background border-border">
              <SelectItem value="utf-8">UTF-8</SelectItem>
              <SelectItem value="iso-8859-1">ISO-8859-1</SelectItem>
              <SelectItem value="windows-1252">Windows-1252</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-foreground text-sm">Quote Character</Label>
          <Input
            value={config.quoteChar || '"'}
            onChange={(e) => updateConfig('quoteChar', e.target.value)}
            placeholder='"'
            maxLength={1}
            className="mt-1 bg-background border-border text-foreground"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={config.skipEmptyLines || true}
            onCheckedChange={(checked) => updateConfig('skipEmptyLines', checked)}
          />
          <Label className="text-foreground text-sm">Skip empty lines</Label>
        </div>
      </div>
    </div>
  );
};
