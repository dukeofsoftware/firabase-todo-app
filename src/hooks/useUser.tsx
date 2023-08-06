import { create } from 'zustand';
import { persist } from 'zustand/middleware'
import { User } from 'firebase/auth';
type UserStore = {
    user: User | null;
    setUser: (user: User | null) => void;
}


export const useUserStore = create<UserStore>()(persist(
    /* start */
    (set, get) => ({
        user: null,
        setUser: (user: User | null) => set({ user })
    })
    /* end */
    , { name: "user-strotage" }));