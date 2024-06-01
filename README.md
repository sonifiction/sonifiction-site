## Developing site:

1 - Clone repo (you'll need git or something for this)
2 - Install Node (you can use homebrew for this if you like, more info covered in the following: https://www.gatsbyjs.com/docs/tutorial/getting-started/part-0/ )
3 - Navigate to the repo root folder, run `npm install` (this should add all the project dependencies to the local folder)
4 - Install Gatsby-cli globally (or run all Gatsby commands using npx – tools like autonpx: https://marketplace.visualstudio.com/items?itemName=antfu.auto-npx are great for this)
5 - Run `gatsby develop`
 

## Deploying on GitHub pages:

https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/how-gatsby-works-with-github-pages/


## Adding Content:

To add new pages with markdown, add them to the gatsby node query, as well as the appropriate folder. Then pick a template which they will load based off, and update that route in the bottom of the gatsby-node file
