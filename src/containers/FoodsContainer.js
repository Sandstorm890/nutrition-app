import React from 'react'
import FoodCard from '../components/FoodCard.js'
import {connect} from 'react-redux'
import {searchFoods} from '../actions/foodActions.js'
import {getFoods} from '../actions/foodActions.js'


class FoodsContainer extends React.Component {

    state = {
        search: "",
        noFoodsFoundMessage: ""
    }

    componentDidMount() {
        this.props.getFoods()
    }

    handleSearch = (e) => {
        e.preventDefault()

        const searchTerm = this.state.search
        this.props.searchFoods(searchTerm)
        console.log("in searchFoods => search:", searchTerm)
        
    }

    handleFormChange = (e) => {
        const value = e.target.value
        this.setState({
            ...this.state,
            search: value
        })
        // this.searchFoods()
    }

    createFoodCards() {
        let foods = this.props.foods.FoundationFoods
        console.log(this.props.foods)
        
        if (foods && this.state.search.length !== 0) {
            foods = foods.filter(food => food.description.toLowerCase().includes(this.state.search.toLocaleLowerCase()))
            
            // if (foods.length === 0 && this.state.search.length !== 0) {
            //     console.log("Message:", this.state.noFoodsFoundMessage)
            //     this.setState({
            //         ...this.state,
            //         noFoodsFoundMessage: "No foods found!"
            //     })
            // }
        }

        if (foods) {
            return foods.map(food => <FoodCard 
                key={food.fdcId} 
                description={food.description} 
                carbs={(food.foodNutrients.find(foodNutrient => foodNutrient.nutrient.name === "Carbohydrate, by difference")) ? food.foodNutrients.find(foodNutrient => foodNutrient.nutrient.name === "Carbohydrate, by difference").amount : "Undefined"}
                servingSize={(food.foodPortions.find(foodPortion => foodPortion.measureUnit)) ? food.foodPortions.find(foodPortion => foodPortion.measureUnit).measureUnit.name : "Undefined"}
                />)
        }
    }

    render() {
        return (
            <div className="bg-">
                {/* <h3 className="pt-3 text-">Search:</h3> */}
                <input type="text" className="mt-4 mb-2 rounded border-info" placeholder="search foods" value={this.state.search} onChange={this.handleFormChange}></input>
                {/* <button className="ml-1 btn-primary" onClick={this.handleSearch}>search</button> */}
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
        searchFoods: () => dispatch(searchFoods()),
        getFoods: () => dispatch(getFoods())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodsContainer)