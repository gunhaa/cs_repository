# Python

## 출력 예상

### 2025실기

```python
class Node:
    def __init__(self, value):
        self.value = value
        self.children = []
 
def tree(li):
    nodes = [Node(i) for i in li]
    for i in range(1, len(li)):
        nodes[(i - 1) // 2].children.append(nodes[i])
    return nodes[0]
 
def calc(node, level=0):
    if node is None:
        return 0
    return (node.value if level % 2 == 1 else 0) + sum(calc(n, level + 1) for n in node.children)
 
li = [3, 5, 8, 12, 15, 18, 21]
 
root = tree(li)
 
print(calc(root)) 
```

### 2024-3-10

```python
def func(value):
    if type(value) == type(100):
        return 100
    elif type(value) == type(""):
        return len(value) 
    else:
        return 20
 
 
a = '100.0'
b = 100.0
c = (100, 200)
 
print(func(a) + func(b) + func(c))
```

<details>
  <summary>정답</summary>
  45<br>
  python은 int float str을 알아보는 문제
  a는 str, b는 float, c는 tuple
  return 100은 int, return len(value)는 str, 이외는 return 20
</details>