import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FacebookPageInfo, FacebookPost } from "./FacebookTypes";
import { mockFacebookPageInfo, mockFacebookPosts } from "./FacebookMockData";
import { FacebookPostCard } from "./FacebookPostCard";
import { Users, Facebook, TrendingUp, Heart, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { placeholderImages } from "@/components/ui/BrandedPlaceholder";

export const FacebookPageHeader = ({ pageInfo }: { pageInfo: FacebookPageInfo }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10"
    >
      {pageInfo.cover && (
        <div className="h-32 md:h-48 relative">
          <img
            src={pageInfo.cover.source}
            alt={`${pageInfo.name} cover`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}
      
      <div className="p-6 md:p-8">
        <div className="flex items-start gap-4">
          {pageInfo.picture && (
            <img
              src={pageInfo.picture.data.url}
              alt={pageInfo.name}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white shadow-lg"
            />
          )}
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Facebook className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold text-foreground">{pageInfo.name}</h3>
            </div>
            
            <p className="text-muted-foreground text-sm mb-3">{pageInfo.about}</p>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-medium">{pageInfo.followers_count.toLocaleString()}</span>
                <span className="text-muted-foreground">abonnés</span>
              </div>
              
              <Button
                asChild
                size="sm"
                className="rounded-full"
              >
                <a
                  href="https://www.facebook.com/share/1A4ToZPFmk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Facebook size={16} />
                  Suivre
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FacebookPostsFeed = ({ posts }: { posts: FacebookPost[] }) => {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-foreground">Publications récentes</h4>
      
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <FacebookPostCard post={post} />
        </motion.div>
      ))}
    </div>
  );
};

const FacebookFeed = () => {
  const [pageInfo, setPageInfo] = useState<FacebookPageInfo | null>(null);
  const [posts, setPosts] = useState<FacebookPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulated data - replace with actual Facebook Graph API calls
  useEffect(() => {
    setPageInfo(mockFacebookPageInfo);
    setPosts(mockFacebookPosts);
    setLoading(false);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      {pageInfo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10"
        >
          {pageInfo.cover && (
            <div className="h-32 md:h-48 relative">
              <img
                src={pageInfo.cover.source}
                alt={`${pageInfo.name} cover`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          )}
          
          <div className="p-6 md:p-8">
            <div className="flex items-start gap-4">
              {pageInfo.picture && (
                <img
                  src={pageInfo.picture.data.url}
                  alt={pageInfo.name}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white shadow-lg"
                />
              )}
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Facebook className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">{pageInfo.name}</h3>
                </div>
                
                <p className="text-muted-foreground text-sm mb-3">{pageInfo.about}</p>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="font-medium">{pageInfo.followers_count.toLocaleString()}</span>
                    <span className="text-muted-foreground">abonnés</span>
                  </div>
                  
                  <Button
                    asChild
                    size="sm"
                    className="rounded-full"
                  >
                    <a
                      href="https://www.facebook.com/share/1A4ToZPFmk/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Facebook size={16} />
                      Suivre
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Posts Feed */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-foreground">Publications récentes</h4>
        
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                {/* Post Image */}
                {post.full_picture && (
                  <div className="rounded-xl overflow-hidden">
                    <img
                      src={post.full_picture}
                      alt="Post image"
                      className="w-full h-48 md:h-64 object-cover"
                    />
                  </div>
                )}
                
                {/* Post Content */}
                <div>
                  <p className="text-foreground leading-relaxed mb-4">
                    {post.message}
                  </p>
                  
                  {/* Post Meta */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{formatDate(post.created_time)}</span>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary/80"
                    >
                      <a
                        href={post.permalink_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Voir sur Facebook
                      </a>
                    </Button>
                  </div>
                  
                  {/* Engagement Stats */}
                  <div className="flex items-center gap-6 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes_count}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments_count}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Share2 className="w-4 h-4" />
                      <span>{post.shares_count}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <Button
          asChild
          size="lg"
          className="rounded-xl bg-primary hover:bg-primary/90"
        >
          <a
            href="https://www.facebook.com/share/1A4ToZPFmk/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Facebook size={20} />
            Voir toute la page Facebook
          </a>
        </Button>
      </motion.div>
    </div>
  );
};

export default FacebookFeed;
