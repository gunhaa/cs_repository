#include <stdio.h>
#include <stdlib.h>

typedef struct Data {
    int value;
    struct Data *next;
} Data;

Data* insert(Data* head, int value) {
    Data* new_node = (Data*) malloc (sizeof(Data));

    // new_node가 가리키는 Data 구조체의 'value' 멤버에 접근
    // 포인터를 통해 멤버에 접근하는 특별한 연산자 -> , java, js의 .연산자와 비슷한 역할을 한다
    new_node -> value = value;
    
    // new_node가 가리키는 Data 구조체의 'next' 멤버에 접근
    new_node -> next = head;
    return new_node;
}

// reconnect 함수: 특정 값을 가진 노드를 찾아 리스트의 맨 앞으로 이동
// Data* head: 현재 연결 리스트의 시작(head) 포인터
// int value: 리스트 맨 앞으로 이동시킬 노드의 값
Data* reconnect(Data* head, int value) {
    if(head == NULL || head-> value == value) return head;
    Data *prev = NULL, *curr = head;
    while( curr != NULL && curr -> value != value) {
        prev = curr;
        curr = curr -> next;
    }

    if(curr != NULL && prev != NULL) {
        prev -> next = curr -> next;
        curr -> next = head;
        head = curr;
    }
    return head;
}

int main() {
    Data *head = NULL, *curr;
    for (int i=1; i <= 5; i++) {
        head = insert(head, i);
    }
    head = reconnect(head, 3);
    for (curr = head; curr != NULL; curr = curr-> next) {
        printf("%d", curr->value);
    }

    return 0;
}