//コンポーネントを作成する 。実装するにはimportを必ずする事。
//App.tscを開いてCounterを作るものを描画するものを記入する
import React, { useEffect, useRef, useState } from 'react';

// Counterコンポーネントを実装する。関数コンポーネントで実装する。
// 　const Counter: React.FunctionComponent<{}> = () => {
//   const value = 0;
//   return <div>value: {value}</div> //jsxで記載
// }
//
// export default Counter;
//コンポーネント自体をexportしてAppコンポーネントからimportできるように。
// コンポーネントに対しても型制約をつける propsは特に使わないので空オブジェクトでいく。
//カウンターコンポーネントの枠組みが出来上がり、関数コンポーネントの型指定で使用できる　React.FunctionComponentは長ったらしく書かなくても、React.FCと書くだけでもOK　両方実装同じ。
//Counterの実装を行っていく。
// const Counter: React.FC<{}> = () => {
//   const value = 0;
//   return (//一旦ラップする
//   <div>
//       <div>value: {value}</div>
//       <button>+1</button>
//       <button>-1</button>
//     </div>
//     );
// };
/* buttunを押す事でcountできるようにする。これから何をするか。valueは一つの状態。状態としては現状静的。constで初期化している。そして、div要素の中で表示されるがそれ以降変更するアクションが起きない。
今回はコンポーネントの中でvalueを管理する(state)ボタンをクリックしたら+1,-1してねというもの。なので状態を管理できるようにする。 */
//import部分でuseStateという機能を使用すると良い。この機能はReactが提供している。
//useStateは、とりあえず初期化されると状態を取得する事ができる
//そのものに対して、状態を変える事ができるのがsetCountという関数。
//setCountはうまく使う事でこのcountの状態を変化させる事ができる。
//setCountの引数(count ある時点の状態)に+1したりしてアップデートしている。
//ボタンを押す事でcountの状態が変更されていく。
// const Counter: React.FC<{}> = () => {
//   const initialValue: any = 0;
//   const [value , setValue] = useState<number>(initialValue);
//useStateを使用する事で初期化ができる。配列が返ってくるので受け取ってあげる必要がある。
//配列の中の引数の名前は第一引数の名前にsetをつけたものが慣習的に第二引数の関数の名前になる。
//useStateにnumberを与えているから第一引数のvalueがnumberで型指定される。
//もし仮にconst initialValue: any = 0;を設定して、これをuseState(initialValue)とセットするとvalueの型がanyになってしまう。
//明らかにvalueは今回numberを扱おうとしているものなので型制約を持たせたい。　 こうゆう時に使用できるのがuseStateに標準で備わっているgenericsの受け皿があるので使用する。useStateにおいても型を指定する事ができる。
//useStateの型の定義を確認する。
// function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>]; // 受け取り値としてSに型を指定したらS型のデータが返ってくることになる。
//適切にuseStateに型引数を指定してあげるとvalueがnumberに型制約される。
//setValueの関数の型制約は、すでに指定されている。　ホバーして確認すると
//React.Dispatch<React.SetStateAction<S>>]と記載されている。
//そのものにも型引数があって、ここにはSが渡ってくると書かれている。
//型引数はTとかSとか指定しやすいように通常抽象化されているが、setValueに関しては抽象化されておらず、僕たちが選択できる余地はなく書いた時点で型が決まっている。setValueは useStateに与える型引き数で型が決まる。
//型定義でDispatchを確認する。
//  type Dispatch<A> = (value: A) => void;　A という型引数を受け取る関数。
//Aの部分に指定しているSetStateAction<S>はどうかを確認する。
// type SetStateAction<S> = S | ((prevState: S) => S); このS にnumberが指定されているだけ。この型は型引数で指定した型のデータ、型引数として指定した型のデータを引数として型を指定して、かつその型と同じデータをreturnする関数のいずれかを型として持つもの。
//type SetStateAction<S> = S | ((prevState: S) => S);の具体例を確認する。numberで型を指定すると型引数の指定がいらない。
// type MysetStateAction = number | ((prevState: number) => number);
// //numberかnumberの引数をもらってnumberを返す関数のどちらかだということを表す。
// //これがDispatchに渡ってくる。Dispatchを確認する
// type Dispatch = (value: MysetStateAction) => void;
//型引数がなくなる。そしてsetValur の型そのものが右辺になる。　MsetStateActionを削ろうと思ったら下記のようにreplaceできる
//type Dispatch = (value: number | ((prevState: number) => number)) => voidというようになる。
//以上よりsetValueは関数であること、引数に何かしらのデータまたは関数を受ける。引数がデータならその型に。関数なら関数の引数の型と戻り値の型が同じ。

// const Counter: React.FC<{}> = () => {
//   const initialValue: any = 0;
//   const [value , setValue] = useState<number>(initialValue);

//   const increment  = () => {
//       setValue(value + 1);
// incrementでするのはCounterコンポーネントが管理するvalueをアップデートすること。アップデートできるのはsetValueしかない。
//上記のように入力することで更新できるようになる。

// }
// const decrement = () => {
//   setValue(value -1);
// }
//valueを-1して更新する。
//setValueには引数に関数を受け取る事ができるのでそちらも確認する。
//incrementの場合、callbackを登録する事ができる。
//setValue(prevState => prevState + 1);
//今の状態をprevStateで受け取って、 +1して返すという意味。
//decrementの場合。
//setValue(prevState => prevState - 1);
//それぞれの型制約は　useStateの型制約と同じ。型制約がある事で戻ってくるもの(引数)に対しても型制約ができているのでuseStateの役割を理解して、型制約をできる方法をマスターする事。stdで型制約できる方法をマスターする事。
//useStateはtsだと型引数を伴うのでしっかりと型引数を指定すると戻ってくる関数、引数に対しても型制約をしてくれるのでしっかり設定する事。

// return (
//   <div>
//     <div>value: {value}</div>
//     <button onClick={increment}>+1 </button>
//     <button onClick={decrement}>-1</button>
//   </div>
// );
//buttonにOnClickとつけることでボタンにクリックがあった時に動作をするようにする。それぞれの関数に名前をつける。関数の定義がないので定義する。

// };

//70.useRefもreactの機能なのでインポートする。useRef はfunctionと書かれているので関数なので引数と戻り値を持つ。引数は()の中のもの
//function useRef<T>(initialValue: T): MutableRefObject<T> (+2 overloads)
//initialValueという引数があってその型制約がT
//TはuseRefを使う時に指定する型引数で決まる。
// 戻り値に関してはMutableRefObject<T> (+2 overloads) 定義を確認すると、
//interfact MutableRefObject<T>{current : T};というインターフェイスが最終地点になる。
//currentというプロパティがあって型指定はTでされている。
//useRefを使う時に渡すTがそのままcurrentにそのまま型の指定が入る。
//useRefを使ってこのコンポーネントが何回再レンダリングされているのかをカウントする機能を実装する。
//回数をrendertimesという名前で管理していく。

// const Counter: React.FC<{}> = () => {
//   const initialValue: any = 0;
//   const [value, setValue] = useState<number>(initialValue);

//   const increment = () => {
//     setValue(value + 1);
//   };
//   const decrement = () => {
//     setValue(value - 1);
//   };

//   const renderTimes = useRef(0);
//0で初期化。このようにするとrendertimesという１つのオブジェクトが作成される。
//これはホバーするとReact.MutableRefObject<T> である事が確認でき、型引数の推論が働きTの型が表示されている。
// どうやって今回の０という値を取り出せるのか。先ほど見た型の定義のcurrentというメンバー名を参照する事ができるのでcurrentを使用して値を取り出す。

//   return (
//     <div>
//       <div>value: {value}</div>
//       <button onClick={increment}>+1 </button>
//       <button onClick={decrement}>-1</button>
//       <div>This component was re-rendered {renderTimes.current} times!</div>
//     </div>
//何回このコンポーネントがリレンダリングがされているのかを表示する。
// 今回表示したリレンダリングの回数の表示回数の一番初めはuseRefで設定した初期値の値からスタートする。10にしたら10から始まる。
//   );
// };

//このrendertimesの数を操作する。そのためにやることはcomponentがレンダーされたら、必ず実行される処理を実装していく。レンダーされたら丸っと関数を実行してくれる関数にuseEffectがあるのでそれを使用する。
//importにuseEffectを追加する。ホバーして見ていく。これも関数。
//引数にはeffectを渡したり、depsを渡したりする。戻り値はvoidなのでない。
//function useEffect(effect: EffectCallback, deps?: DependencyList | undefined): void
//定義に行ってEffectCallbackの定義を見ていく。
//type EffectCallback = () => (void | (() => void | undefined));
//型は関数で引数なくて、戻り値はvoidまたは関数を返す。その関数もvoidかundefinedを返すという構造になっている。
//DependencyListの定義も確認していく。
//type DependencyList = ReadonlyArray<any>;
//ReadonlyArrayというインターフェースが型エイリアスになっている。
//定義を遡る。　膨大な定義が入っているので一言で説明すると、こちら(interface ReadonlyArray<T>)の型引数に与えた型で構成される配列。
//文字通りReadonlyな配列になる。実装しながら確認する。

//const array: Array<number> = [1, 2, 3];
//シンプルな配列を設定してみる。
//const readonlyArray: ReadonlyArray<number> = [1, 2, 3];
//ReadonlyArrayで型指定して、両者の違いを確認する。
//array[0] = 11; //updateが可能
//readonlyArray[0] = 11; //こちらに関してはupdateする事ができない。readonlyな要素になっているから。配列があるけど要素を壊せないようになっている。
//これがuseEffectの第二引数に指定する事ができる。これがdepsの型の正体。

const Counter: React.FC<{}> = () => {
  const initialValue: any = 0;
  const [value, setValue] = useState<number>(initialValue);

  const increment = () => {
    setValue(value + 1);
  };
  const decrement = () => {
    setValue(value - 1);
  };

  const renderTimes = useRef<number>(0);
  useEffect(() => {
    //console.log('render was done');
    renderTimes.current = renderTimes.current +1;
  });
  // まず第一引数に必須の関数を与えるその中に実装をかく。
  //ブラウザで動作確認。リロードするとconsoleの文字列が表示される
  //buttonをクリックするとどうなるのか。console画面で押した回数'render was done'が何度も表示される。
  //これは実装したuseEffectに渡している第一引数に渡しているコールバックがrenderする度に実行されているから。正常に動いている。
  //useEffectに実装されている関数が実行されるたびにrendertimesが保持している値を+ 1するようにする。そうする事で回数がレンダーするたびに増加していくようにできる。上記のように入力するとレンダーするたびに上書きできる。
  //buttonをクリックするたびにリレンダされるのでその度にrenderTimesの回数が増加させてあげるというようにする。　
  //増えたrenderTimesが表示されている事が確認できる。
  //useRefはuseStateと同じように型制約をする事ができる。
  

  return (
    <div>
      <div>value: {value}</div>
      <button onClick={increment}>+1 </button>
      <button onClick={decrement}>-1</button>
      <div>This component was re-rendered {renderTimes.current} times!</div>
    </div>
  );
};

export default Counter;
