import React, { useState, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { rows } from './../../DummyData'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import { useAuthContext } from './../../context/AuthContext'
import { Link, Redirect } from 'react-router-dom'
import { IconButton, Button, CircularProgress } from '@material-ui/core'
import axios from 'axios'
import { useGlobalUiContext } from './../../context/uiContext'
import DeleteModel from '../DeleteModel'
import { toast } from 'react-toastify'

const UserList = () => {
  const [data, setData] = useState(rows)
  const [redirect, setRedirect] = useState(false)
  const [model, setModel] = useState(false)
  const [deleteData, setDeleteData] = useState(false)
  const [newId, setNewId] = useState('')
  const { adminRegisterReload } = useGlobalUiContext()
  const { userdata, loading, userlist, getData, setLoading } = useAuthContext()
  const { token } = userdata

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const handleDelete = async (id) => {
    try {
      setLoading(true)
      const response = await axios.delete(
        `https://guardaround.herokuapp.com/api/v1/user/${id}`,
        config
      )
      if (response) {
        getData()
        toast.error('User is deleted.')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const closeModel = () => {
    setModel(false)
  }
  const deleteUser = () => {
    setDeleteData(true)
    setModel(false)
  }
  const handleDeleteBtn = (id) => {
    setNewId(id)
    setModel(true)
  }

  useEffect(() => {
    if (adminRegisterReload) {
      getData()
    }
  }, [adminRegisterReload])

  useEffect(() => {
    getData()
  }, [data])

  useEffect(() => {
    if (deleteData) {
      handleDelete(newId)
    }
  }, [deleteData])

  const columns = [
    { field: '_id', headerName: 'ID', width: 100 },
    { field: 'firstName', headerName: 'Name ', width: 120 },
    { field: 'email', headerName: 'Email ', width: 200 },
    {
      field: 'createdAt',
      headerName: 'CreatedAt',
      width: 150,
      renderCell: (params) => {
        return (
          <div className='userList'>
            {params.row.createdAt.substring(0, 10)}
          </div>
        )
      },
    },
    {
      field: 'number',
      headerName: 'Number',
      width: 130,
    },
    {
      field: 'incidents',
      headerName: 'Incidents',
      width: 135,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Button component={Link} to={`/useredit/${params.row._id}`}>
              Edit
            </Button>
            <IconButton
              className='userListDelete'
              onClick={() => {
                handleDeleteBtn(params.row._id)
              }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </>
        )
      },
    },
  ]

  if (redirect) {
    return <Redirect to='/' />
  }

  return (
    <>
      {loading ? (
        <div
          style={{
            width: '100%',
            height: '80%',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <CircularProgress color='primary' />
        </div>
      ) : (
        <DataGrid
          rows={userlist}
          disableSelectionOnClick
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={8}
          checkboxSelection
        />
      )}
      <DeleteModel
        model={model}
        closeModel={closeModel}
        deleteUser={deleteUser}
      />
    </>
  )
}

export default UserList
