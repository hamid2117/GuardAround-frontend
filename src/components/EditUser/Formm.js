import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  Grid,
} from '@material-ui/core'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify'

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'grid ',
    width: '80%',
    gap: '10px',
    '@media (max-width: 500px)': {},
  },
}))

const validationSchema = yup.object({
  email: yup.string().email('Please enter a valid email address'),
})
const Formm = ({ config, id, setNewData }) => {
  const classes = useStyles()

  const onSubmit = async (value) => {
    const { ...data } = value
    try {
      const { data: dataa } = await axios.put(
        `https://guardaround.herokuapp.com/api/v1/edituser/${id}`,
        data,
        config
      )
      if (dataa) {
        formik.resetForm()
        setNewData(dataa)
        toast.success('User Data is updated.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      firstName: '',
      lastName: '',
      country: '',
      city: '',
      about: '',
      incidents: '',
      status: 'verified',
      type: 'user',
      email: '',
      code: '',
      number: '',
    },
    onSubmit,
    validationSchema,
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={classes.main}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='firstName'
              name='firstName'
              variant='standard'
              label='FristName'
              error={
                formik.touched.firstName && formik.errors.firstName
                  ? true
                  : false
              }
              helperText={
                formik.touched.firstName && formik.errors.firstName
                  ? formik.errors.firstName
                  : null
              }
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              className={classes.lastNamee}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='lastName'
              name='lastName'
              variant='standard'
              label='LastName'
              error={
                formik.touched.lastName && formik.errors.lastName ? true : false
              }
              helperText={
                formik.touched.lastName && formik.errors.lastName
                  ? formik.errors.lastName
                  : null
              }
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              className={classes.lastNamee}
              fullWidth
              autoComplete='lname'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='country'
              name='country'
              variant='standard'
              label='Country'
              value={formik.values.country}
              onChange={formik.handleChange}
              className={classes.lastNamee}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='city'
              name='city'
              variant='standard'
              label='City'
              value={formik.values.city}
              onChange={formik.handleChange}
              className={classes.lastNamee}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='about'
              name='about'
              variant='standard'
              label='About'
              value={formik.values.about}
              onChange={formik.handleChange}
              className={classes.lastNamee}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='incidents'
              type='number'
              name='incidents'
              variant='standard'
              label='incidents'
              value={formik.values.incidents}
              onChange={formik.handleChange}
              className={classes.lastNamee}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id='select-filled-label'>Status</InputLabel>
            <Select
              labelId='select-filled-label'
              fullWidth
              id='isAdmin'
              name='isAdmin'
              value={formik.values.status}
              onChange={formik.handleChange}
            >
              <MenuItem value={'deleted'}>Deleted</MenuItem>
              <MenuItem value={'verified'}>Verified</MenuItem>
              <MenuItem value={'unverified'}>Unverified</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <InputLabel id='select-filled-label'>Type</InputLabel>
            <Select
              labelId='select-filled-label'
              fullWidth
              id='type'
              name='type'
              value={formik.values.type}
              onChange={formik.handleChange}
            >
              <MenuItem value={'admin'}>Admin</MenuItem>
              <MenuItem value={'user'}>User</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='email'
              name='email'
              variant='standard'
              error={formik.touched.email && formik.errors.email ? true : false}
              helperText={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : null
              }
              onBlur={formik.handleBlur}
              label='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              className={classes.lastNamee}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='code'
              name='code'
              variant='standard'
              label='code'
              value={formik.values.code}
              onChange={formik.handleChange}
              className={classes.lastNamee}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='number'
              name='number'
              variant='standard'
              label='number'
              value={formik.values.number}
              onChange={formik.handleChange}
              className={classes.lastNamee}
              fullWidth
            />
          </Grid>
        </Grid>
        <Button variant='outlined' color='primary' type='submit'>
          Edit
        </Button>
      </form>
    </>
  )
}
export default Formm
