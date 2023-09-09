const API_KEY = "e9718e4ba785463b93c20e1f84f940d4"
const URL = "https://newsapi.org/v2/everything?q="




async function fetchData(query){
    const res = await fetch(`${URL}${query}&sortBy=publishedAt&apiKey=${API_KEY}`)
    const data = await res.json();
    return data
}

fetchData("all").then(data=>renderMain(data.articles))

let mobilemenu=document.querySelector(".mobile")
let menuBtn = document.querySelector(".menuBtn")
let menuBtnDisplay=true;

menuBtn.addEventListener("click",()=>{
    mobilemenu.classList.toggle("hidden")
})

function reload(){
    window.location.reload();
}

//render news


async function renderMain(arr){
    let mainHTML = ''
    //console.log(arr.length)
    for(let i=0;i<arr.length;i++){
        if(arr[i].urlToImage){
        mainHTML+=`<div class="card">
        <a href=${arr[i].url}>
        <img src=${arr[i].urlToImage} lazy="loading"/>
        <h4>${arr[i].title}</h4>
        <div class="publishByDate">
            <p>${arr[i].source.name}</p>
            <span>•</span>
            <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
        </div>
        <div class="desc">
            ${arr[i].description}
        </div>
        </a>
        </div>`
        }
        
    }

    document.querySelector("main").innerHTML=mainHTML;
}

const searchBtn = document.getElementById("searchForm")
const searchBtnMobile = document.getElementById("searchFormMobile")
const searchInput = document.getElementById("searchInput")
const searchInputMobile = document.getElementById("searchInputMobile")

searchBtn.addEventListener("submit",async(e)=>{
    e.preventDefault()
    const data= await fetchData(searchInput.value)
    renderMain(data.articles)
    curSelectedNav?.classList.remove('active');
      curSelectedNav=null;
})

  const searchBtn1=document.getElementById("btn")

 searchBtn1.addEventListener("click",async(e)=>{
      e.preventDefault()
      const data= await fetchData(searchInput.value)
      renderMain(data.articles)
      curSelectedNav?.classList.remove('active');
      curSelectedNav=null;
  })

  const searchBtn2=document.getElementById("mobilebtn")

  searchBtn2.addEventListener("click",async(e)=>{
    mobilemenu.classList.toggle("hidden")
      e.preventDefault()
      const data= await fetchData(searchInputMobile.value)
      renderMain(data.articles)
      curSelectedNav?.classList.remove('active');
      curSelectedNav=null;
  })

searchBtnMobile.addEventListener("submit",async(e)=>{
    mobilemenu.classList.toggle("hidden")
    e.preventDefault()
    
    const data= await fetchData(searchInputMobile.value)
    renderMain(data.articles)
    curSelectedNav?.classList.remove('active');
      curSelectedNav=null;
})

let curSelectedNav=null;

async function Search(id){
    mobilemenu.classList.toggle("hidden")
    const data= await fetchData(id)
    renderMain(data.articles)
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');
}