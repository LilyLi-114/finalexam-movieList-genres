(function () {
  // write your code here
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'

  const data = []
  const dataPanel = document.getElementById('data-panel')
  const navPanel = document.getElementById('nav-panel')

  const genres = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }
  const nameList = Object.values(genres).map(item => item)

  //串接api及主要程式
  axios.get(INDEX_URL)
    .then((response) => {
      data.push(...response.data.results)
      console.log(response.data.results)
      displayDataList(data)
      displayNavPanel(nameList)
      getTotalPages(data)
      getPageData(1, data)
    }).catch((err) => console.log(err))

  //所有的函式
  //顯示電影海報畫面
  function displayDataList(data) {
    let htmlContent = ''
    data.forEach(function (item, index) {
      htmlContent += `
        <div class= "col-sm-3">
          <div class= "card mb-2 size">
            <img class = "card-img-top" src="${POSTER_URL}${item.image}">
          <div class="card-body movie-item-body">
            <h6>${item.title}</h6>
          </div>
          <div class = "card-footer">`
      for (let i = 0; i < item.genres.length; i++) {
        htmlContent +=
          `<span class="badge badge-secondary" data-genres ="${genres[item.genres[i]]}">${genres[item.genres[i]]}</span>`
      }
      htmlContent +=
        `</div>
            </div>
            </div>
            </div>`
    })

    dataPanel.innerHTML = htmlContent
  }

  //顯示搜尋列畫面
  function displayNavPanel(nameList) {
    let htmlContent = ''

    nameList.forEach(function (item, index) {
      htmlContent += `
     <a class="nav-link mr-3" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab"
      aria-controls="v-pills-profile" aria-selected="false"  data-index ="${index + 1}">${item}</a>
      `
    })
    navPanel.innerHTML = htmlContent

  }

  //分頁
  const pagination = document.getElementById('pagination')
  const ITEM_PER_PAGE = 12
  let paginationData = []

  function getTotalPages(data) {
    let totalPages = Math.ceil(data.length / ITEM_PER_PAGE) || 1
    let pageItemContent = ''
    for (let i = 0; i < totalPages; i++) {
      pageItemContent += `
       <li class = "page-item">
        <a class = "page-link" herf="javascript:;" data-page="${i + 1}">${i + 1}</a>
      </li>`
    }
    pagination.innerHTML = pageItemContent
  }

  function getPageData(pageNum, data) {
    paginationData = data || paginationData
    let offset = (pageNum - 1) * ITEM_PER_PAGE
    let pageData = paginationData.slice(offset, offset + ITEM_PER_PAGE)
    displayDataList(pageData)
  }

  function movieFilter(genre) {
    let results = data.filter(eachMovie => eachMovie.genres.includes(Number(genre)))
    displayDataList(results)
    getTotalPages(results)
    getPageData(1, results)
  }

  //listen to 
  //點擊分頁顯示頁面
  pagination.addEventListener('click', event => {
    console.log(event.target.dataset.page)
    page = event.target.dataset.page //保留當前頁面
    if (event.target.tagName === 'A') {
      getPageData(event.target.dataset.page)
    }
  })

  //點擊標籤顯示頁面
  navPanel.addEventListener('click', event => {
    movieFilter(event.target.dataset.index)

  })

})()