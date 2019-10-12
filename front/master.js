var mapVisible = false;

function navigate(id){
    switch(id){
        case 1:
            document.querySelectorAll('.page').forEach(el =>{
                el.style.display = "none";
            });
            document.querySelectorAll('.page1').forEach(el =>{
                el.style.display = "block";
            })
            break;
        case 3:
                document.querySelectorAll('.page').forEach(el =>{
                    el.style.display = "none";
                });
                if(!mapVisible)
                document.querySelectorAll('.map-page').forEach(el =>{
                    el.style.display = "block";
                })
                document.querySelectorAll('.page3').forEach(el =>{
                    el.style.display = "block";
                })
                showMap();
                clearMarkers();
                refreshFounds();
                
                break;
        case 4:
            document.querySelectorAll('.page').forEach(el =>{
                el.style.display = "none";
            });
            if(!mapVisible)
            document.querySelectorAll('.map-page').forEach(el =>{
                el.style.display = "block";
            })
            document.querySelectorAll('.page4').forEach(el =>{
                el.style.display = "block";
            })
            showMap();
            clearMarkers();
            refreshLosts();
            
            break;
        default:
            break;
    }
}

var areaitems = JSON.parse('[{"t":"Czrny portfel","c":"Portfel","n":"Jest czarny","lat":52.23446165559543,"lng":20.997619628906254,"r":"Tak"},{"t":"Czrny portfel","c":"Portfel","n":"Jest czarny","lat":52.224142721422595,"lng":21.03366851806641,"r":"Tak"},{"t":"Czrny portfel","c":"Portfel","n":"Jest czarny","lat":52.24814633686761,"lng":21.029548645019535,"r":"Tak"},{"t":"Czrny portfel","c":"Portfel","n":"Jest czarny","lat":52.222879013637474,"lng":21.000022888183594,"r":"Tak"},{"t":"Czrny portfel","c":"Portfel","n":"Jest czarny","lat":52.244567673892846,"lng":20.97427368164063,"r":"Tak"}]');
var areaitems2 = JSON.parse('[{"t":"Czrny portfel","c":"Portfel","n":"Jest czarny","lat":52.23446165559543,"lng":20.997619628906254,"r":"Tak"},{"t":"Czrny portfel","c":"Portfel","n":"Jest czarny","lat":52.224142721422595,"lng":21.03366851806641,"r":"Tak"},{"t":"Czrny portfel","c":"Portfel","n":"Jest czarny","lat":52.24814633686761,"lng":21.029548645019535,"r":"Tak"},{"t":"Czrny portfel","c":"Portfel","n":"Jest czarny","lat":52.222879013637474,"lng":21.000022888183594,"r":"Tak"},{"t":"Czrny portfel","c":"Portfel","n":"Jest czarny","lat":52.244567673892846,"lng":20.97427368164063,"r":"Tak"}]');

var markers = [];
function addPoint(lat,lng){
    console.log("adding "+lat+" "+lng)
    var mra = L.marker([lat,lng]).addTo(map);
    markers.push(mra)
    return mra;
}

function clearMarkers(){
    console.log("Clearing Markers");
    while(markers.length > 0){
        var da = markers.pop();
        da.remove();
    }
}

function buildPopUp(e){
    return "<div style='text-align:center'><strong>"+e.c+"</strong></div>"+
    "<hr>"+
    "<div style='text-align:center'>"+e.t+"</div>"+
    "<div style='text-align:center'>"+e.n+"</div>"
}

function refreshFounds(){
    var opt = "";
    areaitems.forEach(el =>{
        if(el.t != "") opt+="<li>"+el.t+"</li>";
        var mr = addPoint(el.lat, el.lng);
        mr.bindPopup(buildPopUp(el));

    })
    document.getElementById('FoundsList').innerHTML = opt;
}


function refreshLosts(){
    var opt = "";
    areaitems2.forEach(el =>{
        if(el.t != "") opt+="<li>"+el.t+"</li>";
        var mr = addPoint(el.lat, el.lng);
        mr.bindPopup(buildPopUp(el));

    })
    document.getElementById('LostList').innerHTML = opt;
}
var map = L.map('map');

function showMap(){
    map.setView([52.2441779, 21.0077], 12);
    L.tileLayer('https://b.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    map.on('click', onMapClick);
    map.invalidateSize();
    mapVisible = true;
}

var marker = null;
function onMapClick(e){
    if(marker != null) marker.remove();
    marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
}


navigate(1);

function iFoundSubmit(){
    var title = document.getElementById('input_found_title').value;
    var category = document.getElementById('input_select_category').value;
    var note = document.getElementById('input_found_note').value;
    var rewart = document.getElementById('input_select_reward').value;
    var lat = marker.getLatLng().lat;
    var lang = marker.getLatLng().lng;

    areaitems.push({
        t: title,
        c:category,
        n:note,
        lat:lat,
        lng:lang,
        r:rewart
    });

    clearMarkers();
    refreshFounds();
    marker.remove();
}

function iLostSubmit(){
    if(typeof localStorage.login === "undefined"){
        $('#login_Modal').modal();
    }else{
        var title = document.getElementById('input_found_title2').value;
        var category = document.getElementById('input_select_category2').value;
        var note = document.getElementById('input_found_note2').value;
        var lat = marker.getLatLng().lat;
        var lang = marker.getLatLng().lng;
    
        areaitems2.push({
            t: title,
            c:category,
            n:note,
            lat:lat,
            lng:lang,
            login:localStorage.login,
            phone:localStorage.phone,
            email:localStorage.email
        });
    
        clearMarkers();
        refreshLosts();
        marker.remove();
    }
    
}

function SetMe(){
    localStorage.login = document.getElementById('login_input');
    localStorage.phone = document.getElementById('phone_input');
    localStorage.email = document.getElementById('email_input');
}