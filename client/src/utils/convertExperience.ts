import { Experience } from '../types.generated'

export const convertExperience = (exp?: Experience): string => {
  switch (exp) {
    case 'FROM_0_TO_1':
      return 'От 0 до 1 год'
    case 'FROM_1_TO_2':
      return 'От 1 до 2 лет'
    case 'FROM_2_TO_4':
      return 'От 2 до 4 лет'
    case 'FROM_4_TO_6':
      return 'От 4 до 6 лет'
    case 'FROM_6':
      return 'От 6 лет'
  }

  return ''
}
