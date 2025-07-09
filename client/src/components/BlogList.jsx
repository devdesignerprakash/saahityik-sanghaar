import React, { useContext, useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import axios from 'axios'


const BlogList = () => {
  const{token}=useContext(AuthContext)
useEffect(()=>{
  const fetchPublishedPost=async()=>{
    try{
      const response= await axios.get(`http://localhost:8000/api/post/getPublishedPost`,{
        withCredentials:true
      })
      // console.log(response)
      if(response?.data.length>0){
        console.log(response.data)
        setLiteratureMenu(response.data)
      }
      else{
        setLiteratureMenu([])
      }
    }catch(error){

    }
  }
  fetchPublishedPost()
},[token])


  const [selectedCategory, setSelectedCategory] = useState("सबै");
  const [literatureMenu,setLiteratureMenu] = useState([]);
  const categories = ["सबै", ...new Set(literatureMenu.map(item => item?.postType?.labelName))];
  console.log(literatureMenu)

  // Filter literature based on category selection
  const filteredLiterature = selectedCategory === "सबै" 
    ? literatureMenu 
    : literatureMenu.filter(item => item?.postType?.labelName === selectedCategory);
    const trimContent=(text)=>{
    if(!text) return "";
    const words= text.split(" ")
    return words.slice(0,40).join(" ")+(words.length>40?"....":"")

  }
  

  return (
    <>
      {/* Category buttons */}
      <div className="flex justify-center flex-wrap gap-4 mb-8">
       
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full font-semibold transition
              ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-100'}
            `}
          >
            {category}
          </button>
        ))}
      </div>

       {/* Cards Grid */}
       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {filteredLiterature.map((item) => (
          <div
            key={item?.postType?.lableName}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={item?.imageUrl}
              alt={item.title}
              className="w-full h-full object-fill"
            />
            <div className="p-4 flex flex-col flex-grow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">{item?.title}</h2>
                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full whitespace-nowrap">
                  {item?.postType?.labelName}
                </span>
              </div>
              <h3 className="text-gray-700 mb-2">लेखक: {item?.author}</h3>
              <p className="text-gray-600 flex-grow">{trimContent(item?.content)}</p>
              <Link
                to={`/blog/${item.title}`}
                className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-semibold"
                state={{postData:item}}
              >
                थप पढ्नुहोस् &rarr;
              </Link>
            </div>
          </div>
        ))}
         
      </div> 
    </>
  );
};

export default BlogList;
