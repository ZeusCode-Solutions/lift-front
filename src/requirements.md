What is the vision of this product?
A revamped version of can-of-books. I want to create something that is simple to use, simple to read. I dont need anything flashy just the cold hard data so the user can move forward every workout.

What pain point does this project solve?
Remembering what you did in your last workout and how you should progress for your new workout can be difficult. i want to build an app that allows someone to look at their past workouts so they can make an incremental change to progress. By doing this I can solve my own pain point of looking through my 100's of notes finding my workouts having to write everything in each week and updating the new numbers.

Why should we care about your product?
    Progression is the most fundamental aspect of going to they gym. if you want to progress in any aspect of fitness, you need to know where you've been, and how you can beat your past self. This app helps you track those simple metrics to ensure you get better week to week.


Scope In
    Post wporkouts
    Edit Workouts
    Delete workouts
    Update workouts with new numbers
    Tell user how to use App
    Sign in to their own account

Scope Out
    Will not write workouts
    Give suggestions for workouts
    Will not suggest progressions in workouts


What will your MVP functionality be?
    Post Workouts and Scroll through past workouts
    Be a notes app for workouts

What are your stretch goals?
    Collect data
    rewrite workouts

An admin can create and delete user accounts
A user can scroll through old workouts
A user can search workouts

Data Flow:
    the user will log in. the app will call the database for info based off of user email. the database will send the app all the workouts for this user. When click to add a new workout the backend will use POST to create the workout following the data schema, assuming the user fills all required info. Once posted. The new workout will be added to the data carousel. the delete and edit funtions will both use the same path, finding the workout by id and making any new changes. 
Non-Functional Requirements
    Security
        I'm going to be using Auth0. This will be important for a few reasons. First so that I can find an access each movement but second so that I am keepiung everyones data secure. i do not want people to have their workouts available to everyone.
    Testability
        This app is going to need some work with ThunderClient. I need my backend to have accurate paths so that I can change the data I need at each moment. By using Thunderclient I can ensure I am passing the correct Pathways. I can also use console logs on my backend to make sure I am getting into each route.