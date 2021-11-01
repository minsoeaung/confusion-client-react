import React, {Component} from 'react';
import {
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    NavItem,
    Jumbotron,
    Form,
    FormGroup,
    Input,
    Label,
    Button,
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';
import {NavLink} from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isLoginModalOpen: false,
            isSignUpModalOpen: false
        };

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.toggleSignUpModal = this.toggleSignUpModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleLoginModal() {
        this.setState({
            isLoginModalOpen: !this.state.isLoginModalOpen
        });
    }

    toggleSignUpModal() {
        this.setState({
            isSignUpModalOpen: !this.state.isSignUpModalOpen
        });
    }

    handleLogin(event) {
        this.toggleLoginModal();
        // alert("Username: " + this.username.value + " Password: " + this.password.value + " Remember: " + this.remember.checked);
        this.props.loginUser({
            username: this.username.value,
            password: this.password.value
        })
        event.preventDefault();
    }

    handleSignUp(event) {
        this.toggleSignUpModal();
        // alert("first: " + this.firstname.value + " last: " + this.lastname.value + " username: " + this.username.value + " pass: " + this.password.value)
        this.props.postSignUp({
            firstname: this.firstname.value,
            lastname: this.lastname.value,
            username: this.username.value,
            password: this.password.value
        })
        event.preventDefault()
    }

    handleLogout() {
        this.props.logoutUser()
    }

    render() {
        return (
            <>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav}/>
                        <NavbarBrand className="mr-auto" href="/">
                            <img src='assets/images/logo.png' height="30" width="41" alt='Ristorante Con Fusion'/>
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to='/home'><span className="fa fa-home fa-lg"/> Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"/> About Us</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/menu'><span className="fa fa-list fa-lg"/> Menu</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/favorites"><span className="fa fa-heart fa-lg"/> My Favorites</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"/> Contact Us</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    {
                                        !this.props.authentication.isAuthenticated
                                            ?
                                                <>
                                                    <Button outline onClick={this.toggleLoginModal} className="mr-3">
                                                        <span className="fa fa-sign-in fa-lg"/> Login
                                                        {this.props.authentication.isLoading && <span className="fa fa-spinner fa-pulse fa-fw"/>}
                                                    </Button>
                                                    <Button outline onClick={this.toggleSignUpModal}>
                                                        <span className="fa fa-user-plus fa-lg"/> Create Account
                                                        {this.props.signUpUser.isLoading && <span className="fa fa-spinner fa-pulse fa-fw"/>}
                                                    </Button>
                                                </>
                                            :
                                            <div>
                                                <div className="navbar-text mr-3">{this.props.authentication.user.username}</div>
                                                <Button outline onClick={this.handleLogout}>
                                                    <span className="fa fa-sign-out fa-lg"/> Logout
                                                    {this.props.authentication.isLoading && <span className="fa fa-spinner fa-pulse fa-fw"/>}
                                                </Button>
                                            </div>
                                    }
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante con Fusion</h1>
                                <p>
                                    We take inspiration from the World's best cuisines, and create a unique fusion
                                    experience. Our lipsmacking creations will tickle your culinary senses!
                                </p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>

                {/*--------------------------------------------- LOGIN MODAL -------------------------------------------*/}

                <Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal}>
                    <ModalHeader toggle={this.toggleLoginModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                       innerRef={(input) => this.username = input}/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                       innerRef={(input) => this.password = input}/>
                            </FormGroup>
                            {/*<FormGroup check>*/}
                            {/*    <Label check>*/}
                            {/*        <Input type="checkbox" name="remember" innerRef={(input) => this.remember = input}/>*/}
                            {/*        Remember me*/}
                            {/*    </Label>*/}
                            {/*</FormGroup>*/}
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>

                {/*--------------------------------------------- SIGN UP MODAL -------------------------------------------*/}

                <Modal isOpen={this.state.isSignUpModalOpen} toggle={this.toggleSignUpModal}>
                    <ModalHeader toggle={this.toggleSignUpModal}>Create Account</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSignUp}>
                            <FormGroup>
                                <Label htmlFor="firstname">First Name</Label>
                                <Input type="text" id="firstname" name="firstname"
                                       innerRef={(input) => this.firstname = input}/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="lastname">Last Name</Label>
                                <Input type="text" id="lastname" name="lastname"
                                       innerRef={(input) => this.lastname = input}/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                       innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                       innerRef={(input) => this.password = input} />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Create Account</Button>
                        </Form>
                    </ModalBody>
                </Modal>

            </>
        );
    }
}

export default Header;