

function FoodCard(props) {

    
    return(
        <div className="border rounded shadow mb-2 w-75 bg-dark" id={'fdc-id-' + props.fdcId}>
            {/* <h2>{(props.description).split(',')[0]}</h2> */}
            <h3>{props.description}</h3>
            <h3>Carbohydrates:</h3>
            <h3>{props.carbs}g</h3>
            <h3>per {props.servingSize}</h3>
        </div>
    )
}

export default FoodCard