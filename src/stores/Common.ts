import { defineStore } from "pinia";
import { useUserStore } from "./User";
import { useRoomStore } from "./Rooms";
import { LeavePlayer } from "@/utils/CommonServices";
import { ref } from "vue";


export const useCommonStore = defineStore('common', {
    state: () => {
        return {
            ws: "",
            websocket: null as WebSocket | null,
            heartbeatInterval: 0,
            ServerCore: [{
                name: "",
                version: ""
            }],
            ClientCore: [{
                name: "",
                version: ""
            }],
            activeTab: ref("国服大厅"),
            tabTitle: ref('我的游戏'),
            activeTab2: ref("基本信息"),
            item: {
                rid: 0,
                title: "",
                img: "",
                dec: "",
                ServerCore: {
                    name: "",
                    version: "",
                },
                ClientCore: {
                    name: "",
                    version: "",
                },
                players: [],
                maxPlayers: 0,
                vipLevel: 0,
                plugins: [
                    {
                        name: "",
                        version: [
                            ""
                        ]
                    }
                ],
                mods: [
                    {
                        name: "",
                        version: [
                            ""
                        ]
                    }
                ]
              }
        }
    },
    actions: {
        connectWebsocket() {
            this.websocket = new WebSocket(this.ws);
        },
        disconnectWebsocket() {
            if (this.websocket) { // Check if websocket is not null before closing it
                this.websocket.close();
            }
        },
        sendWebsocket(type: string, data: any) {
            if (this.websocket) {
                this.websocket.send(JSON.stringify({
                    type: type,
                    data: data
                }));
            }
        },
        startHeartbeat() {
            this.heartbeatInterval = setInterval(() => {
              if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
                this.sendWebsocket("ping",{}); // 发送心跳消息
              }
            }, 10000); // 每10秒发送一次心跳
        },
        stopHeartbeat() {
            if (this.heartbeatInterval) {
                clearInterval(this.heartbeatInterval); // 停止心跳检测定时器
            }
        },
        setActiveTab(tabName: string) {
            const user = useUserStore();
            const room = useRoomStore();
            if(tabName === "我的游戏" && user.username == "") {
              // 可以在这里添加一个提示，例如使用alert或者一个自定义的提示组件
              user.toggleLoginStatus();
              return; // 直接返回，不切换标签
            }
          
            if(tabName !== this.activeTab) {
              if(tabName == "国服大厅") {
                this.tabTitle = "我的游戏";
                
                LeavePlayer(room.rid);
                room.rid = user.rid
              }
            }
            this.activeTab = tabName;
        },
        setActiveTab2(tabName: string) {
            this.activeTab2 = tabName;
        },
        refreshRoom(){
            let room = useRoomStore();
            for (let i = 0; i < room.rooms.length; i++) {
                if (room.rooms[i].rid == room.rid) {
                    this.item = room.rooms[i];
                    break;
                }
            }
        }

    }
})
