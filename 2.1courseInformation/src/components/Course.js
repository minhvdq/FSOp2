const Header = ({text}) =>{
    return(
      <>
        <h1> {text} </h1>
      </>
    )
  }
  
  const Total = ({items}) => {
    const sum = items.reduce((a,b) => {
      let x = a + b.exercises
      console.log(x)
      return x
    },0)
    return(
      <p>
        <b>
          total of {sum} excercises
        </b>
      </p>
    )
  }
  
  const Part = ({prop}) =>{
    console.log(prop);
    return (
       <p>
        {prop.name} {prop.exercises}
       </p>
    )
  }
  
const Content = ({notes}) => {
    console.log(notes)
    return(
      <div>
        {
          notes.map(note =>
            <Part prop = {note} />
          )
        }
        <Total items = {notes} />
      </ div>
    )
  }
  
const Course = ({course}) => {
    console.log(course)  
    return(
      <div>
        <Header text = {course.name} />
        <Content notes = {course.parts} />
      </div>
    )
}

export default Course