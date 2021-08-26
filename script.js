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
