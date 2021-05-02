from flask import Flask, render_template,request,jsonify
import numpy as np
import pandas as pd
import json
import sys


app = Flask(__name__)



@app.route('/')
def index():
    return render_template('index.html')



if(__name__ == "__main__"):
    app.run(debug=True)