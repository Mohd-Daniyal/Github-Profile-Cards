const APIURL = "https://api.github.com/users/"

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

async function getUser(username) {
    try{
        const { data } = await axios(APIURL + username)
        createUserCard(data)
        getRepos(username)
    }
    catch(err){
        if(err.response.status == 404){
            createErrorCard('Profile with this username not Found')
        }
    }
}

async function getRepos(username){
    try{
        const { data } = await axios(APIURL + username + '/repos?sort=created')
        addReposToCard(data)
    }
    catch(err){
        createErrorCard('Problem fetching repos')
    }
}

function createUserCard(user){
    if(user.bio==null)user.bio="Welcome to my Github Profile!"
    if(user.location==null)user.location="(Not Available)"
    const cardhtml=`
    <div class="card">
    <div>
    <img src = "${user.avatar_url} alt="${user.name}" class="avatar">
    <h6 class="location"><i class='fas fa-map-marker-alt' style='font-size:12px;color:white'></i>&emsp;<span>${user.location}</span></h6>
    </div>
    <div class = "user-info">
    <h2>${user.name}</h2>
    <p>${user.bio}</p>
    <ul>
    <li>${user.followers}<strong>Followers</strong></li>
    <li>${user.following}<strong>Following</strong></li>
    <li>${user.public_repos}<strong>Repos</strong></li>
    </ul>
    <div id="repos"></div>
    </div>
    </div>
    `
    main.innerHTML = cardhtml
}

function createErrorCard(msg){
    const cardhtml = `
    <div class ="card">
    <h1>${msg}</h1>
    </div>`
    main.innerHTML = cardhtml
}

function addReposToCard(repos){
    const reposE1 = document.getElementById('repos')
    repos.slice(0,5).forEach(repo => {
        const repoE1=document.createElement('a')
        repoE1.classList.add('repo')
        repoE1.href=repo.html_url
        repoE1.target='_blank'
        repoE1.innerText=repo.name

        reposE1.appendChild(repoE1)
    });
}

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const user = search.value
    if(user){
        getUser(user)
        search.value=''
    }
})