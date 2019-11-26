// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $logInBtn = $("#logIn");
var $logInSubmitBtn = $("#logInSubmit");
var $signUpBtn = $("#signUp");
var $signUpSubmitBtn = $("#submitSignUp");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// handleLogIn is called when the login button is clicked.
// This prompts the user with a bootstrap modal for login information to send to the backend.
var handleLogIn = function(event) {
  event.preventDefault();
  let logInEmail = $('#logInEmail').val().trim();
  let logInPassword = $('#logInPassword').val().trim();

  
  $logInSubmitBtn.on("click", function() {
    
    let handShake = {
      email: logInemail,
      password: logInPassword
    };

  let modal = $('#modalSignUp').modal('hide');
  logInForm.reset();

  return $.ajax({
    type: "POST",
    url: "/login",
    data: handShake
  })

});

};

// handleSignUp is called when the signUp button is clicked.
// This prompts the user with a bootstrap modal for information for signing up to create a user in the database.
var handleSignUp = function(event) {
  event.preventDefault();

  $signUpSubmitBtn.on("click", function() {

    let firstName = $('#signUpFirstName').val().trim();
    let lastName = $('#signUpLastName').val().trim();
    let email = $('#signUpEmail').val().trim();
    let password = $('#signUpPassword').val().trim();

    let handShake = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: logInPassword
    };

     $.post("/register", handShake)

     let modal = $('#modalSignUp').modal('hide');
     signUpForm.reset();

  });

};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$logInBtn.on("click", handleLogIn);
$signUpBtn.on("click", handleSignUp);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

