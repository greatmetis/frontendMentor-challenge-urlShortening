// Navigation trigger for small screen
const navSmall =$(".nav-small")
navSmall.css("display","none")
$(".hamburger").click(function(){
    if(navSmall.css('display')=="none"){
        navSmall.css('display','block')
    }else{
        navSmall.css('display','none')
    }
})

const btnShorten = $(".btn--shorten")
const shortenResults= $(".shortenResults")
const inputLink = $(".input-link")
const api ="https://api.shrtco.de/v2/"
const results=[]
const Result = function(inputUrl,shortLink,status,textColor){
    this.inputUrl=inputUrl;
    this.shortLink=shortLink;
    this.status=status;
    this.textColor=textColor;
}
// Enter to send the input value
inputLink.keyup(function(evt){
    if(evt.keyCode === 13){
        evt.preventDefault()
        btnShorten.click()
    }
})
// shorten event trigger
btnShorten.click(function(){
    $(".input-link").removeClass("empty-alert")
    $(".empty").removeClass("empty-text")
    let inputUrl = inputLink.val()
    if(inputUrl.length<1){
        $(".input-link").addClass("empty-alert")
        $(".empty").addClass("empty-text")
    }else{
        btnShorten.prop("value","sending...")
        $.ajax({
            url:api+"shorten?url="+inputUrl,
            error:function(res){
                btnShorten.prop("value","Shorten It!")
                let textColor = "hsl(0, 87%, 67%)"
                let resultError=res.responseJSON.error
                let status = res.status
                let result = new Result(resultError,inputUrl,status,textColor)
                result.pushToArray()
                // let showResults = new ShowResults()
                showResult()
                },
            success:function(res){
                btnShorten.prop("value","Shorten It!")
                let textColor = "hsl(180, 66%, 49%)"
                let sLink = "https://" + res.result.short_link
                let status = 200
                let result=new Result(inputUrl,sLink,status,textColor)
                result.pushToArray()
                // let showResults = new ShowResults()
                showResult()
                }
            })
        }
    }
)
// Limit to 3 results shown on the screen
Result.prototype.pushToArray = function(){
    results.push(this)
    if(results.length>3){
        results.shift()
    }
}

// Updata screen
function showResult(){
    shortenResults.html("")
    results.map(function(val,index){
        let result = new Result(val.inputUrl,val.shortLink,val.status,val.textColor)
        console.log(result)
        let resultShown=`
    <div class="result" data-id="${index}" data-status="${result.status}">
        <div class="original_link-${index}" style="color:${result.textColor}">${result.inputUrl}</div>
        <input class="short_link-${index} copyToClipboard" type="text" value="${result.shortLink}"/>
        <button class="btn" id="btn-${index}">Copy</button>
    </div>`
    var resultObj = $(resultShown)
    shortenResults.append(resultObj)

    // click the button to copy the shortLink
    resultObj.click(function(){
        let selectedId = resultObj.attr("data-id")
        let inputVal = $(this).children('input')
        inputVal.select()
        document.execCommand("copy")
    })
    })
}




// Scroll Reveal
ScrollReveal({duration:1000,dekay:300})
ScrollReveal().reveal('.features')
ScrollReveal().reveal('.card1',{delay:100})
ScrollReveal().reveal('.card2',{delay:200})
ScrollReveal().reveal('.card3')

ScrollReveal().reveal('.cards-linking-line-lg',{
    duration:1500
})
ScrollReveal().reveal('.cards-linking-line-sm',{
    duration:1500
})
ScrollReveal().reveal('.footer')

