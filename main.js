const postlists=document.querySelector('.posts-list');
const addPost=document.querySelector('.add-post-form');
const titleValue=document.querySelector('#title-value');
const bodyValue=document.querySelector('#body-value');
const btn=document.querySelector('.btn')
let output=``

const renderPost=(posts)=>{
    posts.forEach(element => {
        output +=` <div class="card mt-4 col-md-6 bg-light">
        <div  class="card-body" data-id=${element._id}>
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.desc}</p>
            <a href="#" class="card-link" id="edit">Edit</a>
            <a href="#" class="card-link" id="delete">delete</a>
      </div>
        </div>`;
    });
    postlists.innerHTML=output
}
const url='http://localhost:3000/api/posts';
postlists.addEventListener('click',(e)=>{
  e.preventDefault();
  let delButton=e.target.id == "delete"
  let editButton=e.target.id == "edit";

  let id=e.target.parentElement.dataset.id;
  console.log(id)

  if(delButton){
    console.log(id)
    fetch(`${url}/delete/${id}`,{
      method:'DELETE'
    })
    .then(res=>res.json())
    .then(()=>location.reload())
  }
  if(editButton){
    const parent=e.target.parentElement;
    let titleContent=parent.querySelector('.card-title').textContent;
    let bodyContent=parent.querySelector('.card-text').textContent;
    titleValue.value=titleContent;
    bodyValue.value=bodyContent;
  }
  btn.addEventListener('click',(e)=>{
    e.preventDefault()
    fetch(`${url}/update/${id}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        title:titleValue.value,
        desc:bodyValue.value
      })
    })
    alert("Post updated")
    location.reload()
  })

})
fetch(url)
  .then(res=>res.json())
  .then(data=>{
    console.log(data)
    renderPost(data)
})
addPost.addEventListener('submit',(e)=>{
  e.preventDefault()
  fetch(url,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      title:titleValue.value,
      desc:bodyValue.value
    })
  })
  .then(res=>res.json())
  .then(data=>{
    const dataArr=[];
    console.log(data)
    dataArr.push(data)
    renderPost(dataArr)
  })
  //
  titleValue.value='';
  bodyValue.value='';
})