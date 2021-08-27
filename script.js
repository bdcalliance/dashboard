$(document).ready(() => {
    const firebaseConfig = {
        apiKey: "AIzaSyBish5rWRtR5qplbJYgq-s8V89Md6kQn7g",
        authDomain: "amantani-partners.firebaseapp.com",
        projectId: "amantani-partners",
        storageBucket: "amantani-partners.appspot.com",
        messagingSenderId: "611645040175",
        appId: "1:611645040175:web:4d9fde975aafa1485788da",
        measurementId: "G-P0XK4KR3YN",
    };
    firebase.initializeApp(firebaseConfig);
});

/* Alliance */

function load() {
    firebase
        .database()
        .ref("/alliance")
        .once("value")
        .then((snapshot) => {
            if (snapshot.val()) {
                let alliance = snapshot.val();
                window.alliance = alliance;
                draw();
            }
        });
}

function draw() {
    $("#alliance").empty();

    window.alliance.forEach((alli, i) => {
        $("#alliance").append(`
        <div class="ui segment" sid="${i}" >
            <h4 class="ui header" onclick="clicked(${i})">${alli.Title}</h4>
            <div class="more" style="display: none">
                <p>URL: ${alli.URL}</p>
                <p>Logo: ${alli.Logo}</p>
                <button class="ui icon button upBtn" onclick="upclick(${i})">
                Move <i class="angle up icon"></i>
                </button>
                <button class="ui icon button downBtn" onclick="downclick(${i})">
                Move <i class="angle down icon"></i>
                </button>
                <button class="ui icon button" onclick="insertup(${i})">
                Insert <i class="caret square up icon"></i>
                </button>
                <button class="ui icon button" onclick="insertdown(${i})">
                Insert <i class="caret square down icon"></i>
                </button>
                <button class="ui icon button" onclick="edit(${i})">
                Edit <i class="edit icon"></i>
                </button>
                <button class="ui icon button" onclick="remove(${i})">
                Delete <i class="trash icon"></i>
                </button>
            </div>
            <div id="form" class="ui segment" style="display:none">
                <div class="field">
                    <label>Title</label>
                    <input type="text" name="title${i}" placeholder="Title">
                </div>
                <div class="field">
                    <label>URL</label>
                    <input type="text" name="url${i}" placeholder="URL">
                </div>
                <div class="field">
                    <label>Logo</label>
                    <input type="text" name="logo${i}" placeholder="Logo">
                </div>
                <button class="ui button">Apply</button>
            </div>
        </div>`);
    });
    $(`[sid="${0}"] > .more > .upBtn`).addClass("disabled");
    $(`[sid="${window.alliance.length - 1}"] > .more > .downBtn`).addClass("disabled");
}

function save() {
    firebase.database().ref("/alliance").set(window.alliance);
    console.log(window.alliance);
    console.log("saved");
}

function clicked(i) {
    let elem = $(`div[sid="${i}"] > .more`);
    if (elem.css("display") === "none") {
        elem.css("display", "block");
    } else if (elem.css("display") === "block") {
        elem.css("display", "none");
    }
}

function upclick(i) {
    if (i === 0) return;

    let temp = window.alliance[i - 1];
    window.alliance[i - 1] = window.alliance[i];
    window.alliance[i] = temp;

    draw();
}

function downclick(i) {
    if (i === window.alliance.length - 1) return;

    let temp = window.alliance[i + 1];
    window.alliance[i + 1] = window.alliance[i];
    window.alliance[i] = temp;

    draw();
}

function insertup(i) {
    let elem = $(`div[sid="${i}"] > #form`);
    if (elem.css("display") === "none") {
        $(`div[sid="${i}"] > #form > button`).click(() => {
            window.alliance.splice(i, 0, {
                Title: $(`input[name="title${i}"]`).val(),
                Logo: $(`input[name="logo${i}"]`).val(),
                URL: $(`input[name="url${i}"]`).val(),
            });

            draw();
        });
        elem.css("display", "block");
    } else if (elem.css("display") === "block") {
        elem.css("display", "none");
    }
}

function insertdown(i) {
    let elem = $(`div[sid="${i}"] > #form`);
    if (elem.css("display") === "none") {
        $(`div[sid="${i}"] > #form > button`).click(() => {
            window.alliance.splice(i + 1, 0, {
                Title: $(`input[name="title${i}"]`).val(),
                Logo: $(`input[name="logo${i}"]`).val(),
                URL: $(`input[name="url${i}"]`).val(),
            });

            draw();
        });
        elem.css("display", "block");
    } else if (elem.css("display") === "block") {
        elem.css("display", "none");
    }
}

function edit(i) {
    let elem = $(`div[sid="${i}"] > #form`);
    if (elem.css("display") === "none") {
        $(`div[sid="${i}"] > #form > button`).click(() => {
            window.alliance[i] = {
                Title: $(`input[name="title${i}"]`).val(),
                Logo: $(`input[name="logo${i}"]`).val(),
                URL: $(`input[name="url${i}"]`).val(),
            };

            draw();
        });
        $(`input[name="title${i}"]`).val(window.alliance[i].Title);
        $(`input[name="logo${i}"]`).val(window.alliance[i].Logo);
        $(`input[name="url${i}"]`).val(window.alliance[i].URL);
        elem.css("display", "block");
    } else if (elem.css("display") === "block") {
        elem.css("display", "none");
    }
}

function remove(i) {
    window.alliance.splice(i, 1);
    draw();
}

/* People */

function loadPeople() {
    firebase
        .database()
        .ref("/people")
        .once("value")
        .then((snapshot) => {
            if (snapshot.val()) {
                let people = snapshot.val();
                window.people = people;
                drawPeople();
            }
        });
}

function drawPeople() {
    $("#people").empty();

    window.people.forEach((person, i) => {
        $("#people").append(`
        <div class="ui segment" pid="${i}" >
            <h4 class="ui header" onclick="clickedPeople(${i})">${person.Name}</h4>
            <div class="more" style="display: none">
                <p>Profile: ${person.Profile}</p>
                <p>Position: ${person.Description}</p>
                <button class="ui icon button upBtn" onclick="upclickPeople(${i})">
                Move <i class="angle up icon"></i>
                </button>
                <button class="ui icon button downBtn" onclick="downclickPeople(${i})">
                Move <i class="angle down icon"></i>
                </button>
                <button class="ui icon button" onclick="insertupPeople(${i})">
                Insert <i class="caret square up icon"></i>
                </button>
                <button class="ui icon button" onclick="insertdownPeople(${i})">
                Insert <i class="caret square down icon"></i>
                </button>
                <button class="ui icon button" onclick="editPeople(${i})">
                Edit <i class="edit icon"></i>
                </button>
                <button class="ui icon button" onclick="removePeople(${i})">
                Delete <i class="trash icon"></i>
                </button>
            </div>
            <div id="form" class="ui segment" style="display:none">
                <div class="field">
                    <label>Name</label>
                    <input type="text" name="name${i}" placeholder="Name">
                </div>
                <div class="field">
                    <label>Profile</label>
                    <input type="text" name="profile${i}" placeholder="Profile">
                </div>
                <div class="field">
                    <label>Position</label>
                    <input type="text" name="description${i}" placeholder="Position">
                </div>
                <button class="ui button">Apply</button>
            </div>
        </div>`);
    });
    $(`[pid="${0}"] > .more > .upBtn`).addClass("disabled");
    $(`[pid="${window.alliance.length - 1}"] > .more > .downBtn`).addClass("disabled");
}

function savePeople() {
    firebase.database().ref("/people").set(window.people);
    console.log(window.people);
    console.log("saved");
}

function clickedPeople(i) {
    let elem = $(`div[pid="${i}"] > .more`);
    if (elem.css("display") === "none") {
        elem.css("display", "block");
    } else if (elem.css("display") === "block") {
        elem.css("display", "none");
    }
}

function upclickPeople(i) {
    if (i === 0) return;

    let temp = window.people[i - 1];
    window.people[i - 1] = window.people[i];
    window.people[i] = temp;

    drawPeople();
}

function downclickPeople(i) {
    if (i === window.people.length - 1) return;

    let temp = window.people[i + 1];
    window.people[i + 1] = window.people[i];
    window.people[i] = temp;

    drawPeople();
}

function insertupPeople(i) {
    let elem = $(`div[pid="${i}"] > #form`);
    if (elem.css("display") === "none") {
        $(`div[pid="${i}"] > #form > button`).click(() => {
            window.people.splice(i, 0, {
                Name: $(`input[name="name${i}"]`).val(),
                Profile: $(`input[name="profile${i}"]`).val(),
                Description: $(`input[name="description${i}"]`).val(),
            });

            drawPeople();
        });
        elem.css("display", "block");
    } else if (elem.css("display") === "block") {
        elem.css("display", "none");
    }
}

function insertdownPeople(i) {
    let elem = $(`div[pid="${i}"] > #form`);
    if (elem.css("display") === "none") {
        $(`div[pid="${i}"] > #form > button`).click(() => {
            window.people.splice(i + 1, 0, {
                Name: $(`input[name="name${i}"]`).val(),
                Profile: $(`input[name="profile${i}"]`).val(),
                Description: $(`input[name="description${i}"]`).val(),
            });

            drawPeople();
        });
        elem.css("display", "block");
    } else if (elem.css("display") === "block") {
        elem.css("display", "none");
    }
}

function editPeople(i) {
    let elem = $(`div[pid="${i}"] > #form`);
    if (elem.css("display") === "none") {
        $(`div[pid="${i}"] > #form > button`).click(() => {
            window.people[i] = {
                Name: $(`input[name="name${i}"]`).val(),
                Profile: $(`input[name="profile${i}"]`).val(),
                Description: $(`input[name="description${i}"]`).val(),
            };

            drawPeople();
        });
        $(`input[name="name${i}"]`).val(window.people[i].Name);
        $(`input[name="profile${i}"]`).val(window.people[i].Profile);
        $(`input[name="description${i}"]`).val(window.people[i].Description);
        elem.css("display", "block");
    } else if (elem.css("display") === "block") {
        elem.css("display", "none");
    }
}

function removePeople(i) {
    window.people.splice(i, 1);
    drawPeople();
}
