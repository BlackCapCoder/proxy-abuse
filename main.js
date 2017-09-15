let pfree = ctx => f => new Proxy (f, {
  has: (t, p) => p in t || p in ctx
, get: (t, p) => {
    let k = p in t? t[p]: ctx[p];

    if (k instanceof Function) return (
      function fetch (_k) {
        return pfree (ctx) ( x => ( q => q instanceof Function
                                       ? fetch (q)
                                       : t (q)
                                  ) ( _k(x) )
                           )
      })(k);

    return k;
  }
});


let id = x => x
let p  = pfree (global) (id)

with (p) {
  id    = x => x
  flip  = f => x => y => f (y) (x)
  Const = a => b => a
  dot   = f => a => b => f(a(b))
  ap    = f => g => x => f (x) (g (x))

  zero  = flip (Const)
  succ  = ap (dot)
  mult  = dot
  add   = m => n => f => x => ap (m) (flip(n)(x)) (f)

  // The number n is represented by running a function n times over some input
  num   = n => n (x => x + 1) (0)
  log   = x => console.log(x)

  one   = succ (zero)
  two   = succ (one)
  three = succ (two)


  log ( num ( succ . add (three) ( succ (zero))  )) // [Function]
  log ( num(succ(add(three)(succ(zero)))) )         // 5

  _succ  = x => x+1
  _add   = x => y => x+y
  _zero  = 0
  _three = 3
  _num   = id

  log ( _num ( _succ . _add (_three) ( _succ (_zero))  )) // 5
  log ( _num(_succ(_add(_three)(_succ(_zero)))) )         // 5
}
