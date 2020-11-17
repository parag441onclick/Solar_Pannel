import React from "react";
import { Link } from "react-router-dom";

class Footer extends React.Component {
  renderFooter = () => {
    return (
      <footer className='page-footer font-small teal pt-4 custom-footer'>
        <div className='container-fluid text-center text-md-center'>
          <div className='row d-flex-column justify-content-center'>
            <div className='col-md-6 mt-md-0 mt-3'>
              <p>
                Marketing VF Limited also operating under the name of Mon Eco
                Projet.
              </p>
            </div>

            <hr className='clearfix w-100 d-md-none pb-3' />
            <div className='col-md-9 mb-md-0 mb-3'>
              <p>
                Contact address: MVF Global, Imperial Works, Block C, Perren
                Street, London NW5 3ED, United Kingdom.
              </p>
            </div>
          </div>
        </div>

        <div className='d-flex justify-content-center'>
          <div className='footer-copyright text-center custom-footer-copy'>
            <Link to='/' className='text-white text-decoration-underline'>
              Privacy Policy
            </Link>
          </div>
          <div className='footer-copyright text-center custom-footer-copy'>
            <Link to='/' className='text-white text-decoration-underline'>
              Preferences Center
            </Link>
          </div>
        </div>
      </footer>
    );
  };

  render() {
    return this.renderFooter();
  }
}

export default Footer;
