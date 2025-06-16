<template>
  <rich-text :nodes="strings"></rich-text>
</template>

<script setup>
import { ref } from 'vue';
const strings = ref(`
  <div class="containers">
          <div class="p">2、本协议及其修改权、最终解释权归我公司所有。</div>
  </div>
  `);
</script>

<style lang="scss">
.containers {
  max-width: 750px;
  margin: 0 auto;
  text-align: justify;
  padding: 20px 15px;
  word-break: break-all;
  word-wrap: break-word;
  line-height: 22px;
  font-size: 14px;
  color: #333;
}

.containers:first-child {
  padding-top: 0;
}

.containers .p {
  margin: 15px 0 0;

  .b {
    color: #000;
    font-weight: 800;
  }
}

.containers .ol {
  padding-left: 20px;
  margin: 15px 0 0;
}

.containers .ol .li {
  margin: 10px 0 0;
  list-style-type: none;
}

.bold {
  font-weight: bold;
}

.unline {
  text-decoration: underline;
}
</style>
