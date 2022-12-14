import React, { useState, useEffect } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import UserService from '../services/UserService'

const ViewUser = () => { 
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
 
  return (
    <div>
      <br />
      <div className='container'>
        <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3'>
            <h3 className='text-center'>USER PROFILE</h3>
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
              <div className="row">
                <div className="col text-center">
                  <button className='btn btn-primary' onClick={(e) => cancel()}>Back</button>
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

export default ViewUser
