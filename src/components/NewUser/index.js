import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { useGlobalUiContext } from '../../context/uiContext'
import CloseIcon from '@material-ui/icons/Close'
import { useFormik } from 'formik'
import { IconButton, Divider, TextField, Button, Grid } from '@material-ui/core'
import axios from 'axios'
import { toast } from 'react-toastify'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    borderRadius: '10px',
    padding: '30px 15px',
    width: '400px',
  },
  head: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    justifyContent: 'start',
  },
  inputs: {
    padding: '25px 0px',
    display: 'grid',
    gap: '15px 0px',
  },
  sign: {
    backgroundColor: '#5f83ef',
    '&:hover': {
      backgroundColor: '#3764eb',
    },
  },
}))

export default function Login() {
  const classes = useStyles()
  const { adminRegister, adminCloseRegister } = useGlobalUiContext()
  const [phoneError, setPhoneerror] = useState(false)

  const onSubmit = async (value) => {
    const { phone, number, code } = value

    const data = { ...value, phone: code + number }
    const response = await axios
      .post('http://localhost:5000/api/v1/user', data)
      .catch((e) => {
        if (e && e.response) {
          if (e.response.status === 400) {
            setPhoneerror(true)
          }
        }
      })
    if (response && response.data) {
      adminCloseRegister()
      toast.success('User is Created.')
      formik.resetForm()
    }
  }

  const formik = useFormik({
    initialValues: { username: '', phone: '', code: '', number: '' },
    onSubmit,
  })

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={adminRegister}
        onClose={adminCloseRegister}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={adminRegister}>
          <div className={classes.paper}>
            <div className={classes.head}>
              <h3>Register</h3>
              <div style={{ justifySelf: 'end' }}>
                <IconButton onClick={() => adminCloseRegister()}>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
            <Divider />
            <form onSubmit={formik.handleSubmit} className={classes.inputs}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id='username'
                    name='username'
                    variant='standard'
                    label='Username'
                    required
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    className={classes.lastNamee}
                    fullWidth
                    autoComplete='username'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id='code'
                    name='code'
                    variant='standard'
                    label='Your country code .'
                    required
                    value={formik.values.code}
                    onChange={formik.handleChange}
                    className={classes.lastNamee}
                    fullWidth
                    autoComplete='code'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id='number'
                    name='number'
                    variant='standard'
                    label='Number'
                    required
                    value={formik.values.number}
                    onChange={formik.handleChange}
                    className={classes.lastNamee}
                    fullWidth
                    autoComplete='number'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id='phone'
                    name='phone'
                    variant='standard'
                    error={phoneError ? true : false}
                    helperText={
                      phoneError && 'This Phone is already registered'
                    }
                    label='Phone'
                    required
                    value={
                      formik.values.phone +
                      formik.values.code +
                      formik.values.number
                    }
                    onChange={formik.handleChange}
                    className={classes.lastNamee}
                    fullWidth
                    autoComplete='phone'
                  />
                </Grid>
              </Grid>
              <Button className={classes.sign} type='submit'>
                add User
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
