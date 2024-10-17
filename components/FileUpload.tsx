"use client"

import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Question } from "@/types/question";

interface FileUploadProps {
  onUpload: (data: Question[]) => void;
  data: Question[];
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload, data }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          onUpload(json);
          toast({
            title: "File uploaded successfully",
            description: "The questions have been loaded into the application.",
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error parsing JSON",
            description: "Please make sure the file contains valid JSON data.",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleExportButtonClick = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "questions_export.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({
      title: "File exported successfully",
      description: "The questions have been exported to a JSON file.",
    });
  };

  return (
    <div className="flex space-x-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        style={{ display: 'none' }}
      />
      <Button onClick={handleUploadButtonClick}>Upload JSON File</Button>
      <Button onClick={handleExportButtonClick}>Export JSON File</Button>
    </div>
  );
};

export default FileUpload;
