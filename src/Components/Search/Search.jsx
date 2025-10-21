import React from 'react'

function Search({setOpenSearch}) {
  return (
    <div>
        Search <button onClick={() => setOpenSearch(false)}>CS</button>
    </div>
  )
}

export default Search