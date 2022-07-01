@ ME !! -- I have developed this application to learn Planetscale database service platform with addition to write my first blog post. I would like to invite every reader to review my code and add your lively comments. Please get in touch @ Twitter

* Clone the repo from - 
> ```https://github.com/obulareddyveera/quick-retro-board```
* Create & setup Planetscale account.
* Configure .env constants - 
  - PLANETSCALE_PRISMA_DATABASE_URL - Planetscale URL.
  - HOST_NAME: with Next.JS to perform API call and inject response as props to the component we need to perform API calls with absolute URL, to build absolute URL application uses HOST_NAME.
  - JWT_SECRET_KEY: application generates JWT token with passcode combination. In the process of generating token application uses JWT_SECRET_KEY

## Kick Start - Quick Retro Board
Application launches with retrospective selection screen providing either create new retro team or join previously registered retro team by submitting relative passcode.
* At pages folder index.js, presents the launch screen as default route "/".
![QuickRetroBoard Launch Screen](https://github.com/obulareddyveera/quick-retro-board/blob/main/showcase/quickRetoBoard_1.png?raw=true)
* After selecting retro with passcode the application redirects to join retro screen allowing users to register or select by identity to join retro.
![QuickRetroBoard Member board Screen](https://github.com/obulareddyveera/quick-retro-board/blob/main/showcase/quickRetoBoard_3.png?raw=true)
* Once user joins the retro, application navigates to retro board screen allowing users to pen their scrum experiences. The retro board displays a refresh options to update board with other user comments.
![QuickRetroBoard](https://github.com/obulareddyveera/quick-retro-board/blob/main/showcase/quickRetoBoard_4.png?raw=true)
