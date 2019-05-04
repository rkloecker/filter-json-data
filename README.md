## Filter json files

### use fetch from local data folder

### how to use: add a data folder with json.files

### generic solution, minimal configuration

### in index.js: add to 'menuItems' e.g.

menuItems = [
  {
    txt: "Description ...",
    filename: "name_of_jsonfile_without_extension",
    props: ["prop1", "prop2"]
  },
  ...
]

where prop1 is the filtered prop

Inspired by Brad Traversy - https://www.youtube.com/watch?v=1iysNUrI3lw