const toggle = document.querySelector('.toggle')
const nav = document.querySelector('nav')
const btn = document.querySelector('.btn')
const header = document.querySelector('header')
const logautBtn = document.querySelector('.logaut')
const main = document.querySelector('main')
const userName = document.querySelector('#user-name')

function toggleNav() {
    nav.classList.toggle('none')
}

function toggleLogaut() {

    if (logautBtn.classList.contains('logaut')) {
        logautBtn.classList.remove('logaut')
        logautBtn.classList.add('bottom')
    } else if (!logautBtn.classList.contains('logaut')) {
        logautBtn.classList.remove('bottom')
        logautBtn.classList.add('logaut')
    }
}

toggle.addEventListener('click', toggleNav)
btn.addEventListener('click', toggleLogaut)

async function displayProfile() {
    main.innerHTML = ''

    const res = await fetch(`http://localhost:3000/get-user/${userName.textContent}`)

    const data = await res.json()

    const profile = document.createElement('div')
    profile.classList.add('profile')
    profile.innerHTML = `<form action="/register/" method="post"><span>Profile</span>
    <div class="form-group">
        <label for="text">Name</label>
        <input required type="text" name="name" id="text" class="form-control" value="${data.name}">
    </div>
    <div class="form-group">
        <label for="last">Last Name</label>
        <input required type="text" name="last" id="last" class="form-control" value="${data.last}">
    </div>
    <div class="form-group">
        <label for="city">Location</label>
        <input required type="text" name="city" id="city" class="form-control" value="${data.city}">
    </div>
    <div class="form-group">
        <label for="email">Email</label>
        <input required type="email" name="email" id="email" class="form-control" value="${data.email}">
    </div>
    <div class="form-group">
        <label for=""></label>
        <input onclick="changeSubmit(event)" data-id="${data._id}"  type="submit" class="form-control" value="Submit" id="submit1">
</form>`
    main.appendChild(profile)
}

async function changeSubmit(e) {
    e.preventDefault()
    const idBtn = document.querySelector('#submit1').dataset.id
    const name = document.querySelector('input[name="name"]').value
    const last = document.querySelector('input[name="last"]').value
    const city = document.querySelector('input[name="city"]').value
    const email = document.querySelector('input[name="email"]').value

    const data = {
        name: name,
        last: last,
        city: city,
        email: email
    }
    try {
        const res = await fetch(`http://localhost:3000/get-user/${idBtn}`, {
            method: 'put',
            body: JSON.stringify(data),

            headers: {
                'Content-Type': 'application/json',
            },

        })
        const myData = await res.json();

    } catch (err) {
        console.log(err)
    }
    clearProfile()
}


function addInputs() {
    main.innerHTML = ''
    const div= document.createElement('div')
    div.classList.add('profile')
    div.innerHTML = `<form action="/add-job/" method="post">
    <div class="form-group">
        <label for="position">Position</label>
        <input required type="text" name="position" id="position" class="form-control">
    </div>
    <div class="form-group">
        <label for="company">Company</label>
        <input required type="text" name=" company" id="company" class="form-control">
    </div>
    
    <div class="form-group">
        <label for="location">Job Location</label>
        <input required type="text" name="location" id="location" class="form-control">
    </div>
    <div class="form-group">
        <label for="status">Status</label>
        <select name="status" id="status" class="form-control">
        <option value="pending">Pending</option>
        <option value="interview">Interviews</option>
        <option value="declined">Declined</option>
        </select>
      
    </div>
    <div class="form-group">
        <label for="type">Job Type</label>
        <select name="type" id="type" class="form-control">
        <option value="full-time">full-time</option>
        <option value="part-time">part-times</option>
        <option value="internship">internship</option>
        <option value="remote">remote</option>
        </select>
    </div>
    <div class="form-group">
        <label for=""></label>
        <input onclick="addJob(event)" type="submit" class="form-control" value="Submit" id="submit2">
    </div>
    <div class="form-group">
        <label for=""></label>
        <input onclick="clearInputs()"  type="submit" class="form-control" value="Clear" id="clear">
    </div>
</form>`
    main.appendChild(div)
}

async function addJob(e) {
    e.preventDefault()
    const position = document.querySelector('#position').value
    const company = document.querySelector('#company').value
    const location = document.querySelector('#location').value
    const status = document.querySelector('#status').value
    const type = document.querySelector('#type').value
    const data={
        position:position,
        company:company,
        location:location,
        status:status,
        type:type
    }
    
    try {
        const res = await fetch(`http://localhost:3000/job`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            
        })
        
    } catch (err) {
        console.log(err)
    }
    
}
function clearInputs() {
    document.querySelector('#position').value = ''
    document.querySelector('#company').value = ''
    document.querySelector('#location').value = ''
    document.querySelector('#status').value = ''
    document.querySelector('#type').value = ''
}

function openStats(){
    main.innerHTML = ''
    const div= document.createElement('div')
    div.classList.add('stats')
    div.innerHTML = `<div class="card">
    <div class="card-body">
    <span id="nr1">0</span>
    <span id="img1">🧳</span>
    </div>
    <p>Pending Applications</p>
</div>
<div class="card">
<div class="card-body">
    <span id="nr2">0</span>
    <span id="img2">📅</span>
</div>
    <p>Interviews Scheduled</p>
</div>
<div class="card">
<div class="card-body">
    <span id="nr3">0</span>
    <span id="img3">👎🏽</span>
</div>
    <p>Jobs Declined</p>
</div>`
    main.appendChild(div)
    getStats()
}

async function getStats(){
    try {
        const res = await fetch(`http://localhost:3000/stats`)
        const data = await res.json()
        let arr1=[],arr2=[],arr3=[]
        data.forEach(el=>{
            if(el.status==='pending'){
                arr1.push(el)
            }
            if(el.status==='interview'){
                arr2.push(el)
            }
            if(el.status==='declined'){
                arr3.push(el)
            }
        })
        document.querySelector('#nr1').textContent = arr1.length
        document.querySelector('#nr2').textContent = arr2.length
        document.querySelector('#nr3').textContent = arr3.length
    } catch (err) {
        console.log(err)
    }
}
openStats()

function addSearchJob() {
    main.innerHTML = ''
    const div= document.createElement('div')
    div.classList.add('profile')
    div.innerHTML = `<form action="" method=""><span>Search Form</span>
    <div class="form-group">
        <label for="search">Search</label>
        <input required type="text" name="search" id="search" class="form-control">
    </div>
    <div class="form-group">
        <label for="status">Status</label>
        <select name="status" id="status" class="form-control">
        <option value="pending">Pending</option>
        <option value="interview">Interviews</option>
        <option value="declined">Declined</option>
        </select>
      
    </div>
    <div class="form-group">
        <label for="type">Job Type</label>
        <select name="type" id="type" class="form-control">
        <option value="full-time">full-time</option>
        <option value="part-time">part-times</option>
        <option value="internship">internship</option>
        <option value="remote">remote</option>
        </select>
    </div>
    <div class="form-group">
        <label for="company">Sort</label>
        <select name="status" id="status" class="form-control">
        <option value="latest">latest</option>
        <option value="oldest">oldests</option>
        <option value="a-z">a-z</option>
        <option value="z-a">z-a</option>

        </select>
        </div>
    <div class="form-group">
        <label for=""></label>
        <input onclick="clearSearch()"  type="submit" class="form-control" value="Clear Filters" id="clear1">
    </div>
</form>`
    main.appendChild(div)
}