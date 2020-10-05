import React, {useReducer} from 'react';
//ファイルでuseReducerを使用したいのでインポートする。　
//useReducerをホバーして確認していく。関数であるのがわかる。型の定義が長くてわかりづらい。
//戻り値の方は長くて省略されているのでよくわからない。　
//overloadsは同じ関数名でありながら引数の型だったり型が違うような関数の型を定義する事ができる。　useReducerの型の定義は定義の上では５つある事がこれでわかる。+4 overloadsと書いてあるから。
//useReducerの定義元を見ていく。　overloadsの場合定義が５つ表示される。
//今回は引数が２つなので引数が２つな奴を探す。
//2番目と5番目が３つ目の引数がオプショナルで２つの引数指定でおっけーなので、どちらかの型定義が採用される。
//CounterWithReducerに戻って確認。すでにuseReducerを使用しているので型がデータに採用されているので戻り値の型なども参考になる。
//このuseReducerは配列を返す(const [state, dispatch])。２つ目のデータの型(dispatch)をホバーするとReact.Dispatch<any>という型である事がわかるのでこれを参考にして残りの２つを絞れないのかを考える。
//2番目はDispatchWithoutActionなのでReact.Dispatchではないのでこれではない。
//5番目は戻り値の２つ目の要素がDispatch<ReducerAction<R>>が今戻されているものと同じなので5つ目の定義が採用されている。
//overloadsがある場合はこのようにして、普段使っている型を的確に選べるようにしていく事が大切。　
// function useReducer<R extends Reducer<any, any>>(
//   reducer: R,
//   initialState: ReducerState<R>,
//   initializer?: undefined
// ): [ReducerState<R>, Dispatch<ReducerAction<R>>];
//73 useReducerの定義がどれかわかったので、genericsの型引数の１つの型(R)が指定できる。<R>は第一引数に渡すreducerという関数に渡す型を示すものという事がわかる。
//2つめの引数には、初期値を渡す事ができる。初期値の型はReducerStateという型に型引数Rを渡すことができる複雑な型。
//ReducerStateが何かを確認する。　
//type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any> ? S : never;という定義になっている。
//RはReducerと互換性がないといけない。Reducerは関数なのでRは関数。
//右辺でもRはReducerであるかを評価しているが、左辺の方で互換性があるかをチェックして、前提として決まっているので必ず成立する。
//ここのコンディショナルtypeは必ずtrueになるのでSが採用される。
//Sって何？Reducerの型定義を見ればわかる。　
//type Reducer<S,A> = {prevState: S, action: A} ==> S;
//Reducerは関数なんだけど、Sはこの関数の第一引数。
//第一引数(prevState)であり、戻り値の型(S)と紐づいている。
//Reducerはある状態から別の状態に変える関数で、Sはここでいう状態の型でもある。
//つまり、ReducerStateというのは状態の型であるということ。
//3番目の引数の定義はオプショナルな引数なので今回は使用しない。
//reducerに渡している引数が型安全ではないので型を渡していく。
type StateType = {count: number};

//const initialState = {count: 0}
const initialState: StateType = {count: 0};

//stateとactionの型を指定する。指定ないのでエラーが出ている。とりあえず型がわかっていないので明示的にanyにしてエラーを無くしておく。
//73 action引数はaction.typeでincrementかdecrementを拾いたいので、その型をこのように定義する。
type ActionType = { type: 'decrement' | 'increment' | 'reset' }; 
//別の処理を追加したい場合、追加で'resetという機能w持たせたいと思った場合はまずは型をまず追加する。
// そのresetというタイプとして指定が得られた場合は、初期化したいという処理を実装する時の処理は下記。case '' と入力しただけで、候補にすでにresetが表示されるので便利。
//これでactionの型の定義ができた。anyを削除してActionTypeに変更する。
//stateもanyなので型指定して上がる。stateはcountというプロパティが存在するオブジェクト。countは＋1したり-1したりしないといけないのでnumber型でないといけない。　
//StateTypeで型指定してあげて、型制約をつける。StateTypeはinitialStateにもアノテーションできる。　

//reducerは状態を受け取って新たな状態を返すものだったので状態を返すSの部分も指定してあげる。

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return initialState;
    //下のCounterWithReducerにresetをdispatchできるものを実装する。
    default:
      throw new Error();
  }
}
//Counterコンポーネントをこのファイルではエクスポートしているが、できればエクスポートする名前とファイル名を同じにすると保守性が高くなるので名前をリネームする。　
function CounterWithReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'reset'})}>rest</button>
    </>
  );
}

//Counteコンポーネントがファンクションで作られているのでexportしてあげる。
export default CounterWithReducer;

//App.tsxでCounterWithReducerをインポートして、CounterWithReducerを表示する事を実施する。