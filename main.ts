/* Note: use 'tsc main.ts --target es6' to compile this code. */

/* Burgers */
interface IMeatBurgerMaker{
    prepareBurger(cookTime:number):Promise<void>;
}
interface IChickenBurgerMaker{
    prepareBurger():Promise<void>;    
}
//Both of the burgers will include the materials
class BaseBurgerMaker{
    finalizeBurger(materials:string[]):Promise<void>{
        return new Promise((resolve) => {
            setTimeout(()=>{
                materials.forEach(material => {
                    console.log(`${material} hamburgerinize eklendi`);
                });
                console.log("Hamburgeriniz hazır.");
                resolve();
            });
        });
    }
}
class MeatBurgerMaker extends BaseBurgerMaker implements IMeatBurgerMaker{
    //Prepare meat burger
    prepareBurger(cookTime:number):Promise<void>{
        return new Promise((resolve) => {
            setTimeout(()=>{
                console.log(`Köfteniz ${cookTime} ms pişti`);
                resolve();
            },cookTime);
        });
    };
}
class ChickenBurgerMaker extends BaseBurgerMaker implements IChickenBurgerMaker{
    //Prepare chicken burger
    prepareBurger():Promise<void>{
        return new Promise((resolve) => {
            setTimeout(()=>{
                console.log("Tavuğunuz pişti");
                resolve();
            },3000);
        });
    }
} 
/* Burgers end*/


/* Orders */
interface IOrderManager{
    takeOrder(order:Order):Promise<string>;
    serveOrder():Promise<void>;
    checkBurgerType(order:Order):Promise<string>;
    prepareOrder(order:Order):void
}
class OrderManager implements IOrderManager{

    //We need to inject the stock service in order to check stocks.
    stockService;    
    constructor(stockService:StockService){
        this.stockService = stockService;
    }
    //Take order and check stocks
    takeOrder(order: Order):Promise<string> {

        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                //Check stocks Step 2
                this.stockService.checkStocksByOrder(order).then(success=>{
                    console.log("Siparişiniz alındı.");
                    resolve(success);
                }).catch(error=>{
                    reject(error);
                });
            },1000);
        });
    }

    //Serve Step 7
    serveOrder(): Promise<void> {
        return new Promise((resolve)=>{
            setTimeout(()=>{
                console.log('Buyrun, siparişiniz.');
                resolve();
            },1000)
        });
    }
    //Steps 3, 3.1, 3.2
    prepareOrder(order:Order){
        //Step 3
        this.checkBurgerType(order).then(mainElement=>{
            let burgerMaker = (mainElement=='Köfte')? new MeatBurgerMaker() : new ChickenBurgerMaker;
            //Step 3.1
            burgerMaker.prepareBurger(order.cookTime).then(success=>{
                console.log("Burgeriniz pişti");
                //Step 3.2
                burgerMaker.finalizeBurger(order.materials).then(success=>{
                    console.log("Hamburger yapımı tamamlandı.");
                });
            });
        })
    }
    //Check order if its meat or chicken and return it.
    checkBurgerType(order:Order):Promise<string>{
        return new Promise((resolve)=>{
            setTimeout(()=>{
                console.log("Siparişin et mi yoksa tavuk mu olduğu kontrol ediliyor...");
                resolve(order.main);
            },1000);
        });
    }
    
}
class StockService{
    //Check all the stocks given in order. Terminate the process if one of the materials is missing.
    checkStocksByOrder(order:Order){
        return new Promise<string> ( (resolve, reject)=>{
            setTimeout(()=>{
                //Check base material
                ingredients.base.forEach(baseElement=>{
                    if(baseElement.name == order.base && baseElement.stock == 0){
                        reject(`${order.base} bulunamadı sipariş iptal ediliyor...`);
                    }
                })
                //Check main material
                ingredients.main.forEach(mainElement=>{
                    if(mainElement.name == order.main && mainElement.stock == 0){
                        reject(`${order.main} bulunamadı sipariş iptal ediliyor...`);
                    }
                })
                //Check other materials
                ingredients.materials.forEach(materialElement=>{
                    order.materials.forEach(material=>{
                        if(materialElement.name == material && materialElement.stock == 0){
                            reject(`${material} bulunamadı sipariş iptal ediliyor...`);
                        }
                    })

                })
                //Check extras
                ingredients.extras.forEach(extrasElement=>{
                    if(extrasElement.stock == 0){
                        reject(`${extrasElement.name} bulunamadı sipariş iptal ediliyor...`);
                    }

                })
                //If we have everything, resolve the promise
                resolve("Stoklar tam");
            },3000)
        });
    }
}
/* Orders end*/

/* Extras and plates*/
interface IExtrasManager{
    fryPotatoes():Promise<void>;
    getDrinks():Promise<void>;
}
class ExtrasManager implements IExtrasManager{
    fryPotatoes(): Promise<void> {
        return new Promise((resolve)=>{
            setTimeout(()=>{
                //Fries will be ready in 5 sec
                console.log("Patatesler hazır");
                resolve();
            },5000);
        })
    }
    getDrinks(): Promise<void> {
        return new Promise((resolve)=>{
            setTimeout(()=>{
                //Drinks will be ready in 2 sec
                console.log("İçeçeğiniz hazır");
                resolve();
            },2000);
        })
    }

}
interface IPlateManager{
    makeAGoodLookingPlate():Promise<void>;
    includeSauces(): Promise<void>
}
class PlateManager implements IPlateManager{
    makeAGoodLookingPlate(): Promise<void> {
        //Make the plate ready after adding sauces.
        return new Promise(resolve=>{
            setTimeout(()=>{
                this.includeSauces().then(success=>{
                    console.log('Tabak hazırlandı.');
                    resolve();
                });
            },1000);
        });

    }
    includeSauces(): Promise<void> {
        return new Promise((resolve)=>{
            console.log("Sos tabağa konuldu.");
            resolve();
        })
    }
}
/* Extras and plates end*/


//Orders will come with this props
interface Order{ 
    base:string,//Bread
    main:string,//Type of burger
    materials:string[],//Array of materials
    cookTime:number,//Optional cook time.
    sauces:string[]//Array of sauces
}

const ingredients = {
    base:[
        {name:'Ekmek', stock:5},
    ],
    main:[
        {name:'Köfte', stock:5},
        {name:'Tavuk', stock:5},
    ],
    materials:[
        {name:'Domates', stock:5},
        {name:'Marul', stock:5},
        {name:'Turşu', stock:5},
        {name:'Soğan', stock:5},
    ],
    extras:[
        {name:'Patates', stock:5},
        {name:'Cola', stock:5}
    ],
    sauces:[
        {name:'Paket Sos', stock:5},
    ]
};


function main(){

    //Create a new order
    let order1:Order = {
        base:'Ekmek',
        main:'Tavuk',
        materials:['Marul','Soğan','Turşu'],
        cookTime:3000,
        sauces:['Paket Sos']
    };
    
    //Create an order manager instance and supply stockservice.
    let orderManager = new OrderManager(new StockService());
    //Take order - Step 1
    orderManager.takeOrder(order1).then(success=>{
        console.log(success);
        let extrasManager = new ExtrasManager();
        let plateManager = new PlateManager();
        //Prepare order, fry potatoes and get drinks at the same time.Step 3-4-5
        Promise.all([
            orderManager.prepareOrder(order1),
            extrasManager.fryPotatoes(),
            extrasManager.getDrinks()
        ]).then(success=>{
            //When all promises above are resolved, prepare the plate and serve it.
            plateManager.makeAGoodLookingPlate().then(resolve=>{
                orderManager.serveOrder().then();
            });
        })
        

    }).catch(error=>{
        //Stock Error
        console.log(error);
    });

}
main();
