import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type Movie from "@/types/Movie";

const locStorage = {
  saveData: (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  getData: (name: string) => {
    try {
      return JSON.parse(localStorage.getItem(name) || "");
    } catch (e) {
      return "";
    }
  },
};

const initLS = () => {
  if (!locStorage.getData("lastSearchMovies"))
    locStorage.saveData("lastSearchMovies", []);
  if (!locStorage.getData("personalMovieList"))
    locStorage.saveData("personalMovieList", []);
};
initLS();
console.log(locStorage.getData("personalMovieList"));

export const useMoviesStore = defineStore("movies", () => {
  const movies = ref(locStorage.getData("lastSearchMovies") as Movie[] | null);
  const personalList = ref(
    locStorage.getData("personalMovieList") as Movie[] | null
  );

  const options = {
    headers: {
      accept: "application/json",
      "X-API-KEY": import.meta.env.VITE_MOVIE_KINOPOISK_TOKEN,
      Cookie: "SameSite=None; Secure",
    },
  };
  // console.log();

  const alreadyAddedToPersonal = (movies: Movie[]): Movie[] => {
    return movies.map((element) => {
      for (const item of personalList.value ?? []) {
        if (item.id === element.id) {
          console.log("exits");
          return { ...element, disabled: true };
        }
      }
      return { ...element, disabled: false };
    });
  };

  const getDataKinopoiskSearch = async (
    name: string
  ): Promise<Movie[] | null> => {
    // fetch("https://api.kinopoisk.dev/v1.3/movie/666", options)
    const strQuer = encodeURI(
      `https://api.kinopoisk.dev/v1.3/movie?name=${name}`
    );
    console.log(strQuer);
    return fetch(strQuer, options)
      .then((data) => data.json())
      .then((resp) => {
        console.log(resp);

        if (resp?.docs) {
          movies.value = resp.docs as Movie[];
          // movies.value = alreadyAddedToPersonal(movies.value);
          locStorage.saveData("lastSearchMovies", movies.value);
          return movies.value;
        }
        return null;
      });
  };

  const addToPersonalList = (movie: Movie) => {
    // const movieArr: Movie[] = locStorage.getData("personalMovieList");
    if (personalList?.value) {
      personalList.value.push(movie);
      if (movies?.value) {
        // movies.value = alreadyAddedToPersonal(movies.value);
        locStorage.saveData("lastSearchMovies", movies.value);
      }
      locStorage.saveData("personalMovieList", personalList.value);
      return movies.value;
    }
    return null;
    // personalList.value = movieArr;
  };

  const deleteFromPersonalList = (movie: Movie) => {
    if (personalList?.value) {
      // const filtere personalList.value.push(movie);
      personalList.value = personalList.value.filter(
        (item) => item.id !== movie.id
      );
      locStorage.saveData("personalMovieList", personalList.value);
      return personalList.value;
    }
    return null;
  };

  return {
    movies,
    personalList,
    getDataKinopoiskSearch,
    addToPersonalList,
    deleteFromPersonalList,
  };
});
