import React from 'react'

function Loader() {
  return (
    <div className="flex justify-center items-center py-3 mb-5 h-60">
      <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-sky-400" />
    </div>
  )
}

export default Loader