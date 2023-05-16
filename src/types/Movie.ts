interface Movie {
  id: string;
  name: string;
  description: string;
  poster: { previewUrl: string };
  rating: { kp: number; imdb: number };
  disabled?: boolean;
  alreadyWatched?: boolean;
}

export default Movie;
