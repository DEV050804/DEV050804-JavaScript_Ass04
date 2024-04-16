// Function to dynamically add student ID and name
function addStudentInfo() {
    const studentInfo = document.getElementById('student-info');
    const studentId = '200552715';
    const studentName = 'Dev Patel';
    studentInfo.textContent = `Student ID: ${studentId} | Name: ${studentName}`;
}

// Function to fetch song information from musixmatch API
async function fetchSongInfo(songName) {
    const apiKey = 'c6acec269965e8d60084e57553139bfd'; //API key
    const apiUrl = `https://api.musixmatch.com/ws/1.1/track.search?q=${songName}&apikey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Check if data is available
        if (data.message.header.status_code === 200) {
            const track = data.message.body.track_list[0].track;
            const songTitle = track.track_name;
            const artistName = track.artist_name;
            const albumName = track.album_name;
            const releaseDate = track.updated_time;
            const trackRating = track.track_rating;
            const albumArtworkUrl = track.album_coverart_100x100; // URL of album artwork image

            // Display song information and album artwork on the page
            const songInfoElement = document.createElement('div');
            songInfoElement.innerHTML = `
                <h2>${songTitle}</h2>
                <p>Artist: ${artistName}</p>
                <p>Album: ${albumName}</p>
                <p>Release Date: ${releaseDate}</p>
                <p>Track Rating: ${trackRating}</p>
                <img src="${albumArtworkUrl}" alt="Album Artwork">
            `;
            document.getElementById('song-info-container').appendChild(songInfoElement);
        } else {
            console.log('Error fetching data:', data.message.header.status_code);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to search for a song
function searchSong() {
    const searchInput = document.getElementById('search-input');
    const songName = searchInput.value.trim();
    
    if (songName !== '') {
        fetchSongInfo(songName);
        searchInput.value = ''; // Clear the search input after searching
    } else {
        alert('Please enter a song name.');
    }
}

// Call addStudentInfo function when the page loads
window.onload = function() {
    addStudentInfo();
};
