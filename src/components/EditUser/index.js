import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { CalendarToday, PermIdentity } from '@material-ui/icons'
import axios from 'axios'
import { useAuthContext } from './../../context/AuthContext'
import Formm from './Formm'
import { toast } from 'react-toastify'

// or
const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    maxWidth: '80%',
    margin: '0px auto',
    marginBottom: '35px',
  },
  main2: {
    width: '100%',
    maxWidth: '80%',
    margin: '0px auto',
    height: '90vh',
    display: 'grid',
    gap: '12px',
    gridTemplateColumns: '1fr 3fr ',
  },
}))

const User = () => {
  const classes = useStyles()
  const { id } = useParams()
  const [newData, setNewData] = useState({})
  const { userdata } = useAuthContext()
  const { token } = userdata
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/user/${id}`,
        config
      )
      if (data) {
        setNewData(data)
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // setRedirect(true)
      }
      console.log(error)
    }
  }
  useEffect(() => {
    getData()
    toast.promise(getData, {
      pending: 'Wait few seconds Data is retrieving ....',
      success: 'Data is Retrieved .',
      error: 'Something goes wronge',
    })
  }, [])

  return (
    <>
      <div>
        <div className={classes.main}>
          <h1>Edit User</h1>
        </div>
        <div className={classes.main2}>
          <div>
            <div>
              <span style={{ fontWeight: 'bold' }}>Account Detail</span>
              <div style={{ marginBottom: '9px' }}>
                <span style={{ fontWeight: 'bold' }}> Id </span>
                <span style={{ marginLeft: '10px' }}>
                  {newData && newData._id}
                </span>
              </div>
              <div style={{ marginBottom: '9px' }}>
                <CalendarToday />
                <span
                  style={{
                    marginLeft: '10px',
                    marginBottom: '15px',
                    fontSize: '13px',
                  }}
                >
                  {newData && newData.createdAt}
                </span>
              </div>
              <div>
                <PermIdentity />
                <span style={{ marginLeft: '10px', marginBottom: '15px' }}>
                  {newData && newData.firstName} {''}{' '}
                  {newData && newData.lastName}
                </span>
              </div>

              <div style={{ margin: '20px 0px' }}>
                <span style={{ fontWeight: 'bold' }}>More Detail</span>
              </div>
              <div>
                <span style={{ fontWeight: 'bold' }}> Country : </span>
                <span style={{ marginLeft: '10px', marginBottom: '15px' }}>
                  {newData && newData.country}
                </span>
              </div>
              <div>
                <span style={{ fontWeight: 'bold' }}> city : </span>
                <span style={{ marginLeft: '10px', marginBottom: '15px' }}>
                  {newData && newData.city}
                </span>
              </div>
              <div>
                <span style={{ fontWeight: 'bold' }}> about : </span>
                <span style={{ marginLeft: '10px', marginBottom: '15px' }}>
                  {newData && newData.about}
                </span>
              </div>

              <div>
                <span style={{ fontWeight: 'bold' }}> incidents : </span>
                <span style={{ marginLeft: '10px', marginBottom: '15px' }}>
                  {newData && newData.incidents}
                </span>
              </div>
              <div>
                <span style={{ fontWeight: 'bold' }}> status : </span>
                <span style={{ marginLeft: '10px', marginBottom: '15px' }}>
                  {newData && newData.status}
                </span>
              </div>
              <div>
                <span style={{ fontWeight: 'bold' }}> Type : </span>
                <span style={{ marginLeft: '10px', marginBottom: '15px' }}>
                  {newData && newData.type}
                </span>
              </div>
              <div style={{ margin: '20px 0px' }}>
                <span style={{ fontWeight: 'bold' }}>Contact Detail</span>
              </div>
              {/* firstName, country, address, city, lastName, email, about,
                image, incidents, status, isAdmin, phone, code, number, */}
              <div>
                <span style={{ fontWeight: 'bold' }}> email : </span>
                <span style={{ marginLeft: '10px', marginBottom: '15px' }}>
                  {newData && newData.email}
                </span>
              </div>
              <div>
                <span style={{ fontWeight: 'bold' }}> code : </span>
                <span style={{ marginLeft: '10px', marginBottom: '15px' }}>
                  {newData && newData.code}
                </span>
              </div>
              <div>
                <span style={{ fontWeight: 'bold' }}> number : </span>
                <span style={{ marginLeft: '10px', marginBottom: '15px' }}>
                  {newData && newData.number}
                </span>
              </div>
              <div>
                <span style={{ fontWeight: 'bold' }}> phone : </span>
                <span style={{ marginLeft: '10px', marginBottom: '15px' }}>
                  {newData && newData.phone}
                </span>
              </div>
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '15px' }}>
              <span style={{ fontWeight: 'bold' }}>edit</span>
            </div>
            <Formm config={config} id={id} setNewData={setNewData} />
          </div>
        </div>
      </div>
    </>
  )
}

export default User
