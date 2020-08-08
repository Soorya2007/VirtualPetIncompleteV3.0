class Food{
    constructor(){
        this.FoodStock = 0;
        this.lastFed;
        this.image = loadImage("images/milk.png");
    }

    updateFoodStock(FoodStock){
        this.FoodStock = FoodStock;
    }

    getFedTime(lastFed){
       this.lastFed = lastFed;
    }

    deductFood(){
        if(this.FoodStock>0){
            this.FoodStock = this.FoodStock-1;
        }
    }

    getFoodStock(){
        return this.FoodStock;
    }

    bedroom(){
        background(bedimg,550,500);
    }

    garden(){
        background(gardenimg,550,500);
    }

    washroom(){
        background(washimg,550,500);
    }
        display(){
        var x = 80,y = 100

        imageMode(CENTER);
        image(this.image,720,220,70,70);
        if(this.FoodStock!=0){
          for(var i = 0 ; i>this.FoodStock ; i++){
           if(i%10==0){
               x=80;
               y=y+50;
           }
           image(this.image,x,y,50,50);
           x = x+30;
          }
        }
    }
}