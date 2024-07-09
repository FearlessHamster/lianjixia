<template>
    <ul class="tab" style="margin-top: 10px; width: 500px; min-width: 500px;">
        <li
          class="item"
          :class="{ active2: common.activeTab2 === '基本信息' }"
          @click="common.setActiveTab2('基本信息')"
        >
          基本信息
        </li>
        <li
          v-if="room.rid == user.rid"
          class="item"
          :class="{ active2: common.activeTab2 === '控制台' }"
          @click="common.setActiveTab2('控制台')"
        >
          控制台
        </li>
        <li
          v-if="room.rid == user.rid"
          class="item"
          :class="{ active2: common.activeTab2 === '设置' }"
          @click="common.setActiveTab2('设置')"
        >
          设置
        </li>
        <li
          v-if="room.rid == user.rid"
          class="item"
          :class="{ active2: common.activeTab2 === '插件' }"
          @click="common.setActiveTab2('插件')"
        >
          插件
        </li>
        <li
          v-if="room.rid == user.rid"
          class="item"
          :class="{ active2: common.activeTab2 === '模组' }"
          @click="common.setActiveTab2('模组')"
        >
          模组
        </li>
      </ul>
      <div class="main-container">
        <Details v-if="common.activeTab2 === '基本信息'" />
        <Console v-if="common.activeTab2 === '控制台'" />
        <Settings v-if="common.activeTab2 === '设置'" />

        <Game />
      </div>
</template>

<script setup lang="ts">
import { useRoomStore } from "@/stores/Rooms";
import { useUserStore } from "@/stores/User";
import { useCommonStore } from "@/stores/Common";
import Console from "./Rooms/Console.vue";
import Details from "./Rooms/Details.vue";
import Settings from "./Rooms/Settings.vue";
import Game from "./Rooms/Game.vue"

const room = useRoomStore();
const user = useUserStore();
const common = useCommonStore();



common.refreshRoom()

</script>

<style scoped>

.active2 {
  border-bottom: solid 2px #ea5c3e;
  color: #ea5c3e !important;
}
.main-container {
  display: inline-flex;
}
</style>
