const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    )
}

const Content = (props) => {
    // console.log(props.parts);
    const contents = props.parts
    // console.log(contents[0].id)
    return (
        <>
            {contents.map(content =>
                <Part key={content.id} name={content.name} exercises={content.exercises} />
            )}
        </>
    )
}

const Total = ({ parts }) => {
    // console.log(parts)
    const total = parts.reduce((accumulator, current) => {
        // console.log('what is happening', accumulator, current.exercises)
        return accumulator + current.exercises
    }, 0)
    // console.log(total)
    return (
        <div>
            <b>total of {total} exercises</b>
        </div>
    )
}


const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name}> </Header>
            <Content parts={course.parts}></Content>
            <Total parts={course.parts}></Total>
        </div>
    )
}

export default Course