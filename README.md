# ALICE_plugin

### Description
Nowadays, Majority of the U.S. adults (62%) depend on news primarily sourced from social media. Dissemination of fake news has become easier. Therefore, being able to classify whether an information text is true or not is increasingly important.

ALICE (Advanced Language Interpretation and Classification Environment) is the capstone project of MITS (Master of Information Technology Strategy) in Carnegie Mellon University done by [Xinran Ma](https://github.com/xrma99), [Prakhar Agrawal](https://github.com/prakhariitd), [Junyi Guo](https://github.com/LilyGuo305) and [Manisha Georgina](https://github.com/3eveE-git). The deliverables is an interactive and real-time website server plus chrome plug-in toolkit which achieves automatic text classification. The project aims to help users recognize misinformation and disinformation quickly.

This repository is the chrome plug-in. It works with our [website server]().

### User's Guidance

#### Plug-in Installation

1. Clone the repository to the local computer.
```
$ git https://github.com/xrma99/ALICE_plugin.git
```
2. Open your Chrome browser and go to [Extensions](chrome://extensions/).
3. Enable **Developer mode**
4. Click button **Load unpacked** and choose the directory of this repository which you just downloaded to your computer.

#### Plug-in Use
There are two ways of using. One is jumping to our webserver. The other is the real-time classification panel that does not require jumping.

##### 1. Jump
Select the [text] you want to classify. Right click the mouse and click *Classify [text]*. You will be re-directed to server's result page.

##### 2. Real-time panel
First enable real-time classification function:
1. Click the *Extension* icon near the URL bar.
2. Click the extension **ALICE**
3. Open the real-time Classification

Then when you select the [text] you want to classify, the real-time classification panel will appear near the [text]. You will be able to see the classification result there.

**It would be really appreciated if you give your feedback on whether you agree with the classification!**

Acknowledgement: The code is written on the basis of [CaTmmao](https://github.com/CaTmmao/chrome-extension-translate)'s work.
