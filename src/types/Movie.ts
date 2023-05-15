interface Movie {
  id: string;
  name: string;
  description: string;
  poster: { previewUrl: string };
  disabled?: boolean;
}

export default Movie;
