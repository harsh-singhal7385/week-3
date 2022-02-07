class QueenAttackProblem {
    
    constructor() {
        this.firstQueen = {
            x: 0,
            y: 0
        }
        this.secondQueen = {
            x: 0,
            y: 0
        }
        this.matrix = {
            x: 7,
            y: 7
        }
    }

    setFirstQueen(x, y) {
        this.firstQueen.x = x
        this.firstQueen.y = y
    }
    setSecondQueen(x, y) {
        this.secondQueen.x = x
        this.secondQueen.y = y
    }

    getQueensFromProblem() {
        return [this.firstQueen, this.secondQueen]
    }

    checkHorizontal() {
        if (this.firstQueen.y === this.secondQueen.y) { return true }
        else { return false }
    }
    checkVertical() {
        if (this.firstQueen.x === this.secondQueen.x) { return true }
        else { return false }
    }
    checkDiagonal() {
        let x = this.firstQueen.x-1
        let y = this.firstQueen.y-1

        //checking left top condition

        console.log("We are at left top")
        while (x >= 0 && y >= 0) {

            if (x === this.secondQueen.x && y === this.secondQueen.y) {
                console.log("here")
                return true
            }

            x -= 1
            y -= 1
        }

        x = this.firstQueen.x-1
        y = this.firstQueen.y+1

        // checking left bottom condition

        console.log("We are at left bottom")
        while (x >= 0 && y <= this.matrix.y) {

            console.log(x, y)
            if (x === this.secondQueen.x && y === this.secondQueen.y) {
                return true
            }

            x -= 1
            y += 1
        }

        x = this.firstQueen.x+1
        y = this.firstQueen.y-1

        // checking right top condition

        console.log("We are at right top")
        while (x <= this.matrix.x && y >= 0) {

            console.log(x, y)
            if (x === this.secondQueen.x && y === this.secondQueen.y) {
                return true
            }

            x += 1
            y -= 1
        }

        x = this.firstQueen.x + 1
        y = this.firstQueen.y + 1

        //checking right bottom condition


        console.log("We are at right bottom")
        while (x <= this.matrix.x && y <= this.matrix.y) {
            console.log(x, y)
            if (x === this.secondQueen.x && y === this.secondQueen.y) {
                return true
            }
            x += 1
            y += 1
        }

        return false
    }

    possibilityOfAttack() {
        return this.checkHorizontal() || this.checkVertical() || this.checkDiagonal()
    }
}



async function getQueenOutput() {
    let x1,y1,x2,y2;
    
    x1 = ""   // take user input here for x1
    y1 = ""   // take user input here for y1
    x2 = ""   // take user input here for x2
    y2 = ""   // take user input here for y2
    
    let queen_attack_problem = new QueenAttackProblem();
    
    queen_attack_problem.setFirstQueen(x1 , y1);
    queen_attack_problem.setSecondQueen(x2 , y2);
    
    console.log(queen_attack_problem.getQueensFromProblem());
    console.log(queen_attack_problem.possibilityOfAttack());
    let output;
    await (output = queen_attack_problem.possibilityOfAttack());
    console.log(output);
}

getQueenOutput()
