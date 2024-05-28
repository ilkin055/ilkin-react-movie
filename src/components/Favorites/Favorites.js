import React, { Component } from "react";

import "./Favorites.css";
import { connect } from "react-redux";
import { removeMovieFromFavoriteList, postList } from "../../redux/actions";
import { Link } from "react-router-dom";

class Favorites extends Component {
  state = {
    isSbm: false,
    title: "",
  };
  favoriteChangeHandler = (e) => {
    this.setState({ title: e.target.value });
  };
  getImdbIDArray = () => {
    let favoritesIDArray = this.props.favoriteList.map((item) => {
      return item.imdbID;
    });
    return favoritesIDArray;
  };
  saveListHandler = () => {
    const {title} = this.state;
    const favoritesIDArray = this.getImdbIDArray();

    if (title.trim() !== '' && favoritesIDArray.length > 0) {
      
    this.setState({ isSbm: true });
    this.props.postList(title, favoritesIDArray);
    } else{
      alert("Please enter a list name before saving.")
    }
  };
  render() {
    const { title, isSbm } = this.state;
    return (
      <div className="favorites">
        <input
          value={title}
          className="favorites__name"
          placeholder="Enter a list name"
          onChange={this.favoriteChangeHandler}
          disabled={this.state.isSbm}
        />
        <ul className="favorites__list">
          {this.props.favoriteList.map((item) => {
            return (
              <li key={item.imdbID}>
                
                {item.Title} ({item.Year})
                <button
                  className="remove-favorite-movie"
                  onClick={() =>
                    this.props.removeMovieFromFavoriteList(item.imdbID)
                  }
                  style={{display: isSbm ? "none" : "inline-block"}}
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>

        {!isSbm ? (
          <button
            type="button"
            className="favorites__save"
            onClick={this.saveListHandler}
            value= {title}
            disabled={!title}
          >
            Save
          </button>
        ) : (
          <button className="car">
            <Link
              to={"/list/" + this.props.listID}
              target="_blank"
              className="link-to__list"
            >
             Selected films
            </Link>
          </button>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    favoriteList: state.favoriteList,
    favoritesIDArray: state.favoritesIDArray,
    listID: state.listID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeMovieFromFavoriteList: (id) => {
      dispatch(removeMovieFromFavoriteList(id));
    },
    postList: (title, favoritesIDArray) => {
      dispatch(postList(title, favoritesIDArray));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
