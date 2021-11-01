import React, {Component} from 'react';
import Home from './HomeComponent';
import About from './AboutComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    postComment,
    fetchDishes,
    fetchComments,
    fetchPromos,
    fetchLeaders,
    postFeedback,
    loginUser,
    logoutUser,
    postSignUp,
    fetchFavorites,
    postFavorite,
    deleteFavorite
} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import Favorites from "./FavoriteComponent";

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders,
        authentication: state.authentication,
        signUpUser: state.signUpUser,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    postFeedback: (feedback) => dispatch(postFeedback(feedback)),
    fetchDishes: () => {dispatch(fetchDishes())},
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    postSignUp: (firstname, lastname, username, password) => dispatch(postSignUp(firstname, lastname, username, password)),
    fetchFavorites: () => dispatch(fetchFavorites()),
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
});

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
        this.props.fetchFavorites();
    }

    render() {

        const HomePage = () => {
            return (
                <Home
                    dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    promoLoading={this.props.promotions.isLoading}
                    promoErrMess={this.props.promotions.errMess}
                    leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                    leadersLoading={this.props.leaders.isLoading}
                    leadersErrMess={this.props.leaders.errMess}
                />
            );
        }

        const DishWithId = ({match}) => {
            return (
                this.props.authentication.isAuthenticated
                ?
                <DishDetail
                    dish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.comments.filter((comment) => comment.dish === match.params.dishId)}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                    favorite={this.props.favorites}
                    postFavorite={this.props.postFavorite}
                    deleteFavorite={this.props.deleteFavorite}
                />
                :
                <DishDetail
                    dish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.comments.filter((comment) => comment.dish === match.params.dishId)}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                    favorite={this.props.favorites}
                    postFavorite={this.props.postFavorite}
                />
            );
        };

        const PrivateRoute = ({component: Component, ...rest}) => (
            <Route
                {...rest}
                render={(props) => (
                    this.props.authentication.isAuthenticated
                    ? <Component {...props} />
                    : <Redirect to={{ pathname: '/home', state: {from: props.location} }}/>
                )}
            />
        );

        return (
            <div>
                <Header
                    authentication={this.props.authentication}
                    loginUser={this.props.loginUser}
                    logoutUser={this.props.logoutUser}

                    postSignUp={this.props.postSignUp}
                    signUpUser={this.props.signUpUser}
                />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch location={this.props.location}>
                            <Route path='/home'
                                   component={HomePage}/>
                            <Route exact path='/aboutus'
                                   component={() => <About leaders={this.props.leaders} isLoading={this.props.leaders.isLoading} errMess={this.props.leaders.errMess}/>}/>
                            <Route exact path='/menu'
                                   component={() => <Menu dishes={this.props.dishes}/>}/>
                            <Route path='/menu/:dishId'
                                   component={DishWithId}/>
                            <PrivateRoute
                                exact
                                path='/favorites'
                                component={() => <Favorites favorites={this.props.favorites} deleteFavorite={this.props.deleteFavorite} /> }
                            />
                            <Route exact path='/contactus'
                                   component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>}/>
                            <Redirect to="/home" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));