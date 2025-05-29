import { useState } from 'react'
import './assets/main.css'
import palette from './assets/palette.svg'
import { MemoEditor } from './components/memoEditor'
import { memoBg } from './consts/memoBg'
import { cn } from './shared/utils'

function App(): React.JSX.Element {
  const [titleInput, setTitleInput] = useState<string>('')
  const [folder, setFolder] = useState<string>('폴더 선택')

  const [selectedColor, setSelectedColor] = useState<string>(memoBg[0].color)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  // hex 색상을 rgba로 변환하는 함수
  function hexToRgba(hex: string, alpha: number): string {
    const h = hex.replace('#', '')
    const bigint = parseInt(h, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return `rgba(${r},${g},${b},${alpha})`
  }

  return (
    <div className="flex h-screen w-screen min-w-[400px] bg-white">
      <div className="w-1/2 h-full border border-black">
        {/* 메모장 타이틀 */}
        <div
          className="p-4"
          style={{
            backgroundColor: hexToRgba(selectedColor, 0.5) // opacity-50 적용
          }}
        >
          {/* 폴더 선택 */}
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <select
                className="border border-gray-300 rounded-md p-2 font-semibold"
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
              >
                <option>폴더 선택</option>
                <option>폴더1</option>
                <option>폴더2</option>
                <option>폴더3</option>
              </select>
              <div className="flex items-center gap-4 font-semibold">
                <p>[{folder}]</p>
                <p>{titleInput}</p>
              </div>
            </div>
            <button
              className="flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-full m-2"
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              <img className="w-6 h-6" src={palette} alt="팔레트" />
            </button>
            {/* 컬러 선택 모달창 */}
            {isModalOpen && (
              <div className="absolute top-14 right-4 z-30 flex flex-col items-center gap-4 w-fit h-fit bg-white rounded-lg p-4 shadow-md">
                <div className="grid grid-cols-3 grid-rows-3 gap-3">
                  {memoBg.map((bg) => (
                    <button
                      key={bg.id}
                      className={cn(
                        'w-14 h-14 rounded-lg hover:border-2 hover:border-blue-300 transition-all',
                        selectedColor === bg.color
                          ? 'border-2 border-blue-500 shadow-md'
                          : 'border border-gray-300'
                      )}
                      style={{ backgroundColor: bg.color }}
                      onClick={() => {
                        setSelectedColor(bg.color)
                        setIsModalOpen(false)
                      }}
                    />
                  ))}
                </div>
                <section className="h-[1px] w-full bg-gray-200" />
                <button className="text-gray-500" onClick={() => setIsModalOpen(false)}>
                  닫기
                </button>
              </div>
            )}
          </div>
          {/* 제목 입력 */}
          <div className="pt-4">
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              autoFocus
              className="font-bold text-3xl outline-none bg-transparent"
              placeholder="제목을 적어주세요"
            ></input>
          </div>
        </div>
        {/* 메모 작성 */}
        <MemoEditor color={selectedColor} />
      </div>
    </div>
  )
}

export default App
