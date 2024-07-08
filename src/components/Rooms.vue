<template>
    <ul class="tab" style="margin-top: 10px; width: 500px; min-width: 500px;">
            <li
              class="item"
              :class="{ active2: activeTab2 === '基本信息' }"
              @click="setActiveTab2('基本信息')"
            >
              基本信息
            </li>
            <li
              v-if="room.rid == user.rid"
              class="item"
              :class="{ active2: activeTab2 === '控制台' }"
              @click="setActiveTab2('控制台')"
            >
              控制台
            </li>
            <li
              v-if="room.rid == user.rid"
              class="item"
              :class="{ active2: activeTab2 === '设置' }"
              @click="setActiveTab2('设置')"
            >
              设置
            </li>
            <li
              v-if="room.rid == user.rid"
              class="item"
              :class="{ active2: activeTab2 === '插件' }"
              @click="setActiveTab2('插件')"
            >
              插件
            </li>
            <li
              v-if="room.rid == user.rid"
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
                <div style="width: 130px !important;" class="item-container">
                  <template v-if="item.viplevel == 1">
                    <img
                        src="@/assets/vip1.png"
                        :alt="`VIP {{ item.viplevel }}`"
                        class="vip-icon"
                        draggable="false"
                    />
                  </template>
                  <template v-if="item.viplevel == 2">
                    <img
                        src="@/assets/vip2.png"
                        :alt="`VIP {{ item.viplevel }}`"
                        class="vip-icon"
                        draggable="false"
                    />
                  </template>
                  <template v-if="item.viplevel == 3">
                    <img
                        src="@/assets/vip3.png"
                        :alt="`VIP {{ item.viplevel }}`"
                        class="vip-icon"
                        draggable="false"
                    />
                  </template>

                  <template v-if="item.viplevel == 100">

                    <img
                        src="@/assets/vip100.gif"
                        :alt="`VIP {{ item.viplevel }}`"
                        class="vip-icon"
                        draggable="false"
                        style="animation: spin 2s infinite linear;width: 32px;height: 32px;margin-left: 98px"
                    />
                    <p class="vip-icon" style="width: 32px;height: 32px;margin-left: 105px;margin-top: 5px;color: #1e9fff;font-size: 10px">VIP
                      100</p>

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
                <div class="pagination-controls" style="margin-top: 30px;margin-left: -5px; display: grid;width: 130px; height: 124px;">
                  <el-dialog class="lianjixia" v-model="info" title="修改信息" width="300" draggable>
                    <el-form ref="formRef" :model="forminfo" label-width="auto"> 
                        <el-form-item label="标题" prop="title">
                          <el-input v-model="forminfo.title" :placeholder="room.rooms[user.rid].title" />
                        </el-form-item>
                        <el-form-item label="介绍" prop="dec">
                          <el-input v-model="forminfo.dec" :rows="5" type="textarea" :placeholder="room.rooms[user.rid].dec" />
                        </el-form-item>
                        <el-form-item label="服务器核心" prop="servercore">
                          <el-select v-model="forminfo.servercore" placeholder="请选择">
                            <el-option v-for="item in common.servercore"
                            :key="item.name"
                            :label="item.name"
                            :value="item.name +'|'+item.version" />
                          </el-select>
                        </el-form-item>
                        <el-form-item label="客户端核心" prop="clientcore">
                          <el-select v-model="forminfo.clientcore" placeholder="请选择">
                            <el-option v-for="item in clientCoreOptions"
                            :key="item.name"
                            :label="item.name"
                            :value="item.name +'|'+item.version" />
                          </el-select>
                        </el-form-item>
                        <el-form-item>
                          <el-button type="primary" @click="ChangeInfo">
                            修改
                          </el-button>
                          <el-button type="primary" @click="info = false">
                            取消
                          </el-button>
                        </el-form-item>
                    </el-form>
                  </el-dialog>
                  <button v-if="room.rid == user.rid" @click="info = true" style="margin: 10px; width: 100px; height: 32px">
                    修改游戏
                  </button>
                  
                  <el-dialog v-model="img" title="修改背景">
                    <div>
                      <img style="width: 130px;height: 130px" v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" />
                      <input type="file" @change="onFileChange" accept="image/*" />
                      <input type="button" value="开始上传" @click="upload">
                    </div>
                  </el-dialog>

                  <button v-if="room.rid == user.rid" @click="img = true" style="margin: 10px; width: 100px; height: 32px">
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
            <div v-if="activeTab2 === '控制台'" style="display: grid;">
              <pre ref="consoleRef" class="console" style="margin-top: 60px;width: 850px;height: 380px;overflow-x: hidden;">
                <code class="language-log line-numbers" v-for="line in consoles" :key="line">{{ "\n"+line }}</code>
              </pre>
              <div class="pagination-controls" style="display: flex;">
                <el-input placeholder="command..." v-model="input" value="" /><el-button>发送</el-button>
              </div>
            </div>
            
          </div>
</template>

<script setup lang="ts">
import { watch, ref, computed, onMounted, onUpdated } from "vue";
import { useRoomStore } from "@/stores/Rooms";
import { useUserStore } from "@/stores/User";
import { useCommonStore } from "@/stores/Common";
import { layer } from "@layui/layer-vue";

import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.min.css"

const consoles = ref([
'[10:51:13] [ServerMain/INFO]: Environment: Environment[sessionHost=https://sessionserver.mojang.com, servicesHost=https://api.minecraftservices.com, name=PROD]',
'[10:51:13] [ServerMain/INFO]: Found new data pack file/bukkit, loading it automatically',
'[10:51:13] [ServerMain/INFO]: Found new data pack paper, loading it automatically',
'[10:51:14] [ServerMain/INFO]: No existing world data, creating new world',
'[10:51:15] [ServerMain/INFO]: Loaded 1290 recipes',
'[10:51:15] [ServerMain/INFO]: Loaded 1399 advancements',
'[10:51:16] [Server thread/INFO]: Starting minecraft server version 1.21',
'[10:51:16] [Server thread/INFO]: Loading properties',
'[10:51:16] [Server thread/INFO]: This server is running Leaves version 1.21-7-master@5aa1100 (2024-07-07T16:25:33Z) (Implementing API version 1.21-R0.1-SNAPSHOT)',
'[10:51:17] [Server thread/ERROR]: [Leaves] Failed to collect shearable blocks',
'[10:51:17] [Server thread/INFO]: Using 4 threads for Netty based IO',
'[10:51:17] [Server thread/INFO]: Server Ping Player Sample Count: 12',
'[10:51:17] [Server thread/INFO]: [ChunkTaskScheduler] Chunk system is using 1 I/O threads, 4 worker threads, and population gen parallelism of 4 threads',
'[10:51:18] [Server thread/INFO]: Default game type: SURVIVAL',
'[10:51:18] [Server thread/INFO]: Generating keypair',
'[10:51:18] [Server thread/INFO]: Starting Minecraft server on *:25565',
'[10:51:18] [Server thread/INFO]: Using default channel type',
'[10:51:18] [Server thread/INFO]: Paper: Using Java compression from Velocity.',
'[10:51:18] [Server thread/INFO]: Paper: Using Java cipher from Velocity.',
'[10:51:18] [Server thread/INFO]: Preparing level "world"',
'[10:51:24] [Server thread/INFO]: Preparing start region for dimension minecraft:overworld',
'[10:51:26] [Server thread/INFO]: Time elapsed: 2667 ms',
'[10:51:26] [Server thread/INFO]: Preparing start region for dimension minecraft:the_nether',
'[10:51:27] [Server thread/INFO]: Time elapsed: 683 ms',
'[10:51:27] [Server thread/INFO]: Preparing start region for dimension minecraft:the_end',
'[10:51:27] [Server thread/INFO]: Time elapsed: 262 ms',
'[10:51:28] [Server thread/INFO]: Running delayed init tasks',
'[10:51:28] [Server thread/INFO]: Done (11.568s)! For help, type "help"',
]);

const room = useRoomStore();
const user = useUserStore();
const common = useCommonStore();

const activeTab2 = ref("基本信息"); // 默认激活的项
const input = ref([]); 

const info = ref(false);
const img = ref(false);
const forminfo = ref({
  title: "",
  dec: "",
  servercore: "",
  clientcore: ""
})
const imageUrl = ref<string | null>(null);
const clientCoreOptions = ref(common.clientcore.filter(item => item.version === forminfo.value.servercore));

watch(() => forminfo.value.servercore, (newValue) =>{
  const serverCoreArray = newValue.split('|');
  clientCoreOptions.value = common.clientcore.filter(item => item.version === serverCoreArray[1]);
})

const consoleRef = ref<HTMLElement | null>(null);

onMounted(() => {
  Prism.highlightAll();
  if (consoleRef.value) {
    consoleRef.value.scrollTop = consoleRef.value.scrollHeight;
  }
});

onUpdated(() => {
  Prism.highlightAll();
  if (consoleRef.value) {
    consoleRef.value.scrollTop = consoleRef.value.scrollHeight;
  }
});

const ChangeInfo = () => {
  if(
    forminfo.value.servercore.trim() == "" && 
    forminfo.value.clientcore.trim() == "" && 
    forminfo.value.title.trim() == "" &&
    forminfo.value.dec.trim() == ""
  ){
    info.value = false;
    return;
  }
    if(forminfo.value.title == ""){
      forminfo.value.title = room.rooms[user.rid].title;
    }
    if(forminfo.value.dec == ""){
      forminfo.value.dec = room.rooms[user.rid].dec;
    }
    if(forminfo.value.servercore == ""){
      forminfo.value.servercore = room.rooms[user.rid].servercore;
    }
    if(forminfo.value.clientcore == ""){
      forminfo.value.clientcore = room.rooms[user.rid].clientcore;
    }
    const serverCoreArray = forminfo.value.servercore.split('|');
    const clientCoreArray = forminfo.value.clientcore.split('|');
    const data = {
      rid: user.rid,
      title: forminfo.value.title.trim() ?? room.rooms[user.rid].title,
      dec: forminfo.value.dec.trim() ?? room.rooms[user.rid].dec,
      servercore: serverCoreArray[0] ?? room.rooms[user.rid].servercore,
      clientcore: clientCoreArray[0] ?? room.rooms[user.rid].clientcore
    }
    common.sendWebsocket("changeinfo",data)
    info.value = false;
  
}

let item = ref<any>();

watch(() => room.rooms, (newVal) => {
  for (let i = 0; i < room.rooms.length; i++) {
    if (room.rooms[i].rid == room.rid) {
      
      
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
  common.setActiveTab('国服大厅');
}

const onFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const upload = () => {
if(imageUrl.value){
  img.value = false;
  if(imageUrl.value.length > 300*1024){
    layer.msg("超出最大图片限制(300kb)限制",{time: 1000})
    return
  }
  common.sendWebsocket("uploadimg",{
    rid: user.rid,
    img: imageUrl.value
  })
}
}

</script>

<style scoped>

:deep(.el-form-item__label) {
  color: #d8d7d5;
}

.info {
  margin-left: 160px;
  margin-top: -290px;
  color: #d8d7d5;
  width: 500px;
  height: 500px;
  font-size: 15px;
}


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

.itembox3 {
  margin-top: 80px;
  margin-left: 10px;
  width: 130px !important; /* 修正的宽度，添加了px单位 */
}

.game {
  width: 200px;
  height: 500px;
  border-radius: 50%;
  margin-left: 680px;
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
