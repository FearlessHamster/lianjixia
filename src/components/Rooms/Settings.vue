<template>
  <div class="settings-box" style="">
    <div style="display: grid;">
      <el-button>
        设置
      </el-button>
      <el-button>
        文件管理
      </el-button>
      <el-button>
        删除地图
      </el-button>
      <el-button>
        清除数据
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
:deep(.el-button){
  max-width: 200px;
  min-width: 200px;
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

.settings-box {
  display: flex;
  margin: auto;
  justify-content: center;
  height: 200px;
  width: 300px;
}
</style>