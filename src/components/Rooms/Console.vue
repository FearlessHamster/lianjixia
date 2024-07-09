
<template>
  <div style="display: grid;margin-left: 10px;margin-top: auto;margin-bottom: 20px;justify-content: flex-end;height: 430px;width: 780px">
    <div style="display: flex;">
      <el-button-group>
        <el-button disabled="disabled">
          启动服务器
        </el-button>
        <el-button style="margin-left: 5px;">
          停止服务器
        </el-button>
      </el-button-group>
      <p style="margin-left: 5px;margin-top: 5px;">服务器正在运行</p>
    </div>

    <pre ref="consoleRef" class="console" style="overflow-x: hidden;">
      <code class="language-log line-numbers" v-for="line in consoles" :key="line">{{ "\n"+line }}</code>
    </pre>
    <div style="display: flex;">
      <el-input placeholder="command..." v-model="input" value="" /><el-button>发送</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, onUpdated, ref} from "vue";
import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.min.css"

const input = ref([]);
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

</script>


<style scoped>
:deep(.el-button){
  padding: 5px 10px;
  margin: 0 5px;
  background-color: #4d433a;
  color: #d8d7d5;
  border: none;
  cursor: pointer;
}
:deep(.el-button:hover){
  background-color: #40372e;
}
</style>