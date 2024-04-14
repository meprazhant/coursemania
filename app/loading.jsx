import React from 'react'

function loading() {
  return (
    <div className='dark:bg-dark bg-white h-screen flex justify-center items-center'>
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400 border-violet-600"></div>
    </div>
  )
}

export default loading