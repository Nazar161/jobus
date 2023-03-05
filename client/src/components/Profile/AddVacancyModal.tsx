import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@mui/material'
import React, { FormEvent, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { Experience } from '../../types.generated'
import { convertExperience } from '../../utils/convertExperience'
import style from '../SignUp/SignUpForm.module.css'
import {
  useAddVacancyMutation,
  useGetBenefitsQuery,
  useGetLocationsQuery,
  useGetRecruiterLazyQuery,
  useGetSkillsQuery,
} from './Profile.generated'

const boxStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

interface IAddVacancy {
  recruiterId: string
  title: string
  locationId: string
  isRemote: boolean
  experience: Experience
  description: string
  skills: string[]
  benefits: string[]
  minSalary?: number
  maxSalary?: number
}

const AddVacancyModal: React.FC = () => {
  const { auth } = useAuth()

  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const theme = useTheme()

  const [vacancyData, setVacancyData] = useState<IAddVacancy>({} as IAddVacancy)
  const [skillTitle, setSillTitle] = useState<string[]>([])
  const [benefitTitle, setBenefitTitle] = useState<string[]>([])

  const { data: locations } = useGetLocationsQuery()
  const { data: skills } = useGetSkillsQuery()
  const { data: benefits } = useGetBenefitsQuery()
  const [refetchRecQuery, { called, loading, data }] =
    useGetRecruiterLazyQuery()

  const [addVacancy] = useAddVacancyMutation()

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const selectedSkillIds = [...skillTitle].map(s => {
      return skills?.getSkills?.find(gs => gs.title === s)?.id
    })
    const selectedBenefitIds = [...benefitTitle].map(b => {
      return benefits?.getBenefits?.find(bf => bf.title === b)?.id
    })
    setVacancyData(
      prev =>
        ({
          ...prev,
          skills: selectedSkillIds,
          benefits: selectedBenefitIds,
        } as IAddVacancy)
    )

    addVacancy({
      variables: {
        data: {
          ...vacancyData,
          recruiterId: auth.userId ? auth.userId : '',

          minSalary: vacancyData.minSalary
            ? Number(vacancyData.minSalary)
            : undefined,
          maxSalary: vacancyData.maxSalary
            ? Number(vacancyData.maxSalary)
            : undefined,
        },
      },

      onCompleted: () => {
        refetchRecQuery({
          variables: { getUserByIdId: auth.userId ? auth.userId : '' },
          fetchPolicy: 'network-only',
        })
        console.log(data)

        setVacancyData({} as IAddVacancy)
        handleClose()
      },
    })
  }

  const handleSkillSelectChange = (
    event: SelectChangeEvent<typeof skillTitle>
  ) => {
    const {
      target: { value },
    } = event
    setSillTitle(typeof value === 'string' ? value.split(',') : value)
  }

  const handleBenefitSelectChange = (
    event: SelectChangeEvent<typeof benefitTitle>
  ) => {
    const {
      target: { value },
    } = event
    setBenefitTitle(typeof value === 'string' ? value.split(',') : value)
  }

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Добавить Вакансию
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Добавить Вакансию
          </Typography>
          <form className={style.form} onSubmit={onSubmit}>
            <TextField
              sx={{ marginBottom: 1 }}
              required
              id="outlined-required"
              label="Название"
              value={vacancyData.title}
              onChange={e =>
                setVacancyData(prev => ({ ...prev, title: e.target.value }))
              }
            />
            <FormControlLabel
              label="Удалённый формат работы"
              control={
                <Checkbox
                  checked={vacancyData.isRemote}
                  onChange={e =>
                    setVacancyData(prev => ({
                      ...prev,
                      isRemote: !prev.isRemote,
                    }))
                  }
                />
              }
            />
            <FormHelperText>Выберите город</FormHelperText>
            <Select
              sx={{ marginBottom: 1 }}
              value={vacancyData.locationId}
              onChange={e =>
                setVacancyData(prev => ({
                  ...prev,
                  locationId: e.target.value as string,
                }))
              }
              input={<OutlinedInput />}
              required
            >
              {locations?.getLocations?.map(l => (
                <MenuItem key={l.id} value={l.id}>
                  {l.title}
                </MenuItem>
              ))}
            </Select>
            <TextField
              required
              sx={{ marginBottom: 1 }}
              id="outlined-multiline-static"
              label="Описание"
              multiline
              rows={3}
              placeholder="Описание"
              value={vacancyData.description}
              onChange={e =>
                setVacancyData(prev => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
            <FormHelperText>Выберите необходимые навыки</FormHelperText>
            <Select
              required
              sx={{ marginBottom: 1 }}
              multiple
              value={skillTitle}
              onChange={handleSkillSelectChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={selected => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map(value => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {skills?.getSkills?.map(s => (
                <MenuItem
                  key={s.title}
                  value={s.title}
                  style={getStyles(s.title, skillTitle, theme)}
                >
                  {s.title}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Укажите опыт</FormHelperText>
            <Select
              sx={{ marginBottom: 1 }}
              value={vacancyData.experience}
              onChange={e =>
                setVacancyData(prev => ({
                  ...prev,
                  experience: e.target.value as Experience,
                }))
              }
              input={<OutlinedInput />}
              required
            >
              {(Object.keys(Experience) as (keyof typeof Experience)[]).map(
                exp => (
                  <MenuItem key={Experience[exp]} value={Experience[exp]}>
                    {convertExperience(Experience[exp])}
                  </MenuItem>
                )
              )}
            </Select>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <TextField
                sx={{ marginBottom: 2, width: '150px' }}
                id="outlined-number"
                label="З.П. от"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={vacancyData.minSalary}
                onChange={e =>
                  setVacancyData(prev => ({
                    ...prev,
                    minSalary: Number(e.target.value),
                  }))
                }
              />
              <TextField
                sx={{ marginBottom: 2, width: '150px' }}
                id="outlined-number"
                label="З.П. до"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={vacancyData.maxSalary}
                onChange={e =>
                  setVacancyData(prev => ({
                    ...prev,
                    maxSalary: Number(e.target.value),
                  }))
                }
              />
            </div>
            <FormHelperText>Выберите доп. предложения</FormHelperText>
            <Select
              required
              sx={{ marginBottom: 1 }}
              multiple
              value={benefitTitle}
              onChange={handleBenefitSelectChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={selected => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map(value => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {benefits?.getBenefits?.map(s => (
                <MenuItem
                  key={s.title}
                  value={s.title}
                  style={getStyles(s.title, benefitTitle, theme)}
                >
                  {s.title}
                </MenuItem>
              ))}
            </Select>
            <Button type="submit" variant="contained" color="primary">
              Добавить
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  )
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

export default AddVacancyModal
