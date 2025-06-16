import {
  defineStore
} from 'pinia'
import {
  ref
} from 'vue'

export const useConcatStore = defineStore(
  'concat',
  () => {
    const concatCacheData = ref({})
    const setConcatCacheData = (data) => concatCacheData.value = data;
    return {
      concatCacheData,
      setConcatCacheData,
    }
  }, {
    unistorage: true // 开启后对 state 的数据读写都将持久化
  }
)