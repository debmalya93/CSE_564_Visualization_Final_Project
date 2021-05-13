from flask import Flask, render_template,request,jsonify
from sklearn import manifold
import json
import pandas as pd
import random

import numpy as np
import sys


app = Flask(__name__)

df = pd.read_csv('nonil.csv')
pf = pd.read_csv('population-deaths.csv')
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
      avg.append(int(arr_df[i]['NO2 AQI'].mean()) + int(arr_df[i]['O3 AQI'].mean()) + int(arr_df[i]['SO2 AQI'].mean())+ int(arr_df[i]['CO AQI'].mean()))

    #return render_template("index.html",avg = avg)
    return jsonify({
        "dd" : avg
    })


@app.route('/getMapData/<year>/<pollutant>')
def get_map_view(year, pollutant):
    global df
    grouped = df.groupby(df.Year)
    gg_df = grouped.get_group(int(year))
    co = []
    state_names = list(set(df['State']))
    state_names = [i for i in state_names if i]
    print(len(state_names))
    states = []
    so = []
    for i in state_names:
        states.append(gg_df[gg_df['State'] == i])
    for i in range(len(states)):
        co.append({"state": state_names[i] , "value" : 0 if len(states[i][pollutant+' AQI']) == 0 else states[i][pollutant+' AQI'].mean()})
        so.append({"state": state_names[i] , "value" : states[i][pollutant+' AQI'].sum()})
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
    #state_names = ["Arizona", "California", "Colorado"]
    state_names = states.split('-')
    print(state_names)
    pollution = []
    for s in state_names:
      line_df = df[df["State"]==s]
      each_state_pollution = []
      for i in range(end):
        each_state_pollution.append({"Year": 2000+i, "AQI":0 if len(line_df[line_df["Year"] == 2000+i][aqi+' AQI']) ==0 else line_df[line_df["Year"] == 2000+i][aqi+' AQI'].mean() })
      pollution.append(each_state_pollution)

    return jsonify({
        "pollution" : pollution
    })

@app.route('/getLineCustom/<state>')
def get_line_custom(state):
    global pf
    state_df = pf[pf['Area']==state]
    combine = []
    each_state_death = []
    each_state_population = []
    for i in range(17):
        each_state_death.append({"Year": 2000+i, "Death": int(state_df[state_df['Year'] == 2000+i]['DeathCount'].mean()) })
        each_state_population.append({"Year": 2000+i, "Population": int(state_df[state_df['Year'] == 2000+i]['Population'].mean()) })
    combine.append(each_state_population)
    combine.append(each_state_death)

    return jsonify({
        "combine" : combine
    })



@app.route('/getPCP/<state>')
def get_pcp_view(state):
    global df
    # state_names = states.split('-')
    cities = []
    # for i in state_names:
    sf = df[df['State']==state]
    for city in set(sf['City']):
        obj = {"NO2":int(sf[sf['City']==city]['NO2 AQI'].mean()), "SO2":int(sf[sf['City']==city]['SO2 AQI'].mean()), "CO":int(sf[sf['City']==city]['CO AQI'].mean()), "O3":int(sf[sf['City']==city]['O3 AQI'].mean()), "City": city, "Code": int(sf['State Code'].mean())  }
        cities.append(obj)
    print("Len", len(cities))

    return jsonify({
        "cities" : cities
    })

if(__name__ == "__main__"):
    app.run(debug=True)