import React, { Component } from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Label,
    Row,
    Col,
    CardImgOverlay
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import StarRating from "./StarRatingComponent";

function RenderDish({dish, favorite, postFavorite, deleteFavorite}) {
    let isFavDish;

    /*

    *  all about isFavDish is hard coded
    *  favorite.favorites should not be null
    *  favorite.favorites.dishes should not be null
    *  this is probably server side issue,
    *  server should only send empty array, not null
    *  that way, client will have no issue
    *  however will fix this in server-side later once i have more knowledge of it
    *
    */

    // the Immediately Invoked Function Expression (IIFE)
    (() => {
        if (favorite.favorites === null)
            isFavDish = false
        else if (Array.isArray(favorite.favorites.dishes))
           isFavDish = favorite.favorites.dishes.some(favDish => favDish._id === dish._id)
        else
            isFavDish = false
    })()

    function handleHeartClick() {
        if(isFavDish) deleteFavorite(dish._id)
        else postFavorite(dish._id)
    }

    return (
        <div className="col-12 col-md-5 m-1">
            <FadeTransform in transformProps={{exitTransform: 'scale(0.5) translateY(-50%)'}}>
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                    <CardImgOverlay>
                        <Button outline color="primary" onClick={handleHeartClick}>
                            {isFavDish
                                ? <span className="fa fa-heart"/>
                                : <span className="fa fa-heart-o"/>
                            }
                        </Button>
                    </CardImgOverlay>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
    );
}

function RenderComments({comments, postComment, dishId}) {
    if(comments != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled pb-2">
                <Stagger in>
                    {comments.map((comment) => {
                        const name = comment.author === null ? "deleted user" : comment.author.username;
                        return (
                        <Fade key={comment._id}>
                            <li className="mt-4 bg-light pt-3 pl-3 pr-3 pb-2 rounded">
                                <span className="fa fa-user-circle fa-lg mr-1"/> {name}
                                <div className="row pl-3 align-items-center text-muted">
                                    <StarRating value={comment.rating} /> &nbsp;
                                    <span className="small">{new Intl.DateTimeFormat('en-UK', { year: 'numeric', month: 'numeric', day: '2-digit'}).format(new Date(Date.parse(comment.updatedAt)))}</span>
                                </div>
                                <span className="text-secondary">{comment.comment}</span>
                            </li>
                        </Fade>
                        );
                    })}
                </Stagger>
                    <li>
                        <CommentForm dishId={dishId} postComment={postComment}/>
                    </li>
                </ul>
            </div>
        );
    } else {
        return (<div/>);
    }
}

function DishDetail(props) {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} favorite={props.favorite} postFavorite={props.postFavorite} deleteFavorite={props.deleteFavorite}/>
                    <RenderComments comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish._id}
                    />
                </div>
            </div>
        );
    } else {
        return (<div/>);
    }
}

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false,
            rating: 1,
            comment: "",
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleChange(event) {
        this.setState({
            rating: event.target.value
        })
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, this.state.rating, values.comment);
    }

    render() {
        return (
            <>
                <Button className="mt-4" outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"/> Submit Comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" name="rating" className="form-control"
                                        value={this.state.rating} onChange={this.handleChange}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

export default DishDetail;