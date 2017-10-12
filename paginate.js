var current_page = 1;
var records_per_page = 2;
var config = {
    apiKey: "AIzaSyBgcYJb9fliput71SPlQD0P_h1ToLwZNwU",
    authDomain: "nile-book.firebaseapp.com",
    databaseURL: "https://nile-book.firebaseio.com",
    projectId: "nile-book",
    storageBucket: "nile-book.appspot.com",
    messagingSenderId: "996025227285"
};
firebase.initializeApp(config);
var db = firebase.database().ref().child('object') ;
var objJson ; // Can be obtained from another source, such as your objJson variable
objJson = []
db.on('child_added' , (snap)=> {
    objJson.push(snap.val());
    console.log('objJson',objJson);
    changePage(1);
    return objJson ; 
})

function prevPage(){
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage(){
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}

function changePage(page){
    // console.log('asfkhadshjhasfhsajhgj')
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var listing_table = document.getElementById("listingTable");
    var page_span = document.getElementById("page");
    
    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();
    
    listing_table.innerHTML = "";
    
    for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++) {
        console.log(objJson[i]); 
        listing_table.innerHTML += objJson[i].txt1 + "<br>";
    }
    page_span.innerHTML = page;
    
    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }
    
    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

function numPages(){
    return Math.ceil(objJson.length / records_per_page);
}