import { cn } from '@renderer/shared/utils'
import { JSX } from 'react'
import palette from '../assets/icons/palette.svg'
type MemoTitleProps = {
  titleInput: string
  setTitleInput: (value: string) => void
  folder: string
  setFolder: (value: string) => void
  selectedColor: string
  setSelectedColor: (value: string) => void
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
  memoBg: { id: number; name: string; color: string }[]
  hexToRgba(hex: string, alpha: number): string
}

export const MemoTitle = ({
  titleInput,
  setTitleInput,
  folder,
  setFolder,
  selectedColor,
  setSelectedColor,
  isModalOpen,
  setIsModalOpen,
  memoBg,
  hexToRgba
}: MemoTitleProps): JSX.Element => {
  return (
    <div
      className="p-4 h-auto"
      style={{
        backgroundColor: hexToRgba(selectedColor, 0.5) // opacity-50 적용
      }}
    >
      <div className="pb-4 relative flex items-center justify-between">
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
      <input
        type="text"
        value={titleInput}
        onChange={(e) => setTitleInput(e.target.value)}
        autoFocus
        className="font-bold text-3xl outline-none bg-transparent"
        placeholder="제목을 적어주세요"
      ></input>
    </div>
  )
}
