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

const Total = (props) => {
    return (
        <div>
            <p>Number of exercises {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises}</p>
        </div>
    )
}


const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name}> </Header>
            <Content parts={course.parts}></Content>
            <Total total={course.parts}></Total>
        </div>
    )
}

export default Course