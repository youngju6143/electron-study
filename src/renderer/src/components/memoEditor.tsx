import { JSX } from 'react'

type MemoEditorProps = {
  color: string
}

export const MemoEditor = ({ color }: MemoEditorProps): JSX.Element => {
  return (
    <textarea
      className={`w-full h-full p-4 outline-none resize-none`}
      style={{ backgroundColor: color }}
      placeholder="내용을 적어주세요"
      spellCheck={false}
    ></textarea>
  )
}
