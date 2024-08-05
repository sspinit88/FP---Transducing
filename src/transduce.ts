type Func<T = any> = (...args: T[]) => any;

function compose(...fns: Func[]) {
  return (...args: any[]) => {
    // Начинаем с последней функции и её аргументо
    let result = fns[fns.length - 1](...args);
    // Применяем остальные функции в обратном порядке
    for (let i = fns.length - 2; i >= 0; i--) {
      result = fns[i](result);
    }
    return result;
  };
}

type FN = (...args: any[]) => any;

export const transduce = <A>(
  arr: A[],
  fns: FN[],
  reducer: FN,
  initial: any = []
) => arr.reduce(compose(...fns)(reducer), initial);
