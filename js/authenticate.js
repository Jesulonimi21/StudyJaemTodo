document.getElementById("have-account").addEventListener("click", async function(){
    window.location.href="./todo.html";
  })

  document.getElementById("create-account").addEventListener("click",async function(){
    let initializeList=await contractCall('initializeList',[],0);
    window.location.href="./todo.html";
  })