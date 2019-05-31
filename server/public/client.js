$(document).ready(readyNow);

function readyNow() {
    displayShoes();
    $('#shoe-list').on('click', '.update-button', update);
}

function displayShoes () {
    $.ajax ({
        method: 'GET',
        url: '/shoes'
    }).then((response) => {
        $('#shoe-list').empty();
        for(shoe of response){
            $('#shoe-list').append(`
            <tr>
                <td>${shoe.name}</td>
                <td><input type="text" class="cost-input" value="${shoe.cost}"/></td>
                <td><button class="update-button" data-id="${shoe.id}"
                >Update Price</button></td>
            </tr>
            `);
        }
    });
}

function update () {
    const shoeID = ($(this).data().id);

    const newPrice = $(this).parent().prev().children('input').val();
    console.log(newPrice);
// url: `/shoes/${shoeID}`
    $.ajax({
        method: 'PUT',
        url: '/shoes',
        data: {theShoeID: shoeID, theNewPrice: newPrice}
    }).then(function (response) {
        displayShoes();
    });
}