import { useEffect, useRef, useState } from 'react'
import './assets/main.css'
import { memoBg } from './consts/memoBg'
import { MemoTitle } from './components/memoTitle'
import Memo from './components/memo'
import MemoList from './components/memoList'

function App(): React.JSX.Element {
  const [folder, setFolder] = useState<string>('폴더 선택')
  const [titleInput, setTitleInput] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('#ffffff') // 초기 색상은 흰색
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  // 사이드바 넓이 조절
  const [memoListWidth, setMemoListWidth] = useState<number>(240)
  const isResizing = useRef<boolean>(false)

  // hex 색상을 rgba로 변환하는 함수
  function hexToRgba(hex: string, alpha: number): string {
    const h = hex.replace('#', '')
    const bigint = parseInt(h, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return `rgba(${r},${g},${b},${alpha})`
  }

  // 드래그 시작
  const handleMouseDown = (): void => {
    isResizing.current = true
    document.body.style.cursor = 'col-resize'
  }

  // 드래그 중
  const handleMouseMove = (e: MouseEvent): void => {
    if (isResizing.current) {
      const newWidth = Math.max(200, e.clientX) // 최소 120px
      setMemoListWidth(newWidth)
    }
  }

  // 드래그 끝
  const handleMouseUp = (): void => {
    isResizing.current = false
    document.body.style.cursor = ''
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  })
  return (
    <div className="flex h-dvh w-auto min-w-[400px] bg-white">
      <div>
        <div
          style={{ width: memoListWidth, minWidth: 80, maxWidth: 400 }}
          className="relative h-full bg-gray-50 border-r border-gray-200 flex-shrink-0"
        >
          <MemoList />
          <div
            onMouseDown={handleMouseDown}
            className="absolute top-0 right-0 w-2 h-full cursor-col-resize z-10 hover:bg-gray-200 transition"
            style={{ userSelect: 'none' }}
          />
        </div>
      </div>

      <div className="w-full min-h-0 flex flex-col">
        {/* 메모장 타이틀 */}
        <MemoTitle
          titleInput={titleInput}
          setTitleInput={setTitleInput}
          folder={folder}
          setFolder={setFolder}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          memoBg={memoBg}
          hexToRgba={hexToRgba}
        />
        <Memo selectedColor={selectedColor} />
      </div>
    </div>
  )
}

export default App
