<script setup lang="ts">
import type Movie from "@/types/Movie";
import { ref } from "vue";
import { useMoviesStore } from "../stores/counter";
import MovieBlock from "./MovieBlock.vue";

const props = defineProps<{
  movies: Movie[] | null;
}>();

const updatePersonal = useMoviesStore().updatePersonalList;
const deletePers = useMoviesStore().deleteFromPersonalList;
let movieList = ref(props.movies as Movie[] | null);

const refreshList = (movie: Movie) => {
  movieList.value = deletePers(movie);
};

const changeWatchStatus = (movie: Movie) => {
  movieList.value = updatePersonal({
    ...movie,
    alreadyWatched: movie.alreadyWatched ? false : true,
  });
};
</script>

<template>
  <div id="content">
    <div id="left">
      <div class="movie-list" v-for="movie in movieList" :key="movie.id">
        <div v-if="!movie.alreadyWatched">
          <MovieBlock :movie="movie">
            <button @click="refreshList(movie)" :disabled="movie.disabled">
              Удалить
            </button>
            <button @click="changeWatchStatus(movie)">
              {{ movie.alreadyWatched ? "Не видел" : "Посмотрел" }}
            </button>
          </MovieBlock>
        </div>
      </div>
    </div>
    <h1>Просмотрено</h1>
    <div id="right">
      <div class="movie-list" v-for="movie in movieList" :key="movie.id">
        <div v-if="movie.alreadyWatched">
          <MovieBlock :movie="movie">
            <button @click="refreshList(movie)" :disabled="movie.disabled">
              Удалить
            </button>
            <button @click="changeWatchStatus(movie)">
              {{ movie.alreadyWatched ? "Не видел" : "Посмотрел" }}
            </button>
          </MovieBlock>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-list {
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 10px;
}
</style>
