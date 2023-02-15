
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {databases} from '../appwrite/appwriteConfig'

const UpdateTodo = ({id, todoData, close, setData}) => {

  const [titel, setTitle] = useState(todoData.todo)
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState(todoData.tasks)
  const [star, setStar] = useState(todoData.star)
  const [completed, setCompleted] = useState(todoData.completed)

  const removeTask = (index) => {
    setTasks( tasks.filter( (task, i) => i!==index) )
  }

  const addTask = (e) => {
    e.preventDefault()
    if (task === "") {
      toast.warn('Enter Task (task is empty) ', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    } else {
      setTasks([...tasks, task])
      setTask("")
    }
  }

  const update = async(e) => {
    e.preventDefault()
    if (titel === "" || tasks.length === 0) {
      return toast.warn('Title/Tasks missing', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    } 
    const promise = databases.updateDocument("62cb05f77a7c1fea3139", id, {
        todoName : titel,
        tasks,
        star,
        completed
    });
    promise.then(
        function (response) {
        toast.success('Updated Sucessfuly', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        setData(todoData.map( todo => {
            if (todo.$id === id ) {
                todo.todoName = titel
                todo.tasks = tasks
                todo.star = star
                todo.completed = completed
                return todo
            }
            return todo
        }) )
        }, 
        function (error) {
            console.log(error); 
        }
    );
    close()
    }

  return(
    <div>
      <form className=" text-lg container p-8 space-y-6 rounded-md shadow  bg-[#AFD344]">
        <button onClick={(e) => {e.preventDefault(); close()}} className="btn btn-circle absolute  top-0 right-0 mt-2 mr-2"  >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      
        <h2 className="w-full text-3xl font-bold leading-tight">Todo</h2>
        
        <div>
          <label className="block mb-1 ml-1">Title</label>
          <input value={titel} type="text" placeholder="Title"  onChange={e => setTitle(e.target.value)}  className="block w-full p-2 rounded border-2 bg-[#F3FBCE]" />
        </div>
        <div>
          <label className="block mb-1 ml-1">Task</label>
          <div className="flex">
            <input type="text" placeholder="Task" value={task} onChange={e => setTask(e.target.value)} className="block w-[80%] p-2 rounded border-2 bg-[#F3FBCE]"  />
            <button onClick={addTask} className=" px-2 py-2 w-[20%] font-bold rounded shadow text-white bg-blue-500 focus:outline-none hover:bg-blue-600 ">Add Task</button>
          </div>
        </div>
        <div>
          <label className="block mb-1 ml-1">Task Added</label>
          { tasks.map( (task,index) => (
            <div key={index}>
            <div className="flex rounded-lg border-lime-400 border-2  w-fit mt-1 bg-[#9EDEFD]"> <h3 className="px-3">{task}</h3> <span onClick={() => removeTask(index)} className="text-sm p-1">&#10006;</span></div>
            </div>))}
        </div>
        <div className="flex justify-end">
          { star ? (
            <div onClick={() => {setStar(!star)}} >
              <span style={{fontSize:"300%", color:"yellow"}}> &#9733; </span>
            </div>
          ) : (
            <div onClick={() => {setStar(!star)}} >
              <span style={{fontSize:"300%", color:"yellow"}}> &#9734; </span>
            </div>
          ) }

          { completed ? (
            <div onClick={() => {setCompleted(!completed)}} className='ml-8' >
              <span style={{fontSize:"300%", color:"Green"}}> &#10004;</span>
            </div>
            
          ) : (
            <div onClick={() => {setCompleted(!completed)}}  className='ml-8'>
            <span style={{fontSize:"300%", color:"green"}}> &#9744; </span>
            </div>
          ) }
        </div>
        <div className="text-right">
          <button onClick={update}  className=" px-4 py-2 font-bold rounded shadow text-white bg-blue-500 focus:outline-none hover:bg-blue-600 ">Update Todo</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default UpdateTodo