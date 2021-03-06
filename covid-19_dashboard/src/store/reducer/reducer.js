import * as actionTypes from '../action/actionTypes';

const initialState = {
    total: 0,
    recovered: 0,
    active: 0,
    death:0,
    countryData: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_AGGREGATE_DATA_SUCCESS:
            return{
                ...state,
                total: action.data.TotalConfirmed,
                recovered: action.data.TotalRecovered,
                active: action.data.TotalConfirmed-(action.data.TotalRecovered+action.data.TotalDeaths),
                death: action.data.TotalDeaths
            };
        case actionTypes.FETCH_COUNTRY_DATA_SUCCESS:
            const updatedCountryData=[];
            for(let i in action.data){
                updatedCountryData.push({
                    name: action.data[i].name,
                    totalCases: action.data[i].latest_data.confirmed,
                    recoveredCases: action.data[i].latest_data.recovered,
                    flagURL: 'https://www.countryflags.io/' + action.data[i].code + '/flat/32.png',
                    coordinates: action.data[i].coordinates,
                    code: action.data[i].code
                })
            }
            console.log(state);
            return{
                ...state,
                countryData: updatedCountryData
            }
        default:
            return state;
    }
}

export default reducer;