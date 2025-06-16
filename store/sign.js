import {
  defineStore
} from 'pinia'
import {
  ref
} from 'vue'

export const useSignStore = defineStore(
  'sign',
  () => {
    const sign = ref("");
    const setSignStr = str => sign.value = str;
    return {
      sign,
      setSignStr,
    }
  }, {
    unistorage: true // 开启后对 state 的数据读写都将持久化
  }
)