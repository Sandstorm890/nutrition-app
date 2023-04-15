import React from 'react'
import FoodCard from '../components/foodCard.js'
import {connect} from 'react-redux'
import {getFoods} from '../actions/foodActions.js'
import Dropdown from 'react-bootstrap/Dropdown';
import searchIcon from '../search-icon.png'
// import {searchFoods} from '../actions/foodActions.js'
// import { setFoods } from '../actions/foodActions.js'
import { isContentEditable } from '@testing-library/user-event/dist/utils/index.js'
import { Navbar, NavbarBrand } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



// TODO
// sort results by 'foodCategory'
// 


class FoodsContainer extends React.Component {

    state = {
        search: "",
        noFoodsFoundMessage: "",
        foods: [],
        categories: []
    }

    componentDidMount() {
        // this.props.getFoods()
    }

    handleSearch = () => {
        let URL = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=QhydPZDu2L1Q1Faaw3ZO6bJ53WEu66LdBHIMfdDF&query=${this.state.search}&format=full&dataType=Foundation&dataType=Branded&pageSize=200&pageNumber=1`;
        // let URL = 'https://api.nal.usda.gov/fdc/v1/food/1104812?api_key=QhydPZDu2L1Q1Faaw3ZO6bJ53WEu66LdBHIMfdDF&format=full&nutrients=205'
        console.log(URL);

        // this fetch really needs to move to foodActions when we figure out how to acces search term from there
        fetch(URL, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }})
        .then(r => r.json())
        .then(json => {
            this.setState({
                ...this.state,
                foods: json.foods
            })
        })}

    // handleSearch = (e) => {
    //     e.preventDefault()

    //     const searchTerm = this.state.search
    //     this.props.searchFoods(searchTerm)
    //     console.log("in searchFoods => search:", searchTerm)
    // }

    findServingSize = (food) => {
        if (food.dataType == "Foundation") {
            return "Serving"
        }

        if (food.householdServingFullText) {
            return food.householdServingFullText != "1 ONZ" ? food.householdServingFullText : "1 oz"  
        } else if (food.servingSize) {
            switch(food.servingSizeUnit) {
                case "g" || "G":
                    return Math.round(food.servingSize/28) + " oz"
                default: 
                    return food.servingSize + food.servingSizeUnit    
            }
        } else {
            return "Undefined"
        }
    }

    handleFormChange = (e) => {
        const value = e.target.value
        this.setState({
            ...this.state,
            search: value
        })
    }

    handleCategoryChange = (categories) => {
        this.setState({
            ...this.state,
            categories: categories
        })
    }

    handleEnterKey = (e) => {
        if (e.key === "Enter") {
            this.handleSearch()
        }
    }
  
    // this should probably be rewritten
    findCarbs = (food) => {

        if (food.foodNutrients.find(foodNutrient => foodNutrient.nutrientName === "Carbohydrate, by difference")) {
            return food.foodNutrients.find(foodNutrient => foodNutrient.nutrientName === "Carbohydrate, by difference").value
        } else if (food.foodNutrients.find(foodNutrient => foodNutrient.nutrientName === "Sugars, total including NLEA")) {
            return food.foodNutrients.find(foodNutrient => foodNutrient.nutrientName === "Sugars, total including NLEA").value
        }

    }

    createCategoriesDropdown() {
        let categories = this.state.categories
        // console.log(categories)

        if (categories.length != 0) {
            return (
                
                
                <NavDropdown className="font-weight-light h6" menuVariant="" title="Categories">
                    {categories.map(category => <NavDropdown.Item>{category}</NavDropdown.Item>)}
                </NavDropdown>

                
              );
        } 
        
        // else if (categories.length == 0) {
        //         return (
        //             <Nav.Link disabled>
                        
        //             </Nav.Link>)
            
        // }
    }

    createFoodCards() {
        let foods = this.state.foods

        

        if (foods) {

            this.state.categories = [...new Set(foods.map(item => item.foodCategory))]

            return foods.map(food => <FoodCard 
                key={food.fdcId} 
                description={food.description} 
                brand={food.brandName}
                category={food.foodCategory}
                carbs={this.findCarbs(food)}
                servingSize={this.findServingSize(food)}
                />)
        }
    }

    // move all this logic to separate components
    render() {

        let foodCards = this.createFoodCards()

        return (
            <div className="">
                <Navbar variant="" bg="dark" id="navbarScroll" sticky="" expand="lg" fixed="top" className="rounded">
                    <Navbar.Brand className="text-light">Nutrition App</Navbar.Brand>
                    <Container fluid>
                        <Nav>
                            {this.createCategoriesDropdown()}
                        </Nav>
                        <Nav>
                            <Form className="d-flex">
                                <Form.Control
                                onKeyDown={this.handleEnterKey} 
                                onChange={this.handleFormChange}
                                type="search"
                                placeholder="Search Foods"
                                className=""
                                aria-label="Search"
                                />
                            </Form>
                            <Button onClick={this.handleSearch} className="" variant="outline-info">Search</Button>

                        </Nav>
                    </Container>
                </Navbar>

                <div className="">
                    <p></p>
                    <div className="card-group pt-4">{foodCards}</div>
                    <div class="alert alert-warning fade show pl-4 pr-4" role="alert">
                        <strong>Attention!</strong><br></br><p>This application is currently under development, and should NOT be used to make any dietary decisions in its current state!</p>
                    </div>

                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    const foods = state.foods
    return {
        foods: foods
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFoods: () => dispatch(getFoods())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodsContainer)