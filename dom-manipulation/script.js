document.addEventListener('DOMContentLoaded', ()=>{
    const arrayQuotess=localStorage.getItem('arrayQuotes')
    let arrayQuotes=JSON.parse(arrayQuotess)
    const button=document.getElementById('newQuote')
    const displayedDiv=document.getElementById('quoteDisplay')
    const form= document.createElement('form')
    const input1=document.createElement('input')
    const input2=document.createElement('input')
    const h2=document.createElement('h2')
    const addQuoteButton=document.createElement('button'     )
    function showRandomQuote() {
    const randomIndexArrayQuotes=Math.floor(Math.random()*arrayQuotes.length)
    const category=arrayQuotes[randomIndexArrayQuotes].category
    const displayedText=arrayQuotes[randomIndexArrayQuotes].text
    const randomTextIndexDisplayed=Math.floor(Math.random()*displayedText.length)
    const displayedTextElement=displayedText[randomTextIndexDisplayed]
    const displayedDiv=document.getElementById('quoteDisplay')
    displayedDiv.innerHTML=`
    <h2>${category}</h2>
    <p>Quote: ${displayedTextElement}</p>
    `
    }
    function createAddQuoteForm(){
         addQuoteButton.textContent='Add Quote'
         h2.textContent='Add your own quote'
         input1.placeholder='Enter quote category'
         input1.type='text'
         input2.placeholder='Enter a new quote'
         input2.type='text'
          form.appendChild(h2)
          form.appendChild(input1)
          form.appendChild(input2)
          form.appendChild(addQuoteButton)
          document.body.appendChild(form)
      } 
    button.addEventListener('click', ()=>{
        showRandomQuote()
        createAddQuoteForm()
    })
    addQuoteButton.addEventListener('click', (e)=>{ 
        e.preventDefault()
        const userCategoryInputValue=input1.value.trim()
        const userQuoteInputValue=input2.value.trim()
        const quoteObj=arrayQuotes.find(obj=>obj.category===userCategoryInputValue)
        if(quoteObj){
            quoteObj.text.push(userQuoteInputValue)
            localStorage.setItem('arrayQuotes', JSON.stringify(arrayQuotes))
        }
        else if(userCategoryInputValue && userQuoteInputValue){
            const newQuoteObj={
                category: userCategoryInputValue,
                text: [userQuoteInputValue]
            }
            const arrayQuotes=JSON.parse(localStorage.getItem('arrayQuotes'))
            arrayQuotes.push(newQuoteObj)
            localStorage.setItem('arrayQuotes', JSON.stringify(arrayQuotes))
            localStorage.setItem('newQuoteObject', JSON.stringify(newQuoteObj))
            alert('New quote category is added')
        }
        else {alert('Category or Text is empty')}
        
        })
        const blobed= new Blob([arrayQuotes], { type: 'application/json'})
        const quoteUrl=URL.createObjectURL(blobed)
        const downlodButton=document.createElement('button')
       const downloadLink= document.createElement('a')
       downloadLink.href=quoteUrl
       downloadLink.download='quote json'
       downlodButton.textContent='Download quotes'
       downloadLink.appendChild(downlodButton)
       document.body.appendChild(downloadLink)
       URL.revokeObjectURL(quoteUrl)
       const chooseFileInput=document.createElement('input')
       chooseFileInput.type='file'
       chooseFileInput.accept='.json'
       document.body.appendChild(chooseFileInput)
       chooseFileInput.addEventListener('change', (e)=>{
            const fileReading= new FileReader()
            fileReading.onload=(e)=>{
                const importedQuotes=JSON.parse(e.target.result)
                arrayQuotes.push(...importedQuotes)
                localStorage.setItem('arrayquotes', JSON.stringify(arrayQuotes))
                alert('Quote saved')

            }
            fileReading.readAsText(e.target.files[0])
       })
      const selection= document.createElement('select')
      const option1= document.createElement('option')
      const option2= document.createElement('option')
      const option3= document.createElement('option')
      const option4= document.createElement('option')
      option1.value='Success'
      option2.value='Failure'
      option3.value='Heartbroken'
      option4.value='Destiny'
      option1.textContent='Success'
      option2.textContent='Failure'
      option3.textContent='Heartbroken'
      option4.textContent='Destiny'
      selection.appendChild(option1)
      selection.appendChild(option2)
      selection.appendChild(option3)
      selection.appendChild(option4)
       document.body.appendChild(selection)
       function filterQuotes(e){
        e.preventDefault()
        const option1Value=option1.value
        const option2Value=option2.value
        const option3Value=option3.value
        const option4Value=option4.value
        const selectedObjQuote=arrayQuotes.find(obj=>selection.value===obj.category)
        
    const selectedArrayQuote=Math.floor(Math.random()*selectedObjQuote.text.length)
    const selectedCategory=selectedObjQuote.category
    const displayedText=selectedObjQuote.text[selectedCategory]
    const displayedDiv=document.getElementById('quoteDisplay')
    displayedDiv.innerHTML=`
    <h2>${selectedCategory}</h2>
    <p>Quote: ${displayedText}</p>
    ` 
    localStorage.setItem('filteredCategory', JSON.stringify(selectedArrayCategory))
    localStorage.setItem('filteredText', JSON.stringify(displayedText))
       }
       selection.addEventListener('change', filterQuotes)
       function populateCategories (){
            const categoryFilter=JSON.parse(localStorage.getItem('filteredCategory'))
            const populateCategories=JSON.parse(localStorage.getItem('filteredText'))
            const displayedDiv=document.getElementById('quoteDisplay')
            const filterMap=populateCategories.map(item=>{
                item
            })
            displayedDiv.innerHTML=`
            <h2>${categoryFilter}</h2>
            <p>Quote: ${populateCategories}</p>
            `
           }
           function addQuote(){
            const newQuoteObjFromLocalStorage=JSON.parse(localStorage.getItem('newQuoteObject'))
            const newOption=document.createElement('option')
            newOption.textContent=`${newQuoteObjFromLocalStorage.category}`
            selection.appendChild(newOption)

       }
       document.addEventListener('DOMContentLoaded', addQuote)
       
       document.addEventListener('change', addQuote)
       async function fetchQuotesFromServer(){
        const mockURL="http://localhost:3000/"
        try{
            const response= await fetch(mockURL)
            const jsonedData= await response.json
            return jsonedData
        }
        catch(error){
            console.error('error in server:',error )
        }
       }
       const quotesFromLocalStorage=JSON.parse(localStorage.getItem('arrayQuotes'))
       async function fetchFromLocalStorage() {
        
            const quotesFromServerVariables= await fetchQuotesFromServer()
            //pre-resolving of conflicts
            const resolvedQuotes=resolvingConflicts(quotesFromLocalStorage,quotesFromServerVariables)
        
       }
       function resolvingConflicts(localStorageQuotes,serverQuotes){
        const combinedQuoptes=[...localStorageQuotes, ...serverQuotes]
        const finalArrayQuote=[...new Set(combinedQuoptes)]
        return finalArrayQuote
       }
       if(resolvingConflicts){
        alert('Conflict resolved')
       }
       const resolveBtn=document.createElement('button')
       resolveBtn.textContent='Resolve conflict'
       resolveBtn.addEventListener('click', resolvingConflicts)
       document.body.appendChild(resolveBtn)
    })
    
   