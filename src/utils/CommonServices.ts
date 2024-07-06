import axios from "axios";
import md5 from "js-md5";
import { useRoomStore } from "@/stores/Rooms";
import { useUserStore } from "@/stores/User";
import * as Base64 from "js-base64";
import { layer } from "@layui/layui-vue"
import { useCommonStore } from "@/stores/Common";


//登录
export async function Login(username: string, password: string) {
    let common = useCommonStore();
    common.sendWebsocket("login " + username + " " + password)
    
}

export async function Register(username: string, password: string) {
    let common = useCommonStore();
    common.sendWebsocket("register " + username + " " + password)
}

export async function getRooms() {
    let common = useCommonStore();
    common.sendWebsocket("getroom")
}

export function AddPlayer(rid:number) {
    let common = useCommonStore();
    let user = useUserStore();
    common.sendWebsocket("join " + rid + " " + user.username)
}

export async function LeavePlayer(rid:number) {
    let common = useCommonStore();
    let user = useUserStore();
    common.sendWebsocket("leave " + rid + " " + user.username)
}