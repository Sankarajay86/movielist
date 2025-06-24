import { useState } from 'react'
const Search=(props)=>
{

return(
    <div>
        <input type="text" placeholder='serch the movies' className='text-white bgcolor-white' 
        onChange={(e)=>props.setSearchTerm(e.target.value)} />
        <h1 className='texe-white'>{props.searchTerm}</h1>
    </div>
)
}
export default Search;