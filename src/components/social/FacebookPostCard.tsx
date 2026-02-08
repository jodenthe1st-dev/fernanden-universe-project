import { Card, CardContent } from "@/components/ui/card";
import { FacebookPost } from "./FacebookTypes";
import { Heart, MessageCircle, Share2, ExternalLink } from "lucide-react";

interface FacebookPostCardProps {
  post: FacebookPost;
}

export const FacebookPostCard = ({ post }: FacebookPostCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        {post.full_picture && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img
              src={post.full_picture}
              alt="Post Facebook"
              className="w-full h-64 object-cover"
            />
          </div>
        )}
        
        <p className="text-sm text-gray-700 mb-4 leading-relaxed">
          {post.message}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>{formatDate(post.created_time)}</span>
          <a
            href={post.permalink_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
          >
            Voir sur Facebook
            <ExternalLink size={12} />
          </a>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Heart size={16} className="text-red-500" />
            <span>{post.likes_count}</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle size={16} className="text-blue-500" />
            <span>{post.comments_count}</span>
          </div>
          <div className="flex items-center gap-2">
            <Share2 size={16} className="text-green-500" />
            <span>{post.shares_count}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
