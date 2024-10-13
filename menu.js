
$(document).ready(function () {
    $.get("assets/drink-menu-samples.json", function (data) {
        console.log(data);
        const drinks = data;
        const drinkMenu = $('#drink-menu');
        drinks.forEach(drink => {
            const card = `
                <div class="col-md-6 mb-4">
                    <div class="card">
                        <img src="${drink.image}" class="card-img-top" alt="${drink.image}">
                        <div class="card-body">
                            <h5 class="card-title">${drink.name}</h5>
                            <p class="card-text btn btn-danger">${drink.type}</p>
                            <p class="card-text">Price: ${drink.price}</p>
                        </div>
                    </div>
                </div>
            `;
            drinkMenu.append(card);
        });
    }).fail(function (error) {
        console.error("Error fetching data:", error);
        const drinkMenu = $('#drink-menu');
        drinkMenu.html(`
                    <div class="alert alert-danger" role="alert">
                        Error:${error.statusText||"Unknown error occurred"}. Please try again later.
                    </div>
                `);
    });
   });


        
