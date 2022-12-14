import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Pagination from './Pagination'
import UserService from '../services/UserService'

const ListUsers = () => {
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(8)  

  useEffect(() => {
    UserService.getUsers()
      .then((res) => {
        setUsers(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = number => setCurrentPage(number) 
  console.log(currentPage)

  return (
    <div className='container'>
      <h2 className='text-center'>Users</h2>
      <Link to='/add'><button className='btn btn-primary'>Add User</button></Link>
      <table className="table table-hover">
        <thead className='thead-light'>
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
            currUsers.map(
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
                    <Link className="btn btn-info btn-sm px-2"  to={`/update/${user.id}`}>Update</Link>
                    <Link className="btn btn-secondary btn-sm px-2"  to={`/view/${user.id}`}>View</Link>
                    <Link className="btn btn-danger btn-sm px-2"  to={`/delete/${user.id}`}>Delete</Link>
                  </td>
                </tr>
            )
          }

        </tbody>
      </table>
     <br />
     <Pagination 
      usersPerPage={usersPerPage} 
      totalUsers={users.length} 
      paginate={paginate} 
    />
     <br /><br />
    </div>
  )
}

export default ListUsers