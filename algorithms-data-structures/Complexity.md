# TIME & SPACE

## 3 Pillars of Programming

- Readable
- Memory (Space Complexity), How much space in RAM an algorithm needs to complete a given task
- Speed (Time Complexity), Processors IPC

## Identifying Runtime Complexity

| Cases                                                              | Time Complexity                       |
| :-------------                                                     | :-------------:                       |
| Iterating with a simple for loop through a single collection?      |             Probably O(n)             |
| Iterating through half a collection?                               |  Still O(n). No constants in runtime. |
| Iterating through two *different* collection with separate loops?  |               O(n + m)                |
| Two nested for loops iterating over the same collection            |               O(n ^ 2)                |
| Two nested for loops iterating over different collections?         |               O(n * m)                |
| Sorting?                                                           |             O(n * log(n))             |
| Searching through a sorted array?                                  |               O(log(n))               |
