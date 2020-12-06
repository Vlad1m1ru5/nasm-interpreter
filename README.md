# NASM Wen Interpreter

## About

Emulation for Harvard architecture stack machine.

The following commands are implemented.

| No | Command | Description |
| -: | :------ | :---------- |
|  1 | push    | Put value on top of stack stack |
|  2 | sub     | Subtract second value from first value on top of stack |
|  3 | mul     | Multiply with overflow second value with first values on top of stack |
|  4 | add     | Sum second value with first value on top of stack |
|  5 | cpm     | Compare second value with first values on top of stack |
|  6 | jlt     | If first value on top of stack is greater then 0, go to marker |
|  7 | stc     | Put counter on top of stack from register |
|  8 | ldc     | Put first value from top of stack to counter register |
|  9 | pop     | Remove first value from top of stack |
| 10 | jgt     | If first value from top of stack is lesser then 0, do go to marker |
| 11 | swp     | Swap second value with first values on top of stack |
| 12 | dup     | Put first value from top of stack on top of stack |
| 13 | rol     | Rotate left first three values from top of stack |
| 14 | ror     | Rotate right first three values from top of stack |
| 15 | adc     | Sum second value with first value on top of stack, and write in two values |
| 16 | write   | Get value from stack by address on top of stack |
| 17 | js      | Go to marker |

## Requirements

+ Node `v13.6.0`;
+ npm `6.13.4`.

## How to Install

```sh
npm i
```

## How to Start

Start app with dev server:

```sh
npm run dev
```

Start app with prod-ready server:

```sh
npm run build
```

## Examples

### Find max value in vector

```sh
push 100
push 10
push 15
push 3
loop: ldc
cmp
jlt delete_left
swp
delete_left: pop
push 1
stc
sub
dup
jgt loop
```

### Two arrays convolution

```sh
push 10
push 15
push 5
push 60
push 0 # младшие биты суммы
push 0 # старшие биты суммы
push 2
ldc
main: push 1
stc
sub
dup
jlt end
ldc
push 0
write
push 0
write
mul
ror
add
rol
swp
add
swp
js main
end: pop
```
