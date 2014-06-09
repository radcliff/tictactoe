var GameCtrl = function($scope){
	console.log("ALERT: game controller initialized");

// instantiate separate square objects
	$scope.squares = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
	console.log($scope.squares.length);

// winning collections
	$scope.win = [
		["1", "2", "3"],
		["4", "5", "6"],
		["7", "8", "9"],
		["1", "4", "7"],
		["2", "5", "8"],
		["3", "6", "9"],
		["1", "5", "9"],
		["3", "5", "7"],
	];

// create two players
	function Player(playerNumber){
		this.playerNumber = playerNumber;
	};

	var playerOne = new Player('one');
	var PlayerTwo = new Player('two');

// give players collections of squares
	playerOne.squares = [];
	PlayerTwo.squares = [];

// start counting turns	
	var turnCount = 1;

	$scope.class = "unplayed";
	
	$scope.playerMove = function(){
// a game can only have 9 turns
		if (turnCount <= 9){
// a square can only be assigned once			
			if (this.class == "unplayed"){
				console.log("TURN: " + turnCount);
// if turn odd set current player to player 1, if even -> player 2
				if (turnCount % 2 === 1){
					currentPlayer = playerOne;
				} else {
					currentPlayer = PlayerTwo;
				};
				console.log(currentPlayer);

				var checkForWin = function(){
					var allPlayedSquares = currentPlayer.squares;
					var passToWinnerChecker = function(array){
						eachWinningCombination = array;
						if(_.intersection(allPlayedSquares, eachWinningCombination).length === 3){
							alert("player "+currentPlayer.playerNumber+" wins!");
						};
					};
					
					_.each($scope.win, passToWinnerChecker);

				};
// add clicked square to current players collection
				currentPlayer.squares.push(this.square);
				console.log(currentPlayer.squares.sort())
				console.log("PLAYER"+currentPlayer.playerNumber + " HAS "+currentPlayer.squares);

// change style of clicked square to player one or two
				console.log("SQUARE ID: " + this.square);
				this.class = currentPlayer.playerNumber;
				checkForWin();

// increment turn
				turnCount++;
			};
		};
	};		
};