import React from 'react'
import FoodCard from '../components/FoodCard.js'
import {connect} from 'react-redux'
import {getFoods} from '../actions/foodActions.js'


class FoodsContainer extends React.Component {

    state = {
        search: ""
    }

    componentDidMount() {
        this.props.getFoods()
    }

    handleFormChange = (e) => {
        const value = e.target.value
        this.setState({
            search: value
        })
        // console.log(this.state.search)
    }

    createFoodCards() {
        let foods = this.props.foods.FoundationFoods
        // console.log(this.props.foods.FoundationFoods[0])
        
        if (foods && this.state.search.length !== 0) {
            foods = foods.filter(food => food.description.toLowerCase().includes(this.state.search.toLocaleLowerCase()))
        }

        if (foods) {

            console.log(foods)
            // console.log(foods[0].foodPortions[0].measureUnit.name)
            console.log(foods[0].foodPortions[0].measureUnit.name)
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
            <div className="">
                <h2>Search:</h2>
                <input type="text" vlaue={this.state.search} onChange={this.handleFormChange}></input><br></br><br></br>
                {this.createFoodCards()}
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