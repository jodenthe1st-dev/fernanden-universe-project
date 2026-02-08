import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
  tags: string[];
}

interface FeaturedPostCardProps {
  post: BlogPost;
  index: number;
}

export const FeaturedPostCard = ({ post, index }: FeaturedPostCardProps) => {
  return (
    <motion.div
      key={post.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-border/50">
        <div className="lg:flex">
          <div className="lg:w-1/2">
            <PostImage post={post} />
          </div>
          <div className="lg:w-1/2 p-8 flex flex-col justify-center">
            <PostMetadata post={post} />
            <PostContent post={post} />
            <PostActions post={post} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const PostImage = ({ post }: { post: BlogPost }) => (
  <div className="relative aspect-[16/10] lg:aspect-square overflow-hidden">
    <img
      src={post.image}
      alt={post.title}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    <div className="absolute top-4 left-4">
      <Badge className="bg-cafee-mint/20 text-cafee-mint border-cafee-mint/30 backdrop-blur-sm">
        CaFEE
      </Badge>
    </div>
  </div>
);

const PostMetadata = ({ post }: { post: BlogPost }) => (
  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
    <div className="flex items-center gap-1">
      <Calendar size={14} />
      <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
    </div>
    <div className="flex items-center gap-1">
      <Clock size={14} />
      <span>{post.readTime}</span>
    </div>
  </div>
);

const PostContent = ({ post }: { post: BlogPost }) => (
  <>
    <h3 className="font-heading text-2xl font-semibold text-foreground mb-4 group-hover:text-cafee-mint transition-colors">
      {post.title}
    </h3>
    <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
      {post.excerpt}
    </p>
  </>
);

const PostActions = ({ post }: { post: BlogPost }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <User size={16} className="text-muted-foreground" />
      <span className="text-sm text-muted-foreground">{post.author}</span>
    </div>
    <Button
      asChild
      size="lg"
      className="rounded-full bg-cafee-mint hover:bg-cafee-mint/90"
    >
      <Link to={`/blog/${post.id}`} className="flex items-center gap-2">
        Lire l'article
        <ArrowRight size={18} />
      </Link>
    </Button>
  </div>
);
