

function FoodCard(props) {

    
    return(
        <div className="rounded shadow ml-4 mr-4 mb-3 pb-1 pt-1 bg-dark" id={'fdc-id-' + props.key}>
            <h1>{(props.description).split(',')[0]}</h1>
            <p>{props.description}</p>
            <h2>Carbs: <span className="text-info">{Math.round(props.carbs)}g</span></h2>
            <h3>per <span className="text-info">{props.servingSize}</span></h3>
        </div>
    )
}

export default FoodCard