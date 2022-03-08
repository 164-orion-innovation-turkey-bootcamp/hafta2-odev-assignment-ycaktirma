/* Note: use 'tsc main.ts --target es6' to compile this code. */
//Both of the burgers will include the materials
class BaseBurgerMaker {
    finalizeBurger(materials) {
        return new Promise((resolve) => {
            setTimeout(() => {
                materials.forEach(material => {
                    console.log(`${material} hamburgerinize eklendi`);
                });
                console.log("Hamburgeriniz hazır.");
                resolve();
            });
        });
    }
}
class MeatBurgerMaker extends BaseBurgerMaker {
    //Prepare meat burger
    prepareBurger(cookTime) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Köfteniz ${cookTime} ms pişti`);
                resolve();
            }, cookTime);
        });
    }
    ;
}
class ChickenBurgerMaker extends BaseBurgerMaker {
    //Prepare chicken burger
    prepareBurger() {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("Tavuğunuz pişti");
                resolve();
            }, 3000);
        });
    }
}
class OrderManager {
    constructor(stockService) {
        this.stockService = stockService;
    }
    //Take order and check stocks
    takeOrder(order) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                //Check stocks Step 2
                this.stockService.checkStocksByOrder(order).then(success => {
                    console.log("Siparişiniz alındı.");
                    resolve(success);
                }).catch(error => {
                    reject(error);
                });
            }, 1000);
        });
    }
    //Serve Step 7
    serveOrder() {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Buyrun, siparişiniz.');
                resolve();
            }, 1000);
        });
    }
    //Steps 3, 3.1, 3.2
    prepareOrder(order) {
        //Step 3
        this.checkBurgerType(order).then(mainElement => {
            let burgerMaker = (mainElement == 'Köfte') ? new MeatBurgerMaker() : new ChickenBurgerMaker;
            //Step 3.1
            burgerMaker.prepareBurger(order.cookTime).then(success => {
                console.log("Burgeriniz pişti");
                //Step 3.2
                burgerMaker.finalizeBurger(order.materials).then(success => {
                    console.log("Hamburger yapımı tamamlandı.");
                });
            });
        });
    }
    //Check order if its meat or chicken and return it.
    checkBurgerType(order) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("Siparişin et mi yoksa tavuk mu olduğu kontrol ediliyor...");
                resolve(order.main);
            }, 1000);
        });
    }
}
class StockService {
    //Check all the stocks given in order. Terminate the process if one of the materials is missing.
    checkStocksByOrder(order) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                //Check base material
                ingredients.base.forEach(baseElement => {
                    if (baseElement.name == order.base && baseElement.stock == 0) {
                        reject(`${order.base} bulunamadı sipariş iptal ediliyor...`);
                    }
                });
                //Check main material
                ingredients.main.forEach(mainElement => {
                    if (mainElement.name == order.main && mainElement.stock == 0) {
                        reject(`${order.main} bulunamadı sipariş iptal ediliyor...`);
                    }
                });
                //Check other materials
                ingredients.materials.forEach(materialElement => {
                    order.materials.forEach(material => {
                        if (materialElement.name == material && materialElement.stock == 0) {
                            reject(`${material} bulunamadı sipariş iptal ediliyor...`);
                        }
                    });
                });
                //Check extras
                ingredients.extras.forEach(extrasElement => {
                    if (extrasElement.stock == 0) {
                        reject(`${extrasElement.name} bulunamadı sipariş iptal ediliyor...`);
                    }
                });
                //If we have everything, resolve the promise
                resolve("Stoklar tam");
            }, 3000);
        });
    }
}
class ExtrasManager {
    fryPotatoes() {
        return new Promise((resolve) => {
            setTimeout(() => {
                //Fries will be ready in 5 sec
                console.log("Patatesler hazır");
                resolve();
            }, 5000);
        });
    }
    getDrinks() {
        return new Promise((resolve) => {
            setTimeout(() => {
                //Drinks will be ready in 2 sec
                console.log("İçeçeğiniz hazır");
                resolve();
            }, 2000);
        });
    }
}
class PlateManager {
    makeAGoodLookingPlate() {
        //Make the plate ready after adding sauces.
        return new Promise(resolve => {
            setTimeout(() => {
                this.includeSauces().then(success => {
                    console.log('Tabak hazırlandı.');
                    resolve();
                });
            }, 1000);
        });
    }
    includeSauces() {
        return new Promise((resolve) => {
            console.log("Sos tabağa konuldu.");
            resolve();
        });
    }
}
const ingredients = {
    base: [
        { name: 'Ekmek', stock: 5 },
    ],
    main: [
        { name: 'Köfte', stock: 5 },
        { name: 'Tavuk', stock: 5 },
    ],
    materials: [
        { name: 'Domates', stock: 5 },
        { name: 'Marul', stock: 5 },
        { name: 'Turşu', stock: 5 },
        { name: 'Soğan', stock: 5 },
    ],
    extras: [
        { name: 'Patates', stock: 5 },
        { name: 'Cola', stock: 5 }
    ],
    sauces: [
        { name: 'Paket Sos', stock: 5 },
    ]
};
function main() {
    //Create a new order
    let order1 = {
        base: 'Ekmek',
        main: 'Tavuk',
        materials: ['Marul', 'Soğan', 'Turşu'],
        cookTime: 3000,
        sauces: ['Paket Sos']
    };
    //Create an order manager instance and supply stockservice.
    let orderManager = new OrderManager(new StockService());
    //Take order - Step 1
    orderManager.takeOrder(order1).then(success => {
        console.log(success);
        let extrasManager = new ExtrasManager();
        let plateManager = new PlateManager();
        //Prepare order, fry potatoes and get drinks at the same time.Step 3-4-5
        Promise.all([
            orderManager.prepareOrder(order1),
            extrasManager.fryPotatoes(),
            extrasManager.getDrinks()
        ]).then(success => {
            //When all promises above are resolved, prepare the plate and serve it.
            plateManager.makeAGoodLookingPlate().then(resolve => {
                orderManager.serveOrder().then();
            });
        });
    }).catch(error => {
        //Stock Error
        console.log(error);
    });
}
main();
