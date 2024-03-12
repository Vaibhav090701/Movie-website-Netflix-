
import React, { useEffect, useState } from 'react'
import axios from '../axios'
import './Row.css'
import { useNavigate } from 'react-router-dom'


    const Row = ({title,fetchUrl,islargeRow}) => {
    const[movie,setMovie]=useState([])
    const baseUrl="https://image.tmdb.org/t/p/original/"

    useEffect(()=>{
        async function fetchData(){
        const request=await axios.get(fetchUrl)
        setMovie(request.data.results)
        return request;
        }
        fetchData();
    },[fetchUrl]);
    const navigate=useNavigate()
    
  return (
    <div className='row'>
        <h1 className='text'>{title}</h1>
        <div  className='row_posters' style={{width: '100%', background:'transparent'}}>

        {movie.map((movie) => (
              <img key={movie.id} className={`row_poster ${islargeRow && 'row_posterLarge'}`}
               src={`${baseUrl}${islargeRow ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.name} onClick={()=>navigate('/movie',{state:{movie}})}/>

        ))}
        </div>
    </div>
  )    
}

export default Row



