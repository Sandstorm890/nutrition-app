// const url = 'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=QhydPZDu2L1Q1Faaw3ZO6bJ53WEu66LdBHIMfdDF&query='
// const url_all = 'https://api.nal.usda.gov/fdc/v1/foods/list?api_key=QhydPZDu2L1Q1Faaw3ZO6bJ53WEu66LdBHIMfdDF'
// import FoodData from '../resources/FoodData.json'
export const setFoods = (foods) => ({type: 'GOT_FOODS', payload: foods})

export const getFoods = () => {

    return (dispatch) => {
        fetch('FoodData.json')
        .then(r => r.json())
        .then(json => {
            dispatch(setFoods(json))
        })
    }

}