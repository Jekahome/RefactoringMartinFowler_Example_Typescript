"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Price {
    getFrequentRenterPoints(daysRented) {
        return 1;
    }
}
exports.Price = Price;
class ChildrensPrice extends Price {
    getPriceCode() {
        return Movie.CHILDRENS;
    }
    getCharge(daysRented) {
        let result = 15;
        if (daysRented > 3) {
            result += (daysRented - 3) * 15;
        }
        return result;
    }
}
exports.ChildrensPrice = ChildrensPrice;
class NewRealisePrice extends Price {
    getPriceCode() {
        return Movie.NEW_RELEASE;
    }
    getCharge(daysRented) {
        return daysRented * 3;
    }
    getFrequentRenterPoints(daysRented) {
        return (daysRented > 1) ? 2 : 1;
    }
}
exports.NewRealisePrice = NewRealisePrice;
class RegularPrice extends Price {
    getPriceCode() {
        return Movie.REGULAR;
    }
    getCharge(daysRented) {
        let result = 0;
        result += 2;
        if (daysRented > 2) {
            result += (daysRented - 2) * 15;
        }
        return result;
    }
}
exports.RegularPrice = RegularPrice;
class Movie {
    constructor(title, priceCode) {
        this._title = title;
        this.setPriceCode(priceCode);
    }
    get title() {
        return this._title;
    }
    setPriceCode(priceCode) {
        switch (priceCode) {
            case Movie.REGULAR:
                this._price = new RegularPrice();
                break;
            case Movie.CHILDRENS:
                this._price = new ChildrensPrice();
                break;
            case Movie.NEW_RELEASE:
                this._price = new NewRealisePrice();
                break;
            default:
                throw new Error("Incorrect Price Code");
        }
    }
    getCharge(daysRented) {
        return this._price.getCharge(daysRented);
    }
    getFrequentRenterPoints(daysRented) {
        return this._price.getFrequentRenterPoints(daysRented);
    }
}
exports.Movie = Movie;
Movie.CHILDRENS = 2;
Movie.REGULAR = 0;
Movie.NEW_RELEASE = 1;
class Rental {
    constructor(movie, daysRented) {
        this._movie = movie;
        this._daysRented = daysRented;
    }
    get movie() {
        return this._movie;
    }
    get daysRented() {
        return this._daysRented;
    }
    getCharge() {
        return this.movie.getCharge(this.daysRented);
    }
    getFrequentRenterPoints() {
        return this.movie.getFrequentRenterPoints(this.daysRented);
    }
}
exports.Rental = Rental;
class Customer {
    constructor(name) {
        this._name = name;
        this._rentals = [];
    }
    addRental(rental) {
        this._rentals.push(rental);
    }
    get name() {
        return this._name;
    }
    statement() {
        let totalAmount = 0;
        let frequentRenterPoints = 0;
        let rentals = this._rentals;
        let result = "Учет аренды для " + this.name + "\n";
        rentals.forEach(function (rental) {
            let thisAmount = rental.getCharge();
            frequentRenterPoints += rental.getFrequentRenterPoints();
            result += "\t" + rental.movie.title + "\t" + thisAmount + "\n";
            totalAmount += thisAmount;
        }, this);
        result += "Сумма задолженности составляет " + totalAmount + "\n";
        result += "Вы заработали " + frequentRenterPoints + " очкa(ов) за активность";
        return result;
    }
    htmlStatement() {
        let totalAmount = 0;
        let frequentRenterPoints = 0;
        let rentals = this._rentals;
        let result = "<H1>0перации аренды для <ЕМ>" + this.name + "</EM></H1><P>";
        rentals.forEach(function (rental) {
            let thisAmount = rental.getCharge();
            frequentRenterPoints += rental.getFrequentRenterPoints();
            result += rental.movie.title + "<ЕМ>" + thisAmount + "</EM><BR>";
            totalAmount += thisAmount;
        }, this);
        result += "<Р>Сумма задолженности составляет <ЕМ>" + totalAmount + "</EM></P>";
        result += "Вы заработали <ЕМ>" + frequentRenterPoints + "</ЕМ> очкa(ов) за активность</Р>";
        return result;
    }
}
exports.Customer = Customer;
function main() {
    let movie = new Movie("Name film", Movie.REGULAR);
    let rental = new Rental(movie, 2);
    let movie2 = new Movie("Name2 film", Movie.REGULAR);
    let rental2 = new Rental(movie2, 1);
    let customer = new Customer("Jeka");
    customer.addRental(rental);
    customer.addRental(rental2);
    console.log(customer.statement());
}
