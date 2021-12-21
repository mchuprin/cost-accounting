let allExpanses = [];
let inputGoal = null;
let inputMoney = null;
let inputValueGoal = '';
let inputValueMoney = '';
let editExp = null;
const today = new Date;
let allExp = [];
const link = 'http://localhost:8080';
let resultSum = null;
let updatedExp = null;
const date = null;

const countSum = (value) => {
    const initialValue = 0;
    const result = value.reduce((amount, elem) => {
        return amount + elem.exp;
    }, initialValue);
    if (!result) {
        const total = document.getElementById('result').innerHTML = 0 + ' р.'
    } else {
        const total = document.getElementById('result').innerHTML = result + ' р.';
    }
};

window.onload = async function init() {
    inputGoal = document.getElementById('where-input');
    inputGoal.addEventListener('change', updateValueGoal);
    inputMoney = document.getElementById('how-much-input');
    inputMoney.type = 'number'
    inputMoney.addEventListener('change', updateValueMoney);
    const response = await fetch (link + '/allList', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': 'http://localhost:8080'
        },
    });
    const result = await response.json();
    allExpanses = result.data;
    resultSum = countSum(allExpanses);
    render();
}

const updateValueGoal = async (event) => {
    inputValueGoal = event.target.value;
    const resp = await fetch (link + '/updateExpanse', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Origin': '*'
            },
            body: JSON.stringify({
                _id: editExp,
                reason: event.target.value,
            })
        });
    updatedExp = await resp.json();
    if (resp.status === 200) {
        const activeId = updatedExp._id;
        allExpanses = allExpanses.map(elem => {
            const exp = {...elem}
            if(exp._id === activeId) {
                exp.reason = inputValueGoal;
                return exp
            } else {
                return exp
            }
        })
        render();
    } else {
        alert('Упс, что-то пошло не так');
    }
}



const updateValueMoney = async (event) => {
    inputValueMoney = event.target.value;
    const resp = await fetch (link + '/updateExpanse', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Origin': '*'
            },
            body: JSON.stringify({
                _id: editExp,
                exp: event.target.value,
                date: today
            })
        });
        updatedExp = await resp.json();
        if (resp.status === 200) {
            const activeId = updatedExp._id;
            allExpanses = allExpanses.map(elem => {
                const exp = {...elem};
                if(exp._id === activeId) {
                    exp.exp = Number(inputValueMoney);
                    return exp
                } else {
                    return exp
                }
            })
            resultSum = countSum(allExpanses);
            render();
        } else {
            alert('Упс, что-то пошло не так');
        }
}

const onClickButton = async () => {
    const resp = await fetch (link + '/createExpanse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            reason: inputValueGoal,
            date: today,
            exp: inputValueMoney
        })
    });
    const result = await resp.json();
    if (resp.status === 200) {
        allExpanses.push(result);
        inputGoal.value = '';
        inputMoney.value = '';
        inputValueGoal = '';
        inputValueMoney = '';
        resultSum = countSum(allExpanses);
        render();
    } else {
        alert('Упс, что-то пошло не так')
    }

}

const render = () => {
    const content = document.getElementById('expanses');
    while (content.firstChild) {
        content.removeChild(content.firstChild)
    }
    allExpanses.map((value, index) => {
        const container = document.createElement('div');
        container.className = 'waste';
        content.appendChild(container);
        const order = document.createElement('p');
        order.className = 'order';
        order.innerText = index + 1 + ')';
        container.appendChild(order);
            if (value._id === editExp) {
                const inputReason = document.createElement('input');
                inputReason.type = 'text';
                inputReason.className = 'inputReason';
                inputReason.value = value.reason;
                inputReason.addEventListener('change', updateValueGoal);
                container.appendChild(inputReason);
                const date = document.createElement('p');
                date.innerText = value.date.slice(0, 10).replace(/-/g, '.').split('.').reverse().join('.');
                container.appendChild(date);
                const inputMoney = document.createElement('input');
                inputMoney.type = 'number';
                inputMoney.className = 'inputMoney';
                inputMoney.value = value.exp;
                inputMoney.addEventListener('change', updateValueMoney);
                container.appendChild(inputMoney);
                const imageDone = document.createElement('img');
                imageDone.src = 'img/done.svg';
                container.appendChild(imageDone);
                imageDone.onclick = () => doneEditExp(value);
            } else {
                const reason = document.createElement('p');
                reason.className = 'reason';
                reason.innerText = value.reason;
                container.appendChild(reason);
                const part1 = document.createElement('div');
                part1.className = 'part1';
                container.appendChild(part1);
                const date = document.createElement('p');
                date.className = 'date';
                date.innerText = value.date.slice(0, 10).replace(/-/g, '.').split('.').reverse().join('.');
                part1.appendChild(date);
                const exp = document.createElement('p');
                exp.className = 'exp';
                exp.innerText = value.exp +' р.';
                part1.appendChild(exp);
                const imageEdit = document.createElement('img');
                imageEdit.src = 'img/pencil.svg';
                container.appendChild(imageEdit);
                imageEdit.onclick = () => {
                    editExp = value._id;
                    render();
                }
            }
        const imageDelete = document.createElement('img');
        imageDelete.src = 'img/trash.svg';
        imageDelete.onclick = () => {deleteExpanse(value, index)};
        container.appendChild(imageDelete);
    });
}

const deleteExpanse = async (event, index) => {
    const resp = await fetch (link + `/deleteExpanse?id=${event._id}`, {
        method: 'DELETE'
    });
    allExpanses.splice(index, 1)
    editExp = null;
    resultSum = countSum(allExpanses);
    render();
}

const doneEditExp = async (item) => {
    editExp = null;
    updatedExp = null;
    resultSum = countSum(allExpanses);
    render();
}