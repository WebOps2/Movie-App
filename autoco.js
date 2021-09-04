const creatAutoComplete =({root, renderOption, onOptionSelect, inputValue, fetchData})=>{
  root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
      <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
      </div>
    </div>
  `;
  
  const input = root.querySelector('input');
  const dropdown = root.querySelector('.dropdown');
  const resultsWrapper = root.querySelector('.results');
  
  const onInput = async event => {
    const items = await fetchData(event.target.value)
    
    resultsWrapper.innerHTML =''
    
    dropdown.classList.add('is-active');
   
        for (let item of items) {
            const option = document.createElement('a');
           
            option.addEventListener('click', (e)=>{
                input.value = inputValue(item)
                dropdown.classList.remove('is-active')
                onOptionSelect(item)

            })
        
            option.classList.add('dropdown-item');
                option.innerHTML = renderOption(item)

              if(item.Type === 'series'){
                option.classList.remove('dropdown-item')
                option.innerHTML = ''
              }
           
            resultsWrapper.appendChild(option);

          }

         

      if(!items.length){
        dropdown.classList.remove('is-active')
      }


    
  };
  input.addEventListener('input', debounce(onInput, 500));
  document.addEventListener('click', (e)=>{
      if(!root.contains(e.target)){
          dropdown.classList.remove('is-active')
      }
  })
}