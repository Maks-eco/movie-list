<script setup lang="ts">
import type Movie from "@/types/Movie";
import { ref, watch } from "vue";
import { useMoviesStore } from "../stores/counter";

const props = defineProps<{
  movies: Movie[] | null;
  listType: string;
}>();

const addToPersonal = useMoviesStore().addToPersonalList;
const deletePers = useMoviesStore().deleteFromPersonalList;
let movieList = ref(props.movies as Movie[] | null);

const refreshList = (movie: Movie) => {
  if (props.listType === "search") movieList.value = addToPersonal(movie);
  if (props.listType === "recomm") movieList.value = deletePers(movie);
};

// const alreadyAddedToPersonal = (movies: Movie[]): Movie[] => {
//     return movies.map((element) => {
//       for (const item of personalList.value ?? []) {
//         if (item.id === element.id) {
//           console.log("exits");
//           return { ...element, disabled: true };
//         }
//       }
//       return { ...element, disabled: false };
//     });
//   };

// watch(
//   useMoviesStore().personalList
//   ()=>{
// })
</script>

<template>
  <div class="movie-list" v-for="movie in movieList" :key="movie.id">
    <img class="preview-img" alt="category" :src="movie.poster.previewUrl" />
    <div>
      <p>{{ movie.name }}</p>
      <p :style="{ 'font-size': '10px' }">
        {{ movie.description.slice(0, 200) }}
      </p>
      <button @click="refreshList(movie)" :disabled="movie.disabled">
        {{ listType === "search" ? "Добавить" : "" }}
        {{ listType === "recomm" ? "Удалить" : "" }}
      </button>
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
</style>
