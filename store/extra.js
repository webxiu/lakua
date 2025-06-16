import {
  defineStore
} from 'pinia'
import {
  ref
} from 'vue'

export const useExtraStore = defineStore(
  'extra',
  () => {
    const extraInfo = ref({})
    const setExtraInfo = (s) => extraInfo.value = s;
    return {
      extraInfo,
      setExtraInfo
    }
  }, {
    unistorage: true // 开启后对 state 的数据读写都将持久化
  }
)