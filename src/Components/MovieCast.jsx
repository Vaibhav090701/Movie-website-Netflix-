import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './MovieCast.css'

const MovieCast = () => {
    const {castId, castName}=useParams()
    const[castDtl,setCastDtl]=useState([])

    const API_KEY="9b764db919a88fa2c06b021b765ab835"
    const baseUrl="https://image.tmdb.org/t/p/original/"

    useEffect(()=>{
        async function fetchCastDetails(){
            const getData=await axios.get(`https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&include_adult=false&language=en-US&page=1&query=${castName}`)
            setCastDtl(getData.data.results)
        }
        fetchCastDetails()
    }, [castId] )
  return (
    <div className='cast'>
        {
            castDtl.slice(0,1).map((e)=>{
                return(
                    <div key={e.id}>
                        <div className='cast_Container'>
                        <div className='cast_Image'>
                            <img src={`${baseUrl}${e.profile_path}`} alt="" />
                        </div>
                        <div className='cast_Content'>
                            <h1><span style={{color:'grey'}}>Name: {e.name}</span></h1>
                            <h1><span style={{color:'grey'}}>Occupation: {e.known_for_department}</span></h1>
                        </div>
                        </div>
                        <h1 className='heading'>Popular Movies</h1>
                        <br />
                        <div className='cast_details'>
                            <div className='cast_movies'>
                            <img src={`${baseUrl}${e.known_for[0].poster_path}`} alt="" />
                            <h3  style={{color:'grey'}}>{e.known_for[0].title}</h3>
                            </div>


                            <div className='cast_movies'>
                            <img src={`${baseUrl}${e.known_for[1].poster_path}`} alt="" />
                            <h3  style={{color:'grey'}}>{e.known_for[1].title}</h3>
                            </div>


                            <div className='cast_movies'>
                            <img src={`${baseUrl}${e.known_for[2].poster_path}`} alt="" />
                            <h3 style={{color:'grey'}}>{e.known_for[2].title}</h3>

                            </div>


                         </div>


                        </div>

                    
                )
            })
        }

    </div>
  )
}

export default MovieCast