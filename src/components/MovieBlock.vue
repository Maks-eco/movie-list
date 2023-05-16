<script setup lang="ts">
import type Movie from "@/types/Movie";
import { ref, watch, onMounted } from "vue";
import { useMoviesStore } from "../stores/counter";

const props = defineProps<{
  movie: Movie;
  // listType: string;
}>();

// onMounted(() => {
//   hideAddButtonForCheckedMovie();
// });

// watch(
//   () => props.movies,
//   (val) => {
//     movieList.value = val;
//     hideAddButtonForCheckedMovie();
//   },
//   { deep: true }
// );
</script>

<template>
  <!-- <div class="movie-list" v-for="movie in movieList" :key="movie.id"> -->
    <img class="preview-img" alt="category" :src="movie.poster?.previewUrl" />
    <div>
      <p>
        {{ movie.name }} 
        <div class="rating-kp-imdb">
          {{ movie.rating?.kp ? "kp: " + movie.rating?.kp : "" }}
          {{ movie.rating?.imdb ? "imdb: " + movie.rating?.imdb : "" }}
        </div>
      </p>
      <p :style="{ 'font-size': '10px' }">
        {{ movie.description?.slice(0, 200) }}
      </p>
      <slot></slot>
      <!-- <button @click="refreshList(movie)" :disabled="movie.disabled">
        Добавить
      </button> -->
    </div>
  <!-- </div> -->
</template>

<style scoped>
.rating-kp-imdb{
  font-size: 13px;
  color: #777;
}
.preview-img {
  height: 100px;
}
.movie-list {
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 10px;
}
</style>
