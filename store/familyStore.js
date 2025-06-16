import {
  defineStore
} from 'pinia'
import {
  ref
} from 'vue'

export const useFamilyStore = defineStore(
  'family',
  () => {
    const familyCacheData = ref([])
    const setFamilyCacheData = (data) => familyCacheData.value = data;
    const addFamilyCacheData = (familyItem) => familyCacheData.value.push(familyItem);
    const editFamilyCacheData = (index, familyItem) => familyCacheData.value.splice(index, 1, familyItem);
    const delFamilyCacheData = (index) => familyCacheData.value.splice(index, 1);
    return {
      familyCacheData,
      addFamilyCacheData,
      editFamilyCacheData,
      delFamilyCacheData,
      setFamilyCacheData,
    }
  }, {
    unistorage: true // 开启后对 state 的数据读写都将持久化
  }
)