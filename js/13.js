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
            let thisAmount = 0;
            switch (rental.movie.priceCode) {
                case Movie.REGULAR:
                    thisAmount += 2;
                    if (rental.daysRented > 2) {
                        thisAmount += (rental.daysRented - 2) * 15;
                    }
                    break;
                case Movie.NEW_RELEASE:
                    thisAmount += rental.daysRented * 3;
                    break;
                case Movie.CHILDRENS:
                    thisAmount += 15;
                    if (rental.daysRented > 3) {
                        thisAmount += (rental.daysRented - 3) * 15;
                    }
                    break;
            }
            frequentRenterPoints++;
            if ((rental.movie.priceCode == Movie.NEW_RELEASE) && rental.daysRented > 1) {
                frequentRenterPoints++;
            }
            result += "\t" + rental.movie.title + "\t" + thisAmount + "\n";
            totalAmount += thisAmount;
        }, this);
        result += "Сумма задолженности составляет " + totalAmount + "\n";
        result += "Вы заработали " + frequentRenterPoints + " очкa(ов) за активность";
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
