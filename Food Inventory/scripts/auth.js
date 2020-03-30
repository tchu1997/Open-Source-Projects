
// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user){
        // get data
        db.collection('food').get().then(snapshot => {
            setupFood(snapshot.docs);
            setupUI(user);
        });
    }else{
        setupUI();
        setupFood([]);
    }
});

// view cart
const cart = document.querySelector('#cart');
cart.addEventListener('click',(e) => {
    e.preventDefault();
    console.log("user views cart");
});

const cartForm = document.querySelector('#cart-form');
cartForm.addEventListener('submit',(e) => {
    e.preventDefault();
    localStorage.clear();
    const modal = document.querySelector('#modal-cart');
    M.Modal.getInstance(modal).close();
})

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e) => {
    e.preventDefault(); // prevent the form from closing and refreshing the page

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    console.log(email,password);

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        // close the signup modal and reset the form
        const modal = document.querySelector('#modal-signup'); // get the modal
        M.Modal.getInstance(modal).close(); // close the modal
        signupForm.reset(); // reset modal
    })
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click',(e) => {
    e.preventDefault();
    auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit',(e) =>{
    e.preventDefault();

    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // close the login modal and reset the form
        const modal = document.querySelector('#modal-login'); 
        M.Modal.getInstance(modal).close(); 
        loginForm.reset(); 
    });
});