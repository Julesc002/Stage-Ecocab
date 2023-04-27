import React from 'react';

import Nav from './Nav'
import Footer from './Footer'

const Layout = ({ children }) => {
    return (
        <>
            <header>
                <Nav />
            </header>
            <main className="container">
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default Layout;