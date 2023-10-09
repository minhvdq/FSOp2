import axios from 'axios'

import {useState, useEffect } from 'react'


const Note = ({showedNote}) => {
  const lArr = Object.values(showedNote.languages)
  let dem = 0
  return(
    <div>
      <h1>{showedNote.name.common}</h1>
      <p> capital {showedNote.capital}</p>
      <h3> languages</h3>
      <ul>
        {lArr.map(el => {
          dem++
          return(
            <li key = {dem}>
              {el}
            </li>  
          )
        } 
      )}
      </ul>
      <img src = {showedNote.flags.png} alt = "flag" />
    </div>
  )
}
const Display = ({arr, handleOnClick}) => {
  let cnt = 0
  let dem = 0
  if(arr.length === 0){ 
    return null
  }
  if(arr.length === 1){
    const lArr = Object.values(arr[0].languages)
    console.log(arr[0].flags.png)
    return(
      <div>
        <h1> {arr[0].name.common}</h1>
        <p> capital {arr[0].capital}</p>
        <h3>languages:</h3>
        {lArr.map(el => {
          dem ++
          return(
            <li key = {dem}> {el}</li>
          )
        }
          
        )}
        <ul>
        <img src = {arr[0].flags.png} alt = "the flag"/>

        </ul>
      </div>
    )
  }
  if(arr.length > 10){
    return(
      <div> Too many matches, specify another filter</div>
    )
  }
  return(
    <div>
      {arr.map(element => 
        {
          const hdClick = () => handleOnClick({element})
          cnt ++
          return(
            <p key = {cnt}> {element.name.common} <button onClick={hdClick}> show</button></p>
          )
        }
      )}
    </div>
  )
}

const App = () => {

  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [arr, setArr] = useState([])
  const [check, setCheck ] = useState(false)
  const [showedCountry, setShowedCountry] = useState([])
  
  const handleOnClick = ({element}) => {
    setShowedCountry(element);
    setTimeout(null, 3000)
    setCheck(true)
    console.log(element.name.common)
  }
  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(
      response => response.data
    ).then(
      data => {
        setCountries(data)
        console.log(data[0].name.common)
      }
    )
  },[])

  const handleOnChange = (val) => {
    setCheck(false)
    let x = val.target.value;
    setValue(x);
    console.log(x)
    const newArr = countries.filter( country => country.name.common.toLowerCase().startsWith(x.toLowerCase()))
    setArr(newArr)

  }
  return(
    <div>
       <input value = {value} onChange={handleOnChange} />
       {check === false ? <Display arr = {arr} handleOnClick={handleOnClick}/>: <Note showedNote = {showedCountry}/> }
    </div>
  )
}

export default App