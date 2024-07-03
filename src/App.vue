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
          :class="{ active: activeTab === '国服大厅' }"
          @click="setActiveTab('国服大厅')"
        >
          国服大厅
        </li>
        <li
          class="item"
          :class="{ active: activeTab === '我的游戏' }"
          @click="setActiveTab('我的游戏')"
        >
          {{tabTitle}}
        </li>
      </ul>

      <div class="itembox">
        <!-- 使用.items-container来包裹.item元素 -->
          <Items v-if="activeTab === '国服大厅'" />
          
          <Rooms v-if="activeTab === '我的游戏'" />
        <!-- 分页控制 -->
        <div class="pagination-controls" v-if="activeTab === '国服大厅' && room.totalPages!=0">
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
import { ref, computed, provide, onMounted, inject } from "vue";
import Title from "@/components/icons/TitleIcon.vue";
import Rooms from "@/components/Rooms.vue";
import Items from "@/components/Items.vue";
import User from "@/components/User.vue";
import { Base64 } from 'js-base64';

import { useRoomStore } from "@/stores/Rooms";
import { useUserStore } from "./stores/User";

const room = useRoomStore();
let user = useUserStore();


let userinfo = JSON.parse(Base64.decode(localStorage.getItem('userinfo') ?? "")) ?? [];
user.setUserinfo(userinfo);


var tabTitle = ref('我的游戏');

provide('tabTitle',tabTitle)

var activeTab = ref("国服大厅"); // 默认激活的项

var setActiveTab = function(tabName: string) {
  // 如果尝试切换到“我的游戏”且用户名为空，则不执行任何操作
  if(tabName === "我的游戏" && user.username == "") {
    // 可以在这里添加一个提示，例如使用alert或者一个自定义的提示组件
    console.log(user.username);
    
    user.toggleLoginStatus();
    return; // 直接返回，不切换标签
  }

  if(tabName !== activeTab.value) {
    if(tabName == "国服大厅") {
      tabTitle.value = "我的游戏";
      localStorage.setItem("index",user.rid.toString());
    }
  }
  activeTab.value = tabName;
};

provide('setActiveTab',setActiveTab)

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

</script>

<style>


.pagination-controls button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.info {
  margin-left: 160px;
  margin-top: -290px;
  color: #d8d7d5;
  width: 500px;
  height: 500px;
  font-size: 15px;
}

.box {
  width: 54%;
  height: 64%;
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
  margin: 50px 10px 10px;
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
  margin-top: 10px;
  margin-left: -30px;
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
