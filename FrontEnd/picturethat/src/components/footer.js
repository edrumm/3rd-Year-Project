import React, { useState } from 'react';
import './footer.css';





    function Footer() {
       
        return(
            <>
            <footer className="footer">
                <div className="links">
                    <a className="link" href="https://lucasarenaterry.github.io/CompanyWebsite/"><div>About</div></a>
                    <br />
                    <a className="link" href="http://localhost:3000/PictureThat/TermsAndConditions"><div>Terms and Conditions</div></a>
                    <br />
                    <a className="link"><div>Contact</div></a>
                    <br />
                </div>
                <div>© 2021 PictureThat by Pronto. All Rights Reserved.</div>
            </footer>
            </>
            

        )
    }


export default Footer;