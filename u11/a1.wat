(module
  (export "ggT" (func $ggT))
  (func $ggT (param $a i32) (param $b i32) (result i32)
    (local $h i32)
    get_local $a
    i32.eqz
    if
      get_local $b
      return
    end
    get_local $b
    i32.eqz
    if
      get_local $a
      return
    end

    loop $loop
      get_local $a
      get_local $b
      i32.rem_s
      set_local $h
      get_local $b
      set_local $a
      get_local $h
      set_local $b

      get_local $b
      i32.const 0
      i32.ne
      if
        br $loop
      end
    end
    get_local $a
    )
)