const arrayQuotes=[
    {
        category: 'Success',
        text: [
            'Success is not final, failure is not fatal: It is the courage to continue that counts.',
            "The only place where success comes before work is in the dictionary.",
            "Success is not how high you have climbed, but how you make a positive difference to the world." ,
            "Success is walking from failure to failure with no loss of enthusiasm.",
            "Success usually comes to those who are too busy to be looking for it." 
        ]
    },
    {
        category: 'Destiny',
        text: [
            "It is not in the stars to hold our destiny but in ourselves.",
            "Destiny is not a matter of chance; it is a matter of choice. It is not a thing to be waited for, it is a thing to be achieved.",
            "Your destiny is to fulfill those things upon which you focus most intently. So choose to keep your focus on that which is truly magnificent, beautiful, uplifting, and joyful. Your life is always moving toward something."  ,
            "Control your own destiny or someone else will.",
        ]
    },
    {
        category: 'Failure',
        text: [
            "Failure is simply the opportunity to begin again, this time more intelligently.",
            "I have not failed. I've just found 10,000 ways that won't work.",
            "Success is stumbling from failure to failure with no loss of enthusiasm.",
            "Do not be embarrassed by your failures, learn from them and start again.",
            "Only those who dare to fail greatly can ever achieve greatly."
        ]
    },
    {
        category: 'Heartbroken',
        text: [
            "The emotion that can break your heart is sometimes the very one that heals it...",
            "The heart was made to be broken.",
            "Don't cry when the sun is gone, because the tears won't let you see the stars.",
            "It is better to have loved and lost, than never to have loved at all.",
            "The cure for a broken heart is simple, my lady. A hot bath and a good night's sleep."  
        ]
    },
    
]
document.addEventListener('DOMContentLoaded', ()=>{
    const button=document.getElementById('newQuote')
    const displayedDiv=document.getElementById('quoteDisplay')
    function showQuote() {
    const randomIndexArrayQuotes=Math.floor(Math.random()*arrayQuotes.length)
    const category=arrayQuotes[randomIndexArrayQuotes].category
    const displayedText=arrayQuotes[randomIndexArrayQuotes].text
    const randomTextIndexDisplayed=Math.floor(Math.random()*displayedText.length)
    const displayedTextElement=displayedText[randomTextIndexDisplayed]
    const displayedDiv=document.getElementById('quoteDisplay')
    const h2=document.createElement('h2')
    h2.textContent=category
    displayedDiv.appendChild(h2)
    const p=document.createElement('p')
    p.textContent=`Quote: ${displayedTextElement}`
    displayedDiv.appendChild(p)
    }
    button.addEventListener('click', showQuote)
    const userCategory=document.getElementById('newQuoteCategory')
    const userQuote=document.getElementById('newQuoteText')
    const addButton=document.getElementById('addQuote')
    function addQuote(){
        const userCategoryInputValue=userCategory.value.trim()
        const userQuoteInputValue=userQuote.value.trim()
        for (let element of arrayQuotes){
            if(userCategoryInputValue===element.category){
                element.text.push(userQuoteInputValue)
                alert('Quote added')
                break;
            }
            else {
                alert('Quote category not found')
            }
        }
    }
    addButton.addEventListener('click', addQuote)
})
console.log(arrayQuotes[3].category)