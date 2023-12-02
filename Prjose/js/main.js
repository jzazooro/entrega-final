

// Crear un elemento del DOM con datos obetenidos de las peticiones
const crearPosters = (url, id, root, tipo) => {
    let crearImg = document.createElement('img')
    crearImg.classList.add(`${tipo}-${id}`)
    crearImg.src = url
    root.append(crearImg)
}

document.addEventListener("DOMContentLoaded", async () => {
    let respuestaPosters = await axios.get("https://api.themoviedb.org/3/trending/movie/day?api_key=3c10d1cb4174fb0e29e61cd194e5ecf4")
    .then(function (response) {
        return response.data.results
    });

    let respuestaActores = await axios.get("https://api.themoviedb.org/3/person/popular?api_key=3c10d1cb4174fb0e29e61cd194e5ecf4&language=en-US&page=1")
    .then(function (response) {
        return response.data.results
    });

    // Peticiones en paralelo
    let respCompanies = await axios.all([
        axios.get('https://api.themoviedb.org/3/company/1?api_key=3c10d1cb4174fb0e29e61cd194e5ecf4'),
        axios.get('https://api.themoviedb.org/3/company/2?api_key=3c10d1cb4174fb0e29e61cd194e5ecf4'),
        axios.get('https://api.themoviedb.org/3/company/3?api_key=3c10d1cb4174fb0e29e61cd194e5ecf4'),
        axios.get('https://api.themoviedb.org/3/company/4?api_key=3c10d1cb4174fb0e29e61cd194e5ecf4'),
        axios.get('https://api.themoviedb.org/3/company/5?api_key=3c10d1cb4174fb0e29e61cd194e5ecf4'),
        axios.get('https://api.themoviedb.org/3/company/7?api_key=3c10d1cb4174fb0e29e61cd194e5ecf4'),
    ])
    .then(axios.spread((response1, response2, response3, response4, response5, response6) => {
        return [response1.data, response2.data, response3.data, response4.data, response5.data, response6.data]
    }));


    // Primera seccion
    let datos = [...respuestaPosters]
    // filtrar los datos que necesito
    const nombresPoster = datos.map(item => `https://image.tmdb.org/t/p/w400/${item.backdrop_path}?api_key=3c10d1cb4174fb0e29e61cd194e5ecf4` )
    let $contenedorPeliculasPosters = document.querySelector('.contenedorPeliculasPosters')
    // Insertar elementos en el DOM
    for (let i = 0; i < 6; i++) {
        crearPosters(nombresPoster[i], i, $contenedorPeliculasPosters,'poster')
    }


    // Segunda seccion
    const actores = [...respuestaActores]
    let $contenedorActores = document.querySelector('.contenedorActores')
    // filtrar los datos que necesito
    const nombreFoto = actores.map(item => ({nombre: item.name, ruta:`https://image.tmdb.org/t/p/w200/${item.profile_path}?api_key=3c10d1cb4174fb0e29e61cd194e5ecf4`}));
    
    // Insertar elementos en el DOM
    for (let i = 0; i < 8; i++) {
        $contenedorActores.innerHTML += `
        <div class="contenedorActor">
            <img src="${nombreFoto[i].ruta}" alt="">
            <span class="nombreActor">${nombreFoto[i].nombre}</span>
        </div>`
    }
    
    // Tercera seccion
    const lsCompanies = [...respCompanies]
    // filtrar los datos que necesito
    const enlaceIcono = lsCompanies.map(item => ({url:item.homepage, logo: `https://image.tmdb.org/t/p/w200/${item.logo_path}?api_key=3c10d1cb4174fb0e29e61cd194e5ecf4`}))

    let $contenedorCompanies = document.querySelector(".contenedorCompanies")
    
    // Insertar elementos en el DOM
    for (let i = 0; i < enlaceIcono.length; i++) {
        $contenedorCompanies.innerHTML += `
        <div class="contenedorCompany">
            <a href="${enlaceIcono[i].url}"><img src="${enlaceIcono[i].logo}"></a>
        </div>`
    }
})

