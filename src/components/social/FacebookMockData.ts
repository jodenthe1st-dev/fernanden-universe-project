import { FacebookPageInfo, FacebookPost } from "./FacebookTypes";
import { placeholderImages } from "@/components/ui/BrandedPlaceholder";

export const mockFacebookPageInfo: FacebookPageInfo = {
  name: "fernanden",
  username: "fernanden",
  followers_count: 12500,
  about: "Un design aux multiples facettes ! Depuis 2017 et labellisé par l'OAPI, fernanden incarne l'alliance parfaite entre tradition africaine et innovation contemporaine.",
  cover: {
    source: placeholderImages.hero.fernanden
  },
  picture: {
    data: {
      url: placeholderImages.avatar.fernanden
    }
  }
};

export const mockFacebookPosts: FacebookPost[] = [
  {
    id: "1",
    message: "🎨 Nouvelle collection DENSE disponible ! Découvrez nos créations uniques qui célèbrent l'héritage africain avec une touche contemporaine. #DENSE #Fashion #AfricanDesign",
    created_time: "2024-01-30T10:00:00Z",
    likes_count: 245,
    comments_count: 32,
    shares_count: 18,
    permalink_url: "https://facebook.com/fernanden/posts/1",
    full_picture: placeholderImages.blog.dense
  },
  {
    id: "2",
    message: "📚 Paren'TIPS Épisode 5 est en ligne ! \"Choisir sa voie\" - Un guide pour aider nos jeunes à faire leurs choix d'orientation avec confiance. Écoutez-le maintenant ! #CaFEE #Education #Podcast",
    created_time: "2024-01-28T15:30:00Z",
    likes_count: 189,
    comments_count: 24,
    shares_count: 15,
    permalink_url: "https://facebook.com/fernanden/posts/2"
  },
  {
    id: "3",
    message: "🏠 Transformez votre espace avec SHE by fernanden ! Nos services de design d'intérieur allient esthétique et fonctionnalité pour créer des lieux qui vous ressemblent. #SHE #HomeDesign #Spaces",
    created_time: "2024-01-25T09:15:00Z",
    likes_count: 156,
    comments_count: 19,
    shares_count: 12,
    permalink_url: "https://facebook.com/fernanden/posts/3",
    full_picture: placeholderImages.blog.she
  }
];
