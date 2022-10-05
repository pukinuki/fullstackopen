const BooksFilter = ({ genres, setFilter }) => {
  return (
    <div>
      {genres.map(g => (
        <button key={g} onClick={() => setFilter(g)}>
          {g}
        </button>
      ))}
      <button key='all genres' onClick={() => setFilter('')}>
        all genres
      </button>
    </div>
  )
}

export default BooksFilter
