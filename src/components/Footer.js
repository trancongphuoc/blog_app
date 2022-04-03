import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as service from "../commons/service.js";
import MyContext from '../commons/MyContext';

export default class Footer extends Component {
  constructor() {
    super();

  }


  render() {
    return (
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <nav className="nav-footer">
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <Link to={"/"}>Trang chủ</Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to={"/news"}>Tin tức</Link>
                  </li>
                  {/* <li className="list-inline-item">
                    <a href="#">Property</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">Blog</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">Contact</a>
                  </li> */}
                </ul>
              </nav>
              <div className="socials-a">
                <ul className="list-inline">
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
              <div className="copyright-footer">
                <p className="copyright color-text-a">
                  © Copyright
                  <span className="color-a">Losts Restaurant</span> All Rights Reserved.
                </p>
              </div>
              <div className="credits">
                {/*
            All the links in the footer should remain intact.
            You can delete the links only if you purchased the pro version.
            Licensing information: https://bootstrapmade.com/license/
            Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/buy/?theme=EstateAgency
          */}
                {/* Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

