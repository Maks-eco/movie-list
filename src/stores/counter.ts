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
// console.log(locStorage.getData("personalMovieList"));
// console.log(import.meta.env.VITE_MOVIE_KINOPOISK_TOKEN);
// console.log(import.meta.env.VITE_SUPPLY_SERVICE_API);

export const useMoviesStore = defineStore("movies", () => {
  const movies = ref(locStorage.getData("lastSearchMovies") as Movie[] | null);
  const personalList = ref(
    locStorage.getData("personalMovieList") as Movie[] | null
  );

  const options = {
    headers: {
      accept: "application/json",
      "X-API-KEY": import.meta.env.VITE_MOVIE_KINOPOISK_TOKEN,
    },
  };

  const getDataKinopoiskSearch = async (
    name: string
  ): Promise<Movie[] | null> => {
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
          locStorage.saveData("lastSearchMovies", movies.value);
          return movies.value;
        }
        return null;
      });
  };

  const addToPersonalList = (movie: Movie) => {
    if (personalList?.value) {
      personalList.value.unshift(movie);
      if (movies?.value) {
        locStorage.saveData("lastSearchMovies", movies.value);
      }
      locStorage.saveData("personalMovieList", personalList.value);
      return movies.value;
    }
    return null;
  };

  const deleteFromPersonalList = (movie: Movie) => {
    if (personalList?.value) {
      personalList.value = personalList.value.filter(
        (item) => item.id !== movie.id
      );
      locStorage.saveData("personalMovieList", personalList.value);
      return personalList.value;
    }
    return null;
  };

  const updatePersonalList = (movie: Movie) => {
    if (personalList?.value) {
      personalList.value = personalList.value.map((item) =>
        item.id === movie.id ? movie : item
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
    updatePersonalList,
  };
});
