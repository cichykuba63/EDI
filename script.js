const api_url = "https://my.api.mockaroo.com/movies.json?key=82d56ac0";

function hideloader() {
    document.getElementById('loading').style.display = 'none';
};

function table(data) {
    // creating table headings
    let tab = 
        `<tr>
        <th>ID</th>
        <th>Movie Title</th>
        <th>Year of production</th>
        <th>Country of origin</th>
        <th>Budget</th>
        <th>Is in cinema?</th>
        <th>Movie Genre</th>
        <th>Main Actor</th>
        <th>Film Director</th>
        </tr>`

    // adding table description to table
    for (let r of data) {
        tab += `<tr>
        <td>${r.id}</td>
        <td>${r.movie_title}</td>
        <td>${r.year_of_production}</td> 
        <td>${r.country_of_origin}</td>
        <td>${r.budget}</td>
        <td>${r.is_in_cinema}</td>
        <td>${r.movie_genre}</td>
        <td>${r.main_actor}</td>
        <td>${r.film_director}</td>
        </tr>`
    };

    document.getElementById("movies").innerHTML = tab;
};

function piechart(data) {
    let labels = []; let allDates = []; let itemData = []; let counter = 0;

    for (let r of data) {
        // adding all dates to allDates variable
        allDates.push(r.year_of_production);
        if (labels.includes(r.year_of_production) == false) {
            // only adding single dates to labels variable
            labels.push(r.year_of_production);
        };
    };

    labels.sort();

    for (let index of Array(labels.length).keys()) {
        counter = 0;
        for (let date of allDates) {
            // counting amount of specific date
            if (date == labels[index]) {
                counter++;
            };
        };
        // adding this counting to the variable
        itemData.push(counter);
    };

    const info = {
        labels: labels,
        datasets: [{
          data: itemData,
          backgroundColor: ['#78fa99', '#56b26d', '#2d743f', '#c6f782', '#a4f434', '#f1fc4c', '#e4ea83', '#f5c286', '#ff8800', '#b67c3a', '#95b0f2', '#5074cc', '#3159bc', '#85a1e5', '#e984f4', '#95429e', '#e11bf7', '#f54994', '#ed3030', '#f70000', '#daecec', '#47cdcd', '#05abac', '#a4baf0', '#c76727', '#cc9773', '#e11aa5', '#0fe203', '#54d54d', '#b6d2b5' , '#f7fc1d', '#eca735', '#e9cb9b', '#aeaaa5' , '#f2ddba' , '#965d00' , '#71c9d2' , '#2ba6b2' , '#d7badc' , '#706273', '#ea32cc'],
          hoverOffset: 25,
        }]
    };

    const config = {
        type: 'pie',
        data: info,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: "Year of production of the films"
                }
            }
        }
    };

    new Chart(
        document.getElementById("piechart"),
        config
    );
};

function barchart(data) {
    let labels = []; let allData = []; let itemData = []; let counter = 0;

    for (let r of data) {
        // adding all countries to allData variable
        allData.push(r.country_of_origin);
        if (labels.includes(r.country_of_origin) == false) {
            // only adding single countries to labels variable
            labels.push(r.country_of_origin);
        };
    };

    labels.sort();

    for (let index of Array(labels.length).keys()) {
        counter = 0;
        for (let date of allData) {
            // counting amount of specific country
            if (date == labels[index]) {
                counter++;
            };
        };
        // adding this counting to the variable
        itemData.push(counter);
    };

    const info = {
        labels: labels,
        datasets: [{
          data: itemData,
          backgroundColor: ['#7f6b4d', '#a70b7d', '#e41c15', '#4a7bde', '#f51e58', '#2e987b', '#14f915', '#9c6b54'],
          hoverOffset: 25,
        }]
    };

    const config = {
        type: 'bar',
        data: info,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: "Countries of origin of movies"
                }
            }
        }
    };

    new Chart(
        document.getElementById("barchart"),
        config
    );
};

window.onload = async function getapi() {
    // Checking if key value "movie_API_Data" exists in seesionStorage
    if (sessionStorage.getItem('movie_API_Data') === null) {  
        // getting response from given url
        const response = await fetch(api_url);

        //data in json format are stored in data variable
        let data = await response.json();
        
        // Turing the JSON data into string from variable data and adding it to sessionStorage
        sessionStorage.setItem("movie_API_Data", JSON.stringify(data));      
    };

    // Reading sessionStorage then turning it into JSON format and assinging it to a variable API_Data 
    var API_Data = await JSON.parse(sessionStorage.getItem("movie_API_Data"));      

    if (document.querySelector("title").innerText == "Table") {
        hideloader();
        table(API_Data);
    }

    else if (document.querySelector("title").innerText == "Piechart") {
        hideloader();
        piechart(API_Data);
    }

    else if (document.querySelector("title").innerText == "Barchart") {
        hideloader();
        barchart(API_Data);
    }
};