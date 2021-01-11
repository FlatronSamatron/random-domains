let arr_en = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

let vowels = ['a', 'e', 'i', 'o', 'u']
let noVowels = ['b', 'c', 'd', 'f', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'z']

let wordCount
let domains = []
let select

function randomWord(n){
    word = ''
    for(let i = 0; i<n; i++){
        if(i%2==0){
            word += noVowels[Math.floor(Math.random() * noVowels.length)]
        } else {
            word += vowels[Math.floor(Math.random() * vowels.length)]
        }
    }
    // alert(word+'.com')
    domainCheck(word+select)
}

function domainCheck(domain){
    let url = `https://usersapiv2.epik.com/v2/domains/quick-check?SIGNATURE=7B9C-1BB1-4AC8-EA25&DOMAINS=${domain}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        if(!data.data[domain].available_reason){
            domains.push(domain)
            let domainsPlace = document.querySelector('.domainsPlace')
            let span = document.createElement('span')
            span.innerHTML = domain
            domainsPlace.append(span)
        } else {
            randomWord(wordCount)
        }
    })
}

document.querySelector('.form').addEventListener('submit', (e)=>{
    e.preventDefault()
    select = document.querySelector('.select').value
    wordCount = document.querySelector('.wordCount').value
    let domainCount = document.querySelector('.domainCount').value

    for(let i = 0; i<domainCount; i++ ){
        randomWord(wordCount)
    }

})

document.querySelector('.copy').addEventListener('click', ()=>{
    // let copyText = document.querySelector(".domainsPlace");
    // console.log(copyText)
    // copyText.select();
    // document.copyText.execCommand("copy");
    var range = document.createRange();
             range.selectNode(document.querySelector(".domainsPlace"));
             window.getSelection().removeAllRanges();
             window.getSelection().addRange(range);
             document.execCommand("copy")
})
