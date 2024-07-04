import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            username: "",
            rid: 0,
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
        logout() {
            this.username = "";
            this.rid = 0;
            this.xp = 0;
            this.room = 0;
            this.loginstatus = false;
            localStorage.removeItem('userinfo');
        }
    }
})