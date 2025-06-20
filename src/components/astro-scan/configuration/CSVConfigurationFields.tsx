import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

interface CSVConfigurationFieldsProps {
  config: any;
  updateConfig: (key: string, value: any) => void;
}

export const CSVConfigurationFields = ({ config, updateConfig }: CSVConfigurationFieldsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const clearUploadedFile = () => {
    updateConfig('uploadedFileName', null);
    updateConfig('csvHeaders', null);
    updateConfig('file_content', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File upload event triggered.");
    const file = event.target.files?.[0];
    if (file) {
      console.log(`File selected: ${file.name}`);
      updateConfig('isReadingFile', true);
      updateConfig('uploadedFileName', file.name);
      updateConfig('filePath', ''); // Clear the path when file is uploaded

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          updateConfig('file_content', text); // Store the entire file content

          // Simple CSV header extraction (split by newline, take first line, split by delimiter)
          const delimiter = config.delimiter || ',';
          const headerLine = text.split('\n')[0].trim();
          const headers = headerLine.split(delimiter).map(h => h.trim().replace(/"/g, ''));
          
          updateConfig('csvHeaders', headers);
          toast.success(`Parsed ${headers.length} headers from ${file.name}.`);
          console.log("File read successfully, headers parsed:", headers);
        } catch (error) {
          console.error("Error parsing CSV header:", error);
          toast.error("Could not parse headers from the uploaded file.");
          // Clear the invalid file
          clearUploadedFile();
        } finally {
          updateConfig('isReadingFile', false);
          console.log("Finished reading file.");
        }
      };
      reader.onerror = () => {
        toast.error("Failed to read the uploaded file.");
        updateConfig('isReadingFile', false);
        clearUploadedFile();
        console.error("FileReader error.");
      };
      reader.readAsText(file);
    }
  };

  const handleFilePathChange = (value: string) => {
    updateConfig('filePath', value);
    if (value && config.uploadedFileName) {
      // Clear uploaded file if user starts typing a path
      clearUploadedFile();
    }
  };

  const isReadingFile = !!config.isReadingFile;
  console.log("CSVFields render state:", { isReadingFile, uploadedFileName: config.uploadedFileName, filePath: config.filePath });

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
              disabled={!!config.filePath || isReadingFile}
            >
              <Upload className="h-4 w-4" />
              {isReadingFile ? 'Reading...' : 'Choose File'}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
            {config.uploadedFileName && (
              <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-md">
                <span className="text-sm text-foreground">{config.uploadedFileName}</span>
                {!isReadingFile && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearUploadedFile}
                    className="h-auto p-1"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
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
            disabled={!!config.uploadedFileName || isReadingFile}
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
          checked={config.hasHeader === undefined ? true : config.hasHeader}
          onCheckedChange={(checked) => updateConfig('hasHeader', checked)}
        />
        <Label className="text-foreground font-medium">File has header row</Label>
      </div>
    </>
  );
};
