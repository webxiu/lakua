<template>
  <web-view :src="url"></web-view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

const url = ref('');

onLoad((option) => {
  console.log('onLoad:', option);
  url.value = decodeURIComponent(option.url);
});
</script>
