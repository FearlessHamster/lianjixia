<template>
    <div class="items-container">
        <div
        v-for="i in room.paginatedItems"
        class="item"
        >
            <div class="item-container" @click="room.openroom(i.rid)">
                <div class="player-count" :style="{ backgroundColor: getPlayerCountBackgroundColor(i.players.length, i.maxplayers) }">
                {{ i.players.length }}/{{ i.maxplayers }}
                </div>
                <template v-if="i.viplevel == 1">
                <img
                    src="@/assets/vip1.png"
                    :alt="`VIP {{ item.viplevel }}`"
                    class="vip-icon"
                    draggable="false"
                />
                </template>
                <template v-if="i.viplevel == 2">
                <img
                    src="@/assets/vip2.png"
                    :alt="`VIP {{ item.viplevel }}`"
                    class="vip-icon"
                    draggable="false"
                />
                </template>
                <template v-if="i.viplevel == 3">
                <img
                    src="@/assets/vip3.png"
                    :alt="`VIP {{ item.viplevel }}`"
                    class="vip-icon"
                    draggable="false"
                />
                </template>
                <img :src="i.img" draggable="false" />
                <div class="item_title">
                    {{ i.title }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, inject, type Ref } from 'vue';
import { useRoomStore } from '@/stores/Rooms';
import { AddPlayer, getRooms } from '@/utils/CommonServices';
import { useUserStore } from '@/stores/User';

const room = useRoomStore();
const user = useUserStore()



let setActiveTab = inject("setActiveTab") as Function;
let tabTitle = inject("tabTitle") as Ref;

async function openroom(index: number) {
    
    setActiveTab("我的游戏");
    if(user.rid == -1){
      return;
    }
    
    
    localStorage.setItem("index", index.toString());
    AddPlayer(index)
    if(index == user.rid) {
        tabTitle.value = "我的游戏";
    }else{
        tabTitle.value = "当前加入";
    }
    await getRooms();
    
}

room.openroom = openroom;

function getPlayerCountBackgroundColor(playerCount: number, maxPlayerCount: number): string {
  const ratio = playerCount / maxPlayerCount;
  if (ratio < 0.5) {
    return '#4CAF50'; // 绿色，表示不太拥挤
  } else if (ratio < 0.8) {
    return '#FFC107'; // 黄色，表示适中拥挤
  } else {
    return '#F44336'; // 红色，表示非常拥挤
  }
}
</script>

<style scoped>
.item-container {
  position: relative; /* 使容器相对定位 */
  width: 100%; /* 根据需要调整宽度 */
  height: 100%; /* 根据需要调整高度 */
}

.items-container {
  display: flex;
  flex-direction: row; /* 修改这里以确保子项水平排列 */
  flex-wrap: wrap; /* 允许子项换行 */
  justify-content: flex-start; /* 从左侧开始排列子项 */
  align-items: flex-start; /* 从顶部开始对齐子项 */
}

.vip-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 130px; /* 或根据实际需要调整 */
  height: 130px; /* 或根据实际需要调整 */
  z-index: 1; /* 确保图标在图片之上 */
}

.player-count {
  position: absolute;
  top: 0;
  left: 0;
  padding: 2px 5px;
  color: #FFFFFF;
  font-size: 12px;
  z-index: 2; /* 确保显示在最上层 */
}

.itembox .item {
  margin: 7px;
  height: 130px;
  width: 130px;
}

.item_title {
  position: absolute;
  width: 130px;
  margin-top: -27px;
  text-align: center;
  font-size: 14px;
  color: #d8d7d5;
  background-color: rgba(77, 67, 58, 1);
}
</style>