import React from 'react';
import { storage } from '../../commons/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'
import { toast } from 'react-toastify';
import MyContext from '../../commons/MyContext.js';
import bindModel from '../../commons/bindModel.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';
export default class News extends React.Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      pageIndex: 0,
      prevPage: null,
      nextPage: 1,
      totalPage: null
    }
    this.getPosts = this.getPosts.bind(this);
  }

  async componentDidMount() {
    await axios.get("http://localhost:3000/posts")
      .then(res => {

        let totalPage = res.data.length % 6 == 0 ? res.data.length / 6 : res.data.length / 6 + 1
        console.log(parseInt(totalPage))
        this.setState({
          totalPage: parseInt(totalPage)
        });
      });

    this.getPosts(1);
  }

  getPosts(pageSelect) {
    let { pageIndex, nextPage, prevPage, totalPage } = this.state;
    if (pageSelect > pageIndex && pageIndex < totalPage) {
      prevPage = pageIndex;
      pageIndex = nextPage;
      nextPage++;
    } else if (pageSelect < pageIndex && pageIndex > 1) {
      nextPage = pageIndex;
      pageIndex = prevPage;
      prevPage--;
    }

    this.setState({
      pageIndex: pageIndex,
      prevPage: prevPage,
      nextPage: nextPage
    })

    axios.get("http://localhost:3000/posts?_sort=id&_order=DESC&_limit=6&_page=" + pageSelect)
      .then(res => {
        this.setState({
          posts: res.data
        });
      });


  }

  render() {

    const { posts, pageIndex, prevPage, nextPage, totalPage } = this.state;
    return (
      <div>
        <main id="main">
          <section className="intro-single">
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-lg-8">
                  <div className="title-single-box">
                    <h1 className="title-single">Our Amazing Posts</h1>
                    <span className="color-text-a">Grid News</span>
                  </div>
                </div>
                <div className="col-md-12 col-lg-4">
                  <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="index.html">Home</a>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        News Grid
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </section>{/* End Intro Single*/}
          {/* =======  Blog Grid ======= */}
          <section className="news-grid grid">
            <div className="container">
              <div className="row">

                {posts.map((post, index) => {
                  return (
                    <div key={index} className="col-md-4">
                      <div className="card-box-b card-shadow news-box">
                        <div className="img-box-b">
                          <img style={{ "height": "400px", "objectFit": "cover" }} src={post.image} alt="" className="img-b img-fluid" />
                        </div>
                        <div className="card-overlay">
                          <div className="card-header-b">
                            <div className="card-category-b">
                              <a href="#" className="category-b">{post.category ? post.category : "Food"}</a>
                            </div>
                            <div className="card-title-b">
                              <h2 className="title-2">
                                <Link to={"/post/" + post.id}>{post.title.length > 100 ? post.title.substring(0, 100) + `...` : post.title}
                                  <br /> </Link>
                              </h2>
                            </div>
                            <div className="card-date">
                              <span className="date-b">18 Sep. 2017</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}

              </div>
              <div className="row">
                <div className="col-sm-12">
                  <nav className="pagination-a">
                    <ul className="pagination justify-content-end">
                      <li className={pageIndex <= 1 ? "page-item disabled" : "page-item "}>
                        <a onClick={() => this.getPosts(prevPage)} className="page-link" tabIndex={-1}>
                          <span className="bi bi-chevron-left" />
                        </a>
                      </li>
                      {pageIndex > 1 && (
                        <>

                          <li className="page-item">
                            <a onClick={() => this.getPosts(prevPage)} className="page-link">{prevPage}</a>
                          </li>
                        </>
                      )}

                      <li className="page-item active">
                        <a className="page-link">{pageIndex}</a>
                      </li>

                      

                      {pageIndex < totalPage && (
                        <>
                        <li className="page-item">
                        <a className="page-link" onClick={() => this.getPosts(nextPage)}>{nextPage}</a>
                      </li>
                          </>
                      )}
                      <li  className={pageIndex >= totalPage ? "page-item next disabled" : "page-item next"}>
                            <a className="page-link" onClick={() => this.getPosts(nextPage)}>
                              <span className="bi bi-chevron-right" />
                            </a>
                          </li>

                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </section>{/* End Blog Grid*/}
        </main>{/* End #main */}
        {/* ======= Footer ======= */}
        {/* <section className="section-footer">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-4">
                <div className="widget-a">
                  <div className="w-header-a">
                    <h3 className="w-title-a text-brand">EstateAgency</h3>
                  </div>
                  <div className="w-body-a">
                    <p className="w-text-a color-text-a">
                      Enim minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip exea commodo consequat duis
                      sed aute irure.
                    </p>
                  </div>
                  <div className="w-footer-a">
                    <ul className="list-unstyled">
                      <li className="color-a">
                        <span className="color-text-a">Phone .</span> contact@example.com
                      </li>
                      <li className="color-a">
                        <span className="color-text-a">Email .</span> +54 356 945234
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-4 section-md-t3">
                <div className="widget-a">
                  <div className="w-header-a">
                    <h3 className="w-title-a text-brand">The Company</h3>
                  </div>
                  <div className="w-body-a">
                    <div className="w-body-a">
                      <ul className="list-unstyled">
                        <li className="item-list-a">
                          <i className="bi bi-chevron-right" /> <a href="#">Site Map</a>
                        </li>
                        <li className="item-list-a">
                          <i className="bi bi-chevron-right" /> <a href="#">Legal</a>
                        </li>
                        <li className="item-list-a">
                          <i className="bi bi-chevron-right" /> <a href="#">Agent Admin</a>
                        </li>
                        <li className="item-list-a">
                          <i className="bi bi-chevron-right" /> <a href="#">Careers</a>
                        </li>
                        <li className="item-list-a">
                          <i className="bi bi-chevron-right" /> <a href="#">Affiliate</a>
                        </li>
                        <li className="item-list-a">
                          <i className="bi bi-chevron-right" /> <a href="#">Privacy Policy</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-4 section-md-t3">
                <div className="widget-a">
                  <div className="w-header-a">
                    <h3 className="w-title-a text-brand">International sites</h3>
                  </div>
                  <div className="w-body-a">
                    <ul className="list-unstyled">
                      <li className="item-list-a">
                        <i className="bi bi-chevron-right" /> <a href="#">Venezuela</a>
                      </li>
                      <li className="item-list-a">
                        <i className="bi bi-chevron-right" /> <a href="#">China</a>
                      </li>
                      <li className="item-list-a">
                        <i className="bi bi-chevron-right" /> <a href="#">Hong Kong</a>
                      </li>
                      <li className="item-list-a">
                        <i className="bi bi-chevron-right" /> <a href="#">Argentina</a>
                      </li>
                      <li className="item-list-a">
                        <i className="bi bi-chevron-right" /> <a href="#">Singapore</a>
                      </li>
                      <li className="item-list-a">
                        <i className="bi bi-chevron-right" /> <a href="#">Philippines</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </div>
    );
  }
}