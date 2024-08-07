import { defineStore } from "pinia";
import { inject, ref, type Ref } from "vue";
import { useUserStore } from "./User";
import { AddPlayer } from "@/utils/CommonServices";
import { useCommonStore } from "./Common";

export const useRoomStore = defineStore('rooms', {
    state: () => {
        return {
            rooms: ref([
                {
                    rid: 0,
                    title: "",
                    img: "",
                    dec: "",
                    ServerCore: {
                        "name": "",
                        "version": "",
                    },
                    ClientCore: {
                        "name": "",
                        "version": "",
                    },
                    players: [],
                    maxPlayers: 0,
                    vipLevel: 0,
                    plugins: [],
                    mods: []
                  },
              ]),
            rid: -1,
            currentPage: ref(1),
            itemsPerPage: ref(21),
            totalPages: 0,
        }
    },
    getters: {
        // 使用getter来定义paginatedItems
        paginatedItems: (state) => {
            const start = (state.currentPage - 1) * state.itemsPerPage;
            const end = start + state.itemsPerPage;
            return state.rooms.slice(start, end);
        }
    },
    actions: {
        changeName(rooms: any) {
            this.rooms = rooms
        },
        async openroom(index: number) {
            
            const user = useUserStore();
            const common = useCommonStore()

            common.setActiveTab("我的游戏");

            if(user.rid == -1){
              return;
            }
            
            this.rid = index;
            AddPlayer(index)
            if(index == user.rid) {
                common.tabTitle = "我的游戏";
            }else{
                common.tabTitle = "当前加入";
            }
            
        }
    }
})