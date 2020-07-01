var ratedIndex = -1;


function setStars(max) {
    for (var i = 0; i <= max; i++) {
        $(".rps  i:eq(" + i + ")").css("color", "#f7bf17");
    }
}

function resetColors() {
    $(".rps  i").css("color", "#e2e2e2");
}


$(document).ready(function () {


    resetColors();

    if (localStorage.getItem("rating") != null) {
        setStars(parseInt(localStorage.getItem("rating")));
        $(".starRateV").val(parseInt(localStorage.getItem("rating")));
    }

    $(".rps  i").on("click", function () {
        ratedIndex = parseInt($(this).data("index"));
        localStorage.setItem("rating", ratedIndex);
        $(".starRateV").val(parseInt(localStorage.getItem("rating")));
    })

    $(".rps  i").mouseover(function () {
        resetColors();

        var currentIndex = parseInt($(this).data("index"));
        setStars(currentIndex);
    })

    $(".rps  i").mouseleave(function () {
        resetColors();
        if (ratedIndex != -1) {
            setStars(ratedIndex);
        }
    })

    $(".rpc i, .review-bg").click(function () {
        $(".review-modal").fadeOut();
    })
    $(".opmd").click(function () {
        $(".review-modal").fadeIn();
    })


    $(".rpbtn").on("click", function () {

        if ($("#rate-field").val() == '') {
            $(".rate-error").html("Please Fill In The Text Box!");
        } 
        
        else if (localStorage.getItem("rating") == null) {
            $(".rate-error").html("Please Select A Star To Rate!");
        } 
        
        else if ($(".raterName").val() == '') {
            $(".rate-error").html("Please Enter Your Name!");
        }
        else {

            $(".rate-error").html("");

            var $form = $(this).closest(".rmp");
            var starRate = $form.find(".starRateV").val();
            var rateMsg = $form.find(".rateMsg").val();
            var date = $form.find(".rateDate").val();
            var name = $form.find(".raterName").val();

            $.ajax({
                url: "rate.php",
                type: "POST",
                data: {
                    starRate: starRate,
                    rateMsg: rateMsg,
                    date: date,
                    name: name
                },
                success: function (d) {
                    $(".review-modal").fadeOut();
                    window.location.reload();
                }
            });
           
        }
    })
  
})
