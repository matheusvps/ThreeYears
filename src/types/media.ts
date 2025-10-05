export interface Photo {
  id: number;
  title: string;
  image: string;
  description: string;
  tags?: string[];
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  photos: Photo[];
  theme: string;
  color: string;
}


