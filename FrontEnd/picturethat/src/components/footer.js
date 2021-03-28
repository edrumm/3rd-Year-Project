import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';


function Footer() {
       
        return(
            <>
            <footer className="footer">
                <div className="links">
                    <a className="link" href="https://lucasarenaterry.github.io/CompanyWebsite/"><div>About</div></a>
                    <br />
                    <a className="link"><Link to="/PictureThat/TermsAndConditions"><div>Terms and Conditions</div></Link></a>
                    <br />
                    <a className="link"><Link to="/PictureThat/ContactPage"><div>Contact</div></Link></a>
                    <br />
                </div>
                <div>© 2021 PictureThat by Pronto. All Rights Reserved.</div>
            </footer>
            </>
            

        )
    }


export default Footer;