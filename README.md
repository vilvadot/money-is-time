
> “When you buy something, you are not paying for it with money. You’re paying with the hours of life you had to spend earning that money.“ - José Mújica

### Developing

Use `npm run dev` watches for changes and recompiles and zips files after every change.

#### Develop in Firefox

Go to `about:debugging#/runtime/this-firefox` and click **Load Temporary Add-on...** select the zip in /bin/release.zip and you are ready to go.

After each change you will have to press the **Reload** button on the same page for change to take effect.

#### Develop in Chrome

Go to `chrome://extensions/` and toggle **developer mode** press **Load unpacked** and select the /dist folder.

After each change you will have to manually reload the extension by pressing the refresh button in this same page.

---

### How to build the extension

Use `npm run build` to copy and bundle all appropiate files under /dist.

You can run `npm run release` to generate a zipped release under /bin

---

### Credit

* Logo: ( https://thenounproject.com/search/?q=time%20money&i=2976120 )[Money Time by alison from the Noun Project]
* Illustration: Created by Smalllike, Petai Jantrapoon, Vectors Point, azapron, Maxim Kulikov, Pedro