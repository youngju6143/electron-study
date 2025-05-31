import { JSX } from 'react'

type MemoProps = {
  selectedColor: string
}

const Memo = ({ selectedColor }: MemoProps): JSX.Element => {
  return (
    <textarea
      className="flex-1 w-full h-full p-4 outline-none resize-none" // flex-1을 사용하여 부모 요소의 남은 공간을 차지하도록 설정
      style={{ backgroundColor: selectedColor, display: 'flex' }}
      placeholder="내용을 적어주세요"
      spellCheck={false}
    ></textarea>
  )
}

export default Memo
