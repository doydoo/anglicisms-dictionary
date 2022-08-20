function init(){

  let DATA
  fetch('./data.json')
    .then(resp => resp.json())
    .then(data => DATA = data)

  function fillTable(){
      let input = document.querySelector('input.search').value.toUpperCase()
      let tbody = document.querySelector('table.search-results > tbody')
      const rule = new RegExp('(?:^' + input + '[а-яА-Я]*)')

      if (input.length === 0){
        for (let i = 0; i < DATA.length; i++){
          let td = document.createElement('td')
          td.textContent = DATA[i].title.toLowerCase()
          let tr = document.createElement('tr')
          tr.appendChild(td)
          tbody.appendChild(tr)
      }}
      else{
        for (let i = 0; i < DATA.length; i++){
          if ((DATA[i].title.match(rule))){
                let td = document.createElement('td')
                td.textContent = DATA[i].title.toLowerCase()
                let tr = document.createElement('tr')
                tr.appendChild(td)
                tbody.appendChild(tr)
            }
        }
      }   
  }
  
  function refreshTable(){
      let tbody = document.querySelector('table.search-results > tbody')
      tbody.replaceChildren()
      fillTable()
  }

  document.getElementById('search').addEventListener('keydown', key => {
      if (key.code === 'Enter'){
        refreshTable()
      }})

  document.getElementById('search').addEventListener('input', change => {
    if (change){
      refreshTable()
    }})

  document.querySelector('button.pretty-button').addEventListener('click', click => {
      if (click) {
          refreshTable()
      }
  })

  function displayArticle(title){
    const dictKeys = Object.values(DATA)
    console.log(dictKeys)
    const dictSlice = dictKeys.find(() => dictKeys.title === title)
    let def = document.getElementById('def')
    let content = document.getElementById('content')
    let context = document.getElementById('context')
    def.textContent = dictSlice.def
    content.textContent = dictSlice.content
    context.textContent = dictSlice.context
  }
  
  document.querySelector('table.search-results').addEventListener('click', click => {
    if (click.target && click.target.nodeName == "td" || "tr"){
      // displayArticle(click.target.textContent.toUpperCase())
      console.log(click.target.textContent)
  }})
}