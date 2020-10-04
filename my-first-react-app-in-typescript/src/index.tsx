import React from 'react'; //reactの機能を使用できるように。
import ReactDOM from 'react-dom'; //reactの機能に関するものでreactの開発では必ず使用。
import App from './App'; //thirdpartyではなく自作のモジュールを取り込んでいる。conponetというものでhtmlを表示するための部品

// ReactDOM.render(<App />, document.getElementById('root'));
//renderメソッドを実行している。
//renderメソッドの第一引数にAppを受け渡している。
//html上にあるrootというIDがふられているDOMをrenderメソッドの第一引数に渡しているAppというJSXで表現されているデータで置き換えるということをしている。
//rootはどこにあるのか,publicのindex.htmlの<body>にある。
//こちらのdiv要素のidがrootになっててそれをReactがAppに変えてくれる。
//Appの存在箇所は./Appの中にApp componentの中にある。 ./Appは今いる階層と同じ階層にあるという意味で/ がある。今回はApp.tsxが実態としてある。中身を見ていく。
//これはAppという機能を収納している。　Appコンポーネントは関数の形をなしていて、俗にfunction コンポーネント、関数コンポーネントと呼ばれていて、最終的にHTMLとして表示される部品。return部分にhtmlで表示されるものが書かれている。

//propsというものがreactにあって、コンポーネントに属性を持たせるという機能を持つ。index.tsxのReactDOM.render(<App />, document.getElementById('root'));のApp/にmessageというプロップスを追加する
//これを書くことで何が起きるか。Appコンポーネントを使う側からAppコンポーネント側にデータを渡しているということ
//Appコンポーネント側にmessageという文字列を渡してあげて、Appコンポーネントの内部からmessageの中身を見る事ができる
ReactDOM.render(<App message = " Hello,react" />, document.getElementById('root')); 
//このままだとコンパイルエラーが出る。Appにとっては得体の知れないものが追加されたということになる。
//なんでエラーが出るのかというとtsだから。
//messageという属性はIntrinsicAttributesとして認められていないからmessageとおく事ができないとエラーが表示している。
//IntrinsicAttributesの意味は本来備わっている。元々存在する。
//元々存在するとは？ reactをやっている方なら使用した事がある。
//コンポーネントは色んな属性を設定できる
// ReactDOM.render(<App message = " Hello,react"  key = "1"/>, document.getElementById('root')); 

//Intrinsicな属性もある。key="1" 書いてもエラーは出ない。
//messageはエラー　keyはエラーにならないこの違いはIntrinsic だから。
//keyは特別。なぜOKなのか。IntrinsicAttributesの実態が何なのかを解明すればわかる。
// type Foo = JSX.IntrinsicAttributes;
//IntrinsicAttributesの定義を確認する　interface IntrinsicAttributes extends React.Attributes { }
//React.Attribute {} を継承している。その定義へ。
//interface Attributes {  key?: Key;} Attributesの中にkeyがあるからkeyだけが特別扱いされる？　ということはそこにmessage: string に追加するとmessage のエラーが消えた。ということはmessageもAttributesのメンバーに入ったということ。
// ReactDOM.render(<App message = " Hello,react"  key = "1"/>, document.getElementById('root')); 
//コンパイルエラーの肝はAttributes！！これはライブラリーの実装なのでいじっちゃうと動かなくなる可能性があるので消すこと。
//このようにmessageがエラーになるのが正しい状態。messageのpropsの追加については、しかるべき手順がある。今の時点では置いておく。エラーの正しい解消方法は後ほど。 これにはkey="1"は不要だからないやつで続行する
// ReactDOM.render(<App message = " Hello,react"  name="Ham"/>, document.getElementById('root')); 



