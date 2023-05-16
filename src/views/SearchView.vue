<script setup lang="ts">
import SearchBar from "@/components/SearchBar.vue";
import SearchMovieList from "@/components/SearchMovieList.vue";
import { ref, watch } from "vue";
import { useMoviesStore } from "@/stores/counter";
// defineProps<{
//   msg: string
// }>()

const searchFilm = ref("tyt");
const store = useMoviesStore();
const movies = ref(store.movies);
const searchFilmName = async (value: string) => {
  console.log(value);
  movies.value = await store.getDataKinopoiskSearch(value);
};
// const strongStrong = () => {
//   alert("yeee");
// };
// watch(searchFilm, (newX: string) => {
//   console.log(`searchFilm is ${newX}`);
// });
</script>

<template>
  <main>
    <SearchBar @search="searchFilmName" />
    <SearchMovieList :movies="movies" />
  </main>
</template>
