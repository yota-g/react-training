import React from 'react';

// const App = () => {
//   return <div>React Starter Kit in TypeScript</div>;
// };
//returnでhtmlで表示するものを返す
//divはhtmlの要素のように見えるが、jsxというjsになる。
//このdivで表現されているものが、トランスパイルという変換工程を経てhtmlの要素となってブラウザに表示される。
//これがreactのやっていることになる。\
//index.tsxで入力したmessageというpropsをappコンポーネントから取り出すということをする。　
//messageを取り出すには外から受け取れるデータをpropsという引数で受け取ればいいのでpropsと引数に書いてあげるだけでいい。設置すると先ほどのindex.tsxのmessageに表示されていたエラーが表示されない様になる。
//その代わりにpropsにエラーが表示されている。propsはどこにも使ってないといエラーとpropsに対して適切に型を指定してないから型はany型と推論してあまり良くないのでコンパイルエラーが出ている。
//propsを適当に使ってあげることにする
// const App = (props: any) => {
  // console.log(props); //こうすることでエラーが一つ消える。後は残りのエラーを消す的に暗黙的ではなく明示的にany型を指定してあげる。
  // return <div>React Starter Kit in TypeScript</div>;
// };
//そうすることでエラーは一旦は消える。
//cd my-first-react-app-in-typescriptでyarn startをしてあげる
//文言が出てエラーが出ないし、consoleの部分でconsolo.logに入力したものが出力されている。
//{}で出力されているのでオブジェクトが画面に出力された。そのオブジェクトの中の要素としてmessageが存在する。そのmessageの内容がHello,reactだということ。
//message の内容を取り出して、そのmessageの中の文字列画面に表示してみる。
//表示するにはpropsというオブジェクトからmessageをはぎ取る必要がある。　
// const App = (props: any) => {
//   const {message } = props;
//   return <div>{message}</div>;
// };
//const{オブジェクトの中のmessageを入力} = propsとすることでmessageだけ取り出す事ができる。
//jsの分割代入というもので、propsというオブジェクトの中からmessageというメンバーだけを取り出している
//jsxのreturnの中に表示したいなと思ったらdivの要素の中に表示したいと思ったら{}の中に書いてあげる。　そうする事でmessageを出力する事ができる。
//こんな感じでコンポーネントの外側からpropsというobjectを受け取る事ができる様になった。ここで本題に入る。
//tsだとpropsに対してどうやって型制約をするのか。
//このままだとany型でなんでも型を受け取れてしまう。今の様にpropsというざっくりとしたオブジェクトを受け取るのではなく、文字列型という型のメッセージを受け取るよという具体的な制約を持たせた書き方にしていく。

//引数へはpropsとした漠然としたものではなく、具体的にmessageを書いてあげる　propsはオブジェクトなので{}を書いてあげて記入する。
// const App = ({message}: any) => {
//   return <div>{message}</div>;
// };
//外からmessage以外のpropsをindex.tsxに追加して,ReactDOM.render(<App message = " Hello,react"  name="Ham"/>, document.getElementById('root')); の状態にしてもエラーが出ない。
//index.tsx側つまり外側のコンポーネント側からappコンポーネント側に正常に渡せたと勘違いしてしまう。　
//nameという属性を間違えて渡したというのをどうしても防ぎたい。　
//anyはとって型をしているするところにちゃんと型を指定してあげる。
// const App = ({message}: {message: string}) => {
//   return <div>{message}</div>;
// };
//{message: string}がpropsとして渡ってくる型そのものになる。
//message以外は許容しなくなる。
//nameと外側のコンポーネントに書いていたところにエラーが表示されるようになる。nameは存在していないからダメと行ってくれる。　
//このような書き方で想定外のデータの混入を防ぐ事ができる。　
//messeage以外は消してあげて置いておく。

//一般的には型の構造はinterfaceで外に出して、定義してinterfaceで定義した型を使用してアノテーションするというのをよくみる。
//そのやり方を確認する。
interface AppProps {
  message: string
}
//実質同じことをしているが、interfaceを作成する事で再利用もできる。
//interfaceを定義して、名前を使って型を指定してあげる事で同じ構造の時が出た時に再利用できる
//引数のmessageにカーソルを持っていくとmessageはstringと型制約ができている。
const App = ({message}: AppProps) => {
  return <div>{message}</div>;
};
//この状態で外部コンポーネントのmessageの値の方に値を入れてあげるとしっかりとエラーが表示されるようになる。 ミスの数が減る。型制約のおかげ。
export default App;
