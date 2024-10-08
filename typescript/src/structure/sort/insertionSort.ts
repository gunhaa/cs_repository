const insertionSort = (list : number[]) => {

    for(let i=1; i < list.length; i++){

        let loc = i-1;
        let newItem = list[i];

        while(loc >= 0 && newItem < list[loc]){
            list[loc+1] = list[loc];
            loc--;
        }
        
        list[loc+1] = newItem;
    }

    console.log(list.join(`-`));
}

insertionSort([3,12,2,1,15,8]);