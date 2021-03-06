//console.log(123);

//---------------------------------------------------------------------------------------------------
/*
Трудно понять где будут возможные изменения , особенно если система плохо спроектированна то ее трудно модифицировать.
    Метод Customer.statement много берет на себя обязанностей которые должны быть распределены на другие классы.
    И метод Customer.statement будет подвержен изменению:
    - пользователь захочет отчет в формате нового синтаксиса HTML
- изменятся правила оплаты
- изменится способ классификации фильмов и порядка начисления очков активным пользователям
Можно создать второй метод Customer.statementHTML, но тогда логика оплаты будет дублироваться и при ее изменении придется менять ее в двух местах!
Моя цель состоит в том, чтобы облегчить написание метода вывода отчета в HTML с минимальным дублированием кода.

Цель достигнута, новые способ форматирования можно добавить по аналогии с statement и htmlStatement так как логика расчетов
была вынесена в одно место.

Новая цель, возможные изменения с новыми категориями и соответственно их способы начисления бонусов и оплаты, за это отвечает блок switch.
Заменяем switch на полиморфизм.
Если уж без оператора switch не обойтись, то он должен основываться на ваших собственных, а не чужих данных.
Переместим логику расчетов в Movie теперь методы работают со своим типом,а Rental их только вызывает

Состояние фильиа реализованно в том какого типа он содержит свойство price от класса `abstract class Price`
Было использовано:
- Выделение метода
- Перемещение метода
- Замена условного оператора полиморфизмом

Преимущество в том, что если изменить поведение Price, добавить новые цены или дополнительное поведение,
зависящее от цены, то реализовать изменения будет значительно легче. Другим частям приложения ничего не
известно об использовании паттерна «Состояние».

*/
//---------------------------------------------------------------------------------------------------

export abstract class Price {
    abstract getPriceCode(): number;

    abstract getCharge(daysRented: number): number;

    // реализация по умолчанию
    getFrequentRenterPoints(daysRented: number): number{
        // добавить очки для активного арендатора
        // бонус за аренду новинки на два дня
        return  1;
    }
}

export class ChildrensPrice extends Price{
    getPriceCode(): number{
        return Movie.CHILDRENS
    }
    getCharge(daysRented: number): number{
        let result: number = 15;
        if(daysRented > 3){
            result += (daysRented - 3) * 15;
        }
        return  result;
    }

}
export class NewRealisePrice extends Price{
    getPriceCode(): number{
        return Movie.NEW_RELEASE
    }
    getCharge(daysRented: number): number{

        return  daysRented * 3;
    }
    // переопределение
    getFrequentRenterPoints(daysRented: number): number{
        // добавить очки для активного арендатора
        // бонус за аренду новинки на два дня
        return (daysRented > 1)?2:1;
    }
}
export class RegularPrice extends Price{
    getPriceCode(): number{
        return Movie.REGULAR
    }
    getCharge(daysRented: number): number{
        let result: number = 0;
        result += 2;
        if(daysRented > 2){
            result += (daysRented - 2) * 15;
        }
        return  result;
    }
}

export class Movie{
    private _title: string;
    private _price: Price;
    static readonly CHILDRENS: number = 2;
    static readonly REGULAR: number = 0;
    static readonly NEW_RELEASE: number = 1;

    // По идее priceCode должен быть перечислением класса
    constructor(title: string,priceCode: number){
        this._title = title;
        this.setPriceCode(priceCode);
    }
    get title(): string {
        return this._title;
    }

    setPriceCode(priceCode: number) {
        switch(priceCode){
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
                throw new Error("Incorrect Price Code")
        }
    }

    getCharge(daysRented: number): number{
        return this._price.getCharge(daysRented);
    }
    getFrequentRenterPoints(daysRented: number): number{
        return this._price.getFrequentRenterPoints(daysRented);
    }
}

// класс, представляющий данные о прокате фильма
export class Rental{
    private _movie: Movie;
    private _daysRented: number;

    constructor(movie: Movie,daysRented: number) {
        this._movie = movie;
        this._daysRented = daysRented;
    }
    get movie(): Movie {
        return this._movie;
    }
    get daysRented(): number {
        return this._daysRented;
    }
    getCharge(): number{
        return this.movie.getCharge(this.daysRented)
    }
    getFrequentRenterPoints(): number{
        return this.movie.getFrequentRenterPoints(this.daysRented)
    }
}

// класс, представляющий клиента магазина
export class Customer{
    private _name: string;
    private _rentals: Rental[];

    constructor(name: string) {
        this._name = name;
        this._rentals = [];
    }

    addRental(rental: Rental): void {
        this._rentals.push(rental);
    }
    get name(): string {
        return this._name;
    }

    statement(): string {
        let totalAmount: number = 0;
        let frequentRenterPoints: number = 0;
        let rentals: Rental[] = this._rentals;
        let result: string = "Учет аренды для " + this.name + "\n";

        rentals.forEach(function(rental: Rental) {

            let thisAmount:number = rental.getCharge();

            frequentRenterPoints+= rental.getFrequentRenterPoints();

            //показать результаты для этой аренды
            result += "\t" + rental.movie.title + "\t"  + thisAmount + "\n";
            totalAmount += thisAmount;
        },this);

        //добавить нижний колонтитул
        result += "Сумма задолженности составляет " + totalAmount + "\n";
        result += "Вы заработали " + frequentRenterPoints + " очкa(ов) за активность";
        return result
    }

    public htmlStatement(): string {
        let totalAmount: number = 0;
        let frequentRenterPoints: number = 0;
        let rentals: Rental[] = this._rentals;
        let result: string =  "<H1>0перации аренды для <ЕМ>"  + this.name + "</EM></H1><P>";

        rentals.forEach(function(rental: Rental) {

            let thisAmount: number = rental.getCharge();

            frequentRenterPoints+= rental.getFrequentRenterPoints();

            //показать результаты для этой аренды
            result += rental.movie.title + "<ЕМ>"  + thisAmount + "</EM><BR>";
            totalAmount += thisAmount;
        },this);
        //добавить нижний колонтитул
        result +=  "<Р>Сумма задолженности составляет <ЕМ>" + totalAmount +  "</EM></P>";
        result +=  "Вы заработали <ЕМ>" + frequentRenterPoints +  "</ЕМ> очкa(ов) за активность</Р>";
        return result;
    }
}

function main(): void{
    let movie = new Movie("Name film",Movie.REGULAR);
    let rental = new Rental(movie,2);

    let movie2 = new Movie("Name2 film",Movie.REGULAR);
    let rental2 = new Rental(movie2,1);

    let customer = new Customer("Jeka");
    customer.addRental(rental);
    customer.addRental(rental2);
    console.log(customer.statement());
}



//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------

















