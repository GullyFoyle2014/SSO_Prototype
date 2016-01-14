$( document ).ready(function() {

  function sortByLastProvider(){
        //pass last-provider used value, will get this from a cookie or local storage (gigya object wont know this value until you're signed in otherwise)
        var lastProviderUsed = 'youtube';

        //Expand this: pass array of all providers previously used, and put them all at the top of the list with the last-provider-used as first position
        var lastProvidersUsed = ['twitter', 'youtube'];

        //grab all providers into array, find "lastProviderUsed" data and move those items to the top.
        var allProviders = $('.gigya-providers-list .gigya-provider');
        //console.log( allProviders );

        if( $( lastProviderUsed != '' && lastProviderUsed != null && lastProviderUsed != undefined )  ){
            //loop through allProviders, if any element matches the lastProviderUsed value, prepend it to the UL so it displays first.
            $( allProviders).each(function () {
                if( $(this).hasClass(lastProviderUsed) ){
                    //console.log( lastProviderUsed);
                    $(this).prependTo('.gigya-providers-list ul');
                }// end loop
            });
        }//end if lastproviderused var exists, is defined with a value
  }// end sortByLastProvider function


  function signInModulePresentation(){
      // Adds "overflow hide" classes to every Provider item after the 4th. Our target display is 4-providers showing.
      $('.gigya-providers-list .gigya-provider:gt(3)').addClass('overflow hide');

      //If the PROVIDER/PARTNER COUNT is less than/equal-to 4, hide More Options button.
      if( $('.gigya-providers-list .gigya-provider').length <= 4 ){
          $('.gigya-providers-list .more-options').hide();
      }// end if providers length is 4 or less, hide 'more options' button (not needed with 4 or less)

      //If the PROVIDER/PARTNER COUNT is less than/equal-to 2, reduce list and top-section min-heights
      if( $('.gigya-providers-list .gigya-provider').length <= 2 ){
          $('.gigya-providers-list').css('min-height','45px');// FIX NOTE - make these an added/removed class, dont put values in the JS
          $('.gigya-signin.top-section').css('min-height','85px');// FIX NOTE - make these an added/removed class, dont put values in the JS
      }// end if providers length is 2 or less - enable 2-up styles

      //If PROVIDER/PARTNER COUNT is 1, set to full width/centered
      if( $('.gigya-providers-list .gigya-provider').length == 1 ){
          $('.gigya-providers-list .gigya-provider').addClass('single-provider');
      }// end if provider length is one - enable "single provider" styles

      //MORE-OPTION button click events (show Overflow classed provider(s), toggle classes, change-text, add bottom-edge box-shadow)
      $('.gigya-providers-list .more-options a').on('click', function(e) {
          $('#signIn .gigya-provider.overflow').toggleClass('hide');
          $('#signIn .gigya-providers-list .more-options').toggleClass('bottomEdgeShadow');

          if ($(this).text() == "More Options"){
              $(this).text("Fewer Options")
          } else {
              $(this).text("More Options");
          }//end if/else text swap
          e.preventDefault();
      });//end click-function


      $('.gigya-show-password .gigya-input-checkbox').on('click', function(e){

          var pwordPasswordInput = $('<input type="password" data-gigya-placeholder="Password" name="password" class="gigya-input-password" tabindex="0" formnovalidate="formnovalidate" data-screenset-element-id="__gig_template_element_9_1448310712962" data-screenset-element-id-publish="false" data-screenset-roles="instance" data-gigya-name="password" data-original-value="" placeholder="Password *">');
          var passwordFieldValue = $('.gigya-input-password').val();
          var val = passwordFieldValue;
          //console.log(passwordFieldValue);

          var textPasswordInput = $('<input type="text" data-gigya-placeholder="Password" name="password" class="gigya-input-password" tabindex="0" formnovalidate="formnovalidate" data-screenset-element-id="__gig_template_element_9_1448310712962" data-screenset-element-id-publish="false" data-screenset-roles="instance" data-gigya-name="password" data-original-value="" placeholder="Password *">');

          if( $('.gigya-show-password .gigya-input-checkbox').is(":checked")  ) {
                  $( '.gigya-input-password' ).replaceWith( textPasswordInput);
                  $('.gigya-show-password .gigya-input-checkbox').prop('checked',true);
            } else {
                  $( '.gigya-input-password' ).replaceWith( pwordPasswordInput);
                  $('.gigya-show-password .gigya-input-checkbox').prop('checked',false);
            }// end if/else checkbox is checked
            $('.gigya-input-password').val(val);

      });// end checkbox click function



  }//end signInModulePresentation function


  //Temp *****DO NOT INTEGRATE WITH FINAL CODE***** error message display for Prototype demos -
  function showErrorMessages(){

      $('.gigya-input-submit.btn').on('click', function(e) {
          var a = document.forms['gigyaSignInForm']['username'].value;
          var b = document.forms['gigyaSignInForm']['password'].value;
          if ((a==null || a=="") || (b==null || b=="")) {
              $('#signIn .gigya-composite-control-textbox .gigya-error-msg').css('display','block');
              $('#signIn .gigya-composite-control-password .gigya-error-msg').css('display','block');
          }// end if fields are empty or null, set error to display
          return false;
       });//end show-errors click-function

  }// end showErrorMessages function

  //MAIN FUNCTIONS EXECUTION
  // If gigya-providers-list exists, otherwise dont execute the functions below
  if( $('.gigya-providers-list').length ){

      // Fire this off as soon as Dom-ready, and if providers-list has length/exists
      sortByLastProvider();
      signInModulePresentation();
      showErrorMessages();

  }//end if-provider-list length/exists

});//end document-ready