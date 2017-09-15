# Proxy-Abuse

A somewhat successful attempt at implementing point-free notation in Javascript using proxies. It works perfectly for regular functions, but somehow fails for higher order ones.

Example usage:
```javascript
let p = pfree (global) (x => x)

// You can define things in point-free notation inside this with block
with (p) {
  add  = x => y => x + y
  succ = add (1)
  five = succ . add (2) . succ (1)
}

console.log(five) // 5
```

Does not work properly for higher order functions (this might change one day):
```javascript
with (p) {
  flip  = f => x => y => f (y) (x)
  Const = a => b => a
  dot   = f => a => b => f(a(b))
  ap    = f => g => x => f (x) (g (x))

  zero  = flip (Const)
  succ  = ap (dot)

  num   = n => n (x => x + 1) (0) // The number n is represented by running a function n times over some input

  console.log ( num ( succ ( succ ( succ (zero) )))) // 3
  console.log ( num . succ . succ . succ (zero) )    // [Function]
}
```

# Do not!

Use this in production code. Even if I eventually fix it for higher order function, it is abuse of the Javascript language and against all conventions- your co-workers will hate you.
