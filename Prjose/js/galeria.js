    // Funcion para insertar peliculas

    const insertarPelis = (ls,id, root) => {
        const datosPelis = ls[id].map(item => ({titulo:item.title, puntuacion: item.vote_average, fecha: item.  release_date, img:`https://image.tmdb.org/t/p/w200/${item.poster_path}?api_key=3c10d1cb4174fb0e29e61cd194e5ecf4` }))
    
        for (let i = 0; i < datosPelis.length; i++) {
            root.innerHTML += `        
            <div class="peli">
                <span class="fecha">${datosPelis[i].fecha}</span>
                <img src="${datosPelis[i].img}" >
                <div>${datosPelis[i].titulo}</div>
                <span class="puntuacion">${datosPelis[i].puntuacion}</span>
            </div>`
        }
    }
    
    
    // Cuando carga el DOM ejecuta todo esto 1 vez
    document.addEventListener("DOMContentLoaded", async () => {
    
    
        let responsePelis = await axios.all([
            axios.get('https://api.themoviedb.org/3/movie/popular?api_key=3c10d1cb4174fb0e29e61cd194e5ecf4&language=en-US&page=1'),
            axios.get('https://api.themoviedb.org/3/movie/popular?api_key=3c10d1cb4174fb0e29e61cd194e5ecf4&language=en-US&page=2'),
            axios.get('https://api.themoviedb.org/3/movie/popular?api_key=3c10d1cb4174fb0e29e61cd194e5ecf4&language=en-US&page=3'),
            axios.get('https://api.themoviedb.org/3/movie/popular?api_key=3c10d1cb4174fb0e29e61cd194e5ecf4&language=en-US&page=4'),
            axios.get('https://api.themoviedb.org/3/movie/popular?api_key=3c10d1cb4174fb0e29e61cd194e5ecf4&language=en-US&page=5'),
        ])
        .then(axios.spread((response1, response2, response3, response4, response5) => {
            return [response1.data.results, response2.data.results, response3.data.results, response4.data.results, response5.data.results]
        }));
    
    
        const copiaRespuesta = [...responsePelis]
    
        let btn1 = document.querySelector('.btn1')
        let btn2 = document.querySelector('.btn2')
        let btn3 = document.querySelector('.btn3')
        let btn4 = document.querySelector('.btn4')
    
        // Carga la primera pagina por defecto
        let geleriaContainer = document.querySelector('.galeriaContainer')
        insertarPelis(copiaRespuesta,1,geleriaContainer)
      
        // Carga otras paginas al pulsar los botones
        btn1.addEventListener('click', () => {
            geleriaContainer.innerHTML = ""
            let idPage = parseInt(btn1.getAttribute('data-page'),10)
            insertarPelis(copiaRespuesta,idPage,geleriaContainer)
        })
    
        btn2.addEventListener('click', () => {
            geleriaContainer.innerHTML = ""
            let idPage = parseInt(btn2.getAttribute('data-page'),10)
            insertarPelis(copiaRespuesta,idPage,geleriaContainer)
        })
    
        btn3.addEventListener('click', () => {
            geleriaContainer.innerHTML = ""
            let idPage = parseInt(btn3.getAttribute('data-page'),10)
            insertarPelis(copiaRespuesta,idPage,geleriaContainer)
        })
    
        btn4.addEventListener('click', () => {
            geleriaContainer.innerHTML = ""
            let idPage = parseInt(btn4.getAttribute('data-page'),10)
            insertarPelis(copiaRespuesta,idPage,geleriaContainer)
        })
    
    
    
    })