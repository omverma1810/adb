from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json
import os
from pymongo import MongoClient

mongo_uri = "mongodb+srv://omverma:omverma@cluster0.uqrpqft.mongodb.net/"

db = MongoClient(mongo_uri)['test_db']

class TodoListView(APIView):

    def get(self, request):
        # Retrieve all todo items from the "todo_items" collection
        todo_items = db.todo_items.find()

        # Convert the MongoDB documents to a list of dictionaries
        todos = []
        for item in todo_items:
            todo = {
                'id': str(item['_id']),
                'title': item['title'],
            }
            todos.append(todo)

        # Return the list of todo items
        return Response(todos, status=status.HTTP_200_OK)

    def post(self, request):
        # Accept a todo item in the request data
        todo_item = request.data

        # Persist the todo item in the "todo_items" collection
        result = db.todo_items.insert_one(todo_item)

        # Return the ID of the inserted document
        response_data = {
            'id': str(result.inserted_id)
        }

        return Response(response_data, status=status.HTTP_201_CREATED)
