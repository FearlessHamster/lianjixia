<template>
  <div>
    <el-dialog v-model="addPlugins" title="添加插件" :width="500">
      <el-alert title="双击对应插件即可安装插件" type="info" />
      <div style="display: flex;margin-top: 5px;">
        <el-input v-model="pluginName" placeholder="插件名称" />
      </div>
      <el-table :data="filteredPlugins" style="margin-top: 5px;" @row-dblclick="addPlugin">
        <el-table-column label="插件" prop="name" />
      </el-table>
    </el-dialog>
    <el-button @click="addPlugins = true">
      添加插件
    </el-button>
    <div style="margin-left: 5px;margin-top: 5px;">
      <el-table :data="common.item.plugins" @row-dblclick="delPlugin" :max-height="385" :height="385" :key="itemKey">
        <el-table-column label="插件" prop="name" :width="780" />
      </el-table>
    </div>

  </div>

</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import {useCommonStore} from "@/stores/Common";
import {useResourceStore} from "@/stores/Resources";
import { layer } from '@layui/layer-vue';
const addPlugins = ref(false);
const itemKey = ref(Math.random());
const pluginName = ref('');
const common = useCommonStore();
const resource = useResourceStore();

const filteredPlugins = computed(() => {
  return resource.plugins.filter(plugin =>
      plugin.name.toLowerCase().includes(pluginName.value.toLowerCase()) &&
      plugin.version.includes(common.item.ServerCore.version)
  );
});

const addPlugin = (row: any) => {
  if(common.item.plugins.filter(plugin =>
  plugin.name === row.name).length === 0){
    common.sendWebsocket('addPlugin', {
    rid: common.item.rid,
    plugin: row
  })
  layer.msg(row.name+" 添加成功", {time: 1000})
  }else{
    layer.msg("插件已存在", {time: 1000})
  }
};

const delPlugin = (row: any) => {
  if(common.item.plugins.filter(plugin =>
    plugin.name === row.name).length > 0){
    common.sendWebsocket('delPlugin', {
    rid: common.item.rid,
    plugin: row
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