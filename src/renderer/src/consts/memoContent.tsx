export type MemoType = {
  id: number
  category: string
  title: string
  content: string
}

export const memoList: MemoType[] = [
  {
    id: 1,
    category: 'Work',
    title: '프로젝트 회의',
    content: '내일 오전 10시에 프로젝트 회의가 있습니다.'
  },
  {
    id: 2,
    category: 'Personal',
    title: '장보기 목록',
    content: '우유, 계란, 빵, 과일을 사야 합니다.'
  },
  {
    id: 3,
    category: 'Study',
    title: '타입스크립트 복습',
    content: '인터페이스와 제네릭 부분을 다시 공부하기.'
  },
  {
    id: 4,
    category: 'Work',
    title: '이메일 확인',
    content: '클라이언트에게 온 이메일을 확인하고 답장하기.'
  },
  {
    id: 5,
    category: 'Personal',
    title: '운동 계획',
    content: '오늘 저녁에 30분 러닝하기.'
  }
]
