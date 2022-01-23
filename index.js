const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const cors = require('cors');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))


const fs = require('fs');

function mkdir(depth) {
    for (h=0; h<=depth; h++) {
        let x = ""
        for (i=0; i <= h; i++) {
            x += i.toString()
        }
        x = x.split('')
        x = allPossibleCombinations(x, (h + 1), '');
        for (i=(x.length - 1); i >= 0; i--) {
            nlength = x[i].toString().length - 1
            for (j=0; j < nlength; j++) {
                if (Number(x[i][j]) > j && x[i] !== " ") {
                    x.splice(i, 1, " ")
                }
            }
        }
        x = x.filter(function(value, index, arr) {
            if (value !== " ") {
                return value;
            }
        })
        for (i=0; i < x.length; i++) {
            let targetDir = "./" + x[i].match(/.{1}/g).join("/") + "/";
            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
            }
            if (!fs.existsSync(targetDir + "path.txt")) {
                fs.writeFileSync(targetDir + 'path.txt', targetDir);
            }
        }
    }
}

function allPossibleCombinations(input, length, curstr) {
    if(curstr.length == length) return [ curstr ];
    var ret = [];
    for(var i = 0; i < input.length; i++) {
        ret.push.apply(ret, allPossibleCombinations(input, length, curstr + input[i]));
    }
    return ret;
}
mkdir(6);

app.get("/", (req, res) => {
  res.send("Running geinus server");
});

app.listen(port, (req, res) => {
  console.log("running geinus server on port ", port);
});