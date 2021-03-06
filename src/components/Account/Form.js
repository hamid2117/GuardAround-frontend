import React, { useState } from 'react'
import {
  TextField,
  Button,
  CssBaseline,
  makeStyles,
  Container,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core'
import { useFormik } from 'formik'
import { useAuthContext } from '../../context/AuthContext'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(0.2),
  },
  submit: {
    margin: theme.spacing(1.5, 0, 1),
  },
  changerr: {
    '@media (max-width: 500px)': {
      marginTop: '17px',
    },
  },
}))

export default function SignIn({ changeExpand }) {
  const classes = useStyles()
  const [phoneerror, setEmailerror] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const { loginData } = useAuthContext()

  const onSubmit = async (value) => {
    const { ...data } = value
    const response = await axios
      .post('https://guardaround.herokuapp.com/api/v1/login', data)
      .catch((e) => {
        if (e && e.response) {
          if (e.response.status === 404) {
            setEmailerror(true)
          }
          if (e.response.status === 403) {
            setEmailerror(false)
          }
        }
      })
    if (response && response.data) {
      loginData(response.data)
      formik.resetForm()
      setEmailerror(false)
      setTimeout(() => {
        setRedirect(true)
      }, 800)
      toast.success('You are logged in .', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const formik = useFormik({
    initialValues: { phone: '' },
    onSubmit,
  })

  if (redirect) {
    return <Redirect to='/userlist' />
  }

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <TextField
              variant='standard'
              margin='normal'
              required
              fullWidth
              value={formik.values.phone}
              onChange={formik.handleChange}
              helperText={phoneerror && 'This phone number not registered'}
              error={phoneerror ? true : false}
              id='phone'
              label='phone number'
              name='phone'
              autoComplete='phone'
              style={{ paddign: 5 }}
              autoFocus
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
              style={{ marginTop: 1 }}
            />
            <Button
              type='submit'
              fullWidth
              variant='outlined'
              color='primary'
              loading={true}
              disabled={!formik.isValid}
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    </>
  )
}
