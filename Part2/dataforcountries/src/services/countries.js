import axios from "axios"

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () =>{
    const all = baseUrl + '/all'
    const request = axios.get(all)
    return request.then(response => response.data)
}

const searchByName = (name) =>{
    const query = baseUrl + '/name/' + name 
    const request = axios.get(query)
    return request.then(response=>response.data)
}


export default {getAll, searchByName}