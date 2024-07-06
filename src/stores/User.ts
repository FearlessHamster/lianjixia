import { defineStore } from "pinia";
import { LeavePlayer } from "@/utils/CommonServices";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            username: "",
            rid: -1,
            xp: 0,
            room: 0,
            loginstatus: false
        }
    },
    actions: {
        toggleLoginStatus() {
            if(!this.username){
                this.loginstatus = !this.loginstatus;
            }
        },
        setUserinfo(userinfo: any) {
            if(userinfo){
                this.username = userinfo.username;
                this.rid = userinfo.rid;
                this.xp = userinfo.xp;
            }
        },
        async logout() {
            console.log(localStorage.getItem('index'))
            await LeavePlayer(Number(localStorage.getItem("index")));
            this.username = "";
            this.rid = -1;
            this.xp = 0;
            this.room = 0;
            this.loginstatus = false;
            localStorage.removeItem('userinfo');
            location.reload();
        }
    }
})