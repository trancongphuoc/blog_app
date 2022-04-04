import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import MyContextProvider from '../src/components/MyContextProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './assets/vendor/bootstrap/css/bootstrap.min.css'
import './assets/vendor/bootstrap-icons/bootstrap-icons.css'
import './assets/vendor/swiper/swiper-bundle.min.css'
import './assets/vendor/animate.css/animate.min.css'
import './assets/css/style.css'

// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'jquery/dist/jquery.min.js'
// import 'bootstrap/dist/js/bootstrap.min.js'

import HomePage from './pages/HomePage/HomePage';
import News from './pages/NewsPage/News';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import axios from 'axios';
import Footer from './components/Footer';
import CreatePostPage from './pages/CreatePostPage/CreatePostPage';
import PostPage from './pages/PostPage/PostPage';
import NotFoundPage from './pages/NotFoundPage/NotFountPage';
import {Helmet} from "react-helmet";
import EditPostPage from './pages/CreatePostPage/EditPostPage';
// import './assets/vendor/swiper/swiper-bundle.min.js'
// import './assets/vendor/bootstrap/js/bootstrap.bundle.min.js'
// import './assets/vendor/php-email-form/validate.js'
// import './assets/js/main.js'
toast.configure();
export default class App extends React.PureComponent {
  constructor() {
    super();
    this.updateUser = this.updateUser.bind(this);

    this.state = {
      user: null,
      updateUser: this.updateUser,
    }
  }

  componentDidMount() {
    
    // this.addScript("./assets/vendor/bootstrap/js/bootstrap.bundle.min.js");
    // this.addScript("./assets/vendor/swiper/swiper-bundle.min.js");
    // this.addScript("./assets/vendor/php-email-form/validate.js");
    // this.addScript("./assets/js/main.js");
    this.getUser();
  }

  addScript(url) {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.onload = () => this.scriptLoaded();
  
    document.body.appendChild(script);

  }

  componentDidUpdate() {
    
  }

  getUser() {
    let id = window.sessionStorage.getItem("id");
    if(id == null) id = window.localStorage.getItem("id");
    if (id != null) {
      axios.get("http://localhost:3000/users/" + id)
        .then(res => {
          console.log(res.status)
          if (res.data) {
            this.updateUser(res.data);
          } else {
            window.localStorage.clear();
            window.sessionStorage.clear();
          }
        }).catch(err => {
          window.localStorage.clear();
          window.sessionStorage.clear();
        });
    }
  }

  updateUser(user) {
    if (user != null) {
      if(user.remember) {
        window.localStorage.setItem("id", user.id);
      } else {
        window.sessionStorage.setItem("id", user.id);
      }
    } else {
      window.sessionStorage.clear();
      window.localStorage.clear();
    }
    this.setState({
      user: user
    })
  }

  render() {
    const { user } = this.state;
    let id = window.localStorage.getItem("id");
    if(id == null) id = window.sessionStorage.getItem("id");
    return (
      <div className="">
        <Helmet>
              {/* <script src={require("./assets/vendor/bootstrap/js/bootstrap.bundle.min.js")} type="text/javascript" /> */}
              {/* <script src={require("./assets/vendor/swiper/swiper-bundle.min.js")} type="text/javascript" /> */}
              {/* <script src={require("./assets/vendor/php-email-form/validate.js")} type="text/javascript" /> */}
              {/* <script src={require("./assets/js/main.js")} type="text/javascript" /> */}

            </Helmet>
        <MyContextProvider value={this.state}>
          <Router>
            <Header />
            <Switch>
              <Route exact path='/' component={HomePage}></Route>
              <Route path="/login">
                {user ? <Redirect to="/" /> : <LoginPage />}
              </Route>
              <Route path="/register">
                {user ? <Redirect to="/" /> : <RegisterPage />}
              </Route>
              <Route path='/news' component={News}></Route>
              <Route path='/post/:postId' component={PostPage}></Route>
              <Route path='/edit-post/:postId' component={EditPostPage}></Route>

              <Route path="/create-post">
                {id ? <CreatePostPage /> : <Redirect to="/" />}
              </Route>

              <Route path="/edit-post/:postId">
                {id ? <EditPostPage /> : <Redirect to="/" />}
              </Route>

              <Route component={NotFoundPage}></Route>
            </Switch>
          </Router>
          <Footer />
        </MyContextProvider>
      </div>
    );
  }

}

