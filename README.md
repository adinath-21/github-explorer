# GitHub Developer Explorer

## Overview

GitHub Developer Explorer is a web application that allows users to search for any GitHub profile and view developer information using the GitHub REST API.

The application displays profile details, repository information, language statistics, and allows repositories to be sorted by star count.

## Features

- Search GitHub users by username
- View profile information
  - Profile Picture
  - Name
  - Followers
  - Following
  - Public Repositories
- Display user repositories
- Sort repositories by stars
- Show language breakdown statistics
- Handle invalid usernames
- Handle GitHub API rate limit errors
- Responsive dark-themed interface

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- GitHub REST API

## JavaScript Concepts Used

- DOM Manipulation
- Event Listeners
- Fetch API
- Async/Await
- Template Literals
- Array Methods
  - map()
  - sort()
  - reduce()
- Error Handling (try...catch)

## GitHub API Endpoints Used

### User Profile

https://api.github.com/users/{username}

### User Repositories

https://api.github.com/users/{username}/repos

## How to Run

1. Clone the repository
2. Open index.html in a browser
3. Enter a GitHub username
4. Click Search

## Author

Adi

## License

Educational Project
