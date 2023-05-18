<script setup lang="ts">
import type Movie from "@/types/Movie";
import { ref, watch, onMounted } from "vue";
import { useMoviesStore } from "../stores/counter";
import MovieBlock from "./MovieBlock.vue";

const props = defineProps<{
  movies: Movie[] | null;
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
  </div>
</template>

<style scoped>
.movie-list {
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 10px;
}
</style>
