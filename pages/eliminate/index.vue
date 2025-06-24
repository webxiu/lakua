<template>
	<view class="container">
		<view class="score">当前得分：{{ score }}</view>
		<view class="main" :style="{ width: cols * size + 'px' }">
			<view v-for="(col, colIndex) in grid" :key="colIndex" class="cols">
				<view v-for="(item, rowIndex) in col" :key="rowIndex" class="item" :class="{
						active: item.active,
						'small': item.small,
						'small-ok': item.removing,
						'small-ok-two': item.removed,
						'add-hide': item.adding
					  }" 
					  @touchstart="handleTouchStart(item)" @touchend="handleTouchEnd"
					@touchmove="handleTouchMove($event, item, colIndex, rowIndex)" @mousedown="handleMouseDown(item)"
					@mouseup="handleMouseUp" @mouseenter="handleMouseEnter(item)">
					<view class="img" :style="{ backgroundImage: 'url(' + item.url + ')' }"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'

	// 基础配置
	const rows = 8
	const cols = 6
	const size = 50
	const clearCount = 3
	const groupSize = 200

	// 水果资源池（使用 require 引入本地资源）
	const simpleData = Array.from({
		length: 5
	}).map((_, i) => ({
		id: i,
		url: `/static/images/fruit/${i+1}.png`
	}))
	console.log(666, simpleData);
	let renderData = []

	function initRenderData() { 
		renderData = Array.from(new Array(groupSize)).map(v => simpleData).flat().sort(() => Math.random() - 0.5)
	}

	// 初始化二维数组表示网格
	const grid = ref([])

	function initGrid() {
		grid.value = Array(cols)
			.fill()
			.map(() =>
				Array(rows)
				.fill()
				.map(() => {
					const item = renderData.pop()
					return {
						...item,
						active: false,
						small: false,
						removing: false,
						removed: false,
						adding: true
					}
				})
			)

		// 延迟去掉 add-hide 效果
		setTimeout(() => {
			grid.value.forEach(col => {
				col.forEach(item => (item.adding = false))
			})
		}, 100)
	}

	// 得分
	const score = ref(0)

	// 是否正在拖拽
	const isDrag = ref(false)

	// 触发点击事件
	function handleMouseDown(item) {
		item.active = true
		isDrag.value = true
	}

	function handleTouchStart(item) {
		item.active = true
		isDrag.value = true
	}

	function handleMouseEnter(item) {
		if (isDrag.value) {
			item.active = true
		}
	}

	function handleMouseUp() {
		isDrag.value = false
		checkAndClear()
	}

	function handleTouchEnd() {
		isDrag.value = false
		checkAndClear()
	}

	// 使用 uni.createSelectorQuery 替代 document.querySelector
	function handleTouchMove(e, item, colIndex, rowIndex) {
		if (!isDrag.value) return

		const touch = e.touches[0]

		uni.createSelectorQuery()
			.select('.main')
			.boundingClientRect(res => {
				if (!res) return

				const x = touch.clientX - res.left
				const y = touch.clientY - res.top

				const r = size / 2
				const a = Math.abs(x % size - r)
				const b = Math.abs(y % size - r)
				const c = Math.sqrt(a * a + b * b)

				if (c < r) {
					const xV = Math.ceil(x / size)
					const yV = Math.ceil(y / size) - 1

					const targetCol = grid.value[xV - 1]
					if (targetCol && targetCol[rows - yV - 1]) {
						targetCol[rows - yV - 1].active = true
					}
				}
			})
			.exec()
	}

	// 检查并消除
	function checkAndClear() {
		const list = []

		for (let col of grid.value) {
			for (let item of col) {
				if (item.active) {
					list.push(item)
				}
			}
		}

		if (list.length < clearCount) {
			list.forEach(i => {
				i.active = false
				i.small = true
			})

			setTimeout(() => {
				list.forEach(i => {
					i.small = false
				})
			}, 200)
			return
		}

		const first = list[0]
		const result = list.every(i => i.id === first.id)

		if (result) {
			list.forEach(i => {
				i.active = false
				i.removing = true
				i.removed = false
			})

			setTimeout(() => {
				list.forEach(i => {
					i.removing = false
					i.removed = true

					let newFruit = renderData.pop()
					if (!newFruit) {
						initRenderData()
						newFruit = renderData.pop()
					}

					if (newFruit) {
						Object.assign(i, {
							...newFruit,
							active: false,
							small: false,
							removing: false,
							removed: false,
							adding: true
						})

						setTimeout(() => {
							i.adding = false
						}, 100)
					}

					score.value += 1
				})
			}, 200)
		} else {
			list.forEach(i => {
				i.active = false
				i.small = true
			})

			setTimeout(() => {
				list.forEach(i => {
					i.small = false
				})
			}, 200)
		}
	}

	onMounted(() => {
		initRenderData()
		initGrid()
	})
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 40rpx;
	}

	.score {
		margin-bottom: 20rpx;
		font-size: 32rpx;
	}

	.main {
		display: flex;
		flex-wrap: wrap;
	}

	.cols {
		display: flex;
		flex-direction: column-reverse;
	}

	.item {
		position: relative;
		user-select: none;
		transition: transform 0.2s, height 0.2s;
		border-radius: 100%;
		overflow: hidden;
	}

	.small {
		transform: scale(0.8);
	}

	.small-ok {
		transform: scale(0);
	}

	.small-ok-two {
		height: 0 !important;
	}

	.add-hide {
		transform: scale(0);
	}

	.active {
		opacity: 0.5;
	}

	.img {
		background: no-repeat center center;
		background-size: 100%;
		pointer-events: none;
		flex: 1;
		width: 50px;
		height: 50px;
	}
</style>