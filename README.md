# Nest Connect

In-progress REST API with all basic features real social media has. Open to all contributions during development.

## Getting Started

1. Clone the repository: `git clone https://github.com/saidMounaim/nest-connect.git`
2. Install dependencies: `npm install`
3. Create a .env file in the root and add the following

```
DATABASE_URL=""

JWT_SECRET=""

CLD_CLOUD_NAME=""
CLD_API_KEY=""
CLD_API_SECRET=""
```

## Features:

- registering and logging to user account
- posting photos
- commenting and liking photos
- following system
- all CRUD operations on posts, comments, follows and likes with relevant permissions

## Technology Stack:

- [NestJs](https://nestjs.com/)
- [PassportJs](https://next-auth.js.org/)
- [Prisma](https://www.prisma.io/)

## Default urls:

- Login User : <br>
  localhost:3000/api/auth/login
- Register User : <br>
  localhost:3000/api/auth/register
- Update Password : <br>
  localhost:3000/api/auth/updatePassword

<br>

- Get All Posts : <br>
  localhost:3000/api/posts
- Get Single Post : <br>
  localhost:3000/api/post/:postId
- Create Post : <br>
  localhost:3000/api/posts
- Update Post : <br>
  localhost:3000/api/post/:postId
- Delete Post : <br>
  localhost:3000/api/post/:postId

<br>

- Get All Comments : <br>
  localhost:3000/api/comments
- Add Comment : <br>
  localhost:3000/api/post/:postId/comments
- Update Comment : <br>
  localhost:3000/api/comment/:commentId
- Delete Post : <br>
  localhost:3000/api/comment/:commentId

<br>

- Get All Users : <br>
  localhost:3000/api/users
- Get Single User : <br>
  localhost:3000/api/user/:userId
- Search User : <br>
  localhost:3000/api/users?search=john

## Contribution

All kind of contributions are welcome, please feel free to submit pull requests.

- Version: 1.0.0
- License: MIT
- Author: Said Mounaim
