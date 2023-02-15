import React, {useState} from 'react'
import {account} from '../appwrite/appwriteConfig'
import {useNavigate} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState("")

  //Signup 
  const submit = async(e) => {
    e.preventDefault()
    if (!(name && email && password)) {
      return toast.warn('Please Enter all fields', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
    if (!(password === rePassword)) {
      return toast.warn('Password does not match. Re-Enter the password', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
    const promise = account.create(
      uuidv4(),
      email,
      password,
      name
      );
    promise.then(
      function(response){
          // console.log(response);
          toast.success('User Created Successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
          setName('')
          setEmail('')
          setPassword('')
          setRePassword('')
          navigate("/profile") //success
      },
      function(error) {
          // console.log(error); // Failure
          toast.error(error, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            })
      }
    )
  }

  const goToLogin = (e) => {
    e.preventDefault()
    navigate("/")
  }

  return (
    <div className="flex items-center justify-center h-screen  bg-[#CFFCE8]">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl  ">
          <h1 className="text-2xl font-bold text-center">Sign Up</h1>
          <form action="" className="space-y-6 ng-untouched ng-pristine ng-valid">
            <div className="space-y-1 text-sm">
                <label className="block ">Name</label>
                <input value={name} onChange={e => setName(e.target.value)} type="text" name="name" id="name" placeholder="Name" className="w-full px-4 py-3 rounded-md  border-2 " />
            </div>
            <div className="space-y-1 text-sm">
                <label className="block ">Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} type="emali" name="email" id="email" placeholder="Email" className="w-full px-4 py-3 rounded-md border-2 " />
            </div>
        <div className="space-y-1 text-sm">
                <label className="block ">Password</label>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md border-2 " />
            </div>
        <div className="space-y-1 text-sm">
                <label className="block d">Re-enter Password</label>
                <input value={rePassword} onChange={e => setRePassword(e.target.value)} type="password" name="repassword" id="repassword" placeholder="Password" className="w-full px-4 py-3 rounded-md border-2 " />
            </div>
            <button onClick={submit} className="block w-full p-3 text-center rounded-sm text-white focus:outline-none  bg-[#10ABAC]  hover:bg-[#0B8390] rounded ">Sign up</button>
          </form>
        <p className="text-xs text-center sm:px-6 d">Already have a account ?
            <span className="underline " onClick={goToLogin} > Login</span>
        </p>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Signup