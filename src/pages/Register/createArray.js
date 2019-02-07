var numList = [];
for (var i = 48; i <= 57; i++) {
    var code = String.fromCharCode(i);
    numList.push(code);
}
var smallList = [];
for (var i = 97; i <= 122; i++) {
    var code = String.fromCharCode(i);
    smallList.push(code);
}
var bigList = [];
for (var i = 65; i <= 90; i++) {
    var code = String.fromCharCode(i);
    bigList.push(code);
}
export let allList = numList.concat(smallList, bigList);


export function createCode(arr, length) {
    var newArr = [];
    for (var y = 0; y < length; y++) {
        var index = Math.floor(Math.random() * (arr.length-1));
        var item = arr[index];
        if (newArr.indexOf(item) == -1) {
            newArr.push(item);
        } else {
            y--;
        }
    }
    return newArr.join("");
}

// export function checkPwd(pwd1, pwd2, reg, errobj, info) {
//     if (pwd1 == pwd2) {
//         if (reg.test(pwd1)) {
//             let numReg = /[0-9_]/g;
//             let numCount = numReg.test(pwd1) ? 1 : 0;
//             let upperReg = /[A-Z]/g;
//             let upperCount = upperReg.test(pwd1) ? 1 : 0;
//             let lowerReg = /[a-z]/g;
//             let lowerCount = lowerReg.test(pwd1) ? 1 : 0;
//             switch (numCount + upperCount + lowerCount) {
//                 case 1:
//                     errobj.html("弱");
//                     errobj.css("backgroundColor","green")
//                     break;
//                 case 2:
//                     errobj.html("中");
//                     errobj.css("backgroundColor","yellow")
//                     break;
//                 case 3:
//                     errobj.html("强")
//                     errobj.css("backgroundColor","red")
//                     break;
//             }
//             // errobj.css("color","yellow")
//             return true;
//         } else {
//             errobj.html(info)
//             errobj.css("color","red")
//             return false;
//         }
//     } else {
//         errobj.html("两次输入密码不一致")
//         errobj.css("color","red")
//         return false;
//     }

// }

// export function checkStrByReg(str,reg,errobj,info){
//     if(reg.test(str)){
//         errobj.html("√")
//         errobj.css("color","yellow")
//         return true;
//     }else{
//         errobj.html(info)
//         errobj.css("color","red")
//         return false;
//     }
// }