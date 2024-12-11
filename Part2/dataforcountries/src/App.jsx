import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import CountryInfo from './components/CountryInfo'
import Countries from './components/Countries'

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
    if (query.length === 0) {
      console.log('clean the search box')
      setSearchValue('')
      setMessage('')
      setCountriesToShow([])
      setCountryInfo({})
      setTimeout(() => console.log('message', message), 0)
      // console.log('message', message)
    }
    else {
      setSearchValue(query)
      //countries[0].name.common for searching
      // console.log(countries[0].name.common)
      const countriesName = countries.map(country => country.name.common)
      const searchResult = searchItems(countriesName, query)
      console.log(searchResult)
      if (searchResult.length > 10) {
        // console.log('Too many matches, specify another filter')
        setMessage('Too many matches, specify another filter')
      }
      else if (searchResult.length <= 10 && searchResult.length > 1) {
        console.log(searchResult)
        setMessage('')
        setCountriesToShow(searchResult)
        setCountryInfo({})
      }
      else if (searchResult.length === 1) {
        // console.log(searchResult)
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
      else {
        setMessage('Without this country, please input other keywords')
        setCountriesToShow([])
      }
    }
  }

  // console.log('message1', message)
  const searchItems = (arr, query) => {
    return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()))
  }

  const handleShowInfo = (country) => {
    console.log('show info', country)
    countriesService
      .searchByName(country)
      .then(returnedCountry => {
        console.log(returnedCountry)
        setCountryInfo({
          name: returnedCountry.name.common,
          capital: returnedCountry.capital,
          area: returnedCountry.area,
          languages: returnedCountry.languages,
          flags: returnedCountry.flags
        })
      })
  }
  return (
    <>
      <div>
        find countries <input value={searchValue} onChange={handleSearch} />
      </div>
      <div>
        {message}
        {countriesToShow.map(country =>
          < Countries
            key={country}
            country={country}
            showInfo={() => handleShowInfo(country)}
          />
        )}
        {countryInfo.name &&
          <CountryInfo countryInfo={countryInfo}
          />}
      </div>
    </>
  )
}

export default App
