import React, { useContext, useState } from 'react'
import { convertToNepaliUnicode } from '../../utils/preetiToUnicode'
import http from '../../utils/http'
import AuthContext from '../../context/AuthContext'
import { toast } from 'react-toastify'

const AddOrEditType = ({ onClose, openAddorEdit, postTypeToEdit }) => {
    const { token } = useContext(AuthContext)
    const [postType, setPostType] = useState({
        postType: postTypeToEdit?.postType || '',
        labelName: postTypeToEdit?.labelName || ''
    })

    const handleNepaliInputChange = (e) => {
        const { name, value } = e.target
        setPostType((prev) => ({
            ...prev,
            [name]: convertToNepaliUnicode(value),
        }))
    }
    
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setPostType((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    
    //add new post type
    const handleNewType = async () => {
        try {
            const response = await http.post('/api/postType/add-postType', postType)
            if (response.status == 201) {
                toast.success("साेहित्यको प्रकार सिर्जना भयो")
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
        }
    }

    const editPostType = async () => {
        try {
            const response = await http.put(`/api/postType/updatePostType/${postTypeToEdit._id}`, postType)
            if(response.status==200){
                toast.success('सफलापुर्वक सच्याईएको छ ।')
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    //both edit and add post type 
    const handleSubmit = (e) => {
        e.preventDefault(); // prevent page reload
        if (postTypeToEdit && postTypeToEdit.postType) {
            console.log("edit called")
            // Call your edit logic
            editPostType();
            onClose(!openAddorEdit)
        } else {
            // Call your create logic
            handleNewType();
            onClose(!openAddorEdit)
        }
    };
    
    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black opacity-30 z-40"></div>

            {/* Modal Container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="bg-white w-[500px] h-[300px] rounded-lg shadow-lg p-6 relative flex flex-col">

                    {/* ❌ Close Button */}
                    <button
                        className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl font-bold"
                        onClick={() => onClose(!openAddorEdit)}
                    >
                        ✖
                    </button>

                    <h1 className="text-xl font-bold mb-4 text-center">
                        {postTypeToEdit && postTypeToEdit?.postType
                            ? "साहित्यको प्रकार सच्याउनुहोस्"
                            : "नयाँ साहित्यको प्रकार सिर्जना गर्नुहोस्"}
                    </h1>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="साहित्यको प्रकार"
                            className="border p-2 rounded"
                            name='postType'
                            value={postType.postType}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Label Name"
                            className="border p-2 rounded"
                            name='labelName'
                            value={postType.labelName}
                            onChange={handleNepaliInputChange}
                            required
                        />
                        {postTypeToEdit && postTypeToEdit.postType ? (
                            <button
                                type="submit"
                                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                            >
                                सच्यानुहोस
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                            >
                                नयाँ सिर्जना गर्नुहोस
                            </button>
                        )}

                    </form>
                </div>
            </div>

        </>

    )
}

export default AddOrEditType