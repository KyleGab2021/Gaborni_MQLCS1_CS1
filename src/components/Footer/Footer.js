import React from "react";
import { Container } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";

function Footer(props) {
  return (
    <footer className={"footer" + (props.default ? " footer-default" : "")}>
      <Container fluid={props.fluid ? true : false}>
        {/* <nav>
          <ul>
            <li>
              <a
                href="https://github.com/VanCarlo95"
                target="_blank"
              >
                InventoVate
              </a>
            </li>
            <li>
              <a
                href="https://github.com/VanCarlo95"
                target="_blank"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="https://github.com/VanCarlo95"
                target="_blank"
              >
                Blog
              </a>
            </li>
          </ul>
        </nav> */}
        <div className="copyright">
          &copy; {1900 + new Date().getYear()}
          
        </div>
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
};

export default Footer;
