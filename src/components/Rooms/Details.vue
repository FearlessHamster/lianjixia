<template>
  <div class="itembox2" >
    <div class="itembox3" v-if="common.item">
      <div style="width: 130px !important;" class="item-container">
        <template v-if="common.item.vipLevel == 1">
          <img
              src="@/assets/vip1.png"
              :alt="`VIP {{ item.vipLevel }}`"
              class="vip-icon"
              draggable="false"
          />
        </template>
        <template v-if="common.item.vipLevel == 2">
          <img
              src="@/assets/vip2.png"
              :alt="`VIP {{ item.vipLevel }}`"
              class="vip-icon"
              draggable="false"
          />
        </template>
        <template v-if="common.item.vipLevel == 3">
          <img
              src="@/assets/vip3.png"
              :alt="`VIP {{ item.vipLevel }}`"
              class="vip-icon"
              draggable="false"
          />
        </template>

        <template v-if="common.item.vipLevel == 100">

          <img
              src="@/assets/vip100.gif"
              :alt="`VIP {{ item.vipLevel }}`"
              class="vip-icon"
              draggable="false"
              style="animation: spin 2s infinite linear;width: 32px;height: 32px;margin-left: 98px"
          />
          <p class="vip-icon" style="width: 32px;height: 32px;margin-left: 105px;margin-top: 5px;color: #1e9fff;font-size: 10px">VIP
            100</p>

        </template>
        <img
            style="width: 130px; height: 130px"
            :src="common.item.img"
            draggable="false"
        />
        <div
            class="item_title"
            style="margin-top: 6px; background-color: rgba(77, 67, 58, 0)"
        >
          {{ common.item.title }}
        </div>
      </div>
      <div class="pagination-controls" style="margin-top: 30px;margin-left: -5px; display: grid;width: 130px; height: 124px;">
        <el-dialog class="lianjixia" v-model="info" title="修改信息" width="300" draggable>
          <el-form ref="formRef" :model="formInfo" label-width="auto">
            <el-form-item label="标题" prop="title">
              <el-input v-model="formInfo.title" :placeholder="room.rooms[user.rid].title" />
            </el-form-item>
            <el-form-item label="介绍" prop="dec">
              <el-input v-model="formInfo.dec" :rows="5" type="textarea" :placeholder="room.rooms[user.rid].dec" />
            </el-form-item>
            <el-form-item label="服务器核心" prop="ServerCore">
              <el-select v-model="formInfo.ServerCore" placeholder="请选择">
                <el-option v-for="item in common.ServerCore"
                           :key="item.name"
                           :label="item.name"
                           :value="item.name +'|'+item.version" />
              </el-select>
            </el-form-item>
            <el-form-item label="客户端核心" prop="ClientCore">
              <el-select v-model="formInfo.ClientCore" placeholder="请选择">
                <el-option v-for="item in clientCoreOptions"
                           :key="item.name"
                           :label="item.name"
                           :value="item.name +'|'+item.version" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="changeInfo">
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

    <div class="info" v-if="common.item">
      <div class="dec">
        介绍：
        <br />
        {{ truncatedDec }}
      </div>
      <br>
      <div class="server">
        服务器核心：
        <br />
        {{ common.item.ServerCore.name }}
      </div>
      <br>
      <div class="client">
        客户端核心：
        <br />
        {{ common.item.ClientCore.name }}
      </div>
      <br>
      <div style="display: flex;">
        <div class="plugins" style="margin-right: 200px;">
          包含插件{{common.item.plugins.length}}个：
          <div class="plugin" v-for="plugin in common.item.plugins">
            {{ plugin.name }}
          </div>
        </div>
        <br>
        <div class="mods">
          包含模组{{common.item.mods.length}}个：
          <div v-for="mod in common.item.mods">{{ mod.name }}</div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">

import {computed, ref, watch} from "vue";
import {useRoomStore} from "@/stores/Rooms";
import {useUserStore} from "@/stores/User";
import {useCommonStore} from "@/stores/Common";
import {layer} from "@layui/layer-vue";


const room = useRoomStore();
const user = useUserStore();
const common = useCommonStore();

const info = ref(false);
const img = ref(false);
const formInfo = ref({
  title: "",
  dec: "",
  ServerCore: "",
  ClientCore: ""
})
const imageUrl = ref<string | null>(null);
const clientCoreOptions = ref(common.ClientCore.filter(item => item.version === formInfo.value.ServerCore));

const truncatedDec = computed(() => {
  if (common.item && common.item.dec.length > 200) {
    return common.item.dec.substring(0, 200) + '...';
  }
  return common.item ? common.item.dec : '';
});

watch(() => formInfo.value.ServerCore, (newValue) =>{
  const serverCoreArray = newValue.split('|');
  clientCoreOptions.value = common.ClientCore.filter(item => item.version === serverCoreArray[1]);
})

const changeInfo = () => {
  if(
      formInfo.value.ServerCore.trim() == "" &&
      formInfo.value.ClientCore.trim() == "" &&
      formInfo.value.title.trim() == "" &&
      formInfo.value.dec.trim() == ""
  ){
    info.value = false;
    return;
  }
  if(formInfo.value.title == ""){
    formInfo.value.title = room.rooms[user.rid].title;
  }
  if(formInfo.value.dec == ""){
    formInfo.value.dec = room.rooms[user.rid].dec;
  }
  if(formInfo.value.ServerCore == ""){
    formInfo.value.ServerCore = room.rooms[user.rid].ServerCore.name + "|" + room.rooms[user.rid].ServerCore.version;
  }
  if(formInfo.value.ClientCore == ""){
    formInfo.value.ClientCore = room.rooms[user.rid].ClientCore.name + "|" + room.rooms[user.rid].ClientCore.version;
  }
  const serverCoreArray = formInfo.value.ServerCore.split('|');
  const clientCoreArray = formInfo.value.ClientCore.split('|');
  const data = {
    rid: user.rid,
    title: formInfo.value.title.trim() ?? room.rooms[user.rid].title,
    dec: formInfo.value.dec.trim() ?? room.rooms[user.rid].dec,
    ServerCore: {
      name: serverCoreArray[0],
      version: serverCoreArray[1]
    },
    ClientCore: {
      name: clientCoreArray[0],
      version: clientCoreArray[1]
    }
  }
  console.log(data);
  
  common.sendWebsocket("changeInfo",data)
  info.value = false;

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
    common.sendWebsocket("uploadImg",{
      rid: user.rid,
      img: imageUrl.value
    })
  }
}

common.refreshRoom();

watch(() => room.rooms, () => {
  common.refreshRoom();
}, {
  deep: true
});

</script>

<style scoped>
.info {
  margin-left: 160px;
  margin-top: -340px;
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



.itembox3 {
  margin-top: 80px;
  margin-left: 10px;
  width: 130px !important; /* 修正的宽度，添加了px单位 */
}

:deep(.el-form-item__label) {
  color: #d8d7d5;
}
</style>