"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Movie {
    constructor(title, priceCode) {
        this._title = title;
        this._priceCode = priceCode;
    }
    get title() {
        return this._title;
    }
    get priceCode() {
        return this._priceCode;
    }
    set priceCode(priceCode) {
        this._priceCode = priceCode;
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
        let result = 0;
        switch (this.movie.priceCode) {
            case Movie.REGULAR:
                result += 2;
                if (this.daysRented > 2) {
                    result += (this.daysRented - 2) * 15;
                }
                break;
            case Movie.NEW_RELEASE:
                result += this.daysRented * 3;
                break;
            case Movie.CHILDRENS:
                result += 15;
                if (this.daysRented > 3) {
                    result += (this.daysRented - 3) * 15;
                }
                break;
        }
        return result;
    }
    getFrequentRenterPoints() {
        if ((this.movie.priceCode == Movie.NEW_RELEASE) && this.daysRented > 1) {
            return 2;
        }
        else {
            return 1;
        }
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
