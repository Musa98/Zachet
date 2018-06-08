var searchStr = "";
const maxSize = 330;
var elementwidth = 330;
const youtubePrefix = "https://www.youtube.com/watch?v="
var blockArr = [];
var searchResult;
var request;
var key = 'AIzaSyC7dNA9LIOT9J9xDNMtQ8bbkBVPp1YIRwI';
var request = '';



function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyC7dNA9LIOT9J9xDNMtQ8bbkBVPp1YIRwI');
}

function Search() {
    Str = document.getElementById('query').value
    if(Str.length == 0)
    {
        alert('Пусто');
    }
    else
    {
        var query = Str;
            request = gapi.client.youtube.search.list({
            part: 'snippet',
            q:query,
            maxResults: 20
        });
        request.execute(onSearchResponse);
    }
}

function onSearchResponse(response) {
    console.log(response.result.items[0].id);
    Spis = document.getElementById('spis'); 
    
    for (var i = 0; i < 20; i++)
    {
        var element = document.createElement('div');
        element.className = 'block';
        Spis.appendChild(element);
        blockArr.push(element);                     

        var a = document.createElement('a');        
        a.setAttribute("href", youtubePrefix +response.result.items[i].id.videoId);
        a.setAttribute("target", "_blank");
        element.appendChild(a);


        var img = document.createElement('img');    
        img.setAttribute("src",response.result.items[i].snippet.thumbnails.high.url);
        img.draggable = false;
        a.appendChild(img);

        var h1 = document.createElement('h1');      
        var t = document.createTextNode(response.result.items[i].snippet.title);
        h1.appendChild(t);
        element.appendChild(h1);                                    

        var h2 = document.createElement('h2');      
        var t = document.createTextNode(response.result.items[i].snippet.channelTitle);
        h2.appendChild(t);
        element.appendChild(h2);    

        var p = document.createElement('p');        
        var t = document.createTextNode(response.result.items[i].snippet.description);
        p.appendChild(t);
        element.appendChild(p); 
    }
    GetNewSize(); 
}