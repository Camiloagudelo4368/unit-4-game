
var _charactersList = []
function newCharacterObject() {
    return {
        id: 0,
        name: "",
        healtPoints: 0,
        attackPower: 0,
        url: ""
    }
}

_character = new newCharacterObject();

_character.id = 1;
_character.name = "Iori";
_character.healtPoints = 150;
_character.attackPower = 6;
_character.url = 'assets/images/iori.gif'

_charactersList.push(_character)

// ------------------------------------------------------

_character = new newCharacterObject();

_character.id = 2;
_character.name = "Choi";
_character.healtPoints = 120;
_character.attackPower = 2;
_character.url = 'assets/images/choi.gif'

_charactersList.push(_character)

// ------------------------------------------------------

_character = new newCharacterObject();

_character.id = 3;
_character.name = "Terry";
_character.healtPoints = 100;
_character.attackPower = 4;
_character.url = 'assets/images/terry.gif'

_charactersList.push(_character)

// ------------------------------------------------------

_character = new newCharacterObject();

_character.id = 4;
_character.name = "Kyo";
_character.healtPoints = 135;
_character.attackPower = 5;
_character.url = 'assets/images/kyo.gif'

_charactersList.push(_character)


// New object to store the result of the function
var _characterResult = new newCharacterObject();

// Function to find the city by id, returns a object city
function GetCharacterById(_id) {
    _charactersList.forEach(function (_characterItem) {
        if (_characterItem.id == _id) {
            _characterResult.id = _characterItem.id,
                _characterResult.name = _characterItem.name,
                _characterResult.healtPoints = _characterItem.healtPoints,
                _characterResult.attackPower = _characterItem.attackPower,
                _characterResult.url = _characterItem.url
        }
    });
}

var winsCounter = 0;
var _playerSelectCounter = 0
var _div_char = [];
var _imageStatus = "start";

var _playerDivId = "";
var _defenderDivId = "";

var _playerPCounterId = "";
var _defenderPCounterId = "";

var _playerAttackCounter = 0;
var _defenderAttackCounter = 0;

var _staticPlayerHealtPoints = 0;
var _staticDefenderHealtPoints = 0;

var _playerHealtPoints = 0;
var _defenderHealtPoints = 0;

var _playerId = 0;
var _defenderId = 0;

var _playerAttackPower = 0;
var _defenderAttackPower = 0;


function start() {
    _charactersList.forEach(function (_characterItem) {

        var _div = $("<div>");
        var _p1 = $("<p class ='pText1'>");
        var _img = $("<img>");
        var _p2 = $("<p class ='pText2'>");

        _div.addClass("divImageCharacters");
        _div.attr("id", "div" + _characterItem.id);

        _p1.text(_characterItem.name);

        _img.attr("src", _characterItem.url);
        _img.attr("id", _characterItem.id);
        _img.attr("data-status", "start");
        _img.addClass("characterImage col");

        _p2.attr("id", "p" + _characterItem.id);
        _p2.text(_characterItem.healtPoints);

        _div.append(_p1);
        _div.append(_img);
        _div.append(_p2);


        $("#_characters").append(_div)
        _div_char.push(_div);
    });

    _imageStatus = "start";
    $("#playerWinLabel").css("opacity", "0")
    $("#defenderWinLabel").css("opacity", "0")
    $("#attack").css("display", "none");
    $("#reset").css("display", "none");

}

start();

function deleteImage() {
    _div_char.forEach(function (_characterItem) {

        var _character = ($(_characterItem).attr("id"));

        if (("div" + _characterResult.id) === _character) {
            $("#" + _character).empty();
            $("#" + _character).css("border", "none");

        }

    })
}

$(".characterImage").on("click", function (event) {

    if (_imageStatus === "start") {

        var _imageId = ($(this).attr("id"));
        GetCharacterById(_imageId);


        var _div = $("<div>");
        // var _h1 = $("<h1>")
        var _p1 = $("<p class ='pText1'>");
        var _img = $("<img>");
        var _p2 = $("<p class ='pText2'>");

        var _divId = "div" + parseInt(_characterResult.id + 10)
        _div.addClass("divImagePlayer");
        _div.attr("id", _characterResult.id);

        _p1.text(_characterResult.name);

        _img.attr("src", _characterResult.url);
        _img.attr("id", _divId);
        _img.attr("data-status", "player");
        _img.addClass("characterImage col");

        var _pId = "p" + _divId
        _p2.attr("id", _pId);
        _p2.text(_characterResult.healtPoints);

        _div.append(_p1);
        _div.append(_img);
        _div.append(_p2);

        _defenderDivId = _divId;
        $("#player").append(_div)

        _imageStatus = "player";
        _playerDivId = _divId;
        _playerId = _imageId;
        _playerPCounterId = _pId
        _playerAttackPower = _characterResult.attackPower;
        _playerHealtPoints = _characterResult.healtPoints;
        _staticPlayerHealtPoints = _characterResult.healtPoints;
        deleteImage();

    } else if (_imageStatus === "player" && $("#defender").text("")) {
        var _imageId = ($(this).attr("id"));
        GetCharacterById(_imageId);


        var _div = $("<div>");
        var _p1 = $("<p class ='pText1'>");
        var _img = $("<img>");
        var _p2 = $("<p class ='pText2'>");

        var _divId = "div" + parseInt(_characterResult.id + 10)
        _div.addClass("divImagePlayer");
        _div.attr("id", _characterResult.id);

        _p1.text(_characterResult.name);

        _img.attr("src", _characterResult.url);
        _img.attr("id", _divId);
        _img.attr("data-status", "player");
        _img.addClass("characterImage col");

        var _pId = "p" + _divId
        _p2.attr("id", _pId);
        _p2.text(_characterResult.healtPoints);

        _div.append(_p1);
        _div.append(_img);
        _div.append(_p2);

        _defenderDivId = _divId;
        $("#defender").append(_div)

        _imageStatus = "battle";
        _playerDivId = _divId;
        _playerId = _imageId;

        _defenderPCounterId = _pId;

        _defenderAttackPower = _characterResult.attackPower;
        _defenderHealtPoints = _characterResult.healtPoints;
        _staticDefenderHealtPoints = _characterResult.healtPoints;

        deleteImage();
        _defenderAttackCounter = 0;
        _playerHealtPoints = _staticPlayerHealtPoints;
        $("#attack").css("display", "block");
    }
});

$("#attack").on("click", function () {

    if (_imageStatus === "battle") {

        // Player attacks
        _playerAttackCounter += _playerAttackPower;
        _defenderHealtPoints -= _playerAttackCounter

        $("#" + _defenderPCounterId).text(_defenderHealtPoints)

        //defender attacks
        _defenderAttackCounter = _defenderAttackPower
        _playerHealtPoints -= _defenderAttackCounter

        $("#" + _playerPCounterId).text(_playerHealtPoints)

        if (_playerHealtPoints > 0) {

            if (_defenderHealtPoints <= 0) {
                // you win, shoe the label
                $("#playerWinLabel").css("opacity", "1")
                winsCounter++;
                // reset the number of help points
                $("#" + _playerPCounterId).text(_staticPlayerHealtPoints);
                $("#defender").empty();

                // _imageStatus = "battle";
                _imageStatus = "player"
                if (winsCounter === 3) {

                    $("#reset").css("display", "block");
                    $("#attack").css("display", "none");
                    $("#playerWinLabel").css("opacity", "1")
                    $("#defenderWinLabel").css("opacity", "1")
                    
                }
            }
        }
        else if (_playerHealtPoints <= 0) {
            // you losse
            // $("#defenderWinLabel").css("opacity", 1);
            $("#playerWinLabel").text("You losse !!!");
            $("#playerWinLabel").css("opacity", "1")
            $("#defenderWinLabel").css("opacity", "1")
            $("#reset").css("display", "none");

            // _imageStatus = "losse"
            // $("#player").empty();
            $("#reset").css("display", "block");
            $("#attack").css("display", "none");
        }
    }


});

$("#reset").on("click", function () {
    location.reload();

});