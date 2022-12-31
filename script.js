//api url
const api_url = "https://my.api.mockaroo.com/movies.json?key=4dc73f40";

// Function to hide the loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}

// Function to define innerHTML for HTML table
function table(data) {
    let tab = 
        `<tr>
        <th>ID</th>
        <th>Movie Title</th>
        <th>Year of production</th>
        <th>Country of origin</th>
        <th>Language</th>
        <th>Main Actor</th>
        <th>Movie Genre</th>
        <th>Budget</th>
        <th>Film Director</th>
        </tr>`;

    // Loop to access all rows 
    for (let r of data) {
        tab += `<tr>
    <td>${r.id}</td>
    <td>${r.movie_title}</td>
    <td>${r.year_of_production}</td> 
    <td>${r.country_of_origin}</td>
    <td>${r.language}</td>
    <td>${r.main_actor}</td>
    <td>${r.movie_genre}</td>
    <td>${r.budget}</td>
    <td>${r.film_director}</td>
    </tr>`;
    }

    // Setting innerHTML as tab variable
    document.getElementById("movies").innerHTML = tab;
}

function barchart() {
    const chart = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
        };
    }

    //defining async function
    async function getapi(url) {
        const response = await fetch(url);

        let data = await response.json(); //data stored in data
        console.log(data)
        if (response) {
            hideloader();
        }

        if (document.getElementsByTagName("title").innerHTML = "Table") {
            table(data);
        }

        else if (document.getElementsByTagName("title").innerHTML = "Piechart") {
            barchart();
        }
    }
    getapi(api_url);
