import { useState } from 'react'


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  // Create a zero-filled array of the desired length https://stackoverflow.com/questions/20222501/how-to-create-a-zero-filled-javascript-array-of-arbitrary-length/22209781 
  // By default Uint8Array, Uint16Array and Uint32Array classes keep zeros as it's values 
  // var ary = new Uint8Array(10); 
  const [points, setPoints] = useState(new Uint16Array(anecdotes.length))
  // console.log(points)


  const handleClick = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    // console.log(random)
    setSelected(random)
  }

  const handleVote = () =>{
    // console.log('clicked')
    const copy = {...points}
    copy[selected] +=1
    setPoints(copy)
    // console.log("points", points)
  }

  return (
    <>
      <div>
        {anecdotes[selected]}
      </div>
      <p>has {points[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
    </>
  )
}

export default App
