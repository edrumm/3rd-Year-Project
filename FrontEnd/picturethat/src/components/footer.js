import React, { useState } from 'react';
import './footer.css';





    function Footer() {
       
        return(
            <>
            <footer className="footer">
                <div className="links">
                    <a href="https://lucasarenaterry.github.io/CompanyWebsite/"><div>About</div></a>
                    <a href=""><div>Terms and conditions</div></a>
                    <a><div>Contact</div></a>
                </div>
                <div>© 2021 PictureThat from Pronto All Rights Reserved.</div>
            </footer>
            </>
            

        )
    }


export default Footer;