$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Did you fill in the form properly?");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


function submitForm(){
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var msg_subject = $("#msg_subject").val();
    var message = $("#message").val();
    var apigClient = apigClientFactory.newClient();
    var params = {
        //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
        // param0: '',
        // param1: ''
    };
    var body = {
        //This is where you define the body of the request
        "verb": "logContactSubmission", 
        "name": $('#name').val(),
        "email": $('#email').val(),
        "subject": $('#msg_subject').val(),
        "message": $('#message').val()
};
    var additionalParams = {
        //If there are any unmodeled query parameters or headers that need to be sent with the request you can add them here
        headers: {
            // param0: '',
            // param1: ''
        },
        queryParams: {
            // param0: '',
            // param1: ''
        }
    };
    
    apigClient.psalteResumePost(params, body, additionalParams)
    .then(function(result){
        //success callback
        formSuccess();
    }).catch( function(result){
        //error callback
        formError();
        submitMSG(false,result);        
    });

}

function formSuccess(){
    $("#contactForm")[0].reset();
    submitMSG(true, "Message submitted. Thank you.")
}

function formError(){
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}