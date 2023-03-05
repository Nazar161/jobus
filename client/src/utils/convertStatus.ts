import { Status } from '../types.generated'

export const convertStatus = (status?: Status): string => {
  switch (status) {
    case 'INVITATION':
      return 'Приглашение'
    case 'NOT_VIEWED':
      return 'Не просмотрено'
    case 'REFUSED':
      return 'Отказано'
    case 'VIEWED':
      return 'Просмотрено'
  }

  return ''
}
