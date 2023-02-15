import React, {useState, useEffect} from 'react'
import {account} from '../appwrite/appwriteConfig'
import {useNavigate, Link} from 'react-router-dom'
import Avatar from "../Image/avatar.jpg"
import AddTodo from './AddTodo'
import TodosList from './TodosList'


function HomePage() {
    const navigate = useNavigate()

    const [userDetails, setUserDetails] = useState()
    const [data, setData] = useState([])

    useEffect(() => {
      const getData = account.get()
      getData.then(
        function(response){
            setUserDetails(response)
            const getTodos = databases.listDocuments("62cb05f77a7c1fea3139")
            getTodos.then(
                function(response){
                    setData(response.documents)
                },
                function(error){
                    console.log(error);
                }
            )
        },
        function(error){
            console.log(error);
        }
      )
    }, [])

    const handleLogout = async () => {
        try {
            await account.deleteSession("current")
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    const addTodo = (todo) => {
        setData([...data, todo])
    }

  return (
    <>
      {userDetails ? (
        <>
            <header className="text-gray-600 body-font bg-[#19E8D6]">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
                <div className="text-xl text-center">
                    <img className="rounded-full h-24" src={Avatar} alt ="Avatar"></img> 
                    {userDetails.name}
                </div>
                <div className="text-3xl"> My TODO App</div>
                <div className="text-xl text-center">
                    <button className="px-4 py-2 font-bold rounded bg-red-500 hover:bg-red-600 my-2 text-white" onClick={handleLogout}>Logout</button>
                </div>
                </div>
            </header>
            <AddTodo addTodo={addTodo}/>
            <TodosList todoData={data} setData={setData}/>
        </>
      ) : (
        <p className="mt-4">
          Please Login To see Home Page {" "}
          <Link to="/">
            <span className="bg-blue-300 p-2 cursor-pointer text-white rounded-md">
              Login
            </span>
          </Link>
        </p>
      )}
    </>
  )
}

export default HomePage
