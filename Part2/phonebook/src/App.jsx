import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [personsToShow, setPersonsToShow] = useState([])
  const [isFilter, setIsFilter] = useState(false)

  useEffect(() => {
    // console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        // console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    console.log('clicked')
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
      axios
        .post('http://localhost:3001/persons', newNameObject)
        .then(response=>{
          setPersons(persons.concat(response.data))
        })
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
    console.log('filterValue', event.target.value)
    const query = event.target.value
    if (query.length === 0) {
      setIsFilter(false)
      setFilterValue('')
      setPersonsToShow(persons)
    }
    else {
      const personsName = persons.map(item => item.name)
      // console.log(personsName)
      const filterResult = filterItems(personsName, query)
      // console.log(filterResult)
      setPersonsToShow(persons.filter(item => filterResult.includes(item.name)))
      setFilterValue(event.target.value)
      setIsFilter(true)
    }
  }

  const filterItems = (arr, query) => {
    return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()))
  }

  const phonebook = isFilter ? personsToShow : persons
  // console.log("filter?",isFilter, phonebook)

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={filterValue} onChange={handleFilter} />
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson}
        name={newName}
        nameChange={handlePersonChange}
        number={newNumber}
        numberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={phonebook} />

    </div>
  )
}

export default App