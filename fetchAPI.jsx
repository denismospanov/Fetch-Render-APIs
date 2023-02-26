function App() {
  const { Container } = ReactBootstrap;
  const { useState, useEffect } = React;
  const [data, setData] = useState({ meals: [] });
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [url, setUrl] = useState(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const [recipeId, setRecipeId] = useState('');

  console.log("Rendering App");

  useEffect(() => {   // Handles the LifeCycle Events
    console.log("Fetching data...");
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  const handleNewRecipeClick = () => {
    setRecipeId(Math.floor(Math.random() * 1000000));
  }

  useEffect(() => {
    if (recipeId) {
      setUrl(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
    }
  }, [recipeId]);

  return (
    <Container>
      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div>
          <h1>{data.meals[0].strMeal}</h1>
          <img src={data.meals[0].strMealThumb} alt={data.meals[0].strMeal} />
          <p>{data.meals[0].strInstructions}</p>
          <button onClick={handleNewRecipeClick}>New Recipe</button>
        </div>
      )}
    </Container>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
