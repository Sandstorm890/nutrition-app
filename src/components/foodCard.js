

function FoodCard(props) {

    
    return(
        <div className="card-body col-sm-12">

            <div className="rounded shadow pl-2 pt-2 pb-2 bg-dark" id={'fdc-id-' + props.key}>
                <h1>{(props.description)}</h1>
                <p>{props.brand}</p>
                <h2>Carbs: <span className="text-info">{Math.round(props.carbs)}g</span></h2>
                <h3>per <span className="text-info">{props.servingSize}</span></h3>
            </div>

        </div>
    )
}

export default FoodCard