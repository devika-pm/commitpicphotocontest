import React,{useEffect, useState} from 'react'
import { Button ,Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Home() {
  const[loggedin,setLoggedin] = useState(false)

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setLoggedin(true)
    }else{
      setLoggedin(false)
    }
  },[])
  return (
   <>
        <div style={{backgroundImage:'url(https://t3.ftcdn.net/jpg/03/51/32/50/360_F_351325048_SNzPFn1qGEVtEqqoxw8SANC12IauVSYo.jpg)',backgroundRepeat:'no-repeat',backgroundSize:'210vh 110vh',width:'100%',height:'105vh'}}>
    
    
        <div className='d-flex justify-content-center align-items-center ' >
            <h2 className='d-flex justify-content-center mt-5 text-dark' style={{fontFamily:'cursive'}}>
                It's The Time To Do A Contest
            </h2>
    
        </div>
        
        { loggedin?
          <Link to={'/contest'}><Button className='mt-5 p-2 text-dark'>Start Contest</Button></Link>
          :
          <Link to={'/register'}><Button className='mt-5 p-2 text-dark'>Explore the contest</Button></Link>
        }
        <div className='mt-5'>
            <img style={{width:'300px',height:'200px',marginTop:'25vh'}} src='https://media2.giphy.com/avatars/72nattsu/HwVK5XEg1yoV.GIF' alt='no image'/>
        </div>
        </div>
        
        <div className='mt-5 mb-5' >
            <h3 className='mb-5' style={{fontFamily:'cursive',color:"black"}}>Some Special Pictures</h3>

           <div className='d-flex justify-content-between mb-5 me-3'>
           <Card className='shadow border border-dark  ms-3 btn '  style={{width:'300px',height:'300px'}} >
      <Card.Img variant="top" style={{width:'100%',height:'400px'}} src="https://kottke.org/plus/misc/images/sony-photo-2022-01.jpg" />
      
    </Card>
    <Card className='shadow border border-dark  ms-3 btn '  style={{width:'300px',height:'300px'}} >
      <Card.Img variant="top" style={{width:'100%',height:'400px'}} src="https://www.viewbug.com/media/mediafiles/2019/07/25/85730062_large1300.jpg" />
     
    </Card>
    <Card className='shadow border border-dark ms-3 btn '  style={{width:'300px',height:'300px'}} >
      <Card.Img variant="top" style={{width:'100%',height:'400px'}} src="https://cloudfront.slrlounge.com/wp-content/uploads/2018/07/Sean-LeBlanc-Photography-SLR-Lounge-3200x2137.jpg" />
     
    </Card>
    <Card className='shadow border border-dark ms-3 btn '  style={{width:'300px',height:'300px'}} >
      <Card.Img variant="top" style={{width:'100%',height:'400px'}} src="https://im.rediff.com/news/2015/feb/24wpo1.jpg" />
     
    </Card>
           </div>
        </div>
        <div>
            <img style={{width:'500px', height:'400px'}} alt='no img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQghGy_hUJnrJkN-u2JXIx6h1zB9WqnNDicnGF7LHtYwIPdzVOGTeZ5L0mfsr7cPz0WWLI&usqp=CAU'/>
        </div>
   </>
  )
}

export default Home