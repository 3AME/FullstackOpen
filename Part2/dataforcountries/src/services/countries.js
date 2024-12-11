import axios from "axios"

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const api_key = import.meta.env.VITE_SOME_KEY
const weatherUrl='http://api.openweathermap.org/data/2.5/weather?'

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

const weatherInCapital = (name) =>{
    const query = weatherUrl + 'q='+name+'&APPID='+api_key
    const request = axios.get(query)
    return request.then(response => response.data)
}

export default {getAll, searchByName, weatherInCapital}