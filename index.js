document.addEventListener("DOMContentLoaded", ()=>{
    // assign html elements to variables
    const button = document.getElementById("fetch-button")
    const photoSection = document.getElementById("dog-photo")
    const fetchedSection = document.getElementById("fetched-dogs-section")
    const fetchedList = document.getElementById("fetched-dogs-list")
    const footer = document.getElementById("footer")
    const toTop = document.createElement("a")
    const toTopText = document.createTextNode("Throw it again?")
    toTop.appendChild(toTopText)


    function addImg(url){
        // create caption
        let imgHeader = document.createElement("h2")
        imgHeader.innerText = "Look who it is!"
        // create image
        let doggieImg = document.createElement("img")
        doggieImg.src = url

        // attach caption to section
        photoSection.appendChild(imgHeader)
        // attach image
        photoSection.appendChild(doggieImg)
        // attach footer 
        footer.appendChild(toTop)
    }

    function deletePlaceholder(){
        // delete placeholder text above UL
        if (fetchedList.getElementsByTagName("li").length > 0) {
            document.getElementById("no-dogs-yet").remove()
        }  
    }

    function addName(fetchedName){
        // create new fetched dog <li>
        let fetchedDoggie = document.createElement("li")
        let fetchedDoggieName = document.createTextNode(fetchedName)

        // attach fetched dog name
        fetchedDoggie.appendChild(fetchedDoggieName)
        fetchedList.appendChild(fetchedDoggie)
        deletePlaceholder()
   
    }

    function sleep(ms) {
        // add ms millisecond timeout before promise resolution
        // helper method for delayedThrow
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    async function delayedThrow(){
        // await sleep function promise
        await sleep(500)
        // once resolved, click button
        // this will trigger a new fetch cycle
        button.click()
    }

    function scrollAndThrow(){
        // smooth scroll back to top left corner of window
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
           })
        // use sleep function promise to initiate 500 millisecond delay
        // then click button and initiate new fetch cycle
        delayedThrow()
    }

    
    // when button is clicked:
    button.addEventListener("click", ()=>{
        // remove previous dog if exists
        let child = photoSection.lastElementChild
        while (child) { 
            photoSection.removeChild(child) 
            child = photoSection.lastElementChild 
        }  
        // fetch new dog image
        fetch("https://dog.ceo/api/breeds/image/random")
        .then(response => response.json())
        .then((doggie) => {
        let doggieURL = doggie.message
        // add dog to page
        addImg(doggieURL)
        })
        // fetch new dog name
        fetch("https://namey.muffinlabs.com/name.json?")
        .then(response => response.json())
        .then((doggieName) =>{
        // add name to list of fetched dogs on page
            addName(doggieName[0])
        })
    })
    
    // add click event to footer link
    toTop.addEventListener("click", () =>{
        // this function will scroll to the top, 
        // delay for half a second, 
        // then initiate a new fetch cycle
       scrollAndThrow()
        })
    
})