// import React from "react";
// import propTypes from "prop-types";

// // function Food({ name, picture, rating }) {
// //   //console.log(props.fav);
// //   return (
// //     <div>
// //       <h2>I like {name}</h2>
// //       <h4>{rating}/5.0</h4>
// //       <img src={picture} alt={name} />
// //     </div>
// //   );
// // }

// // const foodILike = [
// //   {
// //     id: 1,
// //     name: "kimchi",
// //     image: "https://img.koreatimes.co.kr/upload/newsV2/images/202106/88dbf0524fd74259b2d00f6cd7341349.jpg/dims/resize/740/optimize",
// //     //rating: 4.3
// //   },
// //   {
// //     id: 2,
// //     name: "ramen",
// //     image: "https://www.elmundoeats.com/wp-content/uploads/2021/02/FP-Quick-30-minutes-chicken-ramen.jpg",
// //     rating: 4.5
// //   },
// //   {
// //     id: 3,
// //     name: "chicken",
// //     image: "https://www.seriouseats.com/thmb/t82X6N4ZwGkFZmWPuCjwT-osL3g=/1500x844/smart/filters:no_upscale()/20210714-potato-starch-fried-chicken-vicky-wasik-seriouseats-20-17e193a6bf274bba9091810a0b18ef89.jpg",
// //     rating: 5
// //   }
// // ]

// // Food.propTypes = {
// //   name: propTypes.string.isRequired,
// //   picture: propTypes.number.isRequired,
// //   rating: propTypes.number
// // };

// // function renderFood(dish) {
// //   console.log(dish)
// //   return <Food name={dish.name} picture={dish.image} />
// // }
// // function App() {
// //   return (
// //     <div>
// //       {foodILike.map(dish => (
// //         <Food
// //           key={dish.id}
// //           name={dish.name}
// //           picture={dish.image}
// //           rating={dish.rating}
// //         />
// //       ))}
// //     </div>
// //     // <div>
// //     //   {console.log(foodILike.map(renderFood))}
// //     //   {foodILike.map(renderFood)}
// //     // </div>
// //   );
// // }

// export default App;


// import React from "react";

// class App extends React.Component {
//   state = {
//     count: 0
//   };
//   add = () => {
//     //console.log("add");

//     //bad way
//     //this.setState({count: this.state.count + 1});
//     this.setState(current => ({count: current.count + 1}));
//   };
//   minus = () => {
//     //console.log("minus");
//     this.setState({count: this.state.count - 1});
//   };
//   render() {
//     return (
//       <div>
//         <h1>The number is: {this.state.count}</h1>
//         <button onClick={this.add}>Add</button>
//         <button onClick={this.minus}>Minus</button>
//       </div>
//     )
//   }
// }

// export default App;

/////////////////11.2/////////////////////////////
// import React from "react";

// class App extends React.Component {
//   constructor(props){
//     super(props);
//     console.log("hello");
//   }
//   state = {
//     count: 0
//   };
//   add = () => {
//     this.setState(current => ({count: current.count + 1}));
//   };
//   minus = () => {
//     this.setState(current => ({count: current.count - 1}));
//   };
//   componentDidMount(){
//     console.log("component rendered");
//   }
//   componentDidUpdate(){
//     console.log("I just updated");
//   }
//   componentWillUnmount(){
//     console.log("Goodbyem cruel world");
//   }
//   render() {
//     console.log("I'm rendering");

//     return (
//       <div>
//         <h1>The number is: {this.state.count}</h1>
//         <button onClick={this.add}>Add</button>
//         <button onClick={this.minus}>Minus</button>
//       </div>
//     )
//   }
// }

// export default App;



// ////////////////////11.3/////////////////////////////
// import React from "react";

// class App extends React.Component {
//   state = {
//     isLoading: true,
//     movies:[]
//   };
//   componentDidMount(){
//     setTimeout(() =>{
//       this.setState({isLoading:false});
//     }, 6000);
//   }
//   render() {
//     const{isLoading} = this.state;
//     return <div>{this.state.isLoading ? "Loading":"We are ready"}</div>;
//   }
// }

// export default App;

////////////////////12.0/////////////////////////////
import React from "react";
import axios from "axios";
import Movie from "./Movie";
import './App.css';

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };
  getMovies = async () => {
    //////////////조금 구린 표현/////////////////////
    // const movies = await axios.get("https://yts-proxy.now.sh/list_movies.json");
    // console.log(movies.data.data.movies);
    //////////////es6버전 cleaner표현식///////////////
    const {
      data: {
        data: { movies },
      },
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    this.setState({ movies, isLoading: false });
  };
  componentDidMount() {
    this.getMovies();
  }
  render() {
    const { isLoading, movies } = this.state;
    return (
      <section class="container">
        {isLoading ? (
          <div class="loader">
            <span class="loader__text">Loading..</span>
          </div>
        ) : (
          <div class="movies">
            {movies.map(movie => (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                />
              ))}
          </div>
        )}
      </section>
    );
  }
}

export default App;