
const debounce = (func, del = 1000)=>{
    let timeoutId
    return (...args)=>{
        if(timeoutId){
            clearTimeout(timeoutId)
        }
       timeoutId= setTimeout( ()=>{
            func.apply(null, args)
        }, del)
    }
}

creatAutoComplete({
    root :document.querySelector('.autocomplete'),
    renderOption(movie){
        const img = movie.Poster === 'N/A' ? '':movie.Poster
        return `
        <img src="${img}" />
        ${movie.Title}
        `
    },
    inputValue(movie){
        return movie.Title
      },
      async  fetchData(searchTerm)  {
        const response = await axios.get('http://www.omdbapi.com/', {
          params: {
            apikey: 'ac1b5d60',
            s: searchTerm
          }
        });
      
        if (response.data.Error) {
          return [];
        }   
        return response.data.Search;
      },

      onOptionSelect(movie){
          movieSelect(movie)
      }

})
    const movieSelect = async(movie)=>{
        const res = await axios.get('http://www.omdbapi.com/',{
            params:{
                apikey: 'ac1b5d60',
                i: movie.imdbID
            }
        })
        console.log(res.data)
        document.querySelector('#summary').innerHTML = movieTemplate(res.data)
    }
    const movieTemplate = movieDetail => {

        // if(movieDetail.Awards.length > 5){
        //      movieDetail.Awards.style.fontSize = '100px'
        // }
        return `
          <article class="media">
            <figure class="media-left">
              <p class="image">
                <img src="${movieDetail.Poster}" />
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <h1>${movieDetail.Title}</h1>
                <h4>${movieDetail.Genre}</h4>
                <p>${movieDetail.Plot}</p>
                <p>Actors: ${movieDetail.Actors}</p>
              </div>
            </div>
          </article>
          <div class="grid">
            <article class="notification is-primary">
                <p class="title">${movieDetail.Awards}</p>
                <p class="subtitle">Awards</p>
            </article>
            <article class="notification is-primary">
                <p class="title">${movieDetail.BoxOffice}</p>
                <p class="subtitle">Box Office</p>
            </article>
            <article class="notification is-primary">
                <p class="title">${movieDetail.Metascore}</p>
                <p class="subtitle">Metascore</p>
            </article>
            <article class="notification is-primary">
                <p class="title">${movieDetail.imdbRating}</p>
                <p class="subtitle">IMDB Rating</p>
            </article>
            <article class="notification is-primary">
                <p class="title">${movieDetail.imdbVotes}</p>
                <p class="subtitle">IMDB Votes</p>
            </article>
            <article class="notification is-primary">
                <p class="title">${movieDetail.imdbVotes}</p>
                <p class="subtitle">IMDB Votes</p>
            </article>
            
          </div>
          
        `;
      };