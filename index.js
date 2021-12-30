console.log('This is news by Indian Shatabdi News');

// Initialize the news api parameters
let country = 'in';
let apiKey = '25671bb3e513435a8ee53acd781fffae';

// https://newsapi.org/v2/top-headlines?sources=source&apiKey=apiKey

// Grab the news container
let newsAccordion = document.getElementById('newsAccordion');

// Create an Ajax GET request
const xhr = new XMLHttpRequest();
xhr.open('GET',`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`);

// What to do when response is ready
xhr.onload = function(){
    if(this.status === 200){
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(articles);
        let news = '';
        articles.forEach((headline,index) => {
            // console.log(headline,index);
            // console.log(headline.title,headline.content);
            news += `<div class="accordion-item">
                        <h2 class="accordion-header" id="heading${index}">
                            <button class="accordion-button bg-light collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                ${headline.title}
                            </button>
                        </h2>
                        <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}"
                            data-bs-parent="#newsAccordion">
                            <div class="accordion-body">
                                ${headline.content}. <a href="${headline.url}" target="_blank">Read more here</a>
                            </div>
                        </div>
                    </div>`;
        });
        newsAccordion.innerHTML = news;
    }
    else{
        console.error('Some error occured.');
    }
}

xhr.send();

let searchTxt = document.getElementById('searchTxt');
searchTxt.addEventListener('input',function(e){
    
    let inputVal = searchTxt.value.toLowerCase();
    // console.log('Input event fired', inputVal);
    let news = document.getElementsByClassName('accordion-item');
    // console.log(news);
    Array.from(news).forEach(function(element){
        let newsTxt = element.getElementsByTagName('button')[0].innerText;
        if(newsTxt.toLowerCase().includes(inputVal)){
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none';
        }
    })
});

let datePublished = document.getElementById('datePublished');
let date = document.createElement('span');
date.className = 'col-5';
console.log(date);
date.innerText = new Date();
// console.log(date.innerText);
let hr = document.querySelector('hr');
datePublished.insertBefore(date,hr);