import React,{useContext, useEffect, useState} from 'react'
import { Button,Modal,Card, CardBody } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { addcontestAPI, deleteProjectAPI, userProjectAPI } from '../Services/allAPI';
import { AddProjectResponseContext } from '../Context/contextshare';
import { BASE_URL } from '../Services/baseurl';
import projectPic from '../Assets/Screenshot 2023-10-27 112004.png'

function Contest() {
  const{addProjectResponse, setAddProjectResponse} = useContext(AddProjectResponseContext)
  const[username,setUsername] = useState("")
  const[contestImage,setContestImage] = useState({
    title:"",projectImage:""
  })
  const[preview,setPreview] = useState("")
  const[token,setToken] = useState("")
    const [show, setShow] = useState(false);
    const[userProjects,setUserProjects] = useState([])

    const getUserProjects = async()=>{
      if(sessionStorage.getItem("token")){
        const token = sessionStorage.getItem("token")
        const reqHeader = {
          "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
        }
        const result = await userProjectAPI(reqHeader)
        if(result.status===200){
          setUserProjects(result.data)
        }else{
          console.log(result);
          toast.warning(result.response.data)
        }
      }
    }

  const handleClose = () => {
    setShow(false);
    setContestImage({title:"",projectImage:""})
    setPreview("")
  }
  const handleShow = () => setShow(true);
 
// console.log(contestImage);
const handleAdd = async(e)=>{
  const{title,projectImage} = contestImage
  if(!title || !projectImage){
    toast.info("please fill the form completely!!!") 
  }else{
    const reqBody = new FormData()
    reqBody.append('title',title)
    reqBody.append('projectImage',projectImage)
   
   if(token){
     const reqHeader = {
      "Content-Type":"multipart/form-data",
      "Authorization":`Bearer ${token}`
    }

    const result = await addcontestAPI(reqBody,reqHeader)
    if(result.status==200){
      console.log(result.data);
      handleClose()
      alert("image added")
    }else{
      console.log(result);
    toast.warning(result.response.data);
    }
  }
    
  }

}

const handleDelete = async(id)=>{
  const token = sessionStorage.getItem("token")
  const reqHeader = {
    "Content-Type":"application/json",
"Authorization":`Bearer ${token}`
  }
  const result = await deleteProjectAPI(id,reqHeader)
  if(result.status===200){
    //page reload
    getUserProjects()
  }else{
    toast.error(result.response.data)
  }
}


  useEffect(()=>{
if(sessionStorage.getItem("existingUser")){
  setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
}
  })
  useEffect(()=>{
  if(contestImage.projectImage){
    setPreview(URL.createObjectURL(contestImage.projectImage))
  }
  },[contestImage.projectImage])
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }else{
      setToken("")
    }
    getUserProjects()
  },[addProjectResponse])
 
  return (
<>
        <div className='mb-5 mt-5 '>
    
        <Button variant="primary" onClick={handleShow}>
            Add Photo
          </Button>
          <div className='mt-5 mb-3 fw-bolder'>
          <p style={{fontSize:'30px',color:"black"}}> welcome <span style={{color:"green"}}> {username}</span></p>
          </div>
          {
          addProjectResponse.title ? <alert dismissible><span>{addProjectResponse.title}</span> added successfully</alert> : null
        }
    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add  Photo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div  style={{width:'100%',height:'400px'}} >
            
            <label>
               <input id='profile' type='file' style={{display:'none'}}  onChange={e=>setContestImage({...contestImage,projectImage:e.target.files[0]})} />
               <img  style={{width:'100%',height:'400px'}}  src={preview?preview :'https://cloudfront.slrlounge.com/wp-content/uploads/2018/07/Sean-LeBlanc-Photography-SLR-Lounge-3200x2137.jpg'} alt='noimage'/>
            </label>
           
       </div>
       <div className='d-flex justify-content-center' >
        <input className='border border-dark rounded mt-3 fw-bolder shadow' style={{height:'30px',width:'300px'}} type='text' placeholder='Title' value={contestImage.title} onChange={e=>setContestImage({...contestImage,title:e.target.value})}/>
       </div>

       </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleAdd}>
                Add
              </Button>
            </Modal.Footer>
          </Modal>
        
    
    
        </div>
        
        <div className='d-flex justify-content-between'>
       {userProjects?.length>0?userProjects.map(project=>(
       <Card className='shadow border border-dark ms-3 btn mb-5 mt-5 '  style={{width:'300px',height:'400px'}} >
      <Card.Img key={project} variant="top" style={{width:'100%',height:'400px'}} src={ project?`${BASE_URL}/uploads/${project?.projectImage}`:projectPic}  alt='no image'/>
      
      <CardBody>
        <p className='text-dark'>{project.title}</p>
        <Button className='mt-2 mb-2 bg-danger ' onClick={()=>handleDelete(project._id)}>Delete</Button></CardBody>
    </Card>)):
    <p>no images</p>
    }
        </div>
        <ToastContainer
      position='top-center'
      theme='colored'
      autoClose={2000}/>
</>
  )
}

export default Contest