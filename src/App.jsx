import React, { useState } from 'react'

const App = () => {
  // input state
  const [query, setQuery] = useState("")

  // result state
  const [result, setResult] = useState([])

  // fetch api function
  const fetchFunc = async (e) => {
    e.preventDefault()
    const KEY = import.meta.env.VITE_API_KEY
    const URL = `https://api.unsplash.com/search/photos?client_id=${KEY}&query=${query}`

    fetch(URL)
      .then(res => res.json())
      .then(data => setResult(data.results))
  }
  return (
    <div className="app">
      {/* form */}
      <form className="search-box" onSubmit={fetchFunc}>
        <input type="text"
          placeholder="Search images e.g. Bike"
          required
          className="input"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button className="btn">Search</button>
      </form>
      {result.length > 0 && <h2>Showing results for: <em>{query}</em></h2>}
      {/* gallery */}
      <div className="gallery-box">
        {
          result.map(image => (
            <img src={image.urls.regular} alt={image.id} key={image.id} />
          ))
        }
      </div>
    </div>
  )
}

export default App
