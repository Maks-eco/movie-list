<script setup lang="ts">
import type Movie from "@/types/Movie";
import { ref, watch } from "vue";
import { useMoviesStore } from "../stores/counter";
import MovieBlock from "./MovieBlock.vue";

const props = defineProps<{
  movies: Movie[] | null;
  // listType: string;
}>();

// const addToPersonal = useMoviesStore().addToPersonalList;
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
              {{ movie.alreadyWatched ? "posmotrel" : "ne vidal" }}
            </button>
          </MovieBlock>

          <!--<img
            class="preview-img"
            alt="category"
            :src="movie.poster.previewUrl"
          />
          <div>
            <p>{{ movie.name }}</p>
            <p :style="{ 'font-size': '10px' }">
              {{ movie.description.slice(0, 200) }}
            </p>
            <button @click="refreshList(movie)" :disabled="movie.disabled">
              Удалить
            </button>
            <button @click="changeWatchStatus(movie)">
              {{ movie.alreadyWatched ? "posmotrel" : "ne vidal" }}
            </button>
          </div> -->
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
              {{ movie.alreadyWatched ? "posmotrel" : "ne vidal" }}
            </button>
          </MovieBlock>

          <!--<img
            class="preview-img"
            alt="category"
            :src="movie.poster.previewUrl"
          />
          <div>
            <p>{{ movie.name }}</p>
            <p :style="{ 'font-size': '10px' }">
              {{ movie.description.slice(0, 200) }}
            </p>
            <button @click="refreshList(movie)" :disabled="movie.disabled">
              Удалить
            </button>
            <button @click="changeWatchStatus(movie)">
              {{ movie.alreadyWatched ? "posmotrel" : "ne vidal" }}
            </button>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* #content,
html,
body {
  height: 80vh;
}
#left {
  float: left;
  width: 50%;
  background: rgba(255, 0, 0, 0.199);
  height: 100%;
  overflow: auto;
}
#right {
  float: left;
  width: 50%;
  background: rgba(0, 0, 255, 0.192);
  height: 100%;
  overflow: auto;
} */
.preview-img {
  height: 100px;
}
.movie-list {
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 10px;
}
</style>
