import { useState } from "react";

 function ChatInput({setInput}) {
  const [inputValue,setInputValue] = useState('')

  const handleInputValue = (event) =>{
    setInputValue(event.target.value)
  }
  return (
    <div>
      <input 
        className="inputArea" 
        type="text" 
        placeholder="Talk To Database" 
        value={inputValue}
        onChange={handleInputValue}
      />
      <h2>{inputValue}</h2>
      <button className="submitQuery" onClick={setInput}>Submit Query</button>
    </div>
  );
}

export default ChatInput;
