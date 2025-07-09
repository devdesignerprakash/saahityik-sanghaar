
import { useEffect } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import { useState } from 'react'
import { FaPenFancy, FaTrash } from 'react-icons/fa';
import AddOrEditType from '../../components/adminComponents/AddOrEditType'
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
const BlogTypes = () => {
  const navigate= useNavigate()
    const {token}=useContext(AuthContext)
    const [postTypes,setPostTypes]=useState([])
    const[postTypeToEdit,setPostTypeToEdit]=useState(null)
    const [openAddorEdit,setOpenAddorEdit]=useState(false)
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

    },[setPostTypes])
    const handleEdit=(postType)=>{
      setPostTypeToEdit(postType)
      setOpenAddorEdit(!openAddorEdit)
    }
    const handleAdd=()=>{
      setPostTypeToEdit(null)
      setOpenAddorEdit(!openAddorEdit)
    }
    const handleDeletePostType=async(postTypeId)=>{
       confirmAlert({
      title: "पोस्ट मेटाउन निश्चित हुनुहुन्छ?",
      message: "यो कार्य पछि फिर्ता गर्न सकिँदैन।",
      buttons: [
        {
          label: "हो",
          onClick: async () => {
            try {
              const response = await axios.delete(
                `http://localhost:8000/api/postType/deletePostType/${postTypeId}`,
                { headers: { Authorization: `Bearer ${token?.trim()}` } }
              );
              if (response.status === 200) {
                toast.success("सफलतापुर्वक हटाइयो");
              }

              setPostTypes((prev) => prev.filter((p) => p._id !== postTypeId));
            } catch (err) {
              console.error("Error deleting post:", err);
              setError("पोस्ट मेटाउन असफल भयो");
            }
          },
        },
        {
          label: "होईन",
          onClick: () => navigate("/admin/postTypes"),
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
      
      // try{
      //   const response= await axios.delete(`http://localhost:8000/api/postType/deletePostType/${postTypeId}`,{
      //     headers:{
      //       Authorization:`Bearer ${token.trim()}`
      //     }
      //   },{
      //     withCredentials:true
      //   })
        
      // }catch(error){
      // }
    }
  return (
    <>
    <div className="bg-white rounded-lg shadow-md p4 max-w-md mx-auto">
      <div className='flex items-center justify-end mt-1 p-4'>
        <button className='bg-blue-500 text-white text-sm font-bold p-[10px] items-center cursor-pointer rounded-sm mb-1'onClick={handleAdd}>+ नयाँ सिर्जना गर्नुहोस</button>
      </div>
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
                onClick={() => handleEdit(post)}
                className="text-blue-600 hover:text-blue-800"
                title="सम्पादन गर्नुहोस्"
              >
                <FaPenFancy />
              </button>
              <button
                onClick={() => handleDeletePostType(post._id)}
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
    {openAddorEdit&&
    <AddOrEditType onClose={setOpenAddorEdit} openAddorEdit={openAddorEdit} postTypeToEdit={postTypeToEdit}/>}
</>
  )
}

export default BlogTypes