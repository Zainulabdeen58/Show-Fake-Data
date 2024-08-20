const commentContainer = document.getElementById("js-comment-container");
const showUserId = document.getElementById("js-show-user-id");

const id = JSON.parse(localStorage.getItem("userId"));

async function showComment() {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        
        // console.log(response);
        const Data = await response.json()
        console.log(Data);
        
          
        Data.forEach((comment) => {
          showUserId.innerText =  "";
          showUserId.innerText = `User Id : ${comment.postId}`; 
          const card = document.createElement("div");
          card.className =
            "card relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96";
          card.innerHTML = `
          <div class="p-6">
           <p class="block font-sans text-base antialiased leading-relaxed text-inherit font-bold">
                Body: ${comment.body.substring(0, 115)}...
            </p>
          </div>`;
      
          commentContainer.appendChild(card);
        });
      } catch (error) {
        console.log("Fetching Comments :", error);
      }
}

showComment();