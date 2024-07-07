
<template>
    <div class="avatar-upload">
      <label for="avatar-upload-input">
        <img :src="form.formObj.user_pic ? form.formObj.user_pic : '../../../public/default.jpg'" id="avatar-preview" alt="Avatar preview">
        <p style="margin-bottom: 15px;">头像上传</p>
      </label>
      <input type="file" @change="updataAvatar" id="avatar-upload-input" style="display: none;">
  </div>
</template>
   
  <script setup>
  import { updataAvatarApi, userinfoApi,updataUserInfo } from '../../utils/api'
  import { Message } from 'view-ui-plus'
  import { onMounted, reactive, ref } from 'vue'
  let form = reactive({
    formObj: {
      username: '',
      nickname: '',
      email: '',
      user_pic: '',
      id: ''
    }
  })
  onMounted(() => {
    getUserInfo()
  })
  // 头像上传
  const updataAvatar = (event) => {
    // 获取文件
    let file = event.target.files[0]
    // 图片base64
    const reader = new FileReader();
    if(file) {
      reader.onload = (e) => {
        // e.target.result 就是转化成base64的图片地址 传给后端
        console.log(e.target.result);
        updataAvatarApi({ avatar: e.target.result }).then(res => {
          if(res.code === 0) {
            Message.success(res.message)
            // 重新获取用户信息
            getUserInfo()
          } else {
            Message.success(res.message)
          }
        })
      };
    }
    // 读取文件
    reader.readAsDataURL(file);
  }
  // 用户信息
  const getUserInfo = () => {
    userinfoApi().then(res => {
      if(res.code === 0) {
        form.formObj = res.data
      } else {
        Message.error(res.message)
      }
    }).catch(err => console.log(err))
  }
  </script>
   
  <style>
  .avatar-upload {
    position: relative;
    width: 400px; /* 设置头像的宽度 */
    min-height: 300px; /* 设置头像的高度 */
    padding: 20px 0;
  }
   
  #avatar-preview {
    width: 100%;
    height: auto; /* 保持头像的宽高比 */
    display: block;
    width: 50px;
    height: 50px; 
    border-radius: 50%;
    margin-bottom: 15px; 
    border: 1px solid #ccc;
  }
   
  #avatar-upload-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    opacity: 0; /* 使输入框透明，点击时触发选择文件 */
  }
   
  /* 可以添加一些装饰和动效，使其更加好看 */
  </style>