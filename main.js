document.getElementById("forms").addEventListener("submit",addItems)

// getting siteName and siteUrl 
function addItems( event ){
    event.preventDefault()
    var name = document.getElementById("website-name").value
    var url = document.getElementById("website-url").value
    if ( !name || !url){
        alert("fill the form")
        return false
    }
    
    var regx = "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";
    var urlValidate = new RegExp(regx)

    if( !url.match(urlValidate) ){
        alert("enter an valid url")
        return false
    }
    var bookmark = {
        siteName : name,
        siteUrl : url    
    }
    if ( localStorage.getItem("bookmarks") === null ){
        var bookmarks = []
        bookmarks.push( bookmark )
        localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
    }else {
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
        bookmarks.push(bookmark)
        localStorage.setItem("bookmarks",JSON.stringify(bookmarks))        
    }
    displayItems()
}
// displaying the localStorage bookmarks
function displayItems( event ){
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
    var displayItems = document.getElementById("items")

    bookmarks.forEach( item => {
        var siteName = item.siteName
        var siteUrl = item.siteUrl
        displayItems.innerHTML += '<div class="container bg-dark my-2">'+
                                '<h2 class="text-white my-2">'+siteName+'</h2>'+
                                '<a class="btn btn-primary my-3" target="_blank" href="'+siteUrl+'">visit</a>'+
                                '<a class="btn btn-danger mx-3 text-white" onclick="deleteItem(\''+siteUrl+'\')" href="#">delete</a>'
                                '</div>' 
    });
}

function deleteItem( url ){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    for(var i=0;i < bookmarks.length;i++){
        if ( bookmarks[i].siteUrl === url){
            bookmarks.splice(i,1)
        }
    }
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
    displayItems()
}