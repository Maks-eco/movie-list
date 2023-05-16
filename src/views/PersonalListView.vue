<template>
  <!-- <div class="about">
    <h1>This is an about page</h1>
  </div> -->
  <PersonalMovieList :movies="movies" />
</template>

<script setup lang="ts">
import PersonalMovieList from "@/components/PersonalMovieList.vue";
import { ref } from "vue";
import { useMoviesStore } from "@/stores/counter";
import type Movie from "@/types/Movie";

const store = useMoviesStore();
const movies = ref(store.personalList as Movie[] | null);
// const movies = ref(null as Movie[] | null);
// movies.value = store.personalList;
</script>

<style>
/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
