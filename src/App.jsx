import { useState,useCallback,useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef 
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numbersAllowed){
      str += '0123456789';
    }
    if(charAllowed){
      str += '~+=-*&^%$#@!'
    }

    for(let i = 0; i <= length; i++){
        let char = Math.floor(Math.random() * str.length)
        pass += str.charAt(char);
    }

    setPassword(pass)

  },[length, numbersAllowed, charAllowed])

  const handleCopy = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length, numbersAllowed, charAllowed])

  return (
    <>
    <div id='container'>
      <div id="box">
        <h1>Password Generator</h1>
        <input
         type="text"
         placeholder='password Generator...'
         value={password} 
         ref={passwordRef}
         readOnly/>
        <button onClick={handleCopy}>Copy</button>
        <input type="range" 
          min={8} 
          max={20} 
          value={length}
          onChange={(e)=>{setLength(e.target.value)}} />
        <label>Length: {length}</label>

        <input type="checkbox" name="number" defaultChecked={numbersAllowed} onChange={()=>{setNumbersAllowed((prev)=>!prev)}}/>
        <label htmlFor="number">Add Numbers</label>
        
        <input type="checkbox" name="characters" defaultChecked={charAllowed} onChange={()=>{setCharAllowed((prev)=>!prev)}}/>
        <label htmlFor="characters">Add Characters</label>
      </div>
    </div>
    </>
  )
}

export default App
