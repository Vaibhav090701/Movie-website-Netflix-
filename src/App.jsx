import React from 'react'
import Row from './Components/Row'
import request from './Request'
import Header from './Components/Header'
import Movie from './Components/Movie'
import MovieCast from './Components/MovieCast'
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/movie' element={<Movie/>} > </Route>
          <Route path='/' element={<>
            <Header/>
            <Row title="Netflix Originals" fetchUrl={request.fetchNetflixOriginals} islargeRow></Row>
        <Row title="Trending Movies" fetchUrl={request.fetchTrending} islargeRow/>
        <Row title="Top Rated Movies" fetchUrl={request.fetchTopRated} islargeRow/>
        <Row title="Action Movies" fetchUrl={request.fetchActionMovies} islargeRow/>
        <Row title="Comedy Movies" fetchUrl={request.fetchComedyMovies} islargeRow/>
        <Row title="Horror Movies" fetchUrl={request.fetchHorrorMovies} islargeRow/>
        <Row title="Documentries" fetchUrl={request.fetchDocumentaries} islargeRow/>

</>}>
         </Route>

         <Route path='/cast/:castId/:castName' element={<MovieCast/>}></Route>

        </Routes>

      
      </BrowserRouter>
      


    </div>
  )
}

export default App
