import { useState, useRef } from "react";
import logger from '@/lib/logger';
import { Upload, X, Image as ImageIcon, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LocalUploadService } from "@/services/LocalUploadService";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  aspectRatio?: "square" | "video" | "free";
  maxSize?: number; // in MB
}

export const ImageUploader = ({ 
  value, 
  onChange, 
  label = "Télécharger une image",
  aspectRatio = "free",
  maxSize = 5
}: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(value || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square": return "aspect-square";
      case "video": return "aspect-video";
      default: return "aspect-free";
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner un fichier image (JPG, PNG, WebP)');
      return;
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      alert(`L'image ne doit pas dépasser ${maxSize}MB`);
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      // Upload vers notre serveur local
      const publicUrl = await LocalUploadService.uploadFile(file, 'blog');
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 150);

      // Simulate upload completion
      setTimeout(() => {
        setProgress(100);
        setImageUrl(publicUrl);
        onChange(publicUrl);
        setUploading(false);
        clearInterval(progressInterval);
      }, 1500);

    } catch (error) {
      logger.error('Error uploading image:', error);
      setUploading(false);
      setProgress(0);
      alert('Erreur lors du téléchargement de l\'image: ' + (error as Error).message);
    }
  };

  const handleRemove = () => {
    setImageUrl("");
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="image-upload"
          ref={fileInputRef}
        />
        <div
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            {label}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
            JPG, PNG, WebP (max. {maxSize}MB)
          </p>
          <Button
            type="button"
            variant="outline"
            disabled={uploading}
          >
            <Upload size={20} className="mr-2" />
            {uploading ? "Téléchargement..." : "Choisir une image"}
          </Button>
        </div>
        
        {uploading && (
          <div className="mt-4">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
              {Math.round(progress)}% complété
            </p>
          </div>
        )}
      </div>

      {imageUrl && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Image téléchargée avec succès
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRemove}
            >
              Changer
            </Button>
          </div>
          
          <div className={`relative ${getAspectRatioClass()} bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden`}>
            <img
              src={imageUrl}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};
