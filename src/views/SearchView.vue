<script setup lang="ts">
import SearchBar from "@/components/SearchBar.vue";
import SearchMovieList from "@/components/SearchMovieList.vue";
import { ref } from "vue";
import { useMoviesStore } from "@/stores/counter";

const store = useMoviesStore();
const movies = ref(store.movies);
const searchFilmName = async (value: string) => {
  console.log(value);
  movies.value = await store.getDataKinopoiskSearch(value);
};
</script>

<template>
  <main>
    <SearchBar @search="searchFilmName" />
    <SearchMovieList :movies="movies" />
  </main>
</template>
