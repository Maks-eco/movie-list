<script setup lang="ts">
import { ref } from "vue";
// const props = defineProps(["modelValue"]);
// defineEmits(["search"]);
defineEmits<{
  (e: "search", value: string): void;
}>();
const variabl = ref("" as string);
</script>

<template>
  <div class="search-field">
    <input class="name-input" type="text" v-model="variabl" />
    <button class="accept-button" @click="$emit('search', variabl)">
      Жмакай
    </button>
  </div>
</template>

<style scoped>
.search-field {
  display: flex;
  justify-content: center;
}
.name-input {
  height: 30px;
  width: 50%;
  padding: 0px;
}
.accept-button {
  height: 30px;
  padding: 0px 23px 0px 23px;
  font-size: 20px;
  border-style: none;
  background-color: firebrick;
  color: antiquewhite;
}
</style>
