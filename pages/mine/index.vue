<template>
  <view class="container">
    <!-- 消息栏 -->
    <view class="message">地雷：{{ minesCount - infoCount }}</view>

    <!-- 雷区 -->
    <view class="box" :style="{ width: boxWidth + 'px', height: boxHeight + 'px' }">
      <block v-for="[key, cell] in cells" :key="key">
        <view
          class="item"
          :class="{ hide: cell.hide }"
          :style="{ width: size + 'px', height: size + 'px' }"
          @tap="handleLeftClick(cell)"
          @longpress="handleRightClick(cell)"
        >
          <view v-if="!cell.hide" class="content">
            <view v-if="cell.isMine" class="circle"></view>
            <view v-else>{{ cell.number || '' }}</view>
          </view>
        </view>
      </block>
    </view>

    <!-- 重新开始按钮 -->
    <view style="text-align: center; margin-top: 15px">
      <button @tap="resetGame">重新开始</button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 游戏参数
const rows = 20
const cols = 20
const systemInfo = uni.getSystemInfoSync()
const size = systemInfo.windowWidth / 20 - 1

// 地图数据
const cells = ref(new Map())
const mines = ref({})
const minesCount = ref(0)
const revealedCount = ref(0)

// 计算样式尺寸
const boxWidth = computed(() => cols * size)
const boxHeight = computed(() => rows * size)
const infoCount = computed(() =>
  [...cells.value.values()].filter(c => c.info).length
)

// 生成地雷
function generateMines() {
  const map = {}
  let count = 0
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const isMine = Math.random() > 0.9
      map[`${i}-${j}`] = isMine
      if (isMine) count++
    }
  }
  mines.value = map
  minesCount.value = count
}

// 获取周围雷数
function getNumber(i, j) {
  let count = 0
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) continue
      const key = `${i + dx}-${j + dy}`
      if (mines.value[key]) count++
    }
  }
  return count
}

// 初始化地图数据
function initCells() {
  const newCells = new Map()
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const key = `${i}-${j}`
      const isMine = mines.value[key]
      const number = getNumber(i, j)
      newCells.set(key, {
        key,
        i,
        j,
        isMine,
        number,
        hide: true,
        info: false
      })
    }
  }
  cells.value = newCells
}

// 左键点击事件
function handleLeftClick(cell) {
  if (!cell.hide || cell.info) return
  revealCell(cell)
  checkWin()
}

// 展开单元格
function revealCell(cell) {
  if (!cell.hide) return
  cell.hide = false
  revealedCount.value++

  if (cell.number === 0) {
    setTimeout(() => {
      expandEmptyArea(cell.i, cell.j)
    }, 0)
  }

  if (cell.isMine) {
    uni.showToast({
      title: '踩中地雷了',
      icon: 'none',
      duration: 1500
    })
  }
}

// 自动展开空白区域
function expandEmptyArea(x, y) {
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) continue
      const key = `${x + dx}-${y + dy}`
      const neighbor = cells.value.get(key)
      if (neighbor && neighbor.hide && !neighbor.info) {
        neighbor.hide = false
        revealedCount.value++
        if (neighbor.number === 0) {
          expandEmptyArea(neighbor.i, neighbor.j)
        }
      }
    }
  }
}

// 右键点击事件（长按模拟）
function handleRightClick(cell) {
  if (!cell.hide) return
  cell.info = !cell.info
  checkWin()
}

// 胜利判断
function checkWin() {
  const totalHidden = rows * cols - minesCount.value
  if (revealedCount.value === totalHidden) {
    uni.showToast({
      title: '恭喜成功！',
      icon: 'success',
      duration: 1500
    })
  }
}

// 重置游戏
function resetGame() {
  generateMines()
  initCells()
  revealedCount.value = 0
}

onMounted(() => {
  generateMines()
  initCells()
})
</script>

<style scoped>
.container {
  padding: 20rpx;
}
.message {
  font-size: 28rpx;
  margin-bottom: 20rpx;
}
.box {
  display: flex;
  flex-wrap: wrap;
}
.item {
  border: 1px solid #ddd;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.circle {
  border: 4px solid #a33939;
  border-radius: 100%;
  width: 60%;
  height: 60%;
}
.number {
  font-weight: bold;
}
.item.hide {
  background-color: #b3b1b1;
}
.item.hide .content {
  display: none;
}
.item.info::after {
  content: '雷';
  color: #a86868;
  font-size: 24rpx;
}
</style>