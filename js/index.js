
function timeString(times){
    const hour = parseInt(times / 3600);
    const remainingMin = times % 3600;
    const minutes = parseInt(remainingMin / 60);
    remainingSecond = remainingMin % 60;
    return `${hour} Hour ${minutes} minutes ${remainingSecond} Ago`
}


const categoriesCl = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => {

        removeActiveBtn();

        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add('active')
        displayVideo(data.category);
    })
    .catch(error => console.error(error))
}

const removeActiveBtn = () =>{
    const buttons = document.getElementsByClassName('category-btn');
    console.log(buttons)
    for(let btn of buttons){
        btn.classList.remove('active')
    }
}

const descriptionBtn = async (video) =>{
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${video}`
    const res = await fetch(uri)
    const data = await res.json();
    displayDescription(data.video);
}

const displayDescription = (data) => {
    console.log(data)
    const modalContent = document.getElementById('modal-content')
    modalContent.innerHTML = `
        <img src=${data.thumbnail} />
        <p>${data.description}</p>
    `

    // show modal 
    document.getElementById('customModal').showModal();
}






// for display button
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.error(error))
}

const displayCategories = (data) => {

    
    
    const categoriesContainer = document.getElementById('categories')

    data.forEach((result) => {
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
            <button id="btn-${result.category_id}" onclick="categoriesCl(${result.category_id})" class="btn category-btn">${result.category}</button>
        `
        categoriesContainer.append(buttonContainer)
    })
}

// for display videos

const showVideo = async () => {
    // const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    // const data = await res.json()
    // displayVideo(data.videos);

    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideo(data.videos))
        .catch(error => console.error(error))
}

const displayVideo = (data) => {
    console.log(data);
    const videosContainer = document.getElementById('videos-ID');
    videosContainer.innerHTML = '';
    // condition for no videos  

    if(data.length == 0){
        videosContainer.classList.remove('grid');
        videosContainer.innerHTML = `
            <div class="min-h-[450px] w-full flex flex-col justify-center items-center gap-5">
                <img src="assets/Icon.png"/> 
                <h2 class="justify-center text-xl font-bold">Opps!! No content here in this category</h2>
            </div>
        `;
        return;
    }else{
        videosContainer.classList.add('grid')
    }

    data.forEach(data2 => {
        const div = document.createElement('div');
        div.classList = ('card card-compact');
        div.innerHTML = `
    <figure class="h-[250px] relative">
    <img
      src= ${data2.thumbnail} class="w-full h-full object-cover" />
      ${data2.others.posted_date?.length == 0 ? "" : `<span class="absolute font-bold text-xs text-white bottom-4 bg-black p-2 rounded-lg right-5">
        ${timeString(data2.others.posted_date)}
    </span>`}
    </figure>
    
  <div class="card-body">
    <div class="flex gap-3">
        <div class="w-10">
            <img class="rounded-full w-10 h-10 object-cover" src="${data2.authors[0].profile_picture}"/>
        </div>
        <div>
            <p class="font-bold text-lg">${data2.title}</p>
            <div class="">
                <p class="text-gray-400 flex gap-2 items-center">${data2.authors[0].profile_name} ${data2.authors[0].verified === true ? `<img class="w-4" src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000"/>` : ""}</p>
                
            </div>
        </div> 
    </div>
        <div>
            <button onclick="descriptionBtn('${data2.video_id
            }')" class="btn btn-error">Description</button>
        </div>
  </div>
        `
        videosContainer.append(div);
    })
}

loadCategories();
showVideo();





