import React from 'react'
import { Navbar ,Container ,Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <Navbar  className="bg-primary">
    <Container>
      <Navbar.Brand  style={{fontSize:'30px'}}>
      <Link to={'/'} style={{textDecoration:'none',color:'black'}} className='fw-bolder fs-4'><i className="fa-solid fa-camera me-2"></i>Photo Contest</Link>
      </Navbar.Brand>

     <Button className=' fw-bolder text-light border rounded border-dark bg-dark  '>
        LOGOUT
      </Button>

    </Container>
  </Navbar>
  )
}

export default Header