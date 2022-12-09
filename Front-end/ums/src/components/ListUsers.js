import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserService from '../services/UserService'

const ListUsers = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    UserService.getUsers()
      .then((res) => {
        setUsers(res.data)
        // console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  

  return (
    <div className='container'>
      <h2 className='text-center'>ListUsers</h2>
      <Link to='/add'><button className='btn btn-primary'>Add User</button></Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">User Name</th>
            <th scope="col">Email Id</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Address</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(
              user =>
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.userName}</td>
                  <td>{user.emailId}</td>
                  <td>{user.mobileNo}</td>
                  <td>{user.address}</td>
                  <td>
                    <Link to={`/update/${user.id}`}><h6>Update</h6></Link>
                    <Link to={`/view/${user.id}`}><h6>View</h6></Link>
                    <Link to={`/delete/${user.id}`}><h6>Delete</h6></Link>
                  </td>
                </tr>
            )
          }

        </tbody>
      </table>
      <nav aria-label="...">
        <ul className="pagination">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabIndex="-1">Previous</a>
          </li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item active">
            <a className="page-link" href="#">2 <span className="sr-only">(current)</span></a>
          </li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default ListUsers