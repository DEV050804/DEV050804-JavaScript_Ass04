// Function to dynamically add student ID and name
function addStudentInfo() {
    const studentInfo = document.getElementById('student-info');
    const studentId = '200552715';
    const studentName = 'Dev Patel';
    studentInfo.textContent = `Student ID: ${studentId} | Name: ${studentName}`;
}

// Function to fetch artist information from Spotify API through RapidAPI
async function fetchArtistInfo(artistId) {
    const url = `https://spotify23.p.rapidapi.com/artists/?ids=${artistId}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '25b0304e3fmsh988ba37dab514bcp1da427jsn28284700bbf5',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);

        // Check if data is available
        if (data.artists) {
            const artist = data.artists[0];
            const artistName = artist.name;
            const genres = artist.genres.join(', ');
            const popularity = artist.popularity;
            const imageUrl = artist.images.length > 0 ? artist.images[0].url : '';

            // Display artist information on the page
            const artistInfoElement = document.createElement('div');
            artistInfoElement.innerHTML = `
                <h2>${artistName}</h2>
                <p>Genres: ${genres}</p>
                <p>Popularity: ${popularity}</p>
                <img src="${imageUrl}" alt="${artistName} Image">
            `;
            document.getElementById('artist-info-container').appendChild(artistInfoElement);
        } else {
            console.log('Error fetching data:', data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to search for an artist
function searchArtist() {
    const searchInput = document.getElementById('search-input');
    const artistId = searchInput.value.trim();
    
    if (artistId !== '') {
        fetchArtistInfo(artistId);
        searchInput.value = ''; // Clear the search input after searching
    } else {
        alert('Please enter an artist ID.');
    }
}

// Call addStudentInfo function when the page loads
window.onload = function() {
    addStudentInfo();
};
