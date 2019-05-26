import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styles from "../../src/styles";
import { Link } from "react-router-dom";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postList: [
        {
          title: "title1",
          category: "category1",
          text: "text1"
        },
        {
          title: "title2",
          category: "category2",
          text: "text2"
        },
        {
          title: "title2",
          category: "category2",
          text: "text2"
        },
        {
          title: "title3",
          category: "category3",
          text: "text3"
        },
        {
          title: "title4",
          category: "category4",
          text: "text4"
        }
      ]
    };
  }

  componentDidMount() {
    if (this.props.location.state !== undefined) {
      this.rerenderPosts();
    }
  }

  removePost = index => {
    const postList = this.state.postList.filter((post, i) => i !== index);
    this.setState({ postList: postList });
    this.props.history.push({
      state: { postList: this.state.postList }
    });
  };

  rerenderPosts = () => {
    this.setState({
      postList: [...this.props.location.state.postList]
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="App-body">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          component={Link}
          to={{
            pathname: "/posts/newpost",
            state: {
              postList: this.state.postList
            }
          }}
        >
          Add post
        </Button>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Text</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.postList.map((row, index) => (
                <TableRow key={index} hover>
                  <TableCell component="th" scope="row">
                    <Link
                      to={{
                        pathname: `/posts/${index}`,
                        state: {
                          postList: this.state.postList,
                          index: index
                        }
                      }}
                      className={classes.link}
                    >
                      <b>{row.title}</b>
                    </Link>
                  </TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.text}</TableCell>
                  <TableCell>
                    <DeleteOutlinedIcon
                      onClick={() => {
                        this.removePost(index);
                      }}
                      className={classes.icon}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

PostList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostList);
