import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import CountryInfo from './components/CountryInfo'

function App() {
  const [countries, setCountries] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [message, setMessage] = useState('')
  const [countriesToShow, setCountriesToShow] = useState([])
  const [countryInfo, setCountryInfo] = useState({
    name: '',
    capital: '',
    area: '',
    languages: [],
    flags: [],
  })

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        // console.log(initialCountries)
        setCountries(initialCountries)
      })
  }, [])
  // console.log(countries)

  const handleSearch = (event) => {
    console.log(event.target.value)
    const query = event.target.value
    if (!query) {
      setMessage('')
      setCountriesToShow([])
    }
    setSearchValue(query)
    //countries[0].name.common for searching
    console.log(countries[0].name.common)
    const countriesName = countries.map(country => country.name.common)
    const searchResult = searchItems(countriesName, query)
    if (searchResult.length > 10) {
      // console.log('Too many matches, specify another filter')
      setMessage('Too many matches, specify another filter')
    }
    else if (searchResult.length <= 10 && searchResult.length > 1) {
      console.log(searchResult)
      setMessage('')
      setCountriesToShow(searchResult)
    }
    else {
      console.log(searchResult)
      countriesService
        .searchByName(searchResult)
        .then(returnedCountry => {
          console.log("result", returnedCountry)
          setCountryInfo({
            name: returnedCountry.name.common,
            capital: returnedCountry.capital,
            area: returnedCountry.area,
            languages: returnedCountry.languages,
            flags: returnedCountry.flags
          })
          setMessage('')
          setCountriesToShow([])
          // console.log('png', returnedCountry.flags.png)
        })
    }
  }

  // console.log(countryInfo)
  const searchItems = (arr, query) => {
    return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()))
  }
  return (
    <>
      <div>
        find countries <input value={searchValue} onChange={handleSearch} />
      </div>
      <div>
        {message}
        {countriesToShow.map(country =>
          <p key={country}>{country}</p>
        )}
        {countryInfo.name && <CountryInfo countryInfo={countryInfo} />}
      </div>
    </>
  )
}

export default App
