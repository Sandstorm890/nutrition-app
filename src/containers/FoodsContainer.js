import React from 'react'
import FoodCard from '../components/FoodCard.js'
import {connect} from 'react-redux'
import {searchFoods} from '../actions/foodActions.js'
import { setFoods } from '../actions/foodActions.js'
import {getFoods} from '../actions/foodActions.js'


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
        let URL = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=QhydPZDu2L1Q1Faaw3ZO6bJ53WEu66LdBHIMfdDF&query=${this.state.search}&format=full&dataType=Foundation&pageSize=200&pageNumber=1`;
        // let URL = 'https://api.nal.usda.gov/fdc/v1/food/1104812?api_key=QhydPZDu2L1Q1Faaw3ZO6bJ53WEu66LdBHIMfdDF&format=full&nutrients=205'
        console.log(URL);
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
                carbs={(food.foodNutrients.find(foodNutrient => foodNutrient.nutrientName === "Carbohydrate, by difference")) ? food.foodNutrients.find(foodNutrient => foodNutrient.nutrientName === "Carbohydrate, by difference").value: "Undefined"}
                servingSize={this.findServingSize(food)}
                // servingSize={food.householdServingFullText ? food.householdServingFullText : food.servingSize ? food.servingSize + food.servingSizeUnit : "Undefined"}
                />)
        }
    }

    render() {
        return (
            <div className="bg-">
                {/* <h3 className="pt-3 text-">Search:</h3> */}
                <input type="text" className="mt-4 mb-2 rounded border-info" placeholder="search foods" value={this.state.search} onChange={this.handleFormChange}></input>
                <button className="ml-1 btn-primary" onClick={this.handleSearch}>search</button>
                {/* <p>{this.state.noFoodsFoundMessage}</p> */}
                <div className="card-group">{this.createFoodCards()}</div>
                
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