from flask import Flask, render_template,request,jsonify
from sklearn import manifold
import json
import pandas as pd
import random

import numpy as np
import sys


app = Flask(__name__)

df = pd.read_csv('year22.csv')
arr_df = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/getOverallAqi')
def get_overall_aqi():
    global df
    grouped = df.groupby(df.Year)
    global arr_df
    start, end = 0, 17
    for i in range(end):
      arr_df.append(grouped.get_group(2000+i))
    avg = []
    print(arr_df[0])
    for i in range(end):
      avg.append(arr_df[i]['NO2 AQI'].mean() + arr_df[i]['O3 AQI'].mean() + arr_df[i]['SO2 AQI'].mean()+ arr_df[i]['CO AQI'].mean())

    #return render_template("index.html",avg = avg)
    return jsonify({
        "dd" : avg
    })


@app.route('/getMapData')
def get_map_view():
    global df
    gg_df = []
    grouped = df.groupby(df.Year)
    start, end = 0, 17
    for i in range(end):
      gg_df.append(grouped.get_group(2000+i))
    co = []
    #state_names = ["Alaska", "Alabama", "Arkansas", "American Samoa", "Arizona", "California", "Colorado", "Connecticut", "District ", "of Columbia", "Delaware", "Florida", "Georgia", "Guam", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "North Carolina", "North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Virgin Islands", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"]
    state_names = ["Arizona", "California", "Colorado"]
    states = []
    for i in state_names:
        states.append(gg_df[0][gg_df[0]['State'] == i])
    for i in range(len(states)):
        co.append({"state": state_names[i] , "value" : states[i]['CO AQI'].mean()})
    
    return jsonify({
        "co" : co
    })

@app.route('/getPieView/<year>')
def get_pie_view(year):
    print(year)
    global df
    #{SO2: 9, NO2: 20, CO:30, O3:8}
    pp_df = []
    grouped = df.groupby(df.Year)
    start, end = 0, 17
    #for i in range(end):
    pp_df.append(grouped.get_group(int(year)))
    content = []
    content.append({"NO2":pp_df[0]['NO2 AQI'].mean(),"CO":pp_df[0]['CO AQI'].mean(),"O3" :pp_df[0]['O3 AQI'].mean(), "SO2":pp_df[0]['SO2 AQI'].mean()})
    print(content)
    
    return jsonify({
        "content" : content
    })


@app.route('/getLine/<aqi>/<states>')
def get_line_view(aqi,states):
    global df
    start, end = 0, 17
    state_names = ["Arizona", "California", "Colorado"]
    pollution = []
    for s in state_names:
      line_df = df[df["State"]==s]
      each_state_pollution = []
      for i in range(end):
        each_state_pollution.append({"Year": 2000+i, "AQI": line_df[line_df["Year"] == 2000+i][aqi+' AQI'].mean() })
      pollution.append(each_state_pollution)

    return jsonify({
        "pollution" : pollution
    })

if(__name__ == "__main__"):
    app.run(debug=True)