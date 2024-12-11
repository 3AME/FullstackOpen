const CountryInfo = ({countryInfo, weatherInfo}) => {
    // console.log(weatherInfo)
    const iconSrc = 'https://openweathermap.org/img/wn/'+ weatherInfo.weatherIcon +'@2x.png'
    // console.log(iconSrc)
    const temperature = Math.floor((weatherInfo.temperature - 273.15)*100)/100
    return (
        <div>
            <h1>{countryInfo.name}</h1>
            <p>capital {countryInfo.capital}</p>
            <p>area {countryInfo.area}</p>
            <h2>languages</h2>
            <ul>
                {countryInfo.languages &&
                    Object.values(countryInfo.languages).map((language, index) => (
                        <li key={index}>{language}</li>
                    ))}
            </ul>
            <img src={countryInfo.flags.png} alt={countryInfo.flags.alt} />
            <h2>Weather in {countryInfo.capital}</h2>
            <p>temperature {temperature} Celcius</p>
            <img src={iconSrc} alt="weather icon" />
            <p>wind {weatherInfo.windspeed} m/s</p>
        </div>

    )
}

export default CountryInfo