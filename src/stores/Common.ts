import { defineStore } from "pinia";

export const useCommonStore = defineStore('common', {
    state: () => {
        const ws = "ws://localhost:4000";
        return {
            ws: ws,
            websocket: new WebSocket(ws),
            heartbeatInterval: 0,
            servercore: [{
                name: "",
                version: ""
            }],
            clientcore: [{
                name: "",
                version: ""
            }],
        }
    },
    actions: {
        connectWebsocket() {
            this.websocket = new WebSocket(this.ws);
            console.log("Connecting to websocket");
            
        },
        disconnectWebsocket() {
            this.websocket.close();
        },
        sendWebsocket(type: string, data: any) {
            this.websocket.send(JSON.stringify({
                type: type,
                data: data
            }));
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
        }

    }
})
