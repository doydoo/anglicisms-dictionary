let DATA
fetch('./data.json')
  .then(resp => resp.json())
  .then(data => DATA = data) //fetching dictionary data

function fillSearchResultsTable(){ //filling search-results table
    let input = document.querySelector('input.search').value.toUpperCase()
    let tbody = document.querySelector('table.search-results > tbody')
    const rule = new RegExp('(?:^' + input + '[а-яА-Я]*)')

    if (input.length === 0){ //display default
      for (let i = 0; i < DATA.length; i++){
        let td = document.createElement('td')
        td.textContent = DATA[i].title.toLowerCase()
        let tr = document.createElement('tr')
        tr.appendChild(td)
        tbody.appendChild(tr)
    }}
    else{ //display successful search results
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
    if (tbody.childNodes.length === 0){ //display default in case of unsuccessful search
      for (let i = 0; i < DATA.length; i++){
        let td = document.createElement('td')
        td.textContent = DATA[i].title.toLowerCase()
        let tr = document.createElement('tr')
        tr.appendChild(td)
        tbody.appendChild(tr)
    }} 
}

function refreshSearchResultsTable(){ //refreshing table on input and search queries
    let tbody = document.querySelector('table.search-results > tbody')
    tbody.replaceChildren()
    fillSearchResultsTable()
}

function displayArticle(title){
  const dictSlice = DATA.find(key => key.title === title)
  let def = document.getElementById('def')
  let content = document.getElementById('content')
  let context = document.getElementById('context')
  def.textContent = dictSlice.def
  content.textContent = dictSlice.content
  context.textContent = dictSlice.context
}

window.addEventListener('DOMContentLoaded', () => { //wrapping listeners

  document.querySelector('tbody').addEventListener('load', loaded => {
    if (loaded){
      refreshSearchResultsTable()
    }
  })
  
  document.getElementById('search').addEventListener('keydown', key => {
      if (key.code === 'Enter'){
        refreshSearchResultsTable()
      }})
  
  document.getElementById('search').addEventListener('input', change => {
    if (change){
      refreshSearchResultsTable()
    }})
  
  document.querySelector('button.pretty-button').addEventListener('click', click => {
      if (click) {
          refreshSearchResultsTable()
      }
  })

  document.querySelector('table.search-results > tbody').addEventListener('click', click => {
    if (click.target && click.target.nodeName === "TD" || "TR"){
      displayArticle(click.target.textContent.toUpperCase())
  }})
});

window.onload = refreshSearchResultsTable
