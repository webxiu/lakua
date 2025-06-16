<template>
  <view class="user-sign">
    <uni-section title="请在虚线区域内签名" type="line" padding>
      <view class="wrapper">
        <view class="sign-area">
          <c-sign ref="signRef" lineColor="#000000" :lineWidth="4" bgColor="#fff" />
        </view>
        <view class="btn-group">
          <button @click="clear">清除</button>
          <button @click="() => setShowSign(false)">关闭</button>
          <button @click="save">保存</button>
        </view>
      </view>
    </uni-section>
  </view>
</template>

<script setup>
import { reactive, ref } from 'vue';
import EducationForm from '@/components/education-form/index.vue';
import { useSignStore } from '@/store/sign.js';
import { useStepStore } from '@/store/step.js';
const signRef = ref(null);
const signStore = useSignStore();
const stepStore = useStepStore();
const props = defineProps(['setShowSign']);

const openPopUp = () => {
  popupRef.value.open('bottom');
};

const save = () => {
  signRef.value
    .save()
    .then((res) => {
      // console.log(res.base64, 'sign');
      signStore.setSignStr(res.base64);
      stepStore.addCurrentStep();
      props.setShowSign(false);
    })
    .catch((err) => {
      console.log(err);
      wx.showToast({
        title: err.errMsg,
        icon: 'error',
        duration: 2000
      });
    });
};

const clear = () => signRef.value.clear();
</script>

<style lang="scss" scoped>
.user-sign {
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // background-color: pink;
    .sign-area {
      border: 2px dotted #ccc;
      height: calc(100vh - 150px);
      // background-color: hotpink;
      margin-bottom: 10px;
    }
    .btn-group {
      display: flex;
      // justify-content: space-between;
      // background-color: deeppink;
      // margin-top: 10px;
      button {
        // background-color: red;
        // height: 30px;
        color: #fff;
        width: 25%;
        font-size: 16px;
        &:nth-child(1) {
          background-color: rgb(255, 125, 0);
        }
        &:nth-child(2) {
          background-color: rgb(245, 63, 63);
        }
        &:nth-child(3) {
          background-color: rgb(0, 180, 42);
        }
      }
    }
  }
}
</style>
