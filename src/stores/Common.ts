import { defineStore } from "pinia";

export const useCommonStore = defineStore('common', {
    state: () => {
        return {
            websocket: new WebSocket("ws://localhost:4000"),
            heartbeatInterval: 0
        }
    },
    actions: {
        connectWebsocket() {
            this.websocket = new WebSocket("ws://localhost:4000");
            console.log("Connecting to websocket");
            
        },
        disconnectWebsocket() {
            this.websocket.close();
        },
        sendWebsocket(msg: string) {
            this.websocket.send(msg);
        },
        startHeartbeat() {
            this.heartbeatInterval = setInterval(() => {
              if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
                this.websocket.send("ping"); // 发送心跳消息
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
