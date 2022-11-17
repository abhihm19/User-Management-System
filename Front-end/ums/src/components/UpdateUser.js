import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserService from '../services/UserService'

const UpdateUser = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userName, setUserName] = useState('')
  const [emailId, setEmailId] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [address, setAddress] = useState('')
  const navigate = useNavigate();

  const updateUser = (e) => {
    e.preventDefault();

    const userDto = {firstName, lastName, userName, emailId, mobileNo, address};
    console.log(userDto);
    UserService.addUser(userDto)
      .then((res) => {
       console.log(res.data)
       alert("user registered successfully")
       navigate("/")
     })
      .catch((err) => {
        console.log(err)
        alert("Username already taken")
      })
  }

  const cancel = () => {
    navigate("/")
  }

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3'>
            <h3 className='text-center'>ADD USER</h3>
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
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className='col-md-6'>
                  <label>Last Name:<span className='required-star' >*</span></label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter last Name'
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
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
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <br />
              <label>Email Id:<span className='required-star' >*</span></label>
              <input
                type='email'
                className='form-control'
                placeholder='Enter Email Id'
                required
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
              <br />
              <label>Mobile Number:<span className='required-star' >*</span></label>
              <input
                type='number'
                className='form-control'
                placeholder='Enter Mobile Number'
                required
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
              <br />
              <label>Address:<span className='required-star' >*</span></label>
              <textarea
                type='text'
                className='form-control'
                placeholder='Enter address'
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <br />
              <button className='btn btn-primary' onClick={(e) => updateUser(e)}>Submit</button>
              <button className='btn btn-danger' onClick={(e) => cancel()} style={{"marginLeft":20}}>Cancel</button>
              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateUser
