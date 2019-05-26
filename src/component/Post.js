import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import styles from "../../src/styles";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.location.state.index,
      title: this.props.location.state.postList[this.props.location.state.index]
        .title,
      category: this.props.location.state.postList[
        this.props.location.state.index
      ].category,
      text: this.props.location.state.postList[this.props.location.state.index]
        .text,
      postList: this.props.location.state.postList
    };
  }

  inputChanged = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const edittedPost = {
      title: this.state.title,
      category: this.state.category,
      text: this.state.text
    };
    const { postList, index } = this.state;
    let post = { ...postList[index] };
    post = edittedPost;
    postList[index] = post;

    this.setState(
      { postList }, () => {
        this.props.history.push({
          state: { postList: this.state.postList },
          pathname: "/"
        });
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="App-body">
        <h2>Edit post</h2>
        <form
          onSubmit={this.savePost}
          noValidate
          autoComplete="off"
          className="postForm"
        >
          <TextField
            id="title"
            label="Title:"
            defaultValue={this.state.title}
            onChange={this.inputChanged}
            margin="dense"
            fullWidth
          />
          <TextField
            id="category"
            label="Category:"
            defaultValue={this.state.category}
            onChange={this.inputChanged}
            margin="dense"
            fullWidth
          />
          <TextField
            id="text"
            label="Write new post:"
            defaultValue={this.state.text}
            onChange={this.inputChanged}
            margin="normal"
            multiline
            fullWidth
          />

          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
            className={classes.button}
          >
            Save
          </Button>
          <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          component={Link}
          to={{
            pathname: "/",
            state: {
              postList: this.state.postList
            }
          }}
        >
          Return
        </Button>
        </form>
      </div>
    );
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Post);
