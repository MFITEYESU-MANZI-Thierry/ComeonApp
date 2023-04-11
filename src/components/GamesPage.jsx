import React, { useState, useEffect } from 'react';

function GamesPage({searchKeyword}) {
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0); // Default is ALL

  useEffect(() => {
    async function fetchData() {
      const [gamesResponse, categoriesResponse] = await Promise.all([
        fetch('/api/games.json').then((response) => response.json()),
        fetch('/api/categories.json').then((response) => response.json()),
      ]);

      setGames(gamesResponse);
      setCategories(categoriesResponse);
    }

    fetchData();
  }, []);

  // Filter games based on the selected category
  const filteredGames = games.filter(game =>
    (selectedCategory === 0 || game.categoryIds.includes(selectedCategory)) &&
    (searchKeyword === '' || game.name.toLowerCase().includes(searchKeyword.toLowerCase()) || game.description.toLowerCase().includes(searchKeyword.toLowerCase()))
  );
  return (
    <div className="casino">
      <div className="ui grid">
          <div className="twelve wide column">
              <h3 className="ui dividing header">Games</h3>

              {
                filteredGames.map((game) => (
                  <div className="ui relaxed divided game items links" key={game.code}>

                      <div className="game item">
                          <div className="ui small image">
                              <img src={`/${game.icon}`} alt="game-icon" />
                          </div>
                          <div className="content">
                              <div className="header"><b className="name">{game.name}</b></div>
                              <div className="description">
                                {game.description}
                              </div>
                              <div className="extra">
                                  <div className="play ui right floated secondary button inverted">
                                      Play
                                      <i className="right chevron icon"></i>
                                  </div>

                              </div>
                          </div>
                      </div>

                  </div>
                ))
              }
          </div>
          <div className="four wide column">
              <h3 className="ui dividing header">Categories</h3>

              <div className="ui selection animated list category items">

              {
                categories.map((category) => (
                  <div className={`category item ${selectedCategory === category.id ? 'active' : ''}`} key={category.id} onClick={() => setSelectedCategory(category.id)}>
                      <div className="content">
                          <div className="header">{category.name}</div>
                      </div>
                  </div>
                ))
              }
              </div>
          </div>
      </div>
    </div>
  );
}

export default GamesPage;
