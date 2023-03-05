import { Box } from '@mui/system'
import React from 'react'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Experience, Status } from '../../types.generated'
import { useGetRecruiterQuery } from './Profile.generated'
import useAuth from '../../hooks/useAuth'
import { convertExperience } from '../../utils/convertExperience'
import { convertStatus } from '../../utils/convertStatus'
import AddVacancyModal from './AddVacancyModal'

const RecruiterProfile: React.FC = () => {
  const { auth } = useAuth()

  const { data } = useGetRecruiterQuery({
    variables: { getUserByIdId: auth.userId ? auth.userId : '' },
  })

  return (
    <Box>
      <h1>
        {data?.getUserById?.userInfo?.firstName}{' '}
        {data?.getUserById?.userInfo?.lastName}
      </h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>
          Текущие вакансии вашей компании: {data?.getUserById?.company?.name}
        </h2>
        <AddVacancyModal />
      </div>
      {data?.getUserById?.company?.vacancies && (
        <CollapsibleTable vacancies={data?.getUserById?.company?.vacancies} />
      )}
    </Box>
  )
}

export default RecruiterProfile

type Props = {
  id?: string
  title?: string
  experience?: Experience
  minSalary?: number | null
  maxSalary?: number | null
  applications?: Array<{
    userId?: string
    status?: Status
    firstName?: string
    lastName?: string
    experience?: Experience
    email?: string
    salary?: number | null
  }>
}

function Row(props: { row: Props }) {
  const { row } = props
  const [open, setOpen] = React.useState(false)

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell sx={{ backgroundColor: '#1976d2', color: '#fff' }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          sx={{ backgroundColor: '#1976d2', color: '#fff' }}
        >
          {row.title}
        </TableCell>
        <TableCell
          align="right"
          sx={{ backgroundColor: '#1976d2', color: '#fff' }}
        >
          {convertExperience(row.experience)}
        </TableCell>
        <TableCell
          align="right"
          sx={{ backgroundColor: '#1976d2', color: '#fff' }}
        >
          {row.minSalary}
        </TableCell>
        <TableCell
          align="right"
          sx={{ backgroundColor: '#1976d2', color: '#fff' }}
        >
          {row.maxSalary}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Отклики
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Имя</TableCell>
                    <TableCell>Фамилия</TableCell>
                    <TableCell align="right">Опыт</TableCell>
                    <TableCell align="right">З.П.</TableCell>
                    <TableCell align="right">email</TableCell>
                    <TableCell align="right">Статус</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.applications?.map(app => (
                    <TableRow key={app.userId}>
                      <TableCell component="th" scope="row">
                        {app.firstName}
                      </TableCell>
                      <TableCell>{app.lastName}</TableCell>
                      <TableCell align="right">
                        {convertExperience(app.experience)}
                      </TableCell>
                      <TableCell align="right">{app.salary}</TableCell>
                      <TableCell align="right">{app.email}</TableCell>
                      <TableCell align="right">
                        {convertStatus(app.status)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

function CollapsibleTable(props: {
  vacancies: Array<{
    __typename?: 'Vacancy'
    id: string
    title: string
    minSalary?: number | null
    maxSalary?: number | null
    experience: Experience
    applications?: Array<{
      __typename?: 'Application'
      status: Status
      user: {
        __typename?: 'User'
        id: string
        userInfo?: {
          __typename?: 'UserInfo'
          firstName: string
          lastName: string
          experience: Experience
          email: string
          salary?: number | null
        } | null
      }
    } | null> | null
  } | null> | null
}) {
  const { vacancies } = props

  const formattedVacancies = vacancies?.map(v => {
    return {
      id: v?.id,
      title: v?.title,
      experience: v?.experience,
      minSalary: v?.minSalary,
      maxSalary: v?.maxSalary,
      applications: v?.applications?.map(a => {
        return {
          userId: a?.user.id,
          status: a?.status,
          firstName: a?.user.userInfo?.firstName,
          lastName: a?.user.userInfo?.lastName,
          experience: a?.user.userInfo?.experience,
          email: a?.user.userInfo?.email,
          salary: a?.user.userInfo?.salary,
        }
      }),
    }
  })

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Вакансия</TableCell>
            <TableCell align="right">Опыт</TableCell>
            <TableCell align="right">З.П от</TableCell>
            <TableCell align="right">З.П до</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formattedVacancies?.map(row => (
            <Row key={row?.title} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
