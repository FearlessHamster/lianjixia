import axios from "axios";
import md5 from "js-md5";
import { useRoomStore } from "@/stores/Rooms";
import { useUserStore } from "@/stores/User";
import * as Base64 from "js-base64";


//登录
export async function Login(username: string, password: string) {
    let user = useUserStore();
    const {data} = await axios.post("https://api.lianjixia.run/LoginService.php", {
        username: username,
        password: md5.md5(password)
    }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    console.log(data);
    
    if(data.code == 200) {
        console.log(data);
        user.toggleLoginStatus();
        user.username = data.username;
        user.rid = data.rid;
        user.xp = data.xp;
        localStorage.setItem('userinfo', Base64.encode(JSON.stringify({username: username, rid: data.rid, xp: data.xp})));
        
        return true;
    }else{
        return false;
    }
    
}

export async function Register(username: string, password: string) {
    let user = useUserStore();
    const {data} = await axios.post("https://api.lianjixia.run/RegisterService.php", {
        username: username,
        password: md5.md5(password)
    }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    if(data.code == 200) {
        user.toggleLoginStatus();
        localStorage.setItem('token', data.token);
        return true;
    }else{
        return false;
    }
}

export async function getRooms() {
    let room = useRoomStore();
    try {
        const response = await axios.get('https://api.lianjixia.run/getRooms.php');
        room.rooms = response.data; // Assuming this is an array
        room.totalPages = Math.ceil(room.rooms.length / 18);
      } catch (error) {
        console.error('There was an error fetching the data:', error);
        room.changeName([]); // Ensure apiData is always an array, even on error
      }
}
