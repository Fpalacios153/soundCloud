import { createContext, useContext, useState } from "react";

export const SongContext = createContext();

export const useSongContext = () => useContext(SongContext)


export default function SongProvider({ children }) {
    const [song, setSong] = useState('');

    return (
        <SongContext.Provider value={{ song, setSong }} >
            {children}
        </SongContext.Provider>
    )
}
