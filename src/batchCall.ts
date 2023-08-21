// 达夫设备加速循环
export function batchCall<T extends Function>(this: any, list: T[], ...args: any[]) {
  if (list.length === 0) return;

  const _mod = list.length % 16;
  let i = 0;

  // eslint-disable-next-line default-case
  switch (_mod) {
    case 15:
      list[i++].apply(this, args);
    case 14:
      list[i++].apply(this, args);
    case 13:
      list[i++].apply(this, args);
    case 12:
      list[i++].apply(this, args);
    case 11:
      list[i++].apply(this, args);
    case 10:
      list[i++].apply(this, args);
    case 9:
      list[i++].apply(this, args);
    case 8:
      list[i++].apply(this, args);
    case 7:
      list[i++].apply(this, args);
    case 6:
      list[i++].apply(this, args);
    case 5:
      list[i++].apply(this, args);
    case 4:
      list[i++].apply(this, args);
    case 3:
      list[i++].apply(this, args);
    case 2:
      list[i++].apply(this, args);
    case 1:
      list[i++].apply(this, args);
  }

  let n = (list.length - _mod) / 16;

  // 每次循环展开 16 次
  while (n--) {
    list[i++].apply(this, args); // 1
    list[i++].apply(this, args);
    list[i++].apply(this, args);
    list[i++].apply(this, args);
    list[i++].apply(this, args);
    list[i++].apply(this, args);
    list[i++].apply(this, args);
    list[i++].apply(this, args); // 8
    list[i++].apply(this, args);
    list[i++].apply(this, args);
    list[i++].apply(this, args);
    list[i++].apply(this, args);
    list[i++].apply(this, args);
    list[i++].apply(this, args);
    list[i++].apply(this, args);
    list[i++].apply(this, args); // 16
  }
}
