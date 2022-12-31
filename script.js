//api url
const api_url = "https://my.api.mockaroo.com/movies.json?key=4dc73f40";

//async function
async function getapi(url) {
    const response = await fetch(url);

    var data = await response.json(); //data stored in data
    console.log(data)
    if (response) {
        hideloader();
    }
    show(data);
}

// Calling that async function
getapi(api_url);
  
// Function to hide the loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}

// Function to define innerHTML for HTML table
function show(data) {
    let tab = 
        `<tr>
          <th>id</th>
          <th>movie title</th>
          <th>year of production</th>
          <th>country of origin</th>
          <th>language</th>
          <th>main actor</th>
          <th>movie genre</th>
          <th>released</th>
          <th>film director</th>
         </tr>`;
    
    // Loop to access all rows 
    for (let r of data.list) {
        tab += `<tr> 
    <td>${r.id}</td>
    <td>${r.movie_title}</td>
    <td>${r.year_of_production}</td> 
    <td>${r.country_of_origin}</td>
    <td>${r.language}</td>
    <td>${r.main_actor}</td>
    <td>${r.movie_genre}</td>
    <td>${r.released}</td>
    <td>${r.film_director}</td>
    </tr>`;
    }
    // Setting innerHTML as tab variable
    document.getElementById("movies").innerHTML = tab;
}
