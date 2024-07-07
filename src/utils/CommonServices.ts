import { useUserStore } from "@/stores/User";
import { useCommonStore } from "@/stores/Common";
import { layer } from "@layui/layer-vue";
import { Base64 } from "js-base64";


//登录
export async function Login(username: string, password: string) {
    const user = useUserStore();
    if (typeof username !== 'string' || typeof password !== 'string') {
        layer.msg("用户名或密码不能为空");
        return;
    }
    if(username.trim() == "" || password.trim() == ""){
        layer.msg("用户名或密码不能为空");
        return;
    }
    let common = useCommonStore();
    common.sendWebsocket("login",{
        username: username,
        password: password
    });
    localStorage.setItem("token", Base64.encode(username + " " + password));
}

export async function Register(username: string, password: string) {
    if (typeof username !== 'string' || typeof password !== 'string') {
        layer.msg("用户名或密码不能为空");
        return;
    }
    if(username == "" || password == ""){
        layer.msg("用户名或密码不能为空");
        return;
    }
    let common = useCommonStore();
    common.sendWebsocket("register",{
        username: username,
        password: password
    });
}

export async function getRooms() {
    let common = useCommonStore();
    common.sendWebsocket("getroom",{});
}

export function AddPlayer(rid:number) {
    let common = useCommonStore();
    let user = useUserStore();
    if(user.rid == -1){
        user.toggleLoginStatus();
        return;
    }
    common.sendWebsocket("join",{
        rid: rid,
        username: user.username
    })
}

export async function LeavePlayer(rid:number) {
    let common = useCommonStore();
    let user = useUserStore();
    common.sendWebsocket("leave",{
        rid: rid,
        username: user.username
    })
}