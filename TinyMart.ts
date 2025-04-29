// Enum types
enum GenreType {
    Blues, Classical, Country, Folk, Jazz, Metal, Pop, RnB, Rock
}

enum FilmRateType {
    NotRated, G, PG, PG_13, R, NC_17
}

// NameType - like a struct
type NameType = {
    firstName: string;
    lastName: string;
};

// Abstract Product class
abstract class Product {
    private static nextID = 1;
    protected productID: number;
    protected productName: string;
    protected price: number;
    protected reviewRate: number;

    constructor(productName: string, price: number) {
        this.productID = Product.createNewID();
        this.productName = productName.trim() === "" ? "!No Name Product!" : productName;
        this.price = (price > 0 && price < 1000) ? price : 1.0;
        this.reviewRate = 0.0;
    }

    static createNewID(): number {
        return this.nextID++;
    }

    getProdID(): number { return this.productID; }
    getProdName(): string { return this.productName; }
    getPrice(): number { return this.price; }
    getReviewRate(): number { return this.reviewRate; }

    setProdName(name: string): void { this.productName = name; }
    setPrice(price: number): void { if (price > 0 && price < 1000) this.price = price; }
    setReviewRate(rate: number): void { this.reviewRate = rate; }

    displayProdInfo(): void {
        console.log(`[${this.getProdTypeStr()}]`);
        console.log(`Product ID: ${this.productID}   Product Name: ${this.productName}`);
        console.log(`Price: $${this.price}    Product Review Rate: ${this.reviewRate}`);
        this.displayContentsInfo();
    }

    abstract getProdTypeStr(): string;
    abstract displayContentsInfo(): void;
}

// AudioProduct
class AudioProduct extends Product {
    private singer: NameType;
    private genre: GenreType;

    constructor(name: string = "", price: number = 1.0, singer: NameType = { firstName: "", lastName: "" }) {
        super(name, price);
        this.singer = singer;
        this.genre = GenreType.Pop;
    }

    getProdTypeStr(): string { return "Music"; }

    displayContentsInfo(): void {
        console.log(`Singer Name: ${this.singer.firstName} ${this.singer.lastName}`);
        console.log(`Genre: ${GenreType[this.genre]}`);
    }

    getSinger(): NameType { return this.singer; }
    getGenre(): GenreType { return this.genre; }
    setSinger(singer: NameType): void { this.singer = singer; }
    setGenre(genre: GenreType): void { this.genre = genre; }
}

// VideoProduct
class VideoProduct extends Product {
    private director: NameType;
    private filmRate: FilmRateType;
    private releaseYear: number;
    private runTime: number;

    constructor(name: string = "", price: number = 1.0, director: NameType = { firstName: "", lastName: "" }, releaseYear: number = 2000, runTime: number = 90) {
        super(name, price);
        this.director = director;
        this.releaseYear = releaseYear;
        this.runTime = runTime;
        this.filmRate = FilmRateType.NotRated;
    }

    getProdTypeStr(): string { return "Movie"; }

    displayContentsInfo(): void {
        console.log(`Release Year: ${this.releaseYear}`);
        console.log(`Film Rating: ${FilmRateType[this.filmRate]}`);
        console.log(`Runtime: ${this.runTime}`);
        console.log(`Director Name: ${this.director.firstName} ${this.director.lastName}`);
    }

    isNewRelease(year: number): boolean {
        return this.releaseYear >= year;
    }

    setDirector(d: NameType): void { this.director = d; }
    setFilmRate(rate: FilmRateType): void { this.filmRate = rate; }
    setReleaseYear(y: number): void { this.releaseYear = y; }
    setRunTime(rt: number): void { this.runTime = rt; }

    getDirector(): NameType { return this.director; }
    getFilmRate(): FilmRateType { return this.filmRate; }
    getReleaseYear(): number { return this.releaseYear; }
    getRunTime(): number { return this.runTime; }
}

// Abstract BookProduct
abstract class BookProduct extends Product {
    protected author: NameType;
    protected pages: number;

    constructor(name: string = "", price: number = 1.0, author: NameType = { firstName: "", lastName: "" }, pages: number = 0) {
        super(name, price);
        this.author = author;
        this.pages = pages;
    }

    displayContentsInfo(): void {
        console.log(`Author: ${this.author.firstName} ${this.author.lastName} Pages: ${this.pages}`);
    }

    getAuthor(): NameType { return this.author; }
    getPages(): number { return this.pages; }
    setAuthor(a: NameType): void { this.author = a; }
    setPages(p: number): void { this.pages = p; }
}

// EBook
class EBook extends BookProduct {
    getProdTypeStr(): string { return "E book"; }
}

// PaperBook
class PaperBook extends BookProduct {
    getProdTypeStr(): string { return "Paper book"; }
}

// Cart class
class Cart {
    private static MAX_ITEMS = 7;
    private itemNum: number = 0;
    private owner: NameType;
    private purchasedItems: Product[] = [];

    constructor(owner: NameType) {
        this.owner = owner;
    }

    isCartFull(): boolean {
        return this.itemNum >= Cart.MAX_ITEMS;
    }

    addItem(item: Product): boolean {
        if (this.isCartFull()) return false;
        this.purchasedItems.push(item);
        this.itemNum++;
        return true;
    }

    removeItem(productID: number): boolean {
        const index = this.purchasedItems.findIndex(item => item.getProdID() === productID);
        if (index >= 0) {
            this.purchasedItems.splice(index, 1);
            this.itemNum--;
            return true;
        }
        return false;
    }

    displayCart(): void {
        console.log(`My Cart\n======\n\nCart Owner: ${this.owner.firstName} ${this.owner.lastName}\n`);
        let total = 0;
        this.purchasedItems.forEach(item => {
            item.displayProdInfo();
            console.log();
            total += item.getPrice();
        });

        console.log("===== Summary of Purchase ======");
        console.log(`Total number of purchases: ${this.purchasedItems.length}`);
        console.log(`Total purchasing amount: $${total.toFixed(2)}`);
        console.log(`Average cost: $${(total / this.purchasedItems.length).toFixed(2)}`);
    }
}

// Main test function
function main() {
    const music1 = new AudioProduct("Yesterday", 16.5, { firstName: "Beetles", lastName: "" });
    music1.setGenre(GenreType.Pop);
    music1.setReviewRate(9.8);

    const music2 = new AudioProduct("Imagine", 15.0, { firstName: "John", lastName: "Lennon" });
    music2.setGenre(GenreType.Rock);
    music2.setReviewRate(9.2);

    const music3 = new AudioProduct("We are the World", 13.75, { firstName: "Michael", lastName: "Jackson" });
    music3.setGenre(GenreType.Country);
    music3.setReviewRate(9.1);

    const movie1 = new VideoProduct("Sound of Music", 22, { firstName: "Robert", lastName: "Wise" }, 1965, 175);
    movie1.setFilmRate(FilmRateType.G);
    movie1.setReviewRate(9.2);

    const movie2 = new VideoProduct("Star Wars", 22, { firstName: "George", lastName: "Lucas" }, 1977, 120);
    movie2.setFilmRate(FilmRateType.PG);
    movie2.setReviewRate(8.5);

    const ebook = new EBook("The old Man and the Sea", 8.3, { firstName: "Ernest", lastName: "Hemmingway" }, 127);
    ebook.setReviewRate(9.5);

    const paperbook = new PaperBook("To Kill a Mockingbird", 11.8, { firstName: "Harper", lastName: "Lee" }, 281);
    paperbook.setReviewRate(9.6);

    const extra = new AudioProduct("Thunderstruck", 17, { firstName: "AC", lastName: "DC" });
    extra.setGenre(GenreType.Metal);
    extra.setReviewRate(9.0);

    const cart = new Cart({ firstName: "John", lastName: "Smith" });
    cart.addItem(music1);
    cart.addItem(music2);
    cart.addItem(music3);
    cart.addItem(movie1);
    cart.addItem(movie2);
    cart.addItem(ebook);
    cart.addItem(paperbook);

    // Remove two items
    cart.removeItem(paperbook.getProdID());
    cart.removeItem(music2.getProdID());

    cart.displayCart();
}

main();
