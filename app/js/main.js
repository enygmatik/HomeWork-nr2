(function(){
    var app = {
        //APLICATION START
        initialize: function () {
            console.log('APP Init');

            this.bxSlider();
            this.setUpListener();

            //$('input, textarea').placeholder();

        },

        //LOAD SLIDER
        bxSlider: function () {
            console.log("Slider loaded");
            var sliderList = $('.slider__list');
            if(sliderList.length){
                sliderList.bxSlider();
            }
        },

        //EVENT KEEPER
        setUpListener: function() {
            $('form').on('keydown', '.has-error', app.removeError);
            $('form').on('submit', app.contactMe);
            $('.contactForm__button-reset').on('click', app.clearForm);
        },

        //SEND DATA FROM CONTACT FORM
        contactMe: function () {
            if(!app.validateForm()) return false;
            var data = $('form').serialize()

            $.ajax({
                type: 'POST',
                url: './mail.php',
                data: data
            }).done(function(){
                console.log("done");
                $('.contactForm___response').html("<div class='succes_message'>" + "Your message was sent" + "</div>");
                app.clearForm();
            }).fail(function(){
                console.log("fail");
                $('.contactForm___response').html("<div class='error_message'>" + "Your message can't sent" + "</div>");
            });
            return false;
        },

    //VALIDATE FORM ON CLIENT SIDE
        validateForm: function () {
            console.log('Check form');
            var elements = $('form').find('input, textarea'),
                valid = true;

            $.each(elements, function(index, val) {
                var element = $(val),
                    val = element.val();
                if(val.length === 0){
                    element.addClass('has-error');
                    valid = false;
                }
            }); //eachEND
            return valid; //Each RESULT
        },

        //CLEAR FORM
        clearForm: function() {
            console.log('Clear form');
            var form = $('form');
            form.find('.has-error').removeClass('has-error');
            form.find('input, textarea').val('');
        },

        //REMOVE ERROR INPUT STYLE ON TYPE
        removeError: function() {
            $(this).removeClass('has-error');
        }
    };

        app.initialize();
}());

