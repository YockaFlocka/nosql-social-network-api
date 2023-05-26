# NoSQL: Social Network API

## Your Task

Build an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list using mongoose and express packages.

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Mock Up

[Demo of GET, POST, PUT, and DELETE routes for User and Thought Models](https://drive.google.com/file/d/1fCmohNP9MwE9g1IPEpmhHdmt77yIecIe/view)

[Demo of POST and DELETE routes for User friends and Thought reactions](https://drive.google.com/file/d/1gHHLqoEGZs9D7VjL3SD23tBUUxdxyyer/view)