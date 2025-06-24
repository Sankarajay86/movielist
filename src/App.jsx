import { useState, useEffect } from 'react';
import './App.css';
import Search from './componats/Serach'; 

function App() {
  const [searchTerm, setSearchTerm] = useState('i am bat man');
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);

  const API_BASE_URL = 'https://api.themoviedb.org/3';
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjgyNDUyNGI2NTQzNDNlOTM2M2JhOGQ5NDQxNWI0ZiIsIm5iZiI6MTc1MDUyNjU0My42Niwic3ViIjoiNjg1NmVhNGY5MDM4ZTZkZjdiY2I0YTE5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.JDcGR4zC_c7SVnc0vJYvQzZCbaJqilIKLbsKWOYrtd4'
    }
  };

  const fetchMovies = async (query = '') => {
    try {
      const endpoint = query
      ? `${API_BASE_URL}/search/movie?query=${query}` 
      :`${API_BASE_URL}/discover/movie?&sort_by=popularity.desc`;
      const response = await fetch(endpoint, options);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      console.log(data); // check the movie results
      setMovies(data.results);   // save them in state
    } catch (error) {
      console.error(`error feching :${error}`);
      setError('Error fetching movies, please try again');
    }
  };

  useEffect(() => {
    fetchMovies(searchTerm);
    },[searchTerm]);

  return (
    <>
      <main>
        <div className='pattern'>
          <div className="wrapper">
            <header>
              <h1>
                Find <span className='text-gradient'>Movies</span> You'll Enjoy without the Hassle
              </h1>
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </header>

            <section className='all_movies'>
              <h2>All Movies</h2>
              {error && <p className="error text-red-500">{error}</p>}
                <div>
                  {movies.map(movie=>(
                    <div>

                    </div>
                  ))}
                </div>
              <div className="movie-grid">
                {movies.map(movie => (
                  <div key={movie.id} className="movie-card">
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <h3>{movie.title}</h3>
                    <h3>{movie.original_language}n</h3>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
