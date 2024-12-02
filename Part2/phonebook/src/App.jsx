import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [personsToShow, setPersonsToShow] = useState([])
  const [isFilter, setIsFilter] =useState(false)

  const addPerson = (event) => {
    event.preventDefault()
    //includes method checks for primitive values in an array(e.g., numbers or strings), but it cannot directly check for objects or their properties. 
    const personsName = persons.map(item => item.name)
    // console.log(personsName.includes(newName))
    if (personsName.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const newNameObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newNameObject))
    }

    setNewName('')
    setNewNumber('')
    // console.log('save')
  }

  const handlePersonChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    // console.log(event.target.value)
    const query = event.target.value
    const personsName = persons.map(item => item.name)
    // console.log(personsName)
    const filterResult = filterItems(personsName, query)
    // console.log(filterResult)
    setPersonsToShow(persons.filter(item => filterResult.includes(item.name)))
    setFilterValue(event.target.value)
    setIsFilter(true)
  }

  const filterItems = (arr, query) => {
    return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()))
  }

  const phonebook = isFilter ?  personsToShow :persons
  // console.log("filter?",isFilter, phonebook)
  
  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        filter shown with <input value={filterValue} onChange={handleFilter} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {phonebook.map(person =>
          <p key={person.name}>{person.name} {person.number}</p>
        )}
      </div>

    </div>
  )
}

export default App