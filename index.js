const search = document.getElementById("search");
const matchList = document.getElementById("match-list");
const menu = document.getElementById("menu");
const searchlabel = document.getElementById("searchlabel");
let data;
let theId;
let colors = ["primary", "success", "info", "Warning", "danger"];
// const files = ["towns-states-germany.json"];
const menuItems = [
  {
    txt: "Countries and Capitals",
    filename: "cap_countries",
    props: ["country", "capital"]
  },
  {
    txt: "US states and capital",
    filename: "states",
    props: ["name", "capital", "abbr"]
  },
  {
    txt: "US states and largest cities",
    filename: "us_states_largest_cities",
    props: ["state", "city", "city2", "city3"]
  },
  {
    txt: "German towns",
    filename: "towns-states-germany",
    props: ["Stadt", "Land", "Einwohner", "Position"]
  },
  {
    txt: "German vehicle number plates",
    filename: "kfz-kennz-d",
    props: ["kennzeichen", "stadt", "land"]
  },
  {
    txt: "Chemical Elements",
    filename: "chem_elements",
    props: ["element", "symbol", "at_num"]
  }
];

//add 'selection-menu'
const showSelectionMenu = () => {
  const html = menuItems
    .map(
      (item, idx) =>
        `<li id="${idx}"class="list-group-item mb-1">${item.txt}</li>`
    )
    .join("");
  menu.innerHTML = html;
  menu.addEventListener("click", e => init(e.target.id));
};

const getdata = async file => {
  // const res = await fetch("../data/data.json");
  const res = await fetch(`../data/${file}.json`);
  return await res.json();
};

const searchdata = searchText => {
  // Get matches to current text input
  let matches = data.filter(el => {
    const regex = new RegExp(`^${searchText}`, "gi");
    // return state.name.match(regex) || state.abbr.match(regex);
    return el[menuItems[theId].props[0]].match(regex);
  });
  // Clear when input or matches are empty
  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }
  outputHtml(matches);
};

const outputHtml = (matches, id) => {
  let txtstringBegin = ``;
  let txtstringEnd = ``;
  const propsarray = menuItems[theId].props;
  let cardtext = "";

  if (matches.length > 0) {
    for (let index = 0; index < matches.length; index++) {
      let element = matches[index];
      cardtext += `<div class="card card-body mb-1"><h4> `;
      for (let index1 = 0; index1 < propsarray.length; index1++) {
        let prop = propsarray[index1];
        cardtext += `<span class="text-${colors[index1]}">${
          element[prop]
        }, </span>`;
      }
      cardtext = cardtext.slice(0, cardtext.length - 9); // trick to remove the last comma
      cardtext += `</span></h4></div>`;
    }
  }
  matchList.innerHTML = txtstringBegin + cardtext + txtstringEnd;
};

// Init id and data
function init(id) {
  matchList.innerHTML = "";
  search.value = "";
  theId = +id;
  searchlabel.innerHTML = menuItems[theId].txt;
  console.log(menuItems[theId].filename);
  getdata(menuItems[theId].filename).then(thedata => (data = thedata));
}

window.addEventListener("DOMContentLoaded", showSelectionMenu);
search.addEventListener("input", () => searchdata(search.value));
