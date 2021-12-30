const foodReducer = (state = {foods: []}, action) => {
    switch(action.type){
        case "GOT_FOODS":
            return {...state, foods: action.payload}
        default:
            return state
    }
}

export default foodReducer