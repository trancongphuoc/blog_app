import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as service from "../commons/service.js";
import MyContext from '../commons/MyContext';

export default class Header extends Component {
  constructor() {
    super();

    this.logout = this.logout.bind(this);
  }

  logout() {
    window.localStorage.clear();
    window.sessionStorage.clear();
    this.context.updateUser(null);
  }

  render() {
    const {user} = this.context;
    return (
      <nav className="navbar navbar-default navbar-trans navbar-expand-lg fixed-top">
        <div className="container">
          <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDefault" aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span />
            <span />
            <span />
          </button>
          <Link className="navbar-brand text-brand" to="/">Losts<span className="color-b">Restaurant</span></Link>
          <div className="navbar-collapse collapse justify-content-center" id="navbarDefault">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Trang chủ</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/news">Tin tức</Link>
              </li>
              {/* <li className="nav-item">
                  <a className="nav-link " href="property-grid.html">Property</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link " href="blog-grid.html">Blog</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Pages</a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item " href="property-single.html">Property Single</a>
                    <a className="dropdown-item " href="blog-single.html">Blog Single</a>
                    <a className="dropdown-item " href="agents-grid.html">Agents Grid</a>
                    <a className="dropdown-item " href="agent-single.html">Agent Single</a>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link " href="contact.html">Contact</a>
                </li> */}
            </ul>
          </div>
          {user == null ? (
            <button type="button" className="btn btn-b-n navbar-toggle-box navbar-toggle-box-collapse" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
              {/* <i className="bi bi-search" /> */}
              <Link className="p-2 text-while" to="/login">Đăng nhập</Link>
            </button>
          ) : (
            <>
            <button type="button" className="btn btn-b-n navbar-toggle-box navbar-toggle-box-collapse" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
              {/* <i className="bi bi-search" /> */}
              <span onClick={this.logout} className="p-2  text-while">Đăng xuất</span>
            </button>
            </>
            
          )}

        </div>
      </nav>
    )
  }
}

Header.contextType = MyContext;
