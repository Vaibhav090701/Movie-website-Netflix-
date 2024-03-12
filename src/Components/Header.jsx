
import React, { useEffect, useState } from 'react';
import axios from '../axios';
import './Header.css';
import requests from '../Request';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';

const Header = () => {
  const [movie, setMovie] = useState({});
  const [movieTrailer, setMovieTrailer]=useState("")
  const[movieCast,setMovieCast]=useState([])
  const baseUrl="https://image.tmdb.org/t/p/original/"

  const [showTrailer, setShowTrailer] = useState(false);


  const closeTrailer = () => {
    setShowTrailer(false);
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
      return request;
    }
    fetchData();
  }, []);

  async function trailer(id) {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=9b764db919a88fa2c06b021b765ab835`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setMovieTrailer(data.results[0].key);
          setShowTrailer(true);
        } else {
          alert('Trailer is not available at this moment')
        }
      })

  }
  
  async function movieCasts(id) {
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=9b764db919a88fa2c06b021b765ab835`)
      .then((res) => res.json())
      .then((data) => {
        if(data.cast){
        setMovieCast(data.cast);
        console.log(data.cast);
      }else{
        alert('Cast is not available at this moment')
      }
    })
  }

  return (
    <div className='Header'>
      <header className='banner' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` }}>
        <div className='banner_contents'>
          <h1 className='banner_title'>{movie.original_name || movie.name || movie.title}</h1>
          <div className='banner_button'>
            <button onClick={()=>trailer(movie.id)}>Play Trailer</button>
            <button onClick={()=>movieCasts(movie.id)}>Cast</button>
          </div>
          <div className='banner_description'>
            <h2>{movie.overview}</h2>
            <br />
          </div>
          <hr />
          <div className='casts'>
            {
              movieCast.map((e)=>{                  
                return(
                  <div key={e.cast_id} className='casts_images'>
                    <Link to={`/cast/${e.cast_id}/${e.original_name}`}>
                    <img src={`${baseUrl}${e.profile_path}`}/>
                    </Link>
                  </div>
                )
              })
           }
          </div>
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

      </header>
    </div>
  );
};

export default Header;
