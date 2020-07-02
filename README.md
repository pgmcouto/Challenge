# The Globo Challenge

This repository contains the codes required to fulfill the tasks presented by both challenges. The first folder contains the Python code responsible for treating the "planilha.txt" file. The second one contains the codes needed in order to build the web Ghibli API application.

## First Challenge

The first folder contains the base file (*planilha.txt*), the developed python script and an example *json* output. As both imported libraries are native to Python, all is needed to run the script is a Python3 interpreter.  
The command **python regex.py** should do the trick.

## Second Challenge

As for the second challenge, the entirety of the source codes (and the *public* images folder) is comprised in the second folder. The structure is divided in folders representing different scopes. The *styles* folder contains styled tags, separated by context. The *services* folder contains the API handling. The other folders are mostly self-explanatory.

The Application has been made using **NEXT.js** as its base framework. The final result is built and deployed via **Vercel**, and can be accessed [`here`](https://ghibli-list.vercel.app/).

If there is need to build it locally, a simple chain of commands should suffice (assuming that a recent version of Node.js is already installed):

1) Download the source codes;
2) Install the necessary dependencies contained on *package.JSON* via the command **npm i**;
3) If willing to run it in development mode, run **npm run dev**. Otherwise, build the application with **npm build** and then deploy it with **npm run prod**.

# Thanks!
