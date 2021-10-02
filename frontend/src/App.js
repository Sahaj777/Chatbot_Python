import './App.css';
import React, { useState } from 'react'



function App() {

  const [bye, setBye] = useState(false)

  const [input, setInput] = useState("")
  const handleInputChange = (e)=>{
    setInput(e.target.value)
  }

  const [messages, setMessages] = useState([
    {
      sender:'pc',
      data: 'Hello!!! My name is interview bot',
      greetings: false
    },
  ])

  const [selection, setSelection] = useState(0)


  const  checkGreetings = async (data)=>{
    const response = await fetch('http://localhost:8000/api/checkGreetings',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: data})
      })

    const json = await response.json()
    return json
  }

  const sendMessage = async()=>{

    // handleSetMessage('user',input)

    // const response = await fetch('http://localhost:8000/api/getResponse')

    let greetings = await checkGreetings(input)

    if(input===''){
      console.log('empty')
    }

    else if(selection > 0 && selection < 4){
      console.log('option is selected')
      
      const response = await fetch('http://localhost:8000/api/sendJson',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({option:selection, data: input})
      })

      const data = await response.json()
      console.log(data)

      setMessages(
        [
          ...messages,
          {
            sender:'user',
            data: input
          },
          {
            sender:'pc',
            data: data.message,
            greetings: false
          }
        ]
      )
      setSelection(0)
    }

    else{

      if ( greetings.message ){
        setMessages(
          [
            ...messages,
            {
              sender:'user',
              data: input
            },
            {
              sender:'pc',
              data: greetings.message,
              greetings: true
            }
          ]
        )
      }

      else if (['bye'].includes(input.toLowerCase())){

        setMessages(
          [
            ...messages,
            {
              sender:'user',
              data: input
            },
            {
              sender:'pc',
              data: 'Bye. Thanks for talking',
              greetings: false
            }
          ]
        )
        setBye(true)
      }

      else {
        let option = parseInt(input)
        console.log(option)
        let optionInput

        switch (option) {
          case 1:
            setSelection(1)
            optionInput = 'General'
            break;
          case 2:
            setSelection(2)
            optionInput = 'Machine Learning'
            break;
          case 3:
            setSelection(3)
            optionInput = 'Basic Statistics'
            break;
        
          default:
            setSelection(0)
            optionInput = 'Invalid Option'
            break;
        }

        setMessages(
          [
            ...messages,
            {
              sender:'user',
              data: input
            },
            {
              sender:'pc',
              data: "You have selected "+ optionInput,
              greetings: false
            }
          ]
        )
        
      }

    }
    setInput("")

  }

  return (
    <div className="App">
      <h1 className="heading">IV-Chatbot</h1>
      <div className="chatRoom" >
        {
          messages.map((message,index)=>(
            <div className={"message "+message.sender} key={index}>
              { message.sender==='pc' && <div className="message__icon"><Icon/></div>}
              <div className="message__data">
                <p>{message.data}</p>
                {message.sender==='pc' && message.greetings && <><p>I can help you with these topics <b>Choose one</b>:</p><p>1.General</p><p>2.Machine Learning</p><p>3.Basic Statistics</p></>}                
              </div>
              {/* { message.sender==='user' && <div className="message__icon">{message.sender}</div>} */}
            </div>
          ))
        }
      </div>
      { !bye &&
        <div className="textArea">
          <input type="text" name="message" id="message" value={input} onChange={handleInputChange} />
          <button onClick={sendMessage}>
            Send
          </button>
        </div>
      }
    </div>
  );
}

export default App;

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20mm"
      height="20mm"
      version="1.1"
      viewBox="0 0 20 20"
    >
      <defs>
        <clipPath clipPathUnits="userSpaceOnUse">
          <path
            fill="#fff"
            fillOpacity="1"
            fillRule="evenodd"
            stroke="none"
            d="M-1016.929 1461.675H-701.575V2205.7690000000002H-1016.929z"
            color="#000"
            display="inline"
            enableBackground="accumulate"
            overflow="visible"
            transform="rotate(-90)"
            visibility="visible"
          ></path>
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse">
          <path
            fill="#fff"
            fillOpacity="1"
            fillRule="evenodd"
            stroke="none"
            d="M-1016.929 1461.675H-701.575V2205.7690000000002H-1016.929z"
            color="#000"
            display="inline"
            enableBackground="accumulate"
            overflow="visible"
            transform="rotate(-90)"
            visibility="visible"
          ></path>
        </clipPath>
      </defs>
      <g transform="translate(-25.415 -111.281)">
        <path
          style={{ marker: "none" }}
          fill="#4d4d4d"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          strokeDasharray="none"
          strokeDashoffset="0"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          strokeWidth="0.621"
          d="M35.412 115.592a6.289 6.289 0 00-5.68 3.575c-.053-.005-.104-.017-.158-.017-.942 0-1.7.759-1.7 1.7v2.102c0 .942.758 1.7 1.7 1.7.054 0 .105-.012.157-.016.068.14.138.28.217.417.31.551 1.134.079.816-.467a5.369 5.369 0 011.2-6.802 5.363 5.363 0 016.902 0 5.369 5.369 0 011.2 6.802l-.014.023-.01.024s-.633 1.402-1.878 1.402l-1.575-.014a.807.807 0 00-.667-.366h-1.015a.82.82 0 00-.822.823c0 .28.178.494.586.494h3.493c1.868 0 2.675-1.833 2.712-1.918v-.005c.078-.136.147-.275.215-.415.055.005.108.017.165.017.941 0 1.7-.759 1.7-1.7v-2.102c0-.942-.759-1.7-1.7-1.7-.055 0-.106.009-.16.016a6.268 6.268 0 00-1.626-2.1 6.305 6.305 0 00-4.058-1.475zm-2.049 2.987c-.366-.024-.7.053-.992.361a4.56 4.56 0 00-1.26 3.125c0 .981.327 2.08.88 2.12.786.057 2.027-.46 3.424-.46 1.48 0 2.787.58 3.561.443.47-.083.744-1.205.744-2.103a4.561 4.561 0 00-1.261-3.125c-.78-.82-1.855 0-3.044 0-.743 0-1.442-.321-2.052-.361zm-.174 2.021a.787.787 0 110 1.574.787.787 0 010-1.574zm4.452 0a.787.787 0 110 1.574.787.787 0 010-1.574z"
          opacity="1"
          vectorEffect="none"
        ></path>
      </g>
    </svg>
  );
}