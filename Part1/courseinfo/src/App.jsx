import React from 'react'


const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  // console.log(props);
  return (
    <div>
      <Part part={props.part[0].name} exercises={props.part[0].exercises}></Part>
      <Part part={props.part[1].name} exercises={props.part[1].exercises}></Part>
      <Part part={props.part[2].name} exercises={props.part[2].exercises}></Part>
    </div>
  )

}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name}> </Header>
      <Content part={course.parts}></Content>
      <Total total={course.parts}></Total>
    </div>
  )
}

export default App
