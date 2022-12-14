import React, { useState, useEffect } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import UserService from '../services/UserService'

const DeleteUser = () => { 
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

  const cancel = () => {
    navigate("/")
  }

  const deleteUser = (e,id) => {
    e.preventDefault()
    console.log("delete user function" + id)
    UserService.deleteUser(id)
      .then((res) => {        
        console.log(res.data) 
        navigate("/")      
      })
      .catch((err) => {
        console.log(err)
      })
  }
 
  return (
    <div>
      <br />
      <div className='container'>
        <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3'>
            <h3 className='text-center'>Delete User</h3>
            <hr />
            <form>
              <div className='row'>  
                <div className='col-md-4 px-4'>              
                  <label><h6>Name:</h6></label>
                </div>
                <div className='col-md-8'>
                  {user.firstName+" "+user.lastName}
                </div>               
              <br /><br />
              </div >
              <div className='row'>  
                <div className='col-md-4 px-4'> 
                  <label><h6>Username:</h6></label>
                </div>
                <div className='col-md-8'>
                  {user.userName}
                  </div>                
                <br /><br />
              </div>
              <div className='row'>  
                <div className='col-md-4 px-4'> 
                  <label><h6>Email Id:</h6></label>
                </div>
                <div className='col-md-8'>
                  {user.emailId}
                </div>
                <br /><br />
              </div>
              <div className='row'>  
                <div className='col-md-4 px-4'>                
                  <label><h6>Mobile Number:</h6></label>
                </div>
                <div className='col-md-8'>
                  {user.mobileNo}
                  </div>
                <br /><br />
              </div>
              <div className='row'>  
                <div className='col-md-4 px-4'>
                  <label><h6>Address:</h6></label>
                </div>
                <div className='col-md-8'>
                  {user.address}
                </div>
                <br /><br />
              </div>
              <div>
                Are you sure you want to delete the User?
              </div>
              <br />
              <div className="row">
                <div className="col">
                  <button className='btn btn-danger' onClick={(e) => deleteUser(e,id)}>Delete</button>
                  <button className='btn btn-primary' onClick={(e) => cancel(e)} style={{ "marginLeft": 20 }}>Back</button>
                </div>
              </div>
              <br />
            </form>
            <br />           
          </div>          
        </div>
        <br />
      </div> 
    </div>
  )
}

export default DeleteUser
