const ramenMenu = document.querySelector('#ramen-menu')
const ramenDetail = document.querySelector('#ramen-detail')
const ramenImage = ramenDetail.querySelector('.detail-image')
const ramenName = ramenDetail.querySelector('.name')
const restaurantName = ramenDetail.querySelector('.restaurant')
const rating = document.querySelector('#rating-display')
const form = document.querySelector('#new-ramen')
const comment = document.querySelector('#comment-display')
const editRamenForm = document.querySelector('#edit-ramen')
let ramenList = []
let count

fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(ramens => {
        ramenList=ramens
        ramenList.forEach(ramen => renderRamen(ramen))
        ramenInfo(ramenList[0])
        count = ramenList.length
    });

function renderRamen(ramen){
    let img = document.createElement('img')
    img.src = ramen.image
    img.id = ramen.id
    img.addEventListener('click', e => ramenInfo(e, e.target.id))
    ramenMenu.appendChild(img)
}

function ramenInfo(e, id = 1){    
    ramenImage.src = ramenList[id-1].image
    ramenName.textContent = ramenList[id-1].name
    restaurantName.textContent = ramenList[id-1].restaurant
    rating.textContent = ramenList[id-1].rating
    comment.textContent = ramenList[id-1].comment
}
form.addEventListener('submit', e =>newRamenForm(e))

function newRamenForm(e){
    e.preventDefault()
    count++
    let newRamen ={
        name: e.target.name.value,
        restaurant: e.target.restaurant.value,
        image: e.target.image.value,
        rating: e.target.rating.value,
        comment: e.target.newComment.value,
        id: count
    }
    ramenList.push(newRamen)
    renderRamen(newRamen)
}

editRamenForm.addEventListener('submit', e => editRamen(e))

function editRamen(e){
    e.preventDefault()
    console.log(e.target.rating)
    rating.textContent = e.target.rating.value
    comment.textContent = e.target.newComment.value

}

