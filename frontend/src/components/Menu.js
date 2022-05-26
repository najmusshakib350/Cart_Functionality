import { NavLink } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
const Menu = () => {
  return (
    <Navbar bg="dark" expand="lg" className="pt-3 pb-3 mb-3">
      <Container>
        {/* <Navbar.Brand href="#home">E-Commerce</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <NavLink
              to="/product"
              className={(el) => {
                let activeClass = el.isActive === true ? "active_class" : "";
                return `menu_link ${activeClass}`;
              }}
            >
              Product
            </NavLink>
            <NavLink
              to="/sales"
              className={(el) => {
                let activeClass = el.isActive === true ? "active_class" : "";
                return `menu_link ${activeClass}`;
              }}
            >
              Sales
            </NavLink>
            <NavLink
              to="/cart"
              className={(el) => {
                let activeClass = el.isActive === true ? "active_class" : "";
                return `menu_link ${activeClass}`;
              }}
            >
              Cart
            </NavLink>
            <NavLink
              to="/report"
              className={(el) => {
                let activeClass = el.isActive === true ? "active_class" : "";
                return `menu_link ${activeClass}`;
              }}
            >
              Report
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
