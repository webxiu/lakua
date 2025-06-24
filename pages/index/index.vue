<template>
	<view class="success" v-for="item in pageList" :key="item.url">
		<button @click="onClick(item)" size="default" :type="item.type" class="item-button" hover-class="is-hover">
			<uni-icons :type="item.icon" size="20" :color="item.iconColor"></uni-icons>
			{{item.name}}
		</button>

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
			type: "default",
			icon: 'flag-filled',
			iconColor: '#07c160',
			url: '/pages/mine/index'
		},
		{
			name: '消消乐',
			type: "default",
			icon: 'fire-filled',
			iconColor: '#8161c1',
			url: '/pages/eliminate/index'
		},
	]);

	const res = uni.getStorageSync('step') || '{}';
	onLoad(() => {
		console.log('index-home', res);
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