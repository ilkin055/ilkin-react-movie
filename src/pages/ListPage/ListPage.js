import React, { Component } from "react";
import "./ListPage.css";
import { connect } from "react-redux";
import { getList, getMovieInfoByImdbID } from "../../redux/actions";
class ListPage extends Component {
  state = {
    isClicked: false,
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id);
    this.props.getList(id);
    
  }

  render() {
    console.log(this.props);
    return (
      <div className="list-page">
        
        <h1 className="list-page__title">MY list</h1>
        <ul>
          {this.props.movieDetails.map((item) => {
            return (
              <li key={item.imdbID} className="list-page__single-movie">
                
                <div className="info">
                  
                  
                  
                  
                  <div className="list-page__details-value">
                    <ul className="movie-item__info-list">
                      
                      <li id="movie-item__info-item">
                        
                          <a
                            href={`https://www.imdb.com/title/${item.imdbID}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="list-page__link-imdb"
                          >
                            <h3 className="movie-item__title">{item.Title}</h3>
                          </a>
                       
                      </li>
                    </ul>
                    
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getList: (id) => dispatch(getList(id)),
  getMovieInfoByImdbID: (listMovies) =>
    dispatch(getMovieInfoByImdbID(listMovies)),
});

const mapStateToProps = (state) => {
  return {
    title: state.title,
    movieDetails: state.movieDetails,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
