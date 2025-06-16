import {
  defineStore
} from 'pinia'
import {
  ref
} from 'vue'

export const useEducationStore = defineStore(
  'education',
  () => {
    const educationCacheData = ref([])
    const setEducationCacheData = (data) => educationCacheData.value = data;
    const addEducationCacheData = (eduItem) => educationCacheData.value.push(eduItem);
    const editEducationCacheData = (index, eduItem) => educationCacheData.value.splice(index, 1, eduItem);
    const delEducationCacheData = (index) => educationCacheData.value.splice(index, 1);
    return {
      educationCacheData,
      addEducationCacheData,
      editEducationCacheData,
      delEducationCacheData,
      setEducationCacheData,
    }
  }, {
    unistorage: true // 开启后对 state 的数据读写都将持久化
  }
)