<template>
	<view class="success" v-for="item in pageList" :key="item.url">
		<button @click="onClick(item)" size="default" type="primary" class="item-button"
			hover-class="is-hover">{{item.name}}</button>
		<uni-icons type="checkbox-filled" size="100" color="#07c160"></uni-icons>
	</view>
</template>

<script setup>
	import {
		onMounted,
		reactive,
		ref,
		computed
	} from 'vue';
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app';
	import {
		useStepStore
	} from '@/store/step';
	// import ButtonGroup from '@/components/button-group/index.vue';
	const stepStore = useStepStore();
	const pageList = reactive([{
			name: '扫雷',
			icon: '',
			url: '/pages/mine/index'
		},
		{
			name: '消消乐',
			icon: '',
			url: '/pages/eliminate/index'
		},
	]);

	const res = uni.getStorageSync('step') || '{}';
	onLoad(() => {
		console.log('index-home');
	});
	const onClick = (item) => {
		console.log(item);
		uni.navigateTo({
			url: item.url
		});
	};
</script>

<style lang="scss" scoped>
	.item-button {
		margin-bottom: 10rpx;
	}
</style>