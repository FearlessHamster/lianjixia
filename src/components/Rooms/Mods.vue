<template>
  <div>
    <el-dialog v-model="addMods" title="添加模组" :width="500">
      <el-alert title="双击对应插件即可安装模组" type="info" />
      <div style="display: flex;margin-top: 5px;">
        <el-input v-model="modName" placeholder="模组名称" />
      </div>
      <el-table :data="filteredMods" style="margin-top: 5px;" @row-dblclick="addMod">
        <el-table-column label="模组" prop="name" />
      </el-table>
    </el-dialog>
    <el-button @click="addMods = true">
      添加模组
    </el-button>
    <div style="margin-left: 5px;margin-top: 5px">
      <el-table :data="common.item.mods" @row-dblclick="delMod" :max-height="385" :height="385" :key="itemKey">
        <el-table-column label="模组" prop="name" :width="780" />
      </el-table>
    </div>

  </div>

</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import {useCommonStore} from "@/stores/Common";
import {useResourceStore} from "@/stores/Resources";
import { layer } from '@layui/layer-vue';
const addMods = ref(false);
const itemKey = ref(Math.random());
const modName = ref('');
const common = useCommonStore();
const resource = useResourceStore();

const filteredMods = computed(() => {
  return resource.mods.filter(mod =>
      mod.name.toLowerCase().includes(modName.value.toLowerCase()) &&
      mod.version.includes(common.item.ServerCore.version)
  );
});

const addMod = (row: any) => {
  if(common.item.mods.filter(mod =>
  mod.name === row.name).length === 0){
    common.sendWebsocket('addMod', {
    rid: common.item.rid,
    mod: row
  })
  layer.msg(row.name+" 添加成功", {time: 1000})
  }else{
    layer.msg("插件已存在", {time: 1000})
  }
};

const delMod = (row: any) => {
  if(common.item.mods.filter(mod =>
    mod.name === row.name).length > 0){
    common.sendWebsocket('delMod', {
    rid: common.item.rid,
    mod: row
    })
    layer.msg(row.name+" 删除成功", {time: 1000})
  }else{
    layer.msg("插件不存在", {time: 1000})
  }
}
</script>

<style scoped>

:deep(.el-input){
  --el-input-bg-color: #4d433a;
  --el-input-border-color: #40372e;
}
:deep(.el-table){
  background-color: #40372e;
  --el-table-header-text-color: #d8d7d5;
  --el-table-border-color: #4d433a;
  --el-table-header-bg-color: #4d433a;
  --el-table-text-color: #d8d7d5;
}
:deep(.el-dialog){
  background-color: #40372e;
}
:deep(.el-table){
  --el-table-tr-bg-color: #4d433a;
  --el-table-row-hover-bg-color: #40372e;
}
:deep(.el-dialog__title){
  color: #d8d7d5;
}
:deep(.el-dialog__headerbtn .el-dialog__close){
  color: #d8d7d5;
}
:deep(.el-button){
  width: 150px;
  height: 40px;
  border-radius: 0px;
}
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