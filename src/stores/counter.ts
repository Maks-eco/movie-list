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
};
initLS();

export const useMoviesStore = defineStore("movies", () => {
  const movies = ref(locStorage.getData("lastSearchMovies") as Movie[] | null);

  const options = {
    headers: {
      accept: "application/json",
      "X-API-KEY": import.meta.env.VITE_MOVIE_KINOPOISK_TOKEN,
      Cookie: "SameSite=None; Secure",
    },
  };
  // console.log();
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
          locStorage.saveData("lastSearchMovies", movies.value);
          return movies.value;
        }
        return null;
      });
  };

  return { movies, getDataKinopoiskSearch };
});
