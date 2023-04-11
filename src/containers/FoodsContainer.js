import React from 'react'
import FoodCard from '../components/foodCard.js'
import {connect} from 'react-redux'
import {getFoods} from '../actions/foodActions.js'
import searchIcon from '../search-icon.png'
// import {searchFoods} from '../actions/foodActions.js'
// import { setFoods } from '../actions/foodActions.js'
import { isContentEditable } from '@testing-library/user-event/dist/utils/index.js'

// TODO
// sort results by 'foodCategory'
// 


class FoodsContainer extends React.Component {

    state = {
        search: "",
        noFoodsFoundMessage: "",
        foods: []
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


    // handleSearch = (e) => {
    //     e.preventDefault()

    //     const searchTerm = this.state.search
    //     this.props.searchFoods(searchTerm)
    //     console.log("in searchFoods => search:", searchTerm)
        
    // }

    handleFormChange = (e) => {
        const value = e.target.value
        this.setState({
            ...this.state,
            search: value
        })
        // this.searchFoods()
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

    // class Input extends React.Component {
    //     _handleKeyDown = (e) => {
    //       if (e.key === 'Enter') {
    //         console.log('do validate');
    //       }
    //     }

    createFoodCards() {
        let foods = this.state.foods
        console.log(foods)
        
        // if (foods && this.state.search.length !== 0) {
        //     foods = foods.filter(food => food.description.toLowerCase().includes(this.state.search.toLocaleLowerCase()))
            
        //     // if (foods.length === 0 && this.state.search.length !== 0) {
        //     //     console.log("Message:", this.state.noFoodsFoundMessage)
        //     //     this.setState({
        //     //         ...this.state,
        //     //         noFoodsFoundMessage: "No foods found!"
        //     //     })
        //     // }
        // }

        if (foods) {
            return foods.map(food => <FoodCard 
                key={food.fdcId} 
                description={food.description} 
                brand={food.brandName}
                category={food.foodCategory}
                carbs={this.findCarbs(food)}
                servingSize={this.findServingSize(food)}
                // servingSize={food.householdServingFullText ? food.householdServingFullText : food.servingSize ? food.servingSize + food.servingSizeUnit : "Undefined"}
                />)
        }
    }

    render() {
        return (
            <div className="">
                <input type="text" className="mt-4 mb-2 rounded border-info" placeholder="search foods" value={this.state.search} onKeyDown={this.handleEnterKey} onChange={this.handleFormChange}></input>
                <button className="btn-primary" onClick={this.handleSearch}>search</button>
                <div className="card-group">{this.createFoodCards()}</div>
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Attention!</strong> <br></br>This application is currently under development, and should NOT be used to make any dietary decisions in its current state!
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