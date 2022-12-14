import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import UserService from '../services/UserService'

const UpdateUser = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: { firstName: "", lastName: "", userName:"", emailId: "", mobileNo:" ", address:" " }
  })  
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    UserService.viewUser(id)
      .then((res) => {
        reset(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id, reset])

  const updateUser = (data) => {
    console.log(data)
    UserService.updateUser(id, data)
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
            <form onSubmit={handleSubmit(updateUser)}>
              <div className='row'>
                <div className='col-md-6'>
                  <label>First Name:<span className='required-star' >*</span></label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter First Name'
                    // defaultValue={user.firstName}
                    {...register("firstName",
                      { required: "*First name is required" }
                    )}

                  />
                </div>
                <div className='col-md-6'>
                  <label>Last Name:<span className='required-star' >*</span></label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter last Name'
                    // defaultValue={user.lastName}
                    {...register("lastName",
                      { required: "*Last name is required" }
                    )}
                  />
                </div>
              </div>
              <p>{errors.firstName?.message || errors.lastName?.message}</p>
              <div>
                <label>User Name:<span className='required-star' >*</span></label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter username'
                  required
                  // defaultValue={user.userName}
                  {...register("userName")}
                  disabled
                />
              </div>
              <div>
                <label>Email Id:<span className='required-star' >*</span></label>
                <input
                  type='email'
                  className='form-control'
                  placeholder='Enter Email Id'
                  // defaultValue={user.emailId}
                  {...register("emailId",
                    { required: "*Email Id is required" }
                  )}
                />
              </div>
              <p>{errors.emailId?.message}</p>
              <div>
                <label>Mobile Number:<span className='required-star' >*</span></label>
                <input
                  type='number'
                  className='form-control'
                  placeholder='Enter Mobile Number'
                  // defaultValue={user.mobileNo}
                  {...register("mobileNo",
                    {
                      required: "*Mobile Number is required",
                      minLength: {
                        value: 10,
                        message: "*Mobile Number should contain 10-11 digits"
                      },
                      maxLength: {
                        value: 11,
                        message: "*Mobile Number should contain 10-11 digits"
                      }
                    }
                  )}
                />
              </div>
              <p>{errors.mobileNo?.message}</p>
              <div>
                <label>Address:<span className='required-star' >*</span></label>
                <textarea
                  type='text'
                  className='form-control'
                  placeholder='Enter address'
                  // defaultValue={user.address}
                  {...register("address",
                    { required: "*Address is required" }
                  )}
                />
              </div>
              <p>{errors.address?.message}</p>
              <div>
                <button className='btn btn-primary' type='submit' >Submit</button>
                <button className='btn btn-danger' onClick={(e) => cancel()} style={{ "marginLeft": 20 }}>Cancel</button>
                <br />
              </div>
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
