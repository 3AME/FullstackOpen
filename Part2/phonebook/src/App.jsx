import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [personsToShow, setPersonsToShow] = useState([])
  const [isFilter, setIsFilter] = useState(false)

  useEffect(() => {
    // console.log('effect')
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    // console.log('clicked')
    event.preventDefault()
    //includes method checks for primitive values in an array(e.g., numbers or strings), but it cannot directly check for objects or their properties. 
    const personWithDifferentNumber = persons.find(
      person => person.name === newName && person.number !== newNumber
    )
    // console.log(personWithDifferentNumber)
    if (personWithDifferentNumber) {
      const { id } = personWithDifferentNumber
      // console.log(id)
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {
          ...personWithDifferentNumber,
          number: newNumber
        }
        personsService
          .updateNumber(id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === id ? returnedPerson : person))
            // console.log(persons)
            // console.log('number updated successfully')
          })
      }
    }
    else {
      const newNameObject = {
        name: newName,
        number: newNumber
      }
      personsService
        .create(newNameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
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

  const deletePersonOf = (id, name) => {
    window.confirm(`Delete ${name} ?`)
    personsService
      .deletePerson(id)
      .then(returnedPerson => {
        const newPersons = persons.filter((item) => item.id !== returnedPerson.id)
        setPersons(newPersons)
        // console.log(returnedPerson)
      })
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
      {phonebook.map(person =>
        <Persons
          key={person.id}
          name={person.name}
          number={person.number}
          deletePerson={() => deletePersonOf(person.id, person.name)}
        />
      )}
    </div>
  )
}

export default App