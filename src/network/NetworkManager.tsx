// import { Keys } from '../constants/keys'
// import { getDataFromStorage } from '../utils/storage'
// import { baseURL, billEstimatortUrl, billingBaseUrl, cfpLoginUrl, changeLoad, changeName, changeTariff, cnicUpdation, complanitBaseUrl, dashBoardUrl, feederCode, grapghBaseUrl, loadProfileBaseUrl, monthlyConsumption, monthlyConsumptionBaseUrl, newConnections, paymentBaseUrl, subDivList, targetSetting } from './Enviroment'

import { baseURL, billingBaseUrl } from "./Enviroment"

export const AUTHORIZE = 'AUTHORIZE'
export const NETWORK_ERROR = 'NETWORK ERROR'
export const EXPIRED_STATE = 3000204

export enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

var defaultHeaders: any = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}

export const callApi = async (endPoint : any, method : any, data : any, isBearer : any, multipart : any,isPageUrl : any) => {
    var url = billingBaseUrl + endPoint
    console.log(url)
    if (isBearer) {
        // const token = await getDataFromStorage('token')
        // defaultHeaders['Authorization'] = 'Bearer ' + token
    } else {
        delete defaultHeaders.Authorization
    }
    if (multipart) {
        defaultHeaders['Content-Type'] = 'multipart/form-data'
    }
    else {
        defaultHeaders['Content-Type'] = 'application/json'
    }
    try {
        let response = await fetch(url, {
            method: method,
            headers: defaultHeaders,
            body: method == Method.GET ? null : multipart ? data : JSON.stringify(data),
        })
        // console.log(response,'resssss')

        let responseJson = await response.json()
        // console.log(responseJson, 'json')
        return responseJson
    } catch (error) {
        console.log('error:', error)
    }
}

export const fetchData = async (
    uri: string,
    method = Method.GET,
    data = null,
    isBearer = true,
    multipart = false,
    isPageUrl = false,
) => {
    const resData = await callApi(uri, method, data, isBearer, multipart, isPageUrl)
    // console.log(data)
    return resData
}


// export const callApiGraph = async (endPoint, method, data, isBearer, multipart) => {
//     var url = grapghBaseUrl + endPoint
//     // console.log(url, 'uuuuuurrrrrrrlllll')
//     if (isBearer) {
//         // const token = await getDataFromStorage('token')
//         // defaultHeaders['Authorization'] = 'Bearer ' + token
//         var myHeaders: any = new Headers();
//         myHeaders.append("Accept", "application/json");
//         myHeaders.append("Content-type", "application/json");
//         myHeaders.append("username", "admin@kbk");
//         myHeaders.append("password", "admin786");
//         myHeaders.append("code", "1");
//     } else {
//         delete defaultHeaders.Authorization
//     }
//     if (multipart) {
//         defaultHeaders['Content-Type'] = 'multipart/form-data'
//     }
//     else {
//         defaultHeaders['Content-Type'] = 'application/json'
//     }
//     try {
//         let response = await fetch(url, {
//             method: method,
//             headers: myHeaders,
//             body: method == Method.GET ? null : multipart ? data : JSON.stringify(data),
//         })

//         let responseJson = await response.json()
//         return responseJson
//     } catch (error) {
//         console.log('error:', error)
//     }
// }

// export const fetchDataGraph = async (
//     uri: string,
//     method = Method.GET,
//     data = null,
//     isBearer = true,
//     multipart = false,
//     isPageUrl = false,
// ) => {
//     const resData = await callApiGraph(uri, method, data, isBearer, multipart, isPageUrl)
//     console.log(data)
//     return resData
// }

// export const callApiBilling = async (endPoint, method, data, isBearer, multipart) => {
//     var url = billingBaseUrl + endPoint
//     // console.log(url, 'uuuuuurrrrrrrlllll')
//     if (isBearer) {
//         // const token = await getDataFromStorage('token')
//         // defaultHeaders['Authorization'] = 'Bearer ' + token
//     } else {
//         delete defaultHeaders.Authorization
//     }
//     if (multipart) {
//         defaultHeaders['Content-Type'] = 'multipart/form-data'
//     }
//     else {
//         defaultHeaders['Content-Type'] = 'application/json'
//     }
//     try {
//         let response = await fetch(url, {
//             method: method,
//             headers: defaultHeaders,
//             body: method == Method.GET ? null : multipart ? data : JSON.stringify(data),
//         })

//         let responseJson = await response.json()
//         // console.log(responseJson)
//         return responseJson
//     } catch (error) {
//         console.log('error:', error)
//     }
// }

// export const fetchDataBilling = async (
//     uri: string,
//     method = Method.GET,
//     data = null,
//     isBearer = true,
//     multipart = false,
//     isPageUrl = false,
// ) => {
//     const resData = await callApiBilling(uri, method, data, isBearer, multipart, isPageUrl)
//     // console.log(data)
//     return resData
// }

// export const callApiFetchApi = async (endPoint, method, data, isBearer, multipart) => {
//     var url = loadProfileBaseUrl + endPoint
//     // console.log(url, 'uuuuuurrrrrrrlllll')
//     if (isBearer) {
//         // const token = await getDataFromStorage('token')
//         // const privateKey = await getDataFromStorage(Keys.privateKey)
//         // console.log(privateKey, 'ppppppppppppp')
//         // defaultHeaders['Authorization'] = 'Bearer ' + token
//         var myHeaders: any = new Headers();
//         myHeaders.append("Accept", "application/json");
//         myHeaders.append("Content-type", "application/json");
//         // myHeaders.append("privatekey", privateKey);
//     } else {
//         delete defaultHeaders.Authorization
//     }
//     if (multipart) {
//         defaultHeaders['Content-Type'] = 'multipart/form-data'
//     }
//     else {
//         defaultHeaders['Content-Type'] = 'application/json'
//     }
//     try {
//         let response = await fetch(url, {
//             method: method,
//             headers: myHeaders,
//             body: method == Method.GET ? null : multipart ? data : JSON.stringify(data),
//         })

//         let responseJson = await response.json()
//         // console.log(responseJson, 'response json')
//         return responseJson
//     } catch (error) {
//         console.log('error:', error)
//     }

// }

// export const fetchDailyLoad = async (
//     uri: string,
//     method = Method.GET,
//     data = null,
//     isBearer = true,
//     multipart = false,
//     isPageUrl = false,
// ) => {
//     const resData = await callApiFetchApi(uri, method, data, isBearer, multipart, isPageUrl)
//     // console.log(data)
//     return resData
// }



// export const billEstimator = async (endPoint, method, data, isBearer, multipart) => {
//     var url = billEstimatortUrl + endPoint
//     if (isBearer) {
//         // const token = await getDataFromStorage('token')
//         // defaultHeaders['Authorization'] = 'Bearer ' + token
//     } else {
//         delete defaultHeaders.Authorization
//     }
//     if (multipart) {
//         defaultHeaders['Content-Type'] = 'multipart/form-data'
//     }
//     else {
//         defaultHeaders['Content-Type'] = 'application/json'
//     }
//     try {
//         let response = await fetch(url, {
//             method: method,
//             headers: defaultHeaders,
//             body: method == Method.GET ? null : multipart ? data : JSON.stringify(data),
//         })
//         // console.log(response,'resssss')

//         let responseJson = await response.json()
//         // console.log(responseJson, 'json')
//         return responseJson
//     } catch (error) {
//         console.log('error:', error)
//     }
// }

// export const fetchBillEstimator = async (
//     uri: string,
//     method = Method.GET,
//     data = null,
//     isBearer = true,
//     multipart = false,
//     isPageUrl = false,
// ) => {
//     const resData = await billEstimator(uri, method, data, isBearer, multipart, isPageUrl)
//     // console.log(data)
//     return resData
// }

// export const callApiBill = async (endPoint, method, data, isBearer, multipart) => {
//     var url = paymentBaseUrl + endPoint
//     // console.log(url, 'uuuuuurrrrrrrlllll')
//     if (isBearer) {
//         // const token = await getDataFromStorage('token')
//         // defaultHeaders['Authorization'] = 'Bearer ' + token
//     } else {
//         delete defaultHeaders.Authorization
//     }
//     if (multipart) {
//         defaultHeaders['Content-Type'] = 'multipart/form-data'
//     }
//     else {
//         defaultHeaders['Content-Type'] = 'application/json'
//     }
//     try {
//         let response = await fetch(url, {
//             method: method,
//             headers: defaultHeaders,
//             body: method == Method.GET ? null : multipart ? data : JSON.stringify(data),
//         })

//         let responseJson = await response.json()
//         // console.log(responseJson)
//         return responseJson
//     } catch (error) {
//         console.log('error:', error)
//     }
// }

// export const fetchDataBill = async (
//     uri: string,
//     method = Method.GET,
//     data = null,
//     isBearer = true,
//     multipart = false,
//     isPageUrl = false,
// ) => {
//     const resData = await callApiBill(uri, method, data, isBearer, multipart, isPageUrl)
//     // console.log(data)
//     return resData
// }

// export const callApiConsumption = async (endPoint, method, data, isBearer, multipart) => {
//     var url = monthlyConsumptionBaseUrl + endPoint
//     // console.log(url, 'uuuuuurrrrrrrlllll')
//     if (isBearer) {
//         // const token = await getDataFromStorage('token')
//         // defaultHeaders['Authorization'] = 'Bearer ' + token
//     } else {
//         delete defaultHeaders.Authorization
//     }
//     if (multipart) {
//         defaultHeaders['Content-Type'] = 'multipart/form-data'
//     }
//     else {
//         defaultHeaders['Content-Type'] = 'application/json'
//     }
//     try {
//         let response = await fetch(url, {
//             method: method,
//             headers: defaultHeaders,
//             body: method == Method.GET ? null : multipart ? data : JSON.stringify(data),
//         })

//         let responseJson = await response.json()
//         // console.log(responseJson)
//         return responseJson
//     } catch (error) {
//         console.log('error:', error)
//     }
// }

// export const fetchDataConsumption = async (
//     uri: string,
//     method = Method.GET,
//     data = null,
//     isBearer = true,
//     multipart = false,
//     isPageUrl = false,
// ) => {
//     const resData = await callApiConsumption(uri, method, data, isBearer, multipart, isPageUrl)
//     // console.log(data)
//     return resData
// }


// export const callFeederCode = async (endPoint, method, data, isBearer, multipart) => {
//     var url = feederCode + endPoint
//     if (isBearer) {
//         // const token = await getDataFromStorage('token')
//         // defaultHeaders['Authorization'] = 'Bearer ' + token
//     } else {
//         delete defaultHeaders.Authorization
//     }
//     if (multipart) {
//         defaultHeaders['Content-Type'] = 'multipart/form-data'
//     }
//     else {
//         defaultHeaders['Content-Type'] = 'application/json'
//     }
//     try {
//         let response = await fetch(url, {
//             method: method,
//             headers: defaultHeaders,
//             body: method == Method.GET ? null : multipart ? data : JSON.stringify(data),
//         })
//         let responseJson = await response.json()
//         return responseJson
//     } catch (error) {
//         console.log('error:', error)
//     }
// }

// export const fetchFeederCode = async (
//     uri: string,
//     method = Method.GET,
//     data = null,
//     isBearer = true,
//     multipart = false,
//     isPageUrl = false,
// ) => {
//     const resData = await callFeederCode(uri, method, data, isBearer, multipart, isPageUrl)
//     // console.log(data)
//     return resData
// }


// export const callFeederStatus = async (endPoint, method, data, isBearer, multipart) => {
//     var url = endPoint
//     console.log(url)
//     if (isBearer) {
//         // const token = await getDataFromStorage('token')
//         // defaultHeaders['Authorization'] = 'Bearer ' + token
//     } else {
//         delete defaultHeaders.Authorization
//     }
//     if (multipart) {
//         defaultHeaders['Content-Type'] = 'multipart/form-data'
//     }
//     else {
//         defaultHeaders['Content-Type'] = 'application/json'
//     }
//     try {
//         let response = await fetch(url, {
//             method: method,
//             headers: defaultHeaders,
//             body: method == Method.GET ? null : multipart ? data : JSON.stringify(data),
//         })
//         let responseJson = await response.json()
//         return responseJson
//     } catch (error) {
//         console.log('error:', error)
//     }
// }

// export const fetchFeederStatus = async (
//     uri: string,
//     method = Method.GET,
//     data = null,
//     isBearer = true,
//     multipart = false,
//     isPageUrl = false,
// ) => {
//     const resData = await callFeederStatus(uri, method, data, isBearer, multipart, isPageUrl)
//     // console.log(data)
//     return resData
// }


// export const callApiTargetSetting = async (endPoint, method, data, isBearer, multipart) => {
//     var url = targetSetting + endPoint
//     // console.log(url, 'uuuuuurrrrrrrlllll')
//     if (isBearer) {
//         // const token = await getDataFromStorage('token')
//         // // const privateKey = await getDataFromStorage(Keys.privateKey)
//         // // console.log(privateKey, 'ppppppppppppp')
//         // defaultHeaders['Authorization'] = 'Bearer ' + token
//         var myHeaders: any = new Headers();
//         myHeaders.append("Accept", "application/json");
//         myHeaders.append("Content-type", "application/json");
//         // myHeaders.append("privatekey", privateKey);
//     } else {
//         delete defaultHeaders.Authorization
//     }
//     if (multipart) {
//         defaultHeaders['Content-Type'] = 'multipart/form-data'
//     }
//     else {
//         defaultHeaders['Content-Type'] = 'application/json'
//     }
//     try {
//         let response = await fetch(url, {
//             method: method,
//             headers: myHeaders,
//             body: method == Method.GET ? null : multipart ? data : JSON.stringify(data),
//         })

//         let responseJson = await response.json()
//         // console.log(responseJson, 'response json')
//         return responseJson
//     } catch (error) {
//         console.log('error:', error)
//     }

// }

// export const fetchTargetSetting = async (
//     uri: string,
//     method = Method.GET,
//     data = null,
//     isBearer = true,
//     multipart = false,
//     isPageUrl = false,
// ) => {
//     const resData = await callApiTargetSetting(uri, method, data, isBearer, multipart, isPageUrl)
//     // console.log(data)
//     return resData
// }

// export const nameChange = async (endPoint, method, data, isBearer, multipart) => {
//     var url = changeName + endPoint
//     if (isBearer) {
//         // const token = await getDataFromStorage('token')
//         // defaultHeaders['Authorization'] = 'Bearer ' + token
//     }
//     else { delete defaultHeaders.Authorization }
//     if (multipart) { defaultHeaders['Content-Type'] = 'multipart/form-data' }
//     else {
//         defaultHeaders['Content-Type'] = 'application/json'
//     }
//     try {
//         let response = await fetch(url, {
//             method: method, headers: defaultHeaders, body: method == Method.GET ? null : multipart ? data : JSON.stringify(data),
//         })
//         // console.log(response,'resssss')  
//         let responseJson = await response.json()
//         // console.log(responseJson, 'json')       
//         return responseJson
//     }
//     catch (error) {
//         console.log('error:', error)
//     }
// }
// export const nameChangeData = async (
//     uri: string,
//     method = Method.GET,
//     data = null,
//     isBearer = true,
//     multipart = false,
//     isPageUrl = false,) => {
//     const resData = await nameChange(uri, method, data, isBearer, multipart, isPageUrl)
//     // console.log(data)  
//     return resData
// }




// export const loadChange = async (endPoint, method, data, isBearer, multipart) => {
//     var url = changeLoad + endPoint
//     if (isBearer) {
//         // const token = await getDataFromStorage('token')
//         // defaultHeaders['Authorization'] = 'Bearer ' + token
//     }
//     else { delete defaultHeaders.Authorization }
//     if (multipart) { defaultHeaders['Content-Type'] = 'multipart/form-data' }
//     else {
//         defaultHeaders['Content-Type'] = 'application/json'
//     }
//     try {
//         let response = await fetch(url, {
//             method: method, headers: defaultHeaders, body: method == Method.GET ? null : multipart ? data : JSON.stringify(data),
//         })
//         // console.log(response,'resssss')  
//         let responseJson = await response.json()
//         // console.log(responseJson, 'json')       
//         return responseJson
//     }
//     catch (error) {
//         console.log('error:', error)
//     }
// }
// export const loadChangeData = async (
//     uri: string,
//     method = Method.GET,
//     data = null,
//     isBearer = true,
//     multipart = false,
//     isPageUrl = false,) => {
//     const resData = await loadChange(uri, method, data, isBearer, multipart, isPageUrl)
//     // console.log(data)  
//     return resData
// }




// export const tariffChange = async (endPoint, method, data, isBearer, multipart) => {
//     var url = changeTariff + endPoint
//     if (isBearer) {
//         // const token = await getDataFromStorage('token')
//         // defaultHeaders['Authorization'] = 'Bearer ' + token
//     }
//     else { delete defaultHeaders.Authorization }
//     if (multipart) { defaultHeaders['Content-Type'] = 'multipart/form-data' }
//     else {
//         defaultHeaders['Content-Type'] = 'application/json'
//     }
//     try {
//         let response = await fetch(url, {
//             method: method, headers: defaultHeaders, body: method == Method.GET ? null : multipart ? data : JSON.stringify(data),
//         })
//         // console.log(response,'resssss')  
//         let responseJson = await response.json()
//         // console.log(responseJson, 'json')       
//         return responseJson
//     }
//     catch (error) {
//         console.log('error:', error)
//     }
// }
// export const tariffChangeData = async (
//     uri: string,
//     method = Method.GET,
//     data = null,
//     isBearer = true,
//     multipart = false,
//     isPageUrl = false,) => {
//     const resData = await tariffChange(uri, method, data, isBearer, multipart, isPageUrl)
//     // console.log(data)  
//     return resData
// }



// export const connection = async (endPoint, method, data, isBearer, multipart) => {
//     var url = newConnections + endPoint
//     if (isBearer) {
//         // const token = await getDataFromStorage('token')
//         // defaultHeaders['Authorization'] = 'Bearer ' + token
//     }
//     else {
//         delete defaultHeaders.Authorization
//     }
//     if (multipart) {
//         defaultHeaders['Content-Type'] = 'multipart/form-data'
//     }
//     else { defaultHeaders['Content-Type'] = 'application/json' }
//     try {
//         let response = await fetch(url, {
//             method: method,
//             headers: defaultHeaders,
//             body: method == Method.GET ? null : multipart ? data : JSON.stringify(data),
//         })
//         // console.log(response,'resssss')       
//         let responseJson = await response.json()
//         // console.log(responseJson, 'json')    
//         return responseJson
//     }
//     catch (error) {
//         console.log('error:', error)
//     }
// }
// export const NewConnectionApi = async (
//     uri: string,
//     method = Method.GET,
//     data = null,
//     isBearer = true,
//     multipart = false,
//     isPageUrl = false,
// ) => {
//     const resData = await connection(uri, method, data, isBearer, multipart, isPageUrl)
//     // console.log(data)  
//     return resData
// }

// export const callApiCnic = async (endPoint, method, data, isBearer, multipart) => {
//     var url = cnicUpdation + endPoint
//     if (isBearer) {
//         // const token = await getDataFromStorage('token')
//         // defaultHeaders['Authorization'] = 'Bearer ' + token
//     } else {
//         delete defaultHeaders.Authorization
//     }
//     if (multipart) {
//         defaultHeaders['Content-Type'] = 'multipart/form-data'
//     }
//     else {
//         defaultHeaders['Content-Type'] = 'application/json'
//     }
//     try {
//         let response = await fetch(url, {
//             method: method,
//             headers: defaultHeaders,
//             body: method == Method.GET ? null : multipart ? data : JSON.stringify(data),
//         })
//         // console.log(response,'resssss')
//         let responseJson = await response.json()
//         // console.log(responseJson, 'json')
//         return responseJson
//     } catch (error) {

//         console.log('error:', error)
//     }
// }
// export const fetchDataCnic = async (
//     uri: string,
//     method = Method.GET,
//     data = null,
//     isBearer = true,
//     multipart = false,
//     isPageUrl = false,
// ) => {
//     const resData = await callApiCnic(uri, method, data, isBearer, multipart, isPageUrl)
//     console.log(data)
//     return resData
// }



// export const callApiComplaint = async (endPoint, method, data, isBearer, multipart) => {
//     var url = complanitBaseUrl + endPoint
//     if (isBearer) {
//         // const token = await getDataFromStorage('token')
//         // defaultHeaders['Authorization'] = 'Bearer ' + token
//     } else {
//         delete defaultHeaders.Authorization
//     }
//     if (multipart) {
//         defaultHeaders['Content-Type'] = 'multipart/form-data'
//     }
//     else {
//         defaultHeaders['Content-Type'] = 'application/json'
//     }
//     try {
//         let response = await fetch(url, {
//             method: method,
//             headers: defaultHeaders,
//             body: method == Method.GET ? null : multipart ? data : JSON.stringify(data),
//         })
//         // console.log(response,'resssss')
//         let responseJson = await response.json()
//         // console.log(responseJson, 'json')
//         console.log(responseJson,'hsisis')

//         return responseJson
//     } catch (error) {
//         console.log('error:', error)
//     }
// }
// export const fetchDataComplaint = async (
//     uri: string,
//     method = Method.GET,
//     data = null,
//     isBearer = true,
//     multipart = false,
//     isPageUrl = false,
// ) => {
//     const resData = await callApiComplaint(uri, method, data, isBearer, multipart, isPageUrl)
//     console.log(data,'dayayayay')
//     return resData
// }




// export const subDivisionList = async (endPoint, method, data, isBearer, multipart) => {
//     var url = subDivList + endPoint
//     if (isBearer) {
//         // const token = await getDataFromStorage('token')
//         // defaultHeaders['Authorization'] = 'Bearer ' + token
//     } else {
//         delete defaultHeaders.Authorization
//     }
//     if (multipart) {
//         defaultHeaders['Content-Type'] = 'multipart/form-data'
//     }
//     else {
//         defaultHeaders['Content-Type'] = 'application/json'
//     }
//     try {
//         let response = await fetch(url, {
//             method: method,
//             headers: defaultHeaders,
//             body: method == Method.GET ? null : multipart ? data : JSON.stringify(data),
//         })
//         // console.log(response,'resssss')
//         let responseJson = await response.json()
//         // console.log(responseJson, 'json')
//         return responseJson
//     } catch (error) {
//         console.log('error:', error)
//     }
// }
// export const subDivisionData = async (
//     uri: string,
//     method = Method.GET,
//     data = null,
//     isBearer = true,
//     multipart = false,
//     isPageUrl = false,
// ) => {
//     const resData = await subDivisionList(uri, method, data, isBearer, multipart, isPageUrl)
//     console.log(data)
//     return resData
// }


// export const applicationList = async (endPoint, method, data, isBearer, multipart) => {
//     var url = dashBoardUrl + endPoint
//     console.log(url, 'Url')
//     if (isBearer) {
//         // const token = await getDataFromStorage('token')
//         // defaultHeaders['Authorization'] = 'Bearer ' + token
//     } else {
//         delete defaultHeaders.Authorization
//     }
//     if (multipart) {
//         defaultHeaders['Content-Type'] = 'multipart/form-data'
//     }
//     else {
//         defaultHeaders['Content-Type'] = 'application/json'
//     }
//     try {
//         let response = await fetch(url, {
//             method: method,
//             headers: defaultHeaders,
//             body: method == Method.GET ? null : multipart ? data : JSON.stringify(data),
//         })
//         // console.log(response,'resssss')
//         let responseJson = await response.json()
//         // console.log(responseJson, 'json')
//         return responseJson
//     } catch (error) {
//         console.log('error:', error)
//     }
// }
// export const getAllApplicationData = async (
//     uri: string,
//     method = Method.GET,
//     data = null,
//     isBearer = true,
//     multipart = false,
//     isPageUrl = false,
// ) => {
//     const resData = await applicationList(uri, method, data, isBearer, multipart, isPageUrl)
//     console.log(data)
//     return resData
// }




// export const cfpLogin = async (endPoint, method, data, isBearer, multipart) => {
//     var url = cfpLoginUrl + endPoint
//     console.log(url, 'LOGIN')
//     if (isBearer) {
//         // const token = await getDataFromStorage('token')
//         // defaultHeaders['Authorization'] = 'Bearer ' + token
//     } else {
//         delete defaultHeaders.Authorization
//     }
//     if (multipart) {
//         defaultHeaders['Content-Type'] = 'multipart/form-data'
//     }
//     else {
//         defaultHeaders['Content-Type'] = 'application/json'
//     }
//     try {
//         let response = await fetch(url, {
//             method: method,
//             headers: defaultHeaders,
//             body: method == Method.GET ? null : multipart ? data : JSON.stringify(data),
//         })
//         // console.log(response,'resssss')
//         let responseJson = await response.json()
//         console.log(responseJson, 'json')
//  y
//     } catch (error) {
//         console.log('error:', error)
//     }
// }
// export const cfpLoginn = async (
//     uri: string,
//     method = Method.GET,
//     data = null,
//     isBearer = true,
//     multipart = false,
//     isPageUrl = false,
// ) => {
//     const resData = await cfpLogin(uri, method, data, isBearer, multipart, isPageUrl)
//     console.log(data,'fpdlogins')
//     return resData
// }