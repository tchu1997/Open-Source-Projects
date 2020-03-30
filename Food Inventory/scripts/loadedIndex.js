
function doThis(){
    const carts = document.querySelectorAll('.add-cart');
    console.log(carts);
    // if (document.getElementsByClassName('add-cart')){
    //     console.log("it worked");
    //     const carts = document.querySelectorAll('.add-cart');
    //     console.log(carts.length);
    // for (let i = 0; i < carts.length; i ++){
    //     carts[i].addEventListener('click', ()=>{
    //         console.log("user added cart");
    //     });
    // }
    // }else {
    //     console.log("it failed");
    // }
    
}
window.onload = function () {
    (function () {
        const carts = document.querySelectorAll('.add-cart');
        if (carts.length > 0) {
            // do something if add-cart is found
            for (let i = 0; i < carts.length; i ++){
                carts[i].addEventListener('click', ()=>{
                console.log("user added cart");
                });
            }
        }
        else {
            setTimeout(arguments.callee, 50); // call myself again in 50 msecs
        }
    }());
};
// definition
// function loadScript(scriptUrl) {
//     const script = document.createElement('script');
//     script.src = scriptUrl;
//     document.body.appendChild(script);
  
//     return new Promise((res, rej) => {
//       script.onload = function() {
//         res();
//       }
//       script.onerror = function () {
//         rej();
//       }
//     });
//   }
  
//   // use
//   loadScript('scripts/index.js')
//     .then(() => {
//       console.log('page loaded');
//       doThis();
//     })
//     .catch(() => {
//       console.error('Script loading failed :( ');
//     });
// // RECURSIVE LOAD SCRIPTS
// function load_scripts( urls, final_callback, index=0 )
// {
//     if( typeof urls[index+1] === "undefined" )
//     {
//         load_script( urls[index], final_callback );
//     }
//     else
//     {
//         load_script( urls[index], function() {
//             load_scripts( urls, final_callback, index+1 );
//         } );
//     }
// }

// // LOAD SCRIPT
// function load_script( url, callback )
// {
//     var script = document.createElement( "script" );
//     script.type = "text/javascript";
//     if(script.readyState) // IE
//     {
//         script.onreadystatechange = function()
//         {
//             if ( script.readyState === "loaded" || script.readyState === "complete" )
//             {
//                 script.onreadystatechange = null;
//                 callback();
//             }
//         };
//     }
//     else // Others
//     {  
//         script.onload = function() { callback(); };
//     }
//     script.src = url;
//     document.getElementsByTagName( "head" )[0].appendChild( script );
//     // debug("javascript included: "+url);
// }


// var js = [ "scripts/auth.js", "scripts/index.js"];
// load_scripts( js, doThis );
