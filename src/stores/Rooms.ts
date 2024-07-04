import { defineStore } from "pinia";
import { computed, ref, type ComputedRef } from "vue";

export const useRoomStore = defineStore('rooms', {
    state: () => {
        return {
            rooms: ref([
                {
                    rid: 0,
                    title: "",
                    img: "",
                    dec: "",
                    servercore: "",
                    clientcore: "",
                    players: [],
                    maxplayers: 0,
                    viplevel: 0,
                    plugins: [],
                    mods: []
                  },
              ]),
            currentPage: ref(1),
            totalPages: 0,
            openroom: async function(room: number) {}
        }
    },
    getters: {
        // 使用getter来定义paginatedItems
        paginatedItems: (state) => {
            const itemsPerPage = 18; // 假设每页18项
            const start = (state.currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            return state.rooms.slice(start, end);
        }
    },
    actions: {
        changeName(rooms: any) {
            this.rooms = rooms
        }
    }
})