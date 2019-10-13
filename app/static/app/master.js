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

var areaitems = JSON.parse('[{"t":"Czarny Portfel","c":"Portfel","n":"Uszkodzona kieszonka","lat":52.237361103676314,"lng":20.995259284973148,"r":"Tak","login":"Rafał","phone":"234 523 526","email":"custom@example.com","id":"7989731564116171"},{"t":"Xaomi","c":"Telefon","n":"Zbita szyba","lat":52.23507192877554,"lng":20.992383956909183,"r":"Tak","login":"Rafał","phone":"234 523 526","email":"custom@example.com","id":"09735985657228374"},{"t":"Klucze","c":"Klucze","n":"","lat":52.23607170164549,"lng":20.99667549133301,"r":"Nie","login":"Rafał","phone":"234 523 526","email":"custom@example.com","id":"30899317352911315"},{"t":"Okulary","c":"Drobne przedmioty","n":"Zbita lewa soczewka","lat":52.23743977539629,"lng":20.9893798828125,"r":"Nie","login":"Rafał","phone":"234 523 526","email":"custom@example.com","id":"873925034100641"},{"t":"Czołg","c":"Inne","n":"T34 z pustym bakiem","lat":52.233993201212165,"lng":20.98568916320801,"r":"Tak","login":"Rafał","phone":"234 523 526","email":"custom@example.com","id":"5784189722920436"}]');
var areaitems2 = JSON.parse('[]');

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
    "<hr style='padding:0; margin:0'>"+
    "<div style='text-align:center'>"+e.t+"</div>"+
    "<div style='text-align:center'>"+e.n+"</div>"+
    "<div style='text-align:right'> <a href='#' onclick='refreshFounds(\""+e.id+"\")'>Pokaż</a></div>"
}

function refreshFounds(idRand){
    var opt = "";
    if(idRand){
        areaitems.forEach(el =>{
            if(el.id.toString() == idRand.toString()){
                if(el.t != "") opt+="<a href='#' onclick='fillCustomModal({id:\""+el.id+"\",e:\""+el.email+"\", c:\""+el.c+"\", o:\""+el.n+"\", r:\""+el.r+"\", p:\""+el.phone+"\" })'><li>"+el.t+"</li></a>";
                var mr = addPoint(el.lat, el.lng);
                mr.bindPopup(buildPopUp(el));
            }
        })
    }else{
        areaitems.forEach(el =>{
            if(el.t != "") opt+="<a href='#' onclick='fillCustomModal({id:\""+el.id+"\",e:\""+el.email+"\", c:\""+el.c+"\", o:\""+el.n+"\", r:\""+el.r+"\", p:\""+el.phone+"\" })'><li>"+el.t+"</li></a>";
            var mr = addPoint(el.lat, el.lng);
            mr.bindPopup(buildPopUp(el));
    
        })
    }
    
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
    if(typeof localStorage.getItem('login') == null){
        $('#login_Modal').modal();
    }else{
        var title = document.getElementById('input_found_title').value;
        var category = document.getElementById('input_select_category').value;
        var note = document.getElementById('input_found_note').value;
        var rewart = document.getElementById('input_select_reward').value;
        var lat = marker.getLatLng().lat;
        var lang = marker.getLatLng().lng;

        areaitems.push({
            id:Math.random().toString().split('.')[1],
            t: title,
            c:category,
            n:note,
            lat:lat,
            lng:lang,
            r:rewart,
            login:localStorage.login,
            phone:localStorage.phone,
            email:localStorage.email,
        });

        clearMarkers();
        refreshFounds();
        marker.remove();
    }
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

function fillCustomModal(e){
    console.log(e);
    document.getElementById('fill_category').innerHTML = e.c;
    document.getElementById('fill_opis').innerHTML = e.o;
    document.getElementById('fill_reward').innerHTML = e.r;
    document.getElementById('fill_email').innerHTML = e.e;
    document.getElementById('fill_phone').innerHTML = e.p;

    showInfoModal();
}

function showInfoModal(){
    $('#info_Modal').modal();
}