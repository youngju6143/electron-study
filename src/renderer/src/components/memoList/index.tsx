import { memoList } from '@renderer/consts/memoContent'
import { JSX } from 'react'
import deleteIcon from '../../assets/icons/deleteIcon.svg'

const MemoList = (): JSX.Element => {
  return (
    <div className="w-auto min-w-28 h-full min-h-0 border border-red-300">
      <div className="p-4">
        <h1 className="text-center text-2xl font-bold">메모장</h1>
      </div>
      <div className="py-4 px-8">
        <div className="space-y-2">
          {memoList.map((memo) => (
            <div
              key={memo.id}
              className="transition-all duration-200 hover:scale-110 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-2  hover:border-gray-100 hover:border cursor-pointer"
            >
              <div className="flex justify-between items-center gap-2">
                <input type="checkbox"></input>
                <h2 className="text-sm">{memo.title}</h2>
                <img src={deleteIcon} alt="deleteIcon" className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MemoList
