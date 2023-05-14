<script setup lang="ts">
import type Movie from "@/types/Movie";
// import { ref } from "vue";
// import { useMoviesStore } from "../stores/counter";
defineProps<{
  movies: Movie[] | null;
}>();
</script>

<template>
  <div class="movie-list" v-for="movie in movies" :key="movie.id">
    <img class="preview-img" alt="category" :src="movie.poster.previewUrl" />
    <div>
      <p>{{ movie.name }}</p>
      <p :style="{ 'font-size': '10px' }">
        {{ movie.description.slice(0, 200) }}
      </p>
      <!-- <p>{{ movie.name }}</p> -->
    </div>
  </div>
</template>

<style scoped>
.preview-img {
  height: 100px;
}
.movie-list {
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 10px;
}
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

/* @media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
} */
</style>
