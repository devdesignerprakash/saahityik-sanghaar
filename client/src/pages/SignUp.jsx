import React from 'react'

const SignUp = () => {
  return (
    <div className='max-w-[800px] h-[500px] bg-gray-200 items-center justify-center m-auto shadow-lg rounded-md p-[10px]'>
        <div className='bg-white w-[100%] h-[100%]'>
           <form action="">
            <div>
                 <input type="text" placeholder='fullName' />
            <input type="text" placeholder='address' />
            <input type="email" placeholder='your email address' />
            </div>
            
            <div>
                <select>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            <input type="text" placeholder='userName' />
            </div>
            
           
            <button>submit</button>

           </form>
            

        </div>

        
    </div>
  )
}

export default SignUp