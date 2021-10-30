import React from 'react';
import { Media, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';


/*
*    deleting a favorites dish make the server stop lol
*/


function RenderFavDish({dish, deleteFavorite}) {
    return (
        <Media tag="li">
            <Media left middle>
                <Media object src={baseUrl + dish.image} alt={dish.name}/>
            </Media>
            <Media body className="ml-5">
                <Media heading>{dish.name}</Media>
                <p>{dish.description}</p>
                <Button outline color="danger" onClick={() => deleteFavorite(dish._id)}>
                    <span className="fa fa-times"/>
                </Button>
            </Media>
        </Media>
    );
}

function Favorites({favorites, deleteFavorite}) {
    if (favorites.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (favorites.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{favorites.errMess}</h4>
                </div>
            </div>
        );
    } else if (favorites.favorites) {
        const favorites = favorites.favorites.dishes.map(dish => (
           <div key={dish._id} className="col-12 mt-5">
                <RenderFavDish dish={dish} deleteFavorite={deleteFavorite} />
           </div>
        ))

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>My Favorites</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>My Favorites</h3>
                        <hr />
                    </div>
                    <div className="row">
                        <Media list>
                            {favorites}
                        </Media>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container">
                <div className="row">
                    <h4>You have no favorites</h4>
                </div>
            </div>
        );
    }
}

export default Favorites