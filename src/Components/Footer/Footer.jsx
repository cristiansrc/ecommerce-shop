import "./Footer.css";
import logo from "../../Assets/logo.png";

const Footer = () => {

  const getCurrentYear = () => new Date().getFullYear();

  return (
    <>
      <footer className="footer">
        <div className="footer__container">
          <div className="footer_left">
            <div className="footer_logo_container">
              <img src={logo} alt="" Z />
            </div>
          </div>

          <div className="footer_content">
            <h5>Company</h5>
          </div>
          <div className="footer_content">
            <h5>Shop</h5>
          </div>
          <div className="footer_content">
            <h5>Help</h5>
          </div>
          <div className="footer_right">
            <h5>Subscribe</h5>
          </div>
        </div>
        <div className="footer_bottom">
          <p>
            © {getCurrentYear()} Uomo. All Rights Reserved | Made By{" "}
            <a
              href="https://github.com/shakti177"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#C22928", textDecoration: "none" }}
            >
              Shakti Tamrakar
            </a>{" "}
            with ❤️
          </p>
          
        </div>
      </footer>
    </>
  );
};

export default Footer;
