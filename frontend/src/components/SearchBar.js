import { useState } from 'react'
export default function SearchBar() {
    const [word, SetWord] = useState('')
    return (
        <>
            <label>
                Search
                <input
                    type='text'
                    placeholder='Enter Search Word'
                    value={word}
                    onChange={(e) => SetWord(e.target.value)}

                />
            </label>
        </>
    )
}
