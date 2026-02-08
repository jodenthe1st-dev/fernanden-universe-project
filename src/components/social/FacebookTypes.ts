export interface FacebookPageInfo {
  name: string;
  username: string;
  followers_count: number;
  about: string;
  cover: {
    source: string;
  };
  picture: {
    data: {
      url: string;
    };
  };
}

export interface FacebookPost {
  id: string;
  message: string;
  created_time: string;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  permalink_url: string;
  full_picture?: string;
}
