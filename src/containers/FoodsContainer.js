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
        console.log(this.props.foods.FoundationFoods)
    }

    createFoodCards() {
        let foods = this.props.foods.BrandedFoods
        // carbs={(food.foodNutrients).find(food => food.nutrient.name.toLowerCase() === 'glucose')}
    
        if (foods) {
            // console.log(foods.first)
            // console.log(foods.map(food => (food.foodNutrients).find(food => food.nutrient.name.toLowerCase() == 'glucose')))
            return foods.map(food => <FoodCard key={food.fdcId} description={food.description} carbs={food.labelNutrients.carbohydrates.value} servingSize={food.servingSize + food.servingSizeUnit}/>)
        }
    }

    render() {
        return (
            <div>
                {/* <p>You are in FoodsContainer</p> */}
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