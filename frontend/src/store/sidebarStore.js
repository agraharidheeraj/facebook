import { create } from 'zustand'
const useSidebarStore = create((set) =>({
    isSidebarOpen:false,
    toggleSidebar: () => set((state) => ({isSidebarOpen: !state.isSidebarOpen}))
}))

export default useSidebarStore;