import { movies } from "./database.js"


const photos = document.querySelectorAll('.promo__adv img')

photos.forEach(img => {
    img.remove()
})



let bg_photo = document.querySelector('.promo__bg')

bg_photo.style.background = "url(./img/bg.jpg)"

let modal = document.querySelector('#modal')
let close_modal = document.querySelector('.close_button')
let modal_title = document.querySelector('.modal_title')
let modal_genre = document.querySelector('.modal_genre')
let modal_text = document.querySelector('.modal_text')
let modal_img = document.querySelector('#modal img')

const menu = document.querySelector('.promo__menu-list')
const ul = document.querySelector('.promo__interactive-list')
const main_gener = document.querySelector('.promo__genre')
const main_title = document.querySelector('.promo__title')
const main_plot = document.querySelector('.promo__descr')

function reload(arr) {
    ul.innerHTML = ""
    for (let item of arr) {
        let idx = arr.indexOf(item)
        let li = document.createElement('li')
        let del = document.createElement('div')


        li.classList.add("promo__interactive-item")
        del.classList.add("delete")

        li.innerHTML = `${idx + 1}. ${item.Title}`

        li.append(del)
        ul.append(li)

        del.onclick = () => {
            movies.splice(idx, 1)
            reload(movies, ul)
        }

        li.onclick = () => {
            bg_photo.style.backgroundImage = `url(${item.Poster})`
            main_gener.innerHTML = item.Genre
            main_title.innerHTML = item.Title
            main_plot.innerHTML = item.Plot
        }


        li.ondblclick = () => {
            modal.style.display = 'flex'
            modal_img.src = item.Poster
            modal_title.innerHTML = item.Title
            modal_genre.innerHTML = item.Genre
            modal_text.innerHTML = item.Plot


        }
        close_modal.onclick = () => {
            modal.style.display = "none"
        }


    }
}
reload(movies)

let geners = ['All', ...new Set(movies.map(item => item.Genre))]
reloadGeners(geners, menu)

function reloadGeners(arr, place) {
    place.innerHTML = ""

    for (let item of arr) {
        let idx = arr.indexOf(item)
        let li = document.createElement('li')
        let a = document.createElement('a')

        a.classList.add('promo__menu-item')
        a.innerHTML = item

        a.href = "#"



        if (idx === 0) {
            a.classList.add('promo__menu-item_active')
        }

        li.onclick = () => {
            if (item === "All") {
                reload(movies);
            } else {
                const filtered = movies.filter(movie => movie.Genre === item);
                reload(filtered);
            }
        }

        li.append(a)
        place.append(li)
    }

}

