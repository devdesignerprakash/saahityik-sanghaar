import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import { useState } from 'react'
import { FaPenFancy, FaTrash } from 'react-icons/fa';

const BlogTypes = () => {
    const {token}=useContext(AuthContext)
    const [postTypes,setPostTypes]=useState([])
    useEffect(()=>{
        const fetchTypes=async()=>{
            try{
                const response= await axios.get("http://localhost:8000/api/postType/getAllPostTypes",{
                headers:{
                    Authorization:`Bearer ${token.trim()}`
                }
             })
             setPostTypes(response.data)
            }
            catch(error){
                console.log(error.response.message)
            }
        }
        fetchTypes()

    },[])
  return (
    <>
    <div className="bg-white rounded-lg shadow-md p4 max-w-md mx-auto">
        
      <h2 className="text-xl font-bold mb-4 text-center"> साहित्यका प्रकारहरु </h2>
      <ul className="divide-y divide-gray-200">
        {postTypes.map((post, index) => (
          <li
            key={index}
            className="flex justify-between items-center py-2 px-4 hover:bg-gray-50 rounded"
          >
            <span className="text-lg text-gray-700">{post.labelName}</span>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onEdit(post)}
                className="text-blue-600 hover:text-blue-800"
                title="सम्पादन गर्नुहोस्"
              >
                <FaPenFancy />
              </button>
              <button
                onClick={() => onDelete(post)}
                className="text-red-600 hover:text-red-800"
                title="मेटाउनुहोस्"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
</>
  )
}

export default BlogTypes