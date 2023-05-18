<script setup lang="ts">
import type Movie from "@/types/Movie";

const props = defineProps<{
  movie: Movie;
}>();

</script>

<template>
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
    </div>
</template>

<style scoped>
.rating-kp-imdb{
  font-size: 13px;
  color: #777;
}
.preview-img {
  height: 100px;
}
</style>
