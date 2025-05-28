"use client"
import ToDo from "@/Components/ToDo";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';


export default function Home() {
  const [formData,setFormData] = useState({
    title:"",
    description:"",
  })

  const[todoData,setTodoData] = useState([])

  const fetchTodos = async () => {
    const response = await axios('/api')
    setTodoData(response.data.todos)
  }

  const deleteTodo = async (id) => {
      const response = await axios.delete('/api',{
        params:{
          mongoId:id
        }
      })
      toast.success(response.data.msg)
      fetchTodos()
  }

  const completedTodo = async (id) => {
      const response = await axios.put('/api',{},{
        params:{
          mongoId:id
        }
      })
      toast.success(response.data.msg)
      fetchTodos()
  }

  useEffect(() => {
    fetchTodos()
  }, []);

  const onChangeHandler = (e) => {
    const name = e.target.name; 
    const value = e.target.value; 
    setFormData(form => ({...form,[name]:value}))                                                                                            
    console.log(formData); 
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post('/api',formData)
      toast.success(response.data.msg)
      setFormData(
        {
          title:"",
          description:"",
        }
      )
      await fetchTodos()
    } catch (error) {
      toast.error("Error")
    }
  } 
  return (
   <>
   <ToastContainer/>
   <form onSubmit={onSubmitHandler} className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto">
  <input
    value={formData.title}
    onChange={onChangeHandler}
    type="text"
    name="title"
    placeholder="Enter Title"
    className="px-3 py-2 border-2 border-gray-200 w-full"
  />
  <textarea
    value={formData.description}
    onChange={onChangeHandler}
    name="description"
    placeholder="Enter Description"
    className="px-3 py-2 border-2 border-gray-200 w-full"
  ></textarea>
  <button type="submit" className="bg-orange-600 py-3 px-11 text-white font-extrabold">
    Add Todo
  </button>
</form>



<div className="relative overflow-x-auto mt-24 mx-auto w-[60%]">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-200 dark:text-black">
            <tr>
                <th scope="col" className="px-6 py-3">
                    ID
                </th>
                <th scope="col" className="px-6 py-3">
                    TiTLE
                </th>
                <th scope="col" className="px-6 py-3">
                    DESCRIPTION
                </th>
                <th scope="col" className="px-6 py-3">
                    STATUS 
                </th>
                <th scope="col" className="px-6 py-3">
                    ACTION
                </th>
            </tr>
        </thead>
        <tbody> 
           {todoData.map((item,index) => {
                return <ToDo key={index} id={index} title={item.title} description={item.description} complete={item.isCompleted} mongoId={item._id} deleteTodo={deleteTodo} completedTodo={completedTodo}/>
           })}
        </tbody> 
    </table>
</div>


   </>
  );
}
