const CountryInfo = ({countryInfo}) => {
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
        </div>

    )
}

export default CountryInfo