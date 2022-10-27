let productInCarts = null;
$("#Namesrc").keyup(function () {
    let srcVal = $(this).val().toLowerCase();
    $("tbody tr").filter(function () {
        let name = $($(this).children()[1]).text();
        $(this).toggle(name.toLowerCase().indexOf(srcVal) > -1)
    })
})
function productObj(id, itemName, price, amount) {
    this.id = id;
    this.itemName = itemName;
    this.price = price;
    this.amount = amount;
    this.totalPrice = price * amount;
    this.CalTax = function () {
        let tax = 0;
        (this.totalPrice < 20) ? tax = 5 : null;
        (this.totalPrice > 20 && this.totalPrice < 40) ? tax = 8 : null;
        (this.totalPrice > 40 && this.totalPrice < 100) ? tax = 12 : null;
        (this.totalPrice > 100) ? tax = 18 : null;
        return this.totalPrice += this.totalPrice * (tax / 100);
    };
    this.CalDiscount = function (DiscountVal) {
        this.totalPrice -= this.totalPrice * (DiscountVal / 100);
        return this.CalTax();
    }
}

$.getJSON('./data/products.json', function (productsCollection) {
    products = productsCollection;
    $.each(products, function (idx, product) {
        let tr = $("<tr></tr>");
        $.each(product, function (property, val) {
            let td = $("<td></td>");
            td.text(val);
            tr.append(td);
        });
        // Cart header
        let div = $("<div></div>");
        div.css({
            "display": "flex",
            "justify-content": "space-between",
            "border-bottom": "1px solid black",
            "padding": "5px"
        });

        let divItemDetail = $("<div></div>");
        divItemDetail.css({
            "width": "70%",
            "display": "flex",
            "justify-content": "space-between",
        });

        tr.click(function () {
            let div = $("<div></div>");
            div.css({
                "display": "flex",
                "justify-content": "space-between",
                "border-bottom": "1px solid black",
                "padding": "5px"
            });

            let divItemDetail = $("<div></div>");
            divItemDetail.css({
                "width": "70%",
                "display": "flex",
                "justify-content": "space-between",
            });
            $(this).children().each(function (idx, elem) {
                var divItem = $("<div></div>");
                if (idx == 1) {
                    divItem.css({
                        "width": "70%",
                        "display": "flex",
                        "justify-content": "left",
                    })
                } else {
                    divItem.css({
                        "width": "15%",
                        "display": "flex",
                        "justify-content": "left",
                    })
                }

                var pItem = $("<p></p>");
                pItem.css({
                    "width": "100%",
                    "margin": "0",
                    "text-align": "left",
                });
                pItem.text($(elem).text());
                divItem.append(pItem);
                divItemDetail.append(divItem);
            })
            div = div.append(divItemDetail);

            divOptions = $("<div></div>");
            divOptions.css({
                "display": "flex",
                "justify-content": "space-between",
            });
            divElement = $("<div></div>");
            let input = $("<input type='number' min='0' max='100' value='1' />");
            divElement.append(input);
            divOptions.append(divElement);
            divElement = $("<div></div>");
            let removeBtn = $("<button>Remove</button>");
            divElement.append(removeBtn);
            divOptions.append(divElement);
            div.append(divOptions);
            $('#shopcr').append(div);
        })
        $("tbody").append(tr);
    })
})
