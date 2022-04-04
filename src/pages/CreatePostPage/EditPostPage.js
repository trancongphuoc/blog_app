import React from 'react';
import { storage } from '../../commons/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'
import { toast } from 'react-toastify';
import MyContext from '../../commons/MyContext.js';
import bindModel from '../../commons/bindModel.js';
import axios from 'axios';
export default class EditPostPage extends React.Component {
    constructor() {
        super();

        this.state = {
            post: {
                title: "",
                content: "",
                image: null,
                addTime: null,
                user: null,
                comments: [],
                category: ""
            },
            prog: 0,
            loading: false
        }

        this.uploadImage = this.uploadImage.bind(this);
        this.createPost = this.createPost.bind(this);
        this.getPost = this.getPost.bind(this);
    }

    uploadImage(event) {
        let file = event.target.files[0];
        console.log(file)
        if (!file) return;

        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log(prog)
            this.setState({
                prog: prog
            })
        },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                    let { post } = this.state;
                    post.image = url;
                    this.setState({
                        post: post
                    })
                })
            })
    }

    getPost() {
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

    componentDidMount() {
        this.getPost()
    }

    createPost() {
        let { post } = this.state;
        let { user } = this.context;
        if (post.title.trim() == "") {
            toast.warn("Tiêu đề không được để trống")
        } else if (post.content.trim() == "") {
            toast.warn("Nội dung không được để trống")
        } else if (post.image.trim() == "") {
            toast.warn("Hình ảnh không được để trống")
        } else {
            this.setState({
                loading: true
            });

            post.addTime = new Date();
            post.user = user;
            axios.patch("http://localhost:3000/posts/" + post.id, post)
                .then(res => {
                    if (res.status == 201) {
                        this.setState({
                            post: {
                                title: "",
                                content: "",
                                image: null,
                                addTime: null,
                                user: null,
                                comments: []
                            },
                        })
                    }
                    toast.success("Cập nhật thành công")

                    this.setState({
                        loading: false
                    })
                }, err => {
                    console.log(err);
                    this.setState({
                        loading: false
                    })
                })
        }
    }

    render() {
        const { post } = this.state;
        const model = bindModel(this);
        return (
            <div>
                <main id="main">
                    <section className='intro-single' >
                        <div className='container'>
                            <div className='row p-2'>
                                <div className='col-3'>
                                    <label className='col-form-label'>Tiêu đề</label>
                                </div>
                                <div className='col-9'>
                                    <input {...model('post.title')} className='form-control' type='text' placeholder="Nhập tiêu đề"></input>
                                </div>
                            </div>
                            <div className='row p-2'>
                                <div className='col-3'>
                                    <label className='col-form-label'>Nội dung</label>
                                </div>
                                <div className='col-9'>
                                    <textarea {...model('post.content')} className='form-control' rows={10} placeholder="Nhập nội dung"></textarea>
                                </div>
                            </div>
                            <div className='row p-2'>
                                <div className='col-3'>
                                    <label className='col-form-label'>Tag</label>
                                </div>
                                <div className='col-9'>
                                    <select className='form-control' {...model('post.category')}>
                                        <option value={"Food"}>Food</option>
                                        <option value={"Event"}>Event</option>
                                        {/* <option></option>
                                        <option></option> */}
                                    </select>
                                </div>
                            </div>
                            <div className="row p-2">
                                <div className="col-3">
                                    <label>Hình ảnh</label>
                                </div>
                                <div className="col-9">
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        id="inputGroupFile03"
                                        onChange={this.uploadImage} />
                                    <label className="custom-file-label ml-3 mr-3" htmlFor="inputGroupFile03">Choose file</label>
                                </div>
                            </div>
                            {post.image ? (
                                <div id="thumbnail" className="row mb-2">
                                    <div className="col-3">

                                    </div>
                                    <div className="col-9">
                                        <img className='w-100' src={post.image} />
                                    </div>
                                </div>
                            ) : ""}
                            <div>
                                <div className="text-center">
                                    {this.state.loading ? (
                                        <button style={{ width: "120px" }} className="btn btn-b-n navbar-toggle-box navbar-toggle-box-collapse mt-5" type="button" disabled>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            Đăng bài...
                                        </button>
                                    ) : (
                                        <button type="button" style={{ width: "120px" }} className="btn btn-b-n navbar-toggle-box navbar-toggle-box-collapse mt-5" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
                                            <span onClick={this.createPost} className="p-2">Đăng bài</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        );
    }
}

EditPostPage.contextType = MyContext;