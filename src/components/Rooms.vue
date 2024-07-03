<template>
    <ul class="tab" style="margin-top: 10px;">
            <li
              class="item"
              :class="{ active2: activeTab2 === '基本信息' }"
              @click="setActiveTab2('基本信息')"
            >
              基本信息
            </li>
            <li
              v-if="tabTitle === '我的游戏'"
              class="item"
              :class="{ active2: activeTab2 === '控制台' }"
              @click="setActiveTab2('控制台')"
            >
              控制台
            </li>
            <li
              v-if="tabTitle === '我的游戏'"
              class="item"
              :class="{ active2: activeTab2 === '设置' }"
              @click="setActiveTab2('设置')"
            >
              设置
            </li>
            <li
              v-if="tabTitle === '我的游戏'"
              class="item"
              :class="{ active2: activeTab2 === '插件' }"
              @click="setActiveTab2('插件')"
            >
              插件
            </li>
            <li
              v-if="tabTitle === '我的游戏'"
              class="item"
              :class="{ active2: activeTab2 === '模组' }"
              @click="setActiveTab2('模组')"
            >
              模组
            </li>
          </ul>
          <div class="main-container">
            <div
              class="itembox2"
              v-if="activeTab2 === '基本信息'"
            >
              <div class="itembox3" v-if="item">
                <div style="width: 130 !important;" class="item-container">
                  <template v-if="item.viplevel === 3">
                    <img
                      src="@/assets/vip3.png"
                      alt="VIP 3"
                      class="vip-icon"
                      draggable="false"
                    />
                  </template>
                  <img
                    style="width: 130px; height: 130px"
                    :src="item.img"
                    draggable="false"
                  />
                  <div
                    class="item_title"
                    style="margin-top: 6px; background-color: rgba(77, 67, 58, 0)"
                  >
                    {{ item.title }}
                  </div>
                </div>
                <div class="pagination-controls" style="margin-top: 30px;margin-left: -5px; display: grid">
                  <button style="margin: 10px; width: 100px; height: 32px">
                    修改游戏
                  </button>
                  <button style="margin: 10px; width: 100px; height: 32px">
                    更换背景
                  </button>
                </div>
              </div>

              <div class="info" v-if="item">
                <div class="dec">
                  介绍：
                  <br />
                  {{ truncatedDec }}
                </div>
                <br>
                <div class="server">
                  服务器核心：
                  <br />
                  {{ item.servercore }}
                </div>
                <br>
                <div class="client">
                  客户端核心：
                  <br />
                  {{ item.clientcore }}
                </div>
                <br>
                <div style="display: flex;">
                  <div class="plugins" style="margin-right: 200px;">
                  包含插件{{item.plugins.length}}个：
                  <div class="plugin" v-for="plugin in item.plugins">
                    {{ plugin }}
                  </div>
                  </div>
                  <br>
                  <div class="mods">
                    包含模组{{item.mods.length}}个：
                    <div v-for="mod in item.mods">{{ mod }}</div>
                  </div>
                </div>
                
              </div>
              <div class="game" v-if="item">
                <div class="playerlist">
                  <table style="width:170px;max-width: 170px;">
                    <tr style="color:#ea5c3e;background-color: #4D433A;">
                        <td style="width:100px;max-width: 100px;">玩家</td>
                        <td>状态</td>
                    </tr>

                    <tr style="color:#d8d7d5;font-size: 15px;" v-for="player in item.players" :key="player">
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
            </div>
          </div>
</template>

<script setup lang="ts">
import { watch, ref, computed, defineProps, inject, type Ref } from "vue";
import { useRoomStore } from "@/stores/Rooms";
import { useUserStore } from "@/stores/User";
import { LeavePlayer } from "@/utils/CommonServices";

const room = useRoomStore();
const user = useUserStore();

let index = Number(localStorage.getItem("index"));
const activeTab2 = ref("基本信息"); // 默认激活的项
const players = ref([]); 

const tabTitle = inject("tabTitle") as Ref;
const setActiveTab = inject("setActiveTab") as Function;

let item = ref({
            rid: 0,
            title: "",
            img: "",
            dec: "",
            servercore: "",
            clientcore: "",
            players: [],
            maxplayers: 0,
            viplevel: 0,
            plugins: [],
            mods: []
          });

watch(() => room.rooms, (newVal, oldVal) => {
  // 这里是你想要执行的函数，每当 room.rooms 更新时都会调用
  for (let i = 0; i < room.rooms.length; i++) {
  if (room.rooms[i].rid == index) {
    room.rooms[i].players.push(user.username);;
    item.value = room.rooms[i];
    break;
  }
}
  // 例如，重新计算某些值或调用另一个函数
}, {
  deep: true // 使用深度监听，以便于监听数组或对象内部值的变化
});

const truncatedDec = computed(() => {
  if (item && item.value.dec.length > 200) {
    return item.value.dec.substring(0, 200) + '...';
  }
  return item ? item.value.dec : '';
});


function setActiveTab2(tabName: string) {
  activeTab2.value = tabName;
}

async function Leave() {
    setActiveTab('国服大厅');
}



</script>

<style scoped>

.item-container {
  position: relative; /* 使容器相对定位 */
  width: 100%; /* 根据需要调整宽度 */
  height: 100%; /* 根据需要调整高度 */
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

.vip-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 130px; /* 或根据实际需要调整 */
  height: 130px; /* 或根据实际需要调整 */
  z-index: 1; /* 确保图标在图片之上 */
}

.playerlist {
  border: 1px solid #4D433A;
  height: 420px;
  max-height: 420;
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

.itembox3 {
  margin-top: 80px;
  margin-left: 10px;
  width: 130px !important; /* 修正的宽度，添加了px单位 */
}

.game {
  width: 200px;
  height: 500px;
  border-radius: 50%;
  margin-left: 700px;
  margin-top: -570px;
}

.active2 {
  border-bottom: solid 2px #ea5c3e;
  color: #ea5c3e !important;
}

.itembox3 {
  margin-top: 80px;
  margin-left: 10px;
}
</style>
