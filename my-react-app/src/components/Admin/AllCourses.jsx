import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../Context/App_Context';
import Swal from 'sweetalert2';
import { BeatLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom"


// import './myinfo.css'

export function AllCourses() {
  const { API_base_url, setPageTitle, getStoredToken} = useContext(AppContext)
  const [apiReturnedData, setApiReturnedData] = useState([]);
  const [renderProcessedApiReturnedData, setRrenderProcessedApiReturnedData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  let tempFetchData  = useRef( )
  let tempHandleEditCourse  = useRef( )
  let tempHandleDelete  = useRef( )

  
  useEffect(() => {
    setPageTitle('COURSES')
    return () => {
    };
  }, [ setPageTitle ]);


         // THE SEARCH STARTS
         const fetchSearchData = async () => {
          setIsLoading(true)
      
      
          let url = `${API_base_url}api/v1/enquiries/searchenquiries?search=${search}`
          try {
            const response = await fetch(url , {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${getStoredToken()}`,
              },
              // body: JSON.stringify(formData),
            })
            const data = await response.json();
            if(data.status === 'success'){
              data.data && setApiReturnedData(data.data.reverse())
              setIsLoading(false)
            }
            else{
              setIsLoading(false)
              throw Error('could not fetch the data for that resource, '+data.message)
            }
            
          } catch (error) {
            // Handle any errors
            Swal.fire(error)
            console.error('Request failed:', error);
          }
        }
      
      
        const handleSearch = async (e) => {
          e.preventDefault();
          fetchSearchData()
        }
        // THE SEARCH ENDS


  const modifyclass = (targetClass) => {
    document.querySelector(`.${targetClass}`).classList.add("deletedChild")
  }

  const handleDelete = async (targetCourseId) => {
    try {
        const response = await fetch(`${API_base_url}api/v1/courses/${targetCourseId}`, {
            method: 'DELETE',
            headers: {
              // 'Content-Type': 'application/json',
              'authorization': `Bearer ${getStoredToken()}`
            },
            // body: formData,
          });

          const data = await response.json();
          if(data.status === 'success'){
            Swal.fire('Course deleted successfully');
            modifyclass(`cls${targetCourseId}`);
          }
          else{
            Swal.fire('Course deleted failed');
          }

    } catch (error) {
      // Handle any errors
      console.error('Delete failed:', error);
    }
    setIsLoading(false);
  };


  const fetchData = async () => {
    setIsLoading(true)
    let url = `${API_base_url}api/v1/courses`
    try {
      const response = await fetch(url , {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${getStoredToken()}`,
        },
        // body: JSON.stringify(formData),
      })
      const data = await response.json();
      if(data.status === 'success'){
        data.data && setApiReturnedData(data.data)
        console.log('active students')
        console.log(data.data)
        setIsLoading(false)
      }
      else{
        setIsLoading(false)
        throw Error('could not fetch the data for that resource, '+data.message)
      }
      
    } catch (error) {
      // Handle any errors
      Swal.fire(error)
      console.error('Request failed:', error);
    }
  }


  tempFetchData.current = fetchData
  useEffect(() => {
    tempFetchData.current()
    return () => {
    };
  }, [ ]); 


  // const refreshPage = () => {
  //   window.location.reload(false);
  // }



  const handleEditCourse = (targetUserrId) => {
    navigate(`/admin/editcourse?targetCourseId=${targetUserrId}`)
  }
  tempHandleEditCourse.current = handleEditCourse
  tempHandleDelete.current = handleDelete
  useEffect(() => {
    let processed = <h3 className=" centerMe myspans" >No records yet! </h3>
    apiReturnedData.length > 0 && (processed = apiReturnedData.map((data) => {

      let EditIcon = <svg xmlns="http://www.w3.org/2000/svg" className='userbodyicon cursorPointer' viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1"/><path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3l8.385-8.415zM16 5l3 3"/></g></svg>
      let CourseImage = <svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 16 16"><path fill="currentColor" d="M1 2.828c.885-.37 2.154-.769 3.388-.893c1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493c-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752c1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81c-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02c1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877c1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/></svg>
      let DeleteIcon = <svg xmlns="http://www.w3.org/2000/svg" className='userbodyicon cursorPointer' viewBox="0 0 24 24"><path fill="currentColor" d="M16 1.75V3h5.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75Zm-6.5 0V3h5V1.75a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25ZM4.997 6.178a.75.75 0 1 0-1.493.144L4.916 20.92a1.75 1.75 0 0 0 1.742 1.58h10.684a1.75 1.75 0 0 0 1.742-1.581l1.413-14.597a.75.75 0 0 0-1.494-.144l-1.412 14.596a.25.25 0 0 1-.249.226H6.658a.25.25 0 0 1-.249-.226L4.997 6.178Z"/><path fill="currentColor" d="M9.206 7.501a.75.75 0 0 1 .793.705l.5 8.5A.75.75 0 1 1 9 16.794l-.5-8.5a.75.75 0 0 1 .705-.793Zm6.293.793A.75.75 0 1 0 14 8.206l-.5 8.5a.75.75 0 0 0 1.498.088l.5-8.5Z"/></svg>
      if(data.file && data.file.filePath !== undefined){
        CourseImage = <img  width="60px" height="60px" src={API_base_url+data.file.filePath} alt="Profile pixels" />
      } 



      return(
            <div className={`son3x myspans Overideflexdirection1ToRow`}  key={data._id}>
              <div className={`Overideflexdirection1ToRow`} >
                <div role="button" className='gobackpad centerMe'>
                  { CourseImage }  
                </div>
                <div>
                  <strong>{data.courseName}</strong> <br />  {data.courseCode} <br /> {data.description}<br /> {data.Availability}
                  <br /><strong>Cost</strong> :{data.cost}
                </div>
              </div>
              <div className=" Overideflexdirection1ToCol"  title='View this user profile' >
                <br />
                <div role="button" onClick={() => tempHandleEditCourse.current(data._id) } title='Edit course' >
                { EditIcon } 
                </div>
                <br />
                <div className={`cls${data._id}`} role="button"  onClick={() => {if(window.confirm('Delete this course?')){tempHandleDelete.current(data._id)} }} title='Delete course' >
                { DeleteIcon } 
                </div>
              </div>
            </div>
      )
    
    })
    )
    setRrenderProcessedApiReturnedData(processed)
    return () => {
    };
}, [ apiReturnedData ]);  

   
  return (<>

    <div className="myheader">
    </div>
    <div >



      {isLoading ? (
        <h3 className=" centerMe" >{isLoading && <BeatLoader color='green' loading={isLoading} size={8} /> }</h3>
      ) : (
        <div className="just_a_container">
          <div className="main_flex_container centerMe">
            <div className=" son3x myspans" id='Overideflexdirection1ToRow'>
            <><span role="button" title='Create new course'>
              <Link to="../createcourse">
                  <svg xmlns="http://www.w3.org/2000/svg"  className='userbodyicon cursorPointer' viewBox="0 0 24 24"><path fill="currentColor" d="M12 4c4.411 0 8 3.589 8 8s-3.589 8-8 8s-8-3.589-8-8s3.589-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2zm5 9h-4V7h-2v4H7v2h4v4h2v-4h4v-2z"/></svg>
                </Link>            
              </span>
              <input type="text" name='search' className="searchinput cursorText margin5pxRight margin5pxleft" placeholder='Search enquiry by email, name or phone' value={search} onChange={(e) => setSearch(e.target.value)} required />
              <span title='Search' onClick={ handleSearch }> 
                <svg xmlns="http://www.w3.org/2000/svg"  className='userbodyicon cursorPointer'  viewBox="0 0 17 13"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.92" cy="5.92" r="5.42"/><path d="M13.5 13.5L9.75 9.75"/></g></svg>
              </span>
            </>


            </div>
            {renderProcessedApiReturnedData}
          </div>
        </div>
      )
      }
  </div>
  
  
  </>)
}
