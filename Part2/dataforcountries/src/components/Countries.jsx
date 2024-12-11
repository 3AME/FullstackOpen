const Countries = ({country, showInfo}) => {
    return (
        <div>
            <p key={country}>{country}
                <button onClick={showInfo}>show</button>
            </p>
        </div>
    )
}

export default Countries