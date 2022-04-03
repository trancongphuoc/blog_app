import React from 'react';
import axios from 'axios';
import bindModel from '../../commons/bindModel.js';
import { toast } from 'react-toastify';
import { withRouter, Link } from 'react-router-dom';
import validator from 'validator';
export default class RegisterPage extends React.Component {
    constructor() {
        super();

        this.state = {
            user: {
                username: "",
                password: "",
                repeatPassword: ""
            }

        }

        this.createAccount = this.createAccount.bind(this);
    }

    componentDidMount() {
        // this.createAccount();
    }

    async createAccount() {
        let { user } = this.state;
        const { history } = this.props;

        let isExist = await this.checkExistAccount().then();

        if (validator.isEmpty(user.username) || validator.isEmpty(user.password)) {
            toast.warn("Tên tài khoản và mật khẩu không được để trống")
        } else if (!validator.isAlphanumeric(user.username)) {
            toast.warn("Tên tài khoản không được chưa kí tự đặc biệt")
        } else if (isExist) {
            toast.warn("Tài khoản đã tồn tại")
        } else if (user.password != user.repeatPassword) {
            toast.warn("Mật khẩu không khớp")
        } else {
            user.addTime = new Date();
            axios.post("http://localhost:3000/users", user)
                .then(res => {
                    if (res.status == 201) {
                        toast.success("Tạo tài khoản thành công");

                        if (history) {
                            history.push('/login');
                        }

                    }

                });
        }
    }

    checkExistAccount() {
        const { user } = this.state;
        return axios.get("http://localhost:3000/users?username=" + user.username)
            .then(res => {
                console.log(res.data.length);
                if (res.data.length > 0) {
                    return true;
                } else {
                    return false;
                }
            }).catch(err => {
                // return true;
            });
    }

    render() {
        const model = bindModel(this);

        return (
            <main id="main">
                <section className="intro-single" style={{ backgroundImage: 'url(' + require('../../assets/img/slide-1.jpg') + ')' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                                <div className="card border-0 shadow rounded-3 my-5">
                                    <div className="card-body p-4 p-sm-5">
                                        <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                                        <div>
                                            <div className="form-floating mb-3">
                                                <input {...model('user.username')} className="form-control" id="floatingInput" placeholder="Username" />
                                                <label htmlFor="floatingInput">Tên tài khoản</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input {...model('user.password')} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                                                <label htmlFor="floatingPassword">Mật khẩu</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input {...model('user.repeatPassword')} type="password" className="form-control" id="repeatPassword" placeholder="RepeatPassword" />
                                                <label htmlFor="floatingPassword">Nhập lại mật khẩu</label>
                                            </div>
                                            <div className="d-grid">
                                                <button style={{"backgroundColor": "#2eca6a"}} onClick={this.createAccount} className="btn btn-primary btn-login text-uppercase fw-bold" >
                                                    Đăng ký
                                                </button>
                                            </div>



                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        );
    }
}