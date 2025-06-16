import {
  defineStore
} from 'pinia'
import {
  ref
} from 'vue'

export const useWorkStore = defineStore(
  'work',
  () => {
    const workCacheData = ref([])
    const setWorkCacheData = (data) => workCacheData.value = data;
    const addWorkCacheData = (workItem) => workCacheData.value.push(workItem);
    const editWorkCacheData = (index, workItem) => workCacheData.value.splice(index, 1, workItem);
    const delWorkCacheData = (index) => workCacheData.value.splice(index, 1);
    return {
      workCacheData,
      addWorkCacheData,
      editWorkCacheData,
      delWorkCacheData,
      setWorkCacheData,
    }
  }, {
    unistorage: true // 开启后对 state 的数据读写都将持久化
  }
)