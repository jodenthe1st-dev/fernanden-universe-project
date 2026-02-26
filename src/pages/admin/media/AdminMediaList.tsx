import React, { useEffect, useState } from 'react';
import logger from '@/lib/logger';
import { MediaService } from '@/integrations/supabase/services/media';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Image as ImageIcon, Video, File, Trash2, Eye } from 'lucide-react';

interface MediaFileItem {
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
  const [media, setMedia] = useState<MediaFileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video' | 'audio' | 'document'>('all');

  useEffect(() => {
    void loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      const rows = await MediaService.getAllMedia();
      const normalized: MediaFileItem[] = rows.map((row) => ({
        id: row.id,
        name: row.original_name || row.filename || 'fichier',
        url: row.url,
        type: (row.type as MediaFileItem['type']) || 'document',
        size: Number(row.size || 0),
        folder: row.folder_path || undefined,
        created_at: row.created_at || new Date().toISOString(),
        alt_text: row.alt_text || undefined,
      }));
      setMedia(normalized);
    } catch (error) {
      logger.error('Error loading media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Etes-vous sur de vouloir supprimer ce fichier ?')) return;
    try {
      await MediaService.deleteMedia(id);
      setMedia((prev) => prev.filter((file) => file.id !== id));
    } catch (error) {
      logger.error('Error deleting file:', error);
      alert('Erreur lors de la suppression du fichier');
    }
  };

  const filteredMedia = media.filter((file) => {
    const matchesSearch =
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (file.alt_text || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || file.type === filterType;
    return matchesSearch && matchesType;
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const getTypeIcon = (type: MediaFileItem['type']) => {
    switch (type) {
      case 'image':
        return ImageIcon;
      case 'video':
        return Video;
      default:
        return File;
    }
  };

  const getTypeColor = (type: MediaFileItem['type']) => {
    switch (type) {
      case 'image':
        return 'bg-green-100 text-green-800';
      case 'video':
        return 'bg-blue-100 text-blue-800';
      case 'audio':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta mx-auto" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Mediatheque</h1>
          <p className="text-gray-600 dark:text-gray-400">Fichiers synchronises avec Supabase/Cloudinary</p>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un fichier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant={filterType === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setFilterType('all')}>Tous</Button>
              <Button variant={filterType === 'image' ? 'default' : 'outline'} size="sm" onClick={() => setFilterType('image')}>Images</Button>
              <Button variant={filterType === 'video' ? 'default' : 'outline'} size="sm" onClick={() => setFilterType('video')}>Videos</Button>
              <Button variant={filterType === 'audio' ? 'default' : 'outline'} size="sm" onClick={() => setFilterType('audio')}>Audios</Button>
              <Button variant={filterType === 'document' ? 'default' : 'outline'} size="sm" onClick={() => setFilterType('document')}>Docs</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredMedia.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <File className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm ? 'Aucun fichier trouve' : 'Aucun fichier'}
            </h3>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredMedia.map((file) => {
            const Icon = getTypeIcon(file.type);
            return (
              <Card key={file.id} className="overflow-hidden">
                <CardContent className="p-3">
                  <div className="aspect-square bg-muted rounded-md mb-3 overflow-hidden flex items-center justify-center">
                    {file.type === 'image' ? (
                      <img src={file.url} alt={file.alt_text || file.name} className="w-full h-full object-cover" />
                    ) : (
                      <Icon className="h-10 w-10 text-gray-400" />
                    )}
                  </div>
                  <p className="text-xs font-medium truncate mb-1">{file.name}</p>
                  <p className="text-[11px] text-gray-500 mb-2">{formatFileSize(file.size)}</p>
                  <Badge className={`${getTypeColor(file.type)} text-[10px] mb-2`}>{file.type}</Badge>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" asChild className="h-7 px-2">
                      <a href={file.url} target="_blank" rel="noopener noreferrer">
                        <Eye className="h-3 w-3" />
                      </a>
                    </Button>
                    <Button variant="destructive" size="sm" className="h-7 px-2" onClick={() => handleDelete(file.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export { AdminMediaList };
