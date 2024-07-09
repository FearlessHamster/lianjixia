<template>
  <div class="game" v-if="common.item">
    <div class="playerlist">
      <table style="width:170px;max-width: 170px;">
        <tr style="color:#ea5c3e;background-color: #4D433A;">
          <td style="width:100px;max-width: 100px;">玩家</td>
          <td>状态</td>
        </tr>

        <tr style="color:#d8d7d5;font-size: 15px;" v-for="player in common.item.players" :key="player">
          <td>{{ player }}</td>
          <td>等待</td>
        </tr>
      </table>
    </div>
    <div style="margin-top: 5px;height: 50px;max-height: 50px">
      <button @click="Leave()" style="background-color: #4D433A;width: 40px;height: 50px;margin-right: 2px;color: #d8d7d5;border: none;"><</button>
      <button style="background-color: #DA4729;width: 130px;height: 50px;color: #d8d7d5;border: none;">启动游戏</button>
    </div>
  </div>
</template>

<script setup lang="ts">

import {useCommonStore} from "@/stores/Common";

const common = useCommonStore();
async function Leave() {
  common.setActiveTab('国服大厅');
}

</script>

<style scoped>

.game {
  width: 200px;
  height: 500px;
  margin-top: 10px;
  margin-left: auto;
  justify-content: flex-end;
}

.playerlist {
  border: 1px solid #4D433A;
  height: 420px;
  max-height: 420px;
  overflow-y: auto;
  overflow-x: hidden;
  width:170px;
}

.playerlist::-webkit-scrollbar {
  width: 8px; /* 设置滚动条的宽度 */
}

.playerlist::-webkit-scrollbar-track {
  background: #2e2e2e; /* 设置滚动条轨道的背景色 */
}

.playerlist::-webkit-scrollbar-thumb {
  background: #ea5c3e; /* 设置滚动条的颜色 */
  border-radius: 4px; /* 设置滚动条的圆角 */
}

.playerlist::-webkit-scrollbar-thumb:hover {
  background: #b03a2e; /* 设置滚动条在鼠标悬停时的颜色 */
}
</style>