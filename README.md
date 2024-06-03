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


# Utilities

## Dithering

dither_images.py recursively traverses folders and creates dithered versions of the images it finds. These are stored in the same folder as the images in a folder called "dithers".

### Installation & Depedencies

depends on Pillow and hitherdither

`pip install Pillow git+https://www.github.com/hbldh/hitherdither`

### Usage:

Dither all the images found in the subdirectories of content `python3 utils/dither_images.py --directory src/content/`

Colorize the dithers as well based on the LTM categories: `python3 utils/dither_images.py --directory src/content/ --colorize`

Run the script with more debug output: `python3 utils/dither_images.py --directory src/content/ --colorize --verbose`

Remove all dithered files in the subdirectories of content: `python3 utils/dither_images.py --remove --directory src/content/`

Then: run script to replace all image references with dithered versions (markdown and html in md files) `python3 utils/replace_dither_links.py src/content`