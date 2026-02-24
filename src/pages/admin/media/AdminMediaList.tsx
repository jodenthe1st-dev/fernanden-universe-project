// src/pages/admin/media/AdminMediaList.tsx
import React, { useState, useEffect } from 'react';
import logger from '@/lib/logger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Upload, 
  Image as ImageIcon, 
  Video, 
  Music,
  File,
  Filter,
  Trash2,
  Download,
  Eye
} from 'lucide-react';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'audio' | 'document';
  size: number;
  folder?: string;
  created_at: string;
  alt_text?: string;
}

export default function AdminMediaList() {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      // Simulation - Remplacer par appel API réel
      const mockMedia: MediaFile[] = [];
      setMedia(mockMedia);
    } catch (error) {
      logger.error('Error loading media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      // Simulation - Remplacer par appel API réel
      const newFiles: MediaFile[] = Array.from(files).map((file, index) => ({
        id: `temp-${Date.now()}-${index}`,
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type.startsWith('image/') ? 'image' : 
              file.type.startsWith('video/') ? 'video' : 
              file.type.startsWith('audio/') ? 'audio' : 'document',
        size: file.size,
        created_at: new Date().toISOString()
      }));
      
      setMedia([...media, ...newFiles]);
    } catch (error) {
      logger.error('Error uploading files:', error);
      alert('Erreur lors de l\'upload des fichiers');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
      return;
    }

    try {
      // Simulation - Remplacer par appel API réel
      setMedia(media.filter(file => file.id !== id));
    } catch (error) {
      logger.error('Error deleting file:', error);
      alert('Erreur lors de la suppression du fichier');
    }
  };

  const handleSelect = (id: string) => {
    setSelectedFiles(prev => 
      prev.includes(id) ? prev.filter(fileId => fileId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredMedia.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredMedia.map(file => file.id));
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer les ${selectedFiles.length} fichiers sélectionnés ?`)) {
      return;
    }

    try {
      // Simulation - Remplacer par appel API réel
      setMedia(media.filter(file => !selectedFiles.includes(file.id)));
      setSelectedFiles([]);
    } catch (error) {
      logger.error('Error deleting files:', error);
      alert('Erreur lors de la suppression des fichiers');
    }
  };

  const filteredMedia = media.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.alt_text?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || file.type === filterType;
    return matchesSearch && matchesType;
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getTypeIcon = (type: MediaFile['type']) => {
    switch (type) {
      case 'image': return ImageIcon;
      case 'video': return Video;
      case 'audio': return Music;
      default: return File;
    }
  };

  const getTypeColor = (type: MediaFile['type']) => {
    switch (type) {
      case 'image': return 'bg-green-100 text-green-800';
      case 'video': return 'bg-blue-100 text-blue-800';
      case 'audio': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const typeOptions = [
    { value: 'all', label: 'Tous', color: 'bg-gray-500' },
    { value: 'image', label: 'Images', color: 'bg-green-500' },
    { value: 'video', label: 'Vidéos', color: 'bg-blue-500' },
    { value: 'audio', label: 'Audios', color: 'bg-purple-500' },
    { value: 'document', label: 'Documents', color: 'bg-orange-500' }
  ];

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Médiathèque
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez tous vos fichiers médias
          </p>
        </div>
        
        <div className="flex gap-2">
          {selectedFiles.length > 0 && (
            <Button variant="destructive" onClick={handleBulkDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer ({selectedFiles.length})
            </Button>
          )}
          
          <div className="relative">
            <input
              type="file"
              multiple
              onChange={handleUpload}
              className="hidden"
              id="file-upload"
            />
            <Button onClick={() => document.getElementById('file-upload')?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un fichier..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              {typeOptions.map((type) => (
                <Button
                  key={type.value}
                  variant={filterType === type.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType(type.value)}
                  className="flex items-center"
                >
                  <div className={`w-2 h-2 rounded-full mr-2 ${type.color}`} />
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media Grid */}
      {filteredMedia.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <File className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm ? 'Aucun fichier trouvé' : 'Aucun fichier'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm ? 'Essayez une autre recherche' : 'Commencez par uploader vos premiers fichiers'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div>
          {/* Bulk Actions */}
          <div className="flex items-center justify-between mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedFiles.length === filteredMedia.length}
                onChange={handleSelectAll}
                className="mr-2"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {selectedFiles.length} sur {filteredMedia.length} sélectionnés
              </span>
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {filteredMedia.length} fichiers • {formatFileSize(filteredMedia.reduce((total, file) => total + file.size, 0))}
            </div>
          </div>

          {/* Files Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filteredMedia.map((file) => {
              const Icon = getTypeIcon(file.type);
              return (
                <Card key={file.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="relative">
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file.id)}
                        onChange={() => handleSelect(file.id)}
                        className="absolute top-2 left-2 z-10"
                      />
                      
                      {/* File Preview */}
                      <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-3 overflow-hidden">
                        {file.type === 'image' ? (
                          <img 
                            src={file.url} 
                            alt={file.alt_text || file.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Icon className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      
                      {/* File Info */}
                      <div className="space-y-1">
                        <h4 className="font-medium text-sm text-gray-900 dark:text-white truncate">
                          {file.name}
                        </h4>
                        
                        <div className="flex items-center justify-between">
                          <Badge className={getTypeColor(file.type)}>
                            {file.type}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {formatFileSize(file.size)}
                          </span>
                        </div>
                        
                        <p className="text-xs text-gray-500">
                          {new Date(file.created_at).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex gap-1 mt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDelete(file.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export { AdminMediaList };
