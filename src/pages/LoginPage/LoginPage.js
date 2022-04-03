import React from 'react';
import axios from 'axios';
import bindModel from '../../commons/bindModel.js';
import { toast } from 'react-toastify';
import { withRouter, Link } from 'react-router-dom';
import MyContext from '../../commons/MyContext.js';
class LoginPage extends React.Component {
    constructor() {
        super();

        this.state = {
            username: "",
            password: "",
            remember: false
        }

        this.login = this.login.bind(this);
    }

    componentDidMount() {
        // this.login();
    }

    login() {
        const {username, password} = this.state;
        const { history } = this.props;
        axios.get("http://localhost:3000/users?username="+ username)
            .then(res => {
                if(res.data.length > 0) {
                    const user = res.data[0];
                    if(user.password != password) {
                        toast.warn("Wrong password")
                    } else {
                        this.context.updateUser(user);
                        if (history) {
                            if (history.action == "PUSH") {
                              history.goBack();
                            } else {
                              history.push('/');
                            }
                          }
                    }
                } else {
                    toast.warn("Account does not exist")
                }
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
                                        <h5 className="card-title text-center mb-5 fw-light fs-5">Đăng nhập</h5>
                                        <div>
                                            <div className="form-floating mb-3">
                                                <input {...model('username')} className="form-control" id="floatingInput" placeholder="Nhập tên tài khoản" />
                                                <label htmlFor="floatingInput">Tài khoản</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input {...model('password')} type="password" className="form-control" id="floatingPassword" placeholder="Nhập mật khẩu" />
                                                <label htmlFor="floatingPassword">Mật khẩu</label>
                                            </div>
                                            <div className="form-check mb-3">
                                                <input {...model('remember')} className="form-check-input" type="checkbox" id="rememberPasswordCheck" />
                                                <label className="form-check-label" htmlFor="rememberPasswordCheck">
                                                    Ghi nhớ
                                                </label>
                                            </div>
                                            <div className="d-grid">
                                                <button style={{"backgroundColor": "#2eca6a"}} onClick={this.login} className="btn btn-primary btn-login text-uppercase fw-bold" >Đăng nhập</button>
                                            </div>
                                            {/* <hr className="my-4" /> */}
                                            {/* <div className="d-grid mb-2">
                                                <button className="btn btn-google btn-login text-uppercase fw-bold" type="submit">
                                                    <i className="fab fa-google me-2" /> Sign in with Google
                                                </button>
                                            </div> */}
                                            <div className="d-grid">
                                                <Link to={"/register"} className="btn btn-facebook btn-login text-uppercase fw-bold">
                                                    <u>
                                                    Đăng ký
                                                    </u>
                                                    
                                                </Link>
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

LoginPage.contextType = MyContext;
export default withRouter(LoginPage)