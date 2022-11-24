import { Button, Collapse, Container, Dropdown, Form, ListGroup, ListGroupItem, Nav, Navbar, NavbarBrand, NavDropdown, NavLink} from "react-bootstrap";
const aspect = '';
export default function NavIndex() {
    return (
        <>
            <Navbar bg="" variant="dark" expand="lg" id="navindex">
                <Container fluid>
                    <Navbar.Brand href="#navindex" id="aspectnav">Aspect Bridge</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '10%' }} navbarScroll>

                            <Nav.Link href="#">Home</Nav.Link>{' '}
                            <Nav.Link  href="#about">About</Nav.Link>{' '}
                            <NavDropdown title="Partners" id="navbarPartnersDropdown">
                                <Nav.Link href="https://logan.aspectbridge.com">Logan</Nav.Link>
                                <NavDropdown.Divider />
                                <Nav.Link href="https://logantest.aspectbridge.com" disabled>Logan_Test_Live</Nav.Link>
                                <Nav.Link href="/josh/index.html">Logan_Test_Dev</Nav.Link>
                            </NavDropdown>{' '}

                            <NavDropdown title="Projects" id="navbarProjectsDropdown">
                                <Nav.Link href="/grid/index.html">Grid</Nav.Link>
                                <NavDropdown.Divider />
                                <Nav.Link href="/wasd/index.html" disabled>wasd</Nav.Link>
                            </NavDropdown>{' '}

                            <NavDropdown title="Resources" id="navbarResourcesDropdown">
                                <NavDropdown.Item href="#ankor1" disabled>Wiki</NavDropdown.Item>
                                <NavDropdown.Item href="#ankor2" disabled>Mimicry Wiki</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#ankor3" disabled>Other Wikis</NavDropdown.Item>
                            </NavDropdown>{' '}
                            
                        </Nav>{' '}
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="primary">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}