const URL = 'https://japceibal.github.io/japflix_api/movies-data.json';


let moviesData = [];

async function fetchData(){
    try {
        const res = await fetch(URL);
        if (!res.ok) {
            throw new Error(`Error al obtener los datos Código de estado: ${res.status}`)
        }

    //Ponemos los datos en el array
    moviesData = await res.json();
    console.log(moviesData);

    const inputBuscar = document.getElementById('inputBuscar');
    const divResults = document.getElementById('results')

    inputBuscar.addEventListener('input', filtroSearch);

    function filtroSearch() {
        const query = inputBuscar.value.toLowerCase();
        const filterMovies = moviesData.filter(movie => movie.title.toLowerCase().includes(query));

        displayResults(filterMovies)
    }

    function displayResults(results) {
        divResults.innerHTML = '';
        if (results.length === 0) {
            divResults.innerHTML = 'No se encontraron resultados.';
            return;
        }

        let offcanvasIndex = 1; // Inicializa el índice


    results.forEach(movie => { 
        const movieDiv = document.createElement('div');
        movieDiv.className = "moviesContainer";

        const voteAverage = movie.vote_average;
        const starsContainer = document.createElement('div');

        // Crear las estrellas y agregarlas al contenedor
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.className = "fa fa-star";
            if (i <= (voteAverage / 2)) {
                star.classList.add("checked");
            }
            starsContainer.appendChild(star);
        }

          // Genera un identificador único para cada offcanvas
            const offcanvasId = `offcanvasTop-${offcanvasIndex}`;

         // Incrementa el índice para la próxima iteración
            offcanvasIndex++;

        // Cree los elemetnos de parrafo tanto para el titulo como para la frase
        const titleParagraph = document.createElement('p');
        titleParagraph.textContent = movie.title;

        const tagline = document.createElement('p');
        tagline.textContent = movie.tagline;

        const overview = document.createElement('p');
        overview.textContent = movie.overview;

        const runtime = document.createElement('p');
        runtime.textContent = movie.runtime;

        const budget = document.createElement('p');
        budget.textContent = movie.budget;

        const revenue = document.createElement('p');
        revenue.textContent = movie.revenue;
        
        const release_date = document.createElement('p');
        release_date.textContent = movie.release_date; 

        // Extraer el año de la fecha
        const year = release_date.textContent.substring(0, 4);  

        const title = document.createElement('h1');
        title.textContent = movie.title;

        const genresList = movie.genres.map(genre => genre.name).join(', ');
        

        // Agregar las propiedades al div
            movieDiv.setAttribute("type", "button");
            movieDiv.setAttribute("data-bs-toggle", "offcanvas");
            movieDiv.setAttribute("data-bs-target",  `#${offcanvasId}`);
            movieDiv.setAttribute("aria-controls", offcanvasId);
            
            

             // Agregar el fragmento HTML al div
             movieDiv.innerHTML = `
             <div class="offcanvas offcanvas-top" tabindex="-1" id="${offcanvasId}" aria-labelledby="offcanvasTopLabel">
                 <div class="offcanvas-header" >
                     <h5 class="offcanvas-title" id="offcanvasTopLabel"></h5>    
                     <button  class="btn-close"  data-bs-dismiss="offcanvas" aria-label="Close"></button>
                     <div class="offcanvas-body">
                         ${title.outerHTML}
                         ${overview.textContent}
                         <hr>
                         ${genresList}
                     </div>
                     <div class="dropdown">
                     <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                         Dropdown button
                     </button>
                     <ul class="dropdown-menu">
                         <p>Year: ${year}</p>
                         <p>Runtime: ${runtime.textContent} mins</p>
                         <p>Budget: $${budget.textContent}</p>
                         <p>Revenue: $${revenue.textContent}</p>
                     </ul>
                     </div>   
                 </div>
             </div>
             `;
             
                            
    //    Agregar el evento de clic al botón de cerrar
        const closeButton = movieDiv.querySelector(".btn-close");
        closeButton.addEventListener("click", function (event) {
            // event.stopPropagation(); // Evita que el evento se propague
            const bsOffcanvas = new bootstrap.Offcanvas(document.getElementById(offcanvasId));
            bsOffcanvas.hide();
        });

        // Agregar un manejador de eventos al cuerpo del documento para prevenir cierres accidentales
        document.body.addEventListener("click", function (event) {
            if (!event.target.closest(".offcanvas")) {
                const openOffcanvas = document.querySelector(".offcanvas.show");
                if (openOffcanvas) {
                    const bsOffcanvas = new bootstrap.Offcanvas(openOffcanvas);
                    bsOffcanvas.hide();
                }
            }
        });

      
        document.body.appendChild(movieDiv);

        //Aca se agregan los elementos al contenedor
        movieDiv.appendChild(titleParagraph);
        movieDiv.appendChild(tagline);
        movieDiv.appendChild(starsContainer);
        divResults.appendChild(movieDiv);
    });
 }

} catch (error) {
    console.error('Hubo un error:', error);
    }
}

 fetchData();
