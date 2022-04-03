import React from 'react';
import { storage } from '../../commons/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'
import { toast } from 'react-toastify';
import MyContext from '../../commons/MyContext.js';
import bindModel from '../../commons/bindModel.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default class PostPage extends React.Component {
    constructor() {
        super();

        this.state = {
            post: null,
            comment: {
                user: null,
                addTime: null,
                content: "",
                comments: []
            },
            commentReply: null,
            indexReply: null
        }

        this.getPost = this.getPost.bind(this);
        this.sendComment = this.sendComment.bind(this);
        this.scollToComment = this.scollToComment.bind(this);
    }

    componentDidMount() {
        this.getPost()
    }

    getPost() {
        // var recordingIdRegex = /^.*-(\d+)$/;
        // var match = recordingIdRegex.exec(this.props.match.params.postId);
        // console.log(this.props.match.params.postId)
        // console.log(match);

        const postId = this.props.match.params.postId;
        if (postId != null) {
            axios.get("http://localhost:3000/posts/" + postId)
                .then(res => {
                    if (res.data != null) {
                        console.log()
                        this.setState({
                            post: res.data
                        })
                    }
                })
        }
    }


    sendComment() {
        let { comment, post, commentReply, indexReply } = this.state;
        const { user } = this.context;

        //if user null redirect login
        console.log(comment)

        if (comment.content.trim() != "") {
            comment.user = user;
            comment.addTime = new Date();
            if (post.comments == null) post.comments = [];

            if (commentReply != null) {
                if (post.comments[indexReply].comments == null) post.comments[indexReply].comments = [];
                post.comments[indexReply].comments.push(comment);
            } else {
                post.comments.push(comment);
            }


            console.log(post)
            axios.patch("http://localhost:3000/posts/" + post.id, post)
                .then(res => {
                    console.log(res);
                    this.setState({
                        post: post,
                        comment: {
                            user: null,
                            addTime: null,
                            content: "",
                            comments: []
                        }
                    })
                })

        }
    }

    scollToComment(index, comment) {
        console.log(comment)
        if (comment != null) {
            this.setState({
                commentReply: comment,
                indexReply: index
            });
        }
        document.getElementById("comment").scrollIntoView();
    }

    render() {
        const { post, commentReply, indexReply } = this.state;
        const { user } = this.context;
        const model = bindModel(this);
        return (
            <div>
                {post ? (
                    <main id="main">
                        <section className="intro-single">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12 col-lg-8">
                                        <div className="title-single-box">
                                            <h1 className="title-single">{post.title}</h1>
                                            {/* <span className="color-text-a">News Single.</span> */}
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-4">
                                        <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <a href="#">Trang chủ</a>
                                                </li>
                                                <li className="breadcrumb-item active" aria-current="page">
                                                    Tin tức
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </section>{/* End Intro Single*/}
                        {/* ======= Blog Single ======= */}
                        <section className="news-single nav-arrow-b">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="news-img-box text-center">
                                            <img style={{ "height": "400px", "objectFit": "cover" }} src={post.image} alt="" className="img-fluid" />
                                        </div>
                                    </div>
                                    <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                                        <div className="post-information">
                                            <ul className="list-inline text-center color-a">
                                                <li className="list-inline-item mr-2">
                                                    <strong>Author: </strong>
                                                    <span className="color-text-a"> {post.user.username} </span>
                                                </li>
                                                <li className="list-inline-item mr-2">
                                                    <strong>Category: </strong>
                                                    <span className="color-text-a">Travel</span>
                                                </li>
                                                <li className="list-inline-item">
                                                    <strong>Date: </strong>
                                                    <span className="color-text-a">{new Date(post.addTime).toDateString()}</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="post-content color-text-a">
                                            {/* <p className="post-intro">
                                            Sed porttitor lectus nibh. Lorem ipsum dolor sit amet, consectetur
                                            <strong>adipiscing</strong> elit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
                                            Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.
                                        </p>
                                        <p>
                                            Proin eget tortor risus. Donec sollicitudin molestie malesuada. Cras ultricies ligula sed magna dictum
                                            porta. Pellentesque
                                            in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet
                                            dui. Lorem ipsum dolor sit amet.
                                        </p>
                                        <p>
                                            Pellentesque in ipsum id orci porta dapibus. Curabitur non nulla sit amet nisl tempus convallis quis ac
                                            lectus. Curabitur
                                            non nulla sit amet nisl tempus convallis quis ac lectus. Proin eget tortor risus. Curabitur non
                                            nulla sit amet nisl tempus convallis quis ac lectus. Donec rutrum congue leo eget malesuada.
                                            Quisque velit nisi.
                                        </p>
                                        <blockquote className="blockquote">
                                            <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                                            <footer className="blockquote-footer">
                                                <strong>Albert Vargas</strong>
                                                <cite title="Source Title">Author</cite>
                                            </footer>
                                        </blockquote>
                                        <p>
                                            Donec rutrum congue leo eget malesuada. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit
                                            tortor eget felis
                                            porttitor volutpat. Quisque velit nisi, pretium ut lacinia in, elementum id enim.
                                        </p> */}

                                            {post.content.split("\n").map((s, index) => {
                                                return (<p key={index}>{s}</p>)
                                            })}
                                        </div>
                                        <div className="post-footer">
                                            <div className="post-share">
                                                <span>Share: </span>
                                                <ul className="list-inline socials">
                                                    <li className="list-inline-item">
                                                        <a href="#">
                                                            <i className="bi bi-facebook" aria-hidden="true" />
                                                        </a>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="#">
                                                            <i className="bi bi-twitter" aria-hidden="true" />
                                                        </a>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="#">
                                                            <i className="bi bi-instagram" aria-hidden="true" />
                                                        </a>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="#">
                                                            <i className="bi bi-linkedin" aria-hidden="true" />
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-10 offset-md-1 col-lg-10 offset-lg-1">
                                        <div className="title-box-d">
                                            <h3 className="title-d">Bình luân ({post.comments ? post.comments.length : 0}) </h3>
                                        </div>
                                        <div className="box-comments">
                                            <ul className="list-comments">
                                                {post.comments != null && post.comments.map((comment, index) => {
                                                    return (
                                                        <div>
                                                            <li key={index}>
                                                                <div className="comment-avatar">
                                                                    {comment.user.image ? (
                                                                        <img style={{ "objectFit": "cover" }} src={comment.user.image} alt="" />

                                                                    ) : (
                                                                        <img style={{ "objectFit": "cover" }} src={"https://picsum.photos/seed/" + comment.user.id + "/270/150"} alt="" />

                                                                    )}

                                                                </div>
                                                                <div className="comment-details">
                                                                    <h4 className="comment-author"></h4>
                                                                    <div className='d-flex align-items-center'> <span className='mr-4' style={{ "fontSize": "25px", "marginRight": "20px" }}><b>{comment.user.username}</b></span> {new Date(comment.addTime).toDateString()}</div>
                                                                    <p className="comment-description">
                                                                        {comment.content}
                                                                    </p>
                                                                    <a style={{ "cursor": "pointer" }} onClick={() => this.scollToComment(index, comment)}>Reply</a>
                                                                </div>
                                                            </li>
                                                            {comment.comments != null && comment.comments.map((commentChild, index) => {
                                                                return (
                                                                    <li key={index} className="comment-children">
                                                                        <div className="comment-avatar">
                                                                            {commentChild.user.image ? (
                                                                                <img style={{ "objectFit": "cover" }} src={commentChild.user.image} alt="" />

                                                                            ) : (
                                                                                <img style={{ "objectFit": "cover" }} src={"https://picsum.photos/seed/" + commentChild.user.id + "/270/150"} alt="" />

                                                                            )}
                                                                        </div>
                                                                        <div className="comment-details">
                                                                            <h4 className="comment-author">{commentChild.user.username}</h4>
                                                                            <span>{new Date(commentChild.addTime).toDateString()}</span>
                                                                            <p className="comment-description">
                                                                                {commentChild.content}
                                                                            </p>
                                                                            {/* <a href={3}>Reply</a> */}
                                                                        </div>
                                                                    </li>
                                                                )
                                                            })}

                                                        </div>
                                                    )
                                                })}


                                            </ul>
                                        </div>
                                        <div id="comment" className="form-comments">
                                            <div className="title-box-d">
                                                <h3 className="title-d"> Hãy để lại 1 bình luận </h3>
                                            </div>
                                            <div className="form-a">
                                                <div className="row">
                                                    {/* <div className="col-md-6 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="inputName">Enter name</label>
                                                        <input type="text" className="form-control form-control-lg form-control-a" id="inputName" placeholder="Name *" required />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="inputEmail1">Enter email</label>
                                                        <input type="email" className="form-control form-control-lg form-control-a" id="inputEmail1" placeholder="Email *" required />
                                                    </div>
                                                </div>
                                                <div className="col-md-12 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="inputUrl">Enter website</label>
                                                        <input type="url" className="form-control form-control-lg form-control-a" id="inputUrl" placeholder="Website" />
                                                    </div>
                                                </div> */}
                                                    <div className="col-md-12 mb-3">
                                                        <div className="form-group">
                                                            {commentReply == null ? (
                                                                <label htmlFor="textMessage">Nhập bình luận</label>
                                                            ) : (
                                                                <div>
                                                                    <label htmlFor="textMessage">Trả lời bình luận:  {commentReply.content}</label>
                                                                    <button style={{"fontSize": "12px", "color": "red"}} onClick={() => {
                                                                        this.setState({
                                                                            commentReply: null,
                                                                            indexReply: null
                                                                        })
                                                                    }} className='btn btn-close color-danger'></button>
                                                                </div>
                                                            )}

                                                            <textarea {...model('comment.content')} id="textMessage" className="form-control" placeholder="Bình luận *" name="message" cols={45} rows={8} required />
                                                        </div>
                                                    </div>
                                                    {user ? (
                                                        <div className="col-md-12">
                                                            <button onClick={this.sendComment} className="btn btn-a">Gửi bình luận</button>
                                                        </div>
                                                    ) : (
                                                        <div className="col-md-12">
                                                            <Link to={"/login"} className="btn btn-a">Gửi bình luận</Link>
                                                        </div>
                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                ) : (
                    ""
                )}

            </div>
        );
    }
}

PostPage.contextType = MyContext;