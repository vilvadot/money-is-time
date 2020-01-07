# Money is Time

<img width="450" src="https://user-images.githubusercontent.com/8507571/71910068-80314700-3171-11ea-91a9-52ed5d772282.png"/>

> “When you buy something, you are not paying for it with money. You’re paying with the hours of life you had to spend earning that money.“ - José Mújica

### Developing

Use `npm run dev` to run a daemon that will watch for changes and recompile and zip files after each change

#### Using with Firefox

Go to `about:debugging#/runtime/this-firefox` and click **Load Temporary Add-on...** select the zip in /bin/release.zip and you are ready to go.

After each change you will have to press the **Reload** button on the same page for change to take effect.

<img width="450" alt="Screenshot 2020-01-07 at 17 14 30" src="https://user-images.githubusercontent.com/8507571/71910073-81fb0a80-3171-11ea-8e90-8672261e1676.png">

#### Using with Chrome

Go to `chrome://extensions/` and toggle **developer mode** press **Load unpacked** and select the /dist folder.

After each change you will have to manually reload the extension by pressing the refresh button in this same page.

<img width="450" alt="Screenshot 2020-01-07 at 17 14 13" src="https://user-images.githubusercontent.com/8507571/71910075-8293a100-3171-11ea-8564-48d5fdad4ea3.png">

### How to build the extension

Use `npm run build` to copy and bundle all appropiate files under /dist.
You can run `npm run release` to generate a zipped release under /bin

### Credit

* Logo: (https://thenounproject.com/search/?q=time%20money&i=2976120)[Money Time by alison from the Noun Project]
* Illustration: Created by Smalllike, Petai Jantrapoon, Vectors Point, azapron, Maxim Kulikov, Pedro
