import { defineStore } from "pinia";
export const useResourceStore = defineStore('resources', {
    state: () => {
        return {
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
})
