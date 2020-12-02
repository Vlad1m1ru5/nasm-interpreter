# NASM Wen Interpreter

## Pre-install

+ Node `v13.6.0`;
+ npm `6.13.4`.

## Install

```sh
npm i
```

### Start

Dev server:

```sh
npm run dev
```

Prod build:

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
loop: stc
cmp
jlt delete_left
swp
delete_left: pop
push 1
ldc
sub
read
jgt loop
```

### Sum of vectors

```
