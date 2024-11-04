import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface InputProps {
    setIngredients: (ingredients: string) => void
}

function TagsInput(props: InputProps) {
    const [tags, setTags] = useState([])

    function handleKeyDown(e) {
        if (e.key !== 'Enter') return
        const value = e.target.value
        if (!value.trim()) return
        props.setIngredients(curr => curr + ", " + value)
        setTags([...tags, value])
        e.target.value = ''
    }

    function removeTag(index: number) {
        setTags(tags.filter((el, i) => i !== index))
    }

    return (
        <div className="flex flex-wrap gap-2 border-[1px] p-2 rounded-md">
            {tags.map((tag, index) => (
                <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-orange-50" key={index}>
                    <span className="">{tag}</span>
                    <X className="cursor-pointer px-1 rounded-full bg-slate-950 text-white" onClick={() => removeTag(index)}></X>
                </div>
            ))}
            <input onKeyDown={handleKeyDown} type="text" className="font-roboto outline-none" placeholder="Type by enter" />
        </div>
    )
}

export default TagsInput