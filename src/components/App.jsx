import React from "react";
import MovieItem from "./movieItem";
import MovieTabs from "./MovieTabs";

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            movies: [],
          moviesWillWatch: [],
            sort_by: 'revenue.desc'
        };
    }

    componentDidMount() {
        this.getMovies()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.sort_by !== this.state.sort_by){
            this.getMovies()
        }
    }

    getMovies = ()=>{
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=3f4ca4f3a9750da53450646ced312397&sort_by=${this.state.sort_by}`).then((response)=>{
            console.log('then');
            return response.json()
        }).then((data)=>{
            console.log('data', data);
            this.setState({
                movies: data.results
            })
        })
    };
    removeMovie = (movie) => {
        const updateMovies = this.state.movies.filter((item) => {
            return item.id !== movie.id;
        });
        console.log(updateMovies);
        this.setState({
            movies: updateMovies
        })
    };

    addMovieToWillWatch = (movie)=>{
    console.log(movie);
      const updateWillWatch = [...this.state.moviesWillWatch, movie];
      this.setState({
        moviesWillWatch: updateWillWatch
      })
    };

    removeMovieWillWatch = (movie) => {
        const updateWillWatch = this.state.moviesWillWatch.filter((item) => {
            return item.id !== movie.id;
        });
        this.setState({
            moviesWillWatch: updateWillWatch
        })
    };

    updateSortBy = value =>{
        this.setState({
            sort_by: value
        })
    };

    render() {
        console.log('render',this.state, this);
        return <div className='container'>
        <div className='row'>
        <div className='col-9'>
          <div className="row mb-5 mt-3">
              <div className="col-12">
                  <MovieTabs sort_by={this.state.sort_by} updateSortBy={this.updateSortBy}/>
              </div>
          </div>
          <div className="row">

            {this.state.movies.map(movie => {
                return(
                    <div className='col-6 mb-4' key={movie.id}>
                      <MovieItem
                          movie={movie}
                          removeMovie={this.removeMovie}
                          addMovieToWillWatch={this.addMovieToWillWatch}
                          removeMovieWillWatch={this.removeMovieWillWatch}
                      />
                    </div>
                )
            })}
          </div>
        </div>
          <div className='col-3 mt-3'>
            <p>Will Watch: {this.state.moviesWillWatch.length}</p>
          </div>
        </div>
        </div>
    }
}

// function App() {
//   return <div>{moviesData[0].title}</div>;
// }

export default App;
