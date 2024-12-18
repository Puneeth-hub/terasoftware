import { useState, useEffect } from 'react'

import './App.css'

function App() {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [message, setMessage] = useState([]) 


  useEffect(()=>{
    const fetchData = async() =>{
       try{
         const dataFetch = await fetch('/api/Tracking/api/v1/bsnl-exchanges')
         const response = await dataFetch.json() 
         setData(response.data)
         setMessage(response.message)
         console.log(response)
         
       }catch(e){
        setError(e.message)
       }
    }
    fetchData()
  }, [])

  return (
    <>
    {!error && message && <h1>{message}</h1>}
     {!error && data.length > 0 ? (
      <ul>
        {data.map((item) => (
          <>
          <p>{item.ac_power_backup_type}</p>
          <p><strong>Contact:</strong>{item.gate_contact_number}</p>
          <p>
                <strong>DC Power Voltage:</strong> {item.dc_power_voltage}
          </p>
          <p>
                <strong>Contact Name:</strong> {item.gate_contact_name}
          </p>
          </>
        ))}
      </ul>
     ):(
      <p>Loading..!</p>
     )}
    </>
  )
}

export default App
