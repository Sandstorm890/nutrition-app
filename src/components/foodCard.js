

function FoodCard(props) {

    console.log(props.carbs)
    
    return(
        <div id={'fdc-id-' + props.fdcId}>
            <h2>{(props.description).split(',')[0]}</h2>
            {/* <h3>{props.description}</h3> */}
            <h3>Carbohydrates:</h3>
            <h3>{props.carbs}g</h3>
            <h3>Serving Size:</h3>
            <h3>{props.servingSize}</h3>
        </div>
    )
}

export default FoodCard