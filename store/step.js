import {
  defineStore
} from 'pinia'
import {
  ref
} from 'vue'

export const useStepStore = defineStore(
  'step',
  () => {
    const step = ref(1);
    const displayCurrentStep = ref(0);
    const isNotMarried = ref(true);
    const hasWorkExp = ref(false);
    const ocrDone = ref(false);
    const currentUserType = ref("");
    const setCurrentUserType = t => currentUserType.value = t;
    const setCurrentStep = s => displayCurrentStep.value = s;
    const addCurrentStep = () => displayCurrentStep.value++;
    const minusCurrentStep = () => displayCurrentStep.value--;
    const setOcrDone = bol => ocrDone.value = bol;
    const setStep = (s) => step.value = s;
    const setIsNotMarried = (val) => isNotMarried.value = val;
    const setHasWorkExp = (val) => hasWorkExp.value = val;
    const addStep = (s) => step.value++;
    const minusStep = (s) => step.value--;
    return {
      step,
      setCurrentUserType,
      currentUserType,
      minusCurrentStep,
      displayCurrentStep,
      setCurrentStep,
      addCurrentStep,
      ocrDone,
      setOcrDone,
      isNotMarried,
      addStep,
      setHasWorkExp,
      minusStep,
      hasWorkExp,
      setStep,
      setIsNotMarried
    }
  }, {
    unistorage: true // 开启后对 state 的数据读写都将持久化
  }
)