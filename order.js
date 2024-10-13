function calculatePrice() {
    const drinkElement = document.getElementById('drink');
    const selectedDrink = drinkElement.value;
    const sizeElements = document.querySelectorAll('input[name="size"]');
    let selectedSize;
    for (const sizeElement of sizeElements) {
        if (sizeElement.checked) {
            selectedSize = sizeElement.value;
            break;
        }
    }
    
    let price = 0;

    if (!selectedDrink) {
        alert("Please select a drink.");
        sizeElements.forEach(el => el.checked = false);
        return;
    }

    switch (selectedDrink) {
        case 'bubble-milktea':
            price = 25;
            break;
        case 'iced-latte':
            price = 30;
            break;
        case 'americano':
            price = 20;
            break;
    }

    if (selectedSize) {
        switch (selectedSize) {
            case 'small':
                price += 0;
                break;
            case 'medium':
                price += 5;
                break;
            case 'large':
                price += 10;
                break;
        }
    }

    const priceElement = document.getElementById('price');
    priceElement.textContent = price;
}
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const drink = document.getElementById('drink').value;
    const sizeElements = document.querySelectorAll('input[name="size"]');
    const iceElements = document.querySelectorAll('input[name="ice"]');
    const sweetnessElements = document.querySelectorAll('input[name="sweetness"]');

    if (!name) {
        alert("Please enter your name.");
        return false;
    }

    if (!drink) {
        alert("Please select a drink first.");
        return false;
    }

    let sizeSelected = false;
    sizeElements.forEach(el => {
        if (el.checked) sizeSelected = true;
    });
    if (!sizeSelected) {
        alert("Please select a size.");
        return false;
    }

    let iceSelected = false;
    iceElements.forEach(el => {
        if (el.checked) iceSelected = true;
    });
    if (!iceSelected) {
        alert("Please select an ice preference.");
        return false;
    }

    let sweetnessSelected = false;
    sweetnessElements.forEach(el => {
        if (el.checked) sweetnessSelected = true;
    });
    if (!sweetnessSelected) {
        alert("Please select a sweetness level.");
        return false;
    }

    return true;
}


function placeOrder(event) {
    event.preventDefault();

    if (!validateForm()) return;

    const name = document.getElementById('name').value.trim();
    const drink = document.getElementById('drink').value;
    const size = document.querySelector('input[name="size"]:checked').value;
    const ice = document.querySelector('input[name="ice"]:checked').value;
    const sweetness = document.querySelector('input[name="sweetness"]:checked').value;

    const orderData = [name, drink, size, ice, sweetness];
    localStorage.setItem("orders", JSON.stringify(orderData));


    $(document).ready(function() {
        $('.message').html('<div class="alert alert-success" role="alert">Order placed successfully! Thank you for your order.</div>');
        $('.message').removeClass('d-none');
        $('.message >div').fadeIn(500).delay(3000).fadeOut(500, function(){
            $(this).remove();
            $('#orderform')[0].reset();
            $('#price').text("0");
        });
        });

}

$(document).ready(function() {
    $('#name').on('blur', function() {
        if ($(this).val().trim() === '') {
            $(this).addClass('error').removeClass('error-free');
        } else {
            $(this).addClass('error-free').removeClass('error');
        }
    });
});

$(document).ready(function() {
    $("#drink").on('change', function() {
        var selected=$(this).val().trim();
        if (selected === 'default') {
            $(this).addClass("error").removeClass("error-free");
        } else {
            $(this).addClass("error-free").removeClass("error");
        }
    });
});

$(document).ready(function() {
    $('#drink').on('change', function() {
        const selectedDrink = $(this).val();
        const imagePreview = $('#imagePreview');
        const drinkImage = $('#drinkImage');

        if (selectedDrink === 'default') {
            imagePreview.addClass('d-none');
            drinkImage.attr('src', '').attr('alt', '');
        } else {
            imagePreview.removeClass('d-none');
            const imagePath = `assets/${selectedDrink}.jpg`;
            drinkImage.attr('src', imagePath).attr('alt', selectedDrink);
        }
    });
});
$(document).ready(function() {
    $('#placeOrder').on('click', function() {
        const messageContent = '<div class="alert alert-success">Order placed successfully! Thank you for your order.</div>';
        const orderMessage = $('.message');

        orderMessage.html(messageContent);
        const alertDiv = orderMessage.children('div');

        alertDiv.fadeIn(500).delay(3000).fadeOut(500, function() {
            $(this).remove();
            $('#orderForm')[0].reset();
            $('#price').text('Price: $0');
        });

        orderMessage.removeClass('d-none');
    });
});
