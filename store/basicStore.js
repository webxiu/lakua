import {
  defineStore
} from 'pinia'
import {
  ref
} from 'vue'

export const useBasicStore = defineStore(
  'basic',
  () => {
    const basicCacheData = ref({})
    const setBasicCacheData = (data) => basicCacheData.value = data;
    return {
      basicCacheData,
      setBasicCacheData,
    }
  }, {
    unistorage: true // 开启后对 state 的数据读写都将持久化
  }
)