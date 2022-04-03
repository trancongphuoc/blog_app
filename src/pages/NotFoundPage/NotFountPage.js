import React from 'react';
import '../NotFoundPage/notfoundpage.css';
export default class NotFoundPage extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <main id="main">
                <section className='intro-single' >
                    <div id='not-found-page'>
                        <section id="not-found">
                            <div id="title">Losts Restaurant • 404 Error Page</div>
                            <div className="circles">
                                <p>404<br />
                                    <small>KHÔNG TÌM THẤY TRANG</small>
                                </p>
                                <span className="circle big" />
                                <span className="circle med" />
                                <span className="circle small" />
                            </div>
                        </section>
                    </div>
                </section>
            </main>

        )
    }
}