function createNumbersArray(count) {
    let arr = [];
    for (let i = 1; i <= count; ++i) {
      arr.push(i);
      arr.push(i);
    }
    return arr;
}
  
function shuffle(arr) {
for (let i = 0; i < arr.length; ++i) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};
return arr;
}

function createListItems () {
    shufflePairedNumbers = shuffle(createNumbersArray(8));
    let list = document.createElement('ul');
    list.classList.add('list', 'flex')
    let liArr = [];

    for (let i = 0; i < shufflePairedNumbers.length; ++i) {
        let item = document.createElement('li');
        item.classList.add('list-item');
        item.id = shufflePairedNumbers[i];
        liArr.push(item);
    }
    for (let i = 0; i < liArr.length; ++i) {
        list.append(liArr[i]);
    }
    return {
        list, 
        liArr,
    }
}

function setImgById (func) {
    for (let i = 0; i < func.liArr.length; ++i) {
        if (func.liArr[i].id === '1') {
            func.liArr[i].addEventListener('click', () => {
                func.liArr[i].classList.add('background-comet');
            })
        } else if (func.liArr[i].id === '2') {
            func.liArr[i].addEventListener('click', () => {
                func.liArr[i].classList.add('background-saturn');
            })
        } else if (func.liArr[i].id === '3') {
            func.liArr[i].addEventListener('click', () => {
                func.liArr[i].classList.add('background-astronaut');
            })
        } else if (func.liArr[i].id === '4') {
            func.liArr[i].addEventListener('click', () => {
                func.liArr[i].classList.add('background-earth');
            })
        } else if (func.liArr[i].id === '5') {
            func.liArr[i].addEventListener('click', () => {
                func.liArr[i].classList.add('background-rocket');
            })
        } else if (func.liArr[i].id === '6') {
            func.liArr[i].addEventListener('click', () => {
                func.liArr[i].classList.add('background-satellite');
            })
        } else if (func.liArr[i].id === '7') {
            func.liArr[i].addEventListener('click', () => {
                func.liArr[i].classList.add('background-stars');
            })
        } else if (func.liArr[i].id === '8') {
            func.liArr[i].addEventListener('click', () => {
                func.liArr[i].classList.add('background-alien');
            })
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    function startGame() {
        let listItem = createListItems();
        document.querySelector('.list-wrapper').append(listItem.list);
        setImgById(listItem);
    }
    startGame();
    // document.querySelector('.button').addEventListener('click', () => {
    //     let listItem = createListItems();
    //     for (let i = 0; i < listItem.liArr.length; ++i) {
    //         listItem.list[i].classList.remove('background-comet', )
    //     }
    //     document.querySelector('.list-wrapper').append(listItem.list);
    //     setImgById(listItem);
    // })
});