<template>
  <view :style="{ height: windowHeight + 'px' }">
    
        <view @click="chooseImage">相册</view>
  </view>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app'; 

onLoad((options) => {
    uni.showModal({
      title: '提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    }); 
});
onShow(() => {
  const systemInfo = uni.getSystemInfoSync();
  windowHeight.value = systemInfo.windowHeight;
  cameraHeight.value = systemInfo.windowHeight - 80;
});

const chooseImage = () => {
};
 </script>

<style lang="scss" coped>
</style>
