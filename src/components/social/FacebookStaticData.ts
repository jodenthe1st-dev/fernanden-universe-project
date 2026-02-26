import { FacebookPageInfo, FacebookPost } from "./FacebookTypes";
import { placeholderImages } from "@/components/ui/BrandedPlaceholder";

export const facebookPageInfo: FacebookPageInfo = {
  name: "fernanden",
  username: "fernanden",
  followers_count: 12500,
  about: "Un design aux multiples facettes ! Depuis 2017 et labellise par l'OAPI, fernanden incarne l'alliance parfaite entre tradition africaine et innovation contemporaine.",
  cover: {
    source: placeholderImages.hero.fernanden
  },
  picture: {
    data: {
      url: placeholderImages.avatar.fernanden
    }
  }
};

export const facebookPosts: FacebookPost[] = [
  {
    id: "1",
    message: "Nouvelle collection DENSE disponible ! Decouvrez nos creations uniques qui celebrent l'heritage africain avec une touche contemporaine.",
    created_time: "2024-01-30T10:00:00Z",
    likes_count: 245,
    comments_count: 32,
    shares_count: 18,
    permalink_url: "https://facebook.com/fernanden/posts/1",
    full_picture: placeholderImages.blog.dense
  },
  {
    id: "2",
    message: "Paren'TIPS Episode 5 est en ligne ! Choisir sa voie - Un guide pour aider nos jeunes a faire leurs choix d'orientation avec confiance.",
    created_time: "2024-01-28T15:30:00Z",
    likes_count: 189,
    comments_count: 24,
    shares_count: 15,
    permalink_url: "https://facebook.com/fernanden/posts/2"
  },
  {
    id: "3",
    message: "Transformez votre espace avec SHE by fernanden ! Nos services de design d'interieur allient esthetique et fonctionnalite.",
    created_time: "2024-01-25T09:15:00Z",
    likes_count: 156,
    comments_count: 19,
    shares_count: 12,
    permalink_url: "https://facebook.com/fernanden/posts/3",
    full_picture: placeholderImages.blog.she
  }
];
