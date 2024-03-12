import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import './Movie.css'
import { Link } from 'react-router-dom';


const Movie = () => {
  const [movieTrailer, setMovieTrailer]=useState("")

  const[movieCast,setMovieCast]=useState([])
  const location=useLocation();

  const [showTrailer, setShowTrailer] = useState(false);


  const closeTrailer = () => {
    setShowTrailer(false);
  };


  const specificMovie=location.state.movie;
  const baseUrl="https://image.tmdb.org/t/p/original/"


 async function trailer(id){
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=9b764db919a88fa2c06b021b765ab835`)
    .then(res=>res.json())
    .then((d)=>{
      if(d.results && d.results.length > 0){
        setMovieTrailer(d.results[0].key)
        setShowTrailer(true);
      }
      else{
        alert('Trailer is not available at this moment')
      }
    })
  }

  async function movieCasts(id){
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=9b764db919a88fa2c06b021b765ab835`)
    .then(res=>res.json())
    .then(d=>setMovieCast(d.cast))
    console.log(movieCast);
  }

  return (
    <div className='Movie' style={{
      background:`url(https://image.tmdb.org/t/p/original/${specificMovie.backdrop_path})`,
      height:'100vh',
      width:'100%',
      backgroundSize:'cover',
      backgroundPosition:'center',
      backgroundRepeat:'no-repeat',
    }}>

      <h1 >{specificMovie.name || specificMovie.title}</h1>
      <div className='Image'>
      <img src={`https://image.tmdb.org/t/p/original/${specificMovie.poster_path}`} alt="" />
      <p>{specificMovie.overview}</p>

      </div>

      <div style={{background:'transparant'}} className='buttons'>
      <button className='play' onClick={()=>trailer(specificMovie.id)}>Play Trailer</button>
      <button className='play' onClick={()=>movieCasts(specificMovie.id)}>Cast</button>
      </div>
      <br />

      <div className='casts'>
      {
          movieCast.map((e)=>{
            return(
              <div key={e.cast_id} className='casts_images'>
                <Link to={`/cast/${e.cast_id}/${e.original_name}`}>
                <img src={`${baseUrl}${e.profile_path}`} style={{height:'150px', width:'150px'}}/>
                </Link>
              </div>
            )
          })
        }
      </div>

      {showTrailer && (
          <div className="trailer-modal">
            <div className="modal-content">
              <iframe
                title='YouTube Video'
                src={`https://www.youtube-nocookie.com/embed/${movieTrailer}`}
                frameBorder='0'
                allowFullScreen
              ></iframe>
              <button className="close-button" onClick={closeTrailer}>
                x
              </button>
            </div>
          </div>
        )}



    </div>
  )
}

export default Movie