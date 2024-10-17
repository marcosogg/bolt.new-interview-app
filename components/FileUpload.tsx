"use client"

import React, { useRef } from 'react';
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Question } from '@/types/question';

interface FileUploadProps {
  onUpload: (data: Question[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast()

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
          })
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error parsing JSON",
            description: "Please make sure the file contains valid JSON data.",
          })
        }
      };
      reader.readAsText(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        style={{ display: 'none' }}
      />
      <Button onClick={handleButtonClick}>Upload JSON File</Button>
    </>
  );
};

export default FileUpload;