let formInputs = document.querySelector('.inputs');
let formHeader = document.querySelector('.form-header');
let firstBtn = document.querySelector('.first');
let paginationText = document.querySelector('.text');
let paginationDots = document.querySelectorAll('.dots i');
let lastBtn = document.querySelector('#last-btn');
let btnDiv = document.querySelector('.btn');

let name, email;
const step1Data = function() {
    name = document.querySelector('#name').value;
    email = document.querySelector('#email').value;
}

const step2 = function() {
    if(name === "" || email === "") {
        alert('Please fill all the fields');
        return;
    }
    else if(!email.includes('@')) {
        alert('Please enter a valid email address');
    }
    else{
        formHeader.innerHTML = `<p>Which topics you are interested in?</p>`;
        formInputs.innerHTML = `<input type="radio" id="software-development" name="topics" value="software-development" required>
        <label for="software-development">Software Development</label><br>
        <input type="radio" id="user-experience" name="topics" value="user-experience">
        <label for="user-experience">User Experience</label><br>
        <input type="radio" id="graphic-design" name="topics" value="graphic-design">
        <label for="graphic-design">Graphic Design</label><br>`;
        paginationText.innerHTML = `Step 2 of 3`;
        paginationDots[0].classList.remove('active');
        paginationDots[0].classList.add('previous');
        paginationDots[1].classList.add('active');
        firstBtn.style.display = 'none';
        lastBtn.classList.remove('last');
    }
}
firstBtn.addEventListener('click', function() {
    step1Data();    
    step2();
});
lastBtn.addEventListener('click', function() {
    let selectedTopic = document.querySelector('input[name="topics"]:checked');
    formHeader.innerHTML = `<p>Summary</p>`;
    formInputs.innerHTML = `<p>Name: <span>${name}</span></p>
    <p>Email: <span>${email}<span></p><br>
    <p>Topics: <br><br><span>${selectedTopic.labels[0].innerText}</span>
    </p>`;
    paginationText.innerHTML = `Step 3 of 3`;
    paginationDots[1].classList.remove('active');
    paginationDots[1].classList.add('previous');
    paginationDots[2].classList.add('active');
    btnDiv.innerHTML = `<button>Confirm</button>`;
});
