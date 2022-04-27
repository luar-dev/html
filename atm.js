class bill{
    constructor(v, a) {
        this.value = v;
        this.amount = a;
        this.image = new Image();
        this.image.src = billsImages[this.value];
    }

    printBills() {
        res.appendChild(this.image); //needs object
        res.innerHTML += " "; // needs string
    }
}

function deliverMoney() {
    var t = document.getElementById("money");
    var transactionAmount = parseInt(t.value);

    var div = 0;
    var papers = 0;

    for (var bi of billsAvailable) {
        if (transactionAmount > 0) {
            div = Math.floor(transactionAmount / bi.value);
            if (div > bi.amount) {
                papers = bi.amount;
            } else {
                papers = div;
            }
            if (papers) { // only add to withdrawn bills when needed
                billsWithdrawalLayout.push(new bill(bi.value, papers));
                transactionAmount -= bi.value * papers;
            }
        }
    }

    //show bills
    if (!transactionAmount) { // if no money left to calculate, it means requested amount is possible with available bills
        for (var e of billsWithdrawalLayout) {
            var i = 0;
            while (i++ < e.amount) {
                e.printBills();
            }
        }
    } else {
        res.innerHTML += "Can not delivery that amount with existing denominations."; // needs string

    }
}

var billsWithdrawalLayout = [];

var billsImages = [];
billsImages["1000"] = "1000.jpg";
billsImages["500"] = "500.jpg";
billsImages["200"] = "200.jpg";
billsImages["100"] = "100.jpg";
billsImages["50"] = "50.jpg";
billsImages["20"] = "20.jpg";

var billsAvailable = []; // Mexican bills available
billsAvailable.push(new bill(1000, 5));
billsAvailable.push(new bill(500, 5));
billsAvailable.push(new bill(200, 8));
billsAvailable.push(new bill(100, 6));
billsAvailable.push(new bill(50, 5));
billsAvailable.push(new bill(20, 2));

var res = document.getElementById("resultado");
var b = document.getElementById("withdraw");
b.addEventListener("click", deliverMoney);