window.addEventListener("load",()=>{
    const loader = document.querySelector(".loader");

    loader.classList.add("loader-hidden");

    loader.addEventListener("transitionEnd",() =>{
        document.body.removeChild("loader");
    })
})
