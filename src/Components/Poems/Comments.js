import React from 'react';
// import CommentList from "../CommentList";
import CommentForm from "../CommentForm";



export default class Comments extends React.Component{
    constructor(props) {
        super(props)
        this.state ={

        }
    }
    render (){
        return(
            <div className="row">
            <div className="col-4  pt-3 border-right">
              <h6>Add a comment</h6>
              <CommentForm addComment={this.addComment} />
            </div>
            <div className="col-8  pt-3 bg-white">
              {/* <CommentList
                loading={this.state.loading}
                comments={this.state.comments}
              /> */}
            </div>
          </div>
        )
    }
}