

/*
 스프레드 문법을 이용하는 방법 확인, ts 타입 확정시키는 방법 확인
*/

function solution_listSlicer(n: number, slicer: [number, number , number], num_list : number[]) {
    
    const temp : number[] = [];
    
    // 함수 시그니처 정의
    type OperationFunc = (a: number, b: number, c: number) => number[];

    const operation : { [key : number] : OperationFunc } = {
        1 : (a : number ,b : number , c : number) => num_list.slice(0, b+1),
        2 : (a : number, b : number , c : number) => num_list.slice(a , num_list.length+1),
        3 : (a : number, b : number , c : number) => num_list.slice(a,b+1),
        4 : (a : number, b : number , c : number ) => {
            
            for(let i=a ; i<b+1 ; i+=c){
                temp.push(num_list[i]);
            }
            
            return temp;
        }
   }

    // return operation[n](slicer[0], slicer[1], slicer[2]);
    return operation[n](...slicer);
}