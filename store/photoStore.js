import {
  defineStore
} from 'pinia'
import {
  reactive,
  ref
} from 'vue'

export const usePhotoStore = defineStore(
  'photo',
  () => {
    const allPhotoCacheData = reactive({})
    const setAllPhotoCacheData = (keyStr, data) => allPhotoCacheData[keyStr] = data;
    return {
      allPhotoCacheData,
      setAllPhotoCacheData,
    }
  }, {
    unistorage: true // 开启后对 state 的数据读写都将持久化
  }
)