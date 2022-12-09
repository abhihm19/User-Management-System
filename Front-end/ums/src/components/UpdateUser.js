import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserService from '../services/UserService'

const UpdateUser = () => {
  const [user, setUser] = useState({}) 
  const navigate = useNavigate()
  const {id} = useParams()
  
  useEffect(() => {
    UserService.viewUser(id)
      .then((res) => {
        setUser(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },[id])

  const updateUser = (e) => {
    e.preventDefault()     
    UserService.updateUser(id, user)
      .then((res) => {
       console.log(res.data)
       alert("User updated successfully")
       navigate("/")
     })
      .catch((err) => {
        console.log(err)
        alert("Update failed")
      })
  }

  const cancel = () => {
    navigate("/")
  }

  return (
    <div>
      <br />
      <div className='container'>
        <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3'>
            <h3 className='text-center'>UPDATE USER</h3>
            <hr />
            <form>
              <div className='row'>
                <div className='col-md-6'>
                  <label>First Name:<span className='required-star' >*</span></label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter First Name'
                    required
                    defaultValue={user.firstName}
                    onChange={(e) => user.firstName = e.target.value}
                  />
                </div>
                <div className='col-md-6'>
                  <label>Last Name:<span className='required-star' >*</span></label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter last Name'
                    required
                    defaultValue={user.lastName}
                    onChange={(e) => user.lastName = e.target.value}
                  />
                </div>
              </div>
              <br />
              <label>User Name:<span className='required-star' >*</span></label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter username'
                required
                value={user.userName}
                disabled
              />
              <br />
              <label>Email Id:<span className='required-star' >*</span></label>
              <input
                type='email'
                className='form-control'
                placeholder='Enter Email Id'
                required
                defaultValue={user.emailId}
                onChange={(e) => user.emailId = e.target.value}
              />
              <br />
              <label>Mobile Number:<span className='required-star' >*</span></label>
              <input
                type='number'
                className='form-control'
                placeholder='Enter Mobile Number'
                required
                defaultValue={user.mobileNo}
                onChange={(e) => user.mobileNo = e.target.value}
              />
              <br />
              <label>Address:<span className='required-star' >*</span></label>
              <textarea
                type='text'
                className='form-control'
                placeholder='Enter address'
                required
                defaultValue={user.address}
                onChange={(e) => user.address = e.target.value}
              />
              <br />
              <button className='btn btn-primary' onClick={(e) => updateUser(e)}>Submit</button>
              <button className='btn btn-danger' onClick={(e) => cancel()} style={{"marginLeft":20}}>Cancel</button>
              <br />
            </form>
            <br />
          </div>          
        </div>
        <br /><br />
      </div>
    </div>
  )
}

export default UpdateUser
