const pageElement = document.getElementById("article")
const getArticle = async (term) => {
  // Fetch "real" title from search term
  // let searchRes = await fetch(`https://cors.io/?https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${term}`) // maybe use https://cors.io/?
  // let searchJson = await searchRes.json()
  // let realTitle = ''
  // try {
  //   realTitle = searchJson.query.search[0].title
  // } catch(e) {
  //   realTitle = term
  // }
  let realTitle = term
  
  // Get random page from wikipedia (with title)
  let randomRes = await fetch('https://cors.io/?https://en.wikipedia.org/w/api.php?action=query&list=random&rnlimit=1&rnnamespace=0&format=json')
  let randomJson = await randomRes.json()
  let randomTitle = randomJson.query.random[0].title.replace(/\s\(.+\)/, '') // remove stuff like (1979 film)
  let randomPageRes = await fetch(`https://cors.io/?https://en.wikipedia.org/?curid=${randomJson.query.random[0].id}`)
  let randomPageSrc = await randomPageRes.text()
  // replace "Wikipedia" with "connor.fun knowledge base"
  randomPageSrc = randomPageSrc.replace(/wikipedia/gi, "connor.fun Knowledge Base")
  randomPageSrc = randomPageSrc.replace(/free encyclopedia/gi, "bad encyclopedia")
  // Replace all occurences of random page title with realTitle
  let modifiedSrc = randomPageSrc.replace(new RegExp(randomTitle, 'gi'), term);
  modifiedSrc = modifiedSrc.replace(/href="\//g, "href=https://en.wikipedia.org/")
  // Set contents of #article to modified wikipedia page
  pageElement.innerHTML = modifiedSrc
  // Set page title to a weird joke
  document.title = `${realTitle} - connor.fun Knowledge Base`
  
  
  // Take over the search bar 
  
  // Don't redirect search action to /w/index.php
  const searchForm = document.getElementById('searchform')
  searchForm.removeAttribute('action')
  
  // Remove inputs that add extraneous query parameters to url
  const fulltextInput = document.getElementById('mw-searchButton')
  fulltextInput.parentNode.removeChild(fulltextInput)
  
  const titleInput = document.getElementsByName('title')[0]
  titleInput.parentNode.removeChild(titleInput)
  
  const goInput = document.getElementById('searchButton')
  goInput.removeAttribute('name')
  goInput.removeAttribute('value')
  
};