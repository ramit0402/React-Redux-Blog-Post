import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchPost, deletePost } from '../actions/index';

class PostsShow extends Component {
    componentWillMount() {
        this.props.fetchPost(this.props.params.id);
    }

    static contextTypes = {
        router: PropTypes.object
    };


    onDeleteClick() {
        this.props.deletePost(this.props.params.id)
            .then(() => {
                // blog has been deleted,  navigate the user to the index
                // we navigate by calling this.context.router.push with the new path to navigate
                this.context.router.push("/");
            });
    }

    render() {
        if(!this.props.post) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <Link to = "/">Back to Index</Link>
                <button
                    className = "btn btn-danger pull-xs-right"
                    onClick = {this.onDeleteClick.bind(this)}
                >
                    Delete Post
                </button>
                <h3>{this.props.post.title}</h3>
                <h6>Categories: {this.props.post.categories}</h6>
                <p>{this.props.post.content}</p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return{ post: state.posts.post};
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);