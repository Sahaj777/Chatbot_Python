from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

#chatbot import
import nltk
import pandas as pd
import  re
import random
import os

#loading corpus
df=pd.read_csv(r'./cleangeneral.txt')
df2=pd.read_csv(r'./cleanmachine.txt')
df3=pd.read_csv(r'./cleanstats1.txt')

#tokens
sent_tokens=list(df['Cleaned_Ans'])
sent_tokens2=list(df2['Cleaned_Ans'])
sent_tokens3=list(df3['Cleaned_Ans'])


#greetings
greeting_inputs=('hey','hi','hello','whats up','how')
greeting_response=["Hello ","Hi ","Hi there ","Hey "]


def greetings(text):
    for i in text.split() :
        if i.lower() in greeting_inputs:
            return random.choice(greeting_response)
    return False


#libraries
#responses
from sklearn.feature_extraction.text import TfidfVectorizer
#cosine similarity
from sklearn.metrics.pairwise import cosine_similarity
#voice module
#!pip install pyttsx3
#import pyttsx3


#response
def response(user_response,option):
    user_response=user_response.lower()
    vectorizer=TfidfVectorizer(stop_words='english')
    if option == 1:
        tokens=sent_tokens
    elif option == 3:
        tokens=sent_tokens3        
    else:
        option ==2
        tokens=sent_tokens2

    tokens.append(user_response)
    tfidf=vectorizer.fit_transform(tokens)
    value=cosine_similarity(tfidf[-1],tfidf)
    idx=value.argsort()
    idx=idx[0][-2]

    if value[0][idx] < 0.2:
        #engine=pyttsx3.init()
        #engine.setProperty('rate',125)
        #engine.say("I am sorry i didn't get it")
        #engine.runAndWait()
        tokens.remove(user_response)
        return "I am sorry i didn't get it" 
    else:
        #engine=pyttsx3.init()
        #engine.setProperty('rate',125)
        #engine.say(tokens[idx])
        #engine.runAndWait()
        tokens.remove(user_response)
        return  tokens[idx]





@api_view(['GET'])
def index(request):
    df=pd.read_csv(r'./cleangeneral.txt')
    
    return Response({"message": "Got some data!", "data": 123})

@api_view(['POST'])
def sendJson(request):

    data = request.data['data']
    option = request.data['option']
    
    result = response(data,option)
    print(result)
    
    return Response({"message": result})

@api_view(['POST'])
def checkGreetings(request):

    data = request.data['data']
    
    result = greetings(data)
    print(result)
    
    return Response({"message": result})