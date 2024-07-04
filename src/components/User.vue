<template>
  <div class="user">
      <!-- 使用 v-if 和 v-else 来根据 user.username 是否有值来决定显示内容 -->
      <el-popover placement="bottom" trigger="hover">
        <el-button v-if="user.username" size="small" type="primary" @click="user.logout()">退出登录</el-button>
        <el-button v-if="!user.username" size="small" type="primary" @click="user.toggleLoginStatus">登录</el-button>
        <template #reference>
          <p style="font-size: 15px" >{{ user.username || '未登录' }}</p>
        </template>
      </el-popover>
      <!-- 当 user.username 有值时，显示等级 -->
      <div class="level" v-if="user.username != ''">
          <a style="color: #fff; font-size: 14px; width: 100%">LV0</a>
      </div>
      <div v-if="user.loginstatus" class="login-modal">
          <div @click.stop>
              <div>
                  <label for="username">用户名:</label>
                  <input type="text" id="username" v-model="username">
              </div>
              <div>
                  <label for="password"> 密 码 : </label>
                  <input type="password" id="password" v-model="password">
              </div>
              <div>
                <label for="captcha">验证码:</label>
                <input type="text" name="captcha" value="" autocomplete="off" class="captcha-input" lay-affix="clear" v-model="code">
                <div style="margin-left: 140px;margin-top: -33px">
                  <img style="width: 100px;border-radius: 4px;border: 1px solid #ccc" src="https://www.oschina.net/action/user/captcha" onclick="this.src='https://www.oschina.net/action/user/captcha?t='+ new Date().getTime();">
                </div>
              </div>
              <div>
                  <button type="submit" @click="func_login">登录</button>
                  <button type="submit" @click="func_register" style="background-color: #2ecc71;">注册</button>
                  <button type="button" @click="user.toggleLoginStatus">取消</button>
              </div>
          </div>
      </div>
  </div>
  
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/User';
import { provide, ref } from 'vue';
import { Login, Register } from '@/utils/CommonServices'
import { layer } from '@layui/layer-vue';


let user = useUserStore();
let username = ref('');
let password = ref('');
let code = ref('');



async function func_login() {
  if(code.value == ""){
    layer.msg("请输入验证码");
    return;
  }
  await Login(username.value, password.value)
    
}

async function func_register() {
  if(code.value == ""){
    layer.msg("请输入验证码");
    return;
  }
  await Register(username.value, password.value)
}



</script>

<style scoped>
.user {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: -65px;
  margin-right: 15px;
}

.level {
  border: 1px solid #d8d7d5;
  border-radius: 3px;
  background-color: #d8d7d5;
  height: 18px;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4px;
  margin-left: 5px;
  font-size: 14px;
  color: #fff;
}

.login-modal {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.95); /* 初始状态稍微缩小 */
  background-color: #4D433A;
  padding: 20px;
  border-radius: 3px;
  border: #bdc3c7 solid 1px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  z-index: 100;
  transition: transform 0.3s ease; /* 添加动画效果 */
}

/* 当登录状态为true时，应用正常大小的transform */
.login-modal-active {
  transform: translate(-50%, -50%) scale(1); /* 正常大小 */
}

.login-modal form {
  display: flex;
  flex-direction: column;
}

.login-modal label {
  margin-top: 10px;
}

.login-modal input[type="text"],
.login-modal input[type="password"] {
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-left: 9px;
}

.login-modal button[type="submit"],
.login-modal button[type="button"] {
  padding: 10px;
  margin-top: 20px;
  margin-right: 1px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #ea5c3e;
  color: #d8d7d5;
  width: 80px;
}

.login-modal button[type="button"] {
  background-color: #6c757d;
}

.login-modal button[type="submit"]:hover,
.login-modal button[type="button"]:hover {
  opacity: 0.9;
}

.login-modal div {
  margin-top: 10px;
}
.captcha-input {
  width: 60px;
}
</style>