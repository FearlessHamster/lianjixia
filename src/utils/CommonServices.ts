import { useUserStore } from "@/stores/User";
import { useCommonStore } from "@/stores/Common";
import { layer } from "@layui/layer-vue";


//登录
export async function Login(username: string, password: string) {
    if(username == "" || password == ""){
        layer.msg("用户名或密码不能为空");
        return;
    }
    let common = useCommonStore();
    common.sendWebsocket("login " + username + " " + password)
    
}

export async function Register(username: string, password: string) {
    if(username == "" || password == ""){
        layer.msg("用户名或密码不能为空");
        return;
    }
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
    if(user.rid == -1){
        user.toggleLoginStatus();
        return;
    }
    common.sendWebsocket("join " + rid + " " + user.username)
}

export async function LeavePlayer(rid:number) {
    let common = useCommonStore();
    let user = useUserStore();
    common.sendWebsocket("leave " + rid + " " + user.username)
}