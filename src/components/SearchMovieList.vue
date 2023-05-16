<script setup lang="ts">
import type Movie from "@/types/Movie";
import { ref, watch, onMounted } from "vue";
import { useMoviesStore } from "../stores/counter";
import MovieBlock from "./MovieBlock.vue";

const props = defineProps<{
  movies: Movie[] | null;
  // listType: string;
}>();

const addToPersonal = useMoviesStore().addToPersonalList;
const deletePers = useMoviesStore().deleteFromPersonalList;
let movieList = ref(props.movies as Movie[] | null);

const refreshList = (movie: Movie) => {
  movieList.value = addToPersonal(movie);
  hideAddButtonForCheckedMovie();
};

const hideAddButtonForCheckedMovie = () => {
  const personalList = useMoviesStore().personalList ?? [];
  movieList.value = alreadyAddedToPersonal(movieList.value ?? [], personalList);
};

const alreadyAddedToPersonal = (
  movies: Movie[],
  personalList: Movie[]
): Movie[] => {
  return movies.map((element) => {
    for (const item of personalList ?? []) {
      if (item.id === element.id) {
        // console.log("exits");
        return { ...element, disabled: true };
      }
    }
    return { ...element, disabled: false };
  });
};

onMounted(() => {
  hideAddButtonForCheckedMovie();
});

watch(
  () => props.movies,
  (val) => {
    movieList.value = val;
    hideAddButtonForCheckedMovie();
  },
  { deep: true }
);
</script>

<template>
  <div class="movie-list" v-for="movie in movieList" :key="movie.id">
    <MovieBlock :movie="movie">
      <button @click="refreshList(movie)" :disabled="movie.disabled">
        Добавить
      </button>
    </MovieBlock>
    <!-- <img class="preview-img" alt="category" :src="movie.poster?.previewUrl" />
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
      <button @click="refreshList(movie)" :disabled="movie.disabled">
        Добавить
      </button>
    </div> -->
  </div>
</template>

<style scoped>
.rating-kp-imdb {
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
