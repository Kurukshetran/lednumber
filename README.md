lednumber
--
## なにこれ
canvasに7/14/16セグメントledっぽいフォントで数字を書き出します

![Demo](https://raw.github.com/satanabe1/lednumber/master/pic/list.png)  

![Demo](https://raw.github.com/satanabe1/lednumber/master/pic/rb.png)

## 使い方
### led.jsを追加する
```
<script src="./led.js"></script>  
```
### canvasタグを追加する
```
<canvas id="sample" />  
```
### newしてdrawする
```
var canvas = document.getElementById("sample");  
// 7セグメント版  
led7 = new SevenSegment(canvas, x座標, y座標, 大きさ);  
led7.draw( led7.mapping(数字) );  
// 14セグメント版  
led14 = new FourteenSegment(canvas, x座標, y座標, 大きさ);  
led14.draw( led14.mapping(数字) );  
// 16セグメント版  
led16 = new SixteenSegment(canvas, x座標, y座標, 大きさ);  
led16.draw( led16.mapping(数字) ); 
```
### オプションについて
色を変えるとき  
```
led7.setOffColor(0,0,0);//オフ  
led7.setOnColor(250,250,0);//オン  
```

## ライセンス
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
