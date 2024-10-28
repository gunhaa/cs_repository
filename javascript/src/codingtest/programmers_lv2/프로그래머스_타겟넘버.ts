// n개의 음이 아닌 정수들이 있습니다. 이 정수들을 순서를 바꾸지 않고 적절히 더하거나 빼서 타겟 넘버를 만들려고 합니다.
// 예를 들어 [1, 1, 1, 1, 1]로 숫자 3을 만들려면 다음 다섯 방법을 쓸 수 있습니다.
// -1+1+1+1+1 = 3
// +1-1+1+1+1 = 3
// +1+1-1+1+1 = 3
// +1+1+1-1+1 = 3
// +1+1+1+1-1 = 3
// 사용할 수 있는 숫자가 담긴 배열 numbers, 타겟 넘버 target이 매개변수로 주어질 때 숫자를 적절히 더하고 빼서 타겟 넘버를 만드는
// 방법의 수를 return 하도록 solution 함수를 작성해주세요.


// 실패
function solution22(numbers : number[], target : number){

    interface node1 {
        value : number;
        visited : number;
    }

    class node implements node1 {
        value : number;
        visited: number;
        constructor(value: number, visited:number){
            this.value = value;
            this.visited = visited;
        }
    }

    // [1,2,3,4,5,6,7,8,9,10]
    // [1,-1]
    // [1,-1, 1+2, -1-2, 2, -2]
    // [1, -1, 1+2, -1-2 ,2, -2]

    let collections : node[] = [];
    let sum = 0;
    for(let i=0; i<numbers.length ; i++){
        collections[i] = new node(numbers[i], 1);
    }

    collections.forEach(item => {

        if(item.visited==1){

        }

    });

}

function solution21(numbers : number[], target : number) : any{

    let answer = 0;

    function dfs(start : number , numbers :number[] , target : number, sum : number){

        if(numbers.length == start ){

            if(sum==target){
                answer++;
            }

            return;
        }

        dfs(start+1 , numbers, target, sum+numbers[start])
        dfs(start+1 , numbers, target, sum-numbers[start] )
    }

    dfs(0, numbers , target  , 0)

    return answer
}