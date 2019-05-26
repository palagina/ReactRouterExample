import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import styles from "../../src/styles";
import { Link } from "react-router-dom";

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      category: "",
      text: "",
      postList: this.props.location.state.postList,
    };
  }

  inputChanged = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  clearText = () => {
    this.setState({
      title: "",
      category: "",
      text: ""
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const newPost = {
      title: this.state.title,
      category: this.state.category,
      text: this.state.text
    };
   this.setState({
      postList: [...this.state.postList, newPost]
    }, () => {
      this.props.history.push({
        state: { postList: this.state.postList },
        pathname: '/',
      })
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="App-body">
        <form
          onSubmit={this.addPost}
          noValidate
          autoComplete="off"
          className="postForm"
        >
          <TextField
            id="title"
            label="Title:"
            value={this.state.title}
            onChange={this.inputChanged}
            margin="dense"
            fullWidth
          />
          <TextField
            id="category"
            label="Category:"
            value={this.state.category}
            onChange={this.inputChanged}
            margin="dense"
            fullWidth
          />
          <TextField
            id="text"
            label="Write new post:"
            value={this.state.text}
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
            color="default"
            onClick={this.clearText}
            className={classes.button}
          >
            Clear
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

AddPost.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddPost);
