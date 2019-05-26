import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PostList from "./component/PostList";
import Post from "./component/Post";
import AddPost from "./component/AddPost";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">React Assignment: Blog Post</h1>
      </header>

      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route path="/posts/newpost" component={AddPost} />
          <Route path="/posts/:id" component={Post} />
          <Route render={() => <div>Not found</div>}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
