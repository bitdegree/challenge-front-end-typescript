# Project Details
This project created with angular 2+ framework, used bootstrap for visuality
## How to Run
1. First of all you need to install node modules, to do that you have to use the 'npm install' command on blog folder with a terminal
2. Then 'ng serve' command will be sufficient for run this project. Project will be hosted at 4200 port, therefore you can check the site from 'http://localhost:4200/'

## Additional Commands
Of course you can use any command that angular supports initially, like 'ng build'.

## Personel Notes
I didn't use any UI component libraries because I didn't want to put such a heavy burden to this kind of project. I used bootstrap and try to developed as much as lightweight I could, because I can write my own components if I have to, I just didn't want to be dependent to libraries in this project. 


# Task for Front End Developer (TypeScript)


## First steps
1. Fork this repo
2. Create a single-page application for a blogging website with Angular 2+ (or other JavaScript framework)
4. Use TypeScript if your framework of choice supports it
5. Prepare a pull request and let us know that you are done


## General guidelines
* Use common sense and don't spend too much time on a single task if you get stuck
* This task might not specify every single detail of how it should be implemented. When in doubt, improvise and go with a solution that you think would work best for a project like this


## Requirements
* Use the latest version of Angular
* Use the API to retrieve data (details below)
* Make sure the app is responsive and looks clean
* Use components where applicable


<strong>Keep in mind that candidates who used TS  and/ or Angular 2+ will have an upper hand during the initial filtering.</strong>

## Functional requirements
The website should have the following pages (components):

**Homepage**

Should contain a list of all blog posts.

**Post page**

Should contain post title, full-content, post author details, a link to the post's edit page.

**Post creation page**

Should contain a form for creating a new post. It should have 2 inputs: title and post body. Once the form is submitted it should make a `POST` request to a corresponding API endpoint with all inputs in the request body.

**Post edit page**

The form should be the same as with post creation. The only difference is that inputs should be pre-filled and that the app should run a `PUT` request to another endpoint.

## API guidelines
Use this API service that provides random data for a blog project like this:
https://jsonplaceholder.typicode.com/

For example, to retrieve a list of all available posts you would run a `GET` request to the following URL:
```
https://jsonplaceholder.typicode.com/posts
```
Similarly, you would run a `PUT` request to the following URL to update a post with an ID of `3`:
```
https://jsonplaceholder.typicode.com/posts/3
```

Please note that when updating or creating new entries, the API might not save the changes. That is fine as long as you make the necessary `POST` / `PUT` requests.

### Few tips
- We always prefer the code that is robust, easy to read and re-usable
- Make design user friendly
- Have fun!
