<template>
  <div class="center">
    <div class="box">
      <div class="title" style="margin-left: 8px; margin-top: 7px">
        <Title style="color: #d8d7d5; margin: 4px; height: 23px; width: 23px" />
        <span style="margin-top: 5px; margin-left: 3px; color: #d8d7d5; font-size: 17px"
          >我的世界联机侠<span style="margin-left: 30px">（内部测试版）</span></span
        >
      </div>
      <User />
      <ul class="tab">
        <li
          class="item"
          :class="{ active: common.activeTab === '国服大厅' }"
          @click="common.activeTab !== '国服大厅' && common.setActiveTab('国服大厅')"
        >
          国服大厅
        </li>
        <li
          class="item"
          :class="{ active: common.activeTab === '我的游戏' }"
          @click="common.activeTab !== '我的游戏' && room.openroom(user.rid)"
        >
          {{common.tabTitle}}
        </li>
      </ul>

      <div class="itembox">
        <!-- 使用.items-container来包裹.item元素 -->
          <Items v-if="common.activeTab === '国服大厅'" />
          
          <Rooms v-if="common.activeTab === '我的游戏'" />
        <!-- 分页控制 -->
        <div class="pagination-controls" v-if="common.activeTab === '国服大厅' && room.totalPages!=0">
          <button @click="prevPage" :disabled="room.currentPage === 1">上一页</button>
          <span>{{ room.currentPage }} / {{ room.totalPages }}</span>
          <button @click="nextPage" :disabled="room.currentPage >= room.totalPages">下一页</button>
        </div>
      </div>
      <div class="footer">联机侠0.0.1</div>
      
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, provide, onMounted } from "vue";
import Title from "@/components/icons/TitleIcon.vue";
import Rooms from "@/components/Rooms.vue";
import Items from "@/components/Items.vue";
import User from "@/components/User.vue";
import { Base64 } from 'js-base64';
import { LeavePlayer, Login } from "@/utils/CommonServices";
import { useRoomStore } from "@/stores/Rooms";
import { useUserStore } from "@/stores/User";
import { useCommonStore } from "@/stores/Common";
import { useResourceStore } from "@/stores/Resources";
import { layer } from "@layui/layer-vue";
import axios from "axios";

const messages = (event: any) =>{
  const data = JSON.parse(event.data);

  switch (data.type) {
    case "connected":
      common.sendWebsocket("getRoom",{})
      common.sendWebsocket("getServerCore",{})
      common.sendWebsocket("getClientCore",{})
      common.sendWebsocket("getResource",{})
      const token = ref(localStorage.getItem("token") ?? "")
      const logindata = ref<any>()
      if(token.value !== ""){
        logindata.value = Base64.decode(token.value).split(" ");
        Login(logindata.value[0],logindata.value[1]);
      }
      
      break;
    case "ping":
      console.log(data.msg);
      break;
    case "Login":
      if(data.msg == "success"){
        if(user.loginstatus){
          user.toggleLoginStatus();
        }
        user.username = data.data.username;
        user.rid = data.data.rid;
        user.xp = data.data.xp;

      }else{
        layer.msg("帐号密码错误",{time: 1000});
      }
      break;
    case "Room":
      if(data.msg == "success"){
        room.rooms = data.data;
        common.refreshRoom()
        room.totalPages = Math.ceil(data.data.length / room.itemsPerPage);

      }else{
        common.setActiveTab('国服大厅');
        layer.msg(data.msg,{time: 1000});
      }
      break;
    case "ServerCore":
      if(data.msg == "success"){
        common.ServerCore = data.data;
      }
      break;
    case "ClientCore":
      if(data.msg == "success"){
        common.ClientCore = data.data;
      }
      break;
    case "Resource":
      if(data.msg == "success"){
        resource.plugins = data.data.plugins;
        resource.mods = data.data.mods;
      }
      break;
    default:
      break;
  }
}




const room = useRoomStore();
const user = useUserStore();
const common = useCommonStore();
const resource = useResourceStore();

onMounted(() => {
  axios.get("/config.json").then(response => {
    useCommonStore().ws = response.data.ws;

    common.connectWebsocket()
    if(common.websocket) {
      common.startHeartbeat();

      common.websocket.onmessage = messages
    }
  })
})

// 翻页函数
function nextPage() {
  if (room.currentPage < room.totalPages) {
    room.currentPage++;
  }
}

function prevPage() {
  if (room.currentPage > 1) {
    room.currentPage--;
  }
}

window.addEventListener('beforeunload', () => {
  // Call the setActiveTab function with '国服大厅' as the argument
  if(common.activeTab === "我的游戏"){
    LeavePlayer(room.rid);
  }
})

</script>

<style>

.lianjixia {
  background-color: #40372e;
}

.layui-layer-msg {
  margin-top: -180px;
}

.pagination-controls button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}


.box {
  width: 1030px;
  height: 615px;
  position: fixed;
  background-color: #4d433a;
}

.center {
  display: flex;
  justify-content: center;
}

.title {
  width: 100%;
  height: 10%;
  display: flex;
}

.itembox {
  display: flex;
  flex-direction: column; /* 保持这个设置以确保内容和分页控制器按列排列 */
  flex-wrap: nowrap; /* 不需要子项换行 */
  justify-content: space-between;
  background-color: #40372e;
  border: 100px;
  height: auto; /* 调整高度为自动，以适应内容 */
  margin: 70px 10px 10px;
  min-height: 500px; /* 设置最小高度 */
  max-height: 500px;
}

.pagination-controls {
  width: 100%; /* 使用100%宽度以填满容器 */
  display: flex;
  justify-content: center; /* 居中按钮 */
  padding: 10px 0; /* 添加一些内边距 */
}

.pagination-controls button {
  padding: 5px 10px;
  margin: 0 5px;
  background-color: #4d433a;
  color: #d8d7d5;
  border: none;
  cursor: pointer;
}

.pagination-controls span {
  color: #d8d7d5;
  margin-top: 3px;
}

.pagination-controls button:hover {
  background-color: #40372e;
}

.footer {
  display: flex;
  margin-top: -10px;
  margin-left: 10px;
  font-size: 10px;
}
.tab {
  position: absolute;
  display: flex;
  margin-top: 30px;
  margin-left: 10px;
}
.tab .item {
  width: 100px;
  height: 40px;
  text-align: center;
  color: #d8d7d5;
  background-color: #4d433a;
  display: flex; /* 新增 */
  align-items: center; /* 新增 */
  justify-content: center; /* 确保水平居中 */
  transition: background-color 0.3s ease;
}
.active {
  border-top: solid 2px #ea5c3e;
  color: #ea5c3e !important;
  background-color: #40372e !important;
}

p {
  color: #e4e2e2;
}
img {
  width: 100%;
  height: 100%;
}
ul li {
  list-style: none;
}
* {
  user-select: none;
}
</style>
