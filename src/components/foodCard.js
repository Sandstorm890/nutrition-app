

function FoodCard(props) {

    
    return(
        <div className="border rounded shadow ml-4 mr-4 mb-3 bg-dark" id={'fdc-id-' + props.key}>
            <h1>{(props.description).split(',')[0]}</h1>
            <p>{props.description}</p>
            <h2>Carbs: {props.carbs}g</h2>
            <h3>per {props.servingSize}</h3>
        </div>
    )
}

export default FoodCard