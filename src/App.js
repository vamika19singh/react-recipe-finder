import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import Modal from './components/Modal';
import Filters from './components/Filters';


const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

function App() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //New states for modal and details

  const [showModal, setShowModal] = useState(false);
  const [selectedRecipeDetails, setSelectedRecipeDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);

  const [filters, setFilters] = useState([]);

  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchRecipes = async (searchTerm, activeFilters, pageNumber = 1) => {
    if(!searchTerm) return;

    setLoading(true);
    setError(null);

    try{

      const dietParams = activeFilters.length > 0 ? `&diet=${activeFilters.join(',')}` : '';
      const offset = (pageNumber - 1) * 12;

      const response = await fetch(
         `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(
          searchTerm
        )}&number=12&offset=${offset}${dietParams}&apiKey=${API_KEY}`
      );

      if(!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      if(pageNumber === 1) {
        setRecipes(data.results || []);
      }else{
        setRecipes((prev) => [...prev, ...API_KEY(data.results || [])]);
      }
      setTotalResults(data.totalResults || 0);
      setPage(pageNumber);

    } catch (err){
      setError(err.message);
      setRecipes([]);
    }
    setLoading(false);
  };

  //New fetch detailed recipe info
  const fetchRecipeDetails = async (id) =>{
    setDetailsLoading(true);
    setDetailsError(null);

    try{
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );

      if(!response.ok){
        throw new Error(`Failed to get details: ${response.statusText}`);
      }

      const data = await response.json();
      setSelectedRecipeDetails(data);
      setShowModal(true);
    }catch (err){
      setDetailsError(err.message);
      setSelectedRecipeDetails(null);
    }
    setDetailsLoading(false);
  };


  const onSearch = (searchTerm) => {
    setQuery(searchTerm);
    setPage(1);
    fetchRecipes(searchTerm, filters, 1);
  };

  const onRecipeClick = (id) => {
    fetchRecipeDetails(id);
  };

  const onCloseModal = () => {
    setShowModal(false);
    setSelectedRecipeDetails(null);
  };

  const onFilterChange = (diet) => {
    let updatedFilters;
    if(filters.includes(diet)) {
      updatedFilters = filters.filter((f) => f !== diet);
    }else {
      updatedFilters = [...filters, diet];
    }
    setFilters(updatedFilters);
    if(query) {
      setPage(1);
      fetchRecipes(query, updatedFilters, 1);
    } 
  };

  // useEffect(() => {
  //   fetchRecipes(query);
  // }, [query]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Recipe Finder</h1>
      <SearchBar onSearch={onSearch} />
      <Filters filters={filters} onFilterChange={onFilterChange} />

      {loading && <p>Loading recipes...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      

      {!loading && !error && (
        <RecipeList recipes={recipes} onRecipeClick={onRecipeClick} />
      )}

      {!loading && !error && recipes.length < totalResults && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={() => fetchRecipes(query, filters, page + 1)}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#4CAF50',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Load More
          </button>
        </div>
      )}

      {showModal && (
        <Modal onClose={onCloseModal}>
          {detailsLoading && <p>Loading details...</p>}
          {detailsError && <p style={{ color: 'red' }}>Error: {detailsError}</p>}
          {selectedRecipeDetails && (
            <div>
              <h2>{selectedRecipeDetails.title}</h2>
              <img
              src={selectedRecipeDetails.image}
              alt={selectedRecipeDetails.title}
              style={{ width: '100%', borderRadius: '8px', marginBottom: '15px'}}
              />
              <h3>Summary</h3>
               <div
                dangerouslySetInnerHTML={{ __html: selectedRecipeDetails.summary }}
                style={{ marginBottom: '15px' }}
              />

              <h3>Instructions</h3>
              {selectedRecipeDetails.instructions ? (
                <div
                  dangerouslySetInnerHTML={{ __html: selectedRecipeDetails.instructions }}
                />
              ) : (
                <p>No instruction available</p>
              )}
              
              <h3>Ingredients</h3>
              <ul>
                {selectedRecipeDetails.extendedIngredients.map((ing) =>(
                  <li key={ing.id}>
                    {ing.original}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

export default App;