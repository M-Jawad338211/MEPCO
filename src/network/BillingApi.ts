import { api } from './Enviroment';
import { Method, callApi, fetchData, } from './NetworkManager';



export const billingDetails = async (refernceNumber: any) => {
    const response = await fetchData('27151710924700')
    console.log(response, 'response')
    return response
}

